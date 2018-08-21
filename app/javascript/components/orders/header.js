import React from 'react';

import styles from './style.scss';

const OrdersHeader = (props) => (
  <div className={`row ${styles.header}`}>
    <div className="col-3">
      Coffee
    </div>
    <div className="col-2">
      Method
    </div>
    <div className="col-1">
      Number of Cases
    </div>
    <div className="col-1">
      Packets per Case
    </div>
    <div className="col-2">
      Ship Date
    </div>
    <div className="col-2">
      Order
    </div>
    <div className="col-1">
      View
    </div>
  </div>
);

export default OrdersHeader;
