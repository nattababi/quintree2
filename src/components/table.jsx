import React, { Component } from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';

class Table extends Component {

  render() {
    const { columns, sortColumn, onSort, data } = this.props;

  return (
    <div>
      <table className="table"
        style={{ 
          backgroundColor: "#fff",
          marginTop: '2px',
          marginBottom: '1px',
          color: '#424242',
          border: '0' }}>
        <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
        <TableBody data={data} columns={columns} />
      </table>
    </div>
  );
}
}

export default Table;

