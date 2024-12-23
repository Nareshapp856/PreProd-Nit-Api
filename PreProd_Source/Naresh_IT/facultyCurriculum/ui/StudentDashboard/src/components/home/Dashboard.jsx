import { useEffect, useState } from "react";
import Calender from "./dashboard/Calender";
import Steps from "./dashboard/Steps";
import { connect } from "react-redux";
import { getMcqandProgramsDispatch } from "../../redux/actions/dashboard";
import usePageVisibility from "../../hooks/dashboard/usePageVisibility";
import { useMediaQuery, useTheme } from "@mui/material";

function DashboardComponent({ userState, userName, getMcqandPrograms }) {
  const examTypeColors = {
    Theory: "#19A7CE",
    Code: "#B0531E",
    "Communication Skills": "#7286D3",
    "Core Java - Lab": "#507687",
    "Core Java - Theory": "#507687",
    "Html - Lab": "#66BFBF",
    "Html - Theory": "#66BFBF",
    MCQ: "#1EB0AE",
    "Oracle - Theory": "#19A7CE",
    // Add other exam types and colors here if needed
  };

  const theme = useTheme();

  const [selectedDate, setSelectedDate] = useState(new Date());

  // const isXsScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
  // const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));
  // const isLgScreen = useMediaQuery(theme.breakpoints.down("lg"));
  // const isXlScreen = useMediaQuery(theme.breakpoints.down("xl"));

  const dispatchGetMcqandPrograms = () => {
    if (userState.userId && selectedDate)
      getMcqandPrograms({
        studentId: userState.userId,
        date: selectedDate,
      });
  };

  const onVisible = () => {
    dispatchGetMcqandPrograms();
  };

  usePageVisibility({ onVisible });

  useEffect(() => {
    dispatchGetMcqandPrograms();
  }, [selectedDate, getMcqandPrograms]);

  return (
    <div
      style={{ padding: isSmScreen ? "0" : "1rem" }}
      className="py-[1.36rem]"
    >
      {isSmScreen && (
        <div className="mb-4 p-4 pb-0">
          <p className="text-xl font-bold mb-2">Welcome {userName}</p> <hr />
        </div>
      )}
      <div className="pt-2 ps-4 gap-x-4 flex flex-wrap xl:flex-nowrap">
        <div className="w-full xl:w-[38%] 2xl:w-[24%]">
          <Calender
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <h4>Legend</h4>
            {Object.entries(examTypeColors).map(([type, color]) => (
              <div
                key={type}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "5px",
                }}
              >
                <div
                  style={{
                    width: "15px",
                    height: "15px",
                    backgroundColor: color,
                    marginRight: "10px",
                    borderRadius: "3px",
                  }}
                />
                <span>{type}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full">
          <Steps selectedDate={selectedDate} />
        </div>
      </div>
    </div>
  );
}

const mapState = (state) => ({
  userState: state.user,
  userName: state.user.userName,
  macqandprogramState: state.mcqsandprograms.state,
});

const mapDispatch = {
  getMcqandPrograms: getMcqandProgramsDispatch,
};

const Dashboard = connect(mapState, mapDispatch)(DashboardComponent);

export default Dashboard;
