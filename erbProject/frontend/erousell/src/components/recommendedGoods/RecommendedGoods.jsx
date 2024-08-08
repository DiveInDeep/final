import React, { useEffect, useState } from 'react';
import { Grid, Button } from '@mui/material';
import styles from './recommendedGoods.module.scss';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ItemCards from '../itemCards/ItemCards';
import _ from 'lodash';
import * as service from '../../core/Service';

const RecommendedGoods = () => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetchAllItem();
  }, [])

  async function fetchAllItem() {
    try {
      let resp = await service.call('get', '/items/records/all');
      const { success, data } = resp;
      if (success) {
        console.log("data recommended", data)
        setResult(data);
      }

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <section>
      <Grid container className={styles.titleContainer}>
        <h3>Recommended For you</h3>
      </Grid>
      <div style={{display: 'flex', flexFlow: 'row wrap', margin:"0 -12px", justifyContent: _.isEmpty(result) && 'center'}}>
        {
          !_.isEmpty(result) ? (
          _.map(result, (item, index) => {
            if (item.status === 'HIDDEN' || item.status === 'CLOSED') return;
            return (
              <div style={{width: "calc(25% - 8px)", margin: "0 4px 16px"}} key={`recommended_goods_card_container_${index}`}>
                <ItemCards key={`recommended_goods_card_${index}`} item={item} id={item._id} />
              </div>
            )
          })) : (
          <div className={styles.noRecordContainer}>
            <img alt="item_no_record" className={styles.noRecordImg} src="https://mweb-cdn.karousell.com/build/no-coin-transaction-2QTRqJClkE.svg"/>
            <p>There is no item yet</p>
          </div>
          )
        }
      
      </div>
      <div className={styles.showMoreContainer}>
        {
          _.isEmpty(result) || result.length <= 40 ? "" : 
          <Button variant="outlined">View More</Button>

        }
      </div>
    </section>
  );
};

export default RecommendedGoods;