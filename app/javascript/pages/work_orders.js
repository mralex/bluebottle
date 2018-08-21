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

    showModal: false,

    viewOrder: null,
  };

  componentWillMount() {
    this.loadOrderPage(1);
  }

  loadOrderPage(page) {
    // FIXME: Properly cache each page so we don't have to request it every time.
    //        Need more time to cleanly resolve cache invalidation (don't we always!),
    //        so for now we always load the data from the API and move on.

    axios.get(`/api/orders?page=${page}`)
      .then(({ data: { orders, meta: { total_pages, total_count } } }) => {
        let pageIdMap = {
          [page]: orders.map((o) => o.id)
        };

        let orderMap = this.state.orders;
        orders.forEach((o) => orderMap[o.id] = o);

        this.setState({
          orders: orderMap,
          pageIdMap,
          page,
          isLoading: false,
          totals: {
            pages: total_pages,
            count: total_count,
          }
        });
      });
  }

  onSaveOrder(order) {
    if (order.id) {
      // Update
    } else {
      // Create
    }
  }

  onViewOrder(id) {
    this.setState({
      viewOrder: this.state.orders[id],
      showModal: true
    });
  }

  onChangePage(page) {
    this.loadOrderPage(page);
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
          onSave={this.onSaveOrder.bind(this)}
          order={this.state.viewOrder}
          />
      );
    }
  }

  render() {
    let { coffees, isLoading, page, totals } = this.state;

    return (
      <div>
        <Header
          onCreate={ () => this.setState({ viewOrder: null, showModal: true }) }
          />
        <Orders
          coffees={coffees}
          orders={this.ordersForCurrentPage()}
          isLoading={isLoading}
          onViewOrder={this.onViewOrder.bind(this)}
          />
        <Pagination
          page={page}
          totals={totals}
          onChange={ this.onChangePage.bind(this) }
          />
        { this.renderModal() }
      </div>
    );
  }
}
