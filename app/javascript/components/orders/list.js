import React from 'react';

import OrderRow from './row';

const OrdersList = ({ coffees, orders, isLoading }) => {
  if (isLoading) {
    return (<h4>Loading...</h4>);
  }

  return orders.map((o) => <OrderRow order={o} coffees={coffees} key={`order-${o.id}`} />)
}

export default OrdersList;
