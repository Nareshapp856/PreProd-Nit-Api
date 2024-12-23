import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  MenuList,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import Divider from "@mui/material/Divider";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

import Profile from "./adminsidenav/Profile";
import brand_logo from "../../../assets/brand_logo.png";
import { useMenuContext } from "../../../context/menuContext";

function FacultySideNav() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const { isMenuOpen, toggleMenu } = useMenuContext();

  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const menuDashboard = () => {
    navigate("/");
    toggleMenu();
  };

  const courseCurriculum = () => {
    navigate("/admin/course-curriculum");
  };

  const addInterviewer = () => {
    navigate("/admin/add-interviewer");
  };

  const assignBatches = () => {
    navigate("/admin/assign-batches");
  };

  const registerInterviewer = () => {
    navigate("/admin/interviewer-registration");
  };

  const testcreationNavigation = () => {
    window.location.href =
      "http://admindba.nareshit.net/categories/assessmentlist";
  };

  const questiondbNavigation = () => {
    window.location.href = "http://.13:3001/";
  };

  const usermanagementNavigation = () => {
    window.location.href = "http://admindba.nareshit.net/user-management";
  };

  const assigntestNavigation = () => {
    window.location.href = "http://admindba.nareshit.net/enroll-student";
  };
  return !isSmScreen ? (
    <nav
      className="fixed left-0 top-0 bg-blue-800 bg-opacity-[.04] min-h-screen max-h-screen border-r-blue-400 border-opacity-20 shadow-lg shadow-blue-200 border-[1px] text-[#070707]"
      style={{ width: "280px" }}
    >
      <div className="ms-2 mt-3 mb-3">
        <img src={brand_logo} alt="NareshIT" width={240} height={140} />
      </div>

      <Divider />

      <div className="relative w-full m-2">
        <Profile />
      </div>

      <Divider />

      <Divider />

      <MenuList>
        <Box className="my-3" marginLeft={2}>
          <Typography>Navigation</Typography>
        </Box>

        <MenuItem
          sx={{ paddingBlock: 0, marginBlock: 0 }}
          onClick={courseCurriculum}
        >
          <List sx={{ paddingBlock: 0, marginBlock: 0.4 }} className="w-full">
            <ListItem
              style={{
                backgroundColor:
                  location.pathname === "/admin/course-curriculum"
                    ? "rgba(30,64,175,.20)"
                    : null,
              }}
              className="rounded"
            >
              <ListItemAvatar>
                <CalendarMonthIcon />
              </ListItemAvatar>
              <ListItemText
                primary="View Curriculums"
                title="view faculty course curriculum"
              />
            </ListItem>
          </List>
        </MenuItem>

        <MenuItem
          sx={{ paddingBlock: 0, marginBlock: 0 }}
          onClick={assignBatches}
        >
          <List sx={{ paddingBlock: 0, marginBlock: 0.4 }} className="w-full">
            <ListItem
              style={{
                backgroundColor:
                  location.pathname === "/admin/assign-batches"
                    ? "rgba(30,64,175,.20)"
                    : null,
              }}
              className="rounded"
            >
              <ListItemAvatar>
                <CalendarMonthIcon />
              </ListItemAvatar>
              <ListItemText primary="Assign Batches" />
            </ListItem>
          </List>
        </MenuItem>

        <MenuItem
          sx={{ paddingBlock: 0, marginBlock: 0 }}
          onClick={addInterviewer}
        >
          <List sx={{ paddingBlock: 0, marginBlock: 0.4 }} className="w-full">
            <ListItem
              style={{
                backgroundColor:
                  location.pathname === "/admin/add-interviewer"
                    ? "rgba(30,64,175,.20)"
                    : null,
              }}
              className="rounded"
            >
              <ListItemAvatar>
                <CalendarMonthIcon />
              </ListItemAvatar>
              <ListItemText primary="Add Interviewer" />
            </ListItem>
          </List>
        </MenuItem>
      </MenuList>

      <MenuItem
        sx={{ paddingBlock: 0, marginBlock: 0 }}
        onClick={registerInterviewer}
      >
        <List sx={{ paddingBlock: 0, marginBlock: 0.4 }} className="w-full">
          <ListItem
            style={{
              backgroundColor:
                location.pathname === "/admin/interviewer-registration"
                  ? "rgba(30,64,175,.20)"
                  : null,
            }}
            className="rounded"
          >
            <ListItemAvatar>
              <CalendarMonthIcon />
            </ListItemAvatar>
            <ListItemText
              primary="Register Interviewer"
              title="register an interviewer"
            />
          </ListItem>
        </List>
      </MenuItem>

      <MenuItem
        sx={{ paddingBlock: 0, marginBlock: 0 }}
        onClick={testcreationNavigation}
      >
        <List sx={{ paddingBlock: 0, marginBlock: 0.4 }} className="w-full">
          <ListItem
            style={{
              backgroundColor:
                location.pathname === "/admin/interviewer-registration"
                  ? "rgba(30,64,175,.20)"
                  : null,
            }}
            className="rounded"
          >
            <ListItemAvatar>
              <CalendarMonthIcon />
            </ListItemAvatar>
            <ListItemText primary="TestCreate" title="testcreation" />
          </ListItem>
        </List>
      </MenuItem>

      <MenuItem
        sx={{ paddingBlock: 0, marginBlock: 0 }}
        onClick={questiondbNavigation}
      >
        <List sx={{ paddingBlock: 0, marginBlock: 0.4 }} className="w-full">
          <ListItem
            style={{
              backgroundColor:
                location.pathname === "/admin/interviewer-registration"
                  ? "rgba(30,64,175,.20)"
                  : null,
            }}
            className="rounded"
          >
            <ListItemAvatar>
              <CalendarMonthIcon />
            </ListItemAvatar>
            <ListItemText primary="Question'sDB" title="questiondb" />
          </ListItem>
        </List>
      </MenuItem>

      <MenuItem
        sx={{ paddingBlock: 0, marginBlock: 0 }}
        onClick={usermanagementNavigation}
      >
        <List sx={{ paddingBlock: 0, marginBlock: 0.4 }} className="w-full">
          <ListItem
            style={{
              backgroundColor:
                location.pathname === "/admin/interviewer-registration"
                  ? "rgba(30,64,175,.20)"
                  : null,
            }}
            className="rounded"
          >
            <ListItemAvatar>
              <CalendarMonthIcon />
            </ListItemAvatar>
            <ListItemText primary="UserManagement" title="usermanagement" />
          </ListItem>
        </List>
      </MenuItem>

      <MenuItem
        sx={{ paddingBlock: 0, marginBlock: 0 }}
        onClick={assigntestNavigation}
      >
        <List sx={{ paddingBlock: 0, marginBlock: 0.4 }} className="w-full">
          <ListItem
            style={{
              backgroundColor:
                location.pathname === "/admin/interviewer-registration"
                  ? "rgba(30,64,175,.20)"
                  : null,
            }}
            className="rounded"
          >
            <ListItemAvatar>
              <CalendarMonthIcon />
            </ListItemAvatar>
            <ListItemText primary="Assign Test" title="assigntest" />
          </ListItem>
        </List>
      </MenuItem>
    </nav>
  ) : (
    <>
      <nav
        className="fixed left-0 top-0 bg-blue-800 bg-opacity-[.04] z-20 min-w-full flex items-center justify-between border-r-blue-400 border-opacity-20 shadow-lg shadow-blue-200 border-[1px] text-[#070707]"
        style={{ width: "280px", height: isSmScreen ? "58px" : "" }}
      >
        <div className="ms-2 mt-4 mb-3">
          <img src={brand_logo} alt="NareshIT" width={160} height={80} />
        </div>
        <div className="me-1">
          <IconButton onClick={toggleMenu}>
            {isMenuOpen ? (
              <MenuOpenIcon sx={{ fontSize: "26px" }} />
            ) : (
              <MenuIcon sx={{ fontSize: "26px" }} />
            )}
          </IconButton>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="fixed left-0 top-14 z-20 bg-blue-800 bg-opacity-[.04] min-w-full border-r-blue-400 border-opacity-20 shadow-lg shadow-blue-200 border-[1px] text-[#070707]"
              style={{ zIndex: 1 }}
            >
              <MenuList className="relative h-screen">
                <MenuItem
                  sx={{ paddingBlock: 0, marginBlock: 0 }}
                  onClick={menuDashboard}
                >
                  <List
                    sx={{ paddingBlock: 0, marginBlock: 0.4 }}
                    className="w-full"
                  >
                    <ListItem className="rounded">
                      <ListItemAvatar>
                        <CalendarMonthIcon />
                      </ListItemAvatar>
                      <ListItemText primary="Attendance Tracker" />
                    </ListItem>
                  </List>
                </MenuItem>

                <MenuItem
                  sx={{ paddingBlock: 0, marginBlock: 0 }}
                  onClick={assignBatches}
                >
                  <List
                    sx={{ paddingBlock: 0, marginBlock: 0.4 }}
                    className="w-full"
                  >
                    <ListItem className="rounded">
                      <ListItemAvatar>
                        <CalendarMonthIcon />
                      </ListItemAvatar>
                      <ListItemText primary="Assign Batches" />
                    </ListItem>
                  </List>
                </MenuItem>

                <MenuItem
                  sx={{ paddingBlock: 0, marginBlock: 0 }}
                  onClick={addInterviewer}
                >
                  <List
                    sx={{ paddingBlock: 0, marginBlock: 0.4 }}
                    className="w-full"
                  >
                    <ListItem className="rounded">
                      <ListItemAvatar>
                        <CalendarMonthIcon />
                      </ListItemAvatar>
                      <ListItemText primary="Add Interviewer" />
                    </ListItem>
                  </List>
                </MenuItem>
              </MenuList>
            </motion.nav>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

export default FacultySideNav;
