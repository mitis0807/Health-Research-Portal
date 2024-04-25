import React from 'react';
import {
  Col, Row, Tabs, Card,
} from 'antd';
import Widget from '../../../components/Widget';
import { aboutList } from '../ProfileData';
import AboutItem from './AboutItem';

const { TabPane } = Tabs;

class About extends React.Component {
  edit() {

  }

  render() {
    return (
      <Widget
        title="About"
        extra={(
          <span className="gx-m-10" onClick={this.edit}>
            {' '}
            <i className="gx-icon-btn icon icon-edit" />
          </span>
)}
        styleName="gx-card-tabs gx-card-tabs-right gx-card-profile"
      >
        <Row>
          {aboutList.map((about, index) => {
            return (
              <Col key={index} xl={8} lg={12} md={12} sm={12} xs={24}>
                <AboutItem data={about} />
              </Col>
            );
          })}
        </Row>
      </Widget>
      //   <Widget title="About" extra={<span className="gx-m-10"> <i class="gx-icon-btn icon icon-edit"></i></span>} styleName="gx-card-tabs gx-card-tabs-right gx-card-profile">

    //     <Tabs defaultActiveKey="1">
    //       <TabPane tab="Overview" key="1">
    //         <div className="gx-mb-2">
    //           <Row>
    //             {aboutList.map((about, index) =>
    //               <Col key={index} xl={8} lg={12} md={12} sm={12} xs={24}>
    //                 <AboutItem data={about} />
    //               </Col>
    //             )}
    //           </Row>
    //         </div>
    //       </TabPane>
    //       <TabPane tab="Work" key="2">
    //         <div className="gx-mb-2">
    //           <Row>{aboutList.map((about, index) =>
    //             <Col key={index} xl={8} lg={12} md={12} sm={12} xs={24}>
    //               <AboutItem data={about} />
    //             </Col>
    //           )}
    //           </Row>
    //         </div>
    //       </TabPane>
    //       <TabPane tab="Education" key="3">
    //         <div className="gx-mb-2">
    //           <Row>
    //             {aboutList.map((about, index) =>

    //               <Col key={index} xl={8} lg={12} md={12} sm={12} xs={24}>
    //                 <AboutItem data={about} />
    //               </Col>
    //             )}
    //           </Row>
    //         </div>
    //       </TabPane>
    //     </Tabs>
    //   </Widget>
    );
  }
}


export default About;
