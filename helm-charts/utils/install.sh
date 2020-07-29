kubectl create ns ordino
helm dependency update
helm install ordino -n ordino . # `.` = path from parent directory with `sh utils/install.sh`
# watch kubectl -n ordino get pods
