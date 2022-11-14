[![author](https://img.shields.io/badge/author-luismatias-red)](https://www.linkedin.com/in/lu%C3%ADs-fernando-matias-de-farias-52234b20a/) [![made-with-python](https://img.shields.io/badge/Made%20with-Python-1f425f.svg)](https://www.python.org/) [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/Luis20matias) [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://chrome.google.com/webstore/detail/open-in-colab/iogfkhleblhcpcekbiedikdehleodpjo)

## Azure Synapses Analytics Project - NYC Taxi Trips data

Azure Synapse Analytics is a limitless analytics service that brings together
data integration, enterprise data warehousing and big data analytics.

## Requeriments 

* Data Discovery
  * Data exploration capability on the raw data
  * Schema applied to the raw data
  * Discovery using T-SQL
  * Discovery using pay-per-query model (Serveless SQL Pool)

* Data Ingestion 
  * Ingested data to be stored as Parquet
  * Ingested data to be stored as tables/ views
  * Ability to query the ingested data using SQL
  * Ingestion using pay-per-query model
  
* Data Transformation 
  * Join the key information required for reporting to
create a new table.
  * Join the key information required for Analysis to
create a new table.
  * Must be able to analyze the transformed data
via T-SQL
  * Transformed data must be stored in columnar
format (i.e., Parquet)

* Reporting Requeriments
  * Taxi Demand
  * Credit Card Campaign
  * Operational Reporting
  * Scheduled to run at regular interval
  * Ability to monitor pipelines
  * Ability to re-run failed pipelines
  * Ability to set-up alerts on failures


## Data Overview

A star schema is a multi-dimensional data model used to organize data in this project

<p>
 <img src="files_overview.png" width="500" height="200"/ >
<p>

## Solution Architecture – Serverless SQL Pool

<p>
 <img src="solution_architecture.png" width="500" height="200"/ >
<p>

## Pipelines

All the code needed to create the External tables, procedures, pipelines, notebooks and pipelines are in the folders above.

### Silver Layer
<p>
 <img src="pipeline_silver_layer.png" width="500" height="500"/ >
<p>


### Gold Layer

<p>
 <img src="pipeline_gold_layer.png" width="500" height="500"/ >
<p>

### Run all pipelines


<p>
 <img src="run_all_pipelines.png" width="500" height="500"/ >
<p>
