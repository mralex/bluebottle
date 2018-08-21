import React from 'react';

import OrderRow from './row';

const OrdersList = ({ coffees, orders, isLoading, onViewOrder }) => {
  if (isLoading) {
    return (<h4>Loading...</h4>);
  }

  return orders.map((o) => <OrderRow order={o} coffees={coffees} key={`order-${o.id}`} onViewOrder={onViewOrder} />)
}

export default OrdersList;
