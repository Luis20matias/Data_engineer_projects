import pandas as pd
import logging

from covid.stage import Stage
from covid.connector import snowflake_con
from snowflake.connector.pandas_tools import write_pandas

logging.basicConfig(format='%(asctime)s - %(message)s', level=logging.INFO)

TABLE_NAME = {
    "/tmp/WHO-COVID-19-global-data.csv": "GLOBAL_RAW",
    "/tmp/vaccination-data.csv": "VACCINE_RAW",
    "/tmp/vaccination-metadata.csv": "VACCINE_META_RAW"
}

class IngestionStage(Stage):
    def __init__(self, overwrite: str='true'):
        self.overwrite = overwrite

    def run(self, url_list: list):
        logging.info('Starting Ingestion stage')

        logging.info('Extraction...')
        extract = self.extract(url_list)

        logging.info('Load...')
        load = self.load(extract)

        logging.info('Ingestion completed')
        return

    @staticmethod
    def extract(url_link: list) -> list:
        name_list = []
        for link in url_link:
            file_name = "/tmp/" + link.rsplit('/', 1)[1]
            df = pd.read_csv(link)
            df.to_csv(file_name, index=False)
            name_list.append(file_name)
        return name_list

    def load(self, name_list: list):
        # TODO: load a dataframe without save the df in the tmp
        with snowflake_con.create_connector(schema='INGESTION_SCHEMA') as con:
            for localy in name_list:
                df = pd.read_csv(localy)
                table_name = TABLE_NAME[localy]
                success, nchunks, nrows, _ = write_pandas(
                    con,
                    df,
                    table_name,
                    quote_identifiers=False
                )
        return

    def transform(self):
        pass

