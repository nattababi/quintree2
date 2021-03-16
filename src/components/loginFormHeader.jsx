import React, { Component } from 'react';
import { svgKeyIcon } from '../svgIcons/main';
import styles from './form.module.css';

class LoginFormHeader extends Component {
  render() {
    return (
      <div className={styles['quintree-header']} style={{ backgroundColor: '#fafafa', fontWeight: 'bold', padding: '0.6em', fontSize: '14px', color: '#9e9e9e' }}>
        {svgKeyIcon} Log In
      </div>
    );
  }
}

export default LoginFormHeader;