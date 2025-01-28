const { sql } = require("../config/db");
const { sqlTypes } = require("../config/types");
const { inputQuery, query } = require("../util/database");
// const mailsend = require("../../../NodeApi2/Mailsender");

/**
 *
 * @param {*} req
 * {
 *   "name": "John Doe",
 *   "mobile": "1234567890",
 *   "email": "john.doe@example.com",
 *   "currentCompany": "Tech Solutions",
 *   "experience": 5,
 *   "mode": 1,
 *   "technologies": "1,2",
 *   "createdBy": "Admin"
 * }
 * @param {*} res
 */
exports.registerInterviewer = async (req, res) => {
  try {
    const {
      name,
      mobile,
      email,
      currentCompany,
      experience,
      mode,
      technologies,
      createdBy = "Admin",
      type,
    } = req.body;

    const _query = `EXEC [dbo].[RegisterInterviewer_v1] 
      @Name=@name, 
      @Mobile=@mobile, 
      @Email=@email, 
      @CurrentCompany=@currentCompany, 
      @Experience=@experience, 
      @Mode=@mode, 
      @Technologies=@technologies, 
      @CreatedBy=@createdBy,
      @type=@type`;

    const sqlParams = [
      name,
      mobile,
      email,
      currentCompany,
      experience,
      mode,
      technologies?.join(", ") || "",
      createdBy,
      type,
    ];

    const sqlTypesArray = [
      sqlTypes.varchar, // Name
      sqlTypes.varchar, // Mobile
      sqlTypes.varchar, // Email
      sqlTypes.varchar, // CurrentCompany
      sqlTypes.int, // Experience
      sqlTypes.bit, // Mode
      sqlTypes.varchar, // Technologies
      sqlTypes.varchar, // CreatedBy
      sqlTypes.varchar,
    ];

    const result = await inputQuery(
      _query,
      [
        "name",
        "mobile",
        "email",
        "currentCompany",
        "experience",
        "mode",
        "technologies",
        "createdBy",
        "type",
      ],
      sqlTypesArray,
      sqlParams
    );
    console.log(result);
    // const mailres = await mailsend(
    //   result.recordset[0].UserId,
    //   name,
    //   email,
    //   result.recordset[0].Password
    // );

    res.status(201).json({
      message: `${
        type.charAt(0).toUpperCase() + type.slice(1)
      } Registered successfully.`,
    });
  } catch (error) {
    console.error("Error registering interviewer:", error);

    if (error.message === "Email already exists") {
      return res.status(403).json({
        error: "Duplicate Data.",
        message: "Email already exists",
      });
    }

    // if (error.message === "Name already exists") {
    //   return res.status(403).json({
    //     error: "Duplicate Data.",
    //     message: "Name already exists",
    //   });
    // }

    if (error.message === "Mobile Number already exists") {
      return res.status(403).json({
        error: "Duplicate Data.",
        message: "Mobile Number already exists",
      });
    }

    res.status(500).json({
      error: "Internal Server Error",
      message: "Internal Server Error.",
    });
  }
};
exports.registerUser = async (req, res) => {
  try {
    const {
      name,
      mobile,
      email,
      currentCompany,
      experience,
      mode,
      technologies,
      createdBy = "Admin",
      type,
      role
    } = req.body;

    const _query = `EXEC [dbo].[RegisterUser] 
      @Name=@name, 
      @Mobile=@mobile, 
      @Email=@email, 
      @CurrentCompany=@currentCompany, 
      @Experience=@experience, 
      @Mode=@mode, 
      @Technologies=@technologies, 
      @CreatedBy=@createdBy,
      @type=@type,
      @Role=@Role`;

    const sqlParams = [
      name,
      mobile,
      email,
      currentCompany,
      experience,
      mode,
      technologies?.join(", ") || "",
      createdBy,
      type,
      role,
    ];

    const sqlTypesArray = [
      sqlTypes.varchar, // Name
      sqlTypes.varchar, // Mobile
      sqlTypes.varchar, // Email
      sqlTypes.varchar, // CurrentCompany
      sqlTypes.int, // Experience
      sqlTypes.bit, // Mode
      sqlTypes.varchar, // Technologies
      sqlTypes.varchar, // CreatedBy
      sqlTypes.varchar,
      sqlTypes.varchar,
    ];

    const result = await inputQuery(
      _query,
      [
        "name",
        "mobile",
        "email",
        "currentCompany",
        "experience",
        "mode",
        "technologies",
        "createdBy",
        "type",
        "role",
      ],
      sqlTypesArray,
      sqlParams
    );
    console.log(result);
    // const mailres = await mailsend(
    //   result.recordset[0].UserId,
    //   name,
    //   email,
    //   result.recordset[0].Password
    // );

    res.status(201).json({
      message: `${
        type.charAt(0).toUpperCase() + type.slice(1)
      } Registered successfully.`,
    });
  } catch (error) {
    console.error("Error registering interviewer:", error);

    if (error.message === "Email already exists") {
      return res.status(403).json({
        error: "Duplicate Data.",
        message: "Email already exists",
      });
    }

    // if (error.message === "Name already exists") {
    //   return res.status(403).json({
    //     error: "Duplicate Data.",
    //     message: "Name already exists",
    //   });
    // }

    if (error.message === "Mobile Number already exists") {
      return res.status(403).json({
        error: "Duplicate Data.",
        message: "Mobile Number already exists",
      });
    }

    res.status(500).json({
      error: "Internal Server Error",
      message: "Internal Server Error.",
    });
  }
};


