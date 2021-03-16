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
    errors: {}
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
      console.log(this.state.data.isVerified);
      if (this.state.data.isVerified ) {
        const response = await userService.register(this.state.data);
        auth.loginWithJwt(response.headers['authorization']);
        window.location = '/';
      }
    }
    catch (ex) {
      alert('Error '+ ex.response.status + '(' + ex.response.data +') from the server');
      console.log(ex.response);
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