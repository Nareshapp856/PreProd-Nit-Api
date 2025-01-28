const { sql } = require("../config/db");
const { sqlTypes } = require("../config/types");
const { inputQuery, query } = require("../util/database");
const sendResponse = require("../util/sendResponse");

exports.addTopic = async (req, res) => {
  const isActive = true;
  try {
    const { moduleId, topicName } = req.body;
    console.log(moduleId, topicName);
    if (!moduleId || !topicName) {
      return res.status(200).json({ message: "invalidData" });
    }

    const _query = `
    INSERT INTO Topics (ModuleID, TopicName, IsActive)
    SELECT @moduleId, @topicName, @isActive
    WHERE NOT EXISTS (
      SELECT @moduleId
      FROM Topics
      WHERE ModuleID = @moduleId AND TopicName = @topicName
);`;

    const { rowsAffected } = await inputQuery(
      _query,
      ["moduleId", "topicName", "isActive"],
      [sqlTypes.int, sqlTypes.varchar, sqlTypes.bit],
      [moduleId, topicName, isActive]
    );

    if (rowsAffected[0] === 0) {
      // if no records were updated i considere it as already exists
      res.status(409).send("Item already exists.");
    } else {
      res.status(201).send(`1`);
    }
  } catch (error) {
    console.error("SQL error:", error.message);
    res.status(500).json({
      error:
        "An error occurred while processing your request. Please try again later.",
      details: error.message,
    });
  }
};

exports.addSubTopic = async (req, res) => {
  const isActive = true;
  try {
    const { moduleId, topicId, subTopicName } = req.body;
    console.log(moduleId, topicId);
    if (!moduleId || !topicId) {
      return res.status(200).json({ message: "invalidData" });
    }

    const _query = `
    INSERT INTO SubTopic (ModuleID, TopicID, SubTopicName, IsActive)
    SELECT @moduleId, @topicId, @subTopicName, @isActive
    WHERE NOT EXISTS (
      SELECT 1 FROM SubTopic 
      WHERE ModuleID = @moduleId AND TopicID = @topicId AND SubTopicName = @subTopicName
    );`;

    const { rowsAffected } = await inputQuery(
      _query,
      ["moduleId", "topicId", "subTopicName", "isActive"],
      [sqlTypes.int, sqlTypes.int, sqlTypes.varchar, sqlTypes.bit],
      [moduleId, topicId, subTopicName, isActive]
    );

    if (rowsAffected[0] === 0) {
      // if no records were updated i considere it as already exists
      res.status(409).send("Item already exists.");
    } else {
      res.status(201).send(`1`);
    }
  } catch (error) {
    console.error("SQL error:", error.message);
    res.status(500).json({
      error:
        "An error occurred while processing your request. Please try again later.",
      details: error.message,
    });
  }
};

exports.insertfacultycurriculam = async (req, res) => {
  const {
    facultyId,
    courseCurriculam_Name,
    mappingId,
    status,
    comments,
    curriculam_Id,
    facultyCourseMapping,
    moduleId,
  } = req.body;

  console.log(req.body);
  // Validate required fields
  if (!facultyId || !courseCurriculam_Name || !facultyCourseMapping) {
    return res.status(400).json({
      error:
        "Missing required fields. Please ensure that 'facultyId', 'courseCurriculam_Name', and 'facultyCourseMapping' are provided.",
    });
  }

  if (
    !Array.isArray(facultyCourseMapping) ||
    facultyCourseMapping.length === 0
  ) {
    return res.status(400).json({
      error: "'facultyCourseMapping' must be a non-empty array.",
    });
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

    // Populate the table-valued parameter
    facultyCourseMapping.forEach((item) => {
      if (item.topicName && item.subtopicName && item.sessionId) {
        table.rows.add(item.topicName, item.subtopicName, item.sessionId);
      } else {
        throw new Error(
          "Invalid data in 'facultyCourseMapping'. Each item must contain 'topicName', 'subtopicName', and 'sessionId'."
        );
      }
    });

    // Define the SQL query and parameters
    const query = `
      EXEC [dbo].[Usp_InsertFacultyCourseAndMapping]
        @facultyId,
        @courseCurriculam_Name,
        @mappingId,
        @status,
        @comments,
        @curriculam_Id,
        @ModuleId,
        @FacultyCourseMapping
    `;

    // Execute the query using inputQuery function
    await inputQuery(
      query,
      [
        "facultyId",
        "courseCurriculam_Name",
        "mappingId",
        "comments",
        "status",
        "curriculam_Id",
        "moduleId",
        "FacultyCourseMapping",
      ],
      [
        "Int",
        "NVarChar",
        "Int",
        "NVarChar",
        "NVarChar",
        "UniqueIdentifier",
        sqlTypes.int,
        "Structured",
      ],
      [
        facultyId,
        courseCurriculam_Name,
        mappingId,
        status,
        comments,
        curriculam_Id,
        moduleId,
        table,
      ]
    );

    res.status(200).json({ message: "Data inserted/updated successfully." });
  } catch (err) {
    // trying to stop duplicate names, only allow unique names for entity
    if (err.message === "curriculum name already exists") {
      return res.status(409).json({
        error: "duplicate curriculum name",
        message: "curriculum name already exists",
      });
    }

    res.status(500).json({
      error:
        "An error occurred while processing your request. Please try again later.",
      details: err.message,
    });
  }
};

