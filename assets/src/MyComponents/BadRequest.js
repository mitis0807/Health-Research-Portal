import { Link } from 'react-router-dom';
import {
  Card,
} from 'antd';
import React, { Component } from 'react';
import IntlMessages from '../util/IntlMessages';


export class BadRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    document.title = '400';
    return (
      <Card className="cardcss">


        <div className="gx-page-error-container">
          <div className="gx-page-error-content">
            <div className="gx-error-code gx-mb-4">400</div>
            <h2 className="gx-text-center">
              <IntlMessages id="extraPages.404Msg" />
            </h2>

            <p className="gx-text-center">
              <Link className="gx-btn gx-btn-primary" to="/"><IntlMessages id="extraPages.goHome" /></Link>
            </p>
          </div>
        </div>
      </Card>
    );
  }
}


export default BadRequest;
