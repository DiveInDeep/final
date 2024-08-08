import React from "react";
import { Grid, Avatar } from "@mui/material";
import styles from "./itemCards.module.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const ItemCards = (props) => {
  const { id, item } = props;
  return (
    <div className={styles.cardWrapper}>
      <div>
        <a className={styles.cardTitle} href={"#"}>
          {/* <Avatar className={styles.icon} alt={""} src="https://media.karousell.com/media/photos/profiles/2022/10/02/hilldawai2018_1664681384_8427f445.jpg"/> */}
          <Avatar className={styles.icon} alt={""} src={""} />
          <div className={styles.infoWrapper}>
            <div className={styles.userName}>{item.name}</div>
            {/* <div className={styles.time}>
              6 分鐘前
            </div> */}
          </div>
        </a>
        <a href={`/product?${id}`}>
          <div className={styles.itemImgContainer}>
            {
              // i ?(
              //   <>
              //   <img src="https://mweb-cdn.karousell.com/build/no-coin-transaction-2QTRqJClkE.svg" alt={""} />
              //   <img src={`./upload/${'6.jpg'}`} alt={""} />
              //   </>

              //   ): (

              //     // <img src={`./upload/${item.imagePath}`} alt={""} />
              //     <img src={`./upload/${item.img}`} alt={""} />
              //   )
              <img src={item.img} alt={`${item.name}`} />
            }
            {/* <img src={"https://media.karousell.com/media/photos/products/2022/10/11/_____ian_1665474227_05907f42_progressive_thumbnail.jpg"} alt={""} /> */}
          </div>
          <div className={styles.productTitle}>Title: {item.title}</div>
          <div className={styles.productPrice}>
            Description: {item.description}
          </div>
          <div className={styles.productStatus}>Status: {item.status}</div>
          {/* <div className={styles.productTitle}>Chanel 22K 調節扣長盒 🇭🇰</div>
          <div className={styles.productPrice}>HK$21,800</div>
        <div className={styles.productStatus}>全新</div> */}
        </a>
      </div>

      {/* <div className={styles.like}>
        <FavoriteBorderIcon className={styles.heart} />
        <div className={styles.likeNum}>12</div>
      </div> */}
    </div>
  );
};

export default ItemCards;
