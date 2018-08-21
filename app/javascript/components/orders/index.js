import React from 'react';

import OrdersHeader from './header';
import OrdersList from './list';

import styles from './style.scss';

export default ({coffees, orders, isLoading}) => (
  <div className={styles.orders_wrapper}>
    <div className={styles.orders_title}>
      <h3>Orders</h3>
    </div>
    <div className={styles.orders_grid}>
      <OrdersHeader/>
      <OrdersList coffees={coffees} orders={orders} isLoading={isLoading} />
    </div>
  </div>
);
