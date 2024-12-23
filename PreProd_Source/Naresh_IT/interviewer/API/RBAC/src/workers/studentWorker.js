const { parentPort, workerData } = require("worker_threads");
const { sendEmail } = require("../util/emailUtils");
const cache = require("../services/cache");

async function sendEmailHelper(student) {
  const html = `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to [Your Website Name]</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #333;
            line-height: 1.6;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background: #f9f9f9;
            border-radius: 5px;
        }
        .header {
            background: #007BFF;
            color: #fff;
            padding: 10px;
            text-align: center;
            border-radius: 5px 5px 0 0;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 0.9em;
            color: #666;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            color: #fff;
            background: #007BFF;
            text-decoration: none;
            border-radius: 5px;
        }
        .button:hover {
            background: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to NareshIT</h1>
        </div>
        <p>Dear ${student.email},</p>
        <p>We are pleased to have you on board! To help you get started, we have created an initial password for your account.</p>
        <p><strong>Initial Password:</strong> ${student.password}</p>
        <p>Please log in using the following link and change your password to something more secure:</p>
        <a href="http://localhost:3018/login/reset-initial-password?e=${student.email}" class="button">Log In</a>
        <p>After logging in, you will be prompted to update your password. Be sure to choose a strong password that you haven't used elsewhere.</p>
        <p>Thank you for joining us!</p>
        <p>Best regards,<br>NareshIT DEV Team</p>
        <div class="footer">
            <p>&copy; 2024 NareshITDEV. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
  `;

  return await sendEmail(
    student.email,
    1,
    "NareshIT Initial Password",
    "",
    html
  );
}

const performActionsOnStudents = async (actions, students, id) => {
  try {
    // stores object with students email as key and status as value
    const resultObject = {};

    cache.set(id, {
      status: "pending",
      message: "Actions performed successfully",
      id,
      result: resultObject,
    });

    console.log("in", cache.get(id));
    parentPort.postMessage({
      status: "pending",
      message: "Actions Being Performed",
      type: "performActionsOnStudents",
      id,
      result: resultObject,
    });
    console.log("hi");
    for (const action of actions) {
      for (const student of students) {
        const res = await performAction(action, student);
        resultObject[student.email] = res;
      }
    }

    parentPort.postMessage({
      status: "success",
      message: "Actions performed successfully",
      type: "performActionsOnStudents",
      id,
      result: resultObject,
    });

    console.log("out", cache.get(id));
  } catch (error) {
    parentPort.postMessage({ status: "error", message: error.message });
  }
};

const performAction = async (action, student) => {
  switch (action) {
    case "sendinitialpasswordmail":
      return await sendEmailHelper(student);

    default:
      throw new Error("Unknown action");
  }
};

performActionsOnStudents(
  workerData.actions,
  workerData.students,
  workerData.id
);
