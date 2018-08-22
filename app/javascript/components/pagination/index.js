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
    const { page } = this.props;
    const nextPage = Math.max(1, page - 1);
    let className = '';

    if (page === 1) {
      className = styles.disabled;
    }

    return <button className={className} onClick={() => this.props.onChange(nextPage)}>Prev</button>
  }

  renderNext() {
    const { page, totals } = this.props;
    const nextPage = Math.min(totals.pages, page + 1);
    let className = '';

    if (page === totals.pages) {
      className = styles.disabled;
    }

    return <button className={className} onClick={() => this.props.onChange(nextPage)}>Next</button>
  }

  render() {
    const { totals, page } = this.props;
    let firstClassName = '';
    let lastClassName = '';

    if (page === 1) {
      firstClassName = styles.disabled;
    } else if (page === totals.pages) {
      lastClassName = styles.disabled;
    }

    return (
      <nav className={styles.pagination}>
        <button className={firstClassName} onClick={() => this.props.onChange(1)}>&laquo;</button>
        { this.renderPrev() }
        { this.renderPages() }
        { this.renderNext() }
        <button className={lastClassName} onClick={() => this.props.onChange(totals.pages)}>&raquo;</button>
      </nav>
    );
  }
}
