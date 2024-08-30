# Apache Spark using Local Deployment

> building an elt pipeline using [python & sql]

## submit spark program [local]

```bash
# spark-submit cli
# local machine
spark-submit \
    --master local \
    /home/luisfarias/repo_luis/Data_engineer_projects/trn-spec-spark-main/trn-spec-spark-main/day-1-foundation/pyspark-yelp-elt-py/local/local.py
    
# local spark ui ~ spark history server
http://192.168.5.115:4040
```
