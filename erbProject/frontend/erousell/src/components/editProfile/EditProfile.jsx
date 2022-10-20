import React, { useEffect, useState } from 'react';
import { Paper, Grid, TextField, TextareaAutosize, Box, Button } from '@mui/material';
import styles from './editProfile.module.scss';
import _ from 'lodash';
import LockIcon from '@mui/icons-material/Lock';
import * as service from '../../core/Service';

const  publicInfoConfig = ['Username', 'First name', 'Last name', 'Bio'];

const EditProfile = (props) => {
  const {handleChange, handleSubmit, email,userInfo,valid} = props;

  useEffect(() => {

    // fetchUserCenter();
  }, [])
  // async function fetchUserCenter() {
  //   try {
  //     let resp = await service.call('get', '/userCenter');
  //     if (resp) {
  //     }
  //   } catch(err) {
  //     console.error(err);
  //   }
  // }


  return (
    <Paper className={styles.card}>
      <Box onSubmit={handleSubmit} onChange={handleChange} component="form" >
        <h1>Edit profile</h1>
        <h3>Profile photo</h3>
        <div className="settingUploadImg">
          <div>
            <span className={styles.imgWrapper}>
              <img src="https://media.karousell.com/media/photos/profiles/default.png" alt="default_icon" />
            </span>
          </div>
          <div>Clear frontal face photos are an important way for buyers and sellers to learn about each other.</div>
        </div>

        <Grid container className={styles.inputFieldContainer}>
          <h3 className={styles.infoTitle}>Public profile</h3>
          {
            _.map(publicInfoConfig, (item, index) => {
              return (
                <Grid item key={`public_input_field_${index}`} className={styles.inputField}>
                  <TextField label={item} name={item} type='text' variant="outlined" size='small' color='secondary' sx={{width: '100%'}} key={`public_text_field_${index}`}/>
                </Grid>
              )
            })
          }
        </Grid>
        
        <Grid container className={styles.inputFieldContainer}>
          <h3 className={styles.infoTitle}>Private profile</h3>
          <div className={styles.desc}>
            <LockIcon />
            <p>
              We do not share this information with other users unless explicit permission is given by you.
            </p>
          </div>

          {
            <Grid item className={styles.inputField}>
              <TextField label='email' name='email' type='email' disabled variant="outlined" size='small' color='secondary' sx={{width: '100%'}} value={email} defaultValue="email" />
            </Grid>
          }

          <div className={styles.dashLine}></div>

          <Grid item className={styles.submitBtn}>
            <Button type="submit" variant="contained" sx={{width: "100%"}}
                    className={styles.submit}
                    disabled={!valid}
            >
              Save Changes
            </Button>
          </Grid>
            
        </Grid>
      </Box>
    </Paper>
  );
};

export default EditProfile;