import React from 'react';
import styles from './footer.module.scss';
import _ from 'lodash';
import { Container } from '@mui/material';
import moment from 'moment';
import Logo from '../../layouts/logo';

const socialMedia = [
  {title: 'Facebook', link: 'https://www.facebook.com/'},
  {title: 'Instagram', link: 'https://www.instagram.com/'},
  {title: 'Linkedin', link:"https://www.linkedin.com/"},
  {title: 'Blog', link:"https://blog.carousell.com/hk/"},
  {title: 'Erousell College', link:"https://college.carousell.com/"},
  {title: 'Autos Blog', link:"https://blog.carousell.com/hk/category/carousell-cars/"},
  {title: 'Property', link:"https://blog.carousell.com/hk/rental-guide/"},
]

const termsAndCondition = [
  {title: 'Help Centre', link: 'https://support.carousell.com/hc/en-us?origin=web&platform=web'},
  {title: 'Contact Us', link: 'https://support.carousell.com/hc/en-us/requests/new?open_chat_bot=true&origin=web&platform=web'},
  {title: 'Press', link: 'https://press.carousell.com/'},
  {title: 'Jobs', link: 'https://careers.carousell.com/'},
  {title: 'Advertise with Us', link: 'https://docs.google.com/forms/d/1ZhprlP1FZ7Jk55RqlkAnT6YcV9DTDUoFM1gLCM59L6A/viewform?edit_requested=true'},
  {title: 'Terms', link: 'https://support.carousell.com/hc/en-us/articles/115011881808'},
  {title: 'Privacy', link: 'https://support.carousell.com/hc/en-us/articles/115006700307'},
]

const Footer = () => {
  return (
    <footer>
      <Container>
        <div className={styles.dashLine}></div>
        <div className={styles.topSearch}>
          <div className={styles.title}>Top searches</div>
          <div className={styles.content}>
    
          </div>
          <div className={styles.bottomDash}></div>
        </div>

        <div className={styles.followUs}>
          <div className={styles.followUsWrapper}>
            <div className={styles.title}>Follow Us</div>
            <div>
              {
                _.map(socialMedia, (item, index) => {
                  return (
                    <span className={styles.linkContainer} key={`footer_media_container_${index}`}>
                      <a href={item.link} className={styles.link}>
                        {item.title}
                      </a>
                      {index === socialMedia.length - 1 ? "" : <span> • </span>}
                    </span>
                  )
                })
              }
            </div>
          </div>
          <div className={styles.bottomDash}></div>
        </div>
        <div className={styles.termsAndCondition}>
          <Logo classStyle={styles.logo}/>
          <div className={styles.copyright}>
            &#169; {`${moment().year()}`}
            <span>
              Erousell
            </span>
          </div>
          <div>
          {
            _.map(termsAndCondition, (item, index) => {
              return (
                <span className={styles.linkContainer} key={`footer_terms_and_condition_container_${index}`}>
                  <a href={item.link} className={styles.link}>
                    {item.title}
                  </a>
                  {index === socialMedia.length - 1 ? "" : <span> • </span>}
                </span>
              )
            })
          }
        </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;