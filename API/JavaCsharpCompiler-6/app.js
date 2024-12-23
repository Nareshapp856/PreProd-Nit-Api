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
  const language = req.body.Language;
  const programName = req.body.ProgramName.replaceAll(" ", "");

  if (!userCode || !language || !programName) {
    res.status(400).send({
      responseCode: 400,
      errorMessage: "Code, language, or program name is missing",
      output: "",
    });
    return;
  }

  console.log("Received program:");
  console.log(userCode);
  console.log("With parameters:");
  console.log(inputs);
  console.log("Language:");
  console.log(language);

  // Check if user code requires input
  const needsInput = requiresUserInput(userCode, language);

  // Generate a unique identifier for the username
  const userName = crypto.randomBytes(8).toString("hex");
  const userDir = path.join(__dirname, "tempjava", userName);
  const fileName = path.join(
    userDir,
    `${programName}.${getFileExtension(language)}`
  );
  const inputFileName = path.join(userDir, `${userName}_input.txt`);
  const outputFileName = path.join(userDir, `${userName}.exe`);

  // Create a unique temporary directory for the user
  fs.mkdirSync(userDir, { recursive: true });

  // Write the user code and inputs to temporary files
  fs.writeFileSync(fileName, userCode);
  if (inputs && inputs.length > 0) {
    fs.writeFileSync(inputFileName, inputs.join("\n"));
  }

  // Check if input is required but not provided
  if (needsInput && (!inputs || inputs.length === 0 || inputs[0] === "")) {
    const warningMessage =
      "Parameters empty provided, click on Add Input button and provide the value";
    res
      .status(201)
      .send({ responseCode: 201, errorMessage: "", output: warningMessage });
    return;
  }

  // Check if the class name in Java matches the program name
  if (
    language === "java" &&
    !isClassNameMatchingProgramName(userCode, programName)
  ) {
    const warningMessage = "class name should be program name";
    res
      .status(201)
      .send({ responseCode: 201, errorMessage: "", output: warningMessage });
    return;
  }

  // Compile and execute the code based on the language
  compileAndExecute(
    userDir,
    fileName,
    inputFileName,
    outputFileName,
    language,
    needsInput,
    programName,
    inputs,
    res
  );
});

// Function to check if input is required based on user code
function requiresUserInput(userCode, language) {
  switch (language) {
    case "csharp":
      return userCode.includes("Console.ReadLine");
    case "java":
      return userCode.includes("Scanner");
    case "python":
      return userCode.includes("input(");
    case "c":
      return userCode.includes("scanf");
    default:
      return false;
  }
}

// Function to check if class name in Java matches the program name
function isClassNameMatchingProgramName(userCode, programName) {
  const classNameMatch = userCode.match(/public class (\w+)/);
  return classNameMatch && classNameMatch[1] === programName;
}

// Function to format error message
function formatErrorMessage(stderr) {
  const lines = stderr.split("\n");
  const errorMessages = lines
    .filter((line) => line.includes("error:"))
    .map((line) => {
      const errorMessageMatch = line.match(/:(\d+):\s+error:\s+(.*)/);
      return errorMessageMatch
        ? `Line ${errorMessageMatch[1]}: ${errorMessageMatch[2]}`
        : line;
    });
  return errorMessages.join("\n");
}

// Function to get the file extension based on the language
function getFileExtension(language) {
  switch (language) {
    case "java":
      return "java";
    case "csharp":
      return "cs";
    case "javascript":
      return "js";
    case "python":
      return "py";
    case "c":
      return "c";
    default:
      return "";
  }
}

// Function to compile and execute the code
function compileAndExecute(
  userDir,
  fileName,
  inputFileName,
  outputFileName,
  language,
  needsInput,
  programName,
  inputs,
  res
) {
  let compileCommand;
  let runCommand;

  switch (language) {
    case "java":
      compileCommand = `javac ${fileName}`;
      runCommand = `java -cp ${userDir} ${programName}`;
      break;
    case "csharp":
      compileCommand = `"C:\\Windows\\Microsoft.NET\\Framework\\v4.0.30319\\csc.exe" /out:${outputFileName} ${fileName}`;
      runCommand = outputFileName;
      break;
    case "javascript":
      runCommand = `node ${fileName}`;
      break;
    case "python":
      runCommand = `python ${fileName}`;
      break;
    case "c":
      compileCommand = `gcc ${fileName} -o ${outputFileName}`;
      runCommand = outputFileName;
      break;
    default:
      res.status(400).send({
        responseCode: 400,
        errorMessage: "Unsupported language",
        output: "",
      });
      return;
  }

  if (compileCommand) {
    exec(compileCommand, (compileError, compileStdout, compileStderr) => {
      if (compileError) {
        console.error("Compile Error:", compileStderr);
        const errorMessage = formatErrorMessage(compileStderr);
        res
          .status(200)
          .send({ responseCode: 202, errorMessage, output: errorMessage });
        return;
      }

      const execOptions = { timeout: 5000, maxBuffer: 1024 * 1024 };

      if (needsInput) {
        const childProcess = exec(
          runCommand,
          execOptions,
          (runError, stdout, stderr) => {
            if (runError) {
              console.error("Run Error:", stderr);
              const errorMessage = formatErrorMessage(stderr);
              res.status(200).send({
                responseCode: 202,
                output: errorMessage,
                errorMessage: "",
              });
            } else {
              res.send({ responseCode: 201, output: stdout, errorMessage: "" });
            }
          }
        );
        childProcess.stdin.end(inputs.join("\n"));
      } else {
        exec(runCommand, execOptions, (runError, stdout, stderr) => {
          if (runError) {
            console.error("Run Error:", stderr);
            const errorMessage = formatErrorMessage(stderr);
            res.status(200).send({
              responseCode: 202,
              output: errorMessage,
              errorMessage: "",
            });
          } else {
            res.send({ responseCode: 201, output: stdout, errorMessage: "" });
          }
        });
      }
    });
  } else {
    const execOptions = { timeout: 5000, maxBuffer: 1024 * 1024 };

    if (needsInput) {
      const childProcess = exec(
        runCommand,
        execOptions,
        (runError, stdout, stderr) => {
          if (runError) {
            console.error("Run Error:", stderr);
            const errorMessage = formatErrorMessage(stderr);
            res.status(200).send({
              responseCode: 202,
              output: errorMessage,
              errorMessage: "",
            });
          } else {
            res.send({ responseCode: 201, output: stdout, errorMessage: "" });
          }
        }
      );
      childProcess.stdin.end(inputs.join("\n"));
    } else {
      exec(runCommand, execOptions, (runError, stdout, stderr) => {
        if (runError) {
          console.error("Run Error:", stderr);
          const errorMessage = formatErrorMessage(stderr);
          res.status(200).send({
            responseCode: 202,
            output: errorMessage,
            errorMessage: "",
          });
        } else {
          res.send({ responseCode: 201, output: stdout, errorMessage: "" });
        }
      });
    }
  }
}

const PORT = 3036;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
