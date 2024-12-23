import { memo, useEffect, useState } from "react";
import Calender from "./dashboard/Calender";
import Steps from "./dashboard_beta/Steps";
import { connect } from "react-redux";
import { getMcqandProgramsDispatch } from "../../redux/actions/dashboard";
import usePageVisibility from "../../hooks/dashboard/usePageVisibility";
import { useMediaQuery, useTheme } from "@mui/material";
import Graph from "./dashboard_beta/Graph";

function DashboardComponent({ userState, userName, getMcqandPrograms }) {
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
    <div style={{ marginInlineStart: "280px", padding: "20px" }}>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="rounded md:w-1/3 w-full p-4">
          <Calender
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>
        <div className="md:w-2/3 w-[60%] p-4 max-h-[400px]">
          <Steps />
        </div>
      </div>
      <div>
        <div className="rounded mt-4 p-4 overflow-auto minimize-scroll-width">
          <Graph />
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

const Dashboard_beta = connect(mapState, mapDispatch)(DashboardComponent);

export default memo(Dashboard_beta);
