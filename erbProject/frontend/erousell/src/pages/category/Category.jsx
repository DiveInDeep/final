import React, { useEffect, useState } from 'react';
import AppLayout from '../../components/appLayout';
import { Container } from '@mui/material';
import styles from './category.module.scss';
import { useLocation } from 'react-router-dom';
import * as service from '../../core/Service';
import _ from 'lodash';
import ItemCards from '../../components/itemCards';
import { tagObj } from '../../helpers/enumConfig';

const Category = () => {
  let location = useLocation();
  let type = location.search.split("?")[1]
  const [result, setResult] = useState([]);


  useEffect(() => {
    fetchResult();
    console.log("tag",tagObj[type])
  }, [location])

  async function fetchResult () {
    console.log("call?")
    try {
      let resp = await service.call('post', '/items/search', {tags: tagObj[type]})
      console.log("resp", resp)
      if (!resp) {return};
      setResult(resp.items);
    } catch(err){
      console.error(err);
    }
  }

  return (
    <AppLayout>
      <Container className={styles.header}>
          <h3 className={styles.sellTitle}>
            {tagObj[type]}
          </h3>
        </Container>
      <Container className={styles.container}>
        <div style={{paddingTop: "24px", display: "flex", justifyContent: 'space-evenly'}}>
          {
            !_.isEmpty(result)? (
              _.map(result, (item, index) => {
                console.log("this is item", item._id);
                // const { _id, seller } = item;
                console.log('foreach', item)
                if (item.status === "HIDDEN" || item.status === "CLOSED") return
                return (
                  <div style={{width: '25%'}} key={`item_card_container_${index}`}>
                    <ItemCards id={item._id} item={item} test={true} i={item.imagePath}/>
                  </div>
                )
              })
            ): (
              <div className={styles.noRecordContainer}>
                <img alt="item_no_record" className={styles.noRecordImg} src="https://mweb-cdn.karousell.com/build/no-coin-transaction-2QTRqJClkE.svg"/>
                <p>There is no item yet</p>
              </div>
            )
          }
          </div>
      </Container>
    </AppLayout>
  );
};

export default Category;