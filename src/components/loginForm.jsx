import React from 'react';
import Form from './form';
import Joi from 'joi-browser';
import { Redirect } from 'react-router-dom';
import auth from '../services/authService';
import LoginFormHeader from './loginFormHeader';
import { inject } from 'mobx-react';
import styles from './form.module.css';
import { Link } from 'react-router-dom';

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
    console.log('cdm-',this.state.data.email);
    //setTimeout(this.validate(), 2000);
  }

  render() {
    // works
    if (auth.getCurrentUser()) return <Redirect to="/session/dashboard" />;
    
    return (
      <div className={styles['card-wrapped']}>
        <div className={styles['card', 'card-normal']} style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
          
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
        <div className={styles['card-normal']} style={{padding: '12px 16px', textAlign: 'left', fontSize: 'smaller'}}>
          By logging in, you agree to our
          <a className="m-1" href="/site/terms" target="_blank">Terms of Service</a>
           and 
          <a className="m-1" href="/site/privacy" target="_blank">Privacy Policy</a>
        </div>
      </div>

    );
  }
}

export default LoginForm;