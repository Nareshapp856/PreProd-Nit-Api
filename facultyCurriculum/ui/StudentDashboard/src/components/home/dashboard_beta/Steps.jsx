import React from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import StepsRenderer from "./steps/StepsRenderer";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";

function VerticalLinearStepperComponent({ selectedDate }) {
  const theme = useTheme();

  const [slotList, setSlotList] = useState([
    {
      date: new Date(),
      slotTime: "09:00 - 11:00",
      topic: "c#",
      subTopic: "aws, .NETIntro to class",
      facultyName: "sunandha",
    },
    {
      date: new Date(),
      slotTime: "11:00 - 01:00",
      topic: "cpp",
      subTopic: "swa, NETIntro to ChatGpt",
      facultyName: "nanandha",
    },
    {
      date: new Date(),
      slotTime: "12:00 - 00:00",
      topic: "java",
      subTopic: "banana, banana",
      facultyName: "kanandha",
    },
  ]);

  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));

  console.log("slotList");

  return (
    <Box
      sx={{
        width: "100%",
        padding: 4,
        paddingTop: isSmScreen ? 0 : 4,
        paddingInline: isSmScreen ? 0 : 4,
        maxHeight: "94vh",
        overflow: "auto",
      }}
    >
      <div>
        {slotList.length > 0 && (
          <div>
            <Typography variant="h5" sx={{ fontWeight: "semibold", mb: 2 }}>
              My Courses
            </Typography>
            {slotList.map((step, index) => (
              <StepsRenderer
                key={index}
                step={step}
                selectedDate={selectedDate}
              />
            ))}
          </div>
        )}
      </div>

      {slotList.length === 0 && (
        <div className="min-h-40 grid place-content-center">
          <Typography variant="h6" color="textSecondary">
            No tasks to show
          </Typography>
        </div>
      )}
    </Box>
  );
}

const mapState = (state) => ({
  userName: state.user.userName,
  email: state.user.email,
  mcqAndProgramData: state.mcqsandprograms.data,
  mcqAndProgramIsError: state.mcqsandprograms.isError,
  mcqAndProgramIsLoading: state.mcqsandprograms.isLoading,
});

const VerticalLinearStepper = connect(mapState)(VerticalLinearStepperComponent);

export default VerticalLinearStepper;
