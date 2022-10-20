import React, { useState } from 'react';
import { Grid, TextField, InputAdornment, IconButton, Button, Box} from '@mui/material';
import styles from './resetForm.module.scss';
import { VisibilityOff, Visibility } from '@mui/icons-material';

const ResetForm = (props) => {
  const {
    type,
    handleSubmit,
    valid,
    handleChange,
    validLength,
    validPassword,
    error,
  } = props;
  console.log(props);

  const [visible, setVisible] = useState(false);

  const handleClickShowPassword = () => {
    setVisible(!visible)
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box className={styles.container}  component="form" onSubmit={handleSubmit} onChange={handleChange}>
      <Grid container className={styles.wrapper}>
        {
          type === 'email' ? (
            <>
            <TextField label="Email" name="email" type='email' variant="outlined" size='small' color='secondary' sx={{width: '100%'}} />
            {
              error && <div className={styles.err}>
                Something Wrong please try again
              </div>
            }
            </>
          ) : (
            <>
              <Grid item className={styles.pwInputField}>
                  <TextField
                    name="password"
                    sx={{width: '100%'}}
                    label="Password"
                    variant="outlined"
                    size='small'
                    color='secondary'
                    type={visible ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {visible ? <Visibility className={styles.passwordIcon}/> : <VisibilityOff className={styles.passwordIcon}/>}
                        </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {/* {
                    !validLength && <div className={styles.err}>
                      Password not long enough
                    </div>
                  } */}
                </Grid>
                <Grid item className={styles.pwInputField}>
                  <TextField
                    name="password"
                    sx={{width: '100%'}}
                    label="Password"
                    variant="outlined"
                    size='small'
                    color='secondary'
                    type={visible ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {visible ? <Visibility className={styles.passwordIcon}/> : <VisibilityOff className={styles.passwordIcon}/>}
                        </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                {/* {
                  !validLength && <div className={styles.err}>
                    Password not long enough
                  </div>
                } */}
              </Grid>
            </>
            )
        }
        {
          <div className={styles.dashLine}></div>
        }
        {
          type === 'email' ? (
            <Grid item className={valid? `${styles.submitBtn}` : `${styles.submitBtn} ${styles.disabled}` }>
              <Button type="submit" variant="contained" disabled={!valid} sx={{width: "100%"}} className={styles.submit}>Send a password reset link</Button>
            </Grid>
          ) : (
            <Grid item className={valid? `${styles.submitBtn} ${styles.displayLeft}` : `${styles.submitBtn} ${styles.disabled} ${styles.displayLeft}` }>
            <Button type="submit" variant="contained" disabled={!valid} sx={{width: '100%'}} className={`${styles.submit}`}>Save Changes</Button>
          </Grid>
          )
        }
      </Grid>
    </Box>
  );
};

export default ResetForm;
