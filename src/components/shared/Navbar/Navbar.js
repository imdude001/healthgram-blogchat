import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import * as db from "../../../firebase/config";
const auth = firebase.auth();

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  appBarTransparent: {
    backgroundColor: "#00000018",
  },
  appBarSolid: {
    backgroundColor: "#0000009a",
  },
}));

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const Navbar = (props) => {
  const [user] = useAuthState(auth);
  const classes = useStyles();

  const [navBackground, setNavBackground] = useState("appBarTransparent");
  const navRef = useRef();
  navRef.current = navBackground;
  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 300;
      if (show) {
        setNavBackground("appBarSolid");
      } else {
        setNavBackground("appBarTransparent");
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={classes.root}>
      <div className="position-absolute">
        <CssBaseline />
        <HideOnScroll {...props}>
          <AppBar elevation={0} className={classes[navRef.current]}>
            <Toolbar className={classes.toolbar}>
              <Typography variant="h6" className={classes.title}>
                <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                  Healthgram
                </Link>
              </Typography>
              <div className="mr-0">
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Button style={{ color: "white" }} edge="end">
                    Get Started
                  </Button>
                </Link>
                <Link
                  to="/create"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Button style={{ color: "white" }} edge="end">
                    Create
                  </Button>
                </Link>

                {user && (
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "white" }}
                    onClick={db.logOut}
                  >
                    <Button style={{ color: "white" }} edge="end">
                      Logout
                    </Button>
                  </Link>
                )}
              </div>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        <Toolbar />
        <Container className="m-0 p-0"></Container>
      </div>
    </div>
  );
};
export default Navbar;
