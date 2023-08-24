# Covid project Data pipeline - Triade

- [Structure the project](https://docs.python-guide.org/writing/structure/) on Github.

- Use branchs on Github as a good practice.

- Use a specific [commit type](https://github.com/pvdlg/conventional-commit-types) on Github to make your history clear.

- Just push code that is working.

- NEVER push your code directly into the master.

- Add meaningful comments to your git commit.

- Make the rebase with the branch master before opening a PR.

- Use [pyenv](https://realpython.com/intro-to-pyenv/) to handle the python versions on your computer.

- Use virtual environments to handle different versions of your packages for different projects.

- Never hard-coded your credentials.

## Data pipeline

- Create an [Abstract Class](https://www.geeksforgeeks.org/abstract-classes-in-python/#:~:text=An%20abstract%20class%20can%20be,is%20called%20an%20abstract%20class.) called Stage to include the ETL and ELT process at data flow.

- Use .env to save your credentials. Don't push this file into Github.

- Create a Database in your Snowflake Trial account.

- Create an internal stage in your Snowflake Trial account.

- Create a [Snowflake connector](https://docs.snowflake.com/en/user-guide/python-connector.html). You have to see the  supported versions of Python.

### 1. Ingestion stage

- Create a Concrete class for the Ingestion, where this stage inherits the class Stage.

- Develop the ELT process for this stage. 

- Download the data directly from the source through your python code.

- Load the data at a staging area (i.e: S3 Bucket, Snowflake internal stage, etc.)

- Use the python package [logging](https://realpython.com/python-logging/#the-logging-module) to give you a better understanding of the flow of a program.

- Create a function named "run" to run your ELT process automatically. With that, it will be easier to debug your code.

- Use [SnowSQL](https://docs.snowflake.com/en/user-guide/snowsql.html#:~:text=SnowSQL%20is%20the%20command%20line,or%20using%20the%20%2Df%20option.) just if necessary.

