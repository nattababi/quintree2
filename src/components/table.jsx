import React, { Component } from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';

class Table extends Component {

  render() {
  
    const { columns, sortColumn, onSort, onDetails, data } = this.props;

    return (
      <div style={{overflowX: "auto", overflowY: "auto"}}>
        <table className="table"
          style={{ 
            backgroundColor: "#fff",
            marginTop: '2px',
            marginBottom: '1px',
            color: '#424242',
            border: '0', 
            fontFamily: "Helvetica",
            //Helvetica,Arial,sans-serif
            fontSize: 13}}>
          <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
          <TableBody data={data} columns={columns} onDetails={onDetails}/>
        </table>
      </div>
    );
}
}

export default Table;

