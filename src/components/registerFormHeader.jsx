import React, { Component } from 'react';

class RegisterFormHeader extends Component {
  render() {
    return (
      <div style={{ backgroundColor: '#fafafa', fontWeight: 'bold', padding: '1em', fontSize: '14px', color: '#9e9e9e' }}>
        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-person-lines-fill m-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7 1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm2 9a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
        </svg> New User Registration
      </div>
    );
  }
}

export default RegisterFormHeader;