# The Trino Series

Repositório com os arquivos e links úteis para estudo e aplicação dos passos do The Trino Series ministrado por Antony Lucas.

E-mail: antonylucasti@gmail.com

https://www.linkedin.com/in/antonylucasti/


Conteúdo:

1 - Arquivos de exemplo para catálogo das fontes de dados utilizando os conectores de exemplo em "uteis-the-trino-series/docker"

Container - imagem oficial utilizado no treinamento:

https://hub.docker.com/r/trinodb/trino


2 - Arquivos de exemplo para configuração do cluster Kubernetes provisionado no Google Kubernetes Engine (GKE) conforme demonstrado no treinamento em "uteis-the-trino-series/kubernetes" assim como comandos úteis.

K8s Helm utilizado no treinamento:

https://artifacthub.io/packages/helm/trino/trino

Commands:

```
the-trino-series % helm upgrade --install \ 
--values my-cluster-values.yaml \
my-trino \
trino/trino \
--version 0.10.2
```


Links úteis:



Live Primeiros Passos com Trino - Antony Lucas

https://www.youtube.com/watch?v=pyipfcuQk1E&t=68s


The Plumbers | Querying Data with Trino from Earth to Space with Brian Olsen - Luan Moreno, Brian Olsen e Mateus Oliveira

https://www.youtube.com/watch?v=tElyn3qYsmk&t=4102s


Virtualização de Dados com Trino - Luan Moreno e Mateus Oliveira:

https://www.youtube.com/watch?v=Siik-UO-ZaQ&t=3030s&pp=ygURdHJpbm8gbHVhbiBtb3Jlbm8%3D


Trino Oficial content:

https://trino.io/


Kubernetes: The Documentary 

https://www.youtube.com/watch?v=BE77h7dmoQU

https://www.youtube.com/watch?v=318elIq37PE&t=7s


