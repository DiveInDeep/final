import React, { useState } from 'react';
import { Paper, Box, FormControl, Select, MenuItem, FormHelperText } from '@mui/material';
import styles from './uploadImgCard.module.scss';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import _ from 'lodash';
import CancelIcon from '@mui/icons-material/Cancel';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import { defaultTag } from '../../helpers/enumConfig';
import UploadItemFrom from './uploadItemForm';
import * as service from '../../core/Service';


const UploadImgCard = (props) => {
  let { uploadImg, setUploadImg, setUrlImg, urlImg } = props;
  const [category, setCategory] = useState(null)
    
  const handleChange = (event) => {
    let string  = event.target.value;
    let newStr = string.toString();
    setCategory(newStr);
  };

  function deleteImg(selected) {

    setUploadImg(null);

    let newArr = urlImg.filter(function(item) {
      return item !== selected
  })

    setUrlImg(newArr)
  }


  return (
    <div className={styles.container}>
      <Paper className={styles.LeftContainer}>
        <div className={styles.wrapper}>
            <label htmlFor="file" className={styles.uploadContainer}>
              <input id="file" accept="image/png, image/jpeg" multiple="" type="file" style={{display: "none"}} onChange={(e) => {
                if (!e.target.files[0]) return;
                let newFile = URL.createObjectURL(e.target.files[0]);
                setUrlImg([...urlImg, newFile]);
                
                if (!uploadImg) {
                  setUploadImg(e.target.files[0]);
                }
                // setUploadImg([uploadImg]);
              }}/>
              <AddPhotoAlternateIcon />
              <div className={styles.btnIcon}>
                Select Photos
              </div>
            </label>  
            <div className={styles.tips}>
              <TipsAndUpdatesIcon/>
              Tip: You can click the cross to cancel the photo
            </div>
            <div className={styles.allImgWrapper}>
            {
              _.map(urlImg, (item, index) => {
                return (
                  <div className={index === 0 ? `${styles.imgContainer} ${styles.cover}` : `${styles.imgContainer}`} key={`img_card_container_${index}`}>
                    <CancelIcon className={styles.close} onClick={() => {deleteImg(item)}} />
                    <img src={item} alt={`img_content_${index}`} className={styles.img} /> 
                  </div>
                )
              })
            }
            </div>
          </div>
        </Paper>
  
        <div className={styles.rightSection}>
          <Paper className={styles.rightContainer}>
            <Box className={styles.wrapper}>
            <FormControl sx={{width: '100%' }}>
                  <Select
                    value={category}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    placeholder='Select a category'
                    >
                    {
                      _.map(defaultTag, (item, index) => {
                        return (
                          <MenuItem key={`img_menu_item_${index}`} value={item}>{item}</MenuItem>
                          )
                        })
                      }
                  </Select>
                </FormControl>
              </Box>
              {category && <UploadItemFrom category={category} imgPath={uploadImg}/>}
              {/* {<UploadItemFrom category={category} imgPath={uploadImg}/>} */}
          </Paper>
        </div>
    </div>

  );
};

export default UploadImgCard;