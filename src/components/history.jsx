import React, { Component } from 'react';
import * as historyAPI from '../services/historyService';
import HistoryHeader from './historyHeader';
import HistoryTable from './historyTable';
import Pagination from './pagination';
import { paginate } from '../utils/paginate';
import Input from './input';
import _ from 'lodash';

// import OverreadIcon from './helpers/overreadIcon';
// import SessionDuration from './helpers/sessionDuration';
// import MyHeaderComponent from './helpers/myHeaderComponent';
// import DetailCellRenderer from './helpers/detailCellRenderer';
// import moment from 'moment';

import queryString from 'query-string';
//import { formatDiagnostic } from 'typescript';

class History extends Component {

  unlisten = null;
  
  state = {

    historyItems: [],

    currentPage: 1,
    pageSize: 6,
    sortColumn: { path: "sessionId", order: 'desc' },
    currentSearch: ''
  
  };


  async componentDidMount() {

    console.log('componentDidMount');
    
    const items = await historyAPI.getHistoryItems();
    this.setState({ historyItems: items });
    
    //bind event
    this.unlisten = this.props.history.listen(this.webHistoryListener);
    
    this.customUpdateStatus(this.props.location);
    
  }

  customUpdateStatus = (location) => {

    const parsed = queryString.parse(location.search);

    const newState = {};

    newState.currentSearch = parsed.search;

    if (parsed.page) {
      const currentPage = Number(parsed.page);
      newState.currentPage = currentPage;
      }

    if (parsed.path && parsed.order) {
      newState.sortColumn = { path: parsed.path, order: parsed.order };
    }

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

  getPagedData = () => {

    const { pageSize, currentPage, currentSearch, historyItems: allOverreads, sortColumn } = this.state;
    //const { pageSize, currentPage, movies: allMovies, currentGenre, sortColumn, currentSearch } = this.state;

    let overreadsFiltered = currentSearch ? allOverreads.filter(x => 
      x.provider.toLowerCase().includes(currentSearch.toLowerCase()) ||
      x.expert.toLowerCase().includes(currentSearch.toLowerCase()) ||
      x.group.toLowerCase().includes(currentSearch.toLowerCase())
      ) : allOverreads;
    //let overreadsFiltered = allOverreads;
    const overreadsSorted = _.orderBy(overreadsFiltered, [sortColumn.path], [sortColumn.order]);;
    const overreadsPaginated = paginate(overreadsSorted, currentPage, pageSize);

    //return overreadsPaginated;
    return { totalCount: overreadsFiltered.length, data: overreadsPaginated};
  }


  headerCellRendererFunc = (params) => {
    return (
      `<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-receipt" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z" />
        <path fillRule="evenodd" d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z" />
      </svg>`
    );
  }

  handleSort = (sortColumn) => {

    //console.log(sortColumn);
    
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

    const result = this.getPagedData();
    //const result = this.state.historyItems;

    const { pageSize, currentPage, sortColumn } = this.state;
    //const { pageSize, currentPage, genres, currentGenre, sortColumn } = this.state;

    //console.log("DEF SORTCOLUMN",sortColumn)
    return (
      <div style={{ marginTop: '10px', color: '#9e9e9e' }}>
        
        <HistoryHeader />
        <Input style={{  }} placeholder="Search"
          onChange={this.handleSearch}
          value={this.state.currentSearch} />
        <HistoryTable
          overreads={result.data}
          sortColumn={sortColumn}
          onSort={this.handleSort}
          onDetails={this.handleDetails}
        />
        <Pagination
          itemsCount={result.totalCount}
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

