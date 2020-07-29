export POD_NAME=$(kubectl get pods --namespace ordino -l "app.kubernetes.io/name=ordino,app.kubernetes.io/instance=ordino" -o jsonpath="{.items[0].metadata.name}")
echo "Visit http://127.0.0.1:8080 to use your application"
kubectl --namespace ordino port-forward $POD_NAME 8080:80
