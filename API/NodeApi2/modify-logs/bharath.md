# ADD REPLACE ALL

- replace hash symbol with hyphen

**get_StudentReport**

```
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
} finally {
sql.close();
}
});

```

**studentReport_Technology**

```
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
  } finally {
    sql.close();
  }
});
```

**get_StudentReport_module**

```
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
  } finally {
    sql.close();
  }
});
```

**get_StudentReport_Topic**

```
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
  } finally {
    sql.close();
  }
});
```