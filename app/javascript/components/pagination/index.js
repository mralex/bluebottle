import React from 'react';

import styles from './style.scss';


export default class Pagination extends React.PureComponent {
  renderPages() {
    const { totals, page } = this.props;

    let pages = [];

    for (let i = 1; i <= totals.pages; i++) {
      let className;

      if (page === i) {
        className = styles.selected;
      }

      pages.push(
        <button
          key={`page-${i}`}
          className={className}
          onClick={ () => this.props.onPage(i) }>
          { i }
        </button>
      );
    }

    return pages;
  }

  render() {
    const { totals, page } = this.props;

    return (
      <nav className={styles.pagination}>
        <button onClick={this.props.onFirst}>&laquo;</button>
        <button onClick={this.props.onPrev}>Prev</button>
        { this.renderPages() }
        <button onClick={this.props.onNext}>Next</button>
        <button onClick={this.props.onLast}>&raquo;</button>
      </nav>
    );
  }
}
