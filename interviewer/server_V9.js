"use strict";
const axios = require("axios");

const express = require("express");


const path = require("path");
//const morgan = require('morgan');
const sql = require("mssql");
const { promisify } = require("util");
const compression = require("compression");

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

const userSecrets = {};

// JSON file path for caching
const cacheFilePath = path.join(__dirname, "questionCache.json");
const vm = require("vm");
const util = require("util");

//app.use(browserCheckMiddleware);
const sleep = util.promisify(setTimeout);

let isProcessing = false;
let isSubmitting = false;
const submissionQueue = [];
const sleep1 = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
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


app.post("/apinit/execute", (req, res) => {
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
app.get("/apinit/register-2fa", async (req, res) => {
  const { username } = req.query;

  // Generate a new secret for the user
  const secret = speakeasy.generateSecret({ length: 20, name: "YourApp" });
  userSecrets[username] = secret.base32;

  // Generate a URL for the QR code
  const otpauthUrl = speakeasy.otpauthURL({
    secret: secret.ascii,
    label: "YourApp",
    issuer: "YourApp",
  });

  try {
    // Generate QR code image
    const qrCodeImage = await QRCode.toDataURL(otpauthUrl);

    // Send the QR code image to the user
    res.send(`<img src="${qrCodeImage}" alt="QR Code for 2FA" />`);
  } catch (error) {
    console.error("Error generating QR code:", error);
    res.status(500).json({ message: "Error generating QR code." });
  }
});
// Render the registration page
app.get("/apinit/register", (req, res) => {
  res.render("register"); // Assuming you have a register.ejs file
});
app.post("/apinit/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Create a new SQL Server connection pool
    let pool = await sql.connect(sqlConfig);

    // Check if the provided username and password match a record in the UserLogin table
    const result = await pool
      .request()
      .input("Username", sql.VarChar(sql.MAX), username)
      .input("Password", sql.VarChar(sql.MAX), password).query(`
                SELECT UserID, Username FROM UserLogin
                WHERE Username = @Username AND Password = @Password AND IsActive = 1;
            `);

    const user = result.recordset[0];

    if (user) {
      // Generate a JSON Web Token (JWT)
      const token = jwt.sign(
        { userId: user.UserID, username: user.Username },
        "your_secret_key"
      );
      console.log(token);
      // Send the token in the response
      res.json({ token });
    } else {
      // Unauthorized if login fails
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).send("Internal Server Error");
  }  
});
app.post("/apinit/register", async (req, res) => {
  const { username, password, studentRegisterId } = req.body;

  try {
    // Create a new SQL Server connection pool
    let pool = await sql.connect(sqlConfig);

    // Check if the studentID exists in the Student table
    const studentCheckResult = await pool
      .request()
      .input("StudentID", sql.VarChar, studentRegisterId)
      .query(
        "SELECT TOP 1 1 AS StudentExists FROM Student WHERE StudentID = @StudentID"
      );

    const studentExists = studentCheckResult.recordset.length > 0;

    if (!studentExists) {
      // Respond with a failure message if the studentID is not registered
      return res.status(400).json({
        success: false,
        message:
          "Provided Student Registration id not found. Please contact admin.",
      });
    }

    // Check if the username is already registered with a different student registration ID
    const existingUserCheckResult = await pool
      .request()
      .input("Username", sql.VarChar(sql.MAX), username)
      .input("StudentID", sql.VarChar(sql.MAX), studentRegisterId)
      .query(
        "SELECT TOP 1 1 AS UserExists FROM UserLogin WHERE  StudentID = @StudentID"
      );

    const userExists = existingUserCheckResult.recordset.length > 0;

    if (userExists) {
      // Respond with a failure message if the username is already registered with a different student registration ID
      return res.status(400).json({
        success: false,
        message:
          "Username is already registered with a different Student Registration ID.",
      });
    }

    // Insert user login information into the UserLogin table
    const result = await pool
      .request()
      .input("Username", sql.VarChar(sql.MAX), username)
      .input("Password", sql.VarChar(sql.MAX), password)
      .input("IsActive", sql.Bit, true)
      .input("StudentID", sql.VarChar(sql.MAX), studentRegisterId)
      .input("CreatedBy", sql.VarChar(sql.MAX), "admin") // Replace with actual admin username
      .input("CreatedAt", sql.Time, new Date())
      .input("ModifiedBy", sql.VarChar(sql.MAX), null)
      .input("ModifiedAt", sql.Time, null).query(`
                INSERT INTO UserLogin (Username, Password, IsActive, StudentID, CreatedBy, CreatedAt, ModifiedBy, ModifiedAt)
                VALUES (@Username, @Password, @IsActive, @StudentID, @CreatedBy, @CreatedAt, @ModifiedBy, @ModifiedAt);
                SELECT SCOPE_IDENTITY() AS UserID;
            `);

    // Get the inserted UserID
    const userID = result.recordset[0].UserID;

    // Generate QR code content
    const qrCodeContent = `UserID: ${userID}\nUsername: ${username}\nPassword: ${password}\nStudentID: ${studentRegisterId}`;

    // Respond with the QR code content
    res.json({ success: true, qrCodeContent });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }  
});

app.get("/apinit/checkUserAvailability", async (req, res) => {
  try {
    const username = req.query.username;

    // Create a SQL connection pool
    let pool = await new sql.ConnectionPool(sqlConfig).connect();

    // Query the database to check username availability
    const result = await pool
      .request()
      .input("username", sql.VarChar, username)
      .query(
        "SELECT COUNT(*) AS count FROM UserLogin WHERE Username = @username"
      );

    // Check if the username is available
    const isAvailable = result.recordset[0].count === 0;

    res.json({ available: isAvailable });
  } catch (error) {
    console.error("Error checking username availability:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } 
});
app.post("/apinit/verify-2fa", (req, res) => {
  const { username, token } = req.body;

  // Retrieve the user's secret from storage
  const secret = userSecrets[username];

  if (!secret) {
    return res
      .status(400)
      .json({ message: "User not found or 2FA not enabled." });
  }

  // Verify the token
  const verified = speakeasy.totp.verify({ secret, encoding: "base32", token });

  if (verified) {
    res.json({ message: "Token verified successfully." });
  } else {
    res.status(401).json({ message: "Invalid token." });
  }
});
//app.get('/', (req, res) => {
//    const deviceId = req.fingerprint.hash;
//    res.send(`Device ID: ${deviceId}`);
//});
// Middleware
app.use(express.static(path.join(__dirname, "/")));
// Route for the specific image

app.get("/apinit/favicon.ico", (req, res) => res.status(204));

// Set the view engine to EJS and specify the views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Warm-up during application startup
async function warmUp() {
  try {
    await pool.connect();
    const warmUpQuestions = await fetchQuestionsFromCache(5); // Try to fetch from cache first
    console.log("Warm-up complete.");
  } catch (error) {
    console.error("Error during warm-up:", error.message);
  }  
}

warmUp();

// Routes
//app.get('/', (req, res) => {
//    res.render('studentExamPage');
//});
app.post("/apinit/testcreatortypes", async (req, res) => {
  try {
    // Extract data from the request
    const assessmentType = req.body.testName;
    const assessmentNature = req.body.testDescription;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;

    // Convert date and time strings to a format compatible with SQL Server
    const formattedStartDate = new Date(startDate)
      .toISOString()
      .slice(0, 22)
      .replace("T", " ");
    const formattedEndDate = new Date(endDate)
      .toISOString()
      .slice(0, 22)
      .replace("T", " ");

    // Use separate variables for time components
    const [startHour, startMinute] = startTime.split(":");
    const [endHour, endMinute] = endTime.split(":");

    // Format time strings with seconds and milliseconds
    const formattedStartTime = `${startHour}:${startMinute}:00.000`;
    const formattedEndTime = `${endHour}:${endMinute}:00.000`;

    // Insert data into the Test table using parameterized query
    const result = await queryAsync(
      `
    INSERT INTO dbo.Test (TestName, NatureOfTest, TestStartDate, TestEndDate, TestStartTime, TestEndTime) 
    VALUES (@testName, @natureOfTest, @startDate, @endDate, @startTime, @endTime)
`,
      {
        testName: assessmentType,
        natureOfTest: assessmentNature,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        startTime: formattedStartTime,
        endTime: formattedEndTime,
      }
    );

    // Check if the insertion was successful
    if (result.rowsAffected && result.rowsAffected[0] > 0) {
      console.log("Test record inserted successfully");

      // Redirect to the next page or send a response as needed
      res.status(200).json({ message: "Test record inserted successfully." });
    } else {
      console.error("Failed to insert test record");
      res.status(500).json({ message: "Failed to insert test record." });
    }
  } catch (error) {
    console.error("Error processing test creation:", error.message);
    res.status(500).json({ message: "Error processing test creation." });
  }  
});
app.get("/apinit/AdminHomePage", (req, res) => {
  res.render("AdminHomePage", { username: req.query.username });
});

app.get("/apinit/testSelection", (req, res) => {
  res.render("TestSelection", {
    /* Add any variables you want to pass to the view */
  });
});

app.get("/apinit/testcreator", (req, res) => {
  res.render("testcreator", {
    /* Add any variables you want to pass to the view */
  });
});

app.get("/apinit/testcreatortypes", (req, res) => {
  // Retrieve language ID and name from query parameters
  const languageId = req.query.languageId;
  const languageName = req.query.languageName;

  // Render the testcreatortypes view with the language information
  res.render("testcreatortypes", { languageId, languageName });
});

app.get("/apinit/page2", (req, res) => {
  res.render("Page2", {
    /* Add any variables you want to pass to the view */
  });
});

// Route to render a form for the user to input the number of questions
app.get("/apinit/selectQuestions", (req, res) => {
  res.render("selectQuestions");
});

app.get("/apinit/questionsSelectionViews", (req, res) => {
  res.render("questionSelectionViews"); // Check if the route handler matches the view name
});

app.get("/apinit/testviewpage1", (req, res) => {
  res.render("testviewpage1"); // Check if the route handler matches the view name
});
app.get("/apinit/listofAssessment", (req, res) => {
  res.render("listofAssessment"); // Check if the route handler matches the view name
});

app.get("/apinit/sheduletime", (req, res) => {
  res.render("sheduletime"); // Check if the route handler matches the view name
});

app.get("/apinit/UserHomePage", (req, res) => {
  res.render("UserHomePage"); // Check if the route handler matches the view name
});

//app.get('/studentExamPage', (req, res) => {
//    res.render('studentExamPage'); // Check if the route handler matches the view name
//});
app.get("/apinit/VirtualLab", (req, res) => {
  res.render("VirtualLab"); // Check if the route handler matches the view name
});
app.get("/apinit/technology", (req, res) => {
  res.render("technology"); // Check if the route handler matches the view name
});

app.get("/apinit/NITReports", async (req, res) => {
  try {
    const accessToken = await getAccessToken();

    // Generate embed token for your report
    const embedToken = jwt.sign(
      {
        aud: `https://powerbi.com`,
        exp: Math.floor(Date.now() / 1000) + 60 * 60, // Token expiration time (1 hour)
        roles: ["Viewer"], // Adjust roles as needed (Viewer, Contributor, ...)
        reports: [
          {
            id: "<your-report-id>",
            datasetId: "<your-dataset-id>",
            allowSaveAs: false,
            allowExport: true,
          },
        ],
      },
      clientSecret
    );

    res.render("NITReports", { embedToken });
  } catch (error) {
    console.error("Error retrieving access token:", error.message);
    res.status(500).send("Error retrieving access token");
  }
});

app.get("/apinit/NITReports", async (req, res) => {
  try {
    const accessToken = await getAccessToken();

    // Generate embed token for your report
    const embedToken = await generateEmbedToken(
      accessToken,
      "<your-report-id>",
      "<your-dataset-id>"
    );

    res.render("/apinit/NITReports", { embedToken });
  } catch (error) {
    console.error("Error retrieving access token:", error.message);
    res.status(500).send("Error retrieving access token");
  }
});

app.post("/apinit/assessment", (req, res) => {
  const technologyId = req.body.technologyId;
  const technologyName = req.body.technologyName;

  const MCQCheckboxQuestionInput = req.body.MCQCheckboxQuestionInput;
  const MCQCheckboxEasyCount = req.body.MCQCheckboxEasyCount;
  const MCQCheckboxMediumCount = req.body.MCQCheckboxMediumCount;
  const MCQCheckboxHardCount = req.body.MCQCheckboxHardCount;

  const MCQRadioQuestionInput = req.body.MCQRadioQuestionInput;
  const MCQRadioEasyCount = req.body.MCQRadioEasyCount;
  const MCQRadioMediumCount = req.body.MCQRadioMediumCount;
  const MCQRadioHardCount = req.body.MCQRadioHardCount;

  const FreeQuestionInput = req.body.FreeQuestionInput;
  const FreeQuestionEasyCount = req.body.FreeQuestionEasyCount;
  const FreeQuestionMediumCount = req.body.FreeQuestionMediumCount;
  const FreeQuestionHardCount = req.body.FreeQuestionHardCount;

  const CodingQuestionInput = req.body.CodingQuestionInput;
  const CodingQuestionEasyCount = req.body.CodingQuestionEasyCount;
  const CodingQuestionMediumCount = req.body.CodingQuestionMediumCount;
  const CodingQuestionHardCount = req.body.CodingQuestionHardCount;

  // Handle the received data as needed

  res.redirect("/apinit/assessment");
});

app.get("/apinit/assessment", (req, res) => {
  res.render("assessment");
});

app.get("/studentResultPage", (req, res) => {
  res.render("studentResultPage"); // Check if the route handler matches the view name
});

app.get("/apinit/RetriveResultPage", (req, res) => {
  res.render("RetriveResultPage"); // Check if the route handler matches the view name
});

app.get("/apinit/enrollStudent", (req, res) => {
  res.render("enrollStudent"); // Check if the route handler matches the view name
});

// Route to render the exam page with a specific question
app.get("/apinit/exam", async (req, res) => {
  const index = parseInt(req.query.index, 10) || 0;
  try {
    const questions = await fetchQuestionsFromCache(1); // Fetch one question at a time
    const currentQuestion = questions[0];
    res.render("examPage", {
      currentQuestion,
      currentIndex: index,
      totalQuestions: questions.length,
      questions,
    }); // Pass 'questions' variable to the template
  } catch (error) {
    console.error("Error fetching questions:", error.message);
    res.status(500).json({ message: "Error fetching questions." });
  }
});
// Route to render the test creation page
app.get("/apinit/testCreationPage", (req, res) => {
  res.render("testCreationPage");
});
app.get("/apinit/quesitontreeview", async (req, res) => {
  try {
    const technologies = await fetchTechnologiesWithModulesAndTopics();
    res.render("quesitontreeview", { technologies }); // Make sure to pass the 'technologies' variable here
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ message: "Error fetching data." });
  }
});
//quesitontreeview
//app.get('/quesitontreeview', (req, res) => {
//    res.render('quesitontreeview');
//});

// Route for processing the test creation form submission
app.post("/apinit/createTest", async (req, res) => {
  try {
    const mcqCount = parseInt(req.body.mcqQuestions, 10);
    const descriptiveQuestionsCount = parseInt(
      req.body.descriptiveQuestions,
      10
    );
    const matchingQuestionsCount = parseInt(req.body.matchingQuestions, 10);

    // Fetch questions for each type from the database
    const mcqQuestions = await fetchQuestionsFromDatabase1(
      "MCQQuestionALL1",
      mcqQuestionsCount
    );
    const descriptiveQuestions = await fetchQuestionsFromDatabase1(
      "DescriptiveQuestion",
      descriptiveQuestionsCount
    );
    const matchingQuestions = await fetchQuestionsFromDatabase1(
      "MatchingQuestions",
      matchingQuestionsCount
    );

    // Render the test creation page with the selected questions
    res.render("questionDisplay", {
      mcqQuestions,
      descriptiveQuestions,
      matchingQuestions,
    });
  } catch (error) {
    console.error("Error fetching questions:   ", error.message);
    res.status(500).json({ message: "Error fetching questions.    " });
  }
}); // Route to render the question selection page
app.get("/apinit/questionSelection", (req, res) => {
  res.render("questionSelection");
});

// Route for processing the question selection form submission
app.post("/apinit/createTest", async (req, res) => {
  try {
    const mcqQuestionsCount = parseInt(req.body.mcqQuestions, 10);
    const descriptiveQuestionsCount = parseInt(
      req.body.descriptiveQuestions,
      10
    );
    const matchingQuestionsCount1 = parseInt(req.body.matchingQuestions, 10);

    // Render the question display page with the selected counts
    res.render("questionDisplay", {
      mcqQuestionsCount,
      descriptiveQuestionsCount,
      matchingQuestionsCount1,
    });
  } catch (error) {
    console.error("Error processing question selection:", error.message);
    res.status(500).json({ message: "Error processing question selection." });
  }
});
app.get("/apinit/exam", async (req, res) => {
  const index = parseInt(req.query.index, 10) || 0;
  try {
    const questions = await fetchQuestionsFromCache(1); // Fetch one question at a time
    const currentQuestion = questions[0];
    res.render("examPage", {
      currentQuestion,
      currentIndex: index,
      totalQuestions: questions.length,
      questions,
    }); // Pass 'questions' variable to the template
  } catch (error) {
    console.error("Error fetching questions:", error.message);
    res.status(500).json({ message: "Error fetching questions." });
  }
});

//app.get('/fetchTechnologies', async (req, res) => {
//    try {
//        console.info("Fetch Technologes method Called");
//        const technologies = await fetchTechnologiesFromDatabase();
//        res.json(technologies);
//    } catch (error) {
//        console.error('Error fetching technologies:', error.message);
//        res.status(500).json({ message: 'Error fetching technologies.' });
//    }
//});
//app.get('/treeview', async (req, res) => {
//    try {
//        // Fetch data from the database (replace with your actual methods)
//        const technologies = await fetchTechnologiesWithModulesAndTopics();

//        // Render the treeview page with the data
//        res.render('treeview', { technologies });
//    } catch (error) {
//        console.error('Error fetching treeview data:', error.message);
//        res.status(500).json({ message: 'Error fetching treeview data.' });
//    }
//});

app.get("/apinit/fetchTechnologies", async (req, res) => {
  try {
    console.info("List of Technolgies");
    await sql.connect(sqlConfig);

    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1

    const result = await sql.query`
            EXEC USP_Get_Technologies
        
          
            
           `;

    console.log("ListTechnologies", result);

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
  }  
});

//app.get('/fetchModules/:technologyId', async (req, res) => {
//    const technologyId = req.params.technologyId;
//    try {
//        const modules = await fetchModulesFromDatabase(technologyId);
//        res.json(modules);
//    } catch (error) {
//        console.error('Error fetching modules:', error.message);
//        res.status(500).json({ message: 'Error fetching modules.' });
//    }
//});

// Route to fetch topics based on the selected module
//app.get('/fetchTopics/:moduleId', async (req, res) => {
//    const moduleId = req.params.moduleId;
//    try {
//        const topics = await fetchTopicsFromDatabase(moduleId);
//        res.json(topics);
//    } catch (error) {
//        console.error('Error fetching topics:', error.message);
//        res.status(500).json({ message: 'Error fetching topics.' });
//    }
//});

app.get("/apinit/fetchTopics/:moduleId", async (req, res) => {
  try {
    console.info("List of  Technologies");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.params.moduleId; // No need to stringify the request body
    const { type } = req.query;
    console.info(type, "+++++++++");

    const moduleId = requestData;
    console.log(moduleId);

    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1
    let result;
    if (type === "MCQ") {
      result = await sql.query`
            EXEC USP_Get_TopicIdByModules
               @ModuleID = ${moduleId}
            `;
    } else {
      result = await sql.query`
            EXEC [dbo].[USP_Get_TopicIdByModules_code]
               @ModuleID = ${moduleId}
            `;
    }

    console.log("ListTechnologies", result);

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
      res.status(200).json(null);
    }
  } catch (err) {
    console.error("Error executing stored procedure:", err);
    res.status(500).json({
      success: false,
      message: "Error executing stored procedure",
      apperror: err,
    });
  }  
});

// Route to fetch subtopics based on the selected topic
//app.get('/fetchSubtopics/:topicId', async (req, res) => {
//    const topicId = req.params.topicId;
//    try {
//        const subtopics = await fetchSubtopicsFromDatabase(topicId);
//        res.json(subtopics);
//    } catch (error) {
//        console.error('Error fetching subtopics:', error.message);
//        res.status(500).json({ message: 'Error fetching subtopics.' });
//    }
//});

app.get("/apinit/fetchSubtopics/:topicId", async (req, res) => {
  try {
    console.info("List of  Technologies");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.params.topicId; // No need to stringify the request body
    const { type } = req.query;
    console.info(type, "------------------");

    const topicId = requestData;

    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1
    let result;
    if (type === "MCQ") {
      result = await sql.query`
           EXEC USP_Get_SubTopicIdIdByTopics 
                 @topicId = ${topicId}
`;
    } else {
      result = await sql.query`
EXEC [dbo].[USP_Get_SubTopicIdIdByTopics_code] 
      @topicId = ${topicId}
`;
    }

    console.log("ListTechnologies", result);

    // Check if the recordset is not empty or undefined
    if (result.recordset !== undefined && result.recordset.length > 0) {
      const recordsetData = result.recordset;

      // Log the recordset or return it in the response
      console.log("Stored procedure executed successfully:", recordsetData);

      res.status(200).json(recordsetData || null);
    } else {
      // Handle the case where the recordset is empty or undefined
      console.log(
        "Stored procedure executed successfully, but no records returned."
      );
      res.status(200).json(null);
    }
  } catch (err) {
    console.error("Error executing stored procedure:", err);
    res.status(500).json({
      success: false,
      message: "Error executing stored procedure",
      apperror: err,
    });
  }  
});

app.get("/apinit/fetchModules/:technologyId", async (req, res) => {
  try {
    console.info("List of  Technologies");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.params.technologyId; // No need to stringify the request body
    const { type } = req.query;
    console.info(type, "======");

    const technologyId = requestData;

    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1

    let result;
    if (type === "MCQ") {
      result = await sql.query`
            EXEC USP_Get_ModuleIdByTechnologies
                @TechnologyID = ${technologyId}`;
    } else {
      result = await sql.query`
                EXEC [dbo].[USP_Get_ModuleIdByTechnologies_Code]
                    @TechnologyID = ${technologyId}`;
    }

    console.log("ListTechnologies", result);

    // Check if the recordset is not empty or undefined
    if (result.recordset !== undefined && result.recordset.length > 0) {
      const recordsetData = result.recordset;

      // Log the recordset or return it in the response
      console.log("Stored procedure executed successfully:", recordsetData);

      res.status(200).json(recordsetData || null);
    } else {
      // Handle the case where the recordset is empty or undefined
      console.log(
        "Stored procedure executed successfully, but no records returned."
      );
      res.status(200).json(null);
    }
  } catch (err) {
    console.error("Error executing stored procedure:", err);
    res.status(500).json(err);
  }  
});

app.get("/apinit/fetchEnrollModules/:technologyId", async (req, res) => {
  try {
    console.info("List of  Technologies");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.params.technologyId; // No need to stringify the request body
    const { type } = req.query;
    console.info(type, "======");

    const technologyId = requestData;

    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1

    let result = await sql.query`
            EXEC USP_Get_ModuleIdByTechnologies
                @TechnologyID = ${technologyId}`;

    console.log("ListTechnologies", result);

    // Check if the recordset is not empty or undefined
    if (result.recordset !== undefined && result.recordset.length > 0) {
      const recordsetData = result.recordset;

      // Log the recordset or return it in the response
      console.log("Stored procedure executed successfully:", recordsetData);

      res.status(200).json(recordsetData || null);
    } else {
      // Handle the case where the recordset is empty or undefined
      console.log(
        "Stored procedure executed successfully, but no records returned."
      );
      res.status(200).json(null);
    }
  } catch (err) {
    console.error("Error executing stored procedure:", err);
    res.status(500).json(err);
  }  
});

