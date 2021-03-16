import React, { Component } from 'react';
import { svgRegisterIcon } from '../svgIcons/main';
import styles from './form.module.css';

class RegisterFormHeader extends Component {
  render() {
    return (
      <div className={styles['quintree-header']} style={{ backgroundColor: '#fafafa', fontWeight: 'bold', padding: '0.6em', fontSize: '14px', color: '#9e9e9e' }}>
        {svgRegisterIcon} Register
      </div>
    );
  }
}

export default RegisterFormHeader;