exports.insertEvolutionSheet = async (req, res) => {
  try {
    const {
      memberId,
      overallRemarks,
      mode,
      studentId,
      mappingData,
      moduleData,
    } = req.body;

    // Step 1: Insert into EvolutionSheet and return the new EvolutionSheetID
    // `EXEC InsertInToEvolutionSheet @MemberID=@memberId, @OverallRemarks=@overallRemarks, @StudentID=@studentId`;
    const evolutionSheetQuery = `INSERT INTO EvolutionSheet 
    (MemberID, OverallRemarks,  StudentID)
    VALUES 
    (@MemberID, @OverallRemarks,  @StudentID);
    SELECT SCOPE_IDENTITY() AS EvolutionSheetID;`;

    const evolutionSheetParams = [memberId, overallRemarks, studentId];
    const evolutionSheetTypes = [
      sqlTypes.int, // MemberID
      sqlTypes.varchar, // OverallRemarks
      sqlTypes.int, // StudentID
    ];

    const evolutionSheetResult = await inputQuery(
      evolutionSheetQuery,
      ["MemberID", "OverallRemarks", "StudentID"],
      evolutionSheetTypes,
      evolutionSheetParams
    );

    // Get the inserted EvolutionSheetID
    const evolutionSheetID = evolutionSheetResult.recordset[0].EvolutionSheetID;

    // Step 2: Insert into EvolutionSheet_Mapping
    const mappingQuery = `INSERT INTO EvolutionSheet_Mapping 
      (ObtainedMarks, MaxMarks, TopicID, EvolutionSheetID)
      VALUES 
      (@ObtainedMarks, @MaxMarks, @TopicID, @EvolutionSheetID);`;

    for (const mapping of mappingData) {
      const mappingParams = [
        mapping.obtainedMarks,
        mapping.maxMarks,
        mapping.topicId,
        evolutionSheetID,
      ];
      const mappingTypes = [
        sqlTypes.int, // ObtainedMarks
        sqlTypes.int, // MaxMarks
        sqlTypes.int, // TopicID
        sqlTypes.int, // EvolutionSheetID
      ];

      await inputQuery(
        mappingQuery,
        ["ObtainedMarks", "MaxMarks", "TopicID", "EvolutionSheetID"],
        mappingTypes,
        mappingParams
      );
    }

    // Step 3: Insert into EvolutionSheet_Module_Mapping
    const moduleQuery = `INSERT INTO EvolutionSheet_Module_Mapping 
      (ModuleID, EvolutionSheetID)
      VALUES 
      (@ModuleID, @EvolutionSheetID);`;

    for (const module of moduleData) {
      const moduleParams = [module.moduleId, evolutionSheetID];
      const moduleTypes = [sqlTypes.int, sqlTypes.int]; // ModuleID, EvolutionSheetID

      await inputQuery(
        moduleQuery,
        ["ModuleID", "EvolutionSheetID"],
        moduleTypes,
        moduleParams
      );
    }

    res.status(201).send(`Data inserted into EvolutionSheet successfully.`);
  } catch (error) {
    console.error("Error inserting data:", error.message);

    // if (error.message === "ALREADY EXISTS") {
    //   return res.status(403).json({
    //     error: "Duplicate Data.",
    //     message: "You Have already assigned marks to this student",
    //   });
    // }

    res.status(500).json({
      error: "Internal Server Error",
      message: "Internal Server Error.",
    });
  }
};

