const express = require('express');
const compression = require('compression');
const dotenv = require('dotenv');
const sql = require('mssql');
const cors= require("cors");
const bodyparser= require("body-parser");
const { userauth } = require('./userauth');
const { questiondb } = require("./Questiondb/api/admin");
const { serverv10 } = require("./Server_V10/server_V10");
const { facultycurriculumrbac } = require("./FacultyCurriculumRbac/routes/index");
const { serverv9 } = require("./interviewer/server_V9");
const { interviewerrbac } = require("./interviewerrbac/routes/index");

dotenv.config();

const app = express();

app.use(compression());
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.use("",userauth);
app.use("/api/admin", questiondb);
app.use("",serverv10);
app.use("",facultycurriculumrbac);
app.use("",serverv9);
app.use("",interviewerrbac);


const port = process.env.PORT || 3000;


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


const dbConfigProd = {
  user: process.env.DB_USER, 
  password: process.env.DB_PASSWORD, 
  server: process.env.DB_SERVER, 
  database: process.env.DB_DATABASE_PROD, 
  port: parseInt(process.env.DB_PORT || '1433'), 
  options: {
      encrypt: true, 
      trustServerCertificate: true, 
  },
};


app.get('/test-db', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        res.send('Database connection successful!');
        pool.close(); 
    } catch (err) {
        console.error('Database connection error:', err);
        res.status(500).send('Database connection failed!');
    }
});

app.post("/AuthenticateStudent", async (req, res) => {
  try {
    console.info("Method CheckUsername");

    // Connect to the database
    const pool = await sql.connect(dbConfigProd);
    console.log(req.body);

    const { UserName, Password } = req.body;

    if (!UserName || !Password) {
      return res.status(400).send("Username and password are required.");
    }

    // Create a new request from the pool
    const request = pool.request();

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
      return res.status(401).send(message);
    } else if (result.recordset && result.recordset.length > 0) {
      // Handle the case where user details are returned
      const user = result.recordset[0];
      return res.status(200).send({
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
      return res.status(401).send(message);
    } else {
      return res.status(401).send("Invalid username and password");
    }
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).send("Internal Server Error");
  } finally {
    try {
      await sql.close();
    } catch (closeError) {
      console.error("Error closing SQL connection:", closeError.message);
    }
  }
});


app.post("/nit_v1/AuthenticateStudent", async (req, res) => {
  try {
    console.info("Method CheckUsername");
    console.log("Request Data:", req.body); 
    const requestData = req.body;
    console.log("data to be sent:", requestData); 

    const { UserName, Password } = requestData;

    const pool = await sql.connect(dbConfig); 

    const request = pool.request(); 


    request.input("UserName", sql.NVarChar, UserName);
    request.input("Password", sql.NVarChar, Password);
    request.output("Message", sql.NVarChar(500)); 

    const result = await request.execute("[dbo].[Usp_AuthenticateStudent_V1]");

    console.log("Stored Procedure Result:", result.recordset);

    if (result.recordset && result.recordset.length > 0 && result.recordset[0].MESSAGE) {
      const message = result.recordset[0].MESSAGE;
      res.status(401).send(message); 
    } else if (result.recordset && result.recordset.length > 0) {
      const user = result.recordset[0]; 
      res.status(200).send(user);
    } else {
      res.status(401).send("Invalid UserName or Password"); 
    }
  } catch (error) {
    console.error("Error executing stored procedure:", error.message); 
    res.status(500).send("Internal Server Error: " + error.message); 
  } finally {
    sql.close(); 
  }
});

