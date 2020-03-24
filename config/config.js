module.exports = {

  "development": {
    "username": process_env_USER,
    "password": process_env_PASS,
    "database": process_env_DB,
    "host": process_env_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
   "use_env_variable": "JAWSDB_URL",
    "dialect": "mysql"
  }

}


