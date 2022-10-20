import React, { useState } from 'react';
import { Box, TextField, TextareaAutosize, Select, MenuItem, FormControl, Button } from '@mui/material';
import styles from './uploadItemForm.module.scss';
import _ from 'lodash';
import { defaultStatus } from '../../helpers/enumConfig';
import * as service from '../../core/Service';
import { useNavigate } from 'react-router-dom';

const UploadItemFrom = (props) => {
  const { category, imgPath} = props;
  const [status, setStatus] = useState(null);
  const [valid, setValid] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setStatus(event.target.value);

  };

  function formChange (event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let title = data.get('title');
    let desc = data.get('desc');
    console.log({title, desc, category, status})
    if ( !title || !desc || !category || !imgPath ) {
      return 
    }
    setValid(true);
    
  }

  async function formSubmit(event){
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let title = data.get('title');
    let desc = data.get('desc');

    console.log('file?', imgPath);


    const obj = {
      title: title,
			description: desc,
      tag: [category],
      // imagePath : "",
      status: status,
      file:imgPath
    }
    console.log({obj})
    
    try {
      let resp = await service.upload('post', '/items/', obj);
      console.log("img", resp)
      if (resp.errors) { return };
      alert("upload success");
      navigate('/')
      

    }catch (error) {
      console.error("why", error);
    }
  } 

  return (
    <Box className={styles.container}  component="form" 
    onSubmit={formSubmit} 
    onChange={formChange}>
      <TextField label="List Title" name="title" variant="outlined" size='small' color='secondary' sx={{width: '100%'}} />
      <h2 className={styles.status}>About the item</h2>

      <div className={styles.subTitleStatus}>Status</div>
      <div>
      <FormControl sx={{ width: '100%' }}>
          <Select
            value={status}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            placeholder='Select a category'
            >
            {
              _.map(defaultStatus, (item, index) => {
                return (
                  <MenuItem key={`item_menu_status_${index}`} value={item}>{item}</MenuItem>
                  )
                })
              }
          </Select>
        </FormControl>
      </div>

      <div className={styles.desc}>Description</div>
        <TextareaAutosize
          aria-label="empty textarea"
          placeholder="Describe what you are selling and include any details a buyer might be interested in. People love items with stories!"
          style={{ width: '100%' }}
          name="desc"
        />
      <div className={valid? `${styles.submitBtn}` : `${styles.submitBtn} ${styles.disabled}`}>
        <Button type="submit" variant="contained" disabled={!valid} sx={{width: "100%"}} className={styles.submit}>List now</Button>
      </div>

    </Box>
  );
};

export default UploadItemFrom;