app.get("/studentAssessmentData", async (req, res) => {
  try {
    const { batchname } = req.query;

    if (!batchname) {
      return res.status(400).json({ error: "Batch name is required." });
    }

    console.log("Batch Name:", batchname);

    const pool = await sql.connect(dbConfig);

    const query = `
      SELECT * 
      FROM Assessment_v1 
      WHERE 
          TestDescription != 'Gap Day' 
          AND TestStartDate IS NOT NULL 
          AND TestStartTime IS NOT NULL 
          AND BatchId = (
              SELECT BatchId 
              FROM BatchDetailes 
              WHERE BatchName = @batchname
          )
    `;

    const request = pool.request();

    request.input("batchname", sql.NVarChar, batchname);

    const result = await request.query(query);

    if (!result.recordset || result.recordset.length === 0) {
      return res.status(404).json({ message: "No data found for the provided batch name." });
    }

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("Error fetching student assessment data:", error.message);

    res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  } finally {

    try {
      await sql.close();
    } catch (closeError) {
      console.error("Error closing SQL connection:", closeError.message);
    }
  }
});

app.post("/GetTodayTests_code", async (req, res) => {
  try {
    console.info("Fetching today's code tests");

    const pool = await sql.connect(dbConfig);

    const { studentId, createdAt } = req.body;

    if (!studentId || !createdAt) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameters: studentId and createdAt are required.",
      });
    }

    console.log("Request Parameters:", { studentId, createdAt });

    const request = pool.request();
    request.input("studentId", sql.Int, studentId);
    request.input("createdAt", sql.DateTime, createdAt);

    const result = await request.execute("[dbo].[USP_GetTodayTests_Code]");

    console.log("Stored Procedure Result:", result.recordset);

    if (result.recordset && result.recordset.length > 0) {
      res.status(200).json({
        success: true,
        message: "Stored procedure executed successfully",
        dbresult: result.recordset,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Stored procedure executed successfully, but no records returned.",
        dbresult: [],
      });
    }
  } catch (error) {
    console.error("Error executing stored procedure:", error.message);
    res.status(500).json({
      success: false,
      message: "Error executing stored procedure",
      error: error.message,
    });
  } finally {
    try {
      await sql.close();
    } catch (closeError) {
      console.error("Error closing SQL connection:", closeError.message);
    }
  }
});

app.post("/apinit/RetriveTestsBystudentId_code", async (req, res) => {
  try {
    console.info("listofTests");

    // Ensure a proper connection to the database
    const pool = await sql.connect(dbConfigProd);
    console.log(req.body);

    const { studentemail, TestId } = req.body;

    if (!studentemail || !TestId) {
      return res.status(400).json({
        success: false,
        message: "Both 'studentemail' and 'TestId' are required.",
      });
    }

    // Use a prepared statement to execute the stored procedure
    const request = pool.request();
    request.input("studentemail", sql.NVarChar, studentemail);
    request.input("TestId", sql.Int, TestId);

    const result = await request.execute("[dbo].[USP_RetriveTestsBystudentId_ProgramCode]");

    console.log("List_Tests", result);

    if (result.recordset && result.recordset.length > 0) {
      console.log("Stored procedure executed successfully:", result.recordset);
      res.status(200).json({
        success: true,
        message: "Stored procedure executed successfully",
        dbresult: result.recordset,
      });
    } else {
      console.log("Stored procedure executed successfully, but no records returned.");
      res.status(200).json({
        success: true,
        message: "Stored procedure executed successfully, but no records returned.",
        dbresult: [],
      });
    }
  } catch (err) {
    console.error("Error executing stored procedure:", err);
    res.status(500).json({
      success: false,
      message: "Error executing stored procedure",
      apperror: err.message,
    });
  } finally {
    try {
      await sql.close();
    } catch (closeError) {
      console.error("Error closing SQL connection:", closeError.message);
    }
  }
});


