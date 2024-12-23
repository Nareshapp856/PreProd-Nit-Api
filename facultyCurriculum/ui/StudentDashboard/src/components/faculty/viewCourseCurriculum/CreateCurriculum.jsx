import React, { useState } from "react";
import {
  TextField,
  Button,
  Stack,
  Container,
  Typography,
  Paper,
} from "@mui/material";
import TableofApproval from "../createCurriculum/TableofApproval";
import FileUpload from "./createCurriculum/FileUpload";

function CreateCurriculum() {
  const [curriculumName, setCurriculumName] = useState("");
  const [tableData, setTableData] = useState([]);
  const [nameError, setNameError] = useState("");

  const handleSubmit = () => {
    if (!curriculumName.trim()) {
      setNameError("Curriculum Name is required");
      return;
    }

    // Handle the submission logic here
    alert("Curriculum submitted successfully");
  };

  return (
    <Container>
      <div className="w-full">
        <Typography variant="h5" gutterBottom>
          Create Curriculum
        </Typography>

        <Stack spacing={2}>
          {/* Curriculum Name Input */}
          <TextField
            id="curriculum-name"
            label="Create Curriculum Name"
            variant="outlined"
            fullWidth
            value={curriculumName}
            onChange={(e) => {
              setCurriculumName(e.target.value);
              if (nameError) setNameError("");
            }}
            error={!!nameError}
            helperText={nameError}
          />

          <FileUpload setTableData={setTableData} />

          <TableofApproval tableData={tableData} setTableData={setTableData} />

          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Stack>
      </div>
    </Container>
  );
}

export default CreateCurriculum;