app.get("/apinit/getQuestionCounts/:questionTypeId", async (req, res) => {
  try {
    const testId = 1;
    const questionTypeId = req.params.questionTypeId;

    await sql.connect(sqlConfig);
    const result = await sql.query(`
            SELECT Q.TypeName, T.NumOfEasy, T.NumOfMedium, T.NumOfHard 
            FROM TestDetails T 
            INNER JOIN QuestionTypes Q ON T.QuestionTypeID = Q.QuestionTypeID 
            WHERE T.TestID = ${testId} AND T.QuestionTypeID = ${questionTypeId}
        `);

    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }  
});
app.get("/apinit/getAllTests", async (req, res) => {
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query(`
            select * from dbo.Test where IsActive =1  ORDER BY TESTID DESC
        `);

    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }  
});
// Route for processing the form submission and fetching questions from the database
app.post("/apinit/createTest", async (req, res) => {
  try {
    const mcqQuestionsCount = parseInt(req.body.mcqQuestions, 10);
    const descriptiveQuestionsCount = parseInt(
      req.body.descriptiveQuestions,
      10
    );
    const matchingQuestionsCount = parseInt(req.body.matchingQuestions, 10);
    const selectionQuestionsCount = parseInt(req.body.checkboxSelections, 10);
    // Fetch questions for each type from the database
    const mcqQuestions = await fetchQuestionsFromDatabase1(
      "MCQQuestionALL1",
      mcqQuestionsCount
    );
    const descriptiveQuestions = await fetchQuestionsFromDatabase1(
      "DescriptiveQuestion",
      descriptiveQuestionsCount
    );
    const matchingQuestions = await fetchQuestionsFromDatabase1(
      "MatchingQuestions",
      matchingQuestionsCount
    );
    const selectionsQuestions = await fetchQuestionsFromDatabase1(
      "MCQQuestionALL",
      selectionQuestionsCount
    );

    // Render the test creation page with the selected questions
    res.render("questionDisplay", {
      mcqQuestions,
      descriptiveQuestions,
      matchingQuestions,
      checkboxSelections,
    });
  } catch (error) {
    console.error("Error fetching questions:", error.message);
    res.status(500).json({ message: "Error fetching questions." });
  }
});
async function fetchQuestionsFromDatabase1(tableName, numberOfQuestions) {
  try {
    console.log(`Fetching questions from table: ${tableName}`);
    const result = await queryAsync(
      `SELECT TOP 1000 * FROM dbo.MCQQuestionALL1 ORDER BY NEWID()`
    );
    const questions = result.recordset;
    return questions;
  } catch (error) {
    console.error(
      `Error fetching questions from the database: tablename ${tableName} ${error.message}`
    );
    throw new Error(
      `Error fetching questions from the database:  tablename ${error.message}`
    );
  }  
}
//async function fetchTechnologiesFromDatabase() {
//    try {
//        const result = await queryAsync('exec USP_Get_Technologies');
//        const technologies = result.recordset;
//        return technologies;
//    } catch (error) {
//        console.error(`Error fetching technologies from the database: ${error.message}`);
//        throw new Error('Error fetching technologies from the database.');
//    } finally {
//         ;
//    }
//}

// Function to fetch a specific number of questions from cache or the database
async function fetchQuestionsFromCache(numberOfQuestions) {
  try {
    // Try to fetch from cache first
    const cachedQuestions = readFromCache();
    if (cachedQuestions && cachedQuestions.length >= numberOfQuestions) {
      const selectedQuestions = cachedQuestions.slice(0, numberOfQuestions);
      return selectedQuestions;
    }

    // Fetch the remaining questions from the database
    const remainingQuestions =
      numberOfQuestions - (cachedQuestions ? cachedQuestions.length : 0);
    const dbQuestions = await fetchQuestionsFromDatabase(remainingQuestions);

    // Update cache with combined questions
    const combinedQuestions = [...(cachedQuestions || []), ...dbQuestions];
    updateCache(combinedQuestions);

    return combinedQuestions;
  } catch (error) {
    throw new Error(`Error fetching questions: ${error.message}`);
  }
}

// Function to read questions from the local cache
function readFromCache() {
  try {
    if (fs.existsSync(cacheFilePath)) {
      const cacheData = fs.readFileSync(cacheFilePath, "utf-8");
      return JSON.parse(cacheData);
    }
    return null;
  } catch (error) {
    console.error("Error reading from cache:", error.message);
    return null;
  }
}

// Function to update the local cache with new questions
function updateCache(questions) {
  try {
    const cacheData = JSON.stringify(questions);
    fs.writeFileSync(cacheFilePath, cacheData, "utf-8");
  } catch (error) {
    console.error("Error updating cache:", error.message);
  }
}
// Add these functions to your server.js

// Function to fetch modules based on the selected technology
//async function fetchModulesFromDatabase(technologyId) {
//    try {

//        const result = await queryAsync(`Exec USP_Get_ModuleIdByTechnologies  @TechnologyID = ${technologyId}`);
//        const modules = result.recordset;
//        return modules;
//    } catch (error) {
//        console.error(`Error fetching modules from the database: ${error.message}`);
//        throw new Error('Error fetching modules from the database.');
//    } finally {
//         ;
//    }
//}

// Function to fetch topics based on the selected module
//async function fetchTopicsFromDatabase(moduleId) {
//    try {
//        const result = await queryAsync(`Exec  USP_Get_TopicIdByModules @ModuleID = ${moduleId}`);
//        const topics = result.recordset;
//        return topics;
//    } catch (error) {
//        console.error(`Error fetching topics from the database: ${error.message}`);
//        throw new Error('Error fetching topics from the database.');
//    } finally {
//         ;
//    }
//}

// Function to fetch subtopics based on the selected topic

async function fetchSubtopicsFromDatabase(topicId) {
  try {
    const result = await queryAsync(
      `Exec USP_Get_SubTopicIdIdByTopics @topicId = ${topicId}`
    );
    const subtopics = result.recordset;
    return subtopics;
    AC;
  } catch (error) {
    console.error(
      `Error fetching subtopics from the database: ${error.message}`
    );
    throw new Error("Error fetching subtopics from the database.");
  }  
}
// Function to fetch a specific number of questions from the database
async function fetchQuestionsFromDatabase1(tableName, numberOfQuestions) {
  try {
    console.log(`Fetching questions from table: ${tableName}`);
    const result = await queryAsync(
      `SELECT TOP ${numberOfQuestions} * FROM dbo.${tableName} ORDER BY NEWID()`
    );
    const questions = result.recordset;
    return questions;
  } catch (error) {
    console.error(
      `Error fetching questions from the database: tablename ${tableName} ${error.message}`
    );
    throw new Error(
      `Error fetching questions from the database:  tablename ${error.message}`
    );
  }  
}

async function fetchTechnologiesWithModulesAndTopics() {
  try {
    const technologiesResult = await queryAsync(
      "SELECT * FROM dbo.Technologies"
    );
    const technologies = technologiesResult.recordset;

    for (const tech of technologies) {
      const modulesResult = await queryAsync(
        `SELECT * FROM dbo.Modules WHERE TechnologyID = ${tech.TechnologyID}`
      );
      tech.modules = modulesResult.recordset;

      for (const module of tech.modules) {
        const topicsResult = await queryAsync(
          `SELECT * FROM dbo.Topics WHERE ModuleID = ${module.ModuleID}`
        );
        module.topics = topicsResult.recordset;

        for (const topic of module.topics) {
          const subtopicsResult = await queryAsync(
            `SELECT * FROM dbo.SubTopic WHERE TopicID = ${topic.TopicID}`
          );
          topic.subtopics = subtopicsResult.recordset;
        }
      }
    }

    return technologies;
  } catch (error) {
    console.error(
      "Error fetching technologies with modules and topics:",
      error.message
    );
    throw new Error("Error fetching technologies with modules and topics.");
  }  
}

const executeGetTestQuestions = async (testID, studentName, transactionId) => {
  try {
    // Assuming you already have the pool defined in your code

    console.info("Current Transaction Id" + transactionId);

    let pool = await sql.connect(sqlConfig);

    console.info("Current Transaction Id Step1" + transactionId);

    // Execute the stored procedure
    const result = await pool
      .request()
      .input("InputTestID", sql.Int, testID)
      .input("StudentName", sql.VarChar, studentName)
      .input("TransactionId", sql.Int, transactionId)
      .execute("GetStudentTestQuestions"); // Replace with the actual name of your stored procedure

    console.info("Current Transaction Id Step2" + transactionId);

    // Process the result as needed
    const questions = result.recordset;
    console.log("---------------------------", qustions);
    // console.log('Fetched questions:', questions);
    console.info("Current Transaction Id Step3" + transactionId);
    return questions; // Return the fetched questions
  } catch (error) {
    console.error("Error executing stored procedure:", error.message);
    throw new Error("Error executing stored procedure.");
  }  
};

const GetTestQuestionsPreview = async (testID, studentName, transactionId) => {
  try {
    // Assuming you already have the pool defined in your code

    console.log("Step 3 previw method involded");
    console.log(testID);
    console.log(transactionId);
    console.log(studentName);
    console.info("Current Transaction Id" + transactionId);

    let pool = await sql.connect(sqlConfig);

    console.info("Current Transaction Id StepReview1" + transactionId);

    // Execute the stored procedure
    const result = await pool
      .request()
      .input("InputTestID", sql.Int, testID)
      .input("StudentName", sql.VarChar, studentName)
      .input("TransactionId", sql.Int, transactionId)
      .execute("Usp_GetStudentTestQuestions_Preview"); // Replace with the actual name of your stored procedure

    console.info("Current Transaction Id Step2" + transactionId);

    // Process the result as needed
    const questions = result.recordset;
    // console.log('Fetched questions:', questions);
    console.info("Current Transaction Id Step3" + transactionId);
    return questions; // Return the fetched questions
  } catch (error) {
    console.error("Error executing stored procedure:", error.message);
    throw new Error("Error executing stored procedure.");
  }  
};

app.get("/apinit/mcqQuestions", async (req, res) => {
  try {
    // Extract easy, medium, and hard counts from query parameters
    const { TechnologyId, ModuleId, TopicId, SubTopicId, QuestionType } =
      req.query;

    // Connect to the database
    await sql.connect(sqlConfig);

    // Construct the WHERE conditions based on non-zero parameters
    const whereConditions = [];
    if (TechnologyId) whereConditions.push(`T1.TechnologyID = ${TechnologyId}`);
    if (ModuleId !== "0") whereConditions.push(`M1.ModuleID = ${ModuleId}`);
    if (TopicId !== "0") whereConditions.push(`T.TopicID = ${TopicId}`);
    if (SubTopicId !== "0")
      whereConditions.push(`S.SubTopicID = ${SubTopicId}`);
    if (QuestionType) whereConditions.push(`Type = '${QuestionType}'`);

    // Build the WHERE clause
    let whereClause = "";
    if (whereConditions.length > 0) {
      whereClause = "WHERE " + whereConditions.join(" AND ");
    }

    // Construct the SQL query with dynamic WHERE conditions
    const query = `
            SELECT * 
            FROM MCQQuestionsALL M
            INNER JOIN SubTopic S ON M.SubTopicID = S.SubTopicID
            INNER JOIN Topics T ON S.TopicID = T.TopicID
            INNER JOIN Modules M1 ON T.ModuleID = M1.ModuleID
            INNER JOIN Technologies T1 ON M1.TechnologyID = T1.TechnologyID
            ${whereClause};
        `;

    // Execute the query
    const result = await sql.query(query);

    // Combine the result sets into a single array
    const questions = result.recordsets.reduce(
      (acc, curr) => acc.concat(curr),
      []
    );

    // Send the data as JSON
    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  } 
});
app.post("/apinit/InsertionQuestionView", async (req, res) => {
  try {
    console.info("Method Insert Questions");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.body; // No need to stringify the request body

    const {
      TechnologyName,
      TechnologyId,
      ModuleName,
      ModuleId,
      TopicName,
      TopicId,
      SubtopicName,
      SubtopicId,
      HardCount,
      MediumCount,
      EasyCount,
      TestId,
      TestDetailsId,
      SelectedQuestions,
      type,
    } = requestData;
    let result;
    if (type === "MCQ") {
      result = await sql.query`
            EXEC [dbo].[UpdateQuestionsView]
            @TechnologyName = ${TechnologyName},
            @TechnologyId   = ${TechnologyId},
            @ModuleName     = ${ModuleName},      
            @ModuleId       = ${ModuleId},
            @TopicName      = ${TopicName},
            @TopicId        = ${TopicId},
            @subtopicName   = ${SubtopicName},
            @subtopicId     = ${SubtopicId},
            @HardCount      = ${HardCount},
            @MediumCount    = ${MediumCount},
            @EasyCount      = ${EasyCount},
            @TestId         = ${TestId},
            @TestDetailsId  = ${TestDetailsId},
            @SelectedQuestions=${SelectedQuestions},
            @type            =${type}
             `;
    } else {
      result = await sql.query`
              EXEC [dbo].[UpdateQuestionsView]
              @TechnologyName = ${TechnologyName},
              @TechnologyId   = ${TechnologyId},
              @ModuleName     = ${ModuleName},      
              @ModuleId       = ${ModuleId},
              @TopicName      = ${TopicName},
              @TopicId        = ${TopicId},
              @subtopicName   = ${SubtopicName},
              @subtopicId     = ${SubtopicId},
              @HardCount      = ${HardCount},
              @MediumCount    = ${MediumCount},
              @EasyCount      = ${EasyCount},
              @TestId         = ${TestId},
              @TestDetailsId  = ${TestDetailsId},
              @SelectedQuestions=${SelectedQuestions},
              @type            =${type}
               `;
    }

    console.log("kjgen", result);

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
  }  
});

app.post("/apinit/Listof_BatchDetails", async (req, res) => {
  try {
    console.info("Method listofBatchDetails");
    await sql.connect(sqlConfig);
    console.log(req.body);

    const { TechnologyId, ModuleId } = req.body;

    // Convert TechnologyId and ModuleId to integers, handle null for ModuleId
    const technologyId = TechnologyId;
    const moduleId = ModuleId === "null" ? null : ModuleId ? ModuleId : null;

    console.info(
      `Received Request - Technology ID: ${technologyId} | Module ID: ${moduleId}`
    );

    const result = await sql.query`
      EXEC [dbo].[USP_Listof_Available_BatchDetails]
        @TechnologyId = ${technologyId},
        @ModuleId = ${moduleId}`;

    console.log("ListBatchs", result);

    // Check if the recordset is not empty or undefined
    if (result.recordset && result.recordset.length > 0) {
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
  } 
});

app.post("/apinit/CreateNewEnrollId", async (req, res) => {
  try {
    console.info("Method listoEnrollIds");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.body; // No need to stringify the request body
    console.info(requestData);

    const {} = requestData;

    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1

    const result = await sql.query`
            EXEC  Usp_Get_EnrollId
            
            
           `;

    console.log("ListEnrollID", result);

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
  }  
});

app.post("/apinit/Listof_AvailableTests", async (req, res) => {
  try {
    console.info("Method listofAvailableTests");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.body; // No need to stringify the request body
    console.info(requestData);

    const { TechnologyId, ModuleId } = requestData;

    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1

    const result = await sql.query`
            EXEC [dbo].[USP_Listof_AvailableTests]
            @TechnologyId   = ${TechnologyId},
            @ModuleId       = ${ModuleId}
            
           `;

    console.log("ListTests", result);

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
  }  
});

app.post("/apinit/GetBatchesByTestId", async (req, res) => {
  try {
    console.info("Method listofBatches");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.body; // No need to stringify the request body
    console.info(requestData);

    const { TestId } = requestData;

    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1

    const result = await sql.query`
            EXEC Usp_Get_AllBatchesBy_TestId
         @TestId=${TestId}
            
           `;

    console.log("ListBatches", result);

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
  }  
});

app.post("/apinit/GetStudentNameByBatchId", async (req, res) => {
  try {
    console.info("Method listofStudent");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.body; // No need to stringify the request body
    console.info(requestData);

    const { BatchId } = requestData;

    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1

    const result = await sql.query`
            EXEC [dbo].[Usp_GetStudentBy_BatchId]
         @BatchId=${BatchId}
            
           `;

    console.log("ListStudents", result);

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
  }  
});

app.post("/apinit/Retrive_SlotDetails", async (req, res) => {
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
            EXEC [dbo].[Usp_RetrieveAvailability_SlotDetails]
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
  }  
});

// app.post("/apinit/Update_BookSlot", async (req, res) => {
//   try {
//     console.info("Method listofSlots");
//     await sql.connect(sqlConfig);
//     console.log(req.body);
//     const requestData = req.body; // No need to stringify the request body
//     console.info(requestData);

//     const {
//       WeekNumber,
//       DayNumber,
//       SlotInTime,
//       SlotOutTime,
//       StudentId,
//       TechnologyId,
//     } = requestData;

//     //// Ensure TechnologyID and Query are parsed as integers
//     //const parsedQuery = 1;

//     const result = await sql.query`
//             EXEC [dbo].[BookSlot]
//          @WeekNumber=${WeekNumber},
//          @DayNumber= ${DayNumber},
//          @SlotInTime=${SlotInTime},
//          @SlotOutTime=${SlotOutTime},
//          @StudentId=${StudentId},
//          @TechnologyId=${TechnologyId}
//         `;

//     console.log("ListSlots", result);

//     // Check if the recordset is not empty or undefined
//     if (result.recordset !== undefined && result.recordset.length > 0) {
//       const recordsetData = result.recordset;

//       // Log the recordset or return it in the response
//       console.log("Stored procedure executed successfully:", recordsetData);

//       if (
//         recordsetData?.[0]?.Message?.includes(
//           "Your slot has been successfully booked"
//         )
//       ) {
//         const weekNumber = WeekNumber;
//         const dayNumber = DayNumber;
//         const {
//           eachDayOfInterval,
//           startOfWeek,
//           addWeeks,
//         } = require("date-fns");

//         const startOfWeekDate = startOfWeek(
//           `${new Date().getFullYear()}-01-01`,
//           {
//             weekStartsOn: 0,
//           }
//         );
//         const startDateWithinWeek = addWeeks(startOfWeekDate, weekNumber - 1);

//         const endDateWithinWeek = addDays(startDateWithinWeek, dayNumber);
//         console.log(
//           "-==-=-=",
//           startDateWithinWeek,
//           new Date(endDateWithinWeek).getMonth()
//         );

//         const datesRange = eachDayOfInterval({
//           start: startDateWithinWeek,
//           end: endDateWithinWeek,
//         });

//         console.log(datesRange[dayNumber - 1].getDate());

//         const startDateOfWeek = startOfWeek(new Date());

//         const firstNameResult = await sql.query`
//                     SELECT FirstName FROM student WHERE StudentID=${StudentId}
//                 `;
//         const firstName = firstNameResult.recordset[0]?.FirstName;

//         const zoomLinkResult = await sql.query`
//                     SELECT m.ZoomLink
//                     FROM MENTORS m
//                     INNER JOIN VLBookingDetails v ON v.MentorId = m.MENTOR_Id
//                     WHERE v.StudentId = (SELECT TOP 1 StudentId FROM VLBookingDetails WHERE slotid = (SELECT TOP 1 slotid FROM VLBookingDetails WHERE StudentId=${StudentId}))
//                 `;
//         const zoomLink = zoomLinkResult.recordset[0]?.ZoomLink;

//         console.log(zoomLink, requestData.Email, firstName);

//         const transporter = nodemailer.createTransport({
//           service: "gmail",
//           auth: {
//             user: "virtuallab@nareshit.com",
//             pass: "fukl uocy xbdq ewtp",
//           },
//         });

//         const mailOptions = {
//           from: "virtuallab@nareshit.com",
//           to: requestData.Email,
//           subject: `Virtual Lab slot booking ${new Date()}`,
//           text: `Dear ${firstName}

// Greetings for the day!

// Thank you for your interest in NareshIT offerings!
// In our endeavour to provide our learners with world class learning opportunities we continue to bring in new features and facilities.
// One such initiative is to provide "Live Personal Virtual Mentoring" to ensure you get the advantage of personal technical mentoring to clarify all your technical queries and get you a learning experience on par with physical learning.
// Congratulations! Your Live Personal Virtual Mentoring slot is confirmed.
// Below mentioned are your slot details:
// Date: ${datesRange[dayNumber - 1].getDate()}-${
//             new Date(endDateWithinWeek).getMonth() + 1
//           }-${new Date(endDateWithinWeek).getFullYear()}
// Time: ${SlotInTime % 12} ${SlotInTime > 12 ? "pm" : "am"} - ${
//             SlotOutTime % 12
//           } ${SlotOutTime > 12 ? "pm" : "am"}
// ${zoomLink}
// Zoom Link To connect with your personal mentor:
// Join our Cloud HD Video Meeting
// zoom.ico
// Note: Please login 5 Minutes before your slot timing. Your slot shall stand cancelled if you fail to login within 5 Minutes of your slot start time. Ex: You have to mandatorily login before 2:05PM for a 2PM slot.
// Best Regards,
// Team NareshIT.
// For Queries contact:
// On ${new Date()}, rudrarajubharathsaivyaas@gmail.com wrote:
// Your Slot has been booked successfully.`,
//         };

//         transporter.sendMail(mailOptions, function (error, info) {
//           if (error) {
//             console.error(error);
//           } else {
//             console.log("Email sent: " + info.response);
//           }
//         });
//       }
//       res.status(200).json({
//         success: true,
//         message: "Stored procedure executed successfully",
//         dbresult: recordsetData,
//       });
//     } else {
//       // Handle the case where the recordset is empty or undefined
//       console.log(
//         "Stored procedure executed successfully, but no records returned."
//       );
//       res.status(200).json({
//         success: true,
//         message:
//           "Stored procedure executed successfully, but no records returned.",
//         dbresult: null,
//       });
//     }
//   } catch (err) {
//     console.error("Error executing stored procedure:", err);
//     res.status(500).json({
//       success: false,
//       message: "Error executing stored procedure",
//       apperror: err,
//     });
//   } finally {
//     sql.close((err) => {
//       if (err) {
//         console.error("Error closing SQL connection:", err);
//       }
//     });
//   }
// });

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
  } 
});

app.post("/apinit/UserLogin_send-otp", async (req, res) => {
  const { userName } = req.body;

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

      .execute("UpdateUserOTP");
    console.log("step2");
    const outputMessage = result;
    console.log(outputMessage);
    // Handle output message if any
    //if (outputMessage) {
    // return res.status(401).send(outputMessage);
    //}
    console.log("step3");
    // Check if OTP was updated and retrieved successfully
    if (!result.recordset || result.recordset.length === 0) {
      return res.status(500).send("Failed to generate OTP.");
    }
    console.log("step4");
    const otp = result.recordset[0].OTP;

    // Create a transporter for sending the email
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    console.log("step5");
    // Send OTP to the user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: userName,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}`,
    });
    console.log("step6");
    res.status(200).send("OTP sent successfully.");
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  } 
});

app.post("/apinit/EnrollStudents", async (req, res) => {
  try {
    console.info("Method listofEnrollStudent");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.body; // No need to stringify the request body
    console.info(requestData);

    const { BatchIdList, TestIdList, StudentNameList } = requestData;

    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1

    const result = await sql.query`
            EXEC InsertionEnrollstudent
         @BatchIdList=${BatchIdList},
         @TestIdList=${TestIdList},
         @StudentNameList=${StudentNameList}
            
           `;

    console.log("ListStudents", result);

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
  }  
});

