import React from 'react';
import Form from './form';
import Joi from 'joi-browser';
import { Redirect } from 'react-router-dom';
import auth from '../services/authService';
import LoginFormHeader from './loginFormHeader';

class LoginForm extends Form {
  state = {
    data: { email: '', password: '' },
    errors: {}
  };

  schema = {
    email: Joi.string().required().label('Email'),
    password: Joi.string().required().label('Password')
  }

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.email, data.password);

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : '/';
    }
    catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  }

  componentDidMount() {
    //this.username.current.focus();
  }

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <React.Fragment>
        <div style={{ marginTop: '10px', width:"350px"}}>
          <LoginFormHeader/>
        </div>

        <div style={{ padding:'5px', marginTop: '4px', width:"350px", backgroundColor: '#fafafa'}}>
          <form onSubmit={this.handleSubmit}>
              {this.renderInputWithLabel('email', 'Email')}
              {this.renderInputWithLabel('password', 'Password', 'password')}
              {this.renderButton("Login")}
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default LoginForm;