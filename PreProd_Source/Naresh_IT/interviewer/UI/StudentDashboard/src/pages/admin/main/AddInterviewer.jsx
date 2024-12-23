import React, { useEffect, useState } from "react";
import { Button, FormControl, TextField, Snackbar, Alert } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import InterviewerTable from "../../../components/admin/addInterviewer/InterviewerTable";
import { useAddInterviewer } from "../../../hooks/admin/useAddInterviewer";
import {
  fetchInterviewersAndBatchesAPI,
  submitAddInterviewerAPI,
} from "../../../services/api";

// Fetch interviewer data from API
const fetchInterviewerData = async (setter) => {
  try {
    const res = await fetchInterviewersAndBatchesAPI();
    setter(res.data);
  } catch (error) {
    console.error(error);
  }
};

const initialFormData = {
  technology: null,
  batch: [],
  interviewer: null,
};

function AddInterviewer() {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(initialFormData);
  const [_interviewerList, setInterviewerList] = useState([]);

  const [batchList, technologyList, interviewerList] = useAddInterviewer({
    techId: formData.technology?.id || null,
  });

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Update form data to handle autocomplete selections
  const onAutoCompleteChange = (name) => (event, value) => {
    if (name !== "technology") {
      return setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Resetting other props if user selected technology
    return setFormData((prev) => ({
      ...initialFormData,
      technology: value,
    }));
  };

  const onSubmit = async () => {
    try {
      const res = await submitAddInterviewerAPI({
        interviewer: formData.interviewer?.id,
        batches: formData.batch?.map((batch) => batch.id),
      });

      setSnackbarMessage("Data uploaded successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      fetchInterviewerData(setInterviewerList);
    } catch (error) {
      setSnackbarMessage("Something went wrong.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const editInterviewer = (interviewerId, batches = []) => {
    const _interviewer = interviewerList?.find(
      (interviewer) => interviewer?.id === interviewerId
    );
    const _batches = batches.map((batchId) =>
      batchList?.find((batch) => batch?.id === batchId)
    );

    setFormData((prev) => ({
      ...prev,
      interviewer: _interviewer,
      batch: _batches,
    }));
  };


  return (
    <div>
      <div className="flex flex-wrap justify-between gap-y-8">
        {/* Technology Autocomplete */}
        <div className="w-[24rem]">
          <Autocomplete
            id="technology-autocomplete"
            options={technologyList}
            getOptionLabel={(option) => option.name}
            value={formData.technology}
            onChange={onAutoCompleteChange("technology")}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Technology"
                error={!!errors.technology}
                helperText={errors.technology || ""}
              />
            )}
          />
        </div>

        {/* Interviewer Autocomplete */}
        <div className="w-[24rem]">
          <Autocomplete
            id="interviewer-autocomplete"
            options={interviewerList}
            getOptionLabel={(option) => option.name}
            value={formData.interviewer}
            onChange={onAutoCompleteChange("interviewer")}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Interviewer"
                error={!!errors.interviewer}
                helperText={errors.interviewer || ""}
              />
            )}
          />
        </div>

        {/* Batch Autocomplete */}
        <div className="w-[24rem]">
          <Autocomplete
            multiple
            id="batch-autocomplete"
            options={batchList}
            getOptionLabel={(option) => option.name}
            value={formData.batch}
            onChange={onAutoCompleteChange("batch")}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Batch"
                error={!!errors.batch}
                helperText={errors.batch || ""}
              />
            )}
          />
        </div>
      </div>

      <div className="mt-6">
        <Button
          variant="contained"
          sx={{
            width: "10rem",
          }}
          onClick={onSubmit}
        >
          Submit
        </Button>
      </div>

      <div className="mt-8">
        {/** Shows elements from interview batch junction table */}
        <InterviewerTable
          batchList={batchList}
          fetchInterviewerData={fetchInterviewerData}
          interviewerList={_interviewerList}
          setInterviewerList={setInterviewerList}
          editInterviewer={editInterviewer}
        />
      </div>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AddInterviewer;
