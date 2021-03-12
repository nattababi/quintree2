import React, { Component } from 'react';
import Joi from 'joi-browser';
import Form from './form';
import InviteFormHeader from './inviteFormHeader';

class InviteForm extends Form {
  state = {
    data: { email: '', phone: '', dob: '', gender: '', complaint: '' },
    errors: {}
  };

  schema = {
    email: Joi.string().required().label('Email'),
    phone: Joi.string().label('Pnone'),
    dob: Joi.string().label('Dob'),
    gender: Joi.string().required().label('Gender'),
    complaint: Joi.string().required().label('Complaint')
  }

  doSubmit = async () => {
    console.log("submitted");
    // try {
    //   const { data } = this.state;
    //   await this.props.userStore.login(data);

    //   const { state } = this.props.location;
    //   //window.location = state ? state.from.pathname : '/';
    //   //console.log('Redirect to history', this.props.history);
    //   //this.props.history.push('/session/history');
    // }
    // catch (ex) {
    //   if (ex.response && ex.response.status === 400) {
    //     const errors = { ...this.state.errors };
    //     errors.username = ex.response.data;
    //     this.setState({ errors });
    //   }
    // }
  }

  render() {

    return (
      <div>
        <React.Fragment>
          <div style={{ marginTop: '10px', width: "350px" }}>
            <InviteFormHeader />
          </div>

          <div style={{ padding: '5px', marginTop: '4px', width: "350px", backgroundColor: '#fafafa' }}>
            <form onSubmit={this.handleSubmit}>
              {this.renderInputWithLabel('email', 'Email')}
              {this.renderInputWithLabel('phone', 'Phone', 'tel')}
              {this.renderInputWithLabel('dob', 'DOB', 'date')}
              {this.renderGender('gender', 'Gender')}
              {this.renderInputWithLabel('complaint', 'Complaint')}
              {this.renderButton("Invite")}
            </form>
          </div>
        
        </React.Fragment>
      </div>
    );
  }
}

export default InviteForm;