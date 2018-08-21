import React from 'react';
import moment from 'moment';

import styles from './style.scss';

import brewMethodMap from '../../utils/brew_methods';


export default class OrderRow extends React.PureComponent {
  onViewOrder(e) {
    e.preventDefault();

    this.props.onViewOrder(this.props.order.id);
  }

  coffeeNameForId(id) {
    const { coffees } = this.props;

    return coffees.find((c) => c.id === id).name;
  }

  render() {
    const { order } = this.props;

    return (
      <div className={`row ${styles.row}`}>
        <div className="col-3">
          {this.coffeeNameForId(order.coffee_id)}
        </div>
        <div className="col-2">
          {brewMethodMap[order.brew_method]}
        </div>
        <div className="col-1">
          {order.case_count}
        </div>
        <div className="col-1">
          {order.packets_per_case}
        </div>
        <div className="col-2">
          {moment(order.ship_at).format('MM/DD/YYYY')}
          {order.is_priority ? '*' : ''}
        </div>
        <div className="col-2">
          <a href="#" onClick={this.onViewOrder.bind(this)}>#{order.id}</a>
        </div>
        <div className="col-1">
          <a href="#" onClick={this.onViewOrder.bind(this)}>View</a>
        </div>
      </div>
    );
  }
}
