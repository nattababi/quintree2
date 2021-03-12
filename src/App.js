import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './components/protectedRoute';
import NavBar from './components/navBar';
import History from './components/history';
import Dashboard from './components/dashboard';
import Groups from './components/groups';
import Users from './components/users';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import InviteForm from './components/inviteForm';
import Logout from './components/logout';
import Profile from './components/navBarUser';
import UserGeneral from './components/userGeneral';
import { Provider } from 'mobx-react';
//import { observer } from 'mobx-react';
import * as stores from './stores';

class App extends Component {

  state = {};

  static getDerivedStateFromProps() {
    return null;
  }

  componentDidMount() {
    //this.setState({ user });
    console.log('CDM');
  }

  render() {

    return (
      <main>
        <Provider {...stores}>
          <NavBar />
          <Switch>
            <ProtectedRoute path="/session/history" component={History} />
            <ProtectedRoute path="/session/dashboard" component={Dashboard} />
            <ProtectedRoute path="/groups" component={Groups} />
            <ProtectedRoute path="/users" component={Users} />
            <ProtectedRoute path="/invite" component={InviteForm} />
            <ProtectedRoute path={"/user/general"} component={UserGeneral}/>
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegisterForm} />
            {/* <Route path="/history" component={History} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/groups" component={Groups} />
          <Route path="/users" component={Users} />
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/user" component={Profile} /> */}
            {/* <Redirect exact from="/" to="/session" /> */}
            {/* <Redirect to="/not-found" /> */}
          </Switch>
        </Provider>
      </main>
    );
  }
}

export default App;