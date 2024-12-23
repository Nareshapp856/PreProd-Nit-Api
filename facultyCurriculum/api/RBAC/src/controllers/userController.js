const { sqlTypes } = require("../config/types");
const { inputQuery, query } = require("../util/database");

// Get Users
exports.getUsers = async (req, res) => {
  try {
    const _query = `SELECT FristName AS firstName,
     LastName AS lastName,
     Email AS email,
     Phone AS phone,
     Role AS role,
     IsActive AS userState,
     UserId AS userId
     FROM NareshItUsers`;

    const result = await query(_query);

    res.status(200).json({ data: result });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    const {
      userId: UserId,
      firstName: FristName,
      lastName: LastName,
      email: Email,
      phone: Phone,
      role: Role,
      userState: IsActive,
    } = req.body;

    const query = `EXEC [dbo].[UpdateNareshItUser]
      @UserId,
      @FristName,
      @LastName,
      @Email,
      @Phone,
      @Role,
      @IsActive
      `;
    const inputs = [
      "UserId",
      "FristName",
      "LastName",
      "Email",
      "Phone",
      "Role",
      "IsActive",
    ];
    const types = [
      sqlTypes.uniqueidentifier,
      sqlTypes.varchar,
      sqlTypes.varchar,
      sqlTypes.varchar,
      sqlTypes.varchar,
      sqlTypes.varchar,
      sqlTypes.bit,
    ];
    const parameters = [
      UserId,
      FristName,
      LastName,
      Email,
      Phone,
      Role,
      IsActive,
    ];

    const result = await inputQuery(query, inputs, types, parameters);

    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred");
  }
};

// Add User
exports.addUser = async (req, res) => {
  try {
    const {
      firstName: FristName,
      lastName: LastName,
      email: Email,
      phone: Phone,
      role: Role,
    } = req.body;

    const query = `EXEC [dbo].[InsertNareshItUser]
      @FristName,
      @LastName,
      @Email,
      @Phone,
      @Role
      `;
    const inputs = ["FristName", "LastName", "Email", "Phone", "Role"];
    const types = [
      sqlTypes.varchar,
      sqlTypes.varchar,
      sqlTypes.varchar,
      sqlTypes.varchar,
      sqlTypes.varchar,
    ];
    const parameters = [FristName, LastName, Email, Phone, Role];

    const result = await inputQuery(query, inputs, types, parameters);

    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred");
  }
};
