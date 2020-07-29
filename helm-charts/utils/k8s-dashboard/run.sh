kubectl create serviceaccount dashboard -n default
kubectl create clusterrolebinding dashboard-admin -n default --clusterrole=cluster-admin --serviceaccount=default:dashboard

echo '---------------------------'
echo 'LOGIN TOKEN'
echo '---------------------------'
kubectl get secret $(kubectl get serviceaccount dashboard -o jsonpath="{.secrets[0].name}") -o jsonpath="{.data.token}" | base64 --decode
echo '---------------------------'

# Commands from the dashboard start up
export POD_NAME=$(kubectl get pods -n default -l "app.kubernetes.io/name=kubernetes-dashboard,app.kubernetes.io/instance=k8s-dashboard" -o jsonpath="{.items[0].metadata.name}")
# echo https://127.0.0.1:8443/
kubectl -n default port-forward $POD_NAME 8443:8443
