import React, { Component } from 'react';
import moment from 'moment';
import styles from './table.module.css';
import { svgPhoneIcon, svgLoginIcon, svgCalendarIcon, svgProfileIconNotFilled, svgCompliantIcon, svgOverreadIcon } from '../svgIcons/main';

class RowDetails extends Component {
  
  formatTime = (time) => {
    let d1 = moment(time);
    return ( d1.format('ll')  );
  }

  render() {
    const { data : item } = this.props;

    console.log(item);
    return (
      <div className={styles['flex-container']}>
        <div className={styles['flex-child-provider']}>
          <div>{svgPhoneIcon}{item.patient.phone}</div>
          <div>{svgLoginIcon}{item.patient.patientId}</div>
          <div>{svgCalendarIcon}{this.formatTime(item.patient.dob)}</div>
          <div>{svgProfileIconNotFilled}{item.patient.gender}</div>
          <div>{svgCompliantIcon}{item.complaint}</div>
        </div>
        <div className={styles['flex-child-expert']}>
          <div className={styles['flex-container']}>
              <div className={styles['flex-child-icon']}>
                {svgOverreadIcon}
              </div>
              <div className={styles['flex-child-text']}>
                {item.overread}
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default RowDetails;