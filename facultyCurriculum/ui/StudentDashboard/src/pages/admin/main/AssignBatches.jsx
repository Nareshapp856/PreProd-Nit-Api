import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useCallback, useState, useEffect } from "react";
import { useAssignBatchData } from "../../../hooks/admin/useAssignBatchData";
import {
  fetchAdminAssignedBatchesAPI,
  submitAssignBatches,
} from "../../../services/api";
import { connect } from "react-redux";
import BatchTable from "../../../components/admin/assignBatches/BatchTable";
import { useFeatureFlags } from "../../../context/FeatureFlagContext";

const initialFormData = {
  technology: "0",
  batch: "0",
  faculty: "0",
};

const fetchAssignedBatches = async (setter) => {
  try {
    const res = await fetchAdminAssignedBatchesAPI();
    setter(res.data || []);
  } catch (error) {
    console.error(error);
  }
};

function AssignBatchesComponent({ userId }) {
  const { adminsBatchTable } = useFeatureFlags();
  const [formData, setFormData] = useState(initialFormData);
  const [submitMsg, setSubmitMsg] = useState("assign");
  const [errors, setErrors] = useState({});
  const [tableData, setTableData] = useState([]);

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    fetchAssignedBatches(setTableData);
  }, []);

  const resetFormData = useCallback((type) => {
    if (type === "reset")
      setFormData((prev) => ({
        ...initialFormData,
        technology: prev.technology,
      }));
  }, []);

  const [batchList, technologyList, facultyList] = useAssignBatchData({
    technologyId: formData.technology,
    resetFormData,
  });

  const onFormData = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (formData.batch === "0") {
      newErrors.batch = "Please select a batch.";
    }
    if (formData.faculty === "0") {
      newErrors.faculty = "Please select a faculty.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async () => {
    if (!validateForm()) {
      return; // Prevent submission if validation fails
    }

    try {
      const res = await submitAssignBatches({
        userId,
        batchId: formData.batch,
        facultyId: formData.faculty,
      });

      if (res.status === 201) {
        setSnackbarMessage(
          "Successfully added this assignment to faculty list."
        );
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setFormData((prev) => ({
          ...initialFormData,
          technology: prev.technology,
        }));
        if (submitMsg !== "assign") setSubmitMsg("assign");
      }

      fetchAssignedBatches(setTableData);
    } catch (error) {
      let message = "Something went wrong, please retry.";
      if (error.response.status === 409) {
        message = error.response.data.message;
        setSnackbarSeverity("warning");
      } else if (error.response.status === 500) {
        setSnackbarSeverity("error");
      }

      setSnackbarMessage(message);
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-semibold text-gray-700">
              Assign Batches
            </h1>
          </div>
          <hr className="mb-6 border-gray-300" />
        </div>

        <div className="flex flex-wrap justify-between gap-y-8">
          <div className="w-[24rem]">
            <FormControl fullWidth>
              <InputLabel id="select-technology">
                Select A Technology
              </InputLabel>
              <Select
                name="technology"
                onChange={onFormData}
                labelId="select-technology"
                value={formData.technology}
                label="Select A Technology"
              >
                <MenuItem value={"0"}>Select A Technology</MenuItem>
                {Array.isArray(technologyList) &&
                  technologyList.map((technology) => (
                    <MenuItem key={technology.id} value={technology.id}>
                      {technology.name}
                    </MenuItem>
                  ))}
              </Select>
              {!!errors.technology && (
                <FormHelperText>{errors.technology}</FormHelperText>
              )}
            </FormControl>
          </div>

          <div className="w-[24rem]">
            <FormControl fullWidth error={!!errors.batch}>
              <InputLabel>
                Select A Batch<span className="text-red-600">*</span>
              </InputLabel>
              <Select
                name="batch"
                onChange={onFormData}
                labelId="select-batch"
                value={formData.batch}
                label="Select A Batch"
              >
                <MenuItem value={"0"}>Select A Batch</MenuItem>
                {Array.isArray(batchList) &&
                  batchList.map((batch) => (
                    <MenuItem key={batch.id} value={batch.id}>
                      {batch.name}
                    </MenuItem>
                  ))}
              </Select>
              {!!errors.batch && (
                <FormHelperText>{errors.batch}</FormHelperText>
              )}
            </FormControl>
          </div>

          <div className="w-[24rem]">
            <FormControl fullWidth error={!!errors.faculty}>
              <InputLabel id="select-faculty">
                Select A Faculty<span className="text-red-600">*</span>
              </InputLabel>
              <Select
                name="faculty"
                onChange={onFormData}
                labelId="select-faculty"
                value={formData.faculty}
                label="Select A Faculty"
              >
                <MenuItem value={"0"}>Select A Faculty</MenuItem>
                {Array.isArray(facultyList) &&
                  facultyList.map((faculty) => (
                    <MenuItem key={faculty.id} value={faculty.id}>
                      {faculty.name}
                    </MenuItem>
                  ))}
              </Select>
              {!!errors.faculty && (
                <FormHelperText>{errors.faculty}</FormHelperText>
              )}
            </FormControl>
          </div>
        </div>

        <div className="mt-6">
          <Button
            onClick={onSubmit}
            variant="contained"
            sx={{
              width: "10rem",
            }}
          >
            {submitMsg}
          </Button>
        </div>
      </div>

      {adminsBatchTable && (
        <BatchTable
          tableData={tableData}
          fetchAssignedBatches={fetchAssignedBatches}
          setTableData={setTableData}
        />
      )}

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }} // Position at top right
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

const mapState = (state) => ({
  userId: state.user.userId,
});

const AssignBatches = connect(mapState)(AssignBatchesComponent);

export default AssignBatches;