exports.updatefacultycurriculum = async (req, res) => {
  const {
    facultyId,
    courseCurriculam_Name,
    mappingId,
    status,
    comments,
    curriculam_Id,
    facultyCourseMapping,
    deletedRecords,
  } = req.body;

  console.log(req.body);
  // Validate required fields
  if (!facultyId || !courseCurriculam_Name || !facultyCourseMapping) {
    return res.status(400).json({
      error:
        "Missing required fields. Please ensure that 'facultyId', 'courseCurriculam_Name', and 'facultyCourseMapping' are provided.",
    });
  }

  if (
    !Array.isArray(facultyCourseMapping) ||
    facultyCourseMapping.length === 0
  ) {
    return res.status(400).json({
      error: "'facultyCourseMapping' must be a non-empty array.",
    });
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

    // Populate the table-valued parameter
    facultyCourseMapping.forEach((item) => {
      if (item.topicName && item.subtopicName && item.sessionId) {
        table.rows.add(item.topicName, item.subtopicName, item.sessionId);
      } else {
        throw new Error(
          "Invalid data in 'facultyCourseMapping'. Each item must contain 'topicName', 'subtopicName', and 'sessionId'."
        );
      }
    });

    // Define the SQL query and parameters
    const _query = `
      EXEC [dbo].[Usp_UpdateFacultyCourseAndMapping]
        @facultyId,
        @courseCurriculam_Name,
        @mappingId,
        @status,
        @comments,
        @curriculam_Id,
        @FacultyCourseMapping
    `;

    // Execute the query using inputQuery function
    await inputQuery(
      _query,
      [
        "facultyId",
        "courseCurriculam_Name",
        "mappingId",
        "comments",
        "status",
        "curriculam_Id",
        "FacultyCourseMapping",
      ],
      [
        "Int",
        "NVarChar",
        "Int",
        "NVarChar",
        "NVarChar",
        "UniqueIdentifier",
        "Structured",
      ],
      [
        facultyId,
        courseCurriculam_Name,
        mappingId,
        status,
        comments,
        curriculam_Id,
        table,
      ]
    );

    if (deletedRecords && deletedRecords.length > 0) {
      const idsString = deletedRecords.join(",");

      const deleteQuery = `
        DELETE FROM facultyCourse_Mapping
        WHERE mapping_Id IN (${idsString})
      `;

      const rowsAffected = await query(deleteQuery, { rowsAffected: true });

      if (deletedRecords.length !== rowsAffected?.[0]) {
        return res
          .status(500)
          .json({ message: "something went wrong while deleting records" });
      }

      return res.status(200).json({
        message: "Data inserted/updated successfully.",
        deletedRows: rowsAffected?.[0] || 0,
      });
    }

    res.status(200).json({ message: "Data inserted/updated successfully." });
  } catch (err) {
    console.error("SQL error:", err.message);
    res.status(500).json({
      error:
        "An error occurred while processing your request. Please try again later.",
      details: err.message,
    });
  }
};

