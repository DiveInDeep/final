import React, { useState } from "react";
import { Container } from "@mui/material";
import styles from "./navbar.module.scss";
import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";
import NavMenu from "./NavMenu";
import SubNav from "./SubNav";
import AuthMenu from "./AuthMenu";
import Register from "../register/Register";
import Login from "../login";

const Navbar = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  return (
    <>
      <header className={styles.navbar}>
        <div className={styles.wrapper}>
          <Container className={styles.container}>
            <a href="/" className={styles.logoContainer}>
              <div className={styles.logoWrapper}>
                <FlipCameraAndroidIcon className={styles.logo} />
              </div>
            </a>
            <div className={styles.pipeline}></div>
            {/*<NavMenu />*/}
            <AuthMenu
              setIsLoginOpen={setIsLoginOpen}
              setIsRegisterOpen={setIsRegisterOpen}
            />
          </Container>
        </div>
        <SubNav />
      </header>
      <Register
        isRegisterOpen={isRegisterOpen}
        setIsRegisterOpen={setIsRegisterOpen}
        setIsLoginOpen={setIsLoginOpen}
      />
      <Login
        isLoginOpen={isLoginOpen}
        setIsLoginOpen={setIsLoginOpen}
        setIsRegisterOpen={setIsRegisterOpen}
      />
    </>
  );
};

export default Navbar;
