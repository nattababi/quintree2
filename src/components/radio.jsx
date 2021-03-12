import React, { Component } from 'react';
import styles from './form.module.css';

class Radio extends Component {
  state = {}
  render() {
    const {name, label, error, ...rest} = this.props;

    console.log("REST=", {...rest});
    return (
      <div className={styles['flex-form']} style={{ marginTop: '5px', marginBottom: '0px'}}>
      <div className={styles['flex-child-label']} style={{ marginTop: '8px'}}>
        {<label style={{color: '#9e9e9e'}} htmlFor={this.props.name}>{this.props.label}</label>}
      </div>
      <div className={styles['flex-child-element']}>
        <label for={name}>Huey</label>
        <input
          {...rest}
          name={name}
          id={name}
          className="form-control"/>
        <input
          {...rest}
          name={name}
          id={name}
          className="form-control" />
        {error && <div className="alert alert-danger">{error}</div>}
    
        <label for="male">Male</label>
        <input type="radio" name="gender" id="male" value="male"/>
        <label for="female">Female</label>
        <input type="radio" name="gender" id="female" value="female"/>
    
      </div>
    </div>
    
    );
  }
}

export default Radio;