app.post("/GetTodayTests_code_prod", async (req, res) => {
  try {
    console.info("Fetching today's code tests");

    const pool = await sql.connect(dbConfigProd);

    const { studentId, createdAt } = req.body;

    if (!studentId || !createdAt) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameters: studentId and createdAt are required.",
      });
    }

    console.log("Request Parameters:", { studentId, createdAt });

    const request = pool.request();
    request.input("studentId", sql.Int, studentId);
    request.input("createdAt", sql.DateTime, createdAt);

    const result = await request.execute("[dbo].[USP_GetTodayTests_Code]");

    console.log("Stored Procedure Result:", result.recordset);

    if (result.recordset && result.recordset.length > 0) {
      res.status(200).json({
        success: true,
        message: "Stored procedure executed successfully",
        dbresult: result.recordset,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Stored procedure executed successfully, but no records returned.",
        dbresult: [],
      });
    }
  } catch (error) {
    console.error("Error executing stored procedure:", error.message);
    res.status(500).json({
      success: false,
      message: "Error executing stored procedure",
      error: error.message,
    });
  } finally {
    try {
      await sql.close();
    } catch (closeError) {
      console.error("Error closing SQL connection:", closeError.message);
    }
  }
});


app.get('/students', async (req, res) => {
  try {
      const { email, userID } = req.query; 

      if (!email && !userID) {
          return res.status(400).send('Please provide either email or userID');
      }

      const pool = await sql.connect(dbConfig); 

      let query = 'SELECT * FROM student WHERE ';
      let params = [];

      if (email) {
          query += 'email = @email';
          params.push({ name: 'email', type: sql.NVarChar, value: email });
      }
      if (userID) {
          if (email) query += ' OR '; 
          query += 'userID = @userID';
          params.push({ name: 'userID', type: sql.NVarChar, value: userID });
      }
      console.log("params :",params);
      const request = pool.request();
      params.forEach(param => request.input(param.name, param.type, param.value));
      const result = await request.query(query);

      if (result.recordset.length === 0) {
          return res.status(404).send('No student found');
      }

      res.json({"result":result.recordset,"email":email});
      pool.close(); 
  } catch (err) {
      console.error('Error fetching student data:', err);
      res.status(500).send('Error fetching student data');
  }
});


app.get("/studentReport_Technology", async (req, res) => {
  try {
    console.info("List of Student Names");

    // Destructure query parameters
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

    // Check if 'username' is provided in the query string
    if (!username) {
      return res.status(400).json({ error: "Invalid User" });
    }

    // Establish SQL connection
    const pool = await sql.connect(dbConfig);

    // Create SQL request object
    const request = pool.request();

    // Add input parameters to the request object
    request.input("Username", sql.NVarChar, username);

    if (TestId) {
      request.input("TestId", sql.Int, TestId);
    }
    if (TechnologyName) {
      request.input("TechnologyName", sql.NVarChar, TechnologyName.replaceAll("-", "#"));
    }
    if (ModuleName) {
      request.input("ModuleName", sql.NVarChar, ModuleName.replaceAll("-", "#"));
    }
    if (TopicName) {
      request.input("TopicName", sql.NVarChar, TopicName.replaceAll("-", "#"));
    }
    if (SubtopicName) {
      request.input("SubtopicName", sql.NVarChar, SubtopicName.replaceAll("-", "#"));
    }

    // Execute the stored procedure
    const result = await request.execute("Usp_Get_StudentReport_Technology");

    console.log("List of Student Names:", result.recordset);

    // Check if the stored procedure returned data
    if (result.recordset && result.recordset.length > 0) {
      res.status(200).json(result.recordset); // Return the result if data is found
    } else {
      // If no data is returned, send an appropriate message
      console.log("Stored procedure executed successfully, but no records found.");
      res.status(200).json({
        success: true,
        message: "Stored procedure executed successfully, but no records returned.",
        dbresult: null,
      });
    }

  } catch (err) {
    // Handle errors during stored procedure execution
    console.error("Error executing stored procedure:", err);
    res.status(500).json({
      success: false,
      message: "Error executing stored procedure",
      apperror: err.message,
    });
  } finally {
    // Ensure the SQL connection is closed
    sql.close();
  }
});


