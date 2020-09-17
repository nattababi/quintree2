import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Pagination extends Component {

  onInputSliderChange = (param) =>{
    this.props.onSliderChange(param.currentTarget.value);
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
    
    const { itemsCount, pageSize, currentPage, sliderValue, onPageChange } = this.props;
    
    const pagesCount = Math.ceil(itemsCount / pageSize);
  
    if (pagesCount === 1) {
      return null;
    }

    // [1..pagesCount].map
    const pages = _.range(1, pagesCount + 1);

    return (
      <div style={{ backgroundColor: '#fafafa', fontWeight: 'bold', padding: '1em', fontSize: '14px', marginTop: '0px'}}>
        
        <nav aria-label="...">
        
          <ul className="pagination justify-content-center pagination-sm">
          <li key={'prev10'}
              className={currentPage === 1 ? 'page-item disabled' : 'page-item'} style={{cursor: 'pointer'}}>
                <div className="page-link" style={{color: "#03A99E"}} onClick={() => this.onPrev10(currentPage)}>Prev 10</div>
            </li>
            <li key={'prev'}
              className={currentPage === 1 ? 'page-item disabled' : 'page-item'} style={{cursor: 'pointer'}}>
                <div className="page-link" style={{color: "#03A99E"}} onClick={() => this.onPrev(currentPage)}>Prev</div>
            </li>

            {pages.map(page => <li key={page}
              className={page === currentPage ? 'page-item active' : 'page-item'} style={{cursor: 'pointer'}}>
              <div className="page-link" style={{color: "#03A99E"}} onClick={() => onPageChange(page)}>{page}</div></li>)}
            
              <li key={'next'}
                className={currentPage === pagesCount ? 'page-item disabled' : 'page-item'} style={{cursor: 'pointer'}}>
                  <div className="page-link" style={{color: "#03A99E"}} onClick={() => this.onNext(currentPage)}>Next</div>
              </li>

              <li key={'next10'}
                className={currentPage === pagesCount ? 'page-item disabled' : 'page-item'} style={{cursor: 'pointer'}}>
                  <div className="page-link" style={{color: "#03A99E"}} onClick={() => this.onNext10(currentPage, pagesCount)}>Next 10</div>
              </li>

          </ul>
        </nav>

        <input
          type="range"
          className="custom-range"
          min="100"
          max={pagesCount*100}
          step="1" 
          id="customRange3"
          value={sliderValue}
          onChange={this.onInputSliderChange}>
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