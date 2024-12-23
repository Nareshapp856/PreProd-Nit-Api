const sql = require("mssql");

const dbConfig = {
  user: process.env.SQL_UID,
  password: process.env.SQL_PWD,
  server: process.env.SQL_SERVER,
  database: process.env.SQL_DATABASE,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

let pool;

async function getConnectionPool() {
  if (!pool) {
    try {
      pool = new sql.ConnectionPool(dbConfig);
      console.log("Connected to the database");
      return pool;
    } catch (err) {
      console.error("Database connection failed: ", err);
      throw err;
    }
  } else {
    return pool;
  }
}

async function getConnection() {
  return await (await getConnectionPool()).connect();
}

module.exports = {
  getConnectionPool,
  getConnection,
  sql,
  pool,
};