exports.addInterviewerBatchMapping = async (req, res) => {
  const { interviewer, batches } = req.body;

  try {
    const table = new sql.Table("dbo.InterviewerBatchMappingType");
    table.columns.add("MemberID", sql.Int);
    table.columns.add("BatchID", sql.Int);

    batches.forEach((mapping) => {
      table.rows.add(interviewer, mapping);
    });

    const query = `
      EXEC [dbo].[Usp_InsertInterviewerBatchMapping]
        @InterviewerBatchMappings
    `;

    const { rowsAffected } = await inputQuery(
      query,
      ["InterviewerBatchMappings"],
      ["Structured"],
      [table]
    );

    res.status(200).json({
      message: "Batch mappings inserted successfully.",
      data: rowsAffected?.[0] || 0,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database insertion error",
      details: err.message,
    });
  }
};

exports.fetchEvolutionSheetBatches = async (req, res) => {
  try {
    const { techId } = req.query;
    if (!techId) {
      const _query = `SELECT BatchId AS id, BatchName AS name FROM BatchDetailes WHERE IsActive = 1`;

      const recordset = await query(_query);

      return res.status(200).json({ data: recordset });
    }

    const _query = `SELECT BatchId AS id, BatchName AS name FROM BatchDetailes WHERE IsActive = 1 AND TechnologyId=@technologyId`;

    const result = await inputQuery(
      _query,
      ["technologyId"],
      [sqlTypes.int],
      [techId]
    );

    res.status(200).json({ data: result.recordset });
  } catch (error) {
    console.log(error);
    res.send({
      error: "Internal Server Error",
      message: "Internal Server Error.",
    });
  }
};

exports.fetcInterviewers = async (req, res) => {
  try {
    const { techId } = req.query;
    if (!techId) {
      const _query = `SELECT MemberID AS id, Name AS name FROM Interviewer WHERE IsActive = 1`;

      const recordset = await query(_query);

      return res.status(200).json({ data: recordset });
    }

    const _query = `SELECT i.MemberID AS id, i.Name AS name FROM Interviewer AS i INNER JOIN Interviewer_Mapping AS im ON i.MemberID = im.MemberID WHERE i.IsActive = 1 AND im.TechnologyID=@technologyId`;

    const result = await inputQuery(
      _query,
      ["technologyId"],
      [sqlTypes.int],
      [techId]
    );

    res.status(200).json({ data: result.recordset });
  } catch (error) {
    console.log(error);

    res.json({
      error: "Internal Server Error",
      message: "Internal Server Error.",
    });
  }
};

exports.fetcInterviewers = async (req, res) => {
  try {
    const { techId } = req.query;
    if (!techId) {
      const _query = `SELECT MemberID AS id, Name AS name FROM Interviewer WHERE IsActive = 1`;

      const recordset = await query(_query);

      return res.status(200).json({ data: recordset });
    }

    const _query = `SELECT i.MemberID AS id, i.Name AS name FROM Interviewer AS i INNER JOIN Interviewer_Mapping AS im ON i.MemberID = im.MemberID WHERE i.IsActive = 1 AND im.TechnologyID=@technologyId`;

    const result = await inputQuery(
      _query,
      ["technologyId"],
      [sqlTypes.int],
      [techId]
    );

    res.status(200).json({ data: result.recordset });
  } catch (error) {
    console.log(error);

    res.json({
      error: "Internal Server Error",
      message: "Internal Server Error.",
    });
  }
};

exports.fetchBatches = async (req, res) => {
  try {
    const { id } = req.params;

    const _query = `
          SELECT 
              bd.BatchId AS id, 
              bd.BatchName AS name 
          FROM 
              Interviewer_Batch_Mapping AS ibm
          INNER JOIN 
              BatchDetailes AS bd 
          ON 
              bd.BatchId = ibm.BatchID  -- Corrected join condition
          WHERE 
              ibm.MemberID = @id;
          `;

    const result = await inputQuery(_query, ["id"], [sqlTypes.int], [id]);

    res.status(200).json({ data: result.recordset });
  } catch (error) {
    console.log(error);

    res.json({
      error: "Internal Server Error",
      message: "Internal Server Error.",
    });
  }
};

