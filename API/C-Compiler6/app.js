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
  const userCode = req.body.Code;
  const inputs = req.body.Parameters;
  console.log("hit");

  // Check if user code contains void main
  if (containsVoidMain(userCode)) {
    const output =
      "Using 'void main()' is not allowed. Please use 'int main()' instead.";
    res.status(201).send({ responseCode: 201, output, errorMessage: "" });
    return;
  }

  // Check if user code requires input
  const needsInput = requiresUserInput(userCode);
  console.log("check input validation");

  // Validate inputs
  if (
    needsInput &&
    (!inputs || inputs.length === 0 || inputs.every((input) => !input.trim()))
  ) {
    const errorMessage =
      "Invalid Input Value, Click the AddInput button and enter the value";
    res.status(201).send({ responseCode: 203, errorMessage, output: "" });
    return;
  }

  // Generate a unique identifier for the user
  const userName = crypto.randomBytes(8).toString("hex");
  const userDir = path.join(__dirname, "temp", userName);
  const fileName = path.join(userDir, `${userName}.c`);
  const inputFileName = path.join(userDir, `${userName}_input.txt`);
  const outputFileName = path.join(userDir, `${userName}.out`);

  // Create a unique temporary directory for the user
  fs.mkdir(userDir, { recursive: true }, (err) => {
    if (err) {
      res
        .status(500)
        .send({ responseCode: 500, errorMessage: "Directory Creation Failed" });
      return;
    }

    // Write user code to a file
    fs.writeFile(fileName, userCode, (err) => {
      if (err) {
        res
          .status(500)
          .send({ responseCode: 500, errorMessage: "Code File Write Failed" });
        return;
      }

      // Write inputs if needed
      if (needsInput) {
        fs.writeFile(inputFileName, inputs.join("\n"), (err) => {
          if (err) {
            res.status(500).send({
              responseCode: 500,
              errorMessage: "Input File Write Failed",
            });
            return;
          }
          compileAndRun();
        });
      } else {
        compileAndRun();
      }
    });
  });

  function compileAndRun() {
    // Compile the C code
    const compileCommand = `gcc ${fileName} -o ${outputFileName}`;
    exec(compileCommand, (compileError, compileStdout, compileStderr) => {
      if (compileError) {
        console.error("Compile Error:", compileStderr);

        const errorMessage = formatErrorMessage(compileStderr);
        res
          .status(201)
          .send({ responseCode: 202, errorMessage, output: errorMessage });
        return;
      }

      // Execute the compiled program with a timeout
      const command = needsInput
        ? `${outputFileName} < ${inputFileName}`
        : outputFileName;

      const child = exec(
        command,
        { timeout: 5000, maxBuffer: 1024 * 1024 },
        (runError, stdout, stderr) => {
          if (runError) {
            console.error("Run Error:", stderr);

            res.status(201).send({
              responseCode: 202,
              output: stderr || "Execution timed out",
              errorMessage: "",
            });
          } else {
            res.send({
              responseCode: 201,
              output: stdout,
              errorMessage: "",
            });
          }

          // Clean up the files after execution
          cleanupFiles();
        }
      );

      // Handle process timeout manually (in case exec doesn't handle it)
      child.on("error", (err) => {
        console.error("Process Error:", err);
        cleanupFiles();
      });
    });
  }

  function cleanupFiles() {
    // Remove the temporary directory and its contents
    fs.rm(userDir, { recursive: true, force: true }, (err) => {
      if (err) {
        console.error("Error cleaning up files:", err);
      }
    });
  }
});

// Function to check if the code contains void main
function containsVoidMain(userCode) {
  const voidMainPattern = /void\s+main\s*\(\s*\)/;
  return voidMainPattern.test(userCode);
}

// Function to check if input is required based on user code
function requiresUserInput(userCode) {
  return (
    userCode.includes("scanf") ||
    userCode.includes("gets") ||
    userCode.includes("getchar")
  );
}

// Function to format error message
function formatErrorMessage(stderr) {
  const lines = stderr.split("\n");
  const errorLines = lines.filter((line) => line.includes(".c:"));
  if (errorLines.length > 0) {
    return errorLines
      .map((line) => {
        const startIndex = line.indexOf(".c:") + 4;
        return line.substring(startIndex);
      })
      .join("\n");
  }
  return stderr;
}

const PORT = 3026;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
