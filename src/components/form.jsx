import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';
import InputWithLabel from './inputWithLabel';
import Dropdown from './dropdown';

class Form extends Component {
  state = {
    data: {},
    errors: {}
  }

  validate = () => {
    const options = { abortEarly: false };

    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) {
      return null;
    }

    const errors = {};

    for (let item of error.details)
      errors[item.path[0]] = item.message;

    return errors;
  }

  validateProperty = ({ name, value }) => {

    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    console.log(schema);
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;

  }

  handleSubmit = (e) => {

    e.preventDefault();

    const errors = this.validate();

    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {

    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    
    if (errorMessage) {
      console.log('VALIDATION ERROR');
      errors[input.name] = errorMessage;
    }
    else {
      delete errors[input.name];
    }
    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors })
  }

  renderButton(label) {
    return <div style={{marginTop: "10px"}}>
      <button style={{backgroundColor: '#03a99e', fontWeight: 'bold', padding: '1em', fontSize: '14px', color: '#fff', border: "0px"}}
      disabled={this.validate()}
      className="btn btn-primary">{label}
    </button>
    </div>
  }

  renderInput(name, label, type = 'text') {

    //get value if parameter exists
    //this.state.data[name] = value;
    
    const { data, errors } = this.state;
    return <Input
      type={type}
      name={name}
      value={data[name]}
      onChange={this.handleChange}
      error={errors[name]}
    />
  }

  renderInputWithLabel(name, label, type = 'text') {

    //get value if parameter exists
    //this.state.data[name] = value;
    
    const { data, errors } = this.state;
    return <InputWithLabel
      type={type}
      name={name}
      value={data[name]}
      label={label}
      onChange={this.handleChange}
      error={errors[name]}
    />
  }

  renderDropdown(name, label, data, value) {

    const { errors } = this.state;
    
    return <Dropdown
      name={name}
      label={label}
      data={data}
      value={value}
      onChange={this.handleChange}
      error={errors[name]}
    />

  }
}

export default Form;