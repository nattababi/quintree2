import React, { Component } from 'react';
import Recaptcha from "react-google-recaptcha";


class Users extends Component {
  state = {
    isVerified: false
  };
  
  onChange = (value) => {
    if (value) {
      this.setState({ isVerified: true});
    }
    else{
      this.setState({ isVerified: false});
    }
  }

  handleSubscribe = () => {
    if (this.state.isVerified ){
      console.log("subscribed");
    }
    else{
      console.log("not subscribed");
    }
  }

  render() {
    return (
      <div>
       Users
       <input type="text" placeholder="email.company.com"/>
       <div className="convert"
          onClick={this.handleSubscribe}>Subscribe</div>
        <Recaptcha sitekey="6LdNVdcZAAAAACTjuuUw07vhFyX5X_MPmRUOO-Rx" onChange={this.onChange} />
       </div>
    );
  }
}

export default Users;