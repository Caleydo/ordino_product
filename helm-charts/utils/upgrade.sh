helm dependency update
helm upgrade ordino -n ordino . # `.` = path from parent directory with `sh utils/install.sh`
# watch kubectl -n ordino get pods