exports.fetchStudentsByBatchId = async (req, res) => {
  try {
    const { id } = req.params;

    const _query = `SELECT StudentID AS id, FirstName AS name FROM Student WHERE IsActive = 1 AND BatchId = @id;`;

    const result = await inputQuery(_query, ["id"], [sqlTypes.int], [id]);

    res.status(200).json({ data: result.recordset });
  } catch (error) {
    console.log(error);

    res.json({
      error: "Internal Server Error",
      message: "Internal Server Error.",
    });
  }
};

exports.fetchModulesByInterviewerId = async (req, res) => {
  try {
    const { id } = req.params;

    const _query = `
            SELECT 
                m.ModuleID AS id, 
                m.ModuleName AS name 
            FROM 
                Interviewer_Mapping AS im 
            INNER JOIN 
                Technologies AS t 
                ON im.TechnologyID = t.TechnologyID 
            INNER JOIN 
                Modules AS m 
                ON m.TechnologyID = t.TechnologyID 
            WHERE 
                im.MemberID = @id`;

    const result = await inputQuery(_query, ["id"], [sqlTypes.int], [id]);

    res.status(200).json({ data: result.recordset });
  } catch (error) {
    console.log(error);

    res.json({
      error: "Internal Server Error",
      message: "Internal Server Error.",
    });
  }
};

exports.fetchTopicsByModuleIdList = async (req, res) => {
  try {
    const { moduleIds } = req.body;

    if (!moduleIds || !Array.isArray(moduleIds)) {
      return res.status(400).json({ error: "Invalid Request" });
    }

    if (moduleIds.length === 0) {
      return res.status(200).json([]);
    }

    const inputTypes = [];
    const sqlParams = [];
    const props = [];

    let queryInputString = "";

    moduleIds.forEach((module, index) => {
      sqlParams.push(`moduleId${index}`);
      inputTypes.push(sqlTypes.int);
      props.push(module);
      queryInputString += `@moduleId${index},`;
    });

    // Remove the trailing comma from queryInputString
    queryInputString = queryInputString.slice(0, -1);

    const _query = `SELECT TopicID AS id, TopicName AS name, ModuleID AS moduleId FROM Topics WHERE ModuleID IN (${queryInputString}) AND IsActive = 1`;

    const result = await inputQuery(_query, sqlParams, inputTypes, props);

    res.status(200).json({ data: result.recordset });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Internal Server Error",
      message: "Internal Server Error.",
    });
  }
};

exports.fetchInterviewersAndBatches = async (req, res) => {
  try {
    const { id } = req.params;

    const _query = `
          SELECT 
              ibm.MemberID AS interviewerId, 
              i.Name AS name,
              STRING_AGG(ibm.BatchID, ',') AS batchIds,
              STRING_AGG(bd.BatchName, ',') AS batchNames
          FROM 
              Interviewer_Batch_Mapping AS ibm
          INNER JOIN
              Interviewer AS i ON ibm.MemberID = i.MemberID
          INNER JOIN
              BatchDetailes AS bd ON bd.BatchId = ibm.BatchID
          WHERE 
              ibm.IsActive = 1
          GROUP BY 
              ibm.MemberID, i.Name;`;

    const { recordset } = await inputQuery(
      _query,
      ["id"],
      [sqlTypes.int],
      [id]
    );

    // To format the batchIds into array instead of comma supperated.
    if (Array.isArray(recordset)) {
      const updatedData = recordset.map((record) => ({
        interviewerId: record?.interviewerId || null,
        batchIdList: record?.batchIds?.split(",") || null,
        batchNameList: record?.batchNames?.split(",") || null,
        name: record?.name || null,
      }));

      return res.status(200).json({ data: updatedData });
    }

    res.status(200).json({ data: recordset });
  } catch (error) {
    console.log(error);

    res.json({
      error: "Internal Server Error",
      message: "Internal Server Error.",
    });
  }
};

exports.deleteMappedInterviewerBatches = async (req, res) => {
  try {
    const { id } = req.params;

    const _query = `UPDATE Interviewer_Batch_Mapping SET IsActive = 0 WHERE MemberID = @id`;

    const { rowsAffected } = await inputQuery(
      _query,
      ["id"],
      [sqlTypes.int],
      [id]
    );

    res.status(200).json(`${rowsAffected}`);
  } catch (error) {
    console.log(error);

    res.json({
      error: "Internal Server Error",
      message: "Internal Server Error.",
    });
  }
};
