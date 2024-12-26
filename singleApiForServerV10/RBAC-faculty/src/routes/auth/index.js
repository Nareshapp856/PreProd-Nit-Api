const express = require("express");
const jwt = require("jsonwebtoken");

const { inputQuery } = require("../../util/database");
const { sqlTypes } = require("../../config/types");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const _query = `SELECT * FROM NareshItUsers WHERE Email=@Email`;
  const { recordset } = await inputQuery(
    _query,
    ["Email"],
    [sqlTypes.varchar],
    [email]
  );

  const user = recordset[0];

  if (!user) {
    return res
      .status(401)
      .json({ IsAuthenticated: false, Message: "Invalid Email or Password" });
  }

  const {
    Email: userMail,
    Role: role,
    FristName: firstName,
    LastName: lastName,
    UserId: id,
  } = user;

  if (!userMail || !role) {
    return res.status(500).json({ Message: "Internal Server Error" });
  }

  const accessToken = jwt.sign(
    { usermail: userMail, role },
    process.env.JWT_ADMIN_ACCESS_TOKEN_SECREAT,
    { expiresIn: "15s" }
  );

  const refreshToken = jwt.sign(
    { usermail: userMail, role },
    process.env.JWT_ADMIN_REFRESH_TOKEN_SECREAT
  );

  res.json({
    email: userMail,
    role,
    firstName,
    lastName,
    id,
    RT: refreshToken,
    userName: `${firstName} ${lastName}`,
  });
});

module.exports = router;
