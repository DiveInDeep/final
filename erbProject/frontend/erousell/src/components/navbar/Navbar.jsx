import React from 'react';
import { Container } from '@mui/material';
import styles from './navbar.module.scss';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import NavMenu from './NavMenu';
import SubNav from './SubNav';
import AuthMenu from './AuthMenu';

const Navbar = () => {
  
  return (
    <header className={styles.navbar}>
      <div className={styles.wrapper}>
        <Container className={styles.container}>
          <a href='/' className={styles.logoContainer}>
            <div className={styles.logoWrapper}>
              <FlipCameraAndroidIcon className={styles.logo} />
            </div>
          </a>
          <div className={styles.pipeline}></div>
          {/*<NavMenu />*/}
          <AuthMenu />
        </Container>
      </div>
      <SubNav/>
    </header>
  )
};

export default Navbar;
