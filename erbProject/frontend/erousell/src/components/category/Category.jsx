import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import AppsIcon from '@mui/icons-material/Apps';
import styles from './category.module.scss';
import CategoryCard from './CategoryCard';
import _ from 'lodash';
import ItemsCarousel from 'react-items-carousel';
import Chevron from '../../layouts/chevron/Chevron';


const categoryType = [
  {title:"Following", imgSrc: "https://media.karousell.com/media/photos/country-collections/icons/129/2020/01/22/56-Following-cxxhdpi_1579665374.01.png", navigator: "Following"},
  {title:"Services", imgSrc: "https://media.karousell.com/media/photos/country-collections/icons/1758/2020/01/22/56-Services-cxxhdpi_1579665464.54.png", navigator: "Services"},
  {title:"Computers & Tech", imgSrc: "https://media.karousell.com/media/photos/country-collections/icons/main_v2/01_computers_tech.png", navigator: "Computers"},
  {title:"Mobile Phones & Gadgets", imgSrc: "https://media.karousell.com/media/photos/country-collections/icons/main_v2/02_mobile_phones_gadgets.png", navigator: "Mobile"},
  {title:"Women's Fashion", imgSrc: "https://media.karousell.com/media/photos/country-collections/icons/main_v2/08_womens_fashion.png", navigator: "Women"},
  {title:"Property", imgSrc: "https://media.karousell.com/media/photos/country-collections/icons/125/2020/01/22/56-Property-cxxhdpi_1579665459.19.png", navigator: "Property"},
  {title:"Men's Fashion", imgSrc: "https://media.karousell.com/media/photos/country-collections/icons/main_v2/09_mens_fashion.png", navigator: "Men"},
  {title:"Cars", imgSrc: "https://media.karousell.com/media/photos/country-collections/icons/124/2020/01/22/56-Cars-cxxhdpi_1579665347.31.png", navigator: "Cars"},
  {title:"Beauty & Personal Care", imgSrc: "https://media.karousell.com/media/photos/country-collections/icons/main_v2/13_beauty_personal_care.png", navigator: "Beauty"},
  {title:"Luxury", imgSrc: "https://media.karousell.com/media/photos/country-collections/icons/main_v2/10_luxury.png", navigator: "Luxury"},
  {title:"Free Items", imgSrc: "https://media.karousell.com/media/photos/country-collections/icons/2300/2020/01/16/freeitems-1579255406.png", navigator: "Free"},
  {title:"Video Gaming", imgSrc: "https://media.karousell.com/media/photos/country-collections/icons/main_v2/03_video_gaming.png", navigator: "Video"},
  {title:"Audio", imgSrc: "https://media.karousell.com/media/photos/country-collections/icons/main_v2/04_audio.png", navigator: "Audio"},
  {title:"Photography", imgSrc: "https://media.karousell.com/media/photos/country-collections/icons/main_v2/05_photography.png", navigator: "Photography"},
  {title:"Furniture & Home Living", imgSrc: "https://media.karousell.com/media/photos/country-collections/icons/main_v2/06_furniture_home_living.png", navigator: "Furniture"},
  {title:"TV & Home Appliances", imgSrc: "https://media.karousell.com/media/photos/country-collections/icons/main_v2/07_tv_home_appliances.png", navigator: "TV"},
  {title:"Babies & Kids", imgSrc: "https://media.karousell.com/media/photos/country-collections/icons/main_v2/11_babies_kids.png", navigator: "Babies"},
  {title:"Hobbies & Toys", imgSrc: "https://media.karousell.com/media/photos/country-collections/icons/main_v2/12_hobbies_toys.png", navigator: "Hobbies"},
  {title:"Health & Nutrition", imgSrc: "https://media.karousell.com/media/photos/country-collections/icons/main_v2/14_health_nutrition.png", navigator: "Health"},
  {title:"Sports Equipment", imgSrc: "https://media.karousell.com/media/photos/country-collections/icons/main_v2/15_sports_equipment.png", navigator: "Sports"},
  {title:"Food & Drinks", imgSrc: "https://media.karousell.com/media/photos/country-collections/icons/main_v2/16_food_drinks.png", navigator: "Food"},
  {title:"Pet Supplies", imgSrc: "https://media.karousell.com/media/photos/country-collections/icons/main_v2/17_pet_supplies.png", navigator: "Pet"},
  {title:"Tickets & Vouchers", imgSrc: "https://media.karousell.com/media/photos/country-collections/icons/main_v2/18_tickets_vouchers.png", navigator: "Tickets"},
  {title:"Motorbikes", imgSrc: "https://media.karousell.com/media/photos/country-collections/icons/132/2020/01/22/56-Motorbikes-cxxhdpi_1579665432.59.png", navigator: "Motorbikes"},
  {title:"Auto Accessories", imgSrc: "https://media.karousell.com/media/photos/country-collections/icons/135/2020/01/22/56-Car_Accessories-cxxhdpi_1579665341.89.png", navigator: "Auto"},
  {title:"Jobs", imgSrc: "https://media.karousell.com/media/photos/country-collections/icons/1774/2020/01/22/56-Jobs-cxxhdpi_1579665395.1.png", navigator: "Jobs"},
  {title:"Community", imgSrc: "https://media.karousell.com/media/photos/country-collections/icons/128/2020/01/22/56-Community_-cxxhdpi_1579665352.66.png", navigator: "Community"},
  {title:"Preorders", imgSrc: "https://media.karousell.com/media/photos/country-collections/icons/127/2020/01/22/56-Preorder-cxxhdpi_1579665453.93.png", navigator: "Preorders"},
  {title:"Looking For", imgSrc: "https://media.karousell.com/media/photos/country-collections/icons/130/2020/01/22/56-Looking_For-cxxhdpi_1579665416.66.png", navigator: "Looking"},
  {title:"Everything Else", imgSrc: "https://media.karousell.com/media/photos/country-collections/icons/126/2020/01/22/56-everything_elsexxhdpi_1579665363.24.png", navigator: "Everything"},
  {title:"Announcements", imgSrc: "https://media.karousell.com/media/photos/country-collections/icons/main_v2/20_announcements.png", navigator: "Announcements"},
];


const Category = () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  
  return (
    <section>
      <Grid container className={styles.titleContainer}>
        <h3>Explore Erousell</h3>
      </Grid>
      <Grid>
        <ItemsCarousel 
          requestToChangeActive={setActiveItemIndex}
          activeItemIndex={activeItemIndex}
          numberOfCards={8}
          // gutter={20}
          leftChevron={<Chevron direction="left" />}
          rightChevron={<Chevron direction="right" />}
          // outsideChevron
          chevronWidth={40}
          slidesToScroll={8}
        >
          {
            _.map(categoryType, (item, index) => {
              const { title, imgSrc, navigator} = item;
              return (
                <CategoryCard title={title} imgSrc={imgSrc} navigator={navigator} index={index} key={`category_item_card_${index}`}/>
              )
            })
          }
        </ItemsCarousel>
      </Grid>
    </section>
  );
};

export default Category;