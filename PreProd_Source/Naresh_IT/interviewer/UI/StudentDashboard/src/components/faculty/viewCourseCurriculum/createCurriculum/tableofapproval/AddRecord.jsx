import React, { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";

function AddRecord({ newRecord, setNewRecord, editRecord, handleAddRecord }) {
  const [errors, setErrors] = useState({
    sessionNumber: false,
    topics: false,
    subTopics: false,
  });

  const validateFields = () => {
    const newErrors = {
      sessionNumber: !newRecord.sessionNumber,
      topics: !newRecord.topics,
      subTopics: !newRecord.subTopics,
    };

    setErrors(newErrors);

    // Return true if all fields are valid
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = () => {
    if (validateFields()) {
      handleAddRecord();
    }
  };

  return (
    <Stack direction="row" spacing={2}>
      <TextField
        required
        label="Session Number"
        value={newRecord.sessionNumber}
        onChange={(e) =>
          setNewRecord({ ...newRecord, sessionNumber: e.target.value })
        }
        variant="outlined"
        size="small"
        error={errors.sessionNumber}
        helperText={errors.sessionNumber && "Session Number is required"}
        disabled={!!editRecord} // Disable input if editing
      />
      <TextField
        required
        label="Topic"
        value={newRecord.topics}
        onChange={(e) => setNewRecord({ ...newRecord, topics: e.target.value })}
        variant="outlined"
        size="small"
        error={errors.topics}
        helperText={errors.topics && "Topic is required"}
      />
      <TextField
        required
        label="Sub Topic"
        value={newRecord.subTopics}
        onChange={(e) =>
          setNewRecord({ ...newRecord, subTopics: e.target.value })
        }
        variant="outlined"
        size="small"
        error={errors.subTopics}
        helperText={errors.subTopics && "Sub Topic is required"}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ alignSelf: "center" }}
      >
        {editRecord ? "Update Record" : "Add Record"}
      </Button>
    </Stack>
  );
}

export default AddRecord;
