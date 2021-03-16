import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { svgUserIcon, svgProfileIcon, svgSignoutIcon } from '../svgIcons/main';
import { withRouter } from 'react-router-dom';

@inject('userStore')
@observer
class NavBar extends Component {

  render() {//navbar-expand-md

    console.log("store user navbar = ", this.props.userStore.user ? this.props.userStore.user.firstName : "null");

    return (
    <div>
    <nav className="navbar navbar-expand-sm navbar-light" style={{ backgroundColor: '#03a99e', marginTop: '0px', padding: '5px' }}>
      
      <a className="navbar-brand" href="/" width='auto' style={{ color: '#fff'}}>
        <img src="Quintree_logo.png" width="90px" height="auto" style={{marginRight: '2px'}}/>
      </a>

      {/* <a className="navbar-brand" href="/" width='auto' style={{ color: '#fff'}}>
        <div style={{backgroundImage: "url(Quintree_logo.png)", width:"90px", backgroundSize: 'cover', marginRight: '2px'}}></div>
      </a> */}

      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
      {this.props.userStore.user &&
        <ul className="navbar-nav mx-auto my-auto mt-2 mt-xs-0" style={{ color: '#fff' }}>
          <li className="nav-item active" style={{marginTop: 'auto', marginBottom: 'auto'}}>
            <Link className="nav-link" to="/session/dashboard" style={{ color: '#fff' }}>DASHBOARD 
              <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item" style={{marginTop: 'auto', marginBottom: 'auto'}}>
              <Link className="nav-link" to="/session/history" style={{ color: '#fff' }}>HISTORY</Link>
          </li>

          {this.props.userStore.user && this.props.userStore.user.isAdmin &&
            <React.Fragment>
              <li className="nav-item" style={{marginTop: 'auto', marginBottom: 'auto'}}>
                <button className="btn btn-primary m-2 raise" 
                  onClick={()=>{this.props.history.push('/invite');}}
                  style={{ color: '#fff', backgroundColor: '#FF6E40', 
                  border: 'none', borderRadius: 2, 
                  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', 
                  whiteSpace: 'nowrap', fontSize: 'smaller' }}>
                    NEW PATIENT ENCOUNTER</button>
              </li>
              <li className="nav-item active" style={{marginTop: 'auto', marginBottom: 'auto'}}>
                <Link className="nav-link" to="/groups" style={{ color: '#fff' }}>GROUPS</Link>
              </li>
              <li className="nav-item active" style={{marginTop: 'auto', marginBottom: 'auto'}}>
                <Link className="nav-link" to="/users" style={{ color: '#fff' }}>USERS</Link>
              </li>
            </React.Fragment>
          }
        </ul>
      }

      {/* {!this.props.userStore.user &&
        <ul className="navbar-nav">
          <li className="nav-item" style={{margin: 'auto'}}>
            <Link className="nav-link" to="/login">Login</Link>
          </li>
          <li className="nav-item" style={{margin: 'auto'}}>
            <Link className="nav-link" to="/register">Register</Link>
          </li>
        </ul>
      } */}

      {this.props.userStore.user &&
        <ul className="navbar-nav">
          <li className="nav-item dropdown" style={{marginTop: 'auto', marginBottom: 'auto'}}>
            <Link href="#" className="nav-link dropdown-toggle" id="navDropDownLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ backgroundColor: '#03a99e', border: '0', fontSize: '14px' }}>
              {svgUserIcon} {this.props.userStore.user.firstName}
            </Link>
            <div className="dropdown-menu" aria-labelledby="navDropDownLink" style={{backgroundColor:'white', minWidth:'auto'}}>
              <Link className="dropdown-item" to="/user/general" style={{ fontSize: '13px', padding: '5px' }}>
                {svgProfileIcon} Profile
              </Link>
              <Link className="dropdown-item" to="/logout" style={{ fontSize: '13px', padding: '5px' }}>
                {svgSignoutIcon} Sign out
              </Link>
            </div>
          </li>
        </ul>
      }
    </div>
  </nav>
  
  </div>
  );
  }
}

export default withRouter(NavBar);