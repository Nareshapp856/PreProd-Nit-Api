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

app.post("/execute", (req, res) => {
  try {
    const { code } = req.body;

    // Create a new context for the code to run
    const context = {
      result: undefined,
      console: {
        log: (...args) => {
          // Capture console.log output
          context.result = util.format(...args);
        },
      },
    };

    // Run the code in a new script
    vm.createContext(context);
    vm.runInContext(code, context);

    res.json({ result: context.result });
  } catch (error) {
    console.error("Error:4", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/apinit/Fetch_StudentEmail", async (req, res) => {
  try {
    console.info("Method CheckEmail");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.body; // No need to stringify the request body
    console.info(requestData);

    const { Email } = requestData;

    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1

    const result = await sql.query`
            EXEC [dbo].[Usp_Fetch_StudentEmail]
            @Email   = ${Email}
             `;

    console.log("CheckEmail", result);

    // Check if the recordset is not empty or undefined
    if (result.recordset !== undefined && result.recordset.length > 0) {
      const recordsetData = result.recordset;

      // Log the recordset or return it in the response
      console.log("Stored procedure executed successfully:", recordsetData);

      res.status(200).json({
        success: true,
        message: "Stored procedure executed successfully",
        dbresult: recordsetData,
      });
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

app.post("/apinit/FetchTechnologyBy_Email", async (req, res) => {
  try {
    console.info("Method CheckEmail");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.body; // No need to stringify the request body
    console.info(requestData);

    const { Email } = requestData;

    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1

    const result = await sql.query`
            EXEC [dbo].[Usp_FetchTechnologyBy_Email]
            @Email   = ${Email}
             `;

    console.log("ListOftechnologies", result);

    // Check if the recordset is not empty or undefined
    if (result.recordset !== undefined && result.recordset.length > 0) {
      const recordsetData = result.recordset;

      // Log the recordset or return it in the response
      console.log("Stored procedure executed successfully:", recordsetData);

      res.status(200).json({
        success: true,
        message: "Stored procedure executed successfully",
        dbresult: recordsetData,
      });
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

app.post("/apinit/Retrive_SlotDetails_V1", async (req, res) => {
  try {
    console.info("Method listofSlots");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.body; // No need to stringify the request body
    console.info(requestData);

    const { WeekNumber, TechnologyId } = requestData;

    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1

    const result = await sql.query`
            EXEC [dbo].[Usp_RetrieveAvailability_SlotDetails_V1]
         @WeekNumber=${WeekNumber},
         @TechnologyId=${TechnologyId}
            
           `;

    console.log("ListSlots", result);

    // Check if the recordset is not empty or undefined
    if (result.recordset !== undefined && result.recordset.length > 0) {
      const recordsetData = result.recordset;

      // Log the recordset or return it in the response
      console.log("Stored procedure executed successfully:", recordsetData);

      res.status(200).json({
        success: true,
        message: "Stored procedure executed successfully",
        dbresult: recordsetData,
      });
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

app.post("/apinit/Update_BookSlot_V1", async (req, res) => {
  try {
    console.info("Method listofSlots");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.body; // No need to stringify the request body
    console.info(requestData);

    const {
      WeekNumber,
      DayNumber,
      SlotInTime,
      SlotOutTime,
      StudentId,
      TechnologyId,
    } = requestData;

    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1;

    const result = await sql.query`
            EXEC    [dbo].[BookSlot_V1]
         @WeekNumber=${WeekNumber},
         @DayNumber= ${DayNumber},
         @SlotInTime=${SlotInTime},
         @SlotOutTime=${SlotOutTime},
         @StudentId=${StudentId},
         @TechnologyId=${TechnologyId}
        `;

    console.log("ListSlots", result);

    // Check if the recordset is not empty or undefined
    if (result.recordset !== undefined && result.recordset.length > 0) {
      const recordsetData = result.recordset;

      // Log the recordset or return it in the response
      console.log("Stored procedure executed successfully:", recordsetData);

      const AssignedMetorId = recordsetData?.[0]?.MentorId;
      console.log("checked mentor id");
      console.log(AssignedMetorId);

      if (
        recordsetData?.[0]?.Message?.includes(
          "Your slot has been successfully booked"
        )
      ) {
        const weekNumber = WeekNumber;
        const dayNumber = DayNumber;
        const {
          eachDayOfInterval,
          startOfWeek,
          addWeeks,
        } = require("date-fns");

        const startOfWeekDate = startOfWeek(
          `${new Date().getFullYear()}-01-01`,
          {
            weekStartsOn: 0,
          }
        );
        const startDateWithinWeek = addWeeks(startOfWeekDate, weekNumber - 1);

        const endDateWithinWeek = addDays(startDateWithinWeek, dayNumber);
        console.log(
          "-==-=-=",
          startDateWithinWeek,
          new Date(endDateWithinWeek).getMonth()
        );

        const datesRange = eachDayOfInterval({
          start: startDateWithinWeek,
          end: endDateWithinWeek,
        });

        console.log(datesRange[dayNumber - 1].getDate());

        const startDateOfWeek = startOfWeek(new Date());

        const firstNameResult = await sql.query`
                    SELECT FirstName FROM student WHERE StudentID=${StudentId}
                `;
        const firstName = firstNameResult.recordset[0]?.FirstName;

        const zoomLinkResult = await sql.query`
                    SELECT m.ZoomLink,m.Mentor_EmailId
                    FROM MENTORS m
                    WHERE TechnologyId=${TechnologyId}   and MENTOR_Id=${AssignedMetorId}
                    
                `;
        const zoomLink = zoomLinkResult.recordset[0]?.ZoomLink;
        const Mentor_EmailId = zoomLinkResult.recordset[0]?.Mentor_EmailId;

        console.log(zoomLink, requestData.Email, firstName);

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "virtuallab@nareshit.com",
            pass: "flty lonc aczf ggqv",
          },
        });

        const mailOptions = {
          from: "virtuallab@nareshit.com",
          to: requestData.Email,
          bcc: Mentor_EmailId,
          subject: `Virtual Lab slot booking ${datesRange[
            dayNumber - 1
          ].getDate()}-${new Date(endDateWithinWeek).getMonth() + 1}-${new Date(
            endDateWithinWeek
          ).getFullYear()} ${new Date(
            `01/01/2000 ${SlotInTime}`
          ).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          })} - ${new Date(`01/01/2000 ${SlotOutTime}`).toLocaleTimeString(
            "en-US",
            { hour: "numeric", minute: "2-digit" }
          )}

`,

          text: `Dear ${firstName}



Greetings for the day!


Thank you for your interest in NareshIT offerings!


In our endeavour to provide our learners with previewresult()


class learning opportunities we continue to bring in new features and facilities. 
One such initiative is to provide "Live Personal Virtual Mentoring" to ensure you get the advantage of personal technical mentoring to clarify all your technical queries and get you a learning experience on par with physical learning.



Congratulations! Your Live Personal Virtual Mentoring slot is confirmed.Below mentioned are your slot details:


Date: ${datesRange[dayNumber - 1].getDate()}-${
            new Date(endDateWithinWeek).getMonth() + 1
          }-${new Date(endDateWithinWeek).getFullYear()}
Time: ${new Date(`01/01/2000 ${SlotInTime}`).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          })} - ${new Date(`01/01/2000 ${SlotOutTime}`).toLocaleTimeString(
            "en-US",
            { hour: "numeric", minute: "2-digit" }
          )}


Link Mentioned Below:
${zoomLink}
Zoom Link To connect with your personal mentor:
Join our Cloud HD Video Meeting.



Best Regards,
Team NareshIT.



Note: Please login 5 Minutes before your slot timing. Your slot shall stand cancelled if you fail to login within 5 Minutes of your slot start time. Ex: You have to mandatorily login before 2:05PM for a 2PM slot.`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.error(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
      }
      res.status(200).json({
        success: true,
        message: "Stored procedure executed successfully",
        dbresult: recordsetData,
      });
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
    sql.close((err) => {
      if (err) {
        console.error("Error closing SQL connection:", err);
      }
    });
  }
});



app.put("/Update_UserLogoutTime", async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
