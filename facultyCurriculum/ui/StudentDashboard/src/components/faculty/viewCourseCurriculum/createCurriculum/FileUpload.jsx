import React from "react";
import * as XLSX from "xlsx";
import { Button, Typography, Stack, Snackbar, Alert } from "@mui/material";
import { styled } from "@mui/material/styles";

const Input = styled("input")({
  display: "none",
});

export default function FileUpload({ setTableData }) {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });

      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

      const transformedData = data.slice(1).map((row) => ({
        sessionNumber: row[0],
        topics: row[1],
        subTopics: row[2],
      }));

      setTableData((prev) => [...prev, ...transformedData]);
      setMessage("File uploaded successfully");
      setOpen(true);
    };
    if (file) {
      reader.readAsBinaryString(file);
    } else {
      setMessage("No file selected");
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack>
      <label htmlFor="file-upload">
        <Input
          id="file-upload"
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileUpload}
        />
        <Button
          variant="contained"
          component="span"
          size="large"
          sx={{
            textTransform: "none",
          }}
        >
          Upload File
        </Button>
      </label>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={message.includes("error") ? "error" : "success"}
        >
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
