import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
  outline: "none",
};

const labels = [
  "Just don't like it",
  "I'm taking a leave this week",
  "Not satisfied with the terms",
  "Other reasons",
];

function RejectModal({ onSubmit, onClose }) {
  const [formState, setFormState] = useState({
    reasons: {},
    comment: "",
  });
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    const selectedReasons = Object.values(formState.reasons).some(Boolean);

    if (!selectedReasons) {
      setError("Please select at least one reason.");
      setIsSubmitDisabled(true);
      return;
    }

    if (isOtherSelected && !formState.comment.trim()) {
      setError("Please provide a comment for 'Other reasons'.");
      setIsSubmitDisabled(true);
      return;
    }

    setError("");
    setIsSubmitDisabled(false);
  }, [formState, isOtherSelected]);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    setFormState((prev) => ({
      ...prev,
      reasons: { ...prev.reasons, [name]: checked },
    }));

    if (name === "Other reasons") {
      setIsOtherSelected(checked);
    }
  };

  const handleTextAreaChange = (e) => {
    setFormState((prev) => ({
      ...prev,
      comment: e.target.value,
    }));
  };

  const handleSubmit = () => {
    setError("");
    onSubmit(formState);
  };

  return (
    <Modal open onClose={onClose}>
      <Box sx={style}>
        <Grid
          container
          className="flex justify-between items-center"
          sx={{ marginBottom: 3 }}
        >
          <Typography variant="h6" fontWeight="bold">
            Why are you rejecting?
          </Typography>
          <IconButton onClick={onClose} sx={{ color: "grey.500" }}>
            <CloseIcon />
          </IconButton>
        </Grid>

        <FormGroup>
          {labels.map((label) => (
            <FormControlLabel
              key={label}
              control={
                <Checkbox
                  checked={!!formState.reasons[label]}
                  onChange={handleCheckboxChange}
                  name={label}
                />
              }
              label={label}
              sx={{ color: "grey.800" }}
            />
          ))}

          {isOtherSelected && (
            <TextField
              sx={{ marginBlockStart: 2 }}
              multiline
              rows={2}
              name="comment"
              value={formState.comment}
              onChange={handleTextAreaChange}
              maxRows={4}
              placeholder="Please provide more details"
            />
          )}

          {/* Show validation error */}
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </FormGroup>

        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          sx={{ marginTop: 4 }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{ minWidth: 100, bgcolor: "#1E40AF" }}
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
          >
            Submit
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ minWidth: 100 }}
            onClick={onClose}
          >
            Cancel
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}

export default RejectModal;
