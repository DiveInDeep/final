import React, { useState, useEffect } from 'react';
import AppLayout from '../../components/appLayout';
import ItemsCarousel from 'react-items-carousel';
import styles from './product.module.scss';
import Chevron from '../../layouts/chevron';
import _ from 'lodash';
import { Container, Paper, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import * as service from '../../core/Service';

const dummyImg = [
  "https://media.karousell.com/media/photos/special-collections/2022/09/26/hk_cvs_visuals_spc-m_(1500,_610).png",
  "https://media.karousell.com/media/photos/special-collections/2022/09/29/HK_IKEA_store_campaign_HK_IKEA_store_SaiWanHo_SPC_M_(1500,_610).png",
  "https://media.karousell.com/media/photos/special-collections/2022/09/15/SPC-EDM-CHI_(1500,_610).png",
  "https://media.karousell.com/media/photos/special-collections/2022/09/29/HK_mobile&tablet_SPC_M_(1500,_610).png",
  "https://media.karousell.com/media/photos/special-collections/2022/09/29/HK_WF_SPC_M_(1500,_610).png",
  "https://media.karousell.com/media/photos/special-collections/2022/09/29/HK_home_services_SPC_M_(1500,_610).png",
  "https://media.karousell.com/media/photos/special-collections/2022/09/27/HK_caroubiz_partnership_PrimeCredit_SPC_M_(1500,_610).png",
  "https://media.karousell.com/media/photos/special-collections/2022/09/01/image_(65)_(1500,_610).png",
  "https://media.karousell.com/media/photos/special-collections/2022/10/03/HK_CarousellxVISA_spc_M_(2)_(1500,_610).png"
];

const Product = () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [image, setImage] = useState(null);
  const [name, setName] = useState(null);
  const [title, setTitle] = useState(null);
  const [status, setStatus] = useState(null);
  const [date, setDate] = useState(null);
  let location = useLocation();
  let newId = location.search.split("?")[1];

  useEffect(() => {
    fetchResult()
  }, [])

  // useEffect(() => {
  //   console.log("?",result[imagePath])    
  // }, [])

  async function fetchResult () {
    try {
      let resp = await service.call('get', `items/${newId}` ) 
      const { item } = resp; 
      console.log(item, "??")
      setResult(item);
      setImage(item.img)
      setName(item.name)
      setTitle(item.title)
      setStatus(item.status)
      setDate(item.date)
    
    }catch(err) {
      console.log(err);
    }
  }

  return (
    <AppLayout>
      <Container>
        <div className={styles.carouselContainer}>
          <ItemsCarousel 
            requestToChangeActive={setActiveItemIndex}
            activeItemIndex={activeItemIndex}
            numberOfCards={1}
            gutter={20}
            leftChevron={<Chevron direction="left" />}
            rightChevron={<Chevron direction="right" />}
            // outsideChevron
            chevronWidth={40}
          >
            {/* {
              _.map(result, (item, index) => {
                return (
                  <img src={`./upload/${}`} alt="test" key={`carousel_banner_${index}`} className={styles.bannerImg}/>
                  )
                })
              } */}
              <img src={image} alt="test" className={styles.bannerImg}/>

          </ItemsCarousel>
        </div>

        <div className={styles.contentWrapper}>
          <div style={{flex: 1}}>
            <div className={styles.titleHeader}>
                <div className={styles.title}>
                  {title}
                </div>
                {/* <div className={styles.title}>
                </div> */}
                <div>
                  Status: {status}
                </div>
                <div>
                  Category: {result?.tag || "-"}
                </div>
            </div>
            
            <div className={styles.meetSeller}>
              <div className={styles.meetTitle}>
                <span className={styles.meetP}>Meet the seller</span>
                <div className={styles.iconWrapper}>
                  <div className={styles.userIcon}>
                    <img src="https://media.karousell.com/media/photos/profiles/default.png" alt="user_icon"/>
                  </div>
                  <div className={styles.userInfo}>
                    <span>Seller: {name}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        <Paper className={styles.getChat}>
          <div className={styles.iconWrapper} style={{justifyContent:'center', alignItems: 'center'}}>
            <div className={styles.userIcon} style={{width: 40, height: 40}}>
              <img src="https://media.karousell.com/media/photos/profiles/default.png" alt="user_icon"/>
            </div>
            <span>Contact Seller:{name}</span>
          </div>
          <Button type="submit" variant="contained" sx={{width: "100%"}} onClick={() => window.location.replace("https://accounts.google.com/b/0/AddMailService")} className={styles.submit}>Chat</Button>
        </Paper> 
      </div>
      {/* <div className={styles.messageContainer}>
        <div>message</div>
      </div> */}
      </Container>
    </AppLayout>
  );
};

export default Product;