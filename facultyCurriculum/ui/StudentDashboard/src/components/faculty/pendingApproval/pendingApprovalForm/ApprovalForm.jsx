import { TextField, Grid } from "@mui/material";
import { forwardRef, useEffect, useState, useCallback } from "react";

import { fetchAssignedBatchDetailsAPI } from "../../../../services/api";

// requires assigned Batch id
const fetchAssignedBatchDetails = async (payload, setter) => {
  const res = await fetchAssignedBatchDetailsAPI(payload);
  setter(res.data);
};

const ApprovalForm = ({ errors, currentApproval, refs }) => {
  const [labels, setLables] = useState({
    technologyName: "",
    batchName: "",
  });

  const labelDataAdapter = useCallback(
    (oldData) => {
      setLables({
        batchName: oldData.batchName,
        technologyName: oldData.technologyName,
      });
    },
    [setLables]
  );

  useEffect(() => {
    if (currentApproval)
      fetchAssignedBatchDetails(currentApproval, labelDataAdapter);
    if (currentApproval === null) {
      setLables({
        technologyName: "",
        batchName: "",
      });
    }
  }, [currentApproval, labelDataAdapter]);

  return (
    <Grid container spacing={4}>
      <Grid item xs={6}>
        <TextField
          label="Batch Name"
          value={labels.batchName}
          variant="outlined"
          fullWidth
          size="large"
          InputProps={{
            readOnly: true,
          }}
          sx={{
            "& .MuiOutlinedInput-root.Mui-disabled": {
              color: "rgba(0, 0, 0, 0.6)",
            },
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Technology"
          value={labels.technologyName}
          variant="outlined"
          fullWidth
          size="large"
          InputProps={{
            readOnly: true,
          }}
          sx={{
            "& .MuiOutlinedInput-root.Mui-disabled": {
              color: "rgba(0, 0, 0, 0.6)",
            },
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Time"
          type="time"
          variant="outlined"
          fullWidth
          size="large"
          error={Boolean(errors.time)}
          helperText={errors.time}
          InputLabelProps={{
            shrink: true,
          }}
          inputRef={refs.timeRef}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Start Date"
          type="date"
          variant="outlined"
          fullWidth
          size="large"
          error={Boolean(errors.date)}
          helperText={errors.date}
          InputLabelProps={{
            shrink: true,
          }}
          inputRef={refs.dateRef}
        />
      </Grid>
    </Grid>
  );
};

export default ApprovalForm;
