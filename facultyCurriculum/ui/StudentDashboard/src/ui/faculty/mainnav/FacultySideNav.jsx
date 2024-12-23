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

import Profile from "./facultysidenav/Profile";
import brand_logo from "../../../assets/brand_logo.png";
import { useMenuContext } from "../../../context/menuContext";
import { useNavLinkState } from "../../../context/navlinkContext";

function FacultySideNav() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const navHook = useNavLinkState();

  const handleNavClick = (e, callback) => {
    // not part of this component, might be using this event in other places
    navHook.notify("navigationchangestart", callback);

    if (navHook?.navLinksDisabled) {
      e.preventDefault();
    } else {
      callback();
    }
  };

  const { isMenuOpen, toggleMenu } = useMenuContext();

  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const attendanceTracker = () => {
    navigate("/faculty/attendance-tracker");
  };
  const viewCurriculum = () => {
    navigate("/faculty/view-course-curriculum");
  };
  const createCurriculum = () => {
    navigate("/faculty/create-course-curriculum");
  };

  const menuDashboard = () => {
    navigate("/");
    toggleMenu();
  };

  const myBatches = () => {
    navigate("/faculty/mybatches");
  };

  const assignCurriculum = () => {
    navigate("/faculty/assign-curriculum");
  };

  const pendingApproval = () => {
    navigate("/faculty/pending-approval");
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

        {/* <MenuItem
          sx={{ paddingBlock: 0, marginBlock: 0 }}
          onClick={attendanceTracker}
        >
          <List sx={{ paddingBlock: 0, marginBlock: 0.4 }} className="w-full">
            <ListItem
              style={{
                backgroundColor:
                  location.pathname === "/faculty/attendance-tracker"
                    ? "rgba(30,64,175,.20)"
                    : null,
              }}
              className="rounded"
            >
              <ListItemAvatar>
                <CalendarMonthIcon />
              </ListItemAvatar>
              <ListItemText primary="Attendance Tracker" />
            </ListItem>
          </List>
        </MenuItem> */}
        <MenuItem
          sx={{ paddingBlock: 0, marginBlock: 0 }}
          onClick={(e) => handleNavClick(e, viewCurriculum)}
        >
          <List sx={{ paddingBlock: 0, marginBlock: 0.4 }} className="w-full">
            <ListItem
              style={{
                backgroundColor:
                  location.pathname === "/faculty/view-course-curriculum"
                    ? "rgba(30,64,175,.20)"
                    : null,
              }}
              className="rounded"
            >
              <ListItemAvatar>
                <EditCalendarIcon />
              </ListItemAvatar>
              <ListItemText primary="View Curriculum" />
            </ListItem>
          </List>
        </MenuItem>
        <MenuItem
          sx={{ paddingBlock: 0, marginBlock: 0 }}
          onClick={(e) => handleNavClick(e, createCurriculum)}
        >
          <List sx={{ paddingBlock: 0, marginBlock: 0.4 }} className="w-full">
            <ListItem
              style={{
                backgroundColor:
                  location.pathname === "/faculty/create-course-curriculum"
                    ? "rgba(30,64,175,.20)"
                    : null,
              }}
              className="rounded"
            >
              <ListItemAvatar>
                <EditCalendarIcon />
              </ListItemAvatar>
              <ListItemText primary="Create Curriculum" />
            </ListItem>
          </List>
        </MenuItem>
        <MenuItem
          sx={{ paddingBlock: 0, marginBlock: 0 }}
          onClick={(e) => handleNavClick(e, assignCurriculum)}
        >
          <List sx={{ paddingBlock: 0, marginBlock: 0.4 }} className="w-full">
            <ListItem
              style={{
                backgroundColor:
                  location.pathname === "/faculty/assign-curriculum"
                    ? "rgba(30,64,175,.20)"
                    : null,
              }}
              className="rounded"
            >
              <ListItemAvatar>
                <EditCalendarIcon />
              </ListItemAvatar>
              <ListItemText primary="Assign Curriculum" />
            </ListItem>
          </List>
        </MenuItem>
      </MenuList>
      <MenuItem
        sx={{ paddingBlock: 0, marginBlock: 0 }}
        onClick={(e) => handleNavClick(e, pendingApproval)}
      >
        <List sx={{ paddingBlock: 0, marginBlock: 0.4 }} className="w-full">
          <ListItem
            style={{
              backgroundColor:
                location.pathname === "/faculty/pending-approval"
                  ? "rgba(30,64,175,.20)"
                  : null,
            }}
            className="rounded"
          >
            <ListItemAvatar>
              <EditCalendarIcon />
            </ListItemAvatar>
            <ListItemText primary="Pending Approval" />
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
              </MenuList>
            </motion.nav>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

export default FacultySideNav;
