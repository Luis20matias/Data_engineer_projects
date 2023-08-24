from typing import Tuple
import pandas as pd
from snowflake.connector.pandas_tools import write_pandas

from covid.stage import Stage
from covid.connector.snowflake_con import create_engine_snow, create_connector
from snowflake.connector import ProgrammingError
import logging

logging.basicConfig(format='%(asctime)s - %(message)s', level=logging.INFO)


class PreprocessingStage(Stage):
    def __init__(self, overwrite: str='true'):
        self.overwrite = overwrite

    def run(self):
        """It runs the ETL for the ingestion stage"""
        logging.info('Starting Preprocessing stage')

        logging.info('Extraction...')
        extract = self.extract()

        logging.info('Transformation...')
        transform = self.transform(extract)

        logging.info('Load...')
        load = self.load(transform)

        logging.info('Preprocessing completed')
        return

    def extract(self) -> Tuple:
        engine = create_engine_snow('INGESTION_SCHEMA')
        try:
            population = pd.read_sql_query('SELECT * FROM POPULATION_RAW', engine)
            gb_cases = pd.read_sql_query('SELECT * FROM GLOBAL_RAW', engine)
            vaccines = pd.read_sql_query('SELECT * FROM VACCINE_RAW', engine)
            vaccines_meta = pd.read_sql_query('SELECT * FROM VACCINE_META_RAW', engine)

            # Convert Column Labels to uppercase in Dataframe
            vaccines.columns = vaccines.columns.str.upper()
            vaccines_meta.columns = vaccines_meta.columns.str.upper()

            # Save the table in a tuple to send to transformation
            tables_extracted = (population, gb_cases, vaccines, vaccines_meta)

        except ProgrammingError as err:
            logging.error('Programming Error: {0}'.format(err))
        finally:
            engine.dispose()
        return tables_extracted

    @staticmethod
    def create_population_table(pop_raw: pd.DataFrame) -> pd.DataFrame:
        # Unpivot table
        population = pd.melt(pop_raw,
            id_vars= ['Country Code'],
            value_vars=pop_raw.columns[2:],
            ignore_index=False,
            var_name='year',
            value_name='population'
        )

        population.rename(
            columns={'Country Code': 'iso3'},
            errors='raise',
            inplace=True
        )
        return population.reset_index(drop=True)
    
    @staticmethod
    def create_country_table(vaccine_raw: pd.DataFrame) -> pd.DataFrame:
        country = vaccine_raw[["COUNTRY", "ISO3", "WHO_REGION"]]

        # Drop duplicate rows
        country = country.drop_duplicates()

        country = country.rename(
            columns={
                'COUNTRY': 'country',
                'ISO3': 'iso3',
                'WHO_REGION': 'who_region'
            },
            errors='raise'
        )
        return country

    @staticmethod
    def create_vaccine_table(
        vaccine_meta_raw: pd.DataFrame,
        dim_country: pd.DataFrame
        ) -> pd.DataFrame:
        vaccine_meta =  vaccine_meta_raw[
            ['ISO3', 'VACCINE_NAME', 'PRODUCT_NAME', 'COMPANY_NAME']
        ]

        # Remove Unknown vaccines
        vaccine_meta =  vaccine_meta[vaccine_meta['VACCINE_NAME'] != 'Unknown Vaccine']

        vaccine_meta = vaccine_meta.rename(
            columns={
                'ISO3': 'iso3',
                'VACCINE_NAME': 'vaccine_name',
                'PRODUCT_NAME': 'product_name',
                'COMPANY_NAME':'company_name',
            },
            errors='raise'
        )

        vaccine = pd.merge(
            left=vaccine_meta,
            right=dim_country,
            how='inner',
            on=['iso3'],
            left_on=None,
            right_on=None,
            copy=True,
            indicator=False,
        )

        # Create a index for each row
        vaccine['id_vaccine'] = range(1, len(vaccine) + 1)

        # Reorder the columns
        vaccine = vaccine[[
            'id_vaccine',
            'country',
            'vaccine_name',
            'product_name',
            'company_name'
        ]]
        return vaccine.reset_index(drop=True)

    @staticmethod
    def create_meas_table(
        vaccine_raw: pd.DataFrame,
        global_raw: pd.DataFrame,
    ) -> pd.DataFrame:
        # Filter and rename columns related to vaccines
        meas_vc = vaccine_raw[['COUNTRY', 'DATE_UPDATED',
                               'PERSONS_VACCINATED_1PLUS_DOSE',
                               'PERSONS_FULLY_VACCINATED']]
        meas_vc = meas_vc.rename(
            columns={
                'COUNTRY': 'country',
                'DATE_UPDATED': 'date',
                'PERSONS_VACCINATED_1PLUS_DOSE':'persons_partially_vaccinated',
                'PERSONS_FULLY_VACCINATED':'persons_fully_vaccinated'
            },
            errors='raise'
        )
        meas_vc['date'] = pd.to_datetime(meas_vc['date'])
        meas_vc = meas_vc.set_index(['country', 'date'])

        # Filter and rename columns related to global data
        meas_gb = global_raw[['country', 'date_reported', 'new_cases',
                              'new_deaths']]
        meas_gb = meas_gb.rename(columns={'date_reported': 'date'},
            errors='raise'
        )

        # Put date in the datetime format and set country and date as index
        meas_gb['date'] = pd.to_datetime(meas_gb['date'])
        meas_gb = meas_gb.set_index(['country', 'date'])

        # Join the table global and vaccine. - outer join in the indexes
        measuments = meas_vc.join(meas_gb, how="outer", on=['country', 'date'])
        measuments = measuments.reset_index()

        # create a columun date_key with the date in the format %Y%m%d
        measuments['date_key'] = measuments['date'].dt.strftime("%Y%m%d")
        measuments['id_meas'] = range(1, len(measuments) + 1)
        measuments = measuments[['id_meas','date_key', 'country', 'new_cases',
                                 'new_deaths', 'persons_partially_vaccinated',
                                 'persons_fully_vaccinated']]

        return measuments.reset_index(drop=True)

    def transform(self, tables: Tuple) -> list:
        # Take the data from the tuple generate in the extraction stage
        population_raw = tables[0]
        global_raw = tables[1]
        vaccine_raw = tables[2]
        vaccine_meta_raw = tables[3]

        logging.info('Creating dimension tables')
        dim_population = self.create_population_table(population_raw)
        dim_country = self.create_country_table(vaccine_raw)
        dim_vaccine = self.create_vaccine_table(vaccine_meta_raw, dim_country)

        logging.info('Creating fact tables')
        fact_meas = self.create_meas_table(vaccine_raw, global_raw)

        # save the table in a tuple
        er_tables = (dim_population, dim_country, dim_vaccine, fact_meas)
        return er_tables

    def load(self, er_tables: Tuple):
        # context manager ensures the connection is closed
        with create_connector(schema='PREPROCESSED_SCHEMA') as con:
            success_pop, _, _, _ = write_pandas(con, er_tables[0], 'POPULATION',
                                                quote_identifiers=False)
            success_pop, _, _, _ = write_pandas(con, er_tables[1], 'COUNTRY',
                                                quote_identifiers=False)
            success_pop, _, _, _ = write_pandas(con, er_tables[2], 'VACCINE',
                                                quote_identifiers=False)
            success_pop, _, _, _ = write_pandas(con, er_tables[3],
                                                'MEASUREMENTS',
                                                quote_identifiers=False)
        return

