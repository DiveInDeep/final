import React, {useEffect, useState} from 'react';
import { Modal, Box, Button, Alert } from '@mui/material';
import styles from './login.module.scss';
import Logo from '../../layouts/logo';
import CloseIcon from '@mui/icons-material/Close';
import AuthForm from '../authForm/AuthForm';
import * as Service from '../../core/Service';
import * as Main from '../../core/Main';
import { useDispatch } from 'react-redux';
import { setAuth, setUser } from '../../redux/actions/common';
// import axios from "axios";
import {useNavigate} from "react-router-dom";

const Login =(props)=> {
  const navigate = useNavigate();
  const { isLoginOpen, setIsLoginOpen, setIsRegisterOpen } = props;
  const [valid, setValid] = useState(false);
  const [validLength, setValidLength] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch()

  useEffect(()=>{
    setError(null)
  },[error])
  
  function handleOpen(event, reason) {
    if (reason === 'backdropClick') return;
    setIsLoginOpen(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let password = data.get('password');
    let email = data.get('email');
    console.log({password, email})
    
    let postObj = {
      email: email,
      password: password
    }

    try {
      // const API_URL = "http://localhost:4000/users"
      // let resp = await axios.post(API_URL+"/login",postObj);
      let url = "users/login";
      let resp = await Service.call('post', url, postObj)
      console.log('resp', resp);
      const { errors, accessToken, userId, user } = resp;
      console.log('accessToken', accessToken);
      const userInfo = {
        userName: user,
        accessToken: accessToken,
        userId: userId
      }

      
      if (!errors) {
        // if (resp.)
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        Main.setAccessToken(`Bearer ${accessToken}`);
        Main.setUserId(userId);
        dispatch(setAuth(true))
        dispatch(setUser(userInfo));
        setIsLoginOpen(false)
        return
      }
      setError(errors);
    } catch(err){
      console.error(err);
      window.alert(err.response.data.errors);
    } finally {
    }
  }

  function handleChange(event) {
    const data = new FormData(event.currentTarget);
    let password = data.get('password');
    let email = data.get('email');
    if (password && password.length < 8) {
      setValidLength(false)
      return
    }
      setValidLength(true);
    if (!password || !email) { 
      setValid(false);
      return;
    }
    setValid(true);
  }

  return (
    <>
    <Modal open={isLoginOpen} onClose={handleOpen} className={styles.modalContainer}>
      <Box className={styles.container}>
        <header>
          <div className={styles.wrapper}>
            <Logo noLink/>
            <div className={styles.logoTitle}>
              Erousell
            </div>
          </div>
          <CloseIcon className={styles.close} onClick={handleOpen}/>
        </header>
        <div className={styles.content}>

          {/* <Button className={styles.facebookBtn} onClick={()=>{window.location.assign("https://www.facebook.com")}}>
            <img src="https://mweb-cdn.karousell.com/build/fb-icon-3NjbluDsCk.svg" alt="facebook_icon" className={styles.btnImg}/>
            Log in with Facebook
          </Button>
          <div className={styles.divider}>
            <span></span>
            <span>or</span>
            <span></span>
          </div> */}
          <AuthForm
            type="login"
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            valid={valid}
            validLength={validLength}
            error={error}
            setIsLoginOpen={setIsLoginOpen}
            setIsRegisterOpen={setIsRegisterOpen}
          />
          
        </div>
      </Box>
    </Modal>
    </>
  )
};

export default Login;