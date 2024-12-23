import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { Autocomplete, Grid, TextField, Typography } from "@mui/material";

import { fetchApprovedBatchListAPI } from "../../../../services/api";

const fetchBatchList = async (payload, setter) => {
  try {
    const res = await fetchApprovedBatchListAPI(payload);
    setter(res.data || []);
  } catch (error) {
    console.error(error);
  }
};

function BatchSelectionComponent({ selectedBatch, onSelect, userId }) {
  const [batchData, setBatchData] = useState([]);

  useEffect(() => {
    fetchBatchList({ userId }, setBatchData);
  }, [userId]);

  return (
    <Grid container mt={4}>
      <Grid
        item
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Autocomplete
            fullWidth
            sx={{ width: 400 }}
            name="batch"
            disablePortal
            value={selectedBatch}
            options={batchData}
            getOptionLabel={(option) => option.name}
            onChange={(e, x) => onSelect("batch", x)}
            renderInput={(params) => (
              <TextField {...params} label="Select Batch" variant="outlined" />
            )}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

const mapState = (state) => ({
  userId: state.user.userId,
});

const BatchSelection = connect(mapState)(BatchSelectionComponent);

export default BatchSelection;