exports.getbasicdetails = async (req, res) => {
  const { facultyId } = req.body;
  console.log(req.body);
  // Validate required fields
  if (!facultyId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Execute the stored procedure using the inputQuery function
    const result = await query(
      `EXEC Usp_GetBasicDetailsBy_FacultyId @facultyId=${facultyId}`
    );
    console.log(result);
    res.status(200).json({ data: result });
  } catch (err) {
    console.error("SQL error", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getCurriculumDetails = async (req, res) => {
  const { curriculamId } = req.body; // Assuming curriculamId is passed as a query parameter
  console.log(req.body);
  // Validate required fields
  if (!curriculamId) {
    return res
      .status(400)
      .json({ error: "Missing required field: curriculamId" });
  }

  try {
    // Execute the stored procedure with a parameterized query
    const result = await inputQuery(
      "EXEC [dbo].[Usp_Get_CurriculamDetails] @curriculamId", // The SQL query
      ["curriculamId"], // Inputs: parameter names
      ["UniqueIdentifier"], // Types: SQL data types
      [curriculamId] // Parameters: actual values to be passed
    );
    console.log(result);
    res.status(200).json({ result });
  } catch (err) {
    console.error("SQL error", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.insertupdatecoursebatchdetails = async (req, res) => {
  const { Curriculam_Id, Batchid, StartDate } = req.body;

  // Validate required fields
  if (!Curriculam_Id || !Batchid || !StartDate) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const query = `EXEC Usp_Insert_UpdateCourseBatchDetails
        @Curriculam_Id, @Batchid, @StartDate`;

    // Assuming inputQuery is a function that executes SQL queries
    await inputQuery(
      query,
      ["Curriculam_Id", "Batchid", "StartDate"],
      ["UNIQUEIDENTIFIER", "INT", "Date"],
      [Curriculam_Id, Batchid, StartDate]
    );

    res.status(200).json({ message: "Data inserted/updated successfully" });
  } catch (err) {
    console.error("SQL error", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getfacultycurriculumdetails = async (req, res) => {
  try {
    // Execute the stored procedure using the query function
    const result = await query(`EXEC Usp_RetriveFacultyCurriculumDetails`);
    res.status(200).json({ data: result });
  } catch (err) {
    console.error("SQL error", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.gettCurriculumNameByfacultyid = async (req, res) => {
  const { facultyId } = req.body;
  console.log(req.body);
  // Validate required fields
  if (!facultyId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Execute the stored procedure using the inputQuery function
    const result = await query(
      `EXEC Usp_GetCurriculumNameBy_FacultyId @facultyId=${facultyId}`
    );
    console.log(result);
    res.status(200).json({ data: result });
  } catch (err) {
    console.error("SQL error", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getCourseBatchDetails = async (req, res) => {
  try {
    // Execute the stored procedure using the query function
    const result = await query(`EXEC Usp_GetCourseBatchDetails`);
    res.status(200).json({ data: result });
  } catch (err) {
    console.error("SQL error", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Bharath
exports.getCourseDetailsByCurriculumId = async (req, res) => {
  try {
    const { curriculumId } = req.body;

    const query = `EXEC Usp_RetriveCourseByCurriculumID @CurriculumID`;

    const result = await inputQuery(
      query,
      ["CurriculumID"],
      ["VarChar"],
      [curriculumId]
    );
    res.status(200).json({ data: result.recordset });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
    console.error("SQL error", err?.message || err);
  }
};

// Bharath
exports.updateStatusByCurriculumId = async (req, res) => {
  try {
    const { status, curriculumId } = req.body;

    if (!status || !curriculumId)
      return res
        .status(400)
        .json({ error: "Must pass all required fileds to do this operation" });

    const query = `UPDATE facultyCourse_curriculum SET status = @status WHERE curriculam_Id = @curriculumId`;

    const result = await inputQuery(
      query,
      ["status", "curriculumId"],
      ["NVarChar", "UniqueIdentifier"],
      [status, curriculumId]
    );
    res.status(200).json({
      data: result.rowsAffected[0],
      status: result.rowsAffected[0] === 1 ? true : false,
    });
  } catch (err) {
    console.error("SQL error", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Bharath - Mr.Satya
// exports.updateCourseStatus = async (req, res) => {
//   try {
//     const {
//       facultyId,
//       courseCurriculam,
//       mappingId,
//       comments,
//       status,
//       curriculamId,
//     } = req.body;

//     if (!facultyId || !courseCurriculam)
//       return res
//         .status(400)
//         .json({ error: "Must pass all required fileds to do this operation" });

//     const query = `EXEC [dbo].[Usp_AdminUpdateCourseStatus]
//         @facultyId,@courseCurriculam_Name,@mappingId,@comments,@status,@curriculam_Id`;

//     const result = await inputQuery(
//       query,
//       [
//         "facultyId",
//         "courseCurriculam",
//         "mappingId",
//         "comments",
//         "status",
//         "curriculam_Id",
//       ],
//       ["INT", "VARCHAR", "INT", "VARCHAR", "VARCHAR", "UNIQUEIDENTIFIER"],
//       [facultyId, courseCurriculam, mappingId, comments, status, curriculamId]
//     );
//     res.status(200).json({
//       data: result.rowsAffected[0],
//       status: result.rowsAffected[0] === 1 ? true : false,
//     });
//   } catch (err) {
//     console.error("SQL error", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

exports.adminUpdateCourseStatus = async (req, res) => {
  const {
    facultyId,
    courseCurriculam_Name,
    mappingId,
    status,
    comments,
    curriculam_Id,
  } = req.body;

  console.log(req.body);
  // Validate required fields
  if (!facultyId || !courseCurriculam_Name) {
    return res.status(400).json({
      error:
        "Missing required fields. Please ensure that 'facultyId', 'courseCurriculam_Name', and 'facultyCourseMapping' are provided.",
    });
  }

  try {
    // Define the SQL query and parameters
    const query = `
      EXEC [dbo].[Usp_AdminUpdateCourseStatus]
        @facultyId,
        @courseCurriculam_Name,
        @mappingId,
        @status,
        @comments,
        @curriculam_Id
    `;

    // Execute the query using inputQuery function
    await inputQuery(
      query,
      [
        "facultyId",
        "courseCurriculam_Name",
        "mappingId",
        "comments",
        "status",
        "curriculam_Id",
      ],
      ["Int", "NVarChar", "Int", "NVarChar", "NVarChar", "UniqueIdentifier"],
      [
        facultyId,
        courseCurriculam_Name,
        mappingId,
        status,
        comments,
        curriculam_Id,
      ]
    );

    res.status(200).json({ message: "Data inserted/updated successfully." });
  } catch (err) {
    console.error("SQL error:", err.message);
    res.status(500).json({
      error:
        "An error occurred while processing your request. Please try again later.",
      details: err.message,
    });
  }
};

exports.gettopicidbymodule = async (req, res) => {
  const { ModuleID } = req.body;
  console.log(req.body);

  try {
    // Execute the stored procedure using the inputQuery function
    const result = await query(
      `EXEC [dbo].[USP_Get_TopicIdByModules] @ModuleID=${ModuleID || null}`
    );
    console.log(result);
    res.status(200).json({ data: result });
  } catch (err) {
    console.error("SQL error", err);
    res.status(500).json({
      error: "Internal server error",
      message: "Internal server error",
    });
  }
};

exports.getSubTopicIdIdByTopics = async (req, res) => {
  const { TopicID } = req.body;
  console.log(req.body);
  // Validate required fields
  if (!TopicID) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Execute the stored procedure using the inputQuery function
    const result = await query(
      `EXEC [dbo].[USP_Get_SubTopicIdIdByTopics_V5] @TopicID=${TopicID}`
    );
    console.log(result);
    res.status(200).json({ data: result });
  } catch (err) {
    console.error("SQL error", err);
    res.status(500).json({
      error: "Internal server error",
      message: "Internal server error",
    });
  }
};

exports.getmodulesbyfacultyid = async (req, res) => {
  const { facultyId } = req.params;

  try {
    // Execute the stored procedure using the inputQuery function
    const { recordset } = await inputQuery(
      `EXEC GetModulesbyFaculty @facultyId`,
      ["facultyId"],
      [sqlTypes.int],
      [facultyId]
    );

    res.status(200).send({ data: recordset });
  } catch (err) {
    console.error("SQL error", err);
    res.status(500).json({
      error: "Internal server error",
      message: "Internal server error",
    });
  }
};

exports.fetchBatchList = async (req, res) => {
  try {
    const { technologyId } = req.query;

    if (!technologyId || isNaN(Number(technologyId))) {
      const result =
        await query(`SELECT BatchName AS name, BatchId AS id, TechnologyId AS technologyId FROM BatchDetailes
        WHERE TechnologyId IS NOT NULL`);

      return res.status(200).json({ data: result });
    }

    const { recordset } = await inputQuery(
      `SELECT BatchName AS name, BatchId AS id, TechnologyId AS technologyId FROM BatchDetailes
      WHERE TechnologyId = @technologyId`,
      ["technologyId"],
      [sqlTypes.int],
      [technologyId]
    );

    return res.status(200).json({ data: recordset });
  } catch (error) {
    console.error("SQL error", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Internal server error",
    });
  }
};

exports.fetchFacultyList = async (req, res) => {
  try {
    const { technologyId } = req.query;

    if (!technologyId || isNaN(Number(technologyId))) {
      const result = await query(`
        SELECT Facaulty_Id AS id, Facaulty_Name AS name, TechnologyId AS technologyId FROM Facaulty WHERE
        TechnologyId IS NOT Null`);

      return res.status(200).json({ data: result });
    }

    const { recordset } = await inputQuery(
      `SELECT Facaulty_Id AS id, Facaulty_Name AS name, TechnologyId AS technologyId FROM Facaulty
      WHERE TechnologyId = @technologyId`,
      ["technologyId"],
      [sqlTypes.int],
      [technologyId]
    );

    return res.status(200).json({ data: recordset });
  } catch (error) {
    console.error("SQL error", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Internal server error",
    });
  }
};

exports.fetchTechnologylist = async (req, res) => {
  try {
    const { recordset } = await inputQuery(
      `SELECT TechnologyID AS id, TechnologyName AS name FROM Technologies WHERE IsActive = 1`
    );

    return res.status(200).json({ data: recordset });
  } catch (error) {
    console.error("SQL error", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Internal server error",
    });
  }
};

exports.submitFacultyBatchAssignment = async (req, res) => {
  try {
    const { batchId, facultyId, userId: adminId } = req.body;

    if (!batchId || !facultyId || !adminId) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const _query = `EXEC USP_InsertInToAssignedBatches @BatchId=@batchId, @FacultyId=@facultyId, @AdminId=@adminId`;

    const { rowsAffected } = await inputQuery(
      _query,
      ["batchId", "facultyId", "adminId"],
      [sqlTypes.int, sqlTypes.int, sqlTypes.int],
      [batchId, facultyId, adminId]
    );

    return res.status(201).json(rowsAffected);
  } catch (error) {
    // gets 409 if there is duplicate
    if (error.message === "Already assigned") {
      return res
        .status(409)
        .json({ message: "The batch is already assigned to this faculty." });
    }

    res.status(500).json({
      error: "Internal server error",
      message: "Internal server error",
    });
  }
};

// Pending Approval

exports.submitPendingApproval = async (req, res) => {
  try {
    const _body = req.body;
    const { status } = _body;

    if (status?.toLowerCase() === "approved") {
      const { id, time, date } = _body;
      console.log(id, time, date);
    } else {
      console.log(_body);
    }

    return res.status(202).send();
  } catch (error) {
    console.error("SQL error", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Internal server error",
    });
  }
};

// Gets an facutly Id and have to fetch all assigned batches on that

/**
 * @returns {Object} {
    "data": [
        {
            "id": 1,
            "status": "pending",
            "approvalId": 3
        },
        {
            "id": 2,
            "status": "pending",
            "approvalId": 4
        }
    ]
}
 */
exports.fetchAssignedBatches = async (req, res) => {
  try {
    const { uid: facultyId } = req.query;

    const _query = `SELECT ID AS id, Status As status, AssignedBatchesId AS approvalId FROM BatchApproval WHERE FacultyId = @facultyId AND Status = 'pending'`;

    const { recordset } = await inputQuery(
      _query,
      ["facultyId"],
      [sqlTypes.int],
      [facultyId]
    );

    return res.status(202).json({ data: recordset });
  } catch (error) {
    console.error("SQL error", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Internal server error",
    });
  }
};

// recieves assignedBatchs Id
/**
 * @returns {Object} {
    "data": {
        "id": 3,
        "batchId": 5,
        "facultyId": 2,
        "facultyName": "Venkatesh",
        "batchName": "Batch 5",
        "technologyName": "DotNet"
    }
}
 */
exports.fetchAssignedBatchDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const _query = `EXEC USP_FetchAssignedBatchDetails @AssignedBatchesID=@id`;

    const { recordset } = await inputQuery(
      _query,
      ["id"],
      [sqlTypes.int],
      [id]
    );

    return res.status(202).json({ data: recordset[0] });
  } catch (error) {
    console.error("SQL error", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Internal server error",
    });
  }
};

exports.updateAssignedBatchStatus = async (req, res) => {
  try {
    const _body = req.body;
    const { status } = _body;

    if (status?.toLowerCase() === "approved") {
      const { id, time, date, status } = _body;

      console.log(_body);
      const _query = `
        EXEC USP_UpdateAssignedBatchStatus 
          @AssignedBatchesId = @id, 
          @Status = @status, 
          @Time = @time,
          @StartDate = @date`;

      const { rowsAffected } = await inputQuery(
        _query,
        ["id", "status", "time", "date"],
        [sqlTypes.int, sqlTypes.varchar, sqlTypes.varchar, sqlTypes.date],
        [id, status, time, date]
      );

      return res.status(200).json(rowsAffected);
    } else if (status?.toLowerCase() === "rejected") {
      const { id, comment, reason, status } = _body;

      const _query = `
        EXEC USP_UpdateAssignedBatchStatus 
          @AssignedBatchesId = @id, 
          @Status = @status, 
          @Comments = @comment, 
          @Reasons = @reason`;

      const { rowsAffected } = await inputQuery(
        _query,
        ["id", "status", "comment", "reason"],
        [sqlTypes.int, sqlTypes.varchar, sqlTypes.varchar, sqlTypes.varchar],
        [id, status, comment, reason]
      );

      return res.status(200).json(rowsAffected);
    } else {
      console.log(_body);
    }

    return res.status(400).send();
  } catch (error) {
    console.error("SQL error", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Internal server error",
    });
  }
};

/**
 *
 * @param {number} req.query.uid takes in an id of facultyId(should be in BatchDetails)
 * @returns {Array} [
    {
        "name": "batch1",
        "id": 1,
        "technologyName": "Java",
        "startDate": null,
        "time": null
    }
]
 */
exports.fetchApprovedBatchList = async (req, res) => {
  try {
    const { uid: id } = req.query;

    const _query = `
        SELECT
            bd.BatchName AS name,
            bd.BatchId AS id,
            t.TechnologyName AS technologyName,
            ab.StartDate AS startDate,
            ab.Time AS time,
            ab.ID AS assignedBatchesId
        FROM
            BatchDetailes AS bd
        JOIN
            Technologies AS t ON bd.TechnologyId = t.TechnologyID
        JOIN
            AssignedBatches AS ab ON bd.BatchId = ab.BatchId
        JOIN
            BatchApproval AS ba ON ab.ID = ba.AssignedBatchesId AND ba.Status = 'approved'
        WHERE
            ab.FacultyId = @id`;

    const { recordset } = await inputQuery(
      _query,
      ["id"],
      [sqlTypes.int],
      [id]
    );

    return res.status(200).json({ data: recordset });
  } catch (error) {
    console.error("SQL error", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Internal server error",
    });
  }
};

/**
 *
 * @param {uid} req.query id of faculty
 * @returns
 */
// Assigned Batches
exports.fetchApprovedCurriculumList = async (req, res) => {
  try {
    const { uid: id } = req.query;

    const _query = `
    SELECT
      courseCurriculam_Name AS name,
      curriculam_Id AS id
    FROM
      facultyCourse_curriculum
    WHERE
      facultyId = @id AND status = 'approved' AND IsActive = 1`;

    const { recordset } = await inputQuery(
      _query,
      ["id"],
      [sqlTypes.int],
      [id]
    );

    return res.status(200).json({ data: recordset });
  } catch (error) {
    console.error("SQL error", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Internal server error",
    });
  }
};

/**
 * Assign Curriculum when submmiting
 *
 * @param {Object} req.body {"uid": facultyId, "assignedBatchesid": id in AssignedBatches entity, "curriculumId": GUID of curriculum}
 * @returns
 */
exports.assignCurriculumToFaculty = async (req, res) => {
  try {
    const { uid, assignedBatchesId, curriculumId, startDate, time } = req.body;

    const _query = `EXEC USP_InsertIntoAssingedCurriculum
          @FacultyID = @uid,
          @AssignedBatchesID = @assignedBatchesId,
          @CurriculumID = @curriculumId,
          @StartDate = @startDate,
          @Time = @time
          `;

    const { recordset } = await inputQuery(
      _query,
      ["uid", "assignedBatchesId", "curriculumId", "startDate", "time"],
      [
        sqlTypes.int,
        sqlTypes.int,
        sqlTypes.uniqueidentifier,
        sqlTypes.date,
        sqlTypes.varchar,
      ],
      [uid, assignedBatchesId, curriculumId, startDate, time]
    );

    return res.status(200).json({ data: recordset });
  } catch (error) {
    if (error.message === "Already assigned") {
      return res.status(409).json({
        error: "Duplicate Data",
        message:
          "Curriculum is already assigned to this faculty for the given batch.",
      });
    }
    if (error.message === "Already reserved") {
      return res.status(409).json({
        error: "Duplicate Data",
        message:
          "Batch is already reserved for this faculty with another curriculum.",
      });
    }

    console.error(error);
    res.status(500).json({
      error: "Internal server error",
      message: "Internal server error",
    });
  }
};

/**
 *
 * @param {uid} req.query id of faculty
 * @returns
 */
// Assigned Batches
exports.fetchAssignedCurriculumList = async (req, res) => {
  try {
    const { uid: id } = req.query;

    const _query = `
      SELECT 
          a.ID AS id, 
          bd.BatchName AS batchName, 
          fcc.courseCurriculam_Name AS curriculumName, 
          ab.StartDate AS startDate, 
          ab.Time AS time
      FROM 
          AssignedCurriculum AS a
      JOIN 
          AssignedBatches AS ab ON a.AssignedBatchesId = ab.ID
      JOIN 
          BatchDetailes AS bd ON bd.BatchId = ab.BatchId
      JOIN 
          facultyCourse_curriculum AS fcc ON fcc.curriculam_Id = a.CurriculumId
      WHERE 
          a.FacultyId = @id;`;

    const { recordset } = await inputQuery(
      _query,
      ["id"],
      [sqlTypes.int],
      [id]
    );

    return res.status(200).json({ data: recordset });
  } catch (error) {
    console.error("SQL error", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Internal server error",
    });
  }
};

/**
 *
 * @param {number} req.query assignedCurriculum id for querying
 * @returns
 */
exports.fetchAssignedCurriculum = async (req, res) => {
  try {
    const { id } = req.query;

    const _query = `
          SELECT 
              ac.ID AS id,
              ac.AssignedBatchesId AS assignedBatchesId,
              fcc.curriculam_Id AS curriculumId,
              fcc.courseCurriculam_Name AS curriculumName,
              bd.BatchName AS batchName,
              	bd.BatchId AS batchId,
              ab.StartDate AS startDate,
              ab.Time AS time,
              t.TechnologyName AS technologyName
          FROM 
              AssignedCurriculum ac
          JOIN 
              AssignedBatches ab ON ac.AssignedBatchesId = ab.ID
          JOIN 
              facultyCourse_curriculum fcc ON fcc.curriculam_Id = ac.CurriculumId
          JOIN 
              BatchDetailes bd ON bd.BatchId = ab.BatchId
          JOIN
              Technologies t ON t.TechnologyID = bd.TechnologyId
          WHERE     
              ac.ID = @id;`;

    const { recordset } = await inputQuery(
      _query,
      ["id"],
      [sqlTypes.int],
      [id]
    );

    return res.status(200).json({ data: recordset[0] });
  } catch (error) {
    console.error("SQL error", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Internal server error",
    });
  }
};

exports.updateAssignedCurriculum = async (req, res) => {
  try {
    const {
      testDescription,
      testStartDate,
      testEndDate,
      testStartTime,
      testEndTime,
      status,
      AssessmentID,
      BatchId,
    } = req.body;

    if (!AssessmentID || !testDescription)
      return res
        .status(400)
        .json({ error: "Must pass all required fileds to do this operation" });

    const query = `EXEC USP_UpdatedAssingedCurriculum
          @testDescription=@testDescription,
          @testStartDate=@testStartDate,
          @testEndDate=@testEndDate,
          @testStartTime = @testStartTime,
          @testEndTime = @testEndTime,
          @status=@status
          @AssessmentID=@AssessmentID,
         @BatchId=@BatchId `;

    const result = await inputQuery(
      query,
      [
        "testDescription",
        "testStartDate",
        "testEndDate",
        "testStartTime",
        "testEndTime",
        "status",
        "AssessmentID",
        "BatchId",
      ],
      [
        sqlTypes.varchar,
        sqlTypes.date,
        sqlTypes.date,
        sqlTypes.time,
        sqlTypes.time,
        sqlTypes.varchar,
        sqlTypes.uniqueidentifier,
        sqlTypes.int,
      ],
      [
        testDescription,
        testStartDate,
        testEndDate,
        testStartTime,
        testEndTime,
        status,
        AssessmentID,
        BatchId,
      ]
    );
    res.status(200).json({
      data: result.rowsAffected[0],
      status: result.rowsAffected[0] === 1 ? true : false,
    });
  } catch (err) {
    console.log(err);
    if (
      err.message ===
      "A curriculum for the same faculty, date, and time already exists"
    ) {
      return res.status(409).json({
        error:
          "A curriculum for the same faculty, date, and time already exists",
        message: "Same curriculum already assigned to this batch.",
      });
    }
    if (err.message === "Already assigned") {
      return res.status(409).json({
        error: "Duplicate Data",
        message: "Same curriculum already assigned to this batch.",
      });
    }

    res.status(500).json({
      error: "Internal server error",
      message: "Internal server error",
    });
  }
};

exports.deleteAssignedCurriculum = async (req, res) => {
  try {
    const { id } = req.params;

    const _query = `DELETE FROM AssignedCurriculum WHERE ID = @id`;

    const { rowsAffected } = await inputQuery(
      _query,
      ["id"],
      [sqlTypes.int],
      [id]
    );

    return res.status(200).send(`${rowsAffected?.[0] || 0}`);
  } catch (error) {
    console.error("SQL error", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Internal server error",
    });
  }
};

exports.fetchAdminAssignedBatches = async (req, res) => {
  try {
    const _query = `
          SELECT 
              ba.ID AS id, 
              ab.StartDate AS startDate, 
              ab.Time AS time, 
              f.Facaulty_Name AS facultyName, 
              ba.AdminId AS createdBy, 
              bd.BatchName AS batchName,
            ba.Status AS status,
            ba.Reasons AS reasons,
            ba.Comment AS comments
          FROM 
              AssignedBatches AS ab
          INNER JOIN 
              BatchApproval AS ba ON ba.AssignedBatchesId = ab.ID
          INNER JOIN 
              Facaulty AS f ON f.Facaulty_Id = ba.FacultyId
          INNER JOIN 
              BatchDetailes AS bd ON bd.BatchId = ab.BatchId;`;

    const result = await query(_query);

    return res.status(200).send({ data: result });
  } catch (error) {
    console.error("SQL error", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Internal server error",
    });
  }
};

exports.deleteAssignedBatchByBatchApproval = async (req, res) => {
  try {
    const { id } = req.params;
    // user id in this case admin id cause he is the one sending request
    const { uid } = req.query;

    if (!uid) {
      return res.status(400).json({ error: "Invalid Request" });
    }

    const _query = `EXEC DeleteAssignedBatch @ID=@id, @AdminID=@uid`;

    const { rowsAffected } = await inputQuery(
      _query,
      ["id", "uid"],
      [sqlTypes.int, sqlTypes.int],
      [id, uid]
    );

    return res.status(200).send(`${rowsAffected?.[0] || 0}`);
  } catch (error) {
    console.error("SQL error", error);

    if (
      error.message ===
      "SQL error Cannot delete record because BatchApproval status is approved."
    ) {
      return res.status(403).json({
        error: "Coudn't execute action",
        message: "can not delete record because BatchApproval is approved.",
      });
    } else if (error.message === "Not Authorized") {
      return res.status(403).json({
        error: "Coudn't execute action",
        message: "you do not have permission to perform this operation",
      });
    }

    res.status(500).json({
      error: "Internal server error",
      message: "Internal server error",
    });
  }
};
