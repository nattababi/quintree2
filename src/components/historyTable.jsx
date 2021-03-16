import React, { Component } from 'react';
import Table from './table';
import Overread from './helpers/overread';
import { svgExistsIcon, svgSessionIdIcon, svgHistoryIcon, svgProfileIcon, svgGroupIcon } from '../svgIcons/main';

class HistoryTable extends Component {

  columns = [{
    path: 'exists',
    label: '',
    style: { minWidth: '20px' },
    icon: svgExistsIcon,
    content: isExists => <Overread exists={isExists}></Overread>
  },
  {
    path: 'sessionId',
    label: 'ID',
    style: { minWidth: '40px' },
    icon: svgSessionIdIcon,
  },
  {
    path: 'started',
    label: 'Started/Duration',
    style: { minWidth: '40px' },
    icon: svgHistoryIcon,
  },
  {
    path: 'provider',
    label: 'Provider',
    style: { minWidth: '60px' },
    icon: svgProfileIcon,
  },

  {
    path: 'expert',
    label: 'Expert',
    style: { minWidth: '40px' },
    icon: svgProfileIcon
  },
  {
    path: 'group',
    label: 'Group',
    style: { minWidth: '40px' },
    icon: svgGroupIcon
  },
  ];

  render() {

    const { overreads, sortColumn, onSort, onDetails } = this.props;

    return (
      <Table columns={this.columns}
        sortColumn={sortColumn}
        data={overreads}
        onSort={onSort}
        onDetails={onDetails} />
    );

  }
}

export default HistoryTable;
