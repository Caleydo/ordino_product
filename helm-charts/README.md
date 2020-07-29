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
