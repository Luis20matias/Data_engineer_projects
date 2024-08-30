# The Trino Series

1 - Example files for cataloging data sources using the example connectors in "uteis-the-trino-series/docker"

Container - official image:

https://hub.docker.com/r/trinodb/trino

2 - Example files for configuring the Kubernetes cluster provisioned in Google Kubernetes Engine (GKE) as demonstrated in the training in "uteis-the-trino-series/kubernetes," along with useful commands.

K8s Helm used in the training:

https://artifacthub.io/packages/helm/trino/trino

Commands:

the-trino-series % helm upgrade --install \ --values my-cluster-values.yaml
my-trino
trino/trino
--version 0.10.2


Useful links:

Official Trino content:

https://trino.io/

Kubernetes: The Documentary

https://www.youtube.com/watch?v=BE77h7dmoQU

https://www.youtube.com/watch?v=318elIq37PE&t=7s
