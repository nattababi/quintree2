import React, { Component } from 'react';
import { svgHistoryIcon } from '../svgIcons/main';

class HistoryHeader extends Component {
  render() {
    return (
      <div style={{ backgroundColor: '#fafafa', fontWeight: 'bold', padding: '1em', fontSize: '14px' }}>
        {svgHistoryIcon} History
      </div>
    );
  }
}

export default HistoryHeader;