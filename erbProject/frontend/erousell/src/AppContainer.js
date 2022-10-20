import React, { useEffect, useState } from 'react';
import AppRoute from './AppRoute';
import { useSelector, useDispatch } from 'react-redux';
import * as Main from './core/Main';
import { setAuth, setUser } from './redux/actions/common';


function AppContainer () {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.app.auth);
  const user = useSelector((state) => state.app.user);


  useEffect(() => {
    restoreUserInfo();
  }, [])

  function restoreUserInfo() {
    let userInfo = {};
      if (
        !auth
        && user.accessToken === null 
        && localStorage.userInfo !== undefined
      ) {
        userInfo = JSON.parse(localStorage.userInfo);
      } else return;
      Main.setAccessToken(`Bearer ${userInfo?.accessToken}`)
      Main.setUserId(userInfo.userId);

      let acc = Main.getAccessToken()
      let uid = Main.getUserId();
      console.log({acc, uid});
      dispatch(setAuth(true));
      dispatch(setUser(userInfo))
  }


  return (
    <AppRoute/>
  )
}

export default AppContainer;