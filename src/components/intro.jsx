import React, { Component } from 'react';
import LoginForm from './loginForm';
import Register from './register';
import styles from './form.module.css';

class Intro extends Component {

  componentDidMount(){
    console.log('history=', this.props.history);
  }

  render() {
    return (
      <div className={styles['card-parent']}>
        <LoginForm location={this.props.location} history={this.props.history}/>
        {/* <LoginForm /> */}
        <Register history={this.props.history}/>
      </div>
    );
  }
}

export default Intro;