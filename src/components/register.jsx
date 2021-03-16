import React, { Component } from 'react';
import RegisterFormHeader from './registerFormHeader';
import styles from './form.module.css';
import RegisterForm from './registerForm';

class Register extends Component {

  componentDidMount(){
    //console.log('history register=', this.props.history);
  }

  render() {
    return (
      <div className={styles['card-wrapped']}>

        <div className={styles['card', 'card-normal']} style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>

          <div style={{ marginTop: '10px'}}>
          <RegisterFormHeader/>
          </div>

          <div style={{ backgroundColor: '#fafafa' }}>
            <div style={{backgroundImage: "url(Quintree_register.jpeg)", width: 'inherit', height: '200px', backgroundSize: 'cover', marginTop: '4px'}}></div>
              <div style={{padding: '10px'}}>
                <button className={styles['btn-quintree']} style={{width:'100%'}} onClick={()=>{this.props.history.push('/register');}}>NEW USER</button>
              </div>
          </div>

        </div>
      </div>

    );
  }
}

export default Register;