app.post("/apinit/GetBatchIdsByTestids", async (req, res) => {
  try {
    console.info("Method listofbatchs");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.body;
    console.info(requestData);

    const { TestIdList } = requestData;

    const result = await sql.query`
            EXEC GetBatchIdsForTestIds
            @TestIdList=${TestIdList}
        `;
    console.log("ListBatchs", result);

    for (const testRecord of result.recordset) {
      console.log("+++++++++", testRecord);

      testRecord.BatchIDs.split(",").forEach(async (batch) => {
        await sql.query`INSERT INTO StudentExam_Mapping (TestID, BatchID, StudentName, EnrollmentId)
            VALUES (${testRecord.TestID}, ${batch}, NULL, NULL)`;
      });
    }
    //await sql.query`INSERT INTO StudentExam_Mapping (TestID, BatchID, StudentName, EnrollmentId)
    //VALUES (${testRecord.TestID}, ${testRecord.BatchIDs}, NULL, NULL)`

    //`INSERT INTO StudentExam_Mapping values()`
    const resultObj = {};

    if (result.recordset !== undefined && result.recordset.length > 0) {
      const recordsetData = result.recordset;
      console.log("Stored procedure executed successfully:", recordsetData);

      // Error if Batches doesn't exists on that testId
      // Loop through each batch ID
      for (const batchData of recordsetData) {
        const batchIDs = batchData.BatchIDs.split(",");
        const TestID = batchData.TestID;
        // Loop through each batch ID in the current batch data
        for (const batchID of batchIDs) {
          if (!resultObj[TestID]) resultObj[TestID] = [];

          const queryResult =
            await sql.query`select * from BatchDetailes where batchid=${batchID}`;
          const { recordset } = queryResult ? queryResult : {};
          console.log("recordset", recordset);
          if (recordset && recordset[0]) resultObj[TestID].push(recordset[0]);
          else
            resultObj[TestID].push({
              error: "coud't find Batch with BatchID" + batchID,
            });
        }
      }

      res.status(200).json({
        success: true,
        message: "Stored procedure executed successfully",
        dbresult: resultObj,
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
  }  
});

// Define the route for enrolling tests
app.post("/apinit/EnrollTest", async (req, res) => {
  try {
    console.info("Request reached EnrollTest endpoint");
    console.log(req.body);

    // Check if the request body contains the EnrollTest data
    if (!req.body || !req.body.data || !Array.isArray(req.body.data)) {
      throw new Error("Invalid EnrollTest data.");
    }

    const STD = req.body;
    const jsonData = JSON.stringify(STD.data);
    console.info(jsonData);

    // Extract data from the request body
    const TechnologyId = req.body.TechnologyId;
    const ModuleId = req.body.ModuleId;
    const EnrollmentId = req.body.EnrollmentId;
    console.log(TechnologyId, ModuleId, EnrollmentId);

    // Call the stored procedure [dbo].[Usp_Enroll_Test]
    const result = await callEnrollTest(
      jsonData,
      TechnologyId,
      ModuleId,
      EnrollmentId
    );
    console.log("EnrollTests success");

    // Check if the output message is available
    if (result.output && result.output.Message) {
      const message = result.output.Message;
      if (
        message.includes(
          "You have already selected the same TestID and BatchID"
        )
      ) {
        res.status(202).send(message);
      } else {
        res.status(200).send(message);
      }
    } else {
      res.status(203).send("Enrollment created successfully.");
    }
  } catch (error) {
    console.error("Error: inserting students", error.message);
    res.status(500).send("Internal Server Error");
  }  
});

async function callEnrollTest(jsonData, TechnologyId, ModuleId, EnrollmentId) {
  try {
    console.log("method to Tests sp");
    // Connect to the SQL database
    let pool = await sql.connect({
      user: process.env.SQL_UID,
      password: process.env.SQL_PWD,
      server: process.env.SQL_SERVER,
      database: process.env.SQL_DATABASE,
      options: {
        encrypt: true,
        trustServerCertificate: true,
        
      },
    });
    console.log("sql process");

    // Create a new table variable to hold the data
    const table = new sql.Table();
    table.columns.add("TestId", sql.Int);
    table.columns.add("BatchId", sql.Int);
    table.columns.add("StudentId", sql.NVarChar());

    // Parse the JSON data and populate rows in the table type
    const parsedData = JSON.parse(jsonData);
    parsedData.forEach((row) => {
      table.rows.add(row.TestId, row.BatchId, row.StudentId);
    });

    console.log(TechnologyId, ModuleId, EnrollmentId);
    // Execute the stored procedure

    const request = pool.request();
    request.queryTimeout = 900000; // 15 minutes

    // Execute the stored procedure
    const result = await request
      .input("STD", sql.TVP, table)
      .input("TechnologyId", sql.Int, TechnologyId)
      .input("ModuleId", sql.Int, ModuleId)
      .input("EnrollmentId", sql.Int, EnrollmentId)
      .output("Message", sql.VarChar(1000)) // Define output parameter
      .execute("[Usp_Enroll_Test]");

    // Return the result of the stored procedure execution
    return result;
  } catch (error) {
    console.error("Error in callEnrollTest:", error.message);
    throw error;
  }  
}

app.delete("/apinit/DeleteEnrollmentId", async (req, res) => {
  try {
    console.info("Method entered for DelteEnrollId");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.body; // No need to stringify the request body
    console.info(requestData);

    const { EnrollmentId } = requestData;

    // Ensure TechnologyID and Query are parsed as integers

    const result = await sql.query`
            EXEC USP_DeleteEnrollmentId
            @EnrollmentId= ${EnrollmentId}
            
           
        `;

    console.log(result);

    // Log the recordset or return it in the response
    if (result.recordset !== undefined && result.recordset.length > 0) {
      const recordsetData = result.recordset;

      // Log the recordset or return it in the response
      console.log("Stored procedure executed successfully:", recordsetData);

      res.status(204).json(recordsetData);
    } else {
      // Handle the case where the recordset is empty or undefined
      console.log(
        "Stored procedure executed successfully, but no records returned."
      );
      res.status(204).json({
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
  }  
});

app.post("/apinit/Retrive_Enroll", async (req, res) => {
  try {
    console.info("Method RetriveEnroll");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.body; // No need to stringify the request body
    console.info(requestData);

    const { EnrollmentId } = requestData;

    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1

    const result = await sql.query`
            EXEC Usp_Retrive_Enrollments
            @EnrollmentId   = ${EnrollmentId}
            
            
           `;

    console.log("RetriveEnrolls", result);

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
  }
});

app.post("/apinit/Fetch_Batches", async (req, res) => {
  try {
    console.info("Method ListofBatches");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.body; // No need to stringify the request body
    console.info(requestData);

    const {} = requestData;

    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1

    const result = await sql.query`
            EXEC  Usp_Fetch_BatchDetails
            
           `;

    console.log("RetriveBatches", result);

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
  }  
});

app.post("/apinit/Fetch_Students", async (req, res) => {
  try {
    console.info("Method ListofStudents");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.body; // No need to stringify the request body
    console.info(requestData);

    const {} = requestData;

    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1

    const result = await sql.query`
            EXEC  Usp_Fetch_Students
            
           `;

    console.log("RetriveBatches", result);

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
  }  
});

app.post("/apinit/Create_StudentsBatchs", async (req, res) => {
  try {
    console.info("Request reached StudentsBatches");
    console.log(req.body);
    // Check if the request body contains the EnrollTest
    if (!req.body) {
      throw new Error("Invalid studentsBatches Data.");
    }
    const STD = req.body;
    const jsonData = JSON.stringify(STD);
    console.info(jsonData);

    // Extract data from the request body

    const BatchName = req.body.BatchName;
    const TechnologyId = req.body.TechnologyId;
    const ModuleId = req.body.ModuleId;

    const Start_Date = req.body.Start_Date;

    const END_Date = req.body.END_Date;
    const Facaulty = req.body.Facaulty;
    const Mentor = req.body.Mentor;
    const BatchAdmin = req.body.BatchAdmin;

    console.log(
      BatchName,
      TechnologyId,
      ModuleId,
      Start_Date,
      END_Date,
      Facaulty,
      Mentor,
      BatchAdmin
    );

    await callStudentsBatchs(
      jsonData,
      BatchName,
      TechnologyId,
      ModuleId,
      Start_Date,
      END_Date,
      Facaulty,
      Mentor,
      BatchAdmin
    );
    console.log("EnrollTests sucess");
    // Send success response
    res.status(200).send("Batch Created successfully.");
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

async function callStudentsBatchs(
  jsonData,
  BatchName,
  TechnologyId,
  ModuleId,
  Start_Date,
  END_Date,
  Facaulty,
  Mentor,
  BatchAdmin
) {
  try {
    console.log("method to Tests sp");
    // Create a new table variable to hold the data
    const table = new sql.Table();
    table.columns.add("FirstName", sql.VarChar(100));
    table.columns.add("LastName", sql.VarChar(100));
    table.columns.add("Email", sql.VarChar(100));
    table.columns.add("PhoneNumber", sql.VarChar());
    table.columns.add("BatchId", sql.Int);

    // Populate rows in the table type
    const parsedData = JSON.parse(jsonData);
    parsedData.IncludeStudents.forEach((row) => {
      if (row) {
        table.rows.add(
          row.FirstName,
          row.LastName,
          row.Email,
          row.PhoneNumber,
          row.BatchId
        );
      }
    });

    // Connect to the SQL database
    let pool = await sql.connect(sqlConfig);
    console.log("sql process");

    console.log(
      BatchName,
      TechnologyId,
      ModuleId,
      Start_Date,
      END_Date,
      Facaulty,
      Mentor,
      BatchAdmin
    );
    // Execute the stored procedure
    await pool
      .request()
      .input("Students", sql.TVP, table)
      .input("BatchName", sql.VarChar(100), BatchName)
      .input("TechnologyId", sql.Int, TechnologyId)
      .input("ModuleId", sql.Int, ModuleId)
      .input("Start_Date", sql.DateTime, Start_Date)
      .input("End_Date", sql.DateTime, END_Date)
      .input("Facaulty", sql.VarChar(100), Facaulty)
      .input("Mentor", sql.VarChar(100), Mentor)
      .input("BatchAdmin", sql.VarChar(200), BatchAdmin)
      .execute("Usp_Create_UserManagement");
  } catch (error) {
    console.log("error:" + error);
    throw error;
  }  
}

app.post("/apinit/Get_Facaulty", async (req, res) => {
  try {
    console.info("Method Listof_Facaulty");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.body; // No need to stringify the request body
    console.info(requestData);

    const {} = requestData;

    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1

    const result = await sql.query`
            EXEC  Usp_GET_Facaulty
            
           `;

    console.log("RetriveBatches", result);

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
  }  
});

app.post("/apinit/Get_Mentors", async (req, res) => {
  try {
    console.info("Method Listof_Facaulty");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.body; // No need to stringify the request body
    console.info(requestData);

    const {} = requestData;

    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1

    const result = await sql.query`
            EXEC  Usp_GET_Mentors
            
           `;

    console.log("RetriveBatches", result);

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
  }  
});

app.post("/apinit/ListofStudents", async (req, res) => {
  try {
    console.info("Method listofStudents");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.body; // No need to stringify the request body
    console.info(requestData);

    const { BatchId } = requestData;

    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1

    const result = await sql.query`
            EXEC Usp_GetStudentBy_BatchId
            @BatchId   = ${BatchId}
            
           `;

    console.log("List_Students", result);

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
  }  
});

app.post("/apinit/CreateDynamicTest", async (req, res) => {
  try {
    console.info("Method Create DynamicTest");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.body; // No need to stringify the request body
    console.info(requestData);

    const { TestId } = requestData;

    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1

    const result = await sql.query`
            exec USP_GetSavedQuestionCombination

            @TestId         = ${TestId}
        `;

    console.log(result);

    // Check if the recordset is not empty or undefined
    if (result.recordset !== undefined && result.recordset.length > 0) {
      const recordsetData = result.recordset;
      //const recordsetData ='{"23/02/2024, 04:12:08:r4:":{"id":"23/02/2024, 04:12:08:r4:","selectedModule":"C# 10.0","ModuleID":"2","TopicID":0,"SubTopicID":0,"easy":2,"medium":0,"hard":10,"includes":{}},"23/02/2024, 04:30:50:r14:":{"id":"23/02/2024, 04:30:50:r14:","selectedModule":"C# 10.0","ModuleID":"2","TopicID":0,"SubTopicID":0,"easy":2,"medium":4,"hard":0,"includes":{}},"23/02/2024, 04:32:25:r1d:":{"id":"23/02/2024, 04:32:25:r1d:","selectedModule":"SQL Basics","ModuleID":"10","selectedTopic":"RDBMS (Relational Database Management System)","TopicID":"117","selectedSubTopic":"Characteristics of RDBMS","SubTopicID":"735","easy":1,"medium":0,"hard":0,"includes":{}}}'
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
  }  
});

app.post("/apinit/Insert_Update_QuestionCombination", async (req, res) => {
  try {
    console.info("Method InsertUpdateQuestionCombination");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.body; // No need to stringify the request body
    console.info(requestData);

    const { TestId, TestDetailsId, Combinations } = requestData;

    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1

    const result = await sql.query`
            exec USP_Create_Insert_Update_QuestionsCombination

            @TestId   =    ${TestId},
            @TestDetailsId= ${TestDetailsId},
            @Combinations=${Combinations}
        `;

    console.log(result);

    // Check if the recordset is not empty or undefined
    if (result.recordset !== undefined && result.recordset.length > 0) {
      const recordsetData = result.recordset;
      //const recordsetData ='{"23/02/2024, 04:12:08:r4:":{"id":"23/02/2024, 04:12:08:r4:","selectedModule":"C# 10.0","ModuleID":"2","TopicID":0,"SubTopicID":0,"easy":2,"medium":0,"hard":10,"includes":{}},"23/02/2024, 04:30:50:r14:":{"id":"23/02/2024, 04:30:50:r14:","selectedModule":"C# 10.0","ModuleID":"2","TopicID":0,"SubTopicID":0,"easy":2,"medium":4,"hard":0,"includes":{}},"23/02/2024, 04:32:25:r1d:":{"id":"23/02/2024, 04:32:25:r1d:","selectedModule":"SQL Basics","ModuleID":"10","selectedTopic":"RDBMS (Relational Database Management System)","TopicID":"117","selectedSubTopic":"Characteristics of RDBMS","SubTopicID":"735","easy":1,"medium":0,"hard":0,"includes":{}}}'
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
  }  
});

app.post("/apinit/Insertion_StudentProgramDeatils", async (req, res) => {
  try {
    console.info("Method Listof_Facaulty");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.body; // No need to stringify the request body
    console.info(requestData);

    const {
      Email,
      ProgramId,
      No_AttemptsPerBuildSucceeded,
      No_TestCasesPassed,
      No_TestCasesFailed,
      Result,
      Grade,
      Comments,
      StudentName,
      UserCode,
    } = requestData;

    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1

    const result = await sql.query`
            EXEC  USP_StudentProgramdetails_Insertion
            @Email=${Email},
            @ProgramId=${ProgramId},
            @No_AttemptsPerBuildSucceeded=${No_AttemptsPerBuildSucceeded},
            @No_TestCasesPassed=${No_TestCasesPassed},
            @No_TestCasesFailed=${No_TestCasesFailed},
            @Result=${Result},
            @Grade=${Grade},
            @Comments=${Comments},
            @StudentName=${StudentName},
            @UserCode=${UserCode}
 `;

    console.log("RetriveBatches", result);

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
  }  
});

app.post("/apinit/SelectQuestionCombination", async (req, res) => {
  try {
    console.info("Method RetriveQuestionCombination");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.body; // No need to stringify the request body
    console.info(requestData);

    const { TestId, TestDetailsId } = requestData;

    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1

    const result = await sql.query`
            exec USP_GetQuestionsCombinations
            
            @TestId   = ${TestId},
            @TestDetailsId= ${TestDetailsId}
            
        `;

    console.log(result);

    // Check if the recordset is not empty or undefined
    if (result.recordset !== undefined && result.recordset.length > 0) {
      const recordsetData = result.recordset;
      //const recordsetData ='{"23/02/2024, 04:12:08:r4:":{"id":"23/02/2024, 04:12:08:r4:","selectedModule":"C# 10.0","ModuleID":"2","TopicID":0,"SubTopicID":0,"easy":2,"medium":0,"hard":10,"includes":{}},"23/02/2024, 04:30:50:r14:":{"id":"23/02/2024, 04:30:50:r14:","selectedModule":"C# 10.0","ModuleID":"2","TopicID":0,"SubTopicID":0,"easy":2,"medium":4,"hard":0,"includes":{}},"23/02/2024, 04:32:25:r1d:":{"id":"23/02/2024, 04:32:25:r1d:","selectedModule":"SQL Basics","ModuleID":"10","selectedTopic":"RDBMS (Relational Database Management System)","TopicID":"117","selectedSubTopic":"Characteristics of RDBMS","SubTopicID":"735","easy":1,"medium":0,"hard":0,"includes":{}}}'
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
  }  
});

app.post("/apinit/FetchAvailableQuestionsByCount", async (req, res) => {
  try {
    console.info("Method AvailableQuestionsByCount");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.body; //6 No need to stringify the request body
    console.info(requestData);

    const { TechnologyId, ModuleId, TopicId, SubTopicId, type } = requestData;
    // Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1

    const result = await sql.query`
            Exec USP_Get_Available_Total_DifficultLevelCounts
             @TechnologyId = ${TechnologyId},
             @ModuleId     = ${ModuleId}, 
             @TopicId      = ${TopicId},
             @SubTopicId   = ${SubTopicId},
             @type=${type}

             `;

    console.log(result);

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
  }  
});

app.post("/apinit/Final_Preview", async (req, res) => {
  try {
    console.info("Method FinalPreview");

    // Extract values from the request body
    const { TestID, BatchID, MappingStudents } = req.body;

    // Prepare JSON string with provided values
    const jSON = JSON.stringify([{ TestID, BatchID, MappingStudents }]);

    // Connect to the database
    await sql.connect(sqlConfig);

    // Execute the stored procedure
    const result = await sql.query`EXEC [dbo].[USP_TEST_MAPPINGV11] ${jSON}`;

    // Check if the recordset is not empty
    if (result.recordset && result.recordset.length > 0) {
      const recordsetData = result.recordset;
      console.log("Stored procedure executed successfully:", recordsetData);
      console.log("___________________________________Suc", recordsetData);
      res.status(200).json({
        success: true,
        message: "Stored procedure executed successfully",
        tid: recordsetData.TransactionId || 0,
        dbresult: recordsetData,
      });
    } else {
      console.log("___________________________________Fai", "null");
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
  } 
});

app.post("/apinit/SelectAllFixedQuestions", async (req, res) => {
  try {
    console.info("Method selectfixedqustions");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.body; // No need to stringify the request body
    console.info(requestData);

    const { TestId, type } = requestData;

    // Ensure TechnologyID and Query are parsed as integers

    const result = await sql.query`
            EXEC [dbo].[USP_GetAll_FixedQuestionsByTestId]
            @TestId =${TestId},
            @type=${type}
        `;

    console.log(result);

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
  }  
});

app.post("/apinit/RetriveTestSchedule", async (req, res) => {
  try {
    console.info("Method Retrivetestschedule");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.body; // No need to stringify the request body
    console.info(requestData);

    const { TestId } = requestData;

    // Ensure TechnologyID and Query are parsed as integers

    const result = await sql.query`
            EXEC Usp_GetTestDetailsBy_TestId
            @TestId =${TestId}
        `;

    console.log(result);

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
  }  
});

app.post("/apinit/LoadStudentData", async (req, res) => {
  try {
    console.info("Method StudentData");

    // Extract values from the request body
    const alex = req.body;

    // Prepare JSON string with provided values
    const jSON = JSON.stringify(alex);
    console.log(jSON);

    // Connect to the database
    await sql.connect(sqlConfig);

    // Execute the stored procedure
    const result = await sql.query`EXEC [dbo].[usp_LoadStudentData] ${jSON}`;

    // Check if the recordset is not empty
    if (result.recordset && result.recordset.length > 0) {
      const recordsetData = result.recordset;
      console.log("Stored procedure executed successfully:", recordsetData);
      res.status(200).json({
        success: true,
        message: "Stored procedure executed successfully",
        tid: recordsetData.TransactionId,
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
  } 
});

app.post("/apinit/CreateTechnology", async (req, res) => {
  try {
    console.info("Method entered for new technology");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.body; // No need to stringify the request body
    console.info(requestData);

    const { TechnologyName, Description } = requestData;

    // Ensure TechnologyID and Query are parsed as integers
    const parsedQuery = 1;

    const result = await sql.query`
            EXEC [dbo].[Usp_InsertUpdateDelete_Technology]
            @TechnologyName = ${TechnologyName},
            @Description = ${Description},
            @Query = ${parsedQuery}
        `;

    console.log(result);

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
  }  
});
app.put("/apinit/UpdateTechnology", async (req, res) => {
  try {
    console.info("Method entered for update technology");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.body; // No need to stringify the request body
    console.info(requestData);

    const { TechnologyID, TechnologyName, Description } = requestData;

    // Ensure TechnologyID and Query are parsed as integers
    const parsedQuery = 2;

    const result = await sql.query`
            EXEC [dbo].[Usp_InsertUpdateDelete_Technology]
            @TechnologyID = ${TechnologyID},
            @TechnologyName = ${TechnologyName},
            @Description = ${Description},
            @Query = ${parsedQuery}
        `;

    console.log(result);

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
  }  
});
app.post("/apinit/GetTechnologyID", async (req, res) => {
  try {
    console.info("Method entered for update technology");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.body; // No need to stringify the request body
    console.info(requestData);

    const { TechnologyID } = requestData;

    // Ensure TechnologyID and Query are parsed as integers
    const parsedQuery = 5;

    const result = await sql.query`
            EXEC [dbo].[Usp_InsertUpdateDelete_Technology]
            @TechnologyID = ${TechnologyID},
            @Query = ${parsedQuery}
        `;

    console.log(result);

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
  }  
});
app.delete("/apinit/DeleteTechnology", async (req, res) => {
  try {
    console.info("Method entered for update technology");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.body; // No need to stringify the request body
    console.info(requestData);

    const { TechnologyID } = requestData;

    // Ensure TechnologyID and Query are parsed as integers
    const parsedQuery = 3;

    const result = await sql.query`
            EXEC [dbo].[Usp_InsertUpdateDelete_Technology]
            @TechnologyID = ${TechnologyID},
            
            @Query = ${parsedQuery}
        `;

    console.log(result);

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
  }  
});

app.delete("/apinit/SelectAll_Technologies", async (req, res) => {
  try {
    console.info("Method entered for update technology");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.body; // No need to stringify the request body
    console.info(requestData);

    // Ensure TechnologyID and Query are parsed as integers
    const parsedQuery = 4;

    const result = await sql.query`
            EXEC [dbo].[Usp_InsertUpdateDelete_Technology]
           
            
            @Query = ${parsedQuery}
        `;

    console.log(result);

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
  }  
});

app.delete("/apinit/SelectValuesBy_TechnologyID", async (req, res) => {
  try {
    console.info("Method entered for update technology");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.body; // No need to stringify the request body
    console.info(requestData);
    const { TechnologyID } = requestData;

    // Ensure TechnologyID and Query are parsed as integers
    const parsedQuery = 5;

    const result = await sql.query`
            EXEC [dbo].[Usp_InsertUpdateDelete_Technology]
            @TechnologyID = ${TechnologyID},
            
            @Query = ${parsedQuery}
        `;

    console.log(result);

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
  }  
});

app.get("/apinit/GetTechnologies", async (req, res) => {
  try {
    console.info("Method entered for update technology");
    await sql.connect(sqlConfig);
    //console.log(req.body);
    const requestData = req.body; // No need to stringify the request body
    // console.info(requestData);

    // Ensure TechnologyID and Query are parsed as integers
    const parsedQuery = 4;

    const result = await sql.query`
            EXEC [dbo].[Usp_InsertUpdateDelete_Technology]
           
            @Query = ${parsedQuery}
        `;

    console.log(result);

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
  }  
});

app.post("/apinit/CreateModules", async (req, res) => {
  try {
    console.info("Method entered for new Module");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.body; // No need to stringify the request body
    console.info(requestData);

    const { TechnologyID, ModuleName, Description } = requestData;

    // Ensure TechnologyID and Query are parsed as integers
    const parsedQuery = 1;

    const result = await sql.query`
            EXEC [dbo].[Usp_InsertUpdateDelete_Modules]
            @TechnologyID    = ${TechnologyID},
            @ModuleName      = ${ModuleName},
            @Description     = ${Description},
            @Query           = ${parsedQuery}
        `;

    console.log(result);

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
  }  
});

app.put("/apinit/Update_Module", async (req, res) => {
  try {
    console.info("Method entered for update Module");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.body; // No need to stringify the request body
    console.info(requestData);

    const { TModuleID, ModuleName, Description } = requestData;

    // Ensure TechnologyID and Query are parsed as integers
    const parsedQuery = 2;

    const result = await sql.query`
            exec [dbo].[Usp_InsertUpdateDelete_Modules]
            
            @TModuleID     = ${TModuleID},
            @ModuleName    = ${ModuleName},
            @Description   = ${Description},
            @Query         = ${parsedQuery}
        `;

    console.log(result);

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
  }  
});

app.delete("/apinit/Delete_Module", async (req, res) => {
  try {
    console.info("Method entered for update Module");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.body; // No need to stringify the request body
    console.info(requestData);

    const { TModuleID } = requestData;

    // Ensure TechnologyID and Query are parsed as integers
    const parsedQuery = 3;

    const result = await sql.query`
            exec [dbo].[Usp_InsertUpdateDelete_Modules]
            
            @TModuleID     = ${TModuleID},
           @Query         = ${parsedQuery}
        `;

    console.log(result);

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
  }  
});

app.post("/apinit/CreateTopics", async (req, res) => {
  try {
    console.info("Method entered for new Topic");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.body; // No need to stringify the request body
    console.info(requestData);

    const { TopicID, ModuleID, TopicName, Description, Query } = requestData;

    // Ensure TechnologyID and Query are parsed as integers
    const parsedQuery = parseInt(Query, 10);

    const result = await sql.query`
          Exec [dbo].[Usp_InsertUpdateDelete_Topics]
            @TopicID = ${TopicID},
            @ModuleId=${ModuleID},
            @TopicName=${TopicName},
            @Description = ${Description},
            @Query = ${Query}
        `;

    console.log(result);

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
  }  
});

app.post("/apinit/CreateSubTopic", async (req, res) => {
  try {
    console.info("Method entered for new SubTopic");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.body; // No need to stringify the request body
    console.info(requestData);

    const { TopicID, ModuleID, SubTopicName, Description, Query } = requestData;

    // Ensure TechnologyID and Query are parsed as integers
    const parsedQuery = parseInt(Query, 10);

    const result = await sql.query`
          exec [dbo].[Usp_InsertUpdateDelete_SubTopics]
            @TopicID = ${TopicID},
            @ModuleId=${ModuleID},
            @SubTopicName=${SubTopicName},
            @Description = ${Description},
            @Query = ${Query}
        `;

    console.log(result);

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
  }  
});

app.post("/apinit/CreateMCQquestions", async (req, res) => {
  try {
    console.info("Method entered for new MCQ questions");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.body; // No need to stringify the request body
    console.info(requestData);

    const {
      Question,
      OptionA,
      OptionB,
      OptionC,
      OptionD,
      CorrectAnswer,
      DifficultyLevelID,
      SubTopicId,
      Query,
    } = requestData;

    // Ensure TechnologyID and Query are parsed as integers
    const parsedQuery = parseInt(Query, 10);

    const result = await sql.query`
EXEC Usp_InsertUpdateDelete_MCQQuestions
            @Question = ${Question},
            @OptionA=${OptionA},
            @OptionB=${OptionB},
            @OptionC = ${OptionC},
            @OptionD = ${OptionD},
            @CorrectAnswer=${CorrectAnswer},
            @DifficultyLevelID=${DifficultyLevelID},
            @SubTopicId=${SubTopicId},
            @Query = ${Query}
        `;

    console.log(result);

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
  }  
});

// Endpoint to handle exam start insertion
app.post("/startExam", async (req, res) => {
  try {
    if (isProcessing) {
      console.log("Another process is already running. Waiting...");
      // You can customize the wait time or implement a retry mechanism
      await sleep(1000);
      return res
        .status(503)
        .send("Service Unavailable. Please try again later.");
    }

    // Set the flag to indicate that the process is running
    isProcessing = true;

    console.info("exam started");
    // Extract StudentID from request body
    const studentName = req.body.studentName;
    const testid = 16352;
    console.info(studentName);
    // Set TransactionType based on the existence of the student in the Results table
    const transactionType = await checkTransactionType(studentName);

    //   let transactionID = 99999;
    let transactionID = req.query.transactionId;
    // Insert into ExamTransactionLog and get the newly created TransactionID
    //transactionID = await insertIntoExamTransactionLog(transactionType, studentName, testid);
    console.log("Transaction ID Received" + transactionID);

    if (transactionID == null) {
      transactionID = 89533;
      console.log("Transaction Not Received" + transactionID);
    }

    //console.log("Transaction Not Received" + transactionID);

    const updatedquestions = await GetTestQuestionsPreview(
      testid,
      studentName,
      transactionID
    );

    console.info("Current Transaction Id1" + transactionID);

    //console.log(updatedquestions);6
    console.info(transactionID);

    console.info("Current Transaction Id2" + transactionID);

    res.status(200).json({
      message: "Exam start inserted successfully.",
      transactionID,
      updatedquestions,
    });
  } catch (error) {
    console.error("Error:5", error.message);
    res.status(500).send("Internal Server Error");
  } finally {
    // Reset the flag to indicate that the process is completed
    isProcessing = false;
  }
});

// Function to check TransactionType based on the existence of the student in the Results table
async function checkTransactionType(studentName) {
  try {
    let pool = await sql.connect(sqlConfig);
    const result = await pool
      .request()
      .input("StudentName", sql.VarChar, studentName)
      .query(
        "IF EXISTS (SELECT StudentName FROM Results WHERE StudentName = @StudentName) SELECT 'Re_Write' AS TransactionType ELSE SELECT 'New' AS TransactionType"
      );

    return result.recordset[0].TransactionType;
  } catch (error) {
    throw error;
  }  
}

// Function to insert into ExamTransactionLog and return the newly created TransactionID
async function insertIntoExamTransactionLog(
  transactionType,
  studentName,
  testId
) {
  try {
    let pool = await sql.connect(sqlConfig);

    // Check if the student already has a submission in StudentExamSubmissionDetails
    const existingSubmissionResult = await pool
      .request()
      .input("StudentName", sql.VarChar(500), studentName).query(`
                
select Max(transactionid) as TransactionId,isresultsubmited from [dbo].[StudentExamSubmissionDetails]
 WHERE StudentName = @StudentName
group by isresultsubmited
            `);
    console.info("step1");
    if (existingSubmissionResult.recordset.length > 0) {
      console.info("Observed record exists in StudentExamSubmissionDetails");
      const existingTransactionId =
        existingSubmissionResult.recordset[0].TransactionId;
      const isResultSubmitted =
        existingSubmissionResult.recordset[0].IsResultSubmitted;

      if (!isResultSubmitted) {
        // If IsResultSubmitted is false, retrieve the transactionId from ExamTransactionLog
        if (!pool.connected) {
          console.warn(
            "SQL connection is not open. Attempting to reconnect..."
          );
          await pool.close(); // Close the existing connection

          // Create a new connection
          pool = await sql.connect(sqlConfig);

          if (!pool.connected) {
            throw new Error("Failed to reconnect to the SQL server.");
          }

          console.log("Successfully reconnected to SQL server.");
        }

        const existingTransactionResult = await pool
          .request()
          .input("StudentName", sql.VarChar(50), studentName).query(`
                        SELECT TransactionId
                        FROM ExamTransactionLog
                        WHERE StudentName = @StudentName
                    `);

        if (existingTransactionResult.recordset.length > 0) {
          return existingTransactionResult.recordset[0].TransactionId;
        }
      }
    }
    console.info("step3");
    // If the student doesn't have an existing transaction or IsResultSubmitted is true, create a new entry
    if (!pool.connected) {
      console.warn("SQL connection is not open. Attempting to reconnect...");
      await pool.close(); // Close the existing connection

      // Create a new connection
      pool = await sql.connect(sqlConfig);

      if (!pool.connected) {
        throw new Error("Failed to reconnect to the SQL server.");
      }

      console.log("Successfully reconnected to SQL server.");
    }

    const result = await pool
      .request()
      .input("TransactionType", sql.VarChar(50), transactionType)
      .input("StudentName", sql.VarChar(50), studentName)
      .output("TransactionId", sql.Int).query(`
                INSERT INTO ExamTransactionLog (
                    TransactionType, Status, IsActive, CreatedBy, CreatedAt, ModifiedBy,
                    ModifiedAt, ExamAttemptedAt_Start, ExamAttemptedAt_End, Duration, StudentName
                )
                OUTPUT inserted.TransactionId
                VALUES ( 
                    @TransactionType,
                    null,       
                    1,               
                    'Admin', 
                    GETDATE(), 
                    'Admin',
                    GETDATE(),        
                    GETDATE(),         
                    NULL,              
                    null,
                    @StudentName
                )
            `);

    if (!pool.connected) {
      console.warn("SQL connection is not open. Attempting to reconnect...");
      await pool.close(); // Close the existing connection

      // Create a new connection
      pool = await sql.connect(sqlConfig);

      if (!pool.connected) {
        throw new Error("Failed to reconnect to the SQL server.");
      }

      console.log("Successfully reconnected to SQL server.");
    }

    // Access the newly created transaction ID using the output parameter
    const transactionmaxres1 = await pool
      .request()
      .input("StudentName", sql.VarChar(50), studentName)
      .query(
        `select Max(TransactionId) AS MaxTransactionId FROM ExamTransactionLog where StudentName =@StudentName`
      );
    const newTransactionId = transactionmaxres1.recordset[0].MaxTransactionId;

    if (newTransactionId > 0) {
      console.info("Transaction Created Sucesffully");
    } else {
      console.info("Transaction Createion Failed");
    }

    console.info("step4");
    // Update or insert into StudentExamSubmissionDetails
    if (!pool.connected) {
      console.warn("SQL connection is not open. Attempting to reconnect...");
      await pool.close(); // Close the existing connection

      // Create a new connection
      pool = await sql.connect(sqlConfig);

      if (!pool.connected) {
        throw new Error("Failed to reconnect to the SQL server.");
      }

      console.log("Successfully reconnected to SQL server.");
    }
    await pool
      .request()
      .input("StudentName", sql.VarChar(500), studentName)
      .input("Testid", sql.Int, testId)
      .input("IsResultSubmited", sql.Bit, 0)
      .input("TransactionId", sql.Int, newTransactionId).query(`
                MERGE INTO StudentExamSubmissionDetails AS Target
                USING (VALUES (@StudentName)) AS Source (StudentName)
                ON Target.StudentName = Source.StudentName
                WHEN MATCHED THEN
                    UPDATE SET
                        Target.TransactionId = @TransactionId,
                        Target.IsResultSubmited = 0
                WHEN NOT MATCHED THEN
                    INSERT (StudentName, Testid, IsResultSubmited, TransactionId)
                    VALUES (@StudentName, @Testid, 0, @TransactionId);
            `);

    console.log("New Transaction ID:", newTransactionId);
    return newTransactionId;
  } catch (error) {
    console.info(
      "Attention !! Issue with createoin of transaction Id " + error
    );

    throw error;
  }  
}

app.post("/apinit/FinalSubmission", async (req, res) => {
  try {
    console.info("request reached to reveiew subbmision");
    // Extract data from the request body
    const resultData = req.body.resultData;
    const studentName = req.body.studentName;
    const testId = req.body.testId;
    const transactionId = req.body.transactionId;

    // Call the stored procedure [dbo].[ExamSubmission]
    await callFinalExamSubmissionProcedure(
      resultData,
      studentName,
      testId,
      transactionId
    );

    res.status(200).send("Exam submitted successfully.");
  } catch (error) {
    console.error("Error:1", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Function to process the queue
const processQueue = async () => {
  if (isSubmitting || submissionQueue.length === 0) return;

  isSubmitting = true;
  const { req, res } = submissionQueue.shift();

  try {
    console.info("Request reached final submission");

    // Extract data from the request body
    const { resultData, studentName, testId, transactionId } = req.body;

    // Call the stored procedure [dbo].[ExamSubmission] and retrieve TID
    const tidValue = await callStudentFinalExamSubmissionProcedure(
      resultData,
      studentName,
      testId,
      transactionId
    );

    // Send TID as part of the response
    res.status(200).json({
      message: "Exam submitted successfully.",
      tid: tidValue,
    });
  } catch (error) {
    console.info("Need Satya Attention Here");
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    isSubmitting = false;
    processQueue(); // Process the next request in the queue
  }
};

app.post("/StudentFinalSubmission", async (req, res) => {
  submissionQueue.push({ req, res });
  processQueue();
});

app.post("/StudentFinalSubmission_Preview", async (req, res) => {
  try {
    console.info("Request reached final previwew submission1");

    if (isSubmitting) {
      console.log("Another process is already running. Waiting...");
      // You can customize the wait time or implement a retry mechanism
      await sleep(1000);
      return res
        .status(503)
        .send("Service Unavailable. Please try again later.");
    }

    // Set the flag to indicate that the process is running
    isSubmitting = true;

    // Extract data from the request body
    const resultData = req.body.resultData;
    const studentName = req.body.studentName;
    const testId = req.body.testId;
    const transactionId = req.body.transactionId;

    // Call the stored procedure [dbo].[ExamSubmission] and retrieve TID
    const tidValue = await callStudentFinalExamSubmissionProcedure_Preview(
      resultData,
      studentName,
      testId,
      transactionId
    );

    // Send TID as part of the response
    res.status(200).json({
      message: "Exam submitted successfully.",
      tid: tidValue,
    });
  } catch (error) {
    console.error("Error:2", error.message);
    res.status(500).send("Internal Server Error");
  } finally {
    // Reset the flag to indicate that the process is completed
    isSubmitting = false;
  }
});

// below method to validate the student already exam attempted or not
app.post("/getStudentExamSubmission", async (req, res) => {
  try {
    // Get values from request body
    const { StudentName, TestId } = req.body;

    // Create a connection pool
    let pool = await sql.connect(sqlConfig);

    // Prepare the SQL query with parameters
    const result = await pool
      .request()
      .input("StudentName", sql.NVarChar, StudentName)
      .input("TestId", sql.Int, TestId)
      .query(
        "SELECT TransactionId FROM [cmdexamdb].[dbo].[StudentExamSubmissionDetails] WHERE StudentName = @StudentName AND TestId = @TestId AND IsResultSubmited = 1"
      );

    // Check if the result set is empty or null
    if (result.recordset && result.recordset.length > 0) {
      // Extract the TransactionId from the first record
      const transactionId = result.recordset[0].TransactionId;

      // Send the TransactionId as JSON
      res.json({ TransactionId: transactionId });
    } else {
      // If no data is found, return TransactionId as 0
      res.json({ TransactionId: 0 });
    }
  } catch (err) {
    console.error("Error executing SQL query:", err.message);
    res.status(500).send("Internal Server Error");
  }  
});

app.post("/apinit/RefreshSubmission", async (req, res) => {
  try {
    // Extract data from the request body
    const resultData = req.body.resultData;
    const studentName = req.body.studentName;
    const testId = req.body.testId;
    const transactionId = req.body.transactionId;

    // Call the stored procedure [dbo].[ExamSubmission]
    await callRevieworRefreshExamSubmissionProcedure(
      resultData,
      studentName,
      testId,
      transactionId
    );

    res.status(200).send("Exam submitted successfully.");
  } catch (error) {
    console.error("Error:3", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/apinit/getCurrentQuestionId", async (req, res) => {
  try {
    const { studentName, testId, transactionID } = req.body;

    console.info(studentName);
    console.info(testId);
    console.info(transactionID);

    console.info("Current Transaction Id3" + transactionID);
    let pool = await sql.connect(sqlConfig);

    // Connect to the database
    await sql.connect(sqlConfig);

    // Retrieve the CurrentQuestionId from the database

    const result = await pool.request().query`
      SELECT [CurrentQuestionId]
      FROM [dbo].[StudentExamSubmissionDetails]
      WHERE [StudentName] = ${studentName} AND [TestId] = ${testId} AND [TransactionId] = ${transactionID};
    `;

    if (result.recordset.length > 0) {
      const currentQuestionId = result.recordset[0].CurrentQuestionId;
      res.status(200).json({ currentQuestionId });
    } else {
      res.status(404).json({ message: "Record not found" });
    }
  } catch (error) {
    console.error("Error getting CurrentQuestionId:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }  
});

app.post("/apinit/UpdateCombinations", async (req, res) => {
  try {
    console.info("Request reached UpdateCombinations endpoint");
    console.log(req.body);
    // Check if the request body contains the updateCombinations data
    if (!req.body || !req.body || !Array.isArray(req.body.data)) {
      throw new Error("Invalid updateCombinations data.");
    }

    // Extract data from the request body
    const updateCombinations = req.body.data;

    // Call the stored procedure [dbo].[USP_Update_CombinationsCount]
    await callUpdateCombinationsProcedure(updateCombinations);
    console.log("Combination updates sucess");
    // Send success response
    res.status(200).send("Combinations updated successfully.");
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

async function callUpdateCombinationsProcedure(updateCombinations) {
  try {
    console.log("method to combinaton sp");
    // Create a new table variable to hold the data
    const table = new sql.Table();
    table.columns.add("TechnologyName", sql.NVarChar(100));
    table.columns.add("TechnologyId", sql.Int);
    table.columns.add("ModuleName", sql.NVarChar(100));
    table.columns.add("ModuleId", sql.Int);
    table.columns.add("TopicName", sql.VarChar(1000));
    table.columns.add("TopicId", sql.Int);
    table.columns.add("SubtopicName", sql.NVarChar(100));
    table.columns.add("SubtpicID", sql.Int);
    table.columns.add("TestID", sql.Int);
    table.columns.add("TestDetailsID", sql.Int);
    table.columns.add("EasyCount", sql.Int);
    table.columns.add("MediumCount", sql.Int);
    table.columns.add("HardCount", sql.Int);

    // Populate rows in the table
    updateCombinations.forEach((row) => {
      table.rows.add(
        row.TechnologyName,
        row.TechnologyId,
        row.ModuleName,
        row.ModuleId,
        row.TopicName,
        row.TopicId,
        row.SubtopicName,
        row.SubtopicId,
        row.TestID,
        row.TestDetailsID,
        row.EasyCount,
        row.MediumCount,
        row.HardCount
      );
      console.log("printing Values");
      console.log(row.TechnologyName);
      console.log(row.TechnologyId);
      console.log(row.ModuleName);
      console.log(row.ModuleId);
      console.log(row.TopicName);
      console.log(row.TopicId);
      console.log(row.SubtopicName);
      console.log(row.SubtopicId);
      console.log(row.TestID);
      console.log(row.TestDetailsID);
      console.log(row.EasyCount);
      console.log(row.MediumCount);
      console.log(row.HardCount);
    });

    // Connect to the SQL database
    let pool = await sql.connect(sqlConfig);

    // Execute the stored procedure
    await pool
      .request()
      .input("UpdateCombinations", sql.TVP, table)
      .execute("USP_Update_CombinationsCount");
  } catch (error) {
    console.log("error:" + error);
    throw error;
  }  
}

app.put("/apinit/updateCurrentQuestionId", async (req, res) => {
  try {
    const { studentName, testId, newQuestionId, transactionid } = req.body;

    // Connect to the database
    await sql.connect(sqlConfig);

    // Update the CurrentQuestionId in the database
    const result = await sql.query`
      UPDATE [dbo].[StudentExamSubmissionDetails]
      SET [CurrentQuestionId] = ${newQuestionId}
      OUTPUT INSERTED.CurrentQuestionId
      WHERE [StudentName] = ${studentName} AND [TestId] = ${testId} and [TransactionId]= ${transactionid};
    `;

    // Check if any rows were affected
    if (result.rowsAffected[0] > 0) {
      const updatedQuestionId = result.recordset[0].CurrentQuestionId;
      res.status(200).json({
        message: "CurrentQuestionId updated successfully",
        updatedQuestionId,
      });
    } else {
      res.status(404).json({ message: "Record not found or no update needed" });
    }
  } catch (error) {
    console.error("Error updating CurrentQuestionId:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }  
});

async function callFinalExamSubmissionProcedure(
  resultData,
  studentName,
  testId,
  transactionId
) {
  try {
    console.info("Request reached to refresh");
    console.info("studentname");
    console.info(studentName);
    console.info("testId");
    console.info(testId);
    console.info("transactionId");
    console.info(transactionId);
    const table = new sql.Table();
    table.columns.add("QuestionID", sql.Int);
    table.columns.add("Answer", sql.NVarChar(255));
    table.columns.add("Status", sql.NVarChar(50));
    table.columns.add("Type", sql.NVarChar(50));

    // Populate rows in the table
    resultData.forEach((row) => {
      console.info(row.QuestionID);
      table.rows.add(row.QuestionID, row.Answer, row.Status, row.Type);
    });
    console.log(table);
    let pool = await sql.connect(sqlConfig);
    const result = await pool
      .request()
      .input("ResultData", sql.TVP, table)
      .input("StudentName", sql.VarChar, studentName)
      .input("TestId", sql.Int, testId)
      .input("TransactionId", sql.Int, transactionId)

      .execute("[dbo].[ExamSubmission]");

    console.log(result.recordset);
  } catch (error) {
    throw error;
  }  
}

async function callStudentFinalExamSubmissionProcedure_Preview(
  resultData,
  studentName,
  testId,
  transactionId
) {
  try {
    console.log("preview final log");
    console.info(transactionId);
    const table = new sql.Table();
    table.columns.add("QuestionID", sql.Int);
    table.columns.add("Answer", sql.NVarChar(255));
    table.columns.add("Status", sql.NVarChar(50));
    table.columns.add("Type", sql.NVarChar(50));

    // Populate rows in the table
    resultData.forEach((row) => {
      table.rows.add(row.QuestionID, row.Answer, row.Status, row.Type);
      console.log(row.Answer);
    });

    let pool = await sql.connect(sqlConfig);
    const result = await pool
      .request()
      .input("ResultData", sql.TVP, table)
      .input("StudentName", sql.VarChar, studentName)
      .input("TestId", sql.Int, testId)
      .input("TransactionId", sql.Int, transactionId)
      .output("TID", sql.Int) // Define an output parameter for TID

      .execute("Usp_ExamFinalSubmission_Preview");

    // Access the TID value from the output parameters
    const tidValue = result.output.TID;
    console.log("value of return Tid");
    console.log(tidValue);
    return tidValue;
  } catch (error) {
    throw error;
  }  
}

async function callStudentFinalExamSubmissionProcedure(
  resultData,
  studentName,
  testId,
  transactionId
) {
  try {
    console.info(transactionId);
    const table = new sql.Table();
    table.columns.add("QuestionID", sql.Int);
    table.columns.add("Answer", sql.NVarChar(150000));
    table.columns.add("Status", sql.NVarChar(250));
    table.columns.add("Type", sql.NVarChar(50));

    // Populate rows in the table
    resultData.forEach((row) => {
      table.rows.add(row.QuestionID, row.Answer, row.Status, row.Type);
    });

    let pool = await sql.connect(sqlConfig);
    const result = await pool
      .request()
      .input("ResultData", sql.TVP, table)
      .input("StudentName", sql.VarChar, studentName)
      .input("TestId", sql.Int, testId)
      .input("TransactionId", sql.Int, transactionId)
      .output("TID", sql.Int) // Define an output parameter for TID

      .execute("ExamFinalSubmission");

    // Access the TID value from the output parameters
    const tidValue = result.output.TID;
    console.log("value of return Tid");
    console.log(tidValue);
    return tidValue;
  } catch (error) {
    throw error;
  }  
}

async function callRevieworRefreshExamSubmissionProcedure(
  resultData,
  studentName,
  testId,
  transactionId
) {
  try {
    console.info(transactionId);
    const table = new sql.Table();
    table.columns.add("QuestionID", sql.Int);
    table.columns.add("Answer", sql.NVarChar(255));
    table.columns.add("Status", sql.NVarChar(50));
    table.columns.add("Type", sql.NVarChar(50));

    // Populate rows in the table
    resultData.forEach((row) => {
      table.rows.add(row.QuestionID, row.Answer, row.Status, row.Type);
    });

    let pool = await sql.connect(sqlConfig);
    const result = await pool
      .request()
      .input("ResultData", sql.TVP, table)
      .input("StudentName", sql.VarChar, studentName)
      .input("TestId", sql.Int, testId)
      .input("TransactionId", sql.Int, transactionId)
      .input("Status", sql.VarChar, "Refresh By Brwoser Close")
      .execute("[dbo].[ExamSubmission]");
  } catch (error) {
    throw error;
  }  
}

app.post("/apinit/createEditTest", async (req, res) => {
  try {
    console.log(req.body.data);
    console.log(req.body.data.TechnologyID);
    console.log(req.body.data.TestID);
    const pool = await sql.connect(sqlConfig);
    const result = await pool
      .request()
      .input("TechnologyID", sql.Int, req.body.data.TechnologyID)
      .input("TestID", sql.Int, req.body.data.TestID)
      .input("AssesmentID", sql.Int, req.body.data.AssesmentID)
      .input("NatureID", sql.Int, req.body.data.NatureID) // Remove the extra space here
      .input("RandomID", sql.Int, req.body.data.RandomID)
      .input("CreatedBy", sql.VarChar(200), req.body.data.CreatedBy)
      .input("ModifiedBy", sql.VarChar(200), req.body.data.ModifiedBy)
      .execute("[dbo].[usp_Test_SelectEdit]");
    console.log(result.recordset);

    res.status(200).json({ success: true, data: result.recordset });
  } catch (error) {
    console.error("Error executing stored procedure:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.post("/apinit/getBasicTestInfo", async (req, res) => {
  try {
    console.log(req.body.data.TestID);
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request();
    const testID = req.body.data.TestID;
    const testresults = await sql.query(`
            select * from dbo.Test where TestId= ${testID}
        `);
    console.log(testresults.recordset);

    res.status(200).json({ success: true, data: testresults.recordset });
  } catch (error) {
    console.error("Error executing stored procedure:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.post("/apinit/getBasicTestDetailsInfo", async (req, res) => {
  try {
    console.log(req.body.data.TestID);
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request();
    const testID = req.body.data.TestID;
    const testDetailsresults = await sql.query(`
            select * from dbo.TestDetails where TestId = ${testID}
        `);
    console.log(testDetailsresults.recordset);

    res.status(200).json({ success: true, data: testDetailsresults.recordset });
  } catch (error) {
    console.error("Error executing stored procedure:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.post("/apinit/updateTest", async (req, res) => {
  try {
    console.log("Harish", req.body.data);
    await sql.connect(sqlConfig);
    const {
      TestID,
      TestName,
      TestStartDate,
      TestEndDate,
      TestStartTime,
      TestEndTime,
      TestDescription,
    } = req.body.data;

    const result =
      await sql.query`EXEC Usp_Update_Test ${TestID}, ${TestName}, ${TestStartDate}, ${TestEndDate}, ${TestStartTime}, ${TestEndTime}, ${TestDescription}`;
    console.log(result);
    res.status(200).send("Test information updated successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating test information.");
  }  
});

app.post("/apinit/createTestAssessment", async (req, res) => {
  try {
    console.log(req.body.data);
    const pool = await sql.connect(sqlConfig);
    const result = await pool
      .request()
      .input("TestID", sql.Int, req.body.data.TestID)
      .input("TestDetailsID", sql.Int, req.body.data.TestDetailsID)
      .input("QuestionTypeID", sql.Int, req.body.data.QuestionTypeID)
      .input("TestCaseID", sql.Int, req.body.data.TestCaseID)
      .input("NumOfEasy", sql.Int, req.body.data.NumOfEasy)
      .input("NumOfMedium", sql.Int, req.body.data.NumOfMedium)
      .input("NumOfHard", sql.Int, req.body.data.NumOfHard)
      .input("CreatedBy", sql.VarChar(200), req.body.data.CreatedBy)
      .input("ModifiedBy", sql.VarChar(200), req.body.data.ModifiedBy)
      .execute("usp_TestDetail_SelectEdit");

    res.status(200).json({ success: true, data: result.recordset });
  } catch (error) {
    console.error("Error executing stored procedure:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.post("/apinit/CreateTestQuestions", async (req, res) => {
  try {
    const table = new sql.Table();
    table.columns.add("SubTopicID", sql.Int);
    table.columns.add("CommaSeperatedString", sql.NVarChar(255));

    // Populate rows in the table
    resultData.forEach((row) => {
      console.info(row.SubTopicID);
      table.rows.add(row.SubTopicID, row.CommaSeperatedString);
    });
    console.log(table);
    let pool = await sql.connect(sqlConfig);
    const result = await pool
      .request()
      .input("CommaSeperateType", sql.TVP, table)

      .execute("[dbo].[USP_CommaSeperate_ExamPaper]");

    console.log(result.recordset);
    res.status(200).json({ success: true, data: result.recordset });
  } catch (error) {
    console.error("Error executing stored procedure:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.post("/apinit/insertQuestionData", async (req, res) => {
  try {
    const questionData = req.body;

    console.info(req.body);

    const jsonData = JSON.stringify(questionData.data);
    console.info(jsonData);

    // Connect to the SQL Server
    await sql.connect(sqlConfig);

    // Define the table type
    const tableType = new sql.Table();
    tableType.columns.add("Technology", sql.NVarChar(255));
    tableType.columns.add("Module", sql.NVarChar(255));
    tableType.columns.add("Topic", sql.NVarChar(255));
    tableType.columns.add("SubTopic", sql.NVarChar(255));
    tableType.columns.add("QuestionDescription", sql.NVarChar(255));
    tableType.columns.add("OptionA", sql.NVarChar(255));
    tableType.columns.add("OptionB", sql.NVarChar(255));
    tableType.columns.add("OptionC", sql.NVarChar(255));
    tableType.columns.add("OptionD", sql.NVarChar(255));
    tableType.columns.add("CorrectAnswer", sql.NVarChar(255));
    tableType.columns.add("Explanation", sql.NVarChar(255));
    tableType.columns.add("DifficultyLevel", sql.Int);

    // Parse the JSON string into an array of objects
    const parsedData = JSON.parse(jsonData);

    // Populate rows in the table type
    parsedData.forEach((row) => {
      console.info(row.QuestionDescription);
      // Ensure numeric values are handled correctly (convert to appropriate types if needed)
      tableType.rows.add(
        row.Technology,
        row.Module,
        row.Topic,
        row.SubTopic,
        row.QuestionDescription,
        row.OptionA,
        row.OptionB,
        row.OptionC,
        row.OptionD,
        row.CorrectAnswer,
        row.Explanation,
        row.DifficultyLevel
      );
    });

    // Execute the stored procedure with the provided data
    const request = pool.request();
    request.input("TVP", sql.TVP, tableType);

    const result = await request.execute("[dbo].[USP_READEXCEL_CRUD]");

    // Close the SQL connection
     ;

    // Send the result as the response
    res.json(result);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/apinit/FastTrackCreateTest", async (req, res) => {
  try {
    const questionData = req.body;

    console.info(req.body.data);

    const jsonData = JSON.stringify(req.body.data);
    const TestName = "Dynamic Test";
    const AssesmentID = 1;

    console.info(jsonData);

    // Connect to the SQL Server
    await sql.connect(sqlConfig);

    // Define the table type
    const tableType = new sql.Table();
    tableType.columns.add("Technology", sql.NVarChar(255));
    tableType.columns.add("Module", sql.NVarChar(255));
    tableType.columns.add("Topic", sql.NVarChar(255));
    tableType.columns.add("SubTopic", sql.NVarChar(255));
    tableType.columns.add("QuestionDescription", sql.NVarChar(255));
    tableType.columns.add("OptionA", sql.NVarChar(255));
    tableType.columns.add("OptionB", sql.NVarChar(255));
    tableType.columns.add("OptionC", sql.NVarChar(255));
    tableType.columns.add("OptionD", sql.NVarChar(255));
    tableType.columns.add("CorrectAnswer", sql.NVarChar(255));
    tableType.columns.add("Explanation", sql.NVarChar(255));
    tableType.columns.add("DifficultyLevel", sql.Int);
    console.info("Trying to parse the json");
    // Parse the JSON string into an array of objects
    const parsedData = JSON.parse(jsonData);
    console.info(parsedData);
    // Populate rows in the table type
    parsedData.forEach((row) => {
      console.info(row.QuestionDescription);
      // Ensure numeric values are handled correctly (convert to appropriate types if needed)
      tableType.rows.add(
        row.Technology,
        row.Module,
        row.Topic,
        row.SubTopic,
        row.QuestionDescription,
        row.OptionA,
        row.OptionB,
        row.OptionC,
        row.OptionD,
        row.CorrectAnswer,
        row.Explanation,
        row.DifficultyLevel
      );
    });

    // Execute the stored procedure with the provided data
    const request = pool.request();
    request.input("TVP", sql.TVP, tableType);
    request.input("TestName", sql.NVarChar, TestName);
    request.input("AssesmentID", sql.Int, AssesmentID);

    const result = await request.execute("[dbo].[Fast_track_Questions]");

    // Close the SQL connection
     ;

    // Send the result as the response
    res.json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/apinit/fetchFixedQuestions", async (req, res) => {
  try {
    console.log("request reached to fetchdynamicQuestion");
    console.info(req.query);
    //console.info(req.body.data);
    // Connect to the database
    await sql.connect(sqlConfig);

    // Get dynamic McqAll array from query parameters
    // const McqAll = req.query.McqAll; // Example: ?McqAll=10,40,61
    //const McqAllArray = McqAll.split(',').map(questionid => ({ questionid: parseInt(questionid) }));

    // Create a table object with the appropriate schema (assuming questionid is of type int)
    // const table = new sql.Table();
    // table.columns.add('questionid', sql.Int);
    // McqAllArray.forEach(row => table.rows.add(row.questionid));

    // Your other input parameters
    //const HardCount = parseInt(req.query.HardCount);
    //const MediumCount = parseInt(req.query.MediumCount);
    //const DifficultyLevelID = parseInt(req.query.DifficultyLevelID);
    const ModuleID = parseInt(req.query.ModuleID);
    const TopicID = parseInt(req.query.TopicID);
    const SubTopicID = parseInt(req.query.SubTopicID);
    const DifficultyLevelID = parseInt(req.query.DifficultyLevelID);
    // Create a request object
    const request = new sql.Request();

    // //Define input parameters as request input

    //request.input('HardCount', sql.Int, HardCount);
    //request.input('MediumCount', sql.Int, MediumCount);
    //request.input('DifficultyLevelID', sql.Int, DifficultyLevelID);
    request.input("ModuleID", sql.Int, ModuleID);
    request.input("TopicID", sql.Int, TopicID);
    request.input("SubTopicID", sql.Int, SubTopicID);
    request.input("DifficultyLevelID", sql.Int, DifficultyLevelID);
    // Execute the stored procedure
    const result = await request.execute("dbo.[FetchFixedQuestionsMcqAll]");

    // Send the result as JSON
    res.json(result.recordset);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }  
});

app.get("/apinit/fetchFixedProgrammQuestions", async (req, res) => {
  try {
    console.log("request reached to fetchProgramQuestion");
    console.info(req.query);
    //console.info(req.body.data);
    // Connect to the database
    await sql.connect(sqlConfig);

    // Get dynamic McqAll array from query parameters
    // const McqAll = req.query.McqAll; // Example: ?McqAll=10,40,61
    //const McqAllArray = McqAll.split(',').map(questionid => ({ questionid: parseInt(questionid) }));

    // Create a table object with the appropriate schema (assuming questionid is of type int)
    // const table = new sql.Table();
    // table.columns.add('questionid', sql.Int);
    // McqAllArray.forEach(row => table.rows.add(row.questionid));

    // Your other input parameters
    //const HardCount = parseInt(req.query.HardCount);
    //const MediumCount = parseInt(req.query.MediumCount);
    //const DifficultyLevelID = parseInt(req.query.DifficultyLevelID);
    const ModuleID = parseInt(req.query.ModuleID);
    const TopicID = parseInt(req.query.TopicID);
    const SubTopicID = parseInt(req.query.SubTopicID);
    const DifficultyLevelID = parseInt(req.query.DifficultyLevelID);
    // Create a request object
    const request = new sql.Request();

    // //Define input parameters as request input

    //request.input('HardCount', sql.Int, HardCount);
    //request.input('MediumCount', sql.Int, MediumCount);
    //request.input('DifficultyLevelID', sql.Int, DifficultyLevelID);
    request.input("ModuleID", sql.Int, ModuleID);
    request.input("TopicID", sql.Int, TopicID);
    request.input("SubTopicID", sql.Int, SubTopicID);
    request.input("DifficultyLevelID", sql.Int, DifficultyLevelID);
    // Execute the stored procedure
    const result = await request.execute("[dbo].[FetchFixedProgramQuestions]");

    // Send the result as JSON
    res.json(result.recordset);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }  
});

app.get("/apinit/retrieveProgramQuestions/:id", async (req, res) => {
  try {
    console.info("List of programs");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.params.id; // No need to stringify the request body
    console.info(requestData);

    const programId = requestData;

    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1

    const result = await sql.query`
            EXEC [dbo].[USP_RetriveProgramQuestions]
            @programId   = ${programId}
          
            
           `;

    console.log("ListPrograms", result);

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
  }  
});

app.post("/GetTodayTests_code", async (req, res) => {
  try {
    console.info("listofcodeTests");
    await sql.connect(sqlConfig);

    console.log(req.body);
    const requestData = req.body; // No need to stringify the request body
    console.info(requestData);

    const { studentId, createdAt } = requestData;

    const result = await sql.query`EXEC [dbo].[USP_GetTodayTests_code_Bk]
            @studentId  = ${studentId},
            @createdAt=${createdAt}`;

    console.log("List_Codetests", result);

    if (result.recordset !== undefined && result.recordset.length > 0) {
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
  }  
});

app.get("/apinit/retrieveProgramTestCase/:id", async (req, res) => {
  try {
    console.info("List of programtests");
    await sql.connect(sqlConfig);
    const programId = req.params.id;
    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1

    const result = await sql.query`EXEC [dbo].[USP_RetriveProgramTestCase]
             @programId=${programId}
          
            
           `;

    console.log("ListTestCases", result);

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
  }  
});

app.get("/apinit/mcqCheckQuestions", async (req, res) => {
  try {
    // Extract easy, medium, and hard counts from query parameters
    const { easyCount, mediumCount, hardCount } = req.query;

    // Connect to the database
    await sql.connect(sqlConfig);

    // Query to get random questions based on difficulty levels and counts
    const result = await sql.query(`
      SELECT  * FROM MCQQuestionsALL WHERE DifficultyLevelID = 1 and type='radio' order by QuestionID;
      SELECT  * FROM MCQQuestionsALL WHERE DifficultyLevelID = 2 and type= 'radio' order by QuestionID;
      SELECT  * FROM MCQQuestionsALL WHERE DifficultyLevelID = 3 and type ='radio' order by QuestionID;
    `);

    // Combine the result sets into a single array
    const questions = result.recordsets.reduce(
      (acc, curr) => acc.concat(curr),
      []
    );

    // Send the data as JSON
    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }  
});

app.get("/apinit/FreeTextQuestions", async (req, res) => {
  try {
    // Extract easy, medium, and hard counts from query parameters
    const { easyCount, mediumCount, hardCount } = req.query;

    // Connect to the database
    await sql.connect(sqlConfig);

    // Query to get random questions based on difficulty levels and counts
    const result = await sql.query(`
      SELECT TOP (${
        easyCount || 0
      }) * FROM DescriptiveQuestion WHERE DifficultyLevelID = 1 and type='FreeText'  ORDER BY NEWID();
      SELECT TOP (${
        mediumCount || 0
      }) * FROM DescriptiveQuestion WHERE DifficultyLevelID = 2 and type= 'FreeText' ORDER BY NEWID();
      SELECT TOP (${
        hardCount || 0
      }) * FROM DescriptiveQuestion WHERE DifficultyLevelID = 3 and type ='FreeText' ORDER BY NEWID();
    `);

    // Combine the result sets into a single array
    const questions = result.recordsets.reduce(
      (acc, curr) => acc.concat(curr),
      []
    );

    // Send the data as JSON
    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }  
});

app.get("/apinit/fetchtestsbydate", async (req, res) => {
  try {
    console.info("List of  Tests");
    const { startdate, enddate } = req.query;
    console.log(startdate, enddate);
    await sql.connect(sqlConfig);
    console.log(req.body);
    const result = await sql.query`
            EXEC   Usp_FetchTestsBydate
            @startDate   = ${startdate},
            @endDate   = ${enddate}
          
            
           `;

    console.log("ListTests", result);

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
  }  
});

app.get("/apinit/getimage/:username", async (req, res) => {
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query`
      SELECT
        UL.UserID,
        UL.Username,
        UL.Password,
        UL.IsActive AS UserIsActive,
        UL.StudentID,
        S.FirstName,
        S.LastName,
        S.Email,
        S.PhoneNumber,
        S.BatchId,
        S.IsActive AS StudentIsActive,
        S.CreatedBy AS StudentCreatedBy,
        S.CreatedAt AS StudentCreatedAt,
        S.ModifiedBy AS StudentModifiedBy,
        S.ModifiedAt AS StudentModifiedAt,
        S.Image
      FROM
        UserLogin UL
      JOIN
        Student S ON UL.StudentID = S.StudentID
      WHERE
        UL.Username = ${req.params.username};
    `;

    if (result.recordset.length > 0) {
      res.json(result.recordset[0]);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }  
});
// Modify your route handler to fetch questions and render the EJS template
app.get("/apinit/studentExamPage", async (req, res) => {
  const testID = 16352; // Extract testID from query string
  console.info("Step 1 Student Exam Page Loaded");
  try {
    if (!testID) {
      throw new Error("Test ID is missing in the query string.");
    }
    // Fetch questions using the executeGetTestQuestions function
    const questions = await executeGetTestQuestions(testID);
    //console.log('Fetched questions in route handler:', questions);

    // Render the EJS template and pass the questions variable
    res.render("studentExamPage", { questions });
  } catch (error) {
    if (!testID) {
      res
        .status(500)
        .json({ message: "Test ID is missing in the query string" });
    } else {
      res.status(500).json({ message: "Error fetching questions." });
    }
    console.error("Error fetching questions:", error.message);
  }
});

app.get("/apinit/previewExamPage", async (req, res) => {
  const testID = req.query.testID; // Extract testID from query string
  const transactionId = req.query.transactionId;
  const userName = req.query.UserName;
  console.info("Step1 preview Student Exam Page Loaded");
  console.info(testID);
  console.info(transactionId);
  try {
    if (!testID) {
      throw new Error("Test ID is missing in the query string.");
    }
    console.info("Step2 preview Student Exam Page Loaded");
    // Fetch questions using the executeGetTestQuestions function
    const questions = await GetTestQuestionsPreview(
      testID,
      userName,
      transactionId
    );
    //console.log('Fetched questions in route handler:', questions);
    console.log("Questions", questions);
    // Render the EJS template and pass the questions variable
    res.render("previewExamPage", { questions, username: "test" });
  } catch (error) {
    if (!testID) {
      res
        .status(500)
        .json({ message: "Test ID is missing in the query string" });
    } else {
      res.status(500).json({ message: "Error fetching questions." });
    }
    console.error("Error fetching questions:", error.message);
  }
});

app.get("/MCQExamPage", async (req, res) => {
  const testID = req.query.testID; // Extract testID from query string
  const transactionId = req.query.transactionId;
  const userName = req.query.UserName;
  console.log("Testing UserName");
  console.log(userName);
  console.info("Step1 preview Student Exam Page Loaded");
  console.info(testID);
  console.info(transactionId);
  try {
    if (!testID) {
      throw new Error("Test ID is missing in the query string.");
    }
    console.info("Step2 preview Student Exam Page Loaded");
    // Fetch questions using the executeGetTestQuestions function
    const questions = await GetTestQuestionsPreview(
      testID,
      userName,
      transactionId
    );
    //console.log('Fetched questions in route handler:', questions);
    console.log("Questions", questions);
    // Render the EJS template and pass the questions variable
    res.render("MCQExamPage", { questions, username: "test" });
  } catch (error) {
    if (!testID) {
      res
        .status(500)
        .json({ message: "Test ID is missing in the query string" });
    } else {
      res.status(500).json({ message: "Error fetching questions." });
    }
    console.error("Error fetching questions:", error.message);
  }
});

app.get("/MCQExamPagePreview", async (req, res) => {
  const testID = req.query.testID;
  const transactionId = req.query.transactionId;
  const userName = req.query.UserName;
  console.log("Testing UserName");
  console.log(userName);
  console.info("Step1 preview Student Exam Page Loaded");
  console.info(testID);
  console.info(transactionId);

  if (!testID) {
    return res
      .status(500)
      .json({ message: "Test ID is missing in the query string." });
  }

  console.info("Step2 preview Student Exam Page Loaded");

  const fileName = `${userName}_${testID}_${transactionId}.json`;
  const filePath = path.join(__dirname, fileName);

  try {
    let questions;

    if (fs.existsSync(filePath)) {
      // File exists, read questions from file
      console.info("Reading questions from file");
      const data = fs.readFileSync(filePath, "utf-8");
      questions = JSON.parse(data);
    } else {
      // File does not exist, fetch questions and save to file
      console.info("Fetching questions from GetTestQuestionsPreview");
      questions = await GetTestQuestionsPreview(
        testID,
        userName,
        transactionId
      );
      fs.writeFileSync(filePath, JSON.stringify(questions, null, 2), "utf-8");
    }

    console.log("Questions", questions);
    res.render("MCQExamPage", { questions, username: userName });
  } catch (error) {
    res.status(500).json({ message: "Error fetching questions." });
    console.error("Error fetching questions:", error.message);
  }
});

app.post("/AuthenticateStudent", async (req, res) => {
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
    const result = await request.execute("Usp_AuthenticateStudent");

    console.log("CheckUsername", result);

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
      res.status(200).send({
        IsAuthenticated: true,
        studentId: user.studentId,
        UserName: user.UserName,
        BatchName: user.BatchName,
        FirstName: user.FirstName,
        LastName: user.LastName,
        role: user.role,
      });
    } else if (result.output && result.output.Message) {
      // Handle the case where the output message is provided
      const message = result.output.Message;
      res.status(401).send(message);
    } else {
      res.status(401).send("Invalid username and password");
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }  
});

app.post("/apinit/AuthenticateAdmin", async (req, res) => {
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
    const result = await request.execute("Usp_AuthenticateAdmin");

    console.log("CheckUsername", result);

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
      res.status(200).send({
        IsAuthenticated: true,
        studentId: user.studentId,
        UserName: user.UserName,
        BatchName: user.BatchName,
        FirstName: user.FirstName,
        LastName: user.LastName,
        role: user.role,
      });
    } else if (result.output && result.output.Message) {
      // Handle the case where the output message is provided
      const message = result.output.Message;
      res.status(401).send(message);
    } else {
      res.status(401).send("Invalid username and password");
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }  
});

app.post("/apinit/RetriveTestsBystudentId_code", async (req, res) => {
  try {
    console.info("listofTests");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.body; // No need to stringify the request body
    console.info(requestData);

    const { studentemail, TestId } = requestData;

    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1

    const result = await sql.query`
            EXEC [dbo].[USP_RetriveTestsBystudentId_ProgramCode]
            @studentemail  = ${studentemail},

            @TestId=${TestId}

           `;

    console.log("List_Ttests", result);

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
  }  
});

app.post("/apinit/RetriveProgramQuestionsByTestid", async (req, res) => {
  try {
    console.info("listofTests");
    await sql.connect(sqlConfig);

    const requestData = req.body; // No need to stringify the request body
    console.info(requestData);

    const { testId, studentEmail } = requestData;

    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1

    const result = await pool
      .request()
      .input("TestId", sql.Int, testId)
      .input("studentEmail", sql.VarChar, studentEmail)
      .execute("[dbo].[USP_RetriveTestsBystudentId_ProgramCode]");

    console.log("List_Ttests", result);

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
  }  
});

app.post("/apinit/RetriveProgramsByStudentId", async (req, res) => {
  try {
    console.info("listofTests");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.body; // No need to stringify the request body
    console.info(requestData);

    const { studentId, TestId } = requestData;

    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1

    const result = await sql.query`
              EXEC USP_RetriveProgramsByStudentId
              @studentId  = ${studentId},
              @TestId=${TestId}
  
             `;

    console.log("List_Ttests", result);

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
  }  
});

app.post("/apinit/RetriveTestsBystudentId_Mcq", async (req, res) => {
  try {
    console.info("listofTests");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.body; // No need to stringify the request body
    console.info(requestData);

    const { studentId, createdAt } = requestData;

    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1

    const result = await sql.query`
              EXEC [dbo].[USP_RetriveTestsBystudentId_Mcq]
              @studentId  = ${studentId},
              @createdAt=${createdAt}
  
             `;

    console.log("List_Ttests", result);

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
  }  
});

app.get("/apinit/retrive-batch-details/:batchId", async (req, res) => {
  try {
    const batchId = req.params?.batchId;
    await sql.connect(sqlConfig);
    if (!batchId) {
      res.status(400);
      res.json({
        error: "batchId missing",
        message: "batchId must be sent",
      });
      return;
    }

    if (Number(batchId) === NaN || !Number(batchId)) {
      res.status(400);
      res.json({
        error: "Invalid batchId",
        message: "batchId must be valid",
      });
      return;
    }

    //const connection = await db.getConnection();

    const result = await sql.query`
              EXEC [dbo].[USP_RetriveBatch_Details]
              @BatchId   = ${batchId}
               `;

    // if (result.recordset !== undefined && result.recordset.length > 0) {
    //   res
    //     .status(404)
    //     .json({ error: "no records", message: "records not found" });
    //   return;
    // }

    const recordset = result.recordset;

    /**
     * JsonResult is specific to this sp type: JSON.stringify
     *
     * value: {"technologyId":Number,"moduleId":Number,"batchName":String,"batchAdmin":String,"startDate":String,"endDate":String,"facultyIds":String,"mentorIds":String,"studentIds":String}
     */
    const { "JSON_F52E2B61-18A1-11d1-B105-00805F49916B": JsonResult } =
      recordset[0];

    res.status(200).send(JsonResult);
  } catch (error) {
    console.error(error);

    res.json({
      error: new Error(error).name,
      message: new Error(error).message,
    });
  }
});

app.post("/apinit/program/new-program", (req, res) => {
  try {
    const body = req.body;

    if (
      !body.files ||
      !body.testCases ||
      !body.problemName ||
      !body.problemDescription ||
      !body.sampleInput ||
      !body.image ||
      !body.sampleOutput ||
      !body.explanation
    ) {
      res.status(500).json({
        error: "Missing data",
        message: "Missing required fields in request body",
      });
      return;
    }
    res.status(201).json({ message: "Problem created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.name, message: error.message });
  }
});

app.get("/apinit/ExamMainPage", async (req, res) => {
  const testID = req.query.testID; // Extract testID from query string
  const transactionId = req.query.transactionId;
  const userName = req.query.UserName;
  console.info("Step1 preview Student ExaMainPage Loaded");
  console.info(testID);
  console.info(transactionId);
  try {
    if (!testID) {
      throw new Error("Test ID is missing in the query string.");
    }
    console.info("Step2 preview Student ExamMainPage Loaded");
    // Fetch questions using the executeGetTestQuestions function
    const questions = await GetTestQuestionsPreview(
      testID,
      userName,
      transactionId
    );
    //console.log('Fetched questions in route handler:', questions);

    // Render the EJS template and pass the questions variable
    res.render("ExamMainPage", { questions });
  } catch (error) {
    if (!testID) {
      res
        .status(500)
        .json({ message: "Test ID is missing in the query string" });
    } else {
      res.status(500).json({ message: "Error fetching questions." });
    }
    console.error("Error fetching questions:", error.message);
  }
});

app.get("/apinit/studentexampagev1", async (req, res) => {
  const testID = 16352; // Replace with the actual test ID you want to fetch questions for
  console.info("student page loaded");
  try {
    // Fetch questions using the executeGetTestQuestions function
    const questions = await executeGetTestQuestions(testID);
    //console.log('Fetched questions in route handler:', questions);

    // Render the EJS template and pass the questions variable
    res.render("studentexampagev1", { questions });
  } catch (error) {
    console.error("Error fetching questions:", error.message);
    res.status(500).json({ message: "Error fetching questions." });
  }
});

app.get("/apinit/studentExamPagemodified", async (req, res) => {
  const testID = 16938; // Replace with the actual test ID you want to fetch questions for
  console.info("student page loaded");
  try {
    // Fetch questions using the executeGetTestQuestions function
    const questions = await executeGetTestQuestions(testID);
    //console.log('Fetched questions in route handler:', questions);

    // Render the EJS template and pass the questions variable
    res.render("studentExamPage", { questions });
  } catch (error) {
    console.error("Error fetching questions:", error.message);
    res.status(500).json({ message: "Error fetching questions." });
  }
});

app.get("/apinit/login", async (req, res) => {
  //const testID = 15818; // Replace with the actual test ID you want to fetch questions for
  //console.info("student page loaded");
  try {
    console.log("request reached to login page");
    // Fetch questions using the executeGetTestQuestions function
    //   const questions = await executeGetTestQuestions(testID);
    //console.log('Fetched questions in route handler:', questions);

    // Render the EJS template and pass the questions variable
    res.render("loginpage");
  } catch (error) {
    console.error("Error fetching questions:", error.message);
    res.status(500).json({ message: "Error fetching questions." });
  }
});

//app.get('/studentResultPage', async (req, res) => {
//    const testID = 14; // Replace with the actual test ID you want to fetch questions for
//    console.info("fetching student results");
//    try {

//        res.render('studentResultPage', {  });
//    } catch (error) {
//        console.error('Error fetching questions:', error.message);
//        res.status(500).json({ message: 'Error fetching questions.' });
//    }
//});

// API endpoint to get distinct combinations of StudentName, TestId, TransactionId, and unique questions with filtering
//app.get('/ ', async (req, res) => {
//    try {
//        const { studentName, testId, transactionId } = req.query;

//        console.info("step1");
//        console.info(studentName);
//        console.info(testId);
//        console.info(transactionId);

//        await sql.connect(sqlConfig);

//        const result = await sql.query`
//            SELECT
//                r.StudentName,
//                r.TestId,
//                r.TransactionId,
//                MIN(r.ResultID) AS ResultID,
//                r.QuestionID,
//                MIN(r.Answer) AS Answer,
//                MIN(r.Status) AS Status,
//                MIN(r.Type) AS Type,
//                MIN(r.Result) AS Result,
//                MIN(r.CreatedAt) AS CreatedAt,
//                MIN(r.ModifiedAt) AS ModifiedAt,
//                MIN(s.IsResultSubmited) AS IsResultSubmited,
//                MIN(s.CurrentQuestionId) AS CurrentQuestionId,
//                MIN(s.RemainingMins) AS RemainingMins,
//                MIN(s.RemainingSecs) AS RemainingSecs
//            FROM
//                dbo.Results r
//            INNER JOIN
//                dbo.StudentExamSubmissionDetails s ON r.StudentName = s.StudentName
//                    AND r.TestId = s.TestId
//                    AND r.TransactionId = s.TransactionId
//            WHERE
//                r.StudentName = ${studentName} AND
//                r.TestId = ${testId} AND
//                r.TransactionId = ${transactionId}
//            GROUP BY
//                r.StudentName,
//                r.TestId,
//                r.TransactionId,
//                r.QuestionID
//            ORDER BY
//                r.StudentName, r.TestId, r.TransactionId, r.QuestionID;
//        `;

//        console.info("step final");
//        if (result.recordset.length > 0) {
//            // Pass resultData to the EJS template
//            res.render('studentResultPage', { resultData: result.recordset });
//        } else {
//            res.status(404).json({ message: 'User not found' });
//        }

//    } catch (error) {
//        console.error('Error getting distinct student results:', error.message);
//        res.status(500).json({ error: 'Internal Server Error' });
//    } finally {
//        // Close the database connection after sending the response
//         ;
//    }
//});

// Route to render the studentResultPage template
//app.get('/studentResultPage', async (req, res) => {
//    try {

//        console.info("step1");
//        console.info(studentName);
//        console.info(testId);
//        console.info(transactionId);
//        // Retrieve testId, studentName, and transactionId from the request object
//        const { testId, studentName, transactionId } = req.query;

//        // Fetch distinct student results using the /getDistinctStudentResults endpoint
//        const response = await fetch(`/getDistinctStudentResults?studentName=${studentName}&testId=${testId}&transactionId=${transactionId}`);
//        const data = await response.json();

//        // Render the studentResultPage template with the fetched results
//        res.render('studentResultPage', { studentResults: data });
//    } catch (error) {
//        console.error('Error fetching questions:', error.message);
//        res.status(500).json({ message: 'Error fetching questions.' });
//    }
//});

const fetchDistinctStudentResults = async (
  studentName,
  testId,
  transactionId
) => {
  let result;

  try {
    console.info("Fetching distinct student results");
    console.log("need attention here");
    console.log(studentName);
    console.log(testId);
    console.log(transactionId);

    await sql.connect(sqlConfig);

    result = await sql.query`
                SELECT
                StudentName,
                Answer,
                QuestionDescription,
                CorrectAnswer,
                Result,
                Status
            FROM
                dbo.Results
            WHERE
                StudentName = ${studentName} AND
                TestId = ${testId} AND
                TransactionId = ${transactionId}
            ORDER BY Status;
    `;

    console.info("Fetch complete");
  } catch (error) {
    console.error("Error fetching distinct student results:", error.message);
    throw error;
  }  
  console.info("record length");
  console.info(result.recordset.length);
  return result.recordset;
};
// Usage example in your /studentResultPage route
const fetchWithRetry = async (
  fetchFunction,
  maxAttempts,
  delayBetweenAttempts
) => {
  let attempts = 0;

  const fetchData = async () => {
    try {
      const resultData = await fetchFunction();
      return resultData;
    } catch (error) {
      attempts++;

      if (attempts >= maxAttempts) {
        throw new Error(`Failed after ${attempts} attempts: ${error.message}`);
      }

      // Wait for a specified delay before retrying
      await new Promise((resolve) => setTimeout(resolve, delayBetweenAttempts));
      return fetchData();
    }
  };

  return fetchData();
};

// Usage example
const retryAttempts = 3;
const retryDelay = 1000; // in milliseconds
app.post("/studentResults", async (req, res) => {
  try {
    const { testId, studentName, transactionId } = req.body;

    // Wrap the fetchDistinctStudentResults function with retry logic
    const resultData = await fetchWithRetry(
      () => fetchDistinctStudentResults(studentName, testId, transactionId),
      retryAttempts,
      retryDelay
    );

    // Send the result data as JSON
    res.json({ resultData });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.post("/apinit/StudentProgramTestCases", async (req, res) => {
  try {
    console.info("Request reached Testcases");
    console.log(req.body);
    // Check if the request body contains the EnrollTest
    if (!req.body || !req.body || !Array.isArray(req.body.data)) {
      throw new Error("Invalid Testcase data.");
    }
    const StudentProgramTestCases = req.body.data;
    const jsonData = JSON.stringify(StudentProgramTestCases);
    console.info(jsonData);

    // Extract data from the request body

    const ProgramId = req.body.ProgramId;
    console.log(req.body.ProgramId);
    console.log(ProgramId);
    const Email = req.body.Email;
    const No_Attempts = req.body.No_Attempts;
    const No_TestCasesPassed = req.body.No_TestCasesPassed;
    const No_TestCasesFailed = req.body.No_TestCasesFailed;
    const StudentName = req.body.StudentName;
    const UserCode = req.body.UserCode;
    const TotalDuration = req.body.TotalDuration;
    console.log(
      ProgramId,
      Email,
      No_Attempts,
      No_TestCasesPassed,
      No_TestCasesFailed,
      StudentName,
      UserCode,
      TotalDuration
    );

    // Call the stored procedure [dbo].[Usp_Enroll_Test]
    await callprogrmtestcase(
      jsonData,
      ProgramId,
      Email,
      No_Attempts,
      No_TestCasesPassed,
      No_TestCasesFailed,
      StudentName,
      UserCode,
      TotalDuration
    );
    console.log("Testcases sucess");

    // Send success response
    res.status(200).send("TestCases updated successfully.");
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }  
});

async function callprogrmtestcase(
  jsonData,
  ProgramId,
  Email,
  No_Attempts,
  No_TestCasesPassed,
  No_TestCasesFailed,
  StudentName,
  UserCode,
  TotalDuration
) {
  try {
    console.log("method to Testscases sp");
    // Create a new table variable to hold the data

    // Connect to the SQL database
    let pool = await sql.connect(sqlConfig);
    console.log("sql process");
    const table = new sql.Table();
    table.columns.add("ProgramId", sql.UniqueIdentifier);
    table.columns.add("TestCaseId", sql.Int);
    table.columns.add("Output", sql.NVarChar(max));
    table.columns.add("Result", sql.NVarChar(max));

    const parsedData = JSON.parse(jsonData);
    console.log(jsonData);
    // Populate rows in the table type
    parsedData.forEach((row) => {
      table.rows.add(row.ProgramId, row.TestCaseId, row.Output, row.Result);
    });

    //console.log(TechnologyId, ModuleId, EnrollmentId);
    // Execute the stored procedure
    await pool
      .request()
      .input("StudentProgramTestCases", sql.TVP, table)
      .input("ProgramId", sql.UniqueIdentifier, ProgramId)
      .input("Email", sql.NVarChar, Email)
      .input("No_Attempts", sql.Int, No_Attempts)
      .input("No_TestCasesPassed", sql.Int, No_TestCasesPassed)
      .input("No_TestCasesFailed", sql.Int, No_TestCasesFailed)
      .input("StudentName", sql.NVarChar, StudentName)
      .input("UserCode", sql.NVarChar, UserCode)
      .input("TotalDuration", sql.Int, TotalDuration)

      .execute("[USP_StudentProgramFinalSubmission]");
  } catch (error) {
    console.log("error:" + error);
    throw error;
  }  
}

app.post("/apinit/RetriveTestsBystudentId", async (req, res) => {
  try {
    console.info("listofTests");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.body; // No need to stringify the request body
    console.info(requestData);

    const { studentid, createdAt } = requestData;

    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1

    const result = await sql.query`
            EXEC [dbo].[USP_RetriveTestsBystudentId]
            @studentid  = ${studentid},
            @createdAt=${createdAt}
            
           `;

    console.log("List_Ttests", result);

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
  }  
});

app.post("/apinit/RetriveProgramResults", async (req, res) => {
  try {
    console.info("listofPrograms");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.body; // No need to stringify the request body
    console.info(requestData);

    const { UserName, ProgramId } = requestData;

    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1

    const result = await sql.query`
                EXEC USP_Retrive_ProgramResults
                 @UserName=${UserName},
                 @ProgramId=${ProgramId}
    
               `;

    console.log("List_Programs", result);

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
  }  
});

app.get("/apinit/studentResultPageview", async (req, res) => {
  try {
    const { testId, studentName, transactionId } = req.query;
    console.info("landed result page");

    // Call the fetchDistinctStudentResults function with parameters
    // const resultData = await fetchDistinctStudentResults(studentName, testId, transactionId);

    // Render the studentResultPage template with the fetched results
    res.render("studentResultPageview");
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});
app.get("/apinit/fetchAndShowResults", async (req, res) => {
  try {
    const { testId, studentName, transactionId } = req.query;
    console.info("Fetching results for button click");

    // Call the fetchDistinctStudentResults function with parameters
    const resultData = await fetchDistinctStudentResults(
      studentName,
      testId,
      transactionId
    );

    // Return the result data as JSON
    res.json(resultData);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get("/apinit/FetchProgramsByTechnologies", async (req, res) => {
  try {
    console.info("List of  Programs");
    await sql.connect(sqlConfig);
    const requestData = req.query; // No need to stringify the request body
    console.info(requestData);

    const {
      TechnologyId: t_id,
      moduleId: m_id,
      TopicId: to_id,
      SubtopicId: s_id,
    } = requestData;

    const TechnologyId =
      Number.isNaN(Number(t_id)) === NaN ? null : Number(t_id);
    const moduleId = Number.isNaN(Number(m_id)) === NaN ? null : Number(m_id);
    const TopicId = Number.isNaN(Number(to_id)) === NaN ? null : Number(to_id);
    const SubtopicId = Number.isNaN(Number(s_id)) === NaN ? null : Number(s_id);

    console.log(TechnologyId, moduleId, TopicId, SubtopicId);
    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1

    const result = await sql.query`
              EXEC [dbo].[Usp_FetchProgramsByTechnologies]
              @TechnologyID = ${TechnologyId},
                 @ModuleID = ${moduleId},
                 @TopicId=${TopicId},
                 @SubtopicId=${SubtopicId}
              `;

    console.log("Listprogams", result);

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
      res.status(200).json(null);
    }
  } catch (err) {
    console.error("Error executing stored procedure:", err);
    res.status(500).json({
      success: false,
      message: "Error executing stored procedure",
      apperror: err,
    });
  }  
});



app.post("/apinit/executeonline", async (req, res) => {
  const code = req.body.code;
  try {
    const output = await executeCodeOnline(code);
    res.json({ output });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/apinit/fetchProgramLanguages", async (req, res) => {
  try {
    console.info("List of Technolgies");
    await sql.connect(sqlConfig);

    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1

    const result = await sql.query`
            EXEC [dbo].[USP_ProgramLanguges]
        
          
            
           `;

    console.log("ListTechnologies", result);

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
  }  
});

app.get("/apinit/fetch_StudentNames_StudentReportData", async (req, res) => {
  try {
    console.info("List of StudentNames");
    await sql.connect(sqlConfig);

    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1

    const result = await sql.query`
            EXEC [dbo].[Usp_Get_StudentNames_StudentReportData]
        
          
            
           `;

    console.log("ListStudentnames", result);

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
  }  
});

app.get("/apinit/fetch_TechnologyName_StudentReportData", async (req, res) => {
  try {
    console.info("List of TechnologyNames");
    await sql.connect(sqlConfig);

    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1

    const result = await sql.query`
            EXEC [dbo].[Usp_Get_TechnologyName_StudentReportData]
        
          
            
           `;

    console.log("ListTechnology", result);

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
  }  
});

app.get("/apinit/fetch_TechnologyName_StudentReportData", async (req, res) => {
  try {
    console.info("List of TechnologyNames");
    await sql.connect(sqlConfig);

    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1

    const result = await sql.query`
            EXEC [dbo].[Usp_Get_TechnologyName_StudentReportData]
        
          
            
           `;

    console.log("ListTechnology", result);

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
  }  
});

app.get("/get_StudentReport/:username", async (req, res) => {
  try {
    console.info("List of StudentNames");
    await sql.connect(sqlConfig);
    const { username } = req.params;
    const { TopicName } = req.query;
    console.log(username, TopicName);
    if (!username) throw new Error("Invalid User");

    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1

    const result = await sql.query`
              EXEC Usp_Get_StudentReport
             @Username=${username},@TopicName=${TopicName?.replaceAll(
      "-",
      "#"
    )};`;

    console.log("ListStudentnames", result);

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
  }  
});

app.get("/studentReport_Technology", async (req, res) => {
  try {
    console.info("List of StudentNames");
    await sql.connect(sqlConfig);
    const {
      username,
      TestId,
      TechnologyName,
      ModuleName,
      TopicName,
      SubtopicName,
    } = req.query;
    console.log(
      username,
      TestId,
      TechnologyName,
      ModuleName,
      TopicName,
      SubtopicName
    );
    if (!username) throw new Error("Invalid User");

    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1

    const result = await sql.query`
            EXEC Usp_Get_StudentReport_Technology
           @Username=${username},
           @TestId=${TestId},
           @TechnologyName=${TechnologyName?.replaceAll("-", "#")},
           @ModuleName=${ModuleName?.replaceAll("-", "#")},
           @TopicName=${TopicName?.replaceAll("-", "#")},
           @SubtopicName=${SubtopicName?.replaceAll("-", "#")}



           `;

    console.log("ListStudentnames", result);

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
  }  
});

app.get("/get_StudentReport_module", async (req, res) => {
  try {
    console.info("List of_StudentReport_module");
    await sql.connect(sqlConfig);
    const {
      username,
      TestId,
      TechnologyName,
      ModuleName,
      TopicName,
      SubtopicName,
    } = req.query;
    console.log(
      username,
      TestId,
      TechnologyName,
      ModuleName,
      TopicName,
      SubtopicName
    );
    if (!username) throw new Error("Invalid User");

    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1

    const result = await sql.query`
            EXEC Usp_Get_StudentReport_module
           @Username=${username},
           @TestId=${TestId},
           @TechnologyName=${TechnologyName?.replaceAll("-", "#")},
          @ModuleName=${ModuleName?.replaceAll("-", "#")},
          @TopicName=${TopicName?.replaceAll("-", "#")},
          @SubtopicName=${SubtopicName?.replaceAll("-", "#")}

           `;

    console.log("ListStudentnames", result);

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
  }  
});

app.get("/get_StudentReport_Topic", async (req, res) => {
  try {
    console.info("List of StudentNames12");
    await sql.connect(sqlConfig);
    const {
      username,
      TestId,
      TechnologyName,
      ModuleName,
      topicname,
      SubTopicName,
    } = req.query;
    console.log(
      username,
      TestId,
      TechnologyName,
      ModuleName,
      topicname,
      SubTopicName
    );
    if (!username) throw new Error("Invalid User");

    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1

    const result = await sql.query`
            EXEC Usp_Get_StudentReport_Topic
           @Username=${username},
           @TestId=${TestId},
           @TechnologyName=${TechnologyName?.replaceAll("-", "#")},
           @ModuleName=${ModuleName?.replaceAll("-", "#")},
           @TopicName=${topicname?.replaceAll("-", "#")},
           @SubTopicName=${SubTopicName?.replaceAll("-", "#")}



           `;

    console.log("ListStudentnames", result);

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
  }  
});

app.post("/apinit/InsertUpdateDelete_ProgramsQuestions", async (req, res) => {
  try {
    console.info("Method Insert Questions");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.body; // No need to stringify the request body

    const {
      ProgramId,
      ProgramName,
      ProgramDescription,
      Constraints,
      SampleInput,
      SampleOutput,
      Explanation,
      Languages,
      DefaultProgram,
      Image,
      TopicId,
      SubtopicId,

      DifficultyLevelId,
      TechnologyId,
      ModuleId,
    } = requestData;

    const result = await sql.query`
            EXEC  [dbo].[Usp_InsertUpdateDelete_ProgramQuestions]
            @ProgramId            = ${ProgramId},
            @ProgramName          = ${ProgramName},
            @ProgramDescription   = ${ProgramDescription},      
            @Constraints          = ${Constraints},
            @SampleInput          = ${SampleInput},
            @SampleOutput         = ${SampleOutput},
            @Explanation          = ${Explanation},
            @Languages            = ${Languages},
            @DefaultProgram       = ${DefaultProgram},
            @Image                = ${Image},
            @TopicId              = ${TopicId},
            @SubtopicId           = ${SubtopicId},
            
            @DifficultyLevelId    =${DifficultyLevelId},
            @TechnologyId         =${TechnologyId},
            @ModuleId             =${ModuleId}
            
             `;

    console.log("ProgramQuestions", result);

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
      res.status(200).json(null);
    }
  } catch (err) {
    console.error("Error executing stored procedure:", err);
    res.status(500).json(err);
  }  
});

app.get("/apinit/FetchTestcasesByProgramID", async (req, res) => {
  try {
    console.info("List of  Testcases");
    await sql.connect(sqlConfig);
    console.log(req.query);
    const requestData = req.query; // No need to stringify the request body
    console.info(requestData);

    const { TechnologyId, ModuleId, TopicId, SubtopicId, ProgramId } =
      requestData;
    //console.log(ProgramId);
    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1

    const result = await sql.query`
                EXEC [dbo].[Usp_FetchTestcasesByProgramID]
                @TechnologyId=${TechnologyId},
                @ModuleId=${ModuleId},
                @TopicId=${TopicId},
                @SubtopicId=${SubtopicId},


                @programId=${ProgramId}
                `;

    //console.log("Listprogams", result);

    // Check if the recordset is not empty or undefined
    if (result.recordset !== undefined && result.recordset.length > 0) {
      const recordsetData = result.recordset;

      // Log the recordset or return it in the response
      //console.log("Stored procedure executed successfully:", recordsetData);

      res.status(200).json(recordsetData);
    } else {
      // Handle the case where the recordset is empty or undefined
      console.log(
        "Stored procedure executed successfully, but no records returned."
      );
      res.status(200).json(null);
    }
  } catch (err) {
    console.error("Error executing stored procedure:", err);
    res.status(500).json({
      success: false,
      message: "Error executing stored procedure",
      apperror: err,
    });
  }  
});

app.post("/apinit/InsertUpdate_ProgramTestCases", async (req, res) => {
  try {
    console.info("listofProgramTestcases");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.body; // No need to stringify the request body
    console.info(requestData);

    const { TestCaseName, SampleInputValue, SampleOutputValue, ProgramId } =
      requestData;

    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1

    const result = await sql.query`
                EXEC [dbo].[USP_InsertUpdate_Testcases]
                 @TestCaseName=${TestCaseName},
                 @SampleInputValue=${SampleInputValue},
                 @SampleOutputValue=${SampleOutputValue},
                 @ProgramId =${ProgramId}

    
               `;

    console.log("List_ProgramsTestcases", result);

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
  }  
});

app.delete(
  "/apinit/DeleteProgramquestionsBy_ProgramId/:programId",
  async (req, res) => {
    try {
      console.info("Delete Program by ID");

      await sql.connect(sqlConfig);

      const { programId } = req.params; // Correctly extracting the programId parameter
      console.info({ programId });

      const result = await sql.query`
        EXEC [dbo].[USP_Delete_ProgramQuestions]
        @ProgramId = ${programId}
      `;

      console.log("List_programquestions", result);

      // Log the recordset or return it in the response
      if (result.recordset !== undefined && result.recordset.length > 0) {
        const recordsetData = result.recordset;

        // Log the recordset or return it in the response
        console.log("Stored procedure executed successfully:", recordsetData);

        res.status(204).json(recordsetData);
      } else {
        // Handle the case where the recordset is empty or undefined
        console.log(
          "Stored procedure executed successfully, but no records returned."
        );
        res.status(204).json({
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
    } 
  }
);

app.delete("/apinit/Delete_ProgramTestCases", async (req, res) => {
  try {
    console.info("listofdeleteProgramTestcases");
    await sql.connect(sqlConfig);
    console.log(req.body);
    const requestData = req.body; // No need to stringify the request body
    console.info(requestData);

    const { TestcaseId } = requestData;

    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1

    const result = await sql.query`
                EXEC Usp_DeletProgramTestcases
              
                 @TestcaseId =${TestcaseId}

    
               `;

    console.log("List_deleteProgramsTestcases", result);

    // Check if the recordset is not empty or undefined
    if (result.recordset !== undefined && result.recordset.length > 0) {
      const recordsetData = result.recordset;

      // Log the recordset or return it in the response
      console.log("Stored procedure executed successfully:", recordsetData);

      res.status(204).json(recordsetData);
    } else {
      // Handle the case where the recordset is empty or undefined
      console.log(
        "Stored procedure executed successfully, but no records returned."
      );
      res.status(204).json({
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
  }  
});

const testCasesData = [
  { input: "3", expectedOutput: "6" },
  { input: "5", expectedOutput: "10" },
  { input: "10", expectedOutput: "20" },
];
app.get("/apinit/onlineCodeEditor", (req, res) => {
  // Replace testCasesData with your actual test cases data
  res.render("VirtualLab", { testCases: testCasesData });
});
app.get("/apinit/CodeEditor", (req, res) => {
  console.log("page request reached");
  // Replace testCasesData with your actual test cases data
  res.render("CodeEditor");
});
app.post("/apinit/executeCodeOnline", async (req, res) => {
  const code = req.body.code;
  try {
    const output = await executeCodeOnline(code);
    res.render("result", { output });
  } catch (error) {
    res.status(500).send("Error executing code: " + error.message);
  }
});

async function getAccessToken() {
  const context = new adalNode.AuthenticationContext(
    `https://login.microsoftonline.com/${tenantId}`
  );
  const tokenResponse = await context.acquireTokenWithClientCredentials(
    resourceId,
    clientId,
    clientSecret
  );
  return tokenResponse.accessToken;
}

// Function to generate embed token for Power BI report
async function generateEmbedToken(accessToken, reportId, datasetId) {
  const apiUrl = `https://api.powerbi.com/v1.0/myorg/reports/${reportId}/GenerateToken`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
  const body = {
    datasetId,
    allowSaveAs: false,
    allowExport: true,
  };

  try {
    const response = await axios.post(apiUrl, body, { headers });
    return response.data.token.token;
  } catch (error) {
    console.error("Error generating embed token:", error.message);
    throw error;
  }
}

// app.get("/getcurriculamdetails", async (req, res) => {
//   const { curriculamId } = req.body; // Assuming curriculamId is passed as a body parameter

//   // Validate required fields
//   if (!curriculamId) {
//     return res
//       .status(400)
//       .json({ error: "Missing required field: curriculamId" });
//   }

//   console.log(curriculamId === "D3E98481-F9E6-445D-A15E-F955825D960D");

//   try {
//     // Create a connection pool and connect to the database
//     const pool = await sql.connect(sqlConfig);

//     // Execute the stored procedure using a parameterized query
//     const result = await pool
//       .request()
//       .input("curriculamId", sql.UniqueIdentifier, curriculamId) // Pass the curriculamId as a parameter
//       .execute("Usp_Get_CurriculamDetails"); // Execute the stored procedure

//     res.status(200).json({ data: result.recordset });
//   } catch (err) {
//     console.error("SQL error", err);
//     res.status(500).json({ error: "Internal server error" });
//   } finally {
//     // Close the connection pool after the request is done
//      ;
//   }
// });

app.get("/apinit/fetchbatchesByTechnologyId", async (req, res) => {
  try {
    console.info("List of  Batches");
    await sql.connect(sqlConfig);
    console.log(req.query);
    const requestData = req.query; // No need to stringify the request body
    console.info(requestData);

    const { TechnologyId } = requestData;
    //console.log(ProgramId);
    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1

    const result = await sql.query`
                EXEC Usp_GetBatches
                @TechnologyId=${TechnologyId}

                `;

    // Check if the recordset is not empty or undefined
    if (result.recordset !== undefined && result.recordset.length > 0) {
      const recordsetData = result.recordset;

      // Log the recordset or return it in the response
      //console.log("Stored procedure executed successfully:", recordsetData);

      res.status(200).json(recordsetData);
    } else {
      // Handle the case where the recordset is empty or undefined
      console.log(
        "Stored procedure executed successfully, but no records returned."
      );
      res.status(200).json(null);
    }
  } catch (err) {
    console.error("Error executing stored procedure:", err);
    res.status(500).json({
      success: false,
      message: "Error executing stored procedure",
      apperror: err,
    });
  }  
});

app.get("/apinit/fetchModulesByTechnologyId", async (req, res) => {
  try {
    console.info("List of  Modules");
    await sql.connect(sqlConfig);
    console.log(req.query);
    const requestData = req.query; // No need to stringify the request body
    console.info(requestData);

    const { TechnologyId } = requestData;
    //console.log(ProgramId);
    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1

    const result = await sql.query`
                EXEC Usp_FetchModules
                @TechnologyId=${TechnologyId}

                `;

    // Check if the recordset is not empty or undefined
    if (result.recordset !== undefined && result.recordset.length > 0) {
      const recordsetData = result.recordset;

      // Log the recordset or return it in the response
      //console.log("Stored procedure executed successfully:", recordsetData);

      res.status(200).json(recordsetData);
    } else {
      // Handle the case where the recordset is empty or undefined
      console.log(
        "Stored procedure executed successfully, but no records returned."
      );
      res.status(200).json(null);
    }
  } catch (err) {
    console.error("Error executing stored procedure:", err);
    res.status(500).json({
      success: false,
      message: "Error executing stored procedure",
      apperror: err,
    });
  }  
});

app.get("/apinit/fetchTopicsByModuleId", async (req, res) => {
  try {
    console.info("List of Topics");
    await sql.connect(sqlConfig);
    console.log(req.query);
    const requestData = req.query; // No need to stringify the request body
    console.info(requestData);

    const { ModuleId } = requestData;

    const result = await sql.query`
                EXEC Usp_FetchTopicsByModuleId
                @ModuleId=${ModuleId}

                `;

    // Check if the recordset is not empty or undefined
    if (result.recordset !== undefined && result.recordset.length > 0) {
      const recordsetData = result.recordset;

      // Log the recordset or return it in the response
      //console.log("Stored procedure executed successfully:", recordsetData);

      res.status(200).json(recordsetData);
    } else {
      // Handle the case where the recordset is empty or undefined
      console.log(
        "Stored procedure executed successfully, but no records returned."
      );
      res.status(200).json(null);
    }
  } catch (err) {
    console.error("Error executing stored procedure:", err);
    res.status(500).json({
      success: false,
      message: "Error executing stored procedure",
      apperror: err,
    });
  }  
});

app.get("/api/fetchstudentsByBatchId", async (req, res) => {
  try {
    console.info("List of Topics");
    await sql.connect(sqlConfig);
    console.log(req.Query);

    const requestData = req.query;
    console.info(requestData);

    const { batchId } = requestData;

    const result =
      await sql.query`EXEC Usp_FetchStudentsByBatchId @batchId=${batchId}`;

    if (result.recordset !== undefined && result.recordset.length > 0) {
      const recordsetData = result.recordset;
      res.status(200).json(recordsetData);
    } else {
      console.log(
        "Stored procedure executed successfully, but no records returned."
      );
      res.status(200).json(null);
    }
  } catch (err) {
    console.log("Error executing stored procedure:", err);
    res.status(500).json({
      success: false,
      message: "Error Ececuting Stored Procedure",
      apperror: err,
    });
  }  
});

app.post("/api/submitAssessmentDetails", async (req, res) => {
  try {
    console.info("listofProgramTestcases");
    await sql.connect(sqlConfig); // Direct connection without pool
    console.log(req.body);

    const {
      AdminId,
      ManualReferenceId,
      MentorId,
      BatchId,
      DateOfAssessment,
      TypeOfAssessment,
      ModuleId, // ModuleId is now outside the students array
      students,
      TestName,
      TestId,
    } = req.body;

    // Loop over students and their topics
    for (let student of students) {
      const { StudentId, topics } = student;

      for (let topic of topics) {
        const { TopicId, MaximumMarks, ObtainMarks } = topic;

        // Execute stored procedure for each student and topic within the given ModuleId
        const result = await sql.query`
          EXEC SubmitAssessmentDetails
            @AdminId = ${AdminId},
            @ManualReferenceId = ${ManualReferenceId},
            @MentorId = ${MentorId},
            @BatchId = ${BatchId},
            @DateOfAssessment = ${DateOfAssessment},
            @TypeOfAssessment = ${TypeOfAssessment},
            @ModuleId = ${ModuleId},  -- Single ModuleId for all students
            @TopicId = ${TopicId},
            @MaximumMarks = ${MaximumMarks},
            @StudentId = ${StudentId},
            @ObtainMarks = ${ObtainMarks},
            @TestName=${TestName},
            @TestId=${TestId}
        `;

        console.log(
          `Stored procedure executed for StudentId: ${StudentId}, ModuleId: ${ModuleId}, TopicId: ${TopicId}`
        );
      }
    }

    // Sending response after all data is processed
    res.status(200).json({
      success: true,
      message:
        "Stored procedure executed successfully for all students and topics.",
    });
  } catch (err) {
    console.error("Error executing stored procedure:", err);
    res.status(500).json({
      success: false,
      message: "Error executing stored procedure",
      error: err.message,
    });
  } 
});

app.get("/api/fetchBatchIdByFacultyId", async (req, res) => {
  let pool;
  try {
    console.log("fetching batches");

    // Establish the connection pool
    pool = await sql.connect(sqlConfig);
    const requestData = req.query;
    const { facultyId } = requestData;

    // Execute the stored procedure
    const result = await pool
      .request()
      .input("facultyId", sql.Int, facultyId) // Use .input() for parameters
      .execute("dbo.Usp_FetchBatchIdByFacultyId");

    if (result.recordset && result.recordset.length > 0) {
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
  } 
});

// app.get("/api/fetchBatchIdByFacultyId", async (req, res) => {
//   try {
//     console.log("fetching batches");
//     await sql.connect(sqlConfig);

//     const requestData = req.query;
//     const { facultyId } = requestData;

//     const result =
//       await sql.query`EXEC [dbo].[Usp_FetchBatchIdByFacultyId]  @facultyId=${facultyId}`;

//     if (result.recordset !== undefined && result.recordset.length > 0) {
//       const recordsetData = result.recordset;

//       // Log the recordset or return it in the response
//       console.log("Stored procedure executed successfully:", recordsetData);

//       res.status(200).json(recordsetData);
//     } else {
//       // Handle the case where the recordset is empty or undefined
//       console.log(
//         "Stored procedure executed successfully, but no records returned."
//       );
//       res.status(200).json({
//         success: true,
//         message:
//           "Stored procedure executed successfully, but no records returned.",
//         dbresult: null,
//       });
//     }
//   } catch (err) {
//     console.error("Error executing stored procedure:", err);
//     res.status(500).json({
//       success: false,
//       message: "Error executing stored procedure",
//       apperror: err,
//     });
//   } finally {
//      ;
//   }
// });

app.post("/api/insertUpdateStudentWeeklyCalender", async (req, res) => {
  try {
    console.info("Inserting calender");
    await sql.connect(sqlConfig);
    const requestData = req.body;

    console.info(requestData);

    const {
      testid,
      transactionId,
      testDescription,
      testStartDate,
      testEndDate,
      testStartTime,
      testEndTime,
      testEnabled,
      ExamType,
      examSubmitted,
      testCaseId,
      BatchId,
      status,
    } = req.body;
    console.log(req.body);

    const result =
      await sql.query`EXEC Usp_InsertUpdateStudentWeeklyCalender @testid=${testid},
        @transactionId=${transactionId},@testDescription=${testDescription},@testStartDate=${testStartDate},
        @testEndDate=${testEndDate},@testStartTime=${testStartTime},@testEndTime=${testEndTime},@testEnabled=${testEnabled},@ExamType=${ExamType},
        @examSubmitted=${examSubmitted},@testCaseId=${testCaseId},@BatchId=${BatchId},@status=${status}`;
    if (result.recordset !== undefined && result.recordset.length > 0) {
      const recordsetData = result.recordset;
      res.status(200).json(result.recordset);
    } else {
      console.log("Stored procedure executed successfully, Inserting data");
      res.status(200).json({ message: "Data Submitted Successfully" });
    }
  } catch (err) {
    console.log("Error executing stored procedure:", err);
    res.status(500).json({
      success: false,
      message: "Error Ececuting Stored Procedure",
      apperror: err,
    });
  }  
});

app.put("/api/UpdateStudentWeeklyCalender", async (req, res) => {
  try {
    console.info("Update status");
    await sql.connect(sqlConfig);
    const requestData = req.body;

    console.info(requestData);

    const {
      CurriculumId,

      status,
    } = req.body;
    console.log(req.body);

    const result = await sql.query`EXEC  [dbo].[Usp_UpdateStudentWeeklyCalender]
        @CurriculumId=${CurriculumId}
        
      ,@status=${status}`;
    if (result.recordset !== undefined && result.recordset.length > 0) {
      const recordsetData = result.recordset;
      res.status(200).json(result.recordset);
    } else {
      console.log("Stored procedure executed successfully, Inserting data");
      res.status(200).json({ message: "Status Updated Successfully" });
    }
  } catch (err) {
    console.log("Error executing stored procedure:", err);
    res.status(500).json({
      success: false,
      message: "Error Ececuting Stored Procedure",
      apperror: err,
    });
  }  
});

app.get("/api/retrieveAvailableSlots", async (req, res) => {
  try {
    console.log("Fetching available slots");

    // Connect to SQL server
    await sql.connect(sqlConfig);

    // Execute the SQL query to retrieve data from studentSlots
    const result = await sql.query`  SELECT * FROM studentSlots`;

    // Check if data is available in the recordset and send a response
    if (result.recordset && result.recordset.length > 0) {
      res.status(200).json(result.recordset); // Send data if available
    } else {
      console.log("No data found in studentSlots");
      res.status(200).json([]); // Send an empty array if no records found
    }
  } catch (err) {
    console.error("Error executing SQL query:", err);
    res.status(500).json({
      success: false,
      message: "Error executing SQL query",
      apperror: err,
    });
  }  
});

app.get("/api/retrieStudentCalenderforAdminApproval", async (req, res) => {
  try {
    console.log("Fetching available slots");

    // Connect to SQL server
    await sql.connect(sqlConfig);

    // Execute the SQL query to retrieve data from studentSlots
    const result = await sql.query`

      select distinct 
  a.CurriculumId,  
  fc.courseCurriculam_Name,
  Min(a.teststartdate) as teststartdate,
  Max(a.testenddate) as testenddate,
  a.teststarttime,
  a.testendtime,
  a.batchid,
  f.facaulty_name, -- Will be NULL if no matching faculty exists
  b.batchname,
  a.status 
from 
  assessment_v1 a
inner join 
  facultyCourse_curriculum fc
on 
  a.CurriculumId = fc.curriculam_Id
left join -- Ensures inclusion of records even if no faculty is associated
  Facaulty f
on 
  fc.facultyId = f.Facaulty_Id
inner join 
  BatchDetailes b
on 
  a.BatchId = b.BatchId
where 
  a.status in ('Approved', 'pending', 'Reject', 'Revert')
group by  
  fc.courseCurriculam_Name,
  a.teststarttime,
  a.testendtime,
  a.batchid,
  f.facaulty_name,
  b.batchname,
  a.status,
  a.CurriculumId;
`;

      console.log("result data:",result);
    // Check if data is available in the recordset and send a response
    if (result.recordset && result.recordset.length > 0) {
      res.status(200).json(result.recordset); // Send data if available
    } else {
      console.log("No data found in studentSlots");
      res.status(200).json([]); // Send an empty array if no records found
    }
  } catch (err) {
    console.error("Error executing SQL query:", err);
    res.status(500).json({
      success: false,
      message: "Error executing SQL query",
      apperror: err,
    });
  }  
});

app.get("/api/retriveStudentCalenderByStudentId", async (req, res) => {
  try {
    console.log("student weekly calender");
    await sql.connect(sqlConfig);

    const requestData = req.query;

    const { studentId } = requestData;
    const result =
      await sql.query`EXEC Usp_RetriveStudentCalenderByStudentId @studentId=${studentId}`;

    if (result.recordset !== undefined && result.recordset.length > 0) {
      const recordsetData = result.recordset;
      res.status(200).json(recordsetData);
    } else {
      console.log("Stored procedure executed successfully, Inserting data");
      res.status(200).json(null);
    }
  } catch (err) {
    console.log("Error executing stored procedure:", err);
    res.status(500).json({
      success: false,
      message: "Error Ececuting Stored Procedure",
      apperror: err,
    });
  }  
});

app.put("/apinit/updateMock_TestStatus", async (req, res) => {
  try {
    console.info("Update status");
    await sql.connect(sqlConfig);

    const requestData = req.body;

    const { testId } = requestData;

    const result =
      await sql.query`EXEC Usp_UpdateMock_TestStatus @testId=${testId} `;
    if (result.recordset && result.recordset.length > 0) {
      res.status(200).json(result.recordset); // Send data if available
    } else {
      console.log("No data found in studentSlots");
      res.status(200).json([]); // Send an empty array if no records found
    }
  } catch (err) {
    console.error("Error executing SQL query:", err);
    res.status(500).json({
      success: false,
      message: "Error executing SQL query",
      apperror: err,
    });
  }  
});

app.get("/apinit/fetchTechnologies", async (req, res) => {
  try {
    console.info("List of Technolgies");
    await sql.connect(sqlConfig);

    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1

    const result = await sql.query`
            EXEC USP_Get_Technologies
        
          
            
           `;

    console.log("ListTechnologies", result);

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
  }  
});

app.get("/api/fetchTopicsByFacultyId", async (req, res) => {
  try {
    console.log("Fetching topics");

    await sql.connect(sqlConfig);

    const { facultyId } = req.query;

    // Validate that facultyId is provided
    if (!facultyId) {
      return res
        .status(400)
        .json({ success: false, message: "facultyId is required" });
    }

    // Execute the stored procedure and get results
    const result =
      await sql.query`EXEC Usp_FetchTopicsByFacultyId @facultyId=${facultyId}`;

    // Check if there are any records and respond accordingly
    if (result.recordset && result.recordset.length > 0) {
      res.status(200).json(result.recordset); // Send data if available
    } else {
      console.log("No data found in topics");
      res.status(200).json(null); // Send null if no records found
    }
  } catch (err) {
    console.error("Error executing SQL query:", err);
    res.status(500).json({
      success: false,
      message: "Error executing SQL query",
      apperror: err,
    });
  }  
});

app.get("/api/FetchSubtopicsByTopicId", async (req, res) => {
  try {
    console.log("Fetching subtopics");

    await sql.connect(sqlConfig);

    const { topicId } = req.query;

    // Validate that facultyId is provided
    if (!topicId) {
      return res
        .status(400)
        .json({ success: false, message: "topic is required" });
    }

    // Execute the stored procedure and get results
    const result =
      await sql.query`EXEC Usp_FetchSubtopicsByTopicId @topicId=${topicId}`;

    // Check if there are any records and respond accordingly
    if (result.recordset && result.recordset.length > 0) {
      res.status(200).json(result.recordset); // Send data if available
    } else {
      console.log("No data found in subtopics");
      res.status(200).json(null); // Send null if no records found
    }
  } catch (err) {
    console.error("Error executing SQL query:", err);
    res.status(500).json({
      success: false,
      message: "Error executing SQL query",
      apperror: err,
    });
  }  
});

app.get("/api/getModulesByFacultyId", async (req, res) => {
  try {
    console.log("Fetching modules");

    await sql.connect(sqlConfig);

    const { facultyId } = req.query;

    // Validate that facultyId is provided
    if (!topicId) {
      return res
        .status(400)
        .json({ success: false, message: "topic is required" });
    }

    // Execute the stored procedure and get results
    const result =
      await sql.query`EXEC [dbo].[GetModulesbyFaculty] @facultyId=${facultyId}`;

    // Check if there are any records and respond accordingly
    if (result.recordset && result.recordset.length > 0) {
      res.status(200).json(result.recordset); // Send data if available
    } else {
      console.log("No data found in modules");
      res.status(200).json(null); // Send null if no records found
    }
  } catch (err) {
    console.error("Error executing SQL query:", err);
    res.status(500).json({
      success: false,
      message: "Error executing SQL query",
      apperror: err,
    });
  }  
});

app.get("/api/retriveRegisteredUser", async (req, res) => {
  try {
    console.log("Fetching users");

    await sql.connect(sqlConfig);

    const { type } = req.query;

    // Validate that facultyId is provided
    if (!type) {
      return res
        .status(400)
        .json({ success: false, message: "user is required" });
    }

    // Execute the stored procedure and get results
    const result =
      await sql.query`EXEC Usp_RetriveRegisteredUsers @type=${type}`;

    // Check if there are any records and respond accordingly
    if (result.recordset && result.recordset.length > 0) {
      res.status(200).json(result.recordset); // Send data if available
    } else {
      console.log("No data found in modules");
      res.status(200).json(null); // Send null if no records found
    }
  } catch (err) {
    console.error("Error executing SQL query:", err);
    res.status(500).json({
      success: false,
      message: "Error executing SQL query",
      apperror: err,
    });
  }  
});

app.get("/api/validateUserExist", async (req, res) => {
  try {
    await sql.connect(sqlConfig);

    const { type, email } = req.query;
    if (
      type === "" ||
      type === null ||
      type === undefined ||
      email === "" ||
      email === null ||
      email === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "user type and email are required",
      });
    } else {
      console.log(type, email);
      const result =
        await sql.query`exec ValidateUserExist @type=${type},@email=${email}`;
      console.log("result:",result);
      if (result.recordset[0].existuser === 1) {
        return res.status(200).json({
          success: true,
          message: "user exist already",
          result: result,
        });
      }
      return res.status(200).json({
        success: true,
        message: "no user exist",
        result: result,
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error Executing SQL query",
      error: error,
    });
  }  
});

app.get(
  "/apinit/retriveBasicDetailsofinterviewerAndMentor",
  async (req, res) => {
    try {
      console.info("Selecting user data");

      // Ensure the SQL connection is made before executing the query
      await sql.connect(sqlConfig);

      // Retrieve query parameters
      const requestData = req.query;
      const { userId, type } = requestData;

      // Validate the parameters (userId and type)
      if (!userId || !type) {
        return res.status(400).json({
          success: false,
          message: "userId and type are required.",
        });
      }

      // Execute the stored procedure with provided parameters
      const result =
        await sql.query`EXEC Usp_GetBasicDetailsOfMentor_Interviewer @userId=${userId}, @type=${type}`;

      // Check if the query returned any records
      if (result.recordset && result.recordset.length > 0) {
        // Return data if available
        res.status(200).json({
          success: true,
          message: "Data retrieved successfully",
          data: result.recordset,
        });
      } else {
        // No records found, return empty response
        res.status(200).json({
          success: true,
          message: "No data found for the given userId and type",
          data: [], // Returning an empty array to signify no records
        });
      }
    } catch (err) {
      // Log the error and send a response
      console.error("Error executing SQL query:", err);
      res.status(500).json({
        success: false,
        message: "Error executing SQL query",
        error: err.message, // Return the error message for debugging purposes
      });
    } 
  }
);

app.put("/apinit/UpdateAndDeleteUserAssignBatches", async (req, res) => {
  try {
    console.info("Update user Batch");
    await sql.connect(sqlConfig);

    const requestData = req.body;

    const { mappingId, userId, batchId, technologyId, type, action } =
      requestData;

    // Execute the stored procedure and capture the message returned
    const result = await sql.query`EXEC Usp_UpdateandDeleteUserAssignBatches 
      @mappingId=${mappingId}, @userId=${userId}, @batchId=${batchId}, @technologyId=${technologyId}, @type=${type}, @action=${action}`;

    // Check if the result contains a message
    if (result.recordset && result.recordset.length > 0) {
      const message = result.recordset[0].Message; // Assuming the stored procedure returns a 'Message' column

      console.log("Stored procedure executed successfully:", message);

      // Send the response with the success message
      res.status(200).json({
        success: true,
        message: message || "User Batch updated successfully.",
        dbresult: result.recordset, // Include any other data you want to return
      });
    } else {
      // Handle case where no records were affected or returned
      console.log(
        "Stored procedure executed successfully, but no records returned."
      );
      res.status(200).json({
        success: true,
        message:
          "Stored procedure executed successfully, but no records were affected.",
        dbresult: null,
      });
    }
  } catch (err) {
    // Log the error and send an error response
    console.error("Error executing stored procedure:", err);
    res.status(500).json({
      success: false,
      message: "Error executing stored procedure",
      apperror: err.message,
    });
  }  
});

//  Assign Batch

app.put("/apinit/upadteAndDeleteUserRegistration", async (req, res) => {
  try {
    console.info("Update Users successfully");
    await sql.connect(sqlConfig);

    const requestData = req.body;

    const {
      Name,
      Email,
      phonenumber,
      CurrentCompany,
      experience,
      mode,
      TechnologyId,
      userId,
      type,
      action,
    } = requestData;

    const result =
      await sql.query` EXEC Usp_UpadteAndDeleteUserRegistration @Name=${Name}, @Email=${Email},@phonenumber=${phonenumber}, @CurrentCompany=${CurrentCompany},
    @experience=${experience},@mode=${mode},@TechnologyId=${TechnologyId},@userId=${userId},@type=${type},@action=${action}`;

    console.log("Request Data:", requestData);

    // Check if any records were returned in recordset
    if (result.recordset && result.recordset.length > 0) {
      res.status(200).json({
        success: true,
        message: "User data updated successfully.",
        data: result.recordset,
      });
    } else if (result.rowsAffected && result.rowsAffected[0] > 0) {
      // If rowsAffected indicates that data was updated
      res.status(200).json({
        success: true,
        message: "User data updated successfully.",
      });
    } else {
      // If no changes were made (i.e., no rows affected)
      console.log("No rows affected. No changes were made.");
      res.status(200).json({
        success: false,
        message: "No changes were made. Please check the data provided.",
      });
    }
  } catch (err) {
    // Catch and log the error
    console.error("Error executing stored procedure:", err);

    // Send error response
    res.status(500).json({
      success: false,
      message: "An error occurred while updating User data.",
      error: err.message, // Provide more specific error information
    });
  } 
});

app.put("/apinit/verifyPassword", async (req, res) => {
  try {
    console.info("verify userpassword");
    await sql.connect(sqlConfig);

    const requestData = req.body;
    const { defaultPassword, newPassword, userId, type } = requestData;

    const result =
      await sql.query`EXEC Usp_VerifyPassword @defaultPassword=${defaultPassword},@newPassword=${newPassword},@userId=${userId},@type=${type}`;

    if (result.recordset !== undefined && result.recordset.length > 0) {
      const recordsetData = result.recordset;
      res.status(200).json({
        success: true,
        message: true,
        data: recordsetData,
      });
    } else if (result.rowsAffected && result.rowsAffected[0] > 0) {
      // If rowsAffected indicates success
      res.status(200).json({
        success: true,
        message: true,
      });
    } else {
      // No data updated or returned
      console.log("No rows affected. Possibly no data updated.");
      res.status(200).json({
        success: false,
        message: "No changes were made.",
      });
    }
  } catch (err) {
    console.log("Error executing stored procedure:", err);
    res.status(500).json({
      success: false,
      message: "Error executing stored procedure",
      apperror: err,
    });
  }  
});

app.get("/api/fetFacultyInterviewerAdminMentor", async (req, res) => {
  try {
    console.info("List of Topics");
    await sql.connect(sqlConfig);
    console.log(req.Query);

    const requestData = req.query;
    console.info(requestData);

    const { type } = requestData;

    const result =
      await sql.query`EXEC Usp_Faculty_Interviewer_Mentor_Admin @type=${type}`;

    if (result.recordset !== undefined && result.recordset.length > 0) {
      const recordsetData = result.recordset;
      res.status(200).json(recordsetData);
    } else {
      console.log(
        "Stored procedure executed successfully, but no records returned."
      );
      res.status(200).json(null);
    }
  } catch (err) {
    console.log("Error executing stored procedure:", err);
    res.status(500).json({
      success: false,
      message: "Error Ececuting Stored Procedure",
      apperror: err,
    });
  }  
});

app.get("/api/fetchTechnologiesFacultyMentorInterviewer", async (req, res) => {
  try {
    console.info(
      "Fetching technologies for Faculty, Mentor, Interviewer, or Admin"
    );

    // Log the entire query to check what was received
    console.log("Received query parameters:", req.query);

    // Validate 'userEmail' and 'type' query parameters
    const { userId, type } = req.query;
    if (!userId || !type) {
      console.warn("Missing 'userEmail' or 'type' query parameter");
      return res.status(400).json({
        success: false,
        message: "Missing required 'userEmail' or 'type' query parameters",
      });
    }

    // Connect to the SQL database
    await sql.connect(sqlConfig);

    // Log the parameters to ensure they're correct
    console.log(
      `Executing stored procedure with userEmail: ${userId}, type: ${type}`
    );

    // Execute the stored procedure with the parameters
    const result =
      await sql.query`EXEC Usp_FetchTechnologiesFacultyMentorInterviewer @userId=${userId}, @type=${type}`;

    // Check if any records were returned
    if (result.recordset && result.recordset.length > 0) {
      res.status(200).json({
        success: true,
        data: result.recordset,
      });
    } else {
      console.info(
        "Stored procedure executed successfully, but no records returned."
      );
      res.status(200).json({
        success: true,
        message: "No records found",
        data: [],
      });
    }
  } catch (err) {
    console.error("Error executing stored procedure:", err.message);
    res.status(500).json({
      success: false,
      message: "Error executing stored procedure",
      error: err.message,
    });
  } 
});

app.get("/api/fetchBatchesByTechnologyid", async (req, res) => {
  try {
    console.info("List of favulty Interviewer");
    await sql.connect(sqlConfig);
    console.log(req.Query);

    const requestData = req.query;
    console.info(requestData);

    const { technologyId } = requestData;

    const result =
      await sql.query`EXEC Usp_fetchBatchesbyTechnologyId  @technologyId=${technologyId}`;

    if (result.recordset !== undefined && result.recordset.length > 0) {
      const recordsetData = result.recordset;
      res.status(200).json(recordsetData);
    } else {
      console.log(
        "Stored procedure executed successfully, but no records returned."
      );
      res.status(200).json(null);
    }
  } catch (err) {
    console.log("Error executing stored procedure:", err);
    res.status(500).json({
      success: false,
      message: "Error Ececuting Stored Procedure",
      apperror: err,
    });
  }  
});

app.post("/api/inserUpdateFacultyMentorBatchMapping", async (req, res) => {
  try {
    console.info("List of faculty Interviewer");
    await sql.connect(sqlConfig);

    const requestData = req.body;
    console.info(requestData);

    const { UserId, technologyId, BatchId, type } = requestData;

    const result =
      await sql.query`EXEC Usp_InsertUpdateFacultyMentorBatchMaping  @UserId=${UserId},@technologyId=${technologyId}, @BatchId=${BatchId}, @type=${type}`;

    // Check the result for recordset or rows affected
    if (result.recordset !== undefined && result.recordset.length > 0) {
      const recordsetData = result.recordset;
      res.status(200).json({
        success: true,
        message: "Batch assign successful.",
        data: recordsetData,
      });
    } else if (result.rowsAffected && result.rowsAffected[0] > 0) {
      // If rowsAffected indicates success
      res.status(200).json({
        success: true,
        message: "Batch assign successfully.",
      });
    } else {
      // No data updated or returned
      console.log("No rows affected. Possibly no data updated.");
      res.status(200).json({
        success: false,
        message: "No changes were made.",
      });
    }
  } catch (err) {
    console.log("Error executing stored procedure:", err);
    res.status(500).json({
      success: false,
      message: "Error executing stored procedure",
      apperror: err,
    });
  }  
});

app.get("/apinit/fetchModulesByMentorId", async (req, res) => {
  try {
    console.info("List of  Modules");
    await sql.connect(sqlConfig);
    console.log(req.query);
    const requestData = req.query; // No need to stringify the request body
    console.info(requestData);

    const { mentorId } = requestData;
    //console.log(ProgramId);
    //// Ensure TechnologyID and Query are parsed as integers
    //const parsedQuery = 1

    const result = await sql.query`
                EXEC Usp_GetModulesByMentorId 
                @mentorId=${mentorId}

                `;

    // Check if the recordset is not empty or undefined
    if (result.recordset !== undefined && result.recordset.length > 0) {
      const recordsetData = result.recordset;

      // Log the recordset or return it in the response
      //console.log("Stored procedure executed successfully:", recordsetData);

      res.status(200).json(recordsetData);
    } else {
      // Handle the case where the recordset is empty or undefined
      console.log(
        "Stored procedure executed successfully, but no records returned."
      );
      res.status(200).json(null);
    }
  } catch (err) {
    console.error("Error executing stored procedure:", err);
    res.status(500).json({
      success: false,
      message: "Error executing stored procedure",
      apperror: err,
    });
  }  
});

app.post("/apinit/insertCurriculumForStudentCalender", async (req, res) => {
  try {
    console.info("Insert curriculums");
    await sql.connect(sqlConfig);
    const requestData = req.body;

    const { curriculumId } = requestData;

    const result =
      await sql.query`EXEC dbo.InsertCurriculumForStudentCalender  @curriculumId=${curriculumId}`;
    console.log(requestData);
    if (result.recordset !== undefined && result.recordset.length > 0) {
      const recordsetData = result.recordset;
      res.status(200).json({
        success: true,
        message: "Insertion Calender successful.",
        data: recordsetData,
      });
    } else if (result.rowsAffected && result.rowsAffected[0] > 0) {
      // If rowsAffected indicates success
      res.status(200).json({
        success: true,
        message: "Insertion Calender successfully.",
      });
    } else {
      // No data updated or returned
      console.log("No rows affected. Possibly no data updated.");
      res.status(200).json({
        success: false,
        message: "No changes were made.",
      });
    }
  } catch (err) {
    console.log("Error executing stored procedure:", err);
    res.status(500).json({
      success: false,
      message: "Error executing stored procedure",
      apperror: err,
    });
  }  
});

app.put("/apinit/updateStudentCalenderSlots", async (req, res) => {
  try {
    console.info("Updating student calendar slots...");

    // Ensure the body contains the correct data
    const requestData = req.body; // Use req.body, not req.data

    // Destructure the required fields from requestData
    const { testStartTime, testEndTime, status, batchId, curriculumId } =
      requestData;

    if (
      !testStartTime ||
      !testEndTime ||
      !status ||
      !batchId ||
      !curriculumId
    ) {
      // Check if any required fields are missing
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: testStartTime, testEndTime, status, or batchId.",
      });
    }

    // Execute the stored procedure
    await sql.connect(sqlConfig);

    const result = await sql.query`
      EXEC Usp_UpdateStudentCalenderSlots 
        @testStartTime=${testStartTime}, 
        @testEndTime=${testEndTime}, 
        @status=${status}, 
        @batchId=${batchId},
        @curriculumId=${curriculumId}`;

    console.log("Request Data:", requestData);

    // Check if any records were returned in recordset
    if (result.recordset && result.recordset.length > 0) {
      res.status(200).json({
        success: true,
        message: "Student calendar slots updated successfully.",
        data: result.recordset,
      });
    } else if (result.rowsAffected && result.rowsAffected[0] > 0) {
      // If rowsAffected indicates that data was updated
      res.status(200).json({
        success: true,
        message: "Student calendar slots updated successfully.",
      });
    } else {
      // If no changes were made (i.e., no rows affected)
      console.log("No rows affected. No changes were made.");
      res.status(200).json({
        success: false,
        message: "No changes were made. Please check the data provided.",
      });
    }
  } catch (err) {
    // Catch and log the error
    console.error("Error executing stored procedure:", err);

    // Send error response
    res.status(500).json({
      success: false,
      message: "An error occurred while updating student calendar slots.",
      error: err.message, // Provide more specific error information
    });
  } 
});

app.put("/apinit/getDatesForStudentCalender", async (req, res) => {
  try {
    console.info("fetching dates");

    await sql.connect(sqlConfig);

    const requestData = req.body; // Destructure from req.query
    const { curriculumId, StartDate } = requestData; // Extract the curriculumId from the query parameters

    const result =
      await sql.query`EXEC dbo.UpdateAssessmentForCurriculum   @curriculumId=${curriculumId},@StartDate=${StartDate}`;

    console.log("result for getting the end dates of curriclm:",result);

    if (result.recordset !== undefined && result.recordset.length > 0) {
      const recordsetData = result.recordset;

      // Send the result back to the client
      res.status(200).json(recordsetData);
    } else {
      // If no records are returned
      console.log(
        "Stored procedure executed successfully, but no records returned."
      );
      res.status(200).json(null);
    }
  } catch (err) {
    console.error("Error executing stored procedure:", err);
    res.status(500).json({
      success: false,
      message: "Error executing stored procedure",
      apperror: err,
    });
  }  
});

app.put("/apinit/updateStudentMarks", async (req, res) => {
  try {
    console.info("StudentMarks Update successfully");

    // Connect to SQL Server
    await sql.connect(sqlConfig);

    // Extract data from the request body
    const requestData = req.body;

    const {
      TestId,
      studentName,
      CorrectAnswers,
      Technologyname,
      ModuleName,
      Topicname,
    } = requestData;

    // Execute the stored procedure
    const result = await sql.query`
      EXEC Usp_UpdateStudentUpdateMarks 
        @TestId=${TestId}, 
        @studentName=${studentName},
        @CorrectAnswers=${CorrectAnswers},
        @Technologyname=${Technologyname},
        @ModuleName=${ModuleName},
        @Topicname=${Topicname}
    `;

    // Check how many rows were affected by the update
    if (result.rowsAffected[0] > 0) {
      // If at least one row was updated, return success message
      res.status(200).json({
        message: "Student Marks updated successfully",
        rowsUpdated: result.rowsAffected[0], // Include number of rows updated
      });
    } else {
      // If no rows were affected, this could mean no matching record was found
      res.status(404).json({
        message: "No matching record found to update",
      });
    }
  } catch (err) {
    console.log("Error executing stored procedure:", err);
    res.status(500).json({
      success: false,
      message: "Error executing stored procedure",
      apperror: err,
    });
  }  
});

app.post("/apinit/insertUpdateMocktest", async (req, res) => {
  try {
    console.log("Creating or updating mock test...");

    // Connect to the SQL database
    await sql.connect(sqlConfig);

    // Extract request body data
    const requestData = req.body;

    const {
      TestName,
      TestStartDate,
      TestStartTime,
      TestEndTime,
      ModuleId,
      TopicId,
      type,
      userId
    } = requestData;

    // Execute stored procedure with parameterized inputs
    const result = await sql.query`
      EXEC Usp_InsertUpdateMockTest 
        @TestName = ${TestName},
        @TestStartDate = ${TestStartDate},
        @TestStartTime = ${TestStartTime},
        @TestEndTime = ${TestEndTime},
        @ModuleId = ${ModuleId},
        @TopicId = ${TopicId},
        @type=${type},
        @facultyId=${userId}
    `;

    // Send a response based on the result
    res.status(200).json({
      success: true,
      message: "Mock test successfully created or updated",
      data: result.recordset || null, // Include the recordset if it exists
    });
  } catch (err) {
    console.error("Error executing SQL query:", err);
    res.status(500).json({
      success: false,
      message: "Error executing SQL query",
      error: err.message,
    });
  } 
});

app.get("/apinit/GetStudentObtainMarks", async (req, res) => {
  try {
    console.info("Fetching student Marks");

    // Connect to the SQL Server
    await sql.connect(sqlConfig);

    // Get the query parameters from the request
    const { testId, studentName } = req.query;

    // Convert testId to an integer and studentName to a string or null
    const testIdInt = parseInt(testId); // Ensure testId is an integer
    const studentNameStr = studentName ? studentName.toString() : null; // Handle studentName, set null if not provided

    // Check if testId is valid
    if (isNaN(testIdInt)) {
      return res.status(400).json({
        success: false,
        message: "Invalid TestId provided",
      });
    }

    // Execute the stored procedure
    const result =
      await sql.query`EXEC [dbo].[Usp_GetStudentObtainMarks] @testId=${testIdInt}, @studentName=${studentNameStr}`;

    // Return the result
    res.status(200).json({
      success: true,
      message: "Fetching student Obtain Marks successfully.",
      data: result.recordset || null, // Include the recordset if it exists
    });
  } catch (err) {
    console.error("Error executing SQL query:", err);
    res.status(500).json({
      success: false,
      message: "Error executing SQL query",
      error: err.message,
    });
  } 
});

app.get("/apinit/getStatrtDateFormock_descriptiveTests", async (req, res) => {
  try {
    console.info("get start date");

    // Connect to the SQL Server
    const pool = await sql.connect(sqlConfig); // Get the pool object

    // Retrieve the testId from the query parameters
    const requestData = req.query;
    const { testId } = requestData;

    // Ensure that testId is passed and is of the correct type
    if (!testId) {
      return res.status(400).json({
        success: false,
        message: "TestId is required",
      });
    }

    // Use the pool to get a request object, then pass testId as an input parameter
    const result = await pool
      .request() // Get a request object from the pool
      .input("TestId", sql.Int, testId) // Define the parameter type as Int
      .query("SELECT * FROM Mock_Test WHERE TestId = @TestId"); // Use parameterized query

    res.status(200).json({
      success: true,
      message: "Get Startdate successfully.",
      data: result.recordset || null, // Include the recordset if it exists
    });
  } catch (err) {
    console.error("Error executing SQL query:", err);
    res.status(500).json({
      success: false,
      message: "Error executing SQL query",
      error: err.message,
    });
  } 
});

app.get("/api/getModulesByTestidForMock", async (req, res) => {
  try {
    console.log("Fetching subtopics");

    await sql.connect(sqlConfig);

    const { testid } = req.query;

    // Validate that facultyId is provided
    if (!testid) {
      return res
        .status(400)
        .json({ success: false, message: "testid is required" });
    }

    // Execute the stored procedure and get results
    const result =
      await sql.query`EXEC Usp_GetModulesByTestidForMock @testid=${testid}`;

    // Check if there are any records and respond accordingly
    if (result.recordset && result.recordset.length > 0) {
      res.status(200).json(result.recordset); // Send data if available
    } else {
      console.log("No data found in modules");
      res.status(200).json(null); // Send null if no records found
    }
  } catch (err) {
    console.error("Error executing SQL query:", err);
    res.status(500).json({
      success: false,
      message: "Error executing SQL query",
      apperror: err,
    });
  }  
});

app.get("/api/getTopicsByTestidForMock", async (req, res) => {
  try {
    console.log("Fetching subtopics");

    await sql.connect(sqlConfig);

    const { testid } = req.query;

    // Validate that facultyId is provided
    if (!testid) {
      return res
        .status(400)
        .json({ success: false, message: "testname is required" });
    }

    // Execute the stored procedure and get results
    const result =
      await sql.query`EXEC Usp_GetTopicsByTestIdForMock @testid=${testid}`;

    // Check if there are any records and respond accordingly
    if (result.recordset && result.recordset.length > 0) {
      res.status(200).json(result.recordset); // Send data if available
    } else {
      console.log("No data found in modules");
      res.status(200).json(null); // Send null if no records found
    }
  } catch (err) {
    console.error("Error executing SQL query:", err);
    res.status(500).json({
      success: false,
      message: "Error executing SQL query",
      apperror: err,
    });
  }  
});

app.get("/api/nit/fetchMocktestDetails", async (req, res) => {
  try {
    console.log("Fetching mock test details...");
    await sql.connect(sqlConfig);

    const result = await sql.query`EXEC [dbo].[Usp_RetriveMockTest]`;

    console.log("SQL Result:", result); // Log the result of the SQL query

    if (result.recordset && result.recordset.length > 0) {
      res.status(200).json(result.recordset); // Send data if available
    } else {
      console.log("No data found in Test");
      res.status(200).json(null); // Send empty array if no records found
    }
  } catch (err) {
    console.error("Error executing SQL query:", err);
    res.status(500).json({
      success: false,
      message: "Error executing SQL query",
      apperror: err,
    });
  }  
});

app.post("/insertfacultycurriculam", async (req, res) => {
  const {
    facultyId,
    courseCurriculam_Name,
    mappingId,
    status,
    comments,
    curriculam_Id,
    facultyCourseMapping,
  } = req.body;

  console.log(req.body);

  // Validate required fields
  if (!facultyId || !courseCurriculam_Name || !facultyCourseMapping) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Convert the table-valued parameter to a format suitable for SQL
    const table = new sql.Table("dbo.facultyCourse_MappingType");
    table.create = true;
    table.columns.add("topicName", sql.NVarChar(sql.MAX), { nullable: true });
    table.columns.add("subtopicName", sql.NVarChar(sql.MAX), {
      nullable: true,
    });
    table.columns.add("sessionId", sql.Int, { nullable: true });

    facultyCourseMapping.forEach((item) => {
      table.rows.add(item.topicName, item.subtopicName, item.sessionId);
    });

    // Create a new SQL request
    const pool = await sql.connect(sqlConfig); // Ensure sqlConfig is defined properly
    const request = pool.request();

    // Add parameters
    request.input("facultyId", sql.Int, facultyId);
    request.input(
      "courseCurriculam_Name",
      sql.VarChar(sql.MAX),
      courseCurriculam_Name
    );
    request.input("mappingId", sql.Int, mappingId);
    request.input("curriculam_Id", sql.UniqueIdentifier, curriculam_Id);
    request.input("status", sql.VarChar(sql.MAX), status); // Correctly add status parameter
    request.input("comments", sql.VarChar(sql.MAX), comments); // Correctly add comments parameter
    request.input("FacultyCourseMapping", sql.TVP, table); // Ensure you use sql.TVP

    // Execute the stored procedure
    await request.execute("Usp_InsertFacultyCourseAndMapping");

    res.status(200).json({ message: "Data inserted/updated successfully" });
  } catch (err) {
    console.error("SQL error", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Call the function to execute the stored procedure

module.exports = { serverv9 :app};