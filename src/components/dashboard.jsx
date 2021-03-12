import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './dashboard.module.css';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <ul className="nav justify-content-center">
          {/* <li className="nav-item">
            <button className="btn btn-primary m-2 shadow-none" style={{ color: '#fff', backgroundColor: '#FF6E40', border: 'none', borderRadius: 2 }}>Invite user by mail</button>
          </li> */}
          <li className="nav-item">
            <div style={{ color: '#fff', backgroundColor: '#FF6E40', marginTop: '10px'}}><Link className="nav-link" to="/invite">Invite user by email</Link></div>
          </li>
        </ul>
        <div style={{ color: '#fff', backgroundColor: '#000', marginTop: '10px'}}>Big black dashboard</div>
      </div>
    );
  }
}

export default Dashboard;