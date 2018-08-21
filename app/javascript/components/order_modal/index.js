import React from 'react';
import moment from 'moment';
import styles from './style.scss';

import brewMethodMap from '../../utils/brew_methods';


export default class OrderModal extends React.PureComponent {
  state = {
    order: {
      coffee_id: 0,
      brew_method: 'aeropress',
      ship_at: moment().format('MM/DD/YYYY'),
      case_count: 10,
      packets_per_case: 25,
      is_priority: false,
      notes: ''
    }
  };

  componentWillMount() {
    if (this.props.order) {
      this.setState({
        order: {...this.props.order}
      });
    } else {
      let { order } = this.state;
      order.coffee_id = this.props.coffees[0].id;

      this.setState({ order });
    }
  }

  onChange(e) {
    let { name, value } = e.target;

    this.setState({
      order: {
        ...this.state.order,
        [name]: value
      }
    });
  }

  renderCoffees() {
    const { coffees } = this.props;

    return coffees.map((c) => <option key={`coffee-${c.id}`} value={c.id}>{c.name}</option>);
  }

  renderBrewMethods() {
    return Object.keys(brewMethodMap).map((m) => <option key={m} value={m}>{brewMethodMap[m]}</option>);
  }

  handleSubmit() {
    this.props.onSave(this.state.order);
    this.props.onClose();
  }

  handleClose(e) {
    e.preventDefault();

    this.props.onClose();
  }

  render() {
    let { order } = this.state;

    return (
      <div className={styles.wrapper}>
        <div className={styles.modal}>
          <div className={styles.header}>
            <a href="#" onClick={(e) => this.handleClose(e)} className={styles.close}>X</a>
            <h2>Perfectly Ground Work Orders</h2>
            <p>Instructional text would go here</p>
          </div>
          <div className="row">
            <div className="col-6">
              <label>Coffee</label>*<br/>
              <select name="coffee_id" value={order.coffee_id} onChange={this.onChange.bind(this)}>
                { this.renderCoffees()}
              </select>
            </div>
            <div className="col-6">
              <label>Brew Method</label>*<br/>
              <select name="brew_method" value={order.brew_method} onChange={this.onChange.bind(this)}>
                { this.renderBrewMethods()}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <label>Ship Date</label>*<br />
              <input name="ship_at" type="text" value={order.ship_at} onChange={this.onChange.bind(this)}/>
            </div>
            <div className="col-3">
              <label>Number of Cases</label>*<br />
              <input name="case_count" type="number" value={order.case_count} onChange={this.onChange.bind(this)}/>
            </div>
            <div className="col-3">
              <label>Packets per Case</label>*<br />
              <select name="packets_pet_case" value={order.packets_per_case} onChange={this.onChange.bind(this)}>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <label>Notes</label><br />
              <input name="notes" type="text" value={order.notes} onChange={this.onChange.bind(this)}/>
              <div>
                <input name="is_priority" type="checkbox" value={order.is_priority} onChange={this.onChange.bind(this)}/>
                <label>Priority</label><br />
              </div>
              <button className="btn" onClick={() => this.handleSubmit() }>Submit Work Order</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
