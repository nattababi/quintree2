import React, { Component } from 'react';

class TableHeader extends Component {

  renderSortIcon = column => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path){
      return null;
    }
    if (sortColumn.order === 'asc'){
      return <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
            </svg>

    }
    return <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
           </svg>

    // <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-down-short" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    //   <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"/>
    // </svg>
  };

  raiseSort = path => {

    const sortColumn = { ...this.props.sortColumn };
    //console.log('onSort', sortColumn.path, sortColumn.order, path);

    if (sortColumn.path === path) {
      sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
    }
    else {
      sortColumn.path = path;
      sortColumn.order = 'asc';
    }
    
    this.props.onSort(sortColumn);
  };

  render() {

    const { columns, sortColumn, onSort } = this.props;

    return (
      // <thead>
      // <tr>
      //   <td>{this.getOverreadHeaderIcon()}</td>
      //   <td>{this.getIdIcon()} ID </td>
      //   <td>{this.getHistoryIcon()} Started/Duration </td>
      //   <td>{this.getProviderIcon()} Provider </td>
      //   <td>{this.getExpertIcon()} Expert </td>
      //   <td>{this.getGroupIcon()} Group </td>
      // </tr>
      // </thead>
      <thead>
        <tr>
          {this.props.columns.map(column =>
          <td className="clickable" style={column.style}
            key={column.path || column.key}
            onClick={() => this.raiseSort(column.path)}>
            {column.icon} {column.label} {this.renderSortIcon(column)}
          </td>)}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
