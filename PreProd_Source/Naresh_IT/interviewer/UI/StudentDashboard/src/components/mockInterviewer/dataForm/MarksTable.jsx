import React, { forwardRef } from "react";
import DraggableTable from "./marksTable/DraggableTable";
import { Grid, TextField } from "@mui/material";

const MarksTable = ({ tableData, setTableData }, ref) => {
  return (
    <div className="space-y-4">
      {/** Marks Table */}
      <DraggableTable tableData={tableData} setTableData={setTableData} />

      {/** Remarks */}

      {/* Remarks Input */}
      <Grid item xs={12}>
        <TextField
          label="Overall Remarks"
          multiline
          rows={4}
          fullWidth
          inputRef={ref}
          variant="outlined"
          margin="normal"
        />
      </Grid>
    </div>
  );
};

export default forwardRef(MarksTable);