app.get("/get_StudentReport_module", async (req, res) => {
  try {
    console.info("List of Student Report Module");

    // Extract query parameters
    const {
      username,
      TestId,
      TechnologyName,
      ModuleName,
      TopicName,
      SubtopicName,
    } = req.query;

    // Log extracted parameters
    console.log(
      username,
      TestId,
      TechnologyName,
      ModuleName,
      TopicName,
      SubtopicName
    );

    // Ensure required parameters are present
    if (!username) {
      return res.status(400).json({ error: "Invalid User" });
    }

    // Establish the SQL connection
    const pool = await sql.connect(dbConfig);

    // Prepare stored procedure parameters
    const request = pool.request();
    request.input("Username", sql.NVarChar, username);

    // Optional parameters - apply replacements if they exist
    if (TestId) {
      request.input("TestId", sql.Int, TestId);
    }
    if (TechnologyName) {
      request.input("TechnologyName", sql.NVarChar, TechnologyName.replaceAll("-", "#"));
    }
    if (ModuleName) {
      request.input("ModuleName", sql.NVarChar, ModuleName.replaceAll("-", "#"));
    }
    if (TopicName) {
      request.input("TopicName", sql.NVarChar, TopicName.replaceAll("-", "#"));
    }
    if (SubtopicName) {
      request.input("SubtopicName", sql.NVarChar, SubtopicName.replaceAll("-", "#"));
    }

    // Execute the stored procedure with the provided parameters
    const result = await request.execute("Usp_Get_StudentReport_module");

    console.log("Student Report Module Data:", result.recordset);

    // Check if the result has records
    if (result.recordset && result.recordset.length > 0) {
      res.status(200).json(result.recordset);
    } else {
      // Handle the case where no records are returned
      console.log("Stored procedure executed successfully, but no records found.");
      res.status(200).json({
        success: true,
        message: "Stored procedure executed successfully, but no records returned.",
        dbresult: null,
      });
    }

  } catch (err) {
    // Error handling
    console.error("Error executing stored procedure:", err);
    res.status(500).json({
      success: false,
      message: "Error executing stored procedure",
      apperror: err.message,
    });
  } finally {
    // Close SQL connection
    sql.close();
  }
});


app.get("/get_StudentReport_Topic", async (req, res) => {
  try {
    console.info("List of Student Report Topic");

    // Extract query parameters
    const {
      username,
      TestId,
      TechnologyName,
      ModuleName,
      topicname,
      SubTopicName,
    } = req.query;

    // Log extracted parameters
    console.log(
      username,
      TestId,
      TechnologyName,
      ModuleName,
      topicname,
      SubTopicName
    );

    // Ensure the required parameter 'username' is present
    if (!username) {
      return res.status(400).json({ error: "Invalid User" });
    }

    // Establish the SQL connection
    const pool = await sql.connect(dbConfig);

    // Prepare stored procedure parameters
    const request = pool.request();
    request.input("Username", sql.NVarChar, username);

    // Optional parameters - apply replacements if they exist
    if (TestId) {
      request.input("TestId", sql.Int, TestId);
    }
    if (TechnologyName) {
      request.input("TechnologyName", sql.NVarChar, TechnologyName.replaceAll("-", "#"));
    }
    if (ModuleName) {
      request.input("ModuleName", sql.NVarChar, ModuleName.replaceAll("-", "#"));
    }
    if (topicname) {
      request.input("TopicName", sql.NVarChar, topicname.replaceAll("-", "#"));
    }
    if (SubTopicName) {
      request.input("SubTopicName", sql.NVarChar, SubTopicName.replaceAll("-", "#"));
    }

    // Execute the stored procedure with the provided parameters
    const result = await request.execute("Usp_Get_StudentReport_Topic");

    console.log("Student Report Topic Data:", result.recordset);

    // Check if the result has records
    if (result.recordset && result.recordset.length > 0) {
      res.status(200).json(result.recordset);
    } else {
      // Handle the case where no records are returned
      console.log("Stored procedure executed successfully, but no records found.");
      res.status(200).json({
        success: true,
        message: "Stored procedure executed successfully, but no records returned.",
        dbresult: null,
      });
    }

  } catch (err) {
    // Error handling
    console.error("Error executing stored procedure:", err);
    res.status(500).json({
      success: false,
      message: "Error executing stored procedure",
      apperror: err.message,
    });
  } finally {
    // Close SQL connection
    sql.close();
  }
});


