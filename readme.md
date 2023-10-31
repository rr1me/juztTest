currently deployed on http://91.233.169.34:7095/

running guide:
- install dependencies for frontend (npm install)
- create 
  1) postgresql database with name: "juztTest" 
  2) correct database connection string (backend\bin\Release\net8.0\appsettings.json - connectionString)
- install .net 8
- run frontend (npm start) and backend (backend\bin\Release\net8.0\juztTest_backend.exe)
- check http://localhost:3000
