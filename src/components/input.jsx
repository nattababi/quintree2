import React, { Component } from 'react';
import styles from './form.module.css';

class Input extends Component {
  state = {}
  render() {
    const {name, label, error, ...rest} = this.props;

    return (
        <div>
          <input
            {...rest}
            name={name}
            id={name}
            className="form-control" />
          {error && <div className="alert alert-danger">{error}</div>}
      </div>

    );
  }
}

export default Input;