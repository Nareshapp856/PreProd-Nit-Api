import React, { useMemo } from "react";
import { AppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";
import { School, Quiz, Edit, Close } from "@mui/icons-material";
import { Typography } from "@mui/material";

const CustomAppointmentTooltip = ({ appointmentData, ...restProps }) => {
  const { type, name, startDate, endDate } = appointmentData;

  let Icon;
  switch (type) {
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
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-1">
          <Typography variant="h6">{appointmentData.title}</Typography>
          <div className="flex items-center">
            <Edit className="cursor-pointer mr-2" />
            <Close className="cursor-pointer" />
          </div>
        </div>
        <div className="flex items-center my-1">
          {Icon && <Icon className="mr-2" />}
          <Typography variant="body1">{name}</Typography>
        </div>
        <Typography variant="body2">
          {new Date(startDate).toLocaleTimeString()} -{" "}
          {new Date(endDate).toLocaleTimeString()}
        </Typography>
      </div>
    </AppointmentTooltip.Content>
  );
};

export default CustomAppointmentTooltip;
