const db = require("../config/db");

/**
 * Executes a SQL query and returns the result.
 * @param {string} query - The SQL query to execute.
 * @returns {Promise<Object[]>} - The result set from the query.
 */
async function query(query, options = {}) {
  try {
    const pool = await db.getConnection();
    const result = await pool.request().query(query);

    if (options.rowsAffected) {
      return result.rowsAffected;
    }

    return result.recordset;
  } catch (err) {
    console.error("Error executing query:", err);
    throw err;
  }
}

/**
 * Executes a SQL query with parameters and returns the result.
 * @param {string} query - The SQL query to execute.
 * @param {string[]} [inputs=[]] - List of parameter names.
 * @param {string[]} [types=[]] - List of SQL data types corresponding to the parameters.
 * @param {{}} [options={}] - options that are requestired to be passed into input query.
 * @param {any[]} [parameters=[]] - List of parameter values.
 * @returns {Promise<Object[]>} - The result set from the query.
 */
// async function inputQuery(query, inputs = [], types = [], parameters = []) {
//   try {
//     const pool = await db.getConnection();
//     const request = pool.request();

//     inputs.forEach((input, index) => {
//       if (types[index] === "Structured") {
//         request.input(input, db.sql.TVP, parameters[index]);
//       } else if (db.sql[types[index]]) {
//         request.input(input, db.sql[types[index]], parameters[index]);
//       } else {
//         console.error(`Invalid SQL type: ${types[index]}`);
//         throw new Error(`Invalid SQL type: ${types[index]}`);
//       }
//     });

//     const result = await request.query(query);
//     return result.recordset;
//   } catch (err) {
//     console.error("Error executing query:", err);
//     throw err;
//   }
// }

// await inputQuery(
//   query,
//   [
//     "FirstName",
//     "LastName",
//     "Email",
//     "PhoneNumber",
//     "TechnologyName",
//     "Password",
//   ],
//   [
//     sqlTypes.varchar,
//     sqlTypes.varchar,
//     sqlTypes.varchar,
//     sqlTypes.varchar,
//     sqlTypes.varchar,
//     sqlTypes.varchar,
//   ],
//   [FirstName, LastName, Email, PhoneNumber, TechnologyName, Password],
//   { output: ["message"], outputTypes: [sqlTypes.varchar] }
// );

async function inputQuery(
  query,
  inputs = [],
  types = [],
  parameters = [],
  // options also takes outputs and there types
  options = {}
) {
  try {
    const pool = await db.getConnection();
    const request = pool.request();

    inputs.forEach((input, index) => {
      if (types[index] === "Structured") {
        request.input(input, db.sql.TVP, parameters[index]);
      } else if (db.sql[types[index]]) {
        request.input(input, db.sql[types[index]], parameters[index]);
      } else {
        console.error(`Invalid SQL type: ${types[index]}`);
        throw new Error(`Invalid SQL type: ${types[index]}`);
      }
    });

    // If We have output perameters.
    if (options.output) {
      options.output.forEach((output, index) => {
        if (db.sql[options.outputTypes[index]]) {
          request.output(output, db.sql[options.outputTypes[index]]);
        }
      });
    }

    const result = await request.query(query);

    const outputValues = result?.output || {};

    return { ...result, outputValues };
  } catch (err) {
    //console.error("Error executing query:", err);
    throw err;
  }
}

module.exports = { query, inputQuery };
