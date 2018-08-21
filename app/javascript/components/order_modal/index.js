import React from 'react';

import styles from './style.scss';

import brewMethodMap from '../../utils/brew_methods';


export default class OrderModal extends React.PureComponent {
  renderCoffees() {
    const { coffees } = this.props;

    return coffees.map((c) => <option key={`coffee-${c.id}`} value={c.id}>{c.name}</option>);
  }

  renderBrewMethods() {
    return Object.keys(brewMethodMap).map((m) => <option key={m} value={m}>{brewMethodMap[m]}</option>);
  }

  handleSubmit() {
    this.props.onClose();
  }

  handleClose(e) {
    e.preventDefault();

    this.props.onClose();
  }

  render() {

    return (
      <div className={styles.wrapper}>
        <div className={styles.modal}>
          <div className={styles.header}>
            <a href="#" onClick={(e) => this.handleClose(e)} className={styles.close}>X</a>
            <h2>Perfectly Ground Work Orders</h2>
            <p>Instructional text would go here</p>
          </div>
          <div className="row">
            <div className="col-50">
              <label>Coffee</label>*<br/>
              <select>
                { this.renderCoffees()}
              </select>
            </div>
            <div className="col-50">
              <label>Brew Method</label>*<br/>
              <select>
                { this.renderBrewMethods()}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-50">
              <label>Ship Date</label>*<br />
              <input type="text"/>
            </div>
            <div className="col-25">
              <label>Number of Cases</label>*<br />
              <input type="number"/>
            </div>
            <div className="col-25">
              <label>Packets per Case</label>*<br />
              <select>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>
          <div>
            <label>Notes</label><br />
            <input type="text" />
          </div>
          <div>
            <input type="checkbox" />
            <label>Priority</label><br />
          </div>
          <button className="btn" onClick={() => this.handleSubmit() }>Submit Work Order</button>
        </div>
      </div>
    )
  }
}
