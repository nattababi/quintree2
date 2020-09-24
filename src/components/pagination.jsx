import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
//import { Link } from 'react-router-dom';
//import queryString from 'query-string';
//import { isThrowStatement } from 'typescript';

class Pagination extends Component {

  step = 5;

  async componentDidMount() {
    //console.log("SLIDER DID MOUNT");
  }

  onInputSliderChange = (param) => {
    this.props.onPageChange(Math.round(param.currentTarget.value));
  }

  onPrev = (page) => {
    this.props.onPageChange(page - 1);
  }
  onPrev10 = (page) => {
    const nextpage = page - 10 > 0 ? page - 10 : 1;
    this.props.onPageChange(nextpage);
  }
  onNext = (page) => {
    this.props.onPageChange(page + 1);
  }
  onNext10 = (page, lastpage) => {
    const nextpage = page + 10 < lastpage ? page + 10 : lastpage;
    this.props.onPageChange(nextpage);
  }

  render() {

    const { itemsCount, pageSize, currentPage, onPageChange } = this.props;

    const pagesCount = Math.ceil(itemsCount / pageSize);

    if (pagesCount === 1) {
      return null;
    }

    //show only 'this.step' pages at once

    let startWith = (currentPage - this.step > 0) ? currentPage - this.step : 1;
    const endWith = (startWith + this.step*2 > pagesCount) ? pagesCount : startWith + this.step*2;
    
    if ((endWith - startWith < 2*this.step) && (endWith - startWith)){
      // count backwards
        startWith = (endWith - 2*this.step > 0) ? endWith - 2*this.step : 1;
    }

    // [startWith..endWith].map
    const pages = _.range(startWith, endWith + 1);

    return (
      <div style={{ backgroundColor: '#fafafa', fontWeight: 'bold', padding: '1em', fontSize: '14px', marginTop: '0px' }}>

        <nav aria-label="...">

          <ul className="pagination justify-content-center pagination-sm">
            <li key={'prev10'}
              className={currentPage === 1 ? 'page-item disabled' : 'page-item'} style={{ cursor: 'pointer' }}>
              <div className="page-link" style={{ color: "#03A99E" }} onClick={() => this.onPrev10(currentPage)}>Prev</div>
            </li>
            
            {pages.map(page => <li key={page}
              className={page === currentPage ? 'page-item active' : 'page-item'} style={{ cursor: 'pointer' }}>
              <div className="page-link" style={{ color: "#03A99E" }} onClick={() => onPageChange(page)}>{page}</div></li>)}

            <li key={'next10'}
              className={currentPage === pagesCount ? 'page-item disabled' : 'page-item'} style={{ cursor: 'pointer' }}>
              <div className="page-link" style={{ color: "#03A99E" }} onClick={() => this.onNext10(currentPage, pagesCount)}>Next</div>
            </li>

          </ul>
        </nav>

        <input
          type="range"
          className="custom-range"
          min="1"
          max={pagesCount}
          step="1"
          id="customRange3"
          value={currentPage}
          onChange={this.onInputSliderChange}
        >
        </input>

      </div>
    );
  }
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;