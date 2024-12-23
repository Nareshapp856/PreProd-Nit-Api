import { connect } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { Grid, Button, Snackbar, Alert, FormHelperText } from "@mui/material";
import Selector from "./dataForm/Selector";
import MarksTable from "./dataForm/MarksTable";
import ModuleSelector from "./dataForm/ModuleSelector";
import { submitEvolutionSheetDispatch } from "../../redux/actions/interviewer";
import { useMockInterviewer } from "../../hooks/mockInterviewer/useMockInterviewer";
import TopicSelector from "./dataForm/TopicSelector";
import { useEvolutionSheet } from "../../hooks/mockInterviewer/useEvolutionSheet";
import { resetSubmitEvolutionSheetSlice } from "../../redux/slices/user/interviewer";

function DataFormComponent({
  userId,
  submitEvolutionSheet,
  submittionState,
  resetSubmitSlice,
}) {
  const remarksRef = useRef();
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedModules, setSelectedModules] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);

  const [batchError, setBatchError] = useState("");
  const [studentError, setStudentError] = useState("");
  const [moduleError, setModuleError] = useState("");
  const [topicError, setTopicError] = useState("");

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [
    batchList,
    StudentList,
    ModuleList,
    TopicsList,
    fetchStudents,
    fetchTopics,
  ] = useMockInterviewer();

  const [tableData, setTableData] = useEvolutionSheet({
    selectedTopics,
    TopicsList,
  });

  useEffect(() => {
    if (selectedModules) fetchTopics({ moduleIds: selectedModules });
  }, [selectedModules]);

  useEffect(() => {
    fetchStudents(selectedBatch?.id);
  }, [selectedBatch]);

  useEffect(() => {
    if (submittionState === "response") {
      setSnackbarMessage("Submission Successful!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setSelectedTopics([]);
      remarksRef.current.value = "";
      setSelectedStudent(null);
      setTableData([]);
      resetSubmitSlice();
      clearErrors(); // Clear errors on successful submission
    } else if (submittionState === "reject") {
      setSnackbarMessage("Submission Failed.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      resetSubmitSlice();
    }
  }, [submittionState]);

  useEffect(() => {
    if (selectedModules.length === 0) {
      if (selectedTopics.length !== 0) {
        setSelectedTopics([]);
      }
    } else {
      setSelectedTopics((prev) =>
        prev.filter((selectedTopic) =>
          TopicsList.some((topic) => topic.id === selectedTopic)
        )
      );
    }
  }, [selectedModules, TopicsList]);

  const clearErrors = () => {
    setBatchError("");
    setStudentError("");
    setModuleError("");
    setTopicError("");
  };

  const handleSubmit = () => {
    clearErrors(); // Clear previous errors
    let valid = true;

    // Validation Logic
    if (!selectedBatch) {
      setBatchError("Please select a batch.");
      valid = false;
    }
    if (!selectedStudent) {
      setStudentError("Please select a student.");
      valid = false;
    }
    if (selectedModules.length === 0) {
      setModuleError("Please select at least one module.");
      valid = false;
    }
    if (selectedTopics.length === 0) {
      setTopicError("Please select at least one topic.");
      valid = false;
    }

    if (!valid) return; // Exit if validation fails

    // Proceed with submission if validation passes
    submitEvolutionSheet({
      mappingData: tableData.map((topic) => ({ ...topic, topicId: topic.id })),
      studentId: selectedStudent?.id,
      moduleData: selectedModules?.map((module) => ({ moduleId: module })),
      memberId: userId,
      overallRemarks: remarksRef.current.value,
    });
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Grid container spacing={2}>
        {/* Batch */}
        <Grid item xs={12} sm={6}>
          <Selector
            options={batchList}
            value={selectedBatch}
            label="Select A Batch"
            onChange={setSelectedBatch}
          />
          {batchError && <FormHelperText error>{batchError}</FormHelperText>}
        </Grid>

        {/* Student */}
        <Grid item xs={12} sm={6} display="flex" justifyContent="flex-end">
          <Selector
            options={StudentList}
            value={selectedStudent}
            label="Select A Student"
            onChange={setSelectedStudent}
          />
          {studentError && (
            <FormHelperText error>{studentError}</FormHelperText>
          )}
        </Grid>

        {/* Module */}
        <Grid item xs={12}>
          <ModuleSelector
            options={ModuleList}
            value={selectedModules}
            onChange={setSelectedModules}
          />
          {moduleError && <FormHelperText error>{moduleError}</FormHelperText>}
        </Grid>

        {/* Topics */}
        <Grid item xs={12}>
          <TopicSelector
            options={TopicsList}
            value={selectedTopics}
            onChange={setSelectedTopics}
          />
          {topicError && <FormHelperText error>{topicError}</FormHelperText>}
        </Grid>

        {/* Topics - Marks table */}
        <Grid item xs={12}>
          <MarksTable
            tableData={tableData}
            setTableData={setTableData}
            ref={remarksRef}
          />
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            style={{ marginTop: "16px" }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>

      {/* Snackbar for alerts */}
      <Snackbar
        open={openSnackbar}
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
    </>
  );
}

const mapState = (state) => ({
  userId: state.user.userId,
  submittionState: state.submitEvolutionSheet.state,
});

const mapDispatch = {
  submitEvolutionSheet: submitEvolutionSheetDispatch,
  resetSubmitSlice: resetSubmitEvolutionSheetSlice,
};

const DataForm = connect(mapState, mapDispatch)(DataFormComponent);

export default DataForm;
