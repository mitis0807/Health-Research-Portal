import React, { Component,Suspense } from 'react';
import { Layout, Tooltip } from 'antd';

import { connect } from 'react-redux';
import Sidebar from '../Sidebar/index';
const Topbar = React.lazy(() => {
  return import("../Topbar/index");
});

import { footerTextLeft, footerTextRight } from '../../util/config';
import App from '../../routes/index';
import {
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DARK_HORIZONTAL,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
  NAV_STYLE_MINI_SIDEBAR,
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  TAB_SIZE,
} from '../../constants/ThemeSetting';

const { Content, Footer } = Layout;

export class MainApp extends Component {
  getContainerClass = (navStyle) => {
    switch (navStyle) {
      case NAV_STYLE_DARK_HORIZONTAL:
        return 'gx-container-wrap';
      case NAV_STYLE_DEFAULT_HORIZONTAL:
        return 'gx-container-wrap';
      case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
        return 'gx-container-wrap';
      case NAV_STYLE_BELOW_HEADER:
        return 'gx-container-wrap';
      case NAV_STYLE_ABOVE_HEADER:
        return 'gx-container-wrap';
      default:
        return '';
    }
  };

  getNavStyles = (navStyle) => {
    switch (navStyle) {
     
      case NAV_STYLE_FIXED:
        return  <Suspense> <Topbar /></Suspense>;
      case NAV_STYLE_DRAWER:
        return <Suspense> <Topbar /></Suspense>;
      case NAV_STYLE_MINI_SIDEBAR:
        return <Suspense> <Topbar /></Suspense>;

      default:
        return null;
    }
  };

  getSidebar = (navStyle, width) => {
    if (width < TAB_SIZE) {
      return <Sidebar />;
    }
    switch (navStyle) {
      case NAV_STYLE_FIXED:
        return <Sidebar />;
      case NAV_STYLE_DRAWER:
        return <Sidebar />;
      case NAV_STYLE_MINI_SIDEBAR:
        return <Sidebar />;
      case NAV_STYLE_NO_HEADER_MINI_SIDEBAR:
        return <Sidebar />;
      case NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR:
        return <Sidebar />;
      default:
        return null;
    }
  };

  render() {
    const { match, width, navStyle } = this.props;
    return (
      <div>
        <Layout className="gx-app-layout">
          {this.getSidebar(navStyle, width)}
          <Layout>
            {this.getNavStyles(navStyle)}
            <Content className={`gx-layout-content ${this.getContainerClass(navStyle)} `}>
              <App match={match} />
              <Footer className="footer">
                <div className="gx-layout-footer-content ">
                  {/* {width<=510? <span className="leftFloat"><Tooltip placement="top" title="Copyright Ministry of Health FIJI © 2019"><b>{footerTextLeft}</b></Tooltip></span>: <span style={{float:'left'}}><b>{footerTextLeft}</b></span>} */}
                 
                  {/* {width<=510?<span className="leftRight"> <a style={{color:'black !important'}} href="https://www.wishtreetech.com/"><Tooltip placement="top" title="Developed By Wishtree Technologies"><b>{footerTextRight}</b></Tooltip>
</a></span>:<span style={{float:'right'}}> <a style={{color:'black !important'}} href="https://www.wishtreetech.com/"><b>{footerTextRight}</b></a></span>}  */}
                  <span className="leftFloat">
                    {' '}
                    <a style={{ color: 'black !important' }} target="_blank" href="https://www.wishtreetech.com/">
                      <b>{footerTextRight}</b>
                    </a>

                   
                  </span>
                  <span>
                  <a
                style={{ color: "#545454" }}
                target="_blank"
                href="http://www.health.gov.fj/"
                rel="noreferrer"
              >
                MoHMS Fiji
              </a>


                  </span>
                  <span className="leftRight"><b>{footerTextLeft}</b></span>


                </div>


              </Footer>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { width, navStyle } = settings;
  return { width, navStyle };
};
export default connect(mapStateToProps)(MainApp);
