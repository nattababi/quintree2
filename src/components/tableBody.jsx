import React, { Component } from 'react';
import moment from 'moment';
import styles from './table.module.css';
import RowDetails from './rowDetails';
import { svgFolderIcon, svgFolderIconFilled } from '../svgIcons/main';

class TableBody extends Component {

  getOverreadIcon = (exists) => {
    if (exists) {
      return svgFolderIconFilled;
    }
    else {
      return svgFolderIcon;
    }
  }

  getDuration = (start, end) => {

    let d1 = moment(start);
    let d2 = moment(end);
    let minutes = d2.diff(d1, 'minutes');

    return minutes;
  }

  getTime = (start) => {
    let d1 = moment(start);

    return (d1.format('ll'));
  }

  onDetails = (item) => {
    //call
    this.props.onDetails(item);
  }

  render() {

    const { data, columns } = this.props;

    if (!data) return null;

    return (
      <tbody>
        {/* ------------TABLE DATA-------------   */}
        {data.map(item =>
          <React.Fragment key={item.sessionId}>
            <tr style={{ marginTop: '0px', marginBottom: '0px' }}
              className={item.extended ? styles['row-expanded'] : styles['row-clickable']} onClick={() => this.onDetails(item)}>
              <td>{this.getOverreadIcon(item.exists)}</td>
              <td>{item.sessionId}</td>
              <td>{this.getTime(item.started)} <p style={{ marginBottom: '0px' }}>{this.getDuration(item.started, item.ended)} minutes</p></td>
              <td>{item.provider.firstName + ' ' + item.provider.lastName}</td>
              <td>{item.expert.firstName + ' ' + item.expert.lastName}</td>
              <td>{item.group}</td>
            </tr>

            {item.extended &&
              <tr>
                <td colSpan="6">
                  <RowDetails data={item} />
                </td>
              </tr>}
          </React.Fragment>
        )}
      </tbody>
    );
  }
}

export default TableBody;
