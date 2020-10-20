import React from 'react';
import Form from './form';
import Joi from 'joi-browser';
import auth from '../services/authService';
import * as userService from '../services/userService';
import RegisterFormHeader from './registerFormHeader';

class RegisterForm extends Form {
  state = {
    data: { firstName: '', lastName: '', email: '', password: '' },
    errors: {}
  };

  schema = {
    firstName: Joi.string().required().label('First name'),
    lastName: Joi.string().required().label('Last name'),
    email: Joi.string().required().email().label('Email'),
    password: Joi.string().required().min(5).label('Password'),
  }

  doSubmit = async () => {
    try {
      console.log("----------------1------------", this.state.data);
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers['x-auth-token']);
      console.log("response", response);
      window.location = '/';
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
    <React.Fragment>
      <div style={{ marginTop: '10px', width:"500px"}}>
        <RegisterFormHeader/>
      </div>

      <div style={{ padding:'5px', marginTop: '5px', width:"500px", backgroundColor: '#fafafa'}}>
        <form onSubmit={this.handleSubmit}>
          {this.renderInputWithLabel('firstName', 'First name')}
          {this.renderInputWithLabel('lastName', 'Last name')}
          {this.renderInputWithLabel('email', 'Email', 'email')}
          {this.renderInputWithLabel('password', 'Password', 'password')}
          {this.renderButton("CREATE NEW ACCOUNT")}
        </form>
      </div>
    </React.Fragment>);
  }
}

export default RegisterForm;