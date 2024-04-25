import React, { Component } from "react";
import { Layout, Popover } from "antd";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import CustomScrollbars from "../../util/CustomScrollbars";
import {
  switchLanguage,
  toggleCollapsedSideNav,
} from "../../appRedux/actions/Setting";
import Auxiliary from "../../util/Auxiliary";

import {
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_MINI_SIDEBAR,
  TAB_SIZE,
} from "../../constants/ThemeSetting";

const { Header } = Layout;

class Topbar extends Component {
  state = {
    searchText: "",
  };

  languageMenu = () => {
    return <CustomScrollbars className="gx-popover-lang-scroll" />;
  };

  updateSearchChatUser = (evt) => {
    this.setState({
      searchText: evt.target.value,
    });
  };

  render() {
    const { locale, width, navCollapsed, navStyle } = this.props;
    return (
      <Auxiliary>
        <Header>
          {navStyle === NAV_STYLE_DRAWER ||
          ((navStyle === NAV_STYLE_FIXED ||
            navStyle === NAV_STYLE_MINI_SIDEBAR) &&
            width < TAB_SIZE) ? (
            <div className="gx-linebar gx-mr-3">
              <i
                className="gx-icon-btn icon icon-menu"
                onClick={() => {
                  this.props.toggleCollapsedSideNav(!navCollapsed);
                }}
              />
            </div>
          ) : null}
          {navStyle === NAV_STYLE_DRAWER ||
          ((navStyle === NAV_STYLE_FIXED ||
            navStyle === NAV_STYLE_MINI_SIDEBAR) &&
            width < TAB_SIZE) ? (
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: 15 }}>New Jersey Institute Of Technology</span>
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: 20, marginLeft: "-10px" }}>
              New Jersey Institute Of Technology
              </span>
            </div>
          )}

          <Link to="/" className="gx-d-block gx-d-lg-none gx-pointer" />

          <ul className="gx-header-notifications gx-ml-auto"></ul>
        </Header>
      </Auxiliary>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { locale, navStyle, navCollapsed, width } = settings;
  return {
    locale,
    navStyle,
    navCollapsed,
    width,
  };
};

export default connect(mapStateToProps, {
  toggleCollapsedSideNav,
  switchLanguage,
})(Topbar);
