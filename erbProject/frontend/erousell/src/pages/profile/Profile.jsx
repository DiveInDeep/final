import React, {useEffect, useState} from 'react';
import AppLayout from '../../components/appLayout/AppLayout';
import { Container, Tabs, Tab, Paper, Button } from '@mui/material';
import styles from './profile.module.scss';
import TabPanel from '../../layouts/tabPanel';
import * as service from "../../core/Service";
import moment from "moment";
import _ from 'lodash';
import ItemCards from '../../components/itemCards/ItemCards';
import { useNavigate } from 'react-router-dom';

const config = ["ACTIVE", "HIDDEN", "ON_HOLD", "DEALING", "CLOSED"];

const Profile = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [userInfo,setUserInfo] = useState({})
  const [items,setItems] = useState([]);
  // const navigator = useNavigate();
  // const [trigger, setTrigger] = useState(false);

  const user = localStorage.getItem("userInfo")?
      JSON.parse(localStorage.getItem("userInfo")):"";

  useEffect(() => {
    if (user) {
      service.call('get', '/users/profile/' + user.userId)
          .then((res)=>{
            console.log('profile', res);//{user,items}
            setUserInfo(res.user);//object
            setItems(res.items);//array
          })
          .catch(err=>{
            console.log(err);
            window.alert("Something's wrong");
          })
    }
  },[])

  async function statusChange (id, status) {
    try {
      let resp = await service.call('post', '/items/status', {id: id, status: status})
      console.log('status', resp)
      if (resp.success) {
        alert('You have been success updated status!!')
        // navigator('/profile')
        // setTrigger(true)
        window.location.reload()
      }
    } catch(err) {
      console.log(err);
    }finally{
      // setTrigger(false)
    }
  }

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }


  return (
    <AppLayout>
      <Container>
        <div className={styles.banner}></div>
        <div className={styles.content}>

          <div className={styles.tabContainer}>
            <div style={{minWidth: '324px'}}></div>
            <Tabs value={activeTab} onChange={handleChange} aria-label="own-item-status">
              <Tab label="Item One" {...a11yProps(0)}/>
              {/* <Tab label="Item Two" {...a11yProps(1)}/>
              <Tab label="Item Three" {...a11yProps(2)}/> */}
            </Tabs>
          </div>
          <div className={styles.contentWrapper}>

            <div className={styles.userInfo}>
              <div className={styles.userIcon}>
                <img src="https://media.karousell.com/media/photos/profiles/default.png" alt="user_icon"/>
              </div>
              <div className={styles.content}>
                <h2 className={styles.userName}>
                  @{userInfo.name}
                </h2>
                <div className={styles.userDetails}>
                  <span>Hong Kong</span>
                  ∙
                  <span>Joined: {moment(userInfo.date).fromNow()}</span>

                </div>
                <div className={styles.verified}>
                  Verified
                </div>
              </div>
            </div>

            <div className={styles.tabPanelContainer}>
              <TabPanel value={activeTab} index={0}>
                <div className={styles.tabPanelCard}>
                  <div className={styles.cardTitle}>
                    <h3>
                      My Items
                    </h3>
                  </div>
                  <div className={styles.cardContent}>
                    {
                      _.map(items, (item, index) => {
                        console.log('item', item);
                      return (
                          <div style={{display: "flex"}}>
                            <div style={{width:'50%', margin: '8px 0px'}}>
                              <ItemCards  id={item._id} item={item}/>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: '10px'}}>
                              {_.map(config, (status, index) => {
                                return (
                                  <Button className={styles.btn} onClick={() => statusChange(item._id, status)} sx={{background: "#008f79", color: '#FFF', margin: '4px 0px'}}>
                                    {status}
                                  </Button>
                                )
                              })}
                            </div>
                          </div>
                        )
                      })
                      
                    }
                  </div>
                </div>
              </TabPanel>
            </div>

          </div>
        </div>
      </Container>
    </AppLayout>
  );
};

export default Profile;