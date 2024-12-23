import { useCallback, useRef, useState, useReducer, useEffect } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";

import ApprovalList from "./pendingApprovalForm/ApprovalList";
import ApprovalForm from "./pendingApprovalForm/ApprovalForm";
import RejectModal from "./pendingApprovalForm/RejectModal";
import {
  fetchAssignedBatchesAPI,
  updateAssignedBatchStatusAPI,
} from "../../../services/api";
import { connect } from "react-redux";

// setter will recieve list of approval data or []
const fetchAssignedBatches = async (payload, handler) => {
  try {
    const res = await fetchAssignedBatchesAPI(payload);

    handler(res.data || []);
  } catch (error) {
    console.error(error);
    handler([]);
  }
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
      return { ...state, isSubmitting: false, isError: true };
    }
    default:
      throw new Error("unKnown type");
  }
};

function PendingApprovalFormComponent({ userId }) {
  const [pageState, dispatch] = useReducer(reducer, initialPageState);
  const [openModal, setOpenModal] = useState(false);
  const [currentApproval, setCurrentApproval] = useState(null);
  const [errors, setErrors] = useState({ time: false, date: false });
  const [approvalList, setApprovalList] = useState([]);
  const timeRef = useRef();
  const dateRef = useRef();

  useEffect(() => {
    fetchAssignedBatches({ userId }, setApprovalList);
  }, [userId]);

  const onApprovalSelect = useCallback((id) => {
    setCurrentApproval(id);
  }, []);

  const onApprove = async () => {
    try {
      const time = timeRef.current.value;
      const date = dateRef.current.value;

      // Check if both time and date are provided
      if (!time && !date) {
        setErrors({ time: "Select a valid time", date: "Select a valid date" });
        return;
      }

      // Combine the date and time into a single Date object for validation, if selected date is less then now it is not valid.
      const combinedDateTime = new Date(`${date}T${time}`);
      const currentDateTime = new Date();

      if (combinedDateTime < currentDateTime) {
        setErrors({
          time: false,
          date: "Selected date and time must be in the future",
        });
        return;
      }

      setErrors({ time: false, date: false });
      dispatch({ type: "submitting" });

      await updateAssignedBatchStatusAPI({
        id: currentApproval,
        time,
        date,
        status: "approved",
      });

      // refetch assigned batches list
      fetchAssignedBatches({ userId }, setApprovalList);
      // reset the data
      setCurrentApproval(null);

      dispatch({ type: "submited" });
      alert("Curriculum successfully assigned.");
    } catch (error) {
      dispatch({
        type: "error",
        payload: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  const onReject = () => {
    setOpenModal(true);
  };

  const onModalSubmit = async (formData) => {
    try {
      const comments = Object.keys(formData)
        .filter((key) => formData[key] && key !== "comment")
        .join(", ");
      const otherReason = formData.comment || null;

      dispatch({ type: "submitting" });

      await updateAssignedBatchStatusAPI({
        id: currentApproval,
        comment: comments,
        reason: otherReason,
        status: "rejected",
      });

      dispatch({ type: "submited" });
      setOpenModal(false);
      fetchAssignedBatches({ userId }, setApprovalList);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {openModal && (
        <RejectModal
          onSubmit={onModalSubmit}
          onClose={() => setOpenModal(false)}
        />
      )}
      <div className="flex flex-wrap-reverse justify-between">
        {approvalList?.length > 0 && (
          <Box component="form" sx={{ maxWidth: "800px", width: "100%" }}>
            <Typography variant="body1" sx={{ mb: 2, fontWeight: "bold" }}>
              Approve Batch Assignment
            </Typography>

            <ApprovalForm
              errors={errors}
              refs={{ timeRef, dateRef }}
              currentApproval={currentApproval}
            />

            <Stack
              direction="row"
              spacing={2}
              justifyContent="flex-end"
              sx={{ mt: 4 }}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={onApprove}
                disabled={pageState.isSubmitting || currentApproval === null}
                startIcon={
                  pageState.isSubmitting && <CircularProgress size={20} />
                }
              >
                {pageState.isSubmitting ? "Approving..." : "Approve"}
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                size="large"
                disabled={pageState.isSubmitting || currentApproval === null}
                onClick={onReject}
              >
                Reject
              </Button>
            </Stack>
          </Box>
        )}

        <Box sx={{ width: "100%", maxWidth: "300px", marginBlockEnd: 4 }}>
          <ApprovalList
            approvalList={approvalList}
            setApprovalList={setApprovalList}
            selectHandler={onApprovalSelect}
          />
        </Box>
      </div>
    </>
  );
}

const mapState = (state) => ({
  userId: state.user.userId,
});

const mapDispatch = {};

const PendingApprovalForm = connect(
  mapState,
  mapDispatch
)(PendingApprovalFormComponent);

export default PendingApprovalForm;
