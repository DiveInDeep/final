import React, { useEffect, useState } from 'react';
import AppLayout from '../../components/appLayout/AppLayout';
import styles from './sell.module.scss';
import { Container } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import UploadImgCard from '../../components/uploadImgCard/UploadImgCard';

const Sell = () => {
  const [uploadImg, setUploadImg] = useState(null);
  const [urlImg, setUrlImg] = useState(null);
  let buffer = [];

  useEffect(() => {
      if (uploadImg === null) return;
  
  }, [uploadImg])


  return (
    <AppLayout noFooter>
      <Container className={styles.container}>
       {/* <UploadImgCard setUploadImg={setUploadImg} uploadImg={uploadImg} buffer={buffer}/> */}
        {
          urlImg ? <UploadImgCard setUploadImg={setUploadImg} uploadImg={uploadImg} buffer={buffer} setUrlImg={setUrlImg} urlImg={urlImg}/> :
        <div className={styles.wrapper}>
          <label htmlFor="file" className={styles.uploadContainer}>
            <input id="file" accept="image/png, image/jpeg" multiple="" type="file" style={{display: "none"}} onChange={(e) => {
              if (!e.target.files[0]) return;
              let newFile = URL.createObjectURL(e.target.files[0]);
              console.log("new", e.target.files)
              buffer.push(newFile);
              setUrlImg(buffer);
              setUploadImg(e.target.files[0]);
            }}/>
            <AddPhotoAlternateIcon />
            <div className={styles.btnIcon}>
              Select Photos
            </div>
          </label>
        </div>
        }
      </Container>
    </AppLayout>
  );
};

export default Sell;