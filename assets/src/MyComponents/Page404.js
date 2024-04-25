import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card, Table, Button, Tag, Breadcrumb, Tooltip, Icon,
} from 'antd';
import IntlMessages from '../util/IntlMessages';

const Error404 = () => {
  return (
    <div>
      <img style={{ width: '100%', height: '100%' }} src="https://cdn3.f-cdn.com/contestentries/1349127/29759213/5b23c2a9910b8_thumb900.jpg" />


    </div>
     /*
      <div className="gx-page-error-container">
        <div className="gx-page-error-content">
          <div className="gx-error-code gx-mb-4">404</div>
          <h2 className="gx-text-center">
            <IntlMessages id="extraPages.404Msg" />
          </h2>

          <p className="gx-text-center">
            <Link className="gx-btn gx-btn-primary" to="/"><IntlMessages id="extraPages.goHome" /></Link>
          </p>
        </div>
      </div> */
  );
};

export default Error404;
