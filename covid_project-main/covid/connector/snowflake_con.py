import os
import snowflake.connector
from sqlalchemy import create_engine


def create_connector(schema: str) -> snowflake.connector.connection.SnowflakeConnection:
    ctx = snowflake.connector.connect(
        user=os.environ.get("USER_SNOWFLAKE"),
        password=os.environ.get("PASSWORK_SNOWFLAKE"),
        account=os.environ.get("ACCOUNT_SNOWFLAKE"),
        database="COVID_DATABASE",
        autocommit=False,
        schema=schema
    )
    return ctx

def create_engine_snow(schema: str):
    engine = create_engine(
        "snowflake://{user}:{password}@{account_identifier}/{database_name}/{schema_name}".format(
            user=os.environ.get("USER_SNOWFLAKE"),
            password=os.environ.get("PASSWORK_SNOWFLAKE"),
            account_identifier=os.environ.get("ACCOUNT_SNOWFLAKE"),
            database_name='COVID_DATABASE',
            schema_name=schema
        )
    )
    return engine

