import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

function Selector({
  options = [],
  label = "Select an option",
  width = 300,
  value,
  onChange,
}) {
  return (
    <Autocomplete
      disablePortal
      options={options}
      sx={{ width }}
      value={value}
      onChange={(event, newValue) => onChange(newValue)}
      getOptionLabel={(option) => option.name || ""}
      renderInput={(params) => <TextField {...params} label={label} />}
      renderOption={(props, option) => <li {...props}>{option.name}</li>}
    />
  );
}

export default Selector;
