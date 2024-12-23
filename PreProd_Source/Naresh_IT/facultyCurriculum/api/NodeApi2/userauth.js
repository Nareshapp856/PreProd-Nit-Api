"use strict";
const axios = require("axios");
const adalNode = require("adal-node");
require("dotenv").config();
const fs = require("fs");
const http = require("https");
const express = require("express");
const fetch = require("node-fetch");
//const Fingerprint = require('express-fingerprint');
const bodyParser = require("body-parser");
const path = require("path");
//const morgan = require('morgan');
const sql = require("mssql");
const { promisify } = require("util");
const compression = require("compression");
const speakeasy = require("speakeasy");
const QRCode = require("qrcode");
const { v4: uuidv4 } = require("uuid");
const app = express();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
//const { powerbi, models } = require('powerbi-client');
const router = express.Router();
const {
  startOfYear,
  addWeeks,
  getMonth,
  format,
  startOfWeek,
  addDays,
  max,
} = require("date-fns");

const { getTestcases, getProgramDetails } = require("./constants/data");

const PORT = process.env.PORT || 3009;
const generateSecret = () =>
  speakeasy.generateSecret({ length: 20, name: "YourApp" });
const userSecrets = {};

// JSON file path for caching
const cacheFilePath = path.join(__dirname, "questionCache.json");
const vm = require("vm");
const util = require("util");
const cors = require("cors");
const corsOptions = {
  origin: "*", // Add the origin of your frontend application
  optionsSuccessStatus: 200,
};

// Configuration
const clientId = "<your-client-id>";
const clientSecret = "<your-client-secret>";
const tenantId = "<your-tenant-id>";
const resourceId = "https://analysis.windows.net/powerbi/api";

app.use(cors(corsOptions));
const sleep = util.promisify(setTimeout);

