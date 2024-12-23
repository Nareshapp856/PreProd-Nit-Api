import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import TechnologySelector from "./TechnologySelector";
import { registerInterviewerDispatch } from "../../../redux/actions/interviewer";
import { fetchTechnologiesAPI } from "../../../services/api";
import { resetInterviewerRegistrationSlice } from "../../../redux/slices/user/interviewer";

const mobileRegex = /^(\+?\d{1,3} ?)?\d{10}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const technologyAdaptor = (techList) => {
  return techList.map((tech) => ({
    id: tech.TechnologyID,
    name: tech.TechnologyName,
  }));
};

const fetchTechnologies = async (setter) => {
  try {
    const res = await fetchTechnologiesAPI();
    setter(technologyAdaptor(res?.data || []));
  } catch (error) {
    setter([]);
  }
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function InterviewerRegisterFormComponent({
  registerInterviewer,
  registerInterviewerState,
  resetRegistrationSlice,
  registerInterviewerError,
  registerInterviewerData,
}) {
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [technologyList, setTechnologyList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    currentCompany: "",
    experience: 0,
    mode: 0,
  });
  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    fetchTechnologies(setTechnologyList);
  }, []);

  useEffect(() => {
    if (registerInterviewerState === "reject") {
      setSnackbarMessage(
        registerInterviewerError?.message ||
          "Something went wrong, please retry."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      resetRegistrationSlice();
    }
    if (registerInterviewerState === "response") {
      setSnackbarMessage(
        registerInterviewerData || "Interviewer is registered successfully"
      );
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      resetRegistrationSlice();
      onReset();
    }
  }, [
    registerInterviewerState,
    registerInterviewerError,
    registerInterviewerData,
    resetRegistrationSlice,
  ]);

  const onReset = (options = {}) => {
    if (!options.notTech) setSelectedTechnologies([]);
    setFormData({
      name: "",
      mobile: "",
      email: "",
      currentCompany: "",
      experience: 0,
      mode: 0,
    });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.mobile.match(mobileRegex))
      newErrors.mobile = "Mobile number is invalid.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.currentCompany)
      newErrors.currentCompany = "Current company is required.";
    if (formData.experience < 0)
      newErrors.experience = "Experience cannot be negative.";
    if (selectedTechnologies.length === 0)
      newErrors.technologies = "At least one technology must be selected.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    const completeFormData = {
      ...formData,
      technologies: selectedTechnologies.map((tech) => tech.id),
    };
    registerInterviewer(completeFormData);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        className="w-[40rem]"
        noValidate
      >
        <Grid container spacing={3}>
          {/* Technology Selector */}
          <Grid item xs={12}>
            <TechnologySelector
              error={errors.technologies}
              setErrors={setErrors}
              options={technologyList}
              selectedTechnologies={selectedTechnologies}
              setSelectedTechnologies={setSelectedTechnologies}
            />
          </Grid>

          {/* Name Input */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>

          {/* Mobile Input */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Mobile"
              variant="outlined"
              value={formData.mobile}
              onChange={(e) =>
                setFormData({ ...formData, mobile: e.target.value })
              }
              error={!!errors.mobile}
              helperText={errors.mobile}
            />
          </Grid>

          {/* Email Input */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>

          {/* Current Company Input */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Current Company"
              variant="outlined"
              value={formData.currentCompany}
              onChange={(e) =>
                setFormData({ ...formData, currentCompany: e.target.value })
              }
              error={!!errors.currentCompany}
              helperText={errors.currentCompany}
            />
          </Grid>

          {/* Experience Input */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Experience (years)"
              type="number"
              variant="outlined"
              value={formData.experience}
              onChange={(e) =>
                setFormData({ ...formData, experience: e.target.value })
              }
              error={!!errors.experience}
              helperText={errors.experience}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12} className="flex justify-end">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="w-40"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Snackbar for success/error messages */}
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
    </>
  );
}

const mapState = (state) => ({
  registerInterviewerState: state.registerInterviewer.state,
  registerInterviewerData: state.registerInterviewer.data,
  registerInterviewerError: state.registerInterviewer.error,
});

const mapDispatch = {
  resetRegistrationSlice: resetInterviewerRegistrationSlice,
  registerInterviewer: registerInterviewerDispatch,
};

const InterviewerRegisterForm = connect(
  mapState,
  mapDispatch
)(InterviewerRegisterFormComponent);

export default InterviewerRegisterForm;
