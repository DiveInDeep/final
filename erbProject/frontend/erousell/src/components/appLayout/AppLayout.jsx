import React from 'react';
import Navbar from '../navbar';
import styles from './appLayout.module.scss';
import Footer from '../footer';


const AppLayout = (props) => {
  const { children, noNav, noFooter } = props;
  return (
    <>
      <Navbar />
      <main className={styles.mainContainer}>
        {children}
      </main>
      {
        !noFooter && <Footer />
      }
    </>
  )
};

export default AppLayout;