import React from 'react';
import moment from 'moment';


export default class OrderRow extends React.PureComponent {
  coffeeNameForId(id) {
    const { coffees } = this.props;

    return coffees.find((c) => c.id === id).name;
  }

  render() {
    const { order } = this.props;

    return (
      <div>
        <div>
          {this.coffeeNameForId(order.coffee_id)}
        </div>
        <div>
          {order.brew_method}
        </div>
        <div>
          {order.case_count}
        </div>
        <div>
          {order.packets_per_case}
        </div>
        <div>
          {moment(order.ship_at).format('MM/DD/YYYY')}
          {order.is_priority ? '*' : ''}
        </div>
        <div>
          #{order.id}
        </div>
        <div>
          View
        </div>
      </div>
    );
  }
}