app.get("/get_StudentReport/:username", async (req, res) => {
  try {
    console.info("List of Student Report");

    // Extract the 'username' from route parameters and 'TopicName' from query parameters
    const { username } = req.params;
    const { TopicName } = req.query;

    // Log the extracted parameters for debugging
    console.log(username, TopicName);

    // Ensure that the 'username' is provided
    if (!username) {
      return res.status(400).json({ error: "Invalid User" });
    }

    // Establish SQL connection
    const pool = await sql.connect(dbConfig);

    // Prepare the SQL query with input parameters
    const request = pool.request();
    request.input("Username", sql.NVarChar, username);

    // Optional parameter: TopicName (replace '-' with '#')
    if (TopicName) {
      request.input("TopicName", sql.NVarChar, TopicName.replaceAll("-", "#"));
    }

    // Execute the stored procedure
    const result = await request.execute("Usp_Get_StudentReport");

    console.log("Student Report Data:", result.recordset);

    // Check if the result has records
    if (result.recordset && result.recordset.length > 0) {
      res.status(200).json(result.recordset); // Return records if found
    } else {
      // No records found, return a response with message
      console.log("Stored procedure executed successfully, but no records found.");
      res.status(200).json({
        success: true,
        message: "Stored procedure executed successfully, but no records returned.",
        dbresult: null,
      });
    }

  } catch (err) {
    // Handle errors and respond with status 500
    console.error("Error executing stored procedure:", err);
    res.status(500).json({
      success: false,
      message: "Error executing stored procedure",
      apperror: err.message,
    });
  } finally {
    // Ensure SQL connection is closed
    sql.close();
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
    res.status(500).send({"message":"Internal Server Error",error:error});
  } finally {
    sql.close();
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
    let pool = await sql.connect(dbConfigProd);
    console.log("sql process");
    const table = new sql.Table();
    table.columns.add("ProgramId", sql.UniqueIdentifier);
    table.columns.add("TestCaseId", sql.Int);
    table.columns.add("Output", sql.NVarChar(sql.max));
    table.columns.add("Result", sql.NVarChar(sql.max));

    const parsedData = JSON.parse(jsonData);
    console.log("----json data", jsonData, "\nparsed data", parsedData);
    // Populate rows in the table type
    parsedData.forEach((row) => {
      table.rows.add(
        row.ProgramId,
        row.TestCaseId,
        row.Output,
        // Front end passing result as bit but storing nvarchar in db.
        row.Result === 0 ? "Failed" : "Passed"
      );
    });

    //console.log(TechnologyId, ModuleId, EnrollmentId);
    // Execute the stored procedure
    const request = await pool.request();

    await request.input("StudentProgramTestCases", sql.TVP, table);

    await request
      .input("ProgramId", sql.UniqueIdentifier, ProgramId)
      .input("Email", sql.NVarChar, Email)
      .input("No_Attempts", sql.Int, No_Attempts || 0)
      .input("No_TestCasesPassed", sql.Int, No_TestCasesPassed)
      .input("No_TestCasesFailed", sql.Int, No_TestCasesFailed)
      .input("StudentName", sql.NVarChar, StudentName)
      .input("UserCode", sql.NVarChar, UserCode || "")
      .input("TotalDuration", sql.Int, TotalDuration || 0)

      .execute("[USP_StudentProgramFinalSubmission]");
  } catch (error) {
    console.log("error:" + error);
    throw error;
  } finally {
    sql.close();
  }
}



// Default route
app.get('/', (req, res) => {
    res.send('Hello, Node.js on Azure! Testing API');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
