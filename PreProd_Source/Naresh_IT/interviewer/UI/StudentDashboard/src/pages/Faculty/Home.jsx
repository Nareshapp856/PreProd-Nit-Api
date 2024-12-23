import { useEffect } from "react";
import { connect } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { AnimatePresence, motion } from "framer-motion";

import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import MainNav from "../../ui/faculty/MainNav";
import { useMenuContext } from "../../context/menuContext";
import { TopicsListProvider } from "../../context/topicsListContext";
import { NavLinkProvider } from "../../context/navlinkContext";

/**
 * Faculty home layout with animated page transitions and menu handling.
 * Redirects unauthenticated users to login.
 */
function HomeComponent({ isAuthenticated }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isMenuOpen, navHeight } = useMenuContext();
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  return (
    <>
      <NavLinkProvider>
        <header className="relative">
          <MainNav />

          {isSmScreen && (
            <div className="fixed -top-[0px] left-0 h-[58px] w-full z-10 bg-white"></div>
          )}
        </header>

        {/** TODO: Optimize this multi-layered background for performance.
         *  This approach can be costly, consider using a single background layer. */}
        <div className="min-h-screen min-w-full bg-gradient-to-r from-[#B0531E52] via-white to-white opacity-[.10] fixed top-0 left-0 -z-10">
          <div className="min-h-screen min-w-full bg-gradient-to-b from-white via-white to-[#B0531E52] opacity-60">
            <div className="min-h-screen min-w-full bg-gradient-to-t from-[#B0531E52] via-white to-[#B0531E52] opacity-70"></div>
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
              overflowX: "auto",
              minHeight: "100vh",
            }}
          >
            <div className="w-[94%] mx-auto mt-6">
              <TopicsListProvider>
                <Outlet />
              </TopicsListProvider>
            </div>
          </motion.main>
        </AnimatePresence>

        <footer></footer>
      </NavLinkProvider>
    </>
  );
}

const mapState = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

const Faculty = connect(mapState)(HomeComponent);

export default Faculty;
