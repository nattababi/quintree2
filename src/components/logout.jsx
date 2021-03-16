import React, { Component } from 'react';
import { inject } from 'mobx-react';

@inject('userStore')
class Logout extends Component {
  
  async componentDidMount() {
    await this.props.userStore.logout();
    this.props.history.push('/intro');
  }

  render() { 
    return null;
  }
}
 
export default Logout;