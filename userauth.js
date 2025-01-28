"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const sql = require("mssql");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3009;

// SQL Server connection configuration
const sqlConfig = {
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

// Middleware
app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Utility for sleep
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Authenticate Student
 */
app.post("/api/nit_v1/AuthenticateStudent", async (req, res) => {
  try {
    const { UserName, Password } = req.body;
    console.log("Request Body:", req.body);

    console.info("Authenticating Student...");
    const pool=await sql.connect(sqlConfig);

    
    const request = pool.request();

    request.input("UserName", sql.NVarChar, UserName);
    request.input("Password", sql.NVarChar, Password);
    request.output("Message", sql.NVarChar(500));

    const result = await request.execute("[dbo].[Usp_AuthenticateStudent_V2]");
    console.log("Stored Procedure Result:", result.recordset);

    if (result.recordset && result.recordset.length > 0) {
      const message = result.recordset[0].MESSAGE;

      if (message) {
        res.status(401).send(message);
      } else {
        res.status(200).send(result.recordset[0]);
      }
    } else {
      res.status(401).send("Invalid UserName or Password");
    }
  } catch (error) {
    console.error("Error Authenticating Student:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    sql.close();
  }
});

/**
 * Authenticate User and Send OTP
 */
app.post("/api/nit_v1/AuthincateUser&SendOtp_V1", async (req, res) => {
  const { userMail: userName } = req.body;

  if (!userName) {
    return res.status(400).send("UserName is required.");
  }

  try {
    const pool = await sql.connect(sqlConfig);

    const result = await pool
      .request()
      .input("UserName", sql.VarChar(200), userName)
      .execute("[dbo].[VaidateEmailandSendOtp]");

    const outputMessage = result.recordset[0]?.Message;
    const otp = result.recordset[0]?.OTP;

    if (outputMessage.includes("User is not found")) {
      return res.status(401).send(outputMessage);
    }

    if (!otp) {
      return res.status(500).send("Failed to generate OTP.");
    }

    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: userName,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}`,
    });

    res.status(200).send("OTP sent successfully.");
  } catch (err) {
    console.error("Error Sending OTP:", err);
    res.status(500).send("Internal Server Error");
  } finally {
    sql.close();
  }
});

/**
 * Update User Password
 */
app.put("/api/nit_v1/Update_UserPassword", async (req, res) => {
  try {
    console.info("Updating User Password...");
    await sql.connect(sqlConfig);

    const { userMain: UserName, updatedPassword: UserPassword } = req.body;

    if (!UserName || !UserPassword) {
      return res.status(400).json({
        success: false,
        message: "UserName and UserPassword are required",
      });
    }

    const result = await sql.query`
      EXEC Usp_Update_Password @UserName=${UserName}, @UserPassword=${UserPassword}
    `;

    if (result.recordset && result.recordset.length > 0) {
      res.status(200).json({
        success: true,
        message: "Password updated successfully",
        dbresult: result.recordset,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "No records updated",
        dbresult: null,
      });
    }
  } catch (err) {
    console.error("Error Updating Password:", err);
    res.status(500).json({
      success: false,
      message: "Error executing stored procedure",
      apperror: err.message,
    });
  } finally {
    sql.close();
  }
});

/**
 * OTP Verification
 */
app.post("/api/nit_v1/User_OtpVerification", async (req, res) => {
  try {
    console.info("Verifying OTP...");
    await sql.connect(sqlConfig);

    const { userMain: UserEmail, otp } = req.body;

    const result = await sql.query`
      EXEC Usp_Varify_Otp @UserEmail=${UserEmail}, @OTP=${otp}
    `;

    if (result.recordset && result.recordset.length > 0) {
      res.status(200).json(result.recordset);
    } else {
      res.status(200).json({
        success: true,
        message: "No records found.",
        dbresult: null,
      });
    }
  } catch (err) {
    console.error("Error Verifying OTP:", err);
    res.status(500).json({
      success: false,
      message: "Error executing stored procedure",
      apperror: err,
    });
  } finally {
    sql.close();
  }
});

/**
 * Update User Logout Time
 */
app.put("/api/nit_v1/Update_UserLogoutTime", async (req, res) => {
  try {
    console.info("Updating User Logout Time...");
    await sql.connect(sqlConfig);

    const { userName } = req.body;

    if (!userName) {
      return res.status(400).json({
        success: false,
        message: "userName is required",
      });
    }

    const result = await sql.query`
      EXEC [dbo].[Usp_User_LogoutTime] @userName=${userName}
    `;

    if (result.recordset && result.recordset.length > 0) {
      res.status(200).json({
        success: true,
        message: "Logout time updated successfully",
        dbresult: result.recordset,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "No records found.",
        dbresult: null,
      });
    }
  } catch (err) {
    console.error("Error Updating Logout Time:", err);
    res.status(500).json({
      success: false,
      message: "Error executing stored procedure",
      apperror: err,
    });
  } finally {
    sql.close();
  }
});

// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

module.exports = { userauth: app };