import React from 'react';

import styles from './style.scss';

const Toast = ({ type, onClose, children }) => (
  <div className={`${ styles.toast } ${ styles[type] }`}>
    <div className={styles.body}>
      { children }
    </div>
    <a href="#" onClick={(e) => { e.preventDefault(); onClose(); }} className={styles.close}>
      <i className="fas fa-times" />
    </a>
  </div>
);

export default Toast;