const options = {
  key: fs.readFileSync("path/to/private.key"),
  cert: fs.readFileSync("path/to/certificate.crt"),
};
let isProcessing = false;
let isSubmitting = false;
const submissionQueue = [];
const sleep1 = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// SQL Server connection configuration
const sqlConfig = {
  user: process.env.SQL_UID,
  password: process.env.SQL_PWD,
  server: process.env.SQL_SERVER,
  database: process.env.SQL_DATABASE,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

// Connection Pool setup
let pool = new sql.ConnectionPool({
  ...sqlConfig,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
});
pool.connect();

const queryAsync = promisify(pool.query).bind(pool);

app.use(bodyParser.json());
/*app.use(cors({ origin: 'https://www.nareshit.net' }));*/
//app.options('/execute', (req, res) => {
//    res.setHeader('Access-Control-Allow-Origin', 'https://www.nareshit.net');
//    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST');
//    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//    res.sendStatus(200);
//});
app.use(express.json());
//app.use(Fingerprint());
//app.use((req, res, next) => {
//    res.setHeader('Access-Control-Allow-Origin', 'https://www.nareshit.net');
//    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST');
//    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//    next();
//});

app.post("/api/nit_v1/AuthenticateStudent", async (req, res) => {
  //   try {
  //     console.info("Method CheckUsername");
  //     await sql.connect(sqlConfig);
  //     console.log(req.body);
  //     const requestData = req.body;
  //     console.info(requestData);

  //     const { UserName, Password } = requestData;

  //     const request = new sql.Request();

  //     // Add input parameters
  //     request.input("UserName", sql.NVarChar, UserName);
  //     request.input("Password", sql.NVarChar, Password);

  //     // Add output parameter
  //     request.output("Message", sql.NVarChar(500)); // Set a reasonable length for the output parameter

  //     // Execute stored procedure
  //     const result = await request.execute("[dbo].[Usp_AuthenticateStudent_V1]");

  //     console.log("CheckUsername", result);

  //     // Check if the recordset contains a message
  //     if (
  //       result.recordset &&
  //       result.recordset.length > 0 &&
  //       result.recordset[0].MESSAGE
  //     ) {
  //       const message = result.recordset[0].MESSAGE;
  //       res.status(401).send(message);
  //     } else if (result.recordset && result.recordset.length > 0) {
  //       // Handle the case where user details are returned
  //       const user = result.recordset[0];
  //       res.status(200).send({
  //         IsAuthenticated: true,
  //         studentId: user.studentId,
  //         UserName: user.UserName,
  //         BatchName: user.BatchName,
  //         FirstName: user.FirstName,
  //         LastName: user.LastName,
  //         role: user.role,
  //       });
  //     } else if (result.output && result.output.Message) {
  //       // Handle the case where the output message is provided
  //       const message = result.output.Message;
  //       res.status(401).send(message);
  //     } else {
  //       res.status(401).send("Invalid username and password");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error.message);
  //     res.status(500).send("Internal Server Error");
  //   } finally {
  //     sql.close();
  //   }
  //   // });
  //   try {
  //     console.info("Method CheckUsername");
  //     await sql.connect(sqlConfig);
  //     console.log(req.body);
  //     const requestData = req.body;
  //     console.info(requestData);

  //     const { UserName, Password } = requestData;

  //     const request = new sql.Request();

  //     // Add input parameters
  //     request.input("UserName", sql.NVarChar, UserName);
  //     request.input("Password", sql.NVarChar, Password);

  //     // Add output parameter
  //     request.output("Message", sql.NVarChar(100));

  //     // Execute stored procedure
  //     const result = await request.execute("Usp_AuthenticateStudent_V1");

  //     console.log("CheckUsername Result:", result);

  //     // Check for message in output parameter
  //     if (result.output && result.output.Message) {
  //       const message = result.output.Message;

  //       // If the message indicates an error, send a 401 response
  //       if (
  //         result.recordset.length === 0 &&
  //         result.recordset[0].IsAuthenticated === 0
  //       ) {
  //         return res.status(401).send(message);
  //       }

  //       // Otherwise, send the details if authentication is successful
  //       return res.status(200).send(result.recordset[0]);
  //     }

  //     // Default response if no message is provided
  //     res.status(401).send("Invalid username and password");
  //   } catch (error) {
  //     console.error("Error:", error.message);
  //     res.status(500).send("Internal Server Error");
  //   } finally {
  //     sql.close();
  //   }
  // });

  try {
    console.info("Method CheckUsername");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.body;
    console.info(requestData);

    const { UserName, Password } = requestData;

    const request = new sql.Request();

    // Add input parameters
    request.input("UserName", sql.NVarChar, UserName);
    request.input("Password", sql.NVarChar, Password);

    // Add output parameter
    request.output("Message", sql.NVarChar(500)); // Set a reasonable length for the output parameter

    // Execute stored procedure
    const result = await request.execute("[dbo].[Usp_AuthenticateStudent_V2]");

    console.log("CheckUsername", result.recordset);

    // Check if the recordset contains a message
    if (
      result.recordset &&
      result.recordset.length > 0 &&
      result.recordset[0].MESSAGE
    ) {
      const message = result.recordset[0].MESSAGE;
      res.status(401).send(message);
    } else if (result.recordset && result.recordset.length > 0) {
      // Handle the case where user details are returned
      const user = result.recordset[0];

      res.status(200).send(
        user
        // user.RedirectURL
        //   ? result.recordset[0]
        //   : {
        //       IsAuthenticated: user.IsAuthenticated,
        //       studentId: user.studentId,
        //       UserName: user.UserName,
        //       BatchName: user.BatchName,
        //       FirstName: user.FirstName,
        //       LastName: user.LastName,
        //       role: user.role,
        //     }
      );
    }
    //else if (result.output && result.output.Message) {
    // Handle the case where the output message is provided
    //   const message = result.output.Message;
    //   res.status(401).send(message);
    // }
    else {
      res.status(401).send("Invalid UserName or Password");
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  } finally {
    sql.close();
  }
});

app.post("/api/nit_v1/AuthincateUser&SendOtp_V1", async (req, res) => {
  const { userMail: userName } = req.body;

  if (!userName) {
    return res.status(400).send("UserName is required.");
  }

  let pool;
  try {
    // Connect to SQL Server
    pool = await sql.connect(sqlConfig);
    console.log("step1");

    // Call the stored procedure to update OTP
    const result = await pool
      .request()
      .input("UserName", sql.VarChar(200), userName)
      .execute("[dbo].[VaidateEmailandSendOtp]"); // Changed the procedure name here
    console.log("step2");

    // Log the entire result to debug
    console.log("Stored procedure result:", result);

    // Extract the message and OTP
    const outputMessage = result.recordset[0].Message;
    const otp = result.recordset[0].OTP;

    console.log("Output message:", outputMessage);
    console.log("OTP:", otp);

    // Check if the user is valid
    if (outputMessage.includes("User is not found")) {
      return res.status(401).send(outputMessage);
    }

    if (!otp) {
      return res.status(500).send("Failed to generate OTP.");
    }
    console.log("step3");

    // Create a transporter for sending the email
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    console.log("step4", otp);

    // Send OTP to the user
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: userName,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}`,
    });
    console.log("step5");

    // Check if email was sent successfully
    if (info.accepted.length === 0) {
      return res.status(500).send("Failed to send OTP email.");
    }

    res.status(200).send("OTP sent successfully.");
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  } finally {
    // Close SQL connection
    if (pool) {
      await pool.close();
    }
  }
});

app.put("/api/nit_v1/Update_UserPassword", async (req, res) => {
  try {
    console.info("Update User Password");
    await sql.connect(sqlConfig);

    // Log the entire request body for debugging
    console.log("Request body:", req.body);

    // Extract and validate UserName and UserPassword
    const { userMain: UserName, updatedPassword: UserPassword } = req.body;

    if (!UserName || !UserPassword) {
      return res.status(400).json({
        success: false,
        message: "UserName and UserPassword are required",
      });
    }

    console.info("Executing stored procedure with UserName:", UserName);

    // Execute the stored procedure
    const result = await sql.query`
      EXEC Usp_Update_Password
        @UserName=${UserName},
        @UserPassword=${UserPassword}
    `;
    console.log("Stored procedure result:", result);

    // Check if the recordset is not empty or undefined
    if (result.recordset && result.recordset.length > 0) {
      const recordsetData = result.recordset;
      console.log("Stored procedure executed successfully:", recordsetData);
      res.status(200).json({
        success: true,
        message: "Stored procedure executed successfully",
        dbresult: recordsetData,
      });
    } else {
      console.log(
        "Stored procedure executed successfully, but no records returned."
      );
      res.status(200).json({
        success: true,
        message:
          "Stored procedure executed successfully, but no records returned.",
        dbresult: null,
      });
    }
  } catch (err) {
    console.error("Error executing stored procedure:", err);
    res.status(500).json({
      success: false,
      message: "Error executing stored procedure",
      apperror: err.message, // Provide a more detailed error message
    });
  } finally {
    // Ensure the connection is properly closed
    try {
      await sql.close();
    } catch (closeErr) {
      console.error("Error closing SQL connection:", closeErr);
    }
  }
});

app.post("/api/nit_v1/User_OtpVerification", async (req, res) => {
  try {
    console.info("Otp Varification");
    await sql.connect(sqlConfig);

    // use post method for crediantls cause it is more secure.
    const { userMain: UserEmail, otp } = req.body;

    console.log(UserEmail, otp);

    //if (!UserEmail) throw new Error("Invalid User !");
    const result = await sql.query`
     EXEC Usp_Varify_Otp
     @UserEmail=${UserEmail},
     @OTP=${otp}`;
    //const outputMessage = result.recordset[0].Message;

    //console.log("Output message:", outputMessage);

    // Check if the recordset is not empty or undefined
    if (result.recordset !== undefined && result.recordset.length > 0) {
      const recordsetData = result.recordset;

      // Log the recordset or return it in the response
      console.log("Stored procedure executed successfully:", recordsetData);

      res.status(200).json(recordsetData);
    } else {
      // Handle the case where the recordset is empty or undefined
      console.log(
        "Stored procedure executed successfully, but no records returned."
      );
      res.status(200).json({
        success: true,
        message:
          "Stored procedure executed successfully, but no records returned.",
        dbresult: null,
      });
    }
  } catch (err) {
    console.error("Error executing stored procedure:", err);
    res.status(500).json({
      success: false,
      message: "Error executing stored procedure",
      apperror: err,
    });
  } finally {
    sql.close();
  }
});

app.put("/api/nit_v1/Update_UserLogoutTime", async (req, res) => {
  try {
    console.info("Update User Logout Time");
    await sql.connect(sqlConfig);

    const requestData = req.body;
    console.log("Request body:", requestData);

    const { userName } = requestData;
    if (!userName) {
      return res.status(400).json({
        success: false,
        message: "userName is required",
      });
    }

    console.info("Executing stored procedure with userName:", userName);
    const result = await sql.query`
      exec [dbo].[Usp_User_LogoutTime] @userName=${userName}`;
    console.info("Stored procedure result:", result);

    if (result.recordset && result.recordset.length > 0) {
      const recordsetData = result.recordset;
      console.log("Stored procedure executed successfully:", recordsetData);
      res.status(200).json({
        success: true,
        message: "Stored procedure executed successfully",
        dbresult: recordsetData,
      });
    } else {
      console.log(
        "Stored procedure executed successfully, but no records returned."
      );
      res.status(200).json({
        success: true,
        message:
          "Stored procedure executed successfully, but no records returned.",
        dbresult: null,
      });
    }
  } catch (err) {
    console.error("Error executing stored procedure:", err);
    res.status(500).json({
      success: false,
      message: "Error executing stored procedure",
      apperror: err,
    });
  } finally {
    sql.close();
  }
});

// need different port to run this file alone

app.listen(6013, () => {
  console.log(`Server is running on port ${6013}`);
});
