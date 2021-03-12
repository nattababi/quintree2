import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import ListGroup from './listgroup';

class Profile extends Component {
  state = {
    menu: [ {name:"General"}, {name:"Billing"}, {name:"Password"} ],
    currentMenu: "General"
  };

  handleListgroup = (name) => {
    const newState = {};

    newState.currentMenu = name;

    this.setState(newState);
  }

  render() {
    return (
      <div>
        <br/>
        <ListGroup onItemChange={this.handleListgroup}
          menu={this.state.menu}
          currentMenu={this.state.currentMenu}
        />
     </div>
    );
  }
}

export default Profile;