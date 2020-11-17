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
import Logout from './components/logout';
import Profile from './components/profile';
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
      <main className="container">
        <Provider {...stores}>
          <NavBar />
          <Switch>
            {/* <ProtectedRoute 
            path="/movies/:id"
            component={MovieDetails}
          /> */}
            {/* <Route path="/history"
            render={props => <Movies {...props} user={user} />} /> */}
            {/* <Route
            path='/history'
            component={() => <History user={user} />}
          /> */}
            <ProtectedRoute
              path="/history"
              component={History}
            />
            <ProtectedRoute
              path="/dashboard"
              component={Dashboard}
            />
            <ProtectedRoute
              path="/groups"
              component={Groups}
            />
            <ProtectedRoute
              path="/users"
              component={Users}
            />
            <ProtectedRoute
              path="/profile"
              component={Profile}
            />
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

// import React, { Component } from 'react';
// import './App.css';
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-material.css';

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       columnDefs: [{
//         headerName: "Make", field: "make", sortable: true, filter: true
//       }, {
//         headerName: "Model", field: "model", sortable: true, filter: true
//       }, {
//         headerName: "Price", field: "price", sortable: true, filter: true,
//         // cellRendererFramework: PriceTag,
//       }],
//       rowData: [{
//         make: "Toyota", model: "Celica", price: { min: 35000, max: 100000 }
//       }, {
//         make: "Ford", model: "Mondeo", price: { min: 32000, max: 100000 }
//       }, {
//         make: "Porsche", model: "Boxter", price: { min: 72000, max: 100000 }
//       }]
//     }
//   }

//   render() {
//     return (
//       <div
//         className="ag-theme-material"
//         style={{
//         height: '250px',
//         width: '600px' }}
//       >
//         <AgGridReact pagination="true"
//           columnDefs={this.state.columnDefs}
//           rowData={this.state.rowData}>
//         </AgGridReact>
//       </div>
//     );
//   }
// }

// export default App;
