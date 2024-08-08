import React, { useState, useEffect } from "react";
import { Modal, Box, Button } from "@mui/material";
import styles from "./register.module.scss";
import Logo from "../../layouts/logo";
import CloseIcon from "@mui/icons-material/Close";
import AuthForm from "../authForm/AuthForm";
import * as service from "../../core/Service.js";

// //test
// import axios from "axios";

const Register = (props) => {
  const { isRegisterOpen, setIsRegisterOpen, setIsLoginOpen } = props;
  const [valid, setValid] = useState(false);
  const [validLength, setValidLength] = useState(true);
  const [validPassword, setValidPassword] = useState(true);

  function handleOpen(event, reason) {
    console.log("reason", reason);
    if (reason === "backdropClick") return;
    setIsRegisterOpen(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let userName = data.get("userName");
    let password = data.get("password");
    let email = data.get("email");

    console.log({ userName, password, email });

    let postObj = {
      name: userName,
      password: password,
      email: email,
    };
    console.log(postObj);

    try {
      // const API_URL = "http://localhost:4000/users"
      // let resp = await axios.post(API_URL+"/register",postObj);
      let resp = await service.call("post", "/users/register", postObj);
      if (resp.success) {
        setIsRegisterOpen(false);
      }
      if (resp.data.success) {
        setIsRegisterOpen(false);
      }
      console.log("resp", resp);
    } catch (err) {
      window.alert(err.response.data); //error message
      console.log(err);
    }
  }

  function handleChange(event) {
    const data = new FormData(event.currentTarget);
    let password = data.get("password");
    let confirmPassword = data.get("confirmPassword");
    let email = data.get("email");
    let userName = data.get("userName");
    let agreement = data.get("agreement");

    if (password && password.length < 8) {
      setValidLength(false);
    } else {
      setValidLength(true);
    }

    if (password && confirmPassword && password !== confirmPassword) {
      setValidPassword(false);
    } else {
      setValidPassword(true);
    }

    if (
      !password ||
      !email ||
      !userName ||
      !agreement ||
      password !== confirmPassword
    ) {
      setValid(false);
      return;
    }
    setValid(true);
  }

  return (
    <>
      <Modal
        open={isRegisterOpen}
        onClose={handleOpen}
        className={styles.modalContainer}
        disableScrollLock={true}
      >
        <Box className={styles.container}>
          <header>
            <div className={styles.wrapper}>
              <Logo noLink />
              <div className={styles.logoTitle}>Erousell</div>
            </div>
            <CloseIcon className={styles.close} onClick={handleOpen} />
          </header>
          <div className={styles.content}>
            {/* <Button className={styles.facebookBtn}>
            <img src="https://mweb-cdn.karousell.com/build/fb-icon-3NjbluDsCk.svg" alt="facebook_icon" className={styles.btnImg}/>
            Log in with Facebook
          </Button>
          <div className={styles.divider}>
            <span></span>
            <span>or</span>
            <span></span>
          </div> */}
            <AuthForm
              type="register"
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              valid={valid}
              validPassword={validPassword}
              validLength={validLength}
              setIsRegisterOpen={setIsRegisterOpen}
              setIsLoginOpen={setIsLoginOpen}
            />
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Register;
