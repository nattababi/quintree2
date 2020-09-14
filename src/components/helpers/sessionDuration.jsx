import React, { Component } from 'react';
import moment from 'moment';

class SessionDuration extends Component {
  render() {
    //console.log('GOT VALUE:', this.props.value);

    let d1 = moment(this.props.value.started);
    let d2 = moment(this.props.value.ended);

    let minutes = d2.diff(d1, 'minutes');

    return ( 
       <div>
         {d1.format('lll')}
         <p style={{ marginBottom: '0px', marginTop: '0px' }}>{minutes + ' minutes'}</p>
       </div>
    );

  }
}

export default SessionDuration;