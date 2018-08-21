import React from 'react';

import OrdersHeader from './header';
import OrdersList from './list';

export default ({coffees, orders, isLoading}) => (
  <div>
    <h3>Orders</h3>
    <hr/>
    <OrdersHeader/>
    <OrdersList coffees={coffees} orders={orders} isLoading={isLoading} />
  </div>
);
