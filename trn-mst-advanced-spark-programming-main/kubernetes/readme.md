### install & upgrade minio cli client
```sh
mc alias set do-nyc1-orn-polaris-dev http://138.197.224.4 data-lake 12620ee6-2162-11ee-be56-0242ac120002

mc ls do-nyc1-orn-polaris-dev
mc tree do-nyc1-orn-polaris-dev
```

### kubernetes version [v1.30.1] & spark-operator
```sh
https://github.com/kubeflow/spark-operator
https://hub.docker.com/r/kubeflow/spark-operator/tags
```

### build spark-operator container image [kubernetes folder]
```shell
https://hub.docker.com/_/spark/tags

docker build --platform linux/amd64 -t etl-yelp-batch:latest .
docker tag etl-yelp-batch:latest owshq/etl-yelp-batch:latest
docker push owshq/etl-yelp-batch:latest
```

### deploy spark-operator [v1beta2-1.6.1-3.5.0]
```shell 
kubectx do-nyc1-orn-polaris-dev

kubectl create namespace processing

kubens processing  
helm ls -n processing
```

### create & verify cluster role binding perms
```shell
k apply -f crb-spark-operator.yaml -n processing
k describe clusterrolebinding crb-spark-operator-processing
```

### deploy application to spark-operator
```shell
kubens processing

kubectl apply -f etl-yelp-batch.yaml -n processing 
kubectl get sparkapplications etl-yelp-batch -o=yaml
kubectl describe sparkapplication etl-yelp-batch

kubectl apply -f sch-etl-yelp-batch.yaml -n processing 
kubectl get Scheduledsparkapplication sch-etl-yelp-batch -o=yaml
kubectl describe Scheduledsparkapplication sch-etl-yelp-batch

kubectl get pods --watch
kubectl describe pods etl-yelp-batch-driver 
kubectl logs etl-yelp-batch-driver

kubectl delete SparkApplication etl-yelp-batch -n processing
kubectl delete Scheduledsparkapplication sch-etl-yelp-batch -n processing
```

### google skaffold [init]
```shell
https://skaffold.dev/docs/install/

curl -Lo skaffold https://storage.googleapis.com/skaffold/releases/latest/skaffold-darwin-arm64 && \
sudo install skaffold /usr/local/bin/

skaffold.yaml
skaffold dev -vdebug
```