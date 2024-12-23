import React, {
  useRef,
  useState,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Button, Stack, Typography } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";

import BatchSelection from "./batchForm/BatchSelection";
import AssignForm from "./batchForm/AssignForm";
import {
  assignCurriculumToFaculty,
  fetchAssignedCurriculumAPI,
  updateAssignCurriculumToFacultyAPI,
} from "../../../services/api";
import { connect } from "react-redux";
import { useLocation } from "react-router";
import { useSearchParams } from "react-router-dom";

const fetchAssignedCurriculumData = async (payload, setter) => {
  const res = await fetchAssignedCurriculumAPI(payload);

  setter(res.data);
};

const initialPageState = {
  isSubmitting: false,
  isError: false,
  error: null,
  response: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "submitting": {
      return { ...state, isSubmitting: true, isError: false };
    }
    case "submited": {
      return { ...state, isSubmitting: false, isError: false };
    }
    case "error": {
      return {
        ...state,
        isSubmitting: false,
        isError: true,
        error: action.payload,
      };
    }
    default:
      throw new Error("unKnown type");
  }

  return state;
};

function BatchFormComponent({ userId, setView }) {
  // to show loading and other stuff for form
  const [pageState, dispatch] = useReducer(reducer, initialPageState);
  // null or selectedBatch Object {"name": "batch1","id": 1,"technologyName": "Java","startDate": "2024-09-06T00:00:00.000Z","time": "12:02"}
  const [selectedBatch, setSelectedBatch] = useState(null);
  // curriculum input is not controlled just storing value so that i can passit to submit
  const [selectedCurriculum, setSelectedCurriculum] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // e stands for edit === "true" if editing
  const e = queryParams.get("e");
  // assignedCurriculum id
  const assignedCurriculumId = queryParams.get("id");

  const editDataAdaptor = useCallback(
    (data) => {
      setSelectedBatch({
        name: data.batchName,
        id: data.batchId,
        startDate: data.startDate,
        assignedBatchesId: data.assignedBatchesId,
        time: data.time,
        technologyName: data.technologyName,
      });

      setSelectedCurriculum({
        id: data.curriculumId,
        name: data.curriculumName,
      });
    },
    [setSelectedBatch, setSelectedCurriculum]
  );

  useEffect(() => {
    if (e === "true" && assignedCurriculumId) {
      fetchAssignedCurriculumData(assignedCurriculumId, editDataAdaptor);
    }
  }, [e]);

  // used to get selected Batch return autocomplete onChange data
  const onSelect = (e, newValue) => {
    setSelectedBatch(newValue);
  };

  // user should be able to modify the data and time in batch Assign form
  const onDateTimeChange = (e) => {
    console.log(e);
    setSelectedBatch((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // to remove all state
  const onReset = ({ curriculum }) => {
    setSelectedBatch(null);
    if (curriculum !== false) setSelectedCurriculum(null);
  };

  const onCurriculumChange = (e, newValue) => {
    setSelectedCurriculum(newValue || null);
  };

  const submitHandler = async () => {
    try {
      dispatch({ type: "submitting" });

      if (e) {
        await updateAssignCurriculumToFacultyAPI({
          uid: userId,
          id: assignedCurriculumId,
          assignedBatchesId: selectedBatch.assignedBatchesId,
          curriculumId: selectedCurriculum?.id,
          time: selectedBatch.time,
          startDate: selectedBatch.startDate?.split("T")[0],
        });

        searchParams.delete("e");
        searchParams.delete("id");

        setSearchParams(searchParams);
        setView("show");
      } else {
        await assignCurriculumToFaculty({
          uid: userId,
          assignedBatchesId: selectedBatch.assignedBatchesId,
          curriculumId: selectedCurriculum?.id,
          time: selectedBatch.time,
          startDate: selectedBatch.startDate?.split("T")[0],
        });
      }

      // successfully submited
      dispatch({ type: "submited" });
      onReset({ curriculum: false });
      alert(`Successfully ${e ? "updated" : "Assigned"} Curriculum`);
    } catch (error) {
      dispatch({ type: "error" });

      if (error.response.status === 409) {
        return alert(error.response.data.message);
      }

      alert("something went wrong!");
    }
  };

  return (
    <div>
      <BatchSelection onSelect={onSelect} selectedBatch={selectedBatch} />

      <div className="max-w-[800px] mt-8">
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", marginBottom: 4 }}
        >
          Batch Assignment Form{" "}
          {!selectedBatch && (
            <small className="text-sm">(Must Select Batch)</small>
          )}
        </Typography>
        <AssignForm
          labels={selectedBatch}
          selectedCurriculum={selectedCurriculum}
          onDateTimeChange={onDateTimeChange}
          onCurriculumChange={onCurriculumChange}
        />

        {/* Action Buttons */}
        <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-end"
          marginTop={6}
          sx={{ width: "100%" }}
        >
          <Button
            variant="contained"
            color="primary"
            disabled={pageState.isSubmitting}
            startIcon={<AssignmentIcon />}
            sx={{ width: 150 }}
            onClick={submitHandler}
          >
            {pageState.isError
              ? "retry?"
              : pageState.isSubmitting
              ? "Loading..."
              : e === "true"
              ? "Update"
              : "Assign"}
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            startIcon={<RefreshIcon />}
            sx={{ width: 150 }}
            onClick={onReset}
          >
            Reset
          </Button>
        </Stack>
      </div>
    </div>
  );
}

const mapState = (state) => ({ userId: state.user.userId });

const BatchForm = connect(mapState)(BatchFormComponent);

export default BatchForm;
