const sql = require("mssql");

const dbConfig = {
  user: process.env.DB_USER, 
  password: process.env.DB_PASSWORD, 
  server: process.env.DB_SERVER, 
  database: process.env.DB_DATABASE, 
  port: parseInt(process.env.DB_PORT || '1433'), 
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
