import React, { useState } from "react";
import {
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Button,
  Grid,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Box,
  Alert,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import styles from "./authForm.module.scss";
/**
 *
 * @param { Object } props
 * @param { String } props.type
 * @param { Function } props.handleSubmit
 * @param { Boolean } props.valid
 * @param { Function } props.handleChange
 * @param { Boolean } props.validLength
 * @param { Boolean } props.validPassword
 * @param { Boolean } props.error
 * @returns
 */

const AuthForm = (props) => {
  const {
    type,
    handleSubmit,
    valid,
    handleChange,
    validLength,
    validPassword,
    error,
    setOpen,
    setIsRegisterOpen,
    setIsLoginOpen,
  } = props;

  const [visible, setVisible] = useState(false);

  const handleClickShowPassword = () => {
    setVisible(!visible);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box
      className={styles.loginCard}
      component="form"
      onSubmit={handleSubmit}
      onChange={handleChange}
    >
      <Grid container className={styles.fieldsContainer} rowSpacing={2}>
        {type === "register" && (
          <Grid item>
            <TextField
              label="Username"
              name="userName"
              variant="outlined"
              size="small"
              color="secondary"
              sx={{ width: "100%" }}
            />
          </Grid>
        )}
        <Grid item>
          <TextField
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            size="small"
            color="secondary"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item>
          <TextField
            name="password"
            sx={{ width: "100%" }}
            label="Password"
            variant="outlined"
            size="small"
            color="secondary"
            type={visible ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {visible ? (
                      <Visibility className={styles.passwordIcon} />
                    ) : (
                      <VisibilityOff className={styles.passwordIcon} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {!validLength && (
            <div className={styles.err}>Password not long enough</div>
          )}
        </Grid>
        {type === "register" && (
          <Grid item>
            <TextField
              name="confirmPassword"
              sx={{ width: "100%" }}
              label="Confirm Password"
              variant="outlined"
              size="small"
              color="secondary"
              type={visible ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {visible ? (
                        <Visibility className={styles.passwordIcon} />
                      ) : (
                        <VisibilityOff className={styles.passwordIcon} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {!validPassword && (
              <div className={styles.err}>Passwords do NOT match</div>
            )}
          </Grid>
        )}
        {type === "login" ? (
          <>
            <Grid item className={styles.forgotPwContainer}>
              <a href="/forgot-password" className={styles.forgotPw}>
                Forgot Password?
              </a>
            </Grid>
            {error && <Alert severity="error">{error}</Alert>}
          </>
        ) : (
          <Grid className={styles.termsAndPrivacy}>
            <Checkbox className={styles.checkBox} name="agreement" />
            <span>
              I agree to receive promotions and marketing messages from Erousell
              and its partners
            </span>
          </Grid>
        )}
        <Grid
          item
          className={
            valid
              ? `${styles.submitBtn}`
              : `${styles.submitBtn} ${styles.disabled}`
          }
        >
          <Button
            type="submit"
            variant="contained"
            disabled={!valid}
            sx={{ width: "100%" }}
            className={styles.submit}
          >
            {type === "login" ? "Login" : "Sign up"}
          </Button>
        </Grid>
      </Grid>
      <Grid container className={styles.otherSection}>
        {type === "login" ? (
          <Grid item className={styles.redirectRegister}>
            <span>Don't have an account?</span>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                setOpen(false);
                setIsRegisterOpen(true);
              }}
            >
              Sign Up
            </div>
          </Grid>
        ) : (
          <Grid
            item
            className={`${styles.redirectRegister} ${styles.redirect}`}
          >
            <span>Have an account?</span>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                setOpen(false);
                setIsLoginOpen(true);
              }}
            >
              Log in now
            </div>
          </Grid>
        )}
        {type === "register" && (
          <div className={styles.registerTerms}>
            {`By signing up, you agree to Erousell’s `}
            <a href="https://support.carousell.com/hc/en-us/articles/115011881808">{`Terms of Service `}</a>
            {"&"}
            <a href="https://support.carousell.com/hc/en-us/articles/115006700307">{`Privacy Policy`}</a>
          </div>
        )}
      </Grid>
    </Box>
  );
};

export default AuthForm;
