const { sqlTypes } = require("../config/types");
const { inputQuery } = require("../util/database");

// exports.insertstudents = async (req, res) => {
//   const { FirstName, LastName, Email, PhoneNumber, TechnologyName, Password } =
//     req.body;

//   // Validate required fields
//   if (
//     !FirstName ||
//     !LastName ||
//     !Email ||
//     !PhoneNumber ||
//     !TechnologyName ||
//     !Password
//   ) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   try {
//     const query = `EXEC [dbo].[AddStudentWithTechnology]
//         @FirstName, @LastName, @Email, @PhoneNumber, @TechnologyName,@Password`;

//     // Assuming inputQuery is a function that executes SQL queries
//     await inputQuery(
//       query,
//       [
//         "FirstName",
//         "LastName",
//         "Email",
//         "PhoneNumber",
//         "TechnologyName",
//         "Password",
//       ],
//       [
//         sqlTypes.varchar,
//         sqlTypes.varchar,
//         sqlTypes.varchar,
//         sqlTypes.varchar,
//         sqlTypes.varchar,
//         sqlTypes.varchar,
//       ],
//       [FirstName, LastName, Email, PhoneNumber, TechnologyName, Password],
//       { output: ["message"], outputTypes: [sqlTypes.varchar] }
//     );

//     res.status(200).json({ message: "Data inserted/updated successfully" });
//   } catch (err) {
//     console.error("SQL error", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

exports.insertstudents = async (req, res) => {
  const { FirstName, LastName, Email, PhoneNumber, TechnologyName, Password } =
    req.body;

  // Validate required fields
  if (!FirstName || !Email || !TechnologyName || !Password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const query = `EXEC [dbo].[AddStudentWithTechnology]
      @FirstName, @LastName, @Email, @PhoneNumber, @TechnologyName, @Password, @message OUTPUT`;

    // Execute the query and get the result
    const result = await inputQuery(
      query,
      [
        "FirstName",
        "LastName",
        "Email",
        "PhoneNumber",
        "TechnologyName",
        "Password",
      ],
      [
        sqlTypes.varchar,
        sqlTypes.varchar,
        sqlTypes.varchar,
        sqlTypes.varchar,
        sqlTypes.varchar,
        sqlTypes.varchar,
      ],
      [FirstName, LastName, Email, PhoneNumber, TechnologyName, Password],
      { output: ["message"], outputTypes: [sqlTypes.varchar] }
    );

    const message = result.output?.message;

    // Handle specific error messages
    if (message) {
      if (message.toLowerCase().includes("invalid password")) {
        return res.status(401).json({ error: message });
      } else if (message.toLowerCase().includes("student is already existed")) {
        return res.status(402).json({ error: message });
      }
    }

    // If no specific errors, respond with success
    res
      .status(200)
      .json({ message: message || "Operation completed successfully" });
  } catch (err) {
    console.error("SQL error", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
