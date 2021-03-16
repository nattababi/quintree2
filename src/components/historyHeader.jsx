import React, { Component } from 'react';
import { svgHistoryIcon } from '../svgIcons/main';
import styles from './form.module.css';

class HistoryHeader extends Component {
  render() {
    return (
      <div className={styles['quintree-header']}>
        {svgHistoryIcon} History
      </div>
    );
  }
}

export default HistoryHeader;