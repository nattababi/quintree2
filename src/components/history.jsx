import React, { Component } from 'react';
import * as historyAPI from '../services/historyService';
import HistoryHeader from './historyHeader';
import HistoryTable from './historyTable';
import Pagination from './pagination';
import Input from './input';
import _ from 'lodash';
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

    //console.log("store user history=",this.props.store.user.firstName);

    console.log('componentDidMount');

    const parsed = queryString.parse(this.props.location.search);

    parsed.page = this.state.currentPage;
    parsed.pageSize = this.state.pageSize;

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

    let result = null;
    try {
      result = await historyAPI.getHistoryItems(parsed);
    }
    catch (err) {
      console.log("ERROR", err.message);
    }
    
    let items = null, total = 0, newState = {};
    
    console.log(result);

    try {
      items = result.sessions;
      total = result.total;
    }
    catch (err) {
      items = null;
      total = 0;
      console.log("ERROR", err.message);
    }
    
    newState.total = total;

    newState.currentSearch = parsed.search;
    if (!parsed.search) {
      newState.currentSearch = '';
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
    console.log(items);
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
    //console.log('row clicked', item);

    this.setState({ historyItems: this.state.historyItems });

    //set other items.extended to false
    this.state.historyItems.forEach(element => {
      if (element.sessionId === item.sessionId) {
        element.extended = (element.extended) ? false : true;
      }
      else {
        element.extended = false
      }
    });
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

    //setState for input
    this.setState({ currentSearch: input.value });

    // debounce url update
    this.updateSearch(url);
  }

  updateSearch = _.debounce((url) => {
    this.props.history.push(url);
  }, 500);

  render() {

    const result = this.state.historyItems;

    const { pageSize, currentPage, sortColumn, total, currentSearch } = this.state;

    return (
      <div style={{ marginTop: '10px', color: '#9e9e9e' }}>
        <HistoryHeader />
        <Input style={{marginTop: '2px'}} placeholder="Search"
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


