import React from 'react';
import moment from 'moment';

import styles from './style.scss';

function renderDate() {
  let today = moment();

  return (
    <span className={styles.date_container}>
      <span className={styles.date_month}>{ today.format('MMM') }</span>
      <span className={styles.date_day}>{ today.format('DD') }</span>
    </span>
  )
}

export default (props) => (
  <header className={styles.header}>
    <div className={styles.date}>
      { renderDate() }
    </div>
    <h1 className={styles.title}>Perfectly Ground Work Orders</h1>
    <div className={styles.buttons}>
      <button className="btn" onClick={props.onCreate}>Create order</button>
    </div>
  </header>
);
