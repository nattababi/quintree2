import React from 'react';
import Form from './form';
import Joi from 'joi-browser';
import auth from '../services/authService';
import * as userService from '../services/userService';
import RegisterFormHeader from './registerFormHeader';
import Recaptcha from "react-google-recaptcha";

class RegisterForm extends Form {
  state = {
    data: { firstName: '', lastName: '', email: '', password: '' },
    errors: {},
    isVerified: false
  };

  schema = {
    firstName: Joi.string().required().label('First name'),
    lastName: Joi.string().required().label('Last name'),
    email: Joi.string().required().email().label('Email'),
    password: Joi.string().required().min(5).label('Password'),
  }
  
  onChange = (value) => {
    if (value) {
      this.setState({ isVerified: true});
    }
    else{
      this.setState({ isVerified: false});
    }
  }

  doSubmit = async () => {
    try {
      if (this.state.isVerified ) {
        const response = await userService.register(this.state.data);
        auth.loginWithJwt(response.headers['x-auth-token']);
        console.log("response", response);
        window.location = '/';
      }
    }
    catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  }

  render() {
    return (
    <div style={{marginLeft: '10px', marginBottom: '10px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', width: '95%', maxWidth: '400px'}}>
      
      <div style={{ marginTop: '10px'}}>
        <RegisterFormHeader/>
      </div>

      <div style={{ padding:'10px', marginTop: '4px', backgroundColor: '#fafafa'}}>
        <form onSubmit={this.handleSubmit}>
          {this.renderInputWithLabel('firstName', 'First name')}
          {this.renderInputWithLabel('lastName', 'Last name')}
          {this.renderInputWithLabel('email', 'Email', 'email')}
          {this.renderInputWithLabel('password', 'Password', 'password')}
          <div className="" style={{padding: '1em'}}>
            <Recaptcha sitekey="6LdNVdcZAAAAACTjuuUw07vhFyX5X_MPmRUOO-Rx" onChange={this.onChange} />
          </div>
          {this.renderButton("CREATE NEW ACCOUNT")}
        </form>
      </div>
    </div>);
  }
}

export default RegisterForm;