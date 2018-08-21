import React from 'react';

import styles from './style.scss';

const OrdersHeader = (props) => (
  <div className={`row ${styles.header}`}>
    <div className={`col-3 ${styles.header_cell}`}>
      <h4>Coffee</h4>
    </div>
    <div className={`col-2 ${styles.header_cell}`}>
      <h4>Method</h4>
    </div>
    <div className={`col-1 ${styles.header_cell}`}>
      <h4>Number of Cases</h4>
    </div>
    <div className={`col-1 ${styles.header_cell}`}>
      <h4>Packets per Case</h4>
    </div>
    <div className={`col-2 ${styles.header_cell}`}>
      <h4>Ship Date</h4>
    </div>
    <div className={`col-2 ${styles.header_cell}`}>
      <h4>Order</h4>
    </div>
    <div className={`col-1 ${styles.header_cell}`}>
      <h4>View</h4>
    </div>
  </div>
);

export default OrdersHeader;
