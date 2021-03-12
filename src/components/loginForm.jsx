import React from 'react';
import Form from './form';
import Joi from 'joi-browser';
import { Redirect } from 'react-router-dom';
import auth from '../services/authService';
import LoginFormHeader from './loginFormHeader';
import { inject } from 'mobx-react';

@inject('userStore')

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
      await this.props.userStore.login(data);

      const { state } = this.props.location;
      //window.location = state ? state.from.pathname : '/';
      console.log('Redirect to history', this.props.history);
      this.props.history.push('/session/history');
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
    if (auth.getCurrentUser()) return <Redirect to="/session/dashboard" />;
    return (
      <div style={{marginLeft: '10px', marginBottom: '10px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', width: '95%', maxWidth: '360px'}}>
        
        <div style={{ marginTop: '10px'}}>
          <LoginFormHeader />
        </div>

        <div style={{ padding: '5px', marginTop: '4px', backgroundColor: '#fafafa' }}>
          <form onSubmit={this.handleSubmit} style={{padding: '10px'}}>
            {this.renderInputWithLabel('email', 'Email')}
            {this.renderInputWithLabel('password', 'Password', 'password')}
            {this.renderButton("Login")}
          </form>
        </div>

      </div>
    );
  }
}

export default LoginForm;