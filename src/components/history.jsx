import React, { Component } from 'react';
import * as historyAPI from '../services/historyService';
import HistoryHeader from './historyHeader';
import HistoryTable from './historyTable';
import Pagination from './pagination';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import OverreadIcon from './helpers/overreadIcon';
import SessionDuration from './helpers/sessionDuration';
import MyHeaderComponent from './helpers/myHeaderComponent';
import DetailCellRenderer from './helpers/detailCellRenderer';

import moment from 'moment';
import queryString from 'query-string';

class History extends Component {
    myHeaderValueOverread = 
      `<div class="ag-cell-label-container" role="presentation">
          <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>
          <div ref="eLabel" class="ag-header-cell-label" role="presentation">
            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-receipt" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z" />
              <path fillRule="evenodd" d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z" />
            </svg>
          </div>
        </div>`;
    myHeaderValueId = 
      `<div class="ag-cell-label-container" role="presentation">
          <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>
          <div ref="eLabel" class="ag-header-cell-label" role="presentation">
            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-tag-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1H2zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
            </svg>
            <span ref="eText" class="ag-header-cell-text m-1" role="columnheader"></span>
            <span ref="eSortOrder" class="ag-header-icon ag-sort-order" ></span>
            <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon" ></span>
            <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon" ></span>
            <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon" ></span>
          </div>
        </div>`;
    myHeaderValueStarted = 
      `<div class="ag-cell-label-container" role="presentation">
          <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>
          <div ref="eLabel" class="ag-header-cell-label" role="presentation">
            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-clock-history" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z" />
              <path fillRule="evenodd" d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z" />
              <path fillRule="evenodd" d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z" />
            </svg>
            <span ref="eText" class="ag-header-cell-text m-1" role="columnheader"></span>
            <span ref="eSortOrder" class="ag-header-icon ag-sort-order" ></span>
            <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon" ></span>
            <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon" ></span>
            <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon" ></span>
            <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>
          </div>
        </div>`;
    myHeaderValuePerson = 
      `<div class="ag-cell-label-container" role="presentation">
          <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>
          <div ref="eLabel" class="ag-header-cell-label" role="presentation">
            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-person-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
            <span ref="eText" class="ag-header-cell-text m-1" role="columnheader"></span>
            <span ref="eSortOrder" class="ag-header-icon ag-sort-order" ></span>
            <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon" ></span>
            <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon" ></span>
            <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon" ></span>
            <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>
          </div>
        </div>`;
      myHeaderValueGroup = 
        `<div class="ag-cell-label-container" role="presentation">
          <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>
          <div ref="eLabel" class="ag-header-cell-label" role="presentation">
            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-people-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
            </svg>
            <span ref="eText" class="ag-header-cell-text m-1" role="columnheader"></span>
            <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>
            <span ref="eSortOrder" class="ag-header-icon ag-sort-order" ></span>
              <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon" ></span>
              <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon" ></span>
              <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon" ></span>
            </div>
          </div>`;
          myEmptyHeader = 
          `<div class="ag-cell-label-container" role="presentation">
              <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>
              <div ref="eLabel" class="ag-header-cell-label" role="presentation">
              </div>
            </div>`;
    
  
  gridApi = null;
  unlisten = null;
  
  state = {
    historyItems: [],

    columnDefs: [
      {
        headerName: "Exists", width: 70, field: "exists",
        sortable: false,
        filter: false,
        headerComponentParams: {
          template: this.myHeaderValueOverread },
        cellRendererFramework: OverreadIcon,
      },
      {
        headerName: "ID", width: 100, field: "sessionId",
        sortable: true, filter: false,
        headerComponentParams: { template: this.myHeaderValueId },
      },
      {
        headerName: "Started", field: "started", width: 180,
        valueGetter: 'data',
        sortable: true, filter: false,
        comparator: (a,b) => {
          return moment(b.started).diff(a.started);
        }, 
        autoHeight: true, autoWidth: true,
        cellStyle: { whiteSpace: 'normal', lineHeight: '1.5' }, 
        headerComponentParams: { template: this.myHeaderValueStarted },
        cellRendererFramework: SessionDuration
      },
      {
        headerName: "Provider", autoWidth: true, field: "provider",
        sortable: true, filter: true,
        headerComponentParams: {
          template: this.myHeaderValuePerson
        }
      },
      {
        headerName: "Expert", autoWidth: true, field: "expert",
        sortable: true, filter: true,
        headerComponentParams: {
          template: this.myHeaderValuePerson
        }
      },
      {
        headerName: "Group", autoWidth: true, field: "group",
        sortable: true, filter: true,
        headerComponentParams: {
          template: this.myHeaderValueGroup
        }
      },
      {
        headerName: "Empty", autoWidth: 500, field: "empty",
        sortable: false, filter: false,
        headerComponentParams: {
        template: this.myEmptyHeader
      }
    },
  ],
    rowData: [
      // { make: "Toyota", model: "Celica", price: { min: 35000, max: 100000 }, year: 2015 },
      // { make: "Ford", model: "Mondeo", price: { min: 32000, max: 100000 }, year: 2015 },
      // { make: "Porsche", model: "Boxter", price: { min: 72000, max: 100000 }, year: 2015 }
    ], 
    
    detailCellRenderer: 'myDetailCellRenderer',
    frameworkComponents: { myDetailCellRenderer: DetailCellRenderer },

    myDetailCellRenderer: {

    }
  };

