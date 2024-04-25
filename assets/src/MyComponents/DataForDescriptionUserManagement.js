import React, { Component } from 'react';
import moment from 'moment';

export class DataForDescriptionUserManagement extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    const item = this.props.dataItem;
    const start_date = moment(item.createdAt);
    const createdAt = start_date.format('DD-MM-YYYY');
    return (
      <div>
        <div style={{ display: 'flex', marginBottom: '1.5%' }}>
          <div style={{ width: '50%' }}>
            {' '}
            <span style={{ wordBreak: 'break-all' }}>
              <b>Course Id : </b>
              {item.courseId === undefined ? <span> N/A</span> : item.courseId}
            </span>
          </div>
          <div style={{ width: '50%' }}>
            {' '}
            <span style={{ wordBreak: 'break-all' }}>
              <b> Term : </b>
              {item.term === undefined ? <span> N/A</span> : item.term}
            </span>
          </div>
        </div>

        {/* <div style={{ display: 'flex', marginBottom: '1.5%' }}>
          <div style={{ width: '50%' }}>
            {' '}
            <span style={{ wordBreak: 'break-all' }}>
              <b>Created at : </b>
              {' '}
              {item.createdAt === undefined ? <span> N/A</span> : createdAt}
            </span>
          </div>
          <div style={{ width: '50%' }}>
            {' '}
            <span style={{ wordBreak: 'break-all' }}>
              <b>Department : </b>
              {' '}
              {item.department === undefined ? <span> N/A</span> : item.department}
            </span>
          </div>
        </div> */}

        {/* <div style={{ display: 'flex', marginBottom: '1.5%' }}>
          <div style={{ width: '50%' }}>
            {' '}
            <span style={{ wordBreak: 'break-all' }}>
              <b>Principle field of interest to review : </b>
              {' '}
              {item.principleField === undefined ? <span> N/A</span> : item.principleField}
            </span>
          </div>
          <div style={{ width: '50%' }}>
            {' '}
            <span style={{ wordBreak: 'break-all' }}>
              <b>Job title : </b>
              {' '}
              {item.jobTitle === undefined ? <span> N/A</span> : item.jobTitle}
            </span>
          </div>
        </div> */}

      </div>
    );
  }
}

export default DataForDescriptionUserManagement;
