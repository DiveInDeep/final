import React from 'react';
import { IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import styles from './chevron.module.scss';

const Chevron = (props) => {
  const { direction } = props;
  return (
    <IconButton className={styles.buttonContainer}>
      {
        direction === "right" ? <ArrowForwardIosIcon /> : <ArrowBackIosNewIcon />
      }
    </IconButton>
  );
}

export default Chevron;