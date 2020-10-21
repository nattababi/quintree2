import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.module.css';

class NavBar extends Component {
  render() {//navbar-expand-md
    
    //console.log("user=", this.props.user);
    
    return (
      <div>
        <div className={styles['class1']}>some text </div>
        <nav className="navbar navbar-expand-md navbar-light" style={{ backgroundColor: '#03a99e' }}>
        
          <Link className="navbar-brand" to="/">Quintree</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item nav-link active">
                <Link className="nav-link" to="/history" style={{ color: '#fff' }}>HISTORY<span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item nav-link active">
                <Link className="nav-item nav-link" to="/dashboard" style={{ color: '#fff' }}>DASHBOARD</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-primary m-2" style={{ color: '#fff', backgroundColor: '#FF6E40', border: 'none', borderRadius: 2 }}>NEW PATIENT ENCOUNTER</button>
              </li>

              { this.props.user && this.props.user.isAdmin &&
              <React.Fragment>
                <li className="nav-item nav-link active">
                  <Link className="nav-item nav-link" to="/groups" style={{ color: '#fff' }}>GROUPS</Link>
                </li>
                <li className="nav-item nav-link active">
                  <Link className="nav-item nav-link" to="/users" style={{ color: '#fff' }}>USERS</Link>
                </li>
              </React.Fragment>
              }
              
            </ul>
          </div>

          { !this.props.user &&
            <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                  <Link className="nav-item nav-link" to="/login" style={{ color: '#fff' }}>Login</Link>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-item nav-link" to="/register" style={{ color: '#fff' }}>Register</Link>
                  </li>

              </ul>
          }
          { this.props.user &&
              <ul className="navbar-nav ml-auto">
                <li>
                <div class="dropdown" style={{marginTop: '-3px'}}>
                  <button className="btn btn-secondary dropdown-toggle" style={{backgroundColor: '#03a99e', border: '0', fontSize: '14px'}} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-person-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                    </svg> {this.props.user.firstName}
                  </button>
                  <div className="dropdown-menu" ariaLabelledby="dropdownMenuButton">
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
              }
        </nav>
      </div>
    );
  }
}

export default NavBar;