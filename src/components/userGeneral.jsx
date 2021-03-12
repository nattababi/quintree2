import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from './protectedRoute';
import UserLicenses from './userLicenses';
import NavBarUser from './navBarUser';

class UserGeneral extends Component {
  render() {
    return (
      <div>
        <Switch>
          <NavBarUser/>
          <ProtectedRoute
              path="/profile/licenses"
              component={UserLicenses}
            />
        </Switch>
      </div>
    );
  }
}

export default UserGeneral;