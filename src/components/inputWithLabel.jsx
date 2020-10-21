import React, { Component } from 'react';
import styles from './form.module.css';

class InputWithLabel extends Component {
  state = {}
  render() {
    const {name, label, error, ...rest} = this.props;

    return (
      <div className={styles['flex-form']} style={{ marginTop: '5px', marginBottom: '0px'}}>
        <div className={styles['flex-child-label']} style={{ marginTop: '8px'}}>
          {<label style={{color: '#9e9e9e'}} htmlFor={this.props.name}>{this.props.label}</label>}
        </div>
        <div className={styles['flex-child-element']}>
          <input
            {...rest}
            name={name}
            id={name}
            className="form-control" />
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
      </div>

    );
  }
}

export default InputWithLabel;