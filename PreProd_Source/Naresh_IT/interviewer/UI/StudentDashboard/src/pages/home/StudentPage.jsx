import { connect } from "react-redux";
import { Outlet, useNavigate } from "react-router";

import MainNav from "../../ui/home/MainNav";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import { useMenuContext } from "../../context/menuContext";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

function StudentPageComponent({ isAuthenticated }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const { isMenuOpen, navHeight } = useMenuContext();
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  return (
    <>
      <header className="relative">
        <MainNav />

        {isSmScreen && (
          <div className="fixed -top-[0px] left-0 h-[58px] w-full z-10 bg-white"></div>
        )}
      </header>

      <div className="min-h-screen min-w-full bg-gradient-to-r from-blue-800 via-white to-white opacity-[.10] fixed top-0 left-0 -z-10">
        <div className="min-h-screen min-w-full bg-gradient-to-b from-white via-white to-blue-800 opacity-60">
          <div className="min-h-screen min-w-full bg-gradient-to-t from-blue-800 via-white to-blue-800 opacity-70"></div>
        </div>
      </div>

      <AnimatePresence>
        <motion.main
          initial={{ opacity: 0, x: isSmScreen ? "100%" : "280px" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: isSmScreen ? "100%" : "280px" }}
          transition={{ duration: 0.3 }}
          style={{
            marginLeft: isSmScreen ? "0px" : "280px",
            marginTop: isSmScreen ? navHeight : "0px",
            display: isMenuOpen ? "none" : "block",
          }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <footer></footer>
    </>
  );
}

const mapState = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

const StudentPage = connect(mapState, null)(StudentPageComponent);

export default StudentPage;
