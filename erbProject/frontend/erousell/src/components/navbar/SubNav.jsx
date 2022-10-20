import React, { useEffect, useState } from 'react';
import styles from './subNav.module.scss';
import { Container, TextField, InputAdornment, Button, Drawer } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import Logo from '../../layouts/logo';
import { useNavigate, useLocation } from 'react-router-dom';

const SubNav = () => {
  const  navigate = useNavigate();
  const location = useLocation();
  const [ isSell, setIsSell ] = useState(false);
  let sell = location.pathname.split('/')[1];
  
  console.log("this is location", location.pathname.split('/')[1])

  useEffect(() => {
    if(!location.pathname) return;
    if (sell === 'sell') {
      setIsSell(true);
    }
  }, [location])

  return (
    <div className={styles.subNav}>
      {
        isSell ? (
          <Container className={styles.container}>
            <h3 className={styles.sellTitle}>
              What are you listing today?
            </h3>
          </Container>
        ) : (
          <Container className={styles.container}>
            <div className={styles.subNavWrapper}>
              <a href="/">
                <div className={styles.logoContainer}>
                  <Logo noLink/>
                  <div className={styles.logoTitle}>
                    Erousell
                  </div>
                </div>
              </a>
              {/* <div className={styles.inputContainer}>
                <TextField variant="outlined" placeholder='Search' className={styles.search} />
                <TextField
                  variant="outlined"
                  placeholder='text'
                  className={styles.search}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <Button className={styles.searchButton}>
                        <SearchIcon className={styles.searchIcon}/>
                      </Button>
                    )
                  }}
                />
              </div> */}
            </div>
              <Button
                className={styles.sell}
                onClick={() => {
                  navigate('/sell')
                }}
              >
                Sell
              </Button>
          </Container>
        )
      }
      <Drawer>
        hihi
      </Drawer>
    </div>
  )
};

export default SubNav;