import pytest
import sys
import os
sys.path.append(os.path.join('..', os.path.abspath('')))


import pandas as pd

from covid.preprocessing import PreprocessingStage
from tests.preprocessing.fixtures.preprocessing_fixtures import (
    population_table,
    expected_population_table,
    vaccine_table,
    expected_country_table,
    vaccine_meta_table,
    expected_vaccine_table,
    global_table,
    dim_country_table,
    expected_meas_table
)


def test_create_population_table(
    population_table,
    expected_population_table
):
    stage = PreprocessingStage()
    expected = expected_population_table
    population = stage.create_population_table(population_table)
    pd.testing.assert_frame_equal(population, expected)

def test_create_country_table(
    vaccine_table,
    expected_country_table
):
    stage = PreprocessingStage()
    expected = expected_country_table
    country = stage.create_country_table(vaccine_table)
    pd.testing.assert_frame_equal(country, expected)

def test_create_country_table_raise_an_error_for_missing_column():
    input = pd.DataFrame(
        {
            'ISO3': ['ARB', 'ZMB', 'ZWE', 'ZWE'],
            'WHO_REGION':['OTHER', 'AFRO', 'AFRO', 'AFRO'],
        }
    )
    stage = PreprocessingStage()
    with pytest.raises(KeyError):
        stage.create_country_table(input)

def test_create_vaccine_table(
    vaccine_meta_table,
    dim_country_table,
    expected_vaccine_table
):
    stage = PreprocessingStage()
    expected = expected_vaccine_table
    vaccine = stage.create_vaccine_table(vaccine_meta_table, dim_country_table)
    pd.testing.assert_frame_equal(vaccine, expected)

def test_create_meas_table(
    vaccine_table,
    global_table,
    expected_meas_table
):
    stage = PreprocessingStage()
    expected = expected_meas_table
    meas_table = stage.create_meas_table(vaccine_table, global_table)

    pd.testing.assert_frame_equal(meas_table, expected)

