import React from 'react';
import { Grid } from '@mui/material';
import styles from './categoryCard.module.scss';
import _ from 'lodash';

const CategoryCard = (props) => {
  const { title="", imgSrc="", navigator=""} = props;

  return(
    <div className={styles.container}>
      <a href={`/category/?${navigator}`} className={styles.wrapper}>
        <div className={styles.imgWrapper}>
          <img src={imgSrc} alt={`category_card_${title}`}/>
        </div>
        <div className={styles.cardTitle}>
          {title}
        </div>
      </a>
    </div>
  );
};

export default CategoryCard;