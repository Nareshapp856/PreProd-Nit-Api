import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchApprovedCurriculumListAPI } from "../../../../services/api";
import { connect } from "react-redux";

const fetchCurriculumList = async (payload, setter) => {
  try {
    const res = await fetchApprovedCurriculumListAPI(payload);

    setter(res.data || []);
  } catch (error) {
    console.error(error);
  }
};

function AssignFormComponent({
  labels,
  onDateTimeChange,
  selectedCurriculum,
  onCurriculumChange,
  userId,
}) {
  const [curriculumList, setCurriculumList] = useState([]);

  useEffect(() => {
    fetchCurriculumList({ userId }, setCurriculumList);
  }, [fetchCurriculumList, userId, setCurriculumList]);

  return (
    <div className="p-4 pt-2">
      {/* First Row: Batch Name and Technology */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Batch Name"
            disabled={!labels}
            value={labels?.name || ""}
            variant="outlined"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            InputLabelProps={{
              shrink: labels?.name,
            }}
            sx={{
              "& .MuiOutlinedInput-root.Mui-disabled": {
                color: "rgba(0, 0, 0, 0.6)",
              },
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Technology"
            disabled={!labels}
            value={labels?.technologyName || ""}
            variant="outlined"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            InputLabelProps={{
              shrink: labels?.technologyName,
            }}
            sx={{
              "& .MuiOutlinedInput-root.Mui-disabled": {
                color: "rgba(0, 0, 0, 0.6)",
              },
            }}
          />
        </Grid>
      </Grid>

      {/* Second Row: Duplicate fields (example) */}
      <Grid container spacing={3} marginTop={2}>
        <Grid item xs={12} md={6}>
          {/* Time Field */}
          <TextField
            label="Time"
            variant="outlined"
            disabled={!labels}
            value={labels?.time || ""}
            onChange={onDateTimeChange}
            name="time"
            fullWidth
            type="time"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              "& .MuiOutlinedInput-root.Mui-disabled": {
                color: "rgba(0, 0, 0, 0.6)",
              },
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          {/* Date Field */}
          <TextField
            label="Start Date"
            disabled={!labels}
            value={labels?.startDate ? labels.startDate.split("T")[0] : ""}
            onChange={onDateTimeChange}
            variant="outlined"
            name="startDate"
            fullWidth
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              "& .MuiOutlinedInput-root.Mui-disabled": {
                color: "rgba(0, 0, 0, 0.6)",
              },
            }}
          />
        </Grid>
      </Grid>

      {/* Curriculum Section */}
      <Grid container spacing={3} marginTop={2}>
        <Grid
          item
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <Typography sx={{ width: 190 }}>My Approved Curriculum:</Typography>{" "}
          </Grid>

          <Grid item>
            <Autocomplete
              sx={{ width: 400 }}
              disablePortal
              options={curriculumList || []}
              disabled={!labels}
              value={selectedCurriculum}
              getOptionLabel={(option) => option.name}
              onChange={onCurriculumChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select A Curriculum"
                  variant="outlined"
                />
              )}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

const mapState = (state) => ({
  userId: state.user.userId,
});

const AssignForm = connect(mapState)(AssignFormComponent);

export default AssignForm;
