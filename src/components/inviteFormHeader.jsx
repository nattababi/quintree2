import React, { Component } from 'react';
import { svgInviteIcon } from '../svgIcons/main';
import styles from './form.module.css';

class InviteFormHeader extends Component {
  render() {
    return (
      <div className={styles['quintree-header']}>
        {svgInviteIcon} Invite
      </div>
    );
  }
}

export default InviteFormHeader;