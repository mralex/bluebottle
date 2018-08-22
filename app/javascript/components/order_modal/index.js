import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';

import {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';

import moment from 'moment';

import styles from './style.scss';
import 'react-day-picker/lib/style.css';

import brewMethodMap from '../../utils/brew_methods';


export default class OrderModal extends React.PureComponent {
  state = {
    displayShipDate: moment().format('MM/DD/YYYY'),
    order: {
      coffee_id: 0,
      brew_method: 'aeropress',
      ship_at: moment().format('YYYY-MM-DD'),
      case_count: 10,
      packets_per_case: 25,
      is_priority: false,
      notes: ''
    }
  };

  componentWillMount() {
    this.datePickerRef = React.createRef();

    if (this.props.order) {
      this.setState({
        order: {...this.props.order},
        displayShipDate: moment(this.props.order.ship_at).format('MM/DD/YYYY')
      });
    } else {
      let { order } = this.state;
      order.coffee_id = this.props.coffees[0].id;

      this.setState({ order });
    }
  }

  onChange(e) {
    let { name, value } = e.target;

    if (name === 'is_priority') {
      value = e.target.checked;
    }

    this.setState({
      order: {
        ...this.state.order,
        [name]: value
      }
    });
  }

  onDayChange(day) {
    this.setState({
      order: {
        ...this.state.order,
        'ship_at': moment(day).format('YYYY-MM-DD')
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
    const { order, displayShipDate } = this.state;

    return (
      <div className={styles.wrapper}>
        <div className={styles.modal}>
          <div className={styles.header}>
            <a href="#" onClick={(e) => this.handleClose(e)} className={styles.close}>
              <i className="fas fa-times" />
            </a>
            <h2 className={styles.title}>Perfectly Ground Work Orders</h2>
            <p>Instructional text would go here</p>
          </div>
          <div className="row mb-3">
            <div className="col-6">
              <label>Coffee <span className="required">*</span></label>
              <select name="coffee_id" value={order.coffee_id} onChange={this.onChange.bind(this)}>
                { this.renderCoffees()}
              </select>
            </div>
            <div className="col-6">
              <label>Brew Method <span className="required">*</span></label>
              <select name="brew_method" value={order.brew_method} onChange={this.onChange.bind(this)}>
                { this.renderBrewMethods()}
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-6">
              <label>Ship Date <span className="required">*</span></label>
              <div className={styles.date_wrapper}>
                <DayPickerInput
                  ref={this.datePickerRef}
                  classNames={{
                    container: styles.day_picker_override,
                    overlayWrapper: 'DayPickerInput-OverlayWrapper',
                    overlay: 'DayPickerInput-Overlay'
                  }}
                  value={displayShipDate}
                  onDayChange={this.onDayChange.bind(this)}
                  format='MM/DD/YYYY'
                  formatDate={formatDate}
                  parseDate={parseDate}
                  placeholder={`${formatDate(new Date())}`}
                  />
                <div className={styles.date_wrapper_icon} onClick={() => this.datePickerRef.current.showDayPicker() }>
                  <i className="fas fa-calendar-alt" />
                </div>
              </div>
            </div>
            <div className="col-3">
              <label>Number of Cases <span className="required">*</span></label>
              <input name="case_count" type="number" value={order.case_count} onChange={this.onChange.bind(this)}/>
            </div>
            <div className="col-3">
              <label>Packets per Case <span className="required">*</span></label>
              <select name="packets_per_case" value={order.packets_per_case} onChange={this.onChange.bind(this)}>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="mb-3">
                <label>Notes</label>
                <input name="notes" type="text" value={order.notes} onChange={this.onChange.bind(this)}/>
              </div>
              <div className="mb-3">
                <label htmlFor="is_priority">
                  <input id="is_priority" name="is_priority" type="checkbox" checked={order.is_priority} onChange={this.onChange.bind(this)} />
                  Priority
                </label>
              </div>
              <button className="btn" onClick={() => this.handleSubmit() }>Submit Work Order</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
