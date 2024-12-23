import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

function ModuleSelector({ options, value, onChange }) {
  return (
    <Autocomplete
      multiple
      id="module-selector"
      options={options}
      getOptionLabel={(option) => option.name}
      value={options.filter((option) => value.includes(option.id))}
      onChange={(event, newValue) => {
        // Map selected options to only their ids
        onChange(newValue.map((option) => option.id));
      }}
      renderInput={(params) => (
        <TextField {...params} label="Select Modules" placeholder="Modules" />
      )}
    />
  );
}

export default ModuleSelector;
