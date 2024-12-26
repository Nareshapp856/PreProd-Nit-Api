const { v4: uuidv4 } = require("uuid");
const studentService = require("../services/studentService");
const { query, inputQuery } = require("../util/database");
const cache = require("../services/cache");

// Simple get method
exports.getStudents = async (req, res) => {
  try {
    const result = await query("EXEC Usp_Get_Student_GeneratePassword");

    res.json(result);
  } catch (error) {
    res.status(500).send("An error occurred");
  }
};

exports.performActions = async (req, res) => {
  const { actions, students } = req.body;

  if (!actions || !students) {
    const errorMessage =
      "Both 'actions' and 'students' are required in the request body.";
    const chalk = (await import("chalk")).default;
    console.log(chalk.red(`ERROR: ${errorMessage}`));
    return res.status(400).json({ status: "error", message: errorMessage });
  }

  try {
    const chalk = (await import("chalk")).default;
    console.log(
      chalk.blue(`Performing actions: ${actions} on students: ${students}`)
    );

    const query = `EXEC Usp_ValidationEmail_SendPassword @UserMail = @UserMail`;

    const actionId = uuidv4();

    const { recordset: studentData } = await inputQuery(
      query,
      ["UserMail"],
      ["VarChar"],
      [students]
    );

    const result = await studentService.performActions(
      actions?.split(",") || [],
      studentData,
      actionId
    );

    cache.set(result.id, result);

    console.log(chalk.green(`Actions performed successfully`));
    res.status(200).json(result);
  } catch (error) {
    const chalk = (await import("chalk")).default;
    console.log(chalk.red(`ERROR: ${error.message}`));
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Endpoint to get the status of a task by ID
exports.getActionStatus = (req, res) => {
  const { id } = req.params;

  const status = cache.get(id);
  // console.log("api", id, status);
  if (status) {
    return res.json(status);
  } else {
    return res.status(404).json({ status: "error", message: "Task not found" });
  }
};
