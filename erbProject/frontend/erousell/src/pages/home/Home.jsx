import React, { useState, useEffect } from 'react';
import AppLayout from '../../components/appLayout/AppLayout';
import styles from './home.module.scss';
import ItemsCarousel from 'react-items-carousel';
import { Container } from '@mui/material';
import _ from 'lodash';
import Chevron from '../../layouts/chevron';
import Category from '../../components/category';
import RecommendedGoods from '../../components/recommendedGoods';
import  { QRCodeSVG } from 'qrcode.react';
import * as Service from '../../core/Service';
import { useSelector } from 'react-redux';


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



const Home = () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const auth = useSelector((state) => state.app.auth)
  const user = useSelector((state) => state.app.user)

  useEffect(() => {
    if (!auth) return;
    test();
  }, [auth])

  async function test() {
    try {
      let resp = await Service.call('get', '/qq')
      console.log(resp)
    } catch(err) {
      console.log(err);
    }
  }

  return (
      <AppLayout>
        <>
          <Container>
            <div className={styles.carouselContainer}>
              <ItemsCarousel 
                requestToChangeActive={setActiveItemIndex}
                activeItemIndex={activeItemIndex}
                numberOfCards={2}
                gutter={20}
                leftChevron={<Chevron direction="left" />}
                rightChevron={<Chevron direction="right" />}
                // outsideChevron
                chevronWidth={40}
              >
                {
                  _.map(dummyImg, (item, index) => {
                    return (
                      <img src={item} alt="test" key={`carousel_banner_${index}`} className={styles.bannerImg}/>
                      )
                    })
                  }
              </ItemsCarousel>
            </div>
            <Category />
            <RecommendedGoods />
          </Container>
          <section>
            <div className={styles.advertisementBanner}>
              <Container>
                <div className={styles.advertisementWrapper}>
                  <div>
                    <img src="https://storage.googleapis.com/carousell-sl/homescreens/main/carousell_qrcode_cats.png" alt="advertisement-img" />
                  </div>
                  <div>
                    <h1>Everyone Wins on Erousell</h1>
                    <div>Unlock exclusive features when you download the Erousell app today!</div>
                    <div className={styles.adImgContainer}>
                      <div className={styles.adImgWrapper}>
                        <a>
                          <img src="https://storage.googleapis.com/carousell-sl/homescreens/main/carousell_qrcode_apple_store.svg" alt="" />
                        </a>
                        <a>
                          <img src="https://storage.googleapis.com/carousell-sl/homescreens/main/carousell_qrcode_gplay.svg" alt="" />
                        </a>
                      </div>
                      <div className={styles.qrcodeWrapper}>
                        <QRCodeSVG value="https://www.erb.org/home/erb/zh/" />
                      </div>
                    </div>
                  </div>
                </div>
              </Container>
            </div>
          </section>
        </>
      </AppLayout>
  )
};

export default Home;
