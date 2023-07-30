#!/bin/bash

# Access the environment variable passed from Docker Compose
MSSQL_SA_PASSWORD=$MSSQL_SA_PASSWORD



# Wait for the SQL Server to start
sleep 30s

# SQLCMD to restore the database
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "$MSSQL_SA_PASSWORD" -Q "RESTORE DATABASE MLM FROM DISK='/var/opt/mssql/backup/backupfile.bak' WITH MOVE 'MLM' TO '/var/opt/mssql/data/your_data_file.mdf', MOVE 'MLM_log' TO '/var/opt/mssql/data/your_log_file.ldf'"

# Sleep again to allow the database to be restored completely
sleep 10s