import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
              <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <Link className="navbar-brand" to="/">Quintree</Link>
                  </li>
              </ul>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
                  <span className="navbar-toggler-icon"></span>
              </button>
          </div>
          <div className="mx-auto order-0">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item nav-link active">
                <Link className="nav-link" to="/history" style={{ color: '#fff' }}>HISTORY<span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item nav-link active">
                <Link className="nav-item nav-link" to="/dashboard" style={{ color: '#fff' }}>DASHBOARD</Link>
              </li>
              {/* <button className="btn btn-primary m-2" style={{ color: '#fff', backgroundColor: '#FF6E40', border: 'none', borderRadius: 2 }}>NEW PATIENT ENCOUNTER</button> */}
            
            <li className="nav-item nav-link active">
                  <Link className="nav-item nav-link" to="/groups" style={{ color: '#fff' }}>GROUPS</Link>
                </li>
                <li className="nav-item nav-link active">
                  <Link className="nav-item nav-link" to="/users" style={{ color: '#fff' }}>USERS</Link>
                </li>
            </ul>
          </div>
          
          <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
              <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                      <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                      <Link className="nav-link" to="/register">Register</Link>
                  </li>
                  {/* <li className="nav-item">
                    <button className="btn btn-primary m-2" style={{ color: '#fff', backgroundColor: '#FF6E40', border: 'none', borderRadius: 2 }}>NEW PATIENT ENCOUNTER</button>
                  </li> */}

                <li>
                <div className="dropdown" style={{marginTop: '0px'}}>
                  <button className="btn btn-secondary dropdown-toggle" style={{backgroundColor: '#03a99e', border: '0', fontSize: '14px'}} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-person-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                    </svg> Profile
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <Link className="dropdown-item" to="/profile" style={{ fontSize: '13px'}}>
                      <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-person-fill m-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                      </svg> Profile
                    </Link>
                    <Link className="dropdown-item" to="/logout" style={{ fontSize: '13px'}}>
                      <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-door-open m-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M1 15.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM11.5 2H11V1h.5A1.5 1.5 0 0 1 13 2.5V15h-1V2.5a.5.5 0 0 0-.5-.5z"/>
                        <path fillRule="evenodd" d="M10.828.122A.5.5 0 0 1 11 .5V15h-1V1.077l-6 .857V15H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117z"/>
                        <path d="M8 9c0 .552.224 1 .5 1s.5-.448.5-1-.224-1-.5-1-.5.448-.5 1z"/>
                      </svg>Sign out
                    </Link>
                  </div>
                </div>
              </li>
              
              </ul>
          </div>
        </nav>
     </div>
    );
  }
}

export default Dashboard;