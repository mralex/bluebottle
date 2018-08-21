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
          onClick={ () => this.props.onChange(i) }>
          { i }
        </button>
      );
    }

    return pages;
  }

  renderPrev() {
    let { page } = this.props;

    let nextPage = Math.max(1, page - 1);

    return <button onClick={() => this.props.onChange(nextPage)}>Prev</button>
  }

  renderNext() {
    let { page, totals } = this.props;

    let nextPage = Math.min(totals.pages, page + 1);

    return <button onClick={() => this.props.onChange(nextPage)}>Next</button>
  }

  render() {
    const { totals, page } = this.props;

    return (
      <nav className={styles.pagination}>
        <button onClick={() => this.props.onChange(1)}>&laquo;</button>
        { this.renderPrev() }
        { this.renderPages() }
        { this.renderNext() }
        <button onClick={() => this.props.onChange(totals.pages)}>&raquo;</button>
      </nav>
    );
  }
}
