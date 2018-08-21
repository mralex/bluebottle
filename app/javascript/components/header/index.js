import React from 'react';
import moment from 'moment';

import styles from './style.scss';

function renderDate() {
  return moment().format('MMM DD');
}

export default (props) => (
  <header className={styles.orders_header}>
    <div className="orders-date">
      { renderDate() }
    </div>
    <h1>Perfectly Ground Work Orders</h1>
    <button className="btn" onClick={props.onCreate}>Create order</button>
  </header>
);
