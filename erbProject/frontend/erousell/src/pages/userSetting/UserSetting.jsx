import React, { useState, useEffect } from 'react';
import AppLayout from '../../components/appLayout/AppLayout';
import { Container, Paper } from '@mui/material';
import styles from './userSetting.module.scss';
import _ from 'lodash';
import EditProfile from '../../components/editProfile/EditProfile';
import ResetForm from '../../components/resetForm/ResetForm';
import * as service from '../../core/Service';

const tabMenu = ['Edit profile', 'Change password'];

const UserSetting = () => {
  const [active, setActive] = useState(0);
  const [userInfo, setUserInfo] = useState(null);
  const [email, setEmail] = useState(null);
  const [valid,setValid] = useState(false);

  const user = localStorage.getItem("userInfo")?
      JSON.parse(localStorage.getItem("userInfo")):"";
  console.log(user);

  function handleChange(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let userName = data.get('Username');
    let firstName = data.get('First name');
    let lastName = data.get('Last name');
    let bio = data.get('Bio');
    console.log({firstName, lastName, userName, bio});
    if (userName&&firstName&&lastName&&bio){
      setValid(true);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let name = data.get('Username');
    let firstName = data.get('First name');
    let lastName = data.get('Last name');
    let bio = data.get('Bio');
    const userInfo = {firstName, lastName, name, bio};
    console.log(userInfo);

    let resp = await service.call('post', '/users/profile/'+user.userId,userInfo)
        .then((data)=>{
          console.log(data);
          window.alert(data);
          window.location.reload();
        })
        .catch(err=>{
          window.alert(err.response.data);
        })
  }
  const getProfileInfo =async ()=>{
    if (user){
      const resp = await service.call('get', '/users/profile/'+user.userId);
      setUserInfo(resp);
    }
  }
  useEffect(()=>{

  },[valid])

  useEffect(() => {
    fetchUserCenter();
    getProfileInfo();
  }, [])

  async function fetchUserCenter() {
    try {
      let resp = await service.call('get', '/userCenter/'+user.userId);
      const { email } = resp;
      if (resp) {
        setEmail(email);
      }
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <AppLayout>
      <Container className={styles.container}>
        <div className={styles.optionContainer}>
          {
            _.map(tabMenu, (item, index) => {
              console.log("index", index)
              return (
                <div
                  key={`selection_option_${index}`}
                  className={active === index ? `${styles.tab} ${styles.tabActive}` : styles.tab }
                  onClick={() => {setActive(index)}}
                >
                  {item}
                </div>
              )}
            )
          }
        </div>
        <div className={styles.paperContainer}>
          {
            active === 0 ? (
              <EditProfile valid={valid} handleSubmit={handleSubmit} handleChange={handleChange} email={email} userInfo={userInfo}/>
            ) : (
              <Paper className={styles.changePwContainer}>
                <h1 className={styles.changePwTitle}>Change password</h1>
                <ResetForm valid={valid} handleSubmit={handleSubmit} handleChange={handleChange}/>
              </Paper>
            )
          }
        </div>
      </Container>
    </AppLayout>
  );
};

export default UserSetting;