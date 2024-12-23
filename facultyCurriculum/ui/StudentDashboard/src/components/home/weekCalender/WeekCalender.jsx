import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Button,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { format, addDays, startOfWeek, endOfWeek } from "date-fns";

function WeekCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [studentAssessData, setStudentAssessData] = useState(null);
  const [month, setMonth] = useState(currentDate.getMonth() + 1);

  const calenderColor = {
    code: "#CA7373",
    MCQ: "#000B58",
    CodingSkills: "#507687",
    "C - Theory": "#19A7CE",
    "Communication Skills": "#7286D3",
    "Core Java - Lab": "#D14D72",
    "Core Java - Theory": "#4E89AE", // You can assign any color you want here
    "Html - Lab": "#66BFBF",
    "Html - Theory": "#80A1C7",
    "Oracle - Theory": "#A58F47",
  };

  // Updated time slots (custom times as per your request)
  const timeSlots = [
    "9:00 AM - 11:00 AM",
    "11:15 AM - 1:15 PM",
    "1:15 PM - 2:15 PM",
    "2:15 PM - 4:15 PM",
    "4:30 PM - 6:30 PM",
  ];
  useEffect(() => {
    console.log(currentDate, month);
    StudentAssData();
  }, [currentDate, month]);

  async function StudentAssData() {
    try {
      const response = await axios.get(
        `http://49.207.10.13:5004/apinit/studentAssessmentData`
      );
      console.log(response.data);
      if (response.data && response.data.length > 0) {
        console.log(response.data);
        const formattedData = response.data.map((test) => {
          // Format start and end times
          const startTime = formatTime(test.TestStartTime);
          const endTime = formatTime(test.TestEndTime);

          // Create the combined time range
          const timeRange = `${startTime} - ${endTime}`;

          return {
            TestId: test.Testid,
            ExamType: test.ExamType,
            TimeRange: timeRange,
            Date: test.TestStartDate,
            TestDescription: test.testdescription,
          };
        });
        console.log("formated data:", formattedData);
        setStudentAssessData([formattedData]);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const startOfCurrentWeek = startOfWeek(currentDate);
  const endOfCurrentWeek = endOfWeek(currentDate);

  // Generate days of the week based on the start of the current week
  const daysOfWeek = Array.from({ length: 7 }, (_, index) =>
    addDays(startOfCurrentWeek, index)
  );

  const goToPreviousWeek = () => {
    setCurrentDate(addDays(currentDate, -7));
  };

  const goToNextWeek = () => {
    setCurrentDate(addDays(currentDate, 7));
  };

  // Helper function to format time from 24-hour format to 12-hour format (e.g., 09:00:00 -> 9:00 AM)
  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours, 10);
    const suffix = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${suffix}`;
  };

  if (studentAssessData === null)
    return (
      <div className="min-h-40 grid place-content-center">
        <Typography variant="h6" color="textSecondary">
          No data found
        </Typography>
      </div>
    );

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flexGrow: "grow",
        }}
      >
        <h4>Legend:</h4>
        {Object.entries(calenderColor).map(([type, color]) => (
          <div
            key={type}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: color,
                marginLeft: "5px",
                marginRight: "2px",
                borderRadius: "3px",
              }}
            />
            <span style={{ fontSize: "12px" }}>{type}</span>
          </div>
        ))}
      </div>
      {/* Stack for Navigation Buttons and Date Range */}
      <Stack direction="row" alignItems="center" spacing={1} mb={2}>
        <IconButton onClick={goToPreviousWeek}>
          <ArrowBackIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={goToNextWeek}>
          <ArrowForwardIcon fontSize="small" />
        </IconButton>
        <Typography variant="body1">
          {format(startOfCurrentWeek, "d")}-{format(endOfCurrentWeek, "d")}{" "}
          {format(endOfCurrentWeek, "MMMM, yyyy")}
        </Typography>
      </Stack>

      {/* Calendar Table */}
      <TableContainer
        component={Paper}
        sx={{
          width: "100%",
          height: "auto",
          padding: "10px",
          borderRadius: "10px",
          backgroundColor: "#fafafa",
        }}
      >
        <Table
          sx={{
            minWidth: "auto",
            "& .MuiTableCell-root": {
              border: "1px solid rgba(0,0,0,0.2)",
            },
            height: "580px",
            overflowY: "scroll",
            borderRadius: "4px",
          }}
        >
          <TableHead>
            <TableRow sx={{ height: "auto" }}>
              <TableCell
                align="center"
                sx={{ width: 30, height: "fit-content", padding: 0 }}
              ></TableCell>
              {daysOfWeek.map((day, index) => {
                const isToday =
                  format(day, "yyyy-MM-dd") ===
                  format(new Date(), "yyyy-MM-dd");
                return (
                  <TableCell
                    key={index}
                    align="center"
                    sx={{
                      width: "auto",
                      borderRadius: isToday ? "4px" : "0",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "11px",
                        lineHeight: 1,
                        color: isToday ? "#6256CA" : "inherit",
                        fontWeight: isToday ? "bold" : "inherit",
                      }}
                    >
                      {format(day, "EEE")}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        fontSize: "25px",
                        lineHeight: 1,
                        color: isToday ? "#6256CA" : "inherit",
                        fontWeight: isToday ? "bold" : "inherit",
                      }}
                    >
                      {format(day, "d")}
                    </Typography>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {timeSlots.map((time, timeIndex) => (
              <TableRow key={timeIndex} sx={{ height: "auto" }}>
                <TableCell
                  align="center"
                  sx={{
                    width: "auto",
                    border: "none",
                  }}
                >
                  <Typography sx={{ fontSize: "13px" }}>{time}</Typography>
                </TableCell>
                {daysOfWeek.map((day, dayIndex) => {
                  // Check if there are any tests scheduled for this day
                  const dayFormatted = format(day, "yyyy-MM-dd");
                  const testsForDay = studentAssessData
                    .flat()
                    .filter(
                      (test) =>
                        test.Date === dayFormatted && test.TimeRange === time
                    );

                  // Check if the time is 1:15 to 2:15 (you can adjust based on how your time is formatted)
                  const isLunchBreak = time === "1:15 PM - 2:15 PM"; // Adjust time format accordingly
                  return (
                    <TableCell
                      key={dayIndex}
                      sx={{ height: "100%", padding: 0 }}
                    >
                      {isLunchBreak ? (
                        <Typography
                          variant="body2"
                          sx={{
                            backgroundColor: "orange", // Highlight the lunch break
                            width: "100%", // Ensure it takes full width
                            height: "100%",
                            color: "white",
                            flex: 1, // Ensure it takes full height
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",

                            textAlign: "center",
                            borderRadius: "4px", // Optional: for rounded corners
                          }}
                        >
                          Lunch Break
                        </Typography>
                      ) : testsForDay.length > 0 ? (
                        testsForDay.map((test, idx) => (
                          <Typography
                            key={idx}
                            variant="body2"
                            sx={{
                              background:
                                calenderColor[test.ExamType?.trim()] ||
                                "#19A7CE",
                              width: "100%", // Ensure it takes full width
                              height: "100%",
                              flex: 1, // Ensure it takes full height
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              color: "white",
                              textAlign: "center",
                              borderRadius: "4px", // Optional: for rounded corners
                            }}
                          >
                            {test.TestDescription}
                          </Typography>
                        ))
                      ) : (
                        <Typography
                          variant="caption"
                          sx={{
                            flex: 1,
                            display: "flex",
                            justifyContent: "center", // Horizontally center fallback text
                            alignItems: "center", // Vertically center fallback text
                            width: "100%", // Ensure it takes full width
                            height: "100%", // Ensure it takes full height
                          }}
                        >
                          {/* Empty slot */}
                        </Typography>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default WeekCalendar;
