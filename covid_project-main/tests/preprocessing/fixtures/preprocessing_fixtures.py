import pytest
import pandas as pd
import numpy as np

@pytest.fixture
def population_table():
    df = pd.DataFrame(
        {
            'Country Name': [
                'Arab World',
                'Zambia',
                'Zimbabwe',
                'Virgin Islands(U.S.)'
            ],
            'Country Code': ['ARB', 'ZMB', 'ZWE', 'VIR'],
            '2021': [656, 788, 959, 453],
            '2022': [752, 745, 900, 460]
        }
    )
    return df

@pytest.fixture
def expected_population_table():
    df = pd.DataFrame(
        {
            'iso3': 2*['ARB', 'ZMB', 'ZWE', 'VIR'],
            'year': ['2021', '2021', '2021', '2021', '2022', '2022', '2022', '2022'],
            'population': [656, 788, 959, 453, 752, 745, 900, 460]
        }
    )
    return df

@pytest.fixture
def vaccine_table():
    df = pd.DataFrame(
        {
            'COUNTRY': [
                'Arab World',
                'Zambia',
                'Zimbabwe',
                'Zimbabwe'
            ],
            'DATE_UPDATED': [
                '2022-05-08',
                '2022-04-24',
                '2022-04-28', 
                '2022-04-18'
            ],
            'ISO3': ['ARB', 'ZMB', 'ZWE', 'ZWE'],
            'WHO_REGION':['OTHER', 'AFRO', 'AFRO', 'AFRO'],
            'test_col': 4*['test'],
            'PERSONS_VACCINATED_1PLUS_DOSE': [1311182, 7840131, 57866, 57866],
            'PERSONS_FULLY_VACCINATED': [53414.0, 40593.0, 6633.0, 6633.0]
        }
    )
    return df

@pytest.fixture
def expected_country_table():
    df = pd.DataFrame(
        {
            'country': [
                'Arab World',
                'Zambia',
                'Zimbabwe'
            ],
            'iso3': ['ARB', 'ZMB', 'ZWE'],
            'who_region':['OTHER', 'AFRO', 'AFRO'],
        }
    )
    return df

@pytest.fixture
def vaccine_meta_table():
    df = pd.DataFrame(
        {
            'ISO3': ['JEY', 'JEY', 'GGY', 'IND'],
            'VACCINE_NAME': [
                'Moderna - mRNA-1273',
                'Pfizer BioNTech - Comirnaty',
                'Unknown Vaccine',
                'SII - Covovax	'
            ],
            'PRODUCT_NAME': ['mRNA-1273', 'Comirnaty', 'Unknown Vaccine', 'Covovax'],
            'COMPANY_NAME': ['Moderna', 'Pfizer BioNTech', np.nan, np.nan],
            'test_column': 4*['test']
        }
    )
    return df

@pytest.fixture
def dim_country_table():
    df = pd.DataFrame(
        {
            'iso3': ['JEY', 'GGY', 'IND'],
            'country': ['Jersey', 'Guernsey', 'India']
        }
    )
    return df

@pytest.fixture
def expected_vaccine_table():
    df = pd.DataFrame(
        {
            'id_vaccine': [1, 2, 3],
            'country': 2*['Jersey'] + ['India'],
            'vaccine_name': [
                'Moderna - mRNA-1273',
                'Pfizer BioNTech - Comirnaty',
                'SII - Covovax	'
            ],
            'product_name': [
                'mRNA-1273',
                'Comirnaty',
                'Covovax'
            ],
            'company_name': [
                'Moderna',
                'Pfizer BioNTech',
                np.nan
            ]
        }
    )
    return df

@pytest.fixture
def global_table():
    df = pd.DataFrame(
        {
            'country': [
                'Arab World',
                'Zambia',
                'Zimbabwe',
                'Zimbabwe'
            ],
            'date_reported': [
                '2022-05-08',
                '2022-04-24',
                '2022-04-28',
                '2022-03-18'
            ],
            'new_cases': [200, 300, 400, 500],
            'new_deaths': [600, 700, 800, 900],
        }
    )
    return df

@pytest.fixture
def expected_meas_table():
    df = pd.DataFrame(
        {
            'id_meas': [1, 2, 3, 4, 5],
            'date_key': [
                '20220508',
                '20220424',
                '20220428', 
                '20220418',
                '20220318'
            ],
            'country': [
                'Arab World',
                'Zambia',
                'Zimbabwe',
                'Zimbabwe',
                'Zimbabwe'
            ],
            'new_cases': [200, 300, 400, np.nan, 500],
            'new_deaths': [600, 700, 800, np.nan,900],
            'persons_partially_vaccinated': [1311182, 7840131, 57866, 57866, np.nan],
            'persons_fully_vaccinated': [53414, 40593, 6633, 6633, np.nan],
        }
    )
    return df

