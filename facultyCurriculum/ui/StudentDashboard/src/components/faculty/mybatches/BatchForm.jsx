import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { mb_assign_batch } from "../../../services/api";

const slots = [
  { id: "7-9", value: "7:00 AM - 9:00 AM" },
  { id: "9-11", value: "9:00 AM - 11:00 AM" },
  { id: "11-1", value: "11:00 AM - 1:00 PM" },
  { id: "2-4", value: "2:00 PM - 4:00 PM" },
  { id: "4-6", value: "4:00 PM - 6:00 PM" },
  { id: "6-7:30", value: "6:00 PM - 7:30 PM" },
  { id: "7:30-9", value: "7:30 PM - 9:00 PM" },
  { id: "7:30-9:30", value: "7:30 PM - 9:30 PM" },
  { id: "9-10:30", value: "9:00 PM - 10:30 PM" },
  { id: "6-8", value: "6:00 PM - 8:00 PM" },
  { id: "8-9:30", value: "8:00 PM - 9:30 PM" },
];

function BatchForm({ courseCurriculumList, batchList, setView }) {
  const [selectedCurriculum, setSelectedCurriculum] = useState(0);
  const [selectedBatch, setSelectedBatch] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(0);
  const [startDate, setStartDate] = useState("");

  const [errors, setErrors] = useState({
    curriculum: false,
    batch: false,
    slot: false,
    date: false,
  });

  const handleCurriculumChange = (event) => {
    setSelectedCurriculum(event.target.value);
    setErrors((prev) => ({ ...prev, curriculum: event.target.value === "" }));
  };

  const handleBatchChange = (event) => {
    setSelectedBatch(event.target.value);
    setErrors((prev) => ({ ...prev, batch: event.target.value === "" }));
  };

  const handleSlotChange = (event) => {
    setSelectedSlot(event.target.value);
    setErrors((prev) => ({ ...prev, slot: event.target.value === "" }));
  };

  const handleDateChange = (event) => {
    setStartDate(event.target.value);
    setErrors((prev) => ({ ...prev, date: event.target.value === "" }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form data
    const newErrors = {
      curriculum: selectedCurriculum === "",
      batch: selectedBatch === "",
      slot: selectedSlot === "",
      date: startDate === "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).includes(true)) {
      return;
    }

    // Prepare data to be sent
    const data = {
      curriculamId: selectedCurriculum,
      batchId: selectedBatch,
      startDate,
      slotDetails: selectedSlot,
    };

    try {
      await mb_assign_batch(data);
      alert("Batch assigned successfully!");
      setView("show");

      setSelectedCurriculum(0);
      setSelectedBatch(0);
      setStartDate("");
      setSelectedSlot(0);
    } catch (error) {
      console.error("Error assigning batch:", error);
      alert("Failed to assign batch. Please try again.");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormControl fullWidth error={errors.curriculum}>
          <label className="block text-sm font-medium text-gray-700">
            Select Course Curriculum <span className="text-red-500">*</span>
          </label>
          <Select
            fullWidth
            value={selectedCurriculum}
            onChange={handleCurriculumChange}
          >
            <MenuItem value={0}>Select Course Curriculum</MenuItem>
            {courseCurriculumList.map((curriculum) => (
              <MenuItem
                key={curriculum.curriculamId}
                value={curriculum.curriculamId}
              >
                {curriculum.courseCurriculam_Name}
              </MenuItem>
            ))}
          </Select>
          {errors.curriculum && (
            <FormHelperText>This field is required.</FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth error={errors.batch}>
          <label className="block text-sm font-medium text-gray-700">
            Select Batch <span className="text-red-500">*</span>
          </label>
          <Select fullWidth value={selectedBatch} onChange={handleBatchChange}>
            <MenuItem value={0}>Select Batch</MenuItem>
            {batchList.map((batch) => (
              <MenuItem key={batch.BatchId} value={batch.BatchId}>
                {batch.BatchName}
              </MenuItem>
            ))}
          </Select>
          {errors.batch && (
            <FormHelperText>This field is required.</FormHelperText>
          )}
        </FormControl>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormControl fullWidth error={errors.date}>
          <label className="block text-sm font-medium text-gray-700">
            Course Start Date <span className="text-red-500">*</span>
          </label>
          <TextField
            type="date"
            fullWidth
            value={startDate}
            onChange={handleDateChange}
          />
          {errors.date && (
            <FormHelperText>This field is required.</FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth error={errors.slot}>
          <label className="block text-sm font-medium text-gray-700">
            Slot <span className="text-red-500">*</span>
          </label>
          <Select fullWidth value={selectedSlot} onChange={handleSlotChange}>
            <MenuItem value={0}>Select Slot</MenuItem>
            {slots.map((slot) => (
              <MenuItem value={slot.id} key={slot.id}>
                {slot.value}
              </MenuItem>
            ))}
          </Select>
          {errors.slot && (
            <FormHelperText>This field is required.</FormHelperText>
          )}
        </FormControl>
      </div>
      <Button type="submit" variant="contained" color="primary">
        Assign Batch
      </Button>
    </form>
  );
}

export default BatchForm;
