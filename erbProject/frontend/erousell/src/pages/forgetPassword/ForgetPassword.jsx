import React, { useState } from 'react';
import { Container, Paper } from '@mui/material';
import styles from './forgetPassword.module.scss';
import Logo from '../../layouts/logo';
import ResetForm from '../../components/resetForm/ResetForm';
import * as service from '../../core/Service';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


const ForgetPassword = () => {
  const [valid, setValid] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();


  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let email = data.get('email');
    
    let postObj = {
      email: email
    }

    try {
      // const API_URL = "http://localhost:4000/email"
      // let resp = await axios.post(API_URL+"/api/send",postObj);
      let resp = await service.call('post', '/email/api/send', postObj)
      console.log('???', postObj)
      console.log(resp)
      const { msg } = resp.data;
      if (msg === "success") {
        window.alert("Already send email! now redirect to homepage")
        navigate('/');
      } else {
        setError(true)
      }
    } catch(err) {
      setError(true)
    }
  }

  function handleChange(event) {
    const data = new FormData(event.currentTarget);
    let email = data.get('email');

    if (_.includes(email, '@')) {
      setValid(true);
    } else {
      setValid(false)
    }
}


  return (
    <Container className={styles.container}>
      <Paper className={styles.wrapper}>

        <div className={styles.logoWrapper}>
          <Logo />
          <div className={styles.logoTitle}>
            Erousell
          </div>
        </div>

        <h1 className={styles.title}>Reset password</h1>
        <div className={styles.desc}>Enter the email address of your account</div>
        <ResetForm type="email" handleSubmit={handleSubmit} valid={valid} handleChange={handleChange} error={error}/>
        <br/>
        <a href="/">Route Me to Homepage</a>
      </Paper>
    </Container>
  );
};

export default ForgetPassword;