import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Profile extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-light" style={{ backgroundColor: '#fff' }}>
          <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
              
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
                  <span className="navbar-toggler-icon"></span>
              </button>
          </div>
          <div className="mx-auto order-0">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item nav-link active">
                <Link className="nav-link" to="/history" style={{ color: '#757575' }}>GENERAL<span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item nav-link active">
                <Link className="nav-item nav-link" to="/dashboard" style={{ color: '#757575' }}>LICENSES</Link>
              </li>
            <li className="nav-item nav-link active">
                  <Link className="nav-item nav-link" to="/groups" style={{ color: '#757575' }}>GROUPS</Link>
                </li>
                <li className="nav-item nav-link active">
                  <Link className="nav-item nav-link" to="/users" style={{ color: '#757575' }}>BILLING</Link>
                </li>
                <li className="nav-item nav-link active">
                  <Link className="nav-item nav-link" to="/users" style={{ color: '#757575' }}>PASSWORD</Link>
                </li>
            </ul>
          </div>
          
          <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
              <ul className="navbar-nav ml-auto">
              </ul>
          </div>
        </nav>
     </div>
    );
  }
}

export default Profile;