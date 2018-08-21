import React from 'react';

import styles from './style.scss';

export default class OrderModal extends React.PureComponent {
  renderCoffees() {
    const { coffees } = this.props;

    return coffees.map((c) => <option key={`coffee-${c.id}`} value={c.id}>{c.name}</option>);
  }

  renderBrewMethods() {
    return (
      <React.Fragment>
        <option value="aeropress">Aeropress</option>
        <option value="coffee_maker">Coffee Maker</option>
        <option value="cold_brew">Cold Brew</option>
        <option value="french_press">French Press</option>
        <option value="pour_over">Pour Over</option>
      </React.Fragment>
    );
  }

  render() {

    return (
      <div className={styles.wrapper}>
        <div className={styles.modal}>
          <div className={styles.header}>
            <a href="#" className={styles.close}>X</a>
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
          <button className="btn">Submit Work Order</button>
        </div>
      </div>
    )
  }
}
