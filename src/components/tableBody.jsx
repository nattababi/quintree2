import React, { Component } from 'react';
import moment from 'moment';
import styles from './table.module.css';
import RowDetails from './rowDetails';

class TableBody extends Component {

  getOverreadIcon = (exists) => {
    if (exists) {
      return (
        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-folder-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z" />
        </svg>
      );
    }
    else {
      return (
        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-folder" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.828 4a3 3 0 0 1-2.12-.879l-.83-.828A1 1 0 0 0 6.173 2H2.5a1 1 0 0 0-1 .981L1.546 4h-1L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3v1z" />
          <path fillRule="evenodd" d="M13.81 4H2.19a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zM2.19 3A2 2 0 0 0 .198 5.181l.637 7A2 2 0 0 0 2.826 14h10.348a2 2 0 0 0 1.991-1.819l.637-7A2 2 0 0 0 13.81 3H2.19z" />
        </svg>
      )
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
    
    return ( d1.format('ll')  );
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
          <React.Fragment>
          <tr key={item.sessionId} style={{ marginTop: '0px', marginBottom: '0px'}}
            className={item.extended ? styles['row-expanded'] : styles['row-clickable']} onClick={() => this.onDetails(item)}>
              <td>{this.getOverreadIcon(item.exists)}</td>
              <td>{item.sessionId}</td>
              <td>{this.getTime(item.started)} <p style={{ marginBottom: '0px' }}>{this.getDuration(item.started,item.ended)} minutes</p></td>
              <td>{item.provider}</td>
              <td>{item.expert}</td>
              <td>{item.group}</td>
          </tr>
          
          {item.extended && 
          <tr key={item.sessionId + "extension"} >
            <td colSpan="6">
              <RowDetails data={item}/>
            </td>
          </tr>}
          </React.Fragment>
          )}
        </tbody>
    );
  }
}

export default TableBody;
