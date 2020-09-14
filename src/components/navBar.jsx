import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class NavBar extends Component {
  render() {//navbar-expand-md
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-light" style={{ backgroundColor: '#03a99e' }}>
        
          <Link className="navbar-brand" to="/" style={{ color: '#fff' }}>Quintree</Link>
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
              <li className="nav-item nav-link active">
                <Link className="nav-item nav-link" to="/groups" style={{ color: '#fff' }}>GROUPS</Link>
              </li>
              <li className="nav-item nav-link active">
                <Link className="nav-item nav-link" to="/users" style={{ color: '#fff' }}>USERS</Link>
              </li>
          </ul>
        </div>
      </nav>
      </div>
    );
  }
}

export default NavBar;