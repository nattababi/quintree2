import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import NavBar from './components/navBar';
import History from './components/history';
import Dashboard from './components/dashboard';
import Groups from './components/groups';
import Users from './components/users';

function App() {
  return (
    <main className="container">
        {/* <NavBar user={user} /> */}
        <NavBar />
         <Switch> 
          {/* <ProtectedRoute 
            path="/movies/:id"
            component={MovieDetails}
          /> */}
          {/* <Route path="/history"
            render={props => <Movies {...props} user={user} />} /> */}
          <Route path="/history" component={History} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/groups" component={Groups} />
          <Route path="/users" component={Users} />
          {/* <Redirect exact from="/" to="/session" /> */}
          {/* <Redirect to="/not-found" /> */}
        </Switch>
    </main>
  );
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
