const fs = require("fs");
const { exec } = require("child_process");
const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const path = require("path");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/", (req, res) => {
  const userCode = req.body.code;
  const inputs = req.body.Parameters;
  console.log('hit');

  // Check if user code requires input
  const needsInput = requiresUserInput(userCode);
console.log('check input validaation');
console.log(inputs.length);
 console.log(needsInput);
  // Validate inputs
  if (needsInput && (!inputs || inputs.length === 0 || inputs.every(input => !input.trim()))) {
    const errorMessage = "Invalid Input Value, Click the AddInput button and enter the value";
    res.status(200).send({ responseCode: 203, errorMessage, output: "" });
    return;
  }
  // Generate a unique identifier for the username
  const userName = crypto.randomBytes(8).toString("hex");
  const userDir = path.join(__dirname, "temp", userName);
  const fileName = path.join(userDir, `${userName}.c`);
  const inputFileName = path.join(userDir, `${userName}_input.txt`);
  const outputFileName = path.join(userDir, `${userName}.out`);

  // Create a unique temporary directory for the user
  fs.mkdirSync(userDir, { recursive: true });

  // Write the user code and inputs to temporary files
  fs.writeFileSync(fileName, userCode);
  if (needsInput) {
    fs.writeFileSync(inputFileName, inputs.join("\n"));
  }

  // Compile and execute the C code
  const compileCommand = `gcc ${fileName} -o ${outputFileName}`;
  exec(compileCommand, (compileError, compileStdout, compileStderr) => {
    if (compileError) {
      console.error("Compile Error:", compileStderr);

      // Format the compile error message
      const errorMessage = formatErrorMessage(compileStderr);
      res.status(200).send({ responseCode: 202, errorMessage, output: errorMessage });
      return;
    }

    // Execute the compiled program
    const command = needsInput ? `${outputFileName} < ${inputFileName}` : outputFileName;
    exec(command, { timeout: 5000, maxBuffer: 1024 * 1024 }, (runError, stdout, stderr) => {
      if (runError) {
        console.error("Run Error:", stderr);

        // Send the stderr as the output in case of run error
        res.status(200).send({ responseCode: 202, output: stderr, errorMessage: "" });
      } else {
        res.send({ responseCode: 201, output: stdout, errorMessage: "" });
      }
    });
  });
});

// Function to check if input is required based on user code
function requiresUserInput(userCode) {
  return userCode.includes("scanf") || userCode.includes("gets") || userCode.includes("getchar");
}

// Function to format error message
function formatErrorMessage(stderr) {
  // Extract meaningful error information if available
  const lines = stderr.split("\n");
  const errorLines = lines.filter(line => line.includes(".c:"));
  if (errorLines.length > 0) {
    return errorLines.map(line => {
      const startIndex = line.indexOf(".c:") + 4; // Adjust index based on your error format
      return line.substring(startIndex);
    }).join("\n");
  }
  return stderr; // Return original stderr if no specific format found
}

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
