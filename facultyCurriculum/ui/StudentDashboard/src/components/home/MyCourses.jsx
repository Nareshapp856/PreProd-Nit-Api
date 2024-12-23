import React, { useState } from "react";
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentTooltip,
  Toolbar,
  DateNavigator,
  CurrentTimeIndicator,
} from "@devexpress/dx-react-scheduler-material-ui";
import { ViewState } from "@devexpress/dx-react-scheduler";
import { Box, Container, Typography, Paper } from "@mui/material";
import { addDays, startOfWeek, getMonth, getYear } from "date-fns";
import { School, Quiz, Code } from "@mui/icons-material"; // Import MUI icons

const DATE = new Date();
const MONTH = getMonth(new Date());
const YEAR = getYear(new Date());

const BasicScheduler = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDateForDayOfWeek = (date, dayOfWeek) => {
    const startOfWeekDate = startOfWeek(date);
    const adjustedDate = addDays(startOfWeekDate, dayOfWeek - 1);
    return adjustedDate.getDate();
  };

  const placeholderSlots = [
    {
      id: "1",
      startDate: new Date(YEAR, MONTH, getDateForDayOfWeek(DATE, 1), 10, 0),
      endDate: new Date(YEAR, MONTH, getDateForDayOfWeek(DATE, 1), 11, 0),
      title: "React Mentorship",
      type: "MCQ Test",
      name: "mcq test 1",
    },
    {
      id: "2",
      startDate: new Date(YEAR, MONTH, getDateForDayOfWeek(DATE, 2), 12, 0),
      endDate: new Date(YEAR, MONTH, getDateForDayOfWeek(DATE, 2), 13, 0),
      title: "Angular Mentorship",
      type: "Coding Test",
      name: "coding test 1",
    },
    {
      id: "3",
      startDate: new Date(YEAR, MONTH, getDateForDayOfWeek(DATE, 3), 10, 0),
      endDate: new Date(YEAR, MONTH, getDateForDayOfWeek(DATE, 3), 11, 0),
      title: "Angular Mentorship",
      type: "Class",
      name: "john doe",
    },
    {
      id: "4",
      startDate: new Date(YEAR, MONTH, getDateForDayOfWeek(DATE, 4), 12, 0),
      endDate: new Date(YEAR, MONTH, getDateForDayOfWeek(DATE, 4), 13, 0),
      title: "Angular Mentorship",
      type: "Coding Test",
      name: "coding test 2",
    },
  ];

  const CustomAppointmentTooltip = ({ children, ...restProps }) => {
    const { appointmentData } = restProps;
    let Icon;
    switch (appointmentData.type) {
      case "Class":
        Icon = School;
        break;
      case "MCQ Test":
      case "Coding Test":
        Icon = Quiz;
        break;
      default:
        Icon = null;
    }

    return (
      <AppointmentTooltip.Content {...restProps}>
        <div className="flex items-center">
          {Icon && <Icon className="mr-2 mt-2" />}
          <Typography variant="body1" sx={{ fontWeight: 700 }}>
            {appointmentData.name}
          </Typography>
        </div>
        {children}
      </AppointmentTooltip.Content>
    );
  };

  return (
    <Container>
      <Box className="py-6">
        <div className="flex justify-between items-end">
          <Typography variant="h4" component="h1" className="font-bold">
            Weekly Courses
          </Typography>

          <section>
            <Typography variant="h6" component="h2" className="underline mb-2">
              Today
            </Typography>
            <ul className="flex gap-x-4 text-gray-600">
              <li className="flex items-center">
                <Typography variant="body1" className="font-medium mr-1">
                  Classes:
                </Typography>
                <Typography variant="body1" className="text-lg">
                  12
                </Typography>
              </li>
              <li className="flex items-center">
                <Typography variant="body1" className="font-medium mr-1">
                  MCQ Tests:
                </Typography>
                <Typography variant="body1" className="text-lg">
                  5
                </Typography>
              </li>
              <li className="flex items-center">
                <Typography variant="body1" className="font-medium mr-1">
                  Coding Tests:
                </Typography>
                <Typography variant="body1" className="text-lg">
                  6
                </Typography>
              </li>
            </ul>
          </section>
        </div>
        <hr className="my-4 border-gray-300" />
      </Box>
      <Box>
        <Paper elevation={3}>
          <Scheduler data={placeholderSlots}>
            <ViewState
              currentDate={currentDate}
              onCurrentDateChange={setCurrentDate}
            />
            <WeekView startDayHour={8} endDayHour={20} />
            <Appointments />
            <AppointmentTooltip
              showCloseButton
              contentComponent={CustomAppointmentTooltip}
            />
            <Toolbar />
            <DateNavigator />
            <CurrentTimeIndicator shadePreviousCells={true} />
          </Scheduler>
        </Paper>
      </Box>
    </Container>
  );
};

export default BasicScheduler;
