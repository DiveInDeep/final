import React, {useEffect, useState} from 'react';
import styles from './authMenu.module.scss';
import Login from '../login';
import Register from '../register/Register';
import { Avatar, Menu, Typography, MenuItem } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import * as Main from '../../core/Main';
import { setAuth, setUser } from '../../redux/actions/common';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';


const popoverMenu = [
  {title: 'Profile', link: '/profile', img:<PersonIcon />},
  {title: 'Setting', link: '/setting', img: <SettingsIcon />},
  {title: 'Logout', link: '/logout', img: <LogoutIcon />}
]

const AuthMenu = () => {
  const [registerOpen, setRegisterOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const auth = useSelector((state) => state.app.auth);
  const user = useSelector((state) => state.app.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{

  },[registerOpen,loginOpen])

  function handleClick(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }

  function handleClose(event, link) {
    if (event === 'Profile') {
      navigate(link)
    }

    if (event === 'Setting') {
      navigate(link)
    }
    
    if (event === "Logout") {
      logout();
    }

    setAnchorEl(null);
  }

  function logout() {
    Main.setAccessToken(null);
    Main.setUserId(0);
    dispatch(setUser({}));
    dispatch(setAuth(false));
    localStorage.clear();
    navigate('/')
  }


  return (
    <div className={styles.container}>
      {
        !auth ? (
          <>
            <div
              className={styles.authItem}
              onClick={() => {setRegisterOpen(true)}}
              >
              Register
            </div>
            <div
              className={styles.authItem}
              onClick={() => {setLoginOpen(true)}}
            >
              Login
            </div>
          </>
        ) : (
          <div className={styles.isAuth}>
              <Avatar alt="nav_user_icon" src="https://media.karousell.com/media/photos/profiles/default.png"  className={styles.navUserIcon} />
              <Typography
                onMouseEnter={handleClick}
                onMouseLeave={handleClose}
                className={styles.userNameWrapper}
              >
                Hello, <span>{user?.userName || ""}</span>
                {
                  anchorEl ? <ExpandLessIcon/> : <ExpandMoreIcon/>
                }
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  MenuListProps={{ onMouseLeave: handleClose }}
                >
                  {
                    _.map(popoverMenu, (item, index) => {
                      return (
                        <MenuItem onClick={() => handleClose(item.title, item.link)} key={`auth_popover_${index}`}>
                          <span className={styles.popoverImg}>
                            {item.img}
                          </span>
                          {item.title}
                        </MenuItem>
                      )
                    })
                  }
                </Menu>
              </Typography>
          </div>

        )
      }
      
      <Register open={registerOpen} setOpen={setRegisterOpen} setLoginOpen={setLoginOpen}/>
      <Login open={loginOpen} setOpen={setLoginOpen} setRegisterOpen={setRegisterOpen}/>
    </div>
  )
};

export default AuthMenu;
