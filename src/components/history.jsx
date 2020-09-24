import React, { Component } from 'react';
import * as historyAPI from '../services/historyService';
import HistoryHeader from './historyHeader';
import HistoryTable from './historyTable';
import Pagination from './pagination';
import Input from './input';
//import _ from 'lodash';
import queryString from 'query-string';

class History extends Component {

  unlisten = null;

  state = {

    historyItems: [],

    currentPage: 1,
    pageSize: 6,
    total: 0,
    sortColumn: { path: "sessionId", order: 'desc' },
    currentSearch: ''

  };


  async componentDidMount() {

    console.log('componentDidMount');

    const parsed = queryString.parse(this.props.location.search);

    parsed.page = this.state.currentPage;
    parsed.pageSize = this.state.pageSize;

    const result = await historyAPI.getHistoryItems(parsed);

    const items = result.overreads;
    const total = result.total;

    this.setState({ historyItems: items, total });

    //bind event
    this.unlisten = this.props.history.listen(this.webHistoryListener);

    this.customUpdateStatus(this.props.location);

  }

  customUpdateStatus = async (location) => {

    const parsed = queryString.parse(location.search);

    if (!parsed.page) {
      parsed.page = this.state.currentPage;
      parsed.pageSize = this.state.pageSize;
    }

    const result = await historyAPI.getHistoryItems(parsed);

    const items = result.overreads;
    const total = result.total;

    const newState = {};

    newState.total = total;
    
    if (parsed.search) {
      newState.currentSearch = parsed.search;
    }

    if (parsed.page) {
      const currentPage = Number(parsed.page);
      newState.currentPage = currentPage;
    }

    if (parsed.pageSize) {
      const pageSize = Number(parsed.pageSize);
      newState.pageSize = pageSize;
    }

    if (parsed.path && parsed.order) {
      newState.sortColumn = { path: parsed.path, order: parsed.order };
    }

    newState.historyItems = items;
    this.setState(newState);
  }

  webHistoryListener = (location, action) => {
    console.log("webHistoryListener")
    if (location.pathname === '/history') {
      this.customUpdateStatus(location);
    }
  }

  componentWillUnmount() {
    console.log('>>> COMPONENT WILL UNMOUNT');
    this.unlisten();
  }

    handleSort = (sortColumn) => {

    //preserve current query
    let parsed = queryString.parse(this.props.location.search);

    parsed.path = sortColumn.path;
    parsed.order = sortColumn.order;

    this.props.history.push(`?${queryString.stringify(parsed)}`); // with history
  }

  handlePagination = (page) => {

    //preserve current query
    let parsed = queryString.parse(this.props.location.search);

    parsed.page = page;
    parsed.pageSize = this.state.pageSize;

    const url = `?${queryString.stringify(parsed)}`;

    this.props.history.push(url); // with history

  }

  handleDetails = (item) => {
    console.log('row clicked', item);
  }

  handleSearch = ({ currentTarget: input }) => {
    //preserve current query
    let parsed = queryString.parse(this.props.location.search);

    if (input.value) {
      parsed.search = input.value;
      if (parsed.page) {
        //delete parsed.page;// = 1;
        parsed.page = 1;
      }
    }
    else {
      delete parsed.search;
    }

    const url = `?${queryString.stringify(parsed)}`;
    this.props.history.push(url); // with history
  }

  render() {

    const result = this.state.historyItems;

    const { pageSize, currentPage, sortColumn, total, currentSearch } = this.state;
    
    return (
      <div style={{ marginTop: '10px', color: '#9e9e9e' }}>

        <HistoryHeader />
        <Input style={{}} placeholder="Search"
          onChange={this.handleSearch}
          value={currentSearch} />
        <HistoryTable
          overreads={result}
          sortColumn={sortColumn}
          onSort={this.handleSort}
          onDetails={this.handleDetails}
        />
        <Pagination
          itemsCount={total}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePagination}
        />
      </div>
    );
  }
}

export default History;

//<HistoryTabe
//user={user}
//overreads={result.data}
//sortColumn={sortColumn}
//onLikeClick={this.handleLikeToggle}
//onProgressClick={this.handleProgressbar}
//onMovieDelete={this.handleDelete}
//onSort={this.handleSort}
///>
//<Pagination
//itemsCount={result.totalCount}
//pageSize={pageSize}
//currentPage={currentPage}
//onPageChange={this.handlePageChange} />  