  async componentDidMount() {

    console.log('componentDidMount');
    
    const items = await historyAPI.getHistoryItems();
    this.setState({ rowData: items });
  
    
    //this.setState({ historyItems: items });
    
    // const newItems = this.prepareItems(items);
    // this.setState({ rowData : newItems });
    
    
    }
  
  customUpdateStatus = (location) => {

    //console.log('customUpdateStatus');
    const parsed = queryString.parse(location.search);
    if (parsed.page) {
      console.log('customUpdateStatus ==> paginationGoToPage', Number(parsed.page));
      this.gridApi.paginationGoToPage(Number(parsed.page) - 1);
    }
  }

  webHistoryListener = (location, action) => {
    //console.log('HISTORY Event:', location, action);

    if (location.pathname === '/history') {
      console.log('------2-------');
      this.customUpdateStatus(location);

    }
  }

  componentWillUnmount() {
    console.log('>>> COMPONENT WILL UNMOUNT');
    this.unlisten();
    this.gridApi = null;
  }

  getPagedData = () => {
    return this.state.historyItems;
  }

  prepareItems = (items) => {
    return items.map(item => ({ ...item, duration: this.getDuration(item.started, item.ended) }));
  }

  getOverreadHeaderIcon = () => {
    return (
      <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-receipt" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z" />
        <path fillRule="evenodd" d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z" />
      </svg>
    );
  }

  headerCellRendererFunc = (params) => {
    return (
      `<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-receipt" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z" />
        <path fillRule="evenodd" d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z" />
      </svg>`
    );
  }
  
  handlePagination = (params) => {
    
    // do some action only when grid is ready
    
    //gridApi = null;
    //unlisten = null;
  
    if (this.unlisten){
      let parsed = queryString.parse(this.props.location.search);
      
      console.log("update queryparam from", parsed.page, "to", params.api.paginationGetCurrentPage() + 1);

      parsed.page = params.api.paginationGetCurrentPage() + 1;
      this.props.history.push(`?${queryString.stringify(parsed)}`);
    }
    else{
      console.log("HANDLEPagination waiting");
    }

  }

  handleGridReady = (params) => { 
    console.log("GRID READY"); 
    this.gridApi = params.api;
    
    
  }
  
  handleFirst = (param) => {
    console.log('first');
    //bind event
    this.unlisten = this.props.history.listen(this.webHistoryListener);
  
    
    console.log("---1------");
    this.customUpdateStatus(this.props.location);  
  }

  handleRow = (param) => {
    console.log(param.rowIndex);
  }

  render() {

    const result = this.getPagedData();
    //console.log('--------out array----', this.state.rowData);

    return (
      <div style={{ marginTop: '10px', color: '#9e9e9e' }}>
        <HistoryHeader />
        <div className="ag-theme-material" style={{
          height: '400px',
          width: '100%', marginTop: '3px', color: '#424242'
        }}
        >
          <AgGridReact pagination="true" paginationPageSize='6'
          style={{width: '100%', height: '100%'}}
            masterDetail='true'
            enableColResize='true'
            suppressCellSelection='true'
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}
            
            detailCellRenderer={this.state.detailCellRenderer}
            frameworkComponents={this.state.frameworkComponents}
            
            onGridReady={this.handleGridReady}
            onPaginationChanged={this.handlePagination}
            onFirstDataRendered={this.handleFirst}
            onRowClicked={this.handleRow}
            
            //detailCellRendererParams={this.state.detailCellRendererParams}
            //paginationChanged={this.handlePagination}
            //sortChanged={this.handlePagination}
            //onHeaderClick={this.handlePagination}
          >
          </AgGridReact>
        </div>

        <HistoryHeader />
        <HistoryTable
          history={result} />
      </div>
    );
  }
}

export default History;
