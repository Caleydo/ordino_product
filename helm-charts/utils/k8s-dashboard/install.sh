# Add kubernetes-dashboard repository
helm repo add kubernetes-dashboard https://kubernetes.github.io/dashboard/

# Deploy a Helm Release named "k8s-dashboard" using the kubernetes-dashboard chart
helm install k8s-dashboard kubernetes-dashboard/kubernetes-dashboard
