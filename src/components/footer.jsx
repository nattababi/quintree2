import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <div>     
        <nav className="nav fixed-bottom navbar-dark bg-dark justify-content-center">
          <div style={{display: 'block'}}>
            <div style={{display: 'inline-block', margin: 'auto'}}>
              <a className="nav-link" href="/site/terms" style={{ color: '#9e9e9e', fontSize: 'smaller' }}>Copyright &#169; 2021 Quintree Medical, LLC | All Rights Reserved.</a>
            </div>
            <div style={{display: 'inline-block', margin: 'auto'}}>
              <a className="nav-link" href="/site/privacy" style={{ color: '#9e9e9e', fontSize: 'smaller' }}>Privacy</a>
            </div>
            <div style={{display: 'inline-block', margin: 'auto'}}>
              <a className="nav-link" href="/site/terms" style={{ color: '#9e9e9e', fontSize: 'smaller' }}>Terms</a>
            </div>
         </div>
      </nav>
      </div>
    );
  }
}

export default Footer;