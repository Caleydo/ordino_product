# Ordino Helm Charts

Here you will find helm charts for installing Ordino on Kubernetes. For generic information about Helm Charts refer to [the Helm github repository](https://github.com/helm/charts).


## Development Setup

### Kubernetes cluster with Kind

Install [kind](https://kind.sigs.k8s.io/):

```bash
curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.8.1/kind-linux-amd64
chmod +x ./kind
mv ./kind /usr/local/bin/kind
```

Create k8s cluster

```bash
kind create cluster --name ordino
```

Delete Kubernetes cluster

```bash
kind delete cluster --name ordino
```

### Install Helm

Install [Helm](https://helm.sh/docs/intro/install/#from-script):

```bash
curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3
chmod 700 get_helm.sh
./get_helm.sh
```

### Kubernetes Dashboard (optional)

Install [Kubernetes Dashboard](https://github.com/kubernetes/dashboard) from [Helm Chart](https://hub.helm.sh/charts/k8s-dashboard/kubernetes-dashboard).

```bash
sh utils/k8s-dashboard/install.sh
```

Run the dashboard

```bash
sh utils/k8s-dashboard/run.sh
```

1. Open a brower and navigate to https://localhost:8443.
2. Accept the SSL certificate warning
3. Copy and paste the login token to the input field in the browser

Remove the dashboard

```bash
sh utils/k8s-dashboard/uninstall.sh
```

### Ordino

## Chart Requirements

| Repository | Name | Version |
|------------|------|---------|
| https://charts.bitnami.com/bitnami | mongodb | 8.2.1 |
| https://kubernetes-charts.storage.googleapis.com/ | postgresql | 8.6.4 |
| https://kubernetes-charts.storage.googleapis.com/ | redis | 10.5.6 |


## Chart Values

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| MongoDBName | string | `"ordinoDB"` |  |
| MongoDBPass | string | `"ordinoAdmin"` |  |
| MongoDBUser | string | `"ordinoAdmin"` |  |
| affinity | object | `{}` |  |
| autoscaling.enabled | bool | `false` |  |
| autoscaling.maxReplicas | int | `100` |  |
| autoscaling.minReplicas | int | `1` |  |
| autoscaling.targetCPUUtilizationPercentage | int | `80` |  |
| fullnameOverride | string | `""` |  |
| image.pullPolicy | string | `"IfNotPresent"` |  |
| image.repository | string | `"nginx"` |  |
| image.tag | string | `""` |  |
| imagePullSecrets | list | `[]` |  |
| ingress.annotations | object | `{}` |  |
| ingress.enabled | bool | `false` |  |
| ingress.hosts[0].host | string | `"chart-example.local"` |  |
| ingress.hosts[0].paths | list | `[]` |  |
| ingress.tls | list | `[]` |  |
| mongodb.auth.database | string | `"ordinoDB"` | MongoDB custom database |
| mongodb.auth.enabled | bool | `false` | Flag to control whether to enable authentication |
| mongodb.auth.password | string | `"ordinoAdmin"` | MongoDB custom user password |
| mongodb.auth.username | string | `"ordinoAdmin"` | MongoDB custom user (mandatory if auth.database is set) |
| mongodb.enabled | bool | `true` | Flag to control whether to deploy MongoDB |
| mongodb.fullnameOverride | string | `"mongodb"` | Name override for the MongoDB deployment |
| mongodb.persistence.enabled | bool | `true` |  |
| mongodb.persistence.size | string | `"1Gi"` | Size of the MongoDB pvc |
| nameOverride | string | `""` |  |
| nodeSelector | object | `{}` |  |
| ordino.mongodb.database | string | `"ordinoDB"` | MongoDB custom database |
| ordino.mongodb.host | string | `"mongodb"` | MongoDB host |
| ordino.mongodb.password | string | `"ordinoAdmin"` | MongoDB custom user password |
| ordino.mongodb.port | string | `"27017"` | MongoDB port |
| ordino.mongodb.username | string | `"ordinoAdmin"` | MongoDB custom user (mandatory if auth.database is set) |
| ordino.redis.host | string | `"redis-headless"` | Name of the Redis host to be used |
| podAnnotations | object | `{}` |  |
| podSecurityContext | object | `{}` |  |
| postgresql.enabled | bool | `true` | Flag to control whether to deploy PostgreSQL |
| postgresql.existingSecret | string | `"ordinopostgrescredentials"` | Name of existing secret that holds passwords for PostgreSQL |
| postgresql.fullnameOverride | string | `"postgresql"` | Name override for the PostgreSQL deployment |
| postgresql.persistence.size | string | `"1Gi"` | Size of the PostgreSQL pvc |
| postgresql.pgPass | string | `"pass"` | Password for the master PostgreSQL user. Feeds into the `ordinopostgrescredentials` secret that is provided to the PostgreSQL chart |
| redis.cluster.enabled | bool | `false` | Cluster mode for Redis |
| redis.enabled | bool | `true` | Flag to control whether to deploy Redis |
| redis.fullnameOverride | string | `"redis"` | Name override for the redis deployment |
| redis.master.persistence.enabled | bool | `false` | Enable redis volume claim |
| redis.master.persistence.size | string | `"1Gi"` | Size of the volume claim |
| redis.usePassword | bool | `false` | Use password for accessing redis |
| replicaCount | int | `1` |  |
| resources | object | `{}` |  |
| securityContext | object | `{}` |  |
| service.port | int | `80` |  |
| service.type | string | `"ClusterIP"` |  |
| serviceAccount.annotations | object | `{}` |  |
| serviceAccount.create | bool | `true` |  |
| serviceAccount.name | string | `""` |  |
| tolerations | list | `[]` |  |


#### Install

```bash
sh utils/install.sh
```

Tip: Switch to the *ordino* cluster in the Kubernetes Dashboard (next to the search field) to monitor the pods.

#### Run

```bash
sh utils/run.sh
```

#### Upgrade

```bash
sh utils/upgrade.sh
```

#### Uninstall

```bash
sh utils/uninstall.sh
```
