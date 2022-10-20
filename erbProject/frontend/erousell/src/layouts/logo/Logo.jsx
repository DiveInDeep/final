import React from 'react';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import styles from './logo.module.scss';

/**
 * 
 * @param { Object } props 
 * @param { Boolean } props.noLink 
 * @param { String } props.classStyle
 * @returns { JSX.Element }
 */ 

const Logo = (props) => {
  const { noLink, classStyle = "" } = props;
  return (
    <>
      {
        noLink ? (
          <div className={classStyle ? classStyle : styles.logoWrapper}>
            <FlipCameraAndroidIcon />
          </div>
        ) : (
          <a href='/'>
            <div className={classStyle ? classStyle : styles.logoWrapper}>
              <FlipCameraAndroidIcon />
            </div>
          </a>
        )
      }
    </>
  );
};

export default Logo;