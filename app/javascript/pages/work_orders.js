import React from 'react';
import axios from 'axios';
import moment from 'moment';

import Header from '../components/header';
import Orders from '../components/orders';
import OrderModal from '../components/order_modal';

import Pagination from '../components/pagination';

export default class WorkOrders extends React.PureComponent {
  state = {
    coffees: window.COFFEES,

    orders: {},

    // Used to let us know if we need to load the requested
    // pagination page from the API
    pageIdMap: {},

    page: 1,

    totals: { pages: 0, count: 0 },
    isLoading: true,

    showModal: false
  };

  componentWillMount() {
    axios.get('/api/orders')
      .then(({ data: {orders, meta: { total_pages, total_count }}}) => {
        let pageIdMap = {
          1: orders.map((o) => o.id)
        };

        let orderMap = {};
        orders.forEach((o) => orderMap[o.id] = o);

        this.setState({
          orders: orderMap,
          pageIdMap,
          isLoading: false,
          totals: {
            pages: total_pages,
            count: total_count,
          }
        });
      });
  }

  ordersForCurrentPage() {
    let orderIds = this.state.pageIdMap[this.state.page];

    if (!orderIds) {
      return [];
    }

    return orderIds.map((id) => this.state.orders[id]);
  }

  renderModal() {
    if (this.state.showModal) {
      return (
        <OrderModal
          coffees={this.state.coffees}
          onClose={() => this.setState({ showModal: false })}
          />
      );
    }
  }

  render() {
    let { coffees, isLoading, page, totals } = this.state;

    return (
      <div>
        <Header
          onCreate={ () => this.setState({ showModal: true }) }
          />
        <Orders
          coffees={coffees}
          orders={this.ordersForCurrentPage()}
          isLoading={isLoading}
          />
        <Pagination
          page={page}
          totals={totals}
          onChange={ (page) => this.setState({ page }) }
          />
        { this.renderModal() }
      </div>
    );
  }
}
