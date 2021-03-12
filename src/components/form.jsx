import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';
import Radio from './radio';
import InputWithLabel from './inputWithLabel';
import Dropdown from './dropdown';
import styles from './form.module.css';

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
    
    console.log("obj", obj);
    console.log("schema", schema);
    console.log("schema", this.schema);

    const { error } = Joi.validate(obj, schema, { abortEarly: false });
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

  renderGender(name, label){

    const { data, errors } = this.state;
    
    return (

    <div className={styles['flex-form']} style={{ marginTop: '5px', marginBottom: '0px'}}>
      <div className={styles['flex-child-label']} style={{ marginTop: '8px'}}>
        {<label style={{color: '#9e9e9e'}} htmlFor={name}>{label}</label>}
      </div>
      <div className={styles['flex-child-element']}>
    
        <label htmlFor="male">Male</label>
        <input className="m-2" type="radio" name="gender" id="male" value="male" onChange={this.handleChange}/>
        <label htmlFor="female">Female</label>
        <input className="m-2" type="radio" name="gender" id="female" value="female" onChange={this.handleChange}/>
    
      </div>
    </div>
    )
    // <Radio
    //   type='radio'
    //   name={name}
    //   value={data[name]}
    //   label={label}
    //   onChange={this.handleChange}
    // />
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