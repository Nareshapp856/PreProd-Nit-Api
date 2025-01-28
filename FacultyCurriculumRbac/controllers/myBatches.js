const { sqlTypes } = require("../config/types");
const { inputQuery, query } = require("../util/database");

exports.insertBatchDetails = async (req, res) => {
  try {
    const { curriculamId, batchId, startDate, slotDetails } = req.body;

    const query1 = `EXEC InsertCourseBatchDetails @Curriculam_Id, @Batchid, @StartDate, @SlotDetails`;
    const query2 = `EXEC ScheduleExamsForBatch @Curriculam_Id, @Batchid`;

    const result1 = await inputQuery(
      query1,
      ["Curriculam_Id", "Batchid", "StartDate", "SlotDetails"],
      ["UniqueIdentifier", "Int", "Date", "VarChar"],
      [curriculamId, batchId, startDate, slotDetails]
    );

    const result2 = await inputQuery(
      query2,
      ["Curriculam_Id", "Batchid"],
      ["UniqueIdentifier", "Int"],
      [curriculamId, batchId]
    );

    res.status(201).json({ message: "Batch details inserted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
    console.error("SQL error", err?.message || err);
  }
};

exports.fetchCourseDetails = async (req, res) => {
  try {
    const { userId: facultyId } = req.params;

    const query = "EXEC FetchCourseBatchDetails @facultyId";
    const result = await inputQuery(
      query,
      ["facultyId"],
      [sqlTypes.int],
      [facultyId]
    );

    res.json({ data: result.recordset });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred");
  }
};
