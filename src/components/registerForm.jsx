import React from 'react';
import Form from './form';
import Joi from 'joi-browser';
import auth from '../services/authService';
import * as userService from '../services/userService';
import RegisterFormHeader from './registerFormHeader';
import Recaptcha from "react-google-recaptcha";
import styles from './form.module.css';

class RegisterForm extends Form {
  state = {
    data: { firstName: '', lastName: '', email: '', password: '', isVerified: false },
    errors: {},
    isVerified: false
  };

  schema = {
    firstName: Joi.string().required().label('First name'),
    lastName: Joi.string().required().label('Last name'),
    email: Joi.string().required().email().label('Email'),
    password: Joi.string().required().min(5).label('Password'),
    isVerified: Joi.boolean().required().valid(true),
  }
  
  onChange = (value) => {
    console.log("changing recaptcha");
    if (value) {
      this.setState({
        data: {
              ...this.state.data,
              isVerified: 'true'
        }
      });
    }
    else{
      this.setState({
        data: {
              ...this.state.data,
              isVerified: 'false'
        }
      });
    }
  }

  doSubmit = async () => {
    try {
      console.log('2', this.state.isVerified);
      if (this.state.isVerified ) {
        console.log('22');
        const response = await userService.register(this.state.data);
        console.log('222');
        auth.loginWithJwt(response.headers['x-auth-token']);
        console.log('2222');
        console.log("response", response);
        console.log('22222');
        window.location = '/';
        console.log('222222');
      }
    }

    catch (ex) {
      console.log('3');
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  }

  // const [disableSubmit,setDisableSubmit] = useState(true);
  // <button type="submit" disabled={disableSubmit}>Submit</button>

  render() {
    return (
      <div className={styles['card-parent']}>
        <div className={styles['card-wrapped']}>
          <div className={styles['card', 'card-wide']} style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>

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
                <Recaptcha sitekey="6LdNVdcZAAAAACTjuuUw07vhFyX5X_MPmRUOO-Rx" onChange={this.onChange} disabled={false}/>
              </div>
              {this.renderButton("CREATE NEW ACCOUNT")}
            </form>
          </div>

        </div>
      </div>
    </div>);
  }
}

export default RegisterForm;