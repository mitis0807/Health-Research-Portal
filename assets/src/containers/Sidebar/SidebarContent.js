import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import CustomScrollbars from "../../util/CustomScrollbars";
import "../../css/custom.css";
import Auxiliary from "../../util/Auxiliary";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
} from "../../constants/ThemeSetting";
import URL from "../../env/environmentVar";
const SideBarHoRIDAMIT = React.lazy(() => {
  return import("./SideBarHoRIDAMIT");
});
const SideBarPSHMS = React.lazy(() => {
  return import("./SIdeBarPSHMS");
});

const UserProfile = React.lazy(() => {
  return import("./UserProfile");
});
const SidebarLogo = React.lazy(() => {
  return import("./SidebarLogo");
});
const SideBarAdmin = React.lazy(() => {
  return import("./SideBarAdmin");
});
const SideBarDean = React.lazy(() => {
  return import("./SideBarDean");
});
const SideBarCoordinator = React.lazy(() => {
  return import("./SideBarCoordinator");
});
const SideBarReviewer = React.lazy(() => {
  return import("./SideBarReviewer");
});
const SideBarUniversityUser = React.lazy(() => {
  return import("./SideBarUniversityUser");
});
const SideBarChair = React.lazy(() => {
  return import("./SideBarChair");
});
const SideBarSeniorStatistician = React.lazy(() => {
  return import("./SideBarSeniorStatistician");
});

class SidebarContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
    };
    // this.profileStatus = this.profileStatus.bind(this);
  }

  componentDidMount() {
    this.setState(
      {
        user: this.props.authUser,
      },
      () => {}
    );
  }

  logout() {
    fetch(`${URL.APIURL}/logout`, {
      // mode :'no-cors',
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.status == 200) {
        }
      });
  }

  getNoHeaderClass = (navStyle) => {
    if (
      navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR ||
      navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR
    ) {
      return "gx-no-header-notifications";
    }
    return "";
  };

  getNavStyleSubMenuClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      return "gx-no-header-submenu-popup";
    }
    return "";
  };

  render() {
    const { user } = this.state;
    const { themeType, navStyle, pathname, widthProps } = this.props;
    const selectedKeys = pathname.substr(1);
    const defaultOpenKeys = selectedKeys.split("/")[1];
    return (
      <Auxiliary>
        <Suspense fallback={<div>Loading...</div>}>
          <SidebarLogo />
          <div className="gx-sidebar-content">
            <div className={`${this.getNoHeaderClass(navStyle)}`}>
              <UserProfile />
            </div>

            <CustomScrollbars className="gx-layout-sider-scrollbar">
              {this.props.authUser ? (
                [
                

                  this.props.authUser.role === 1 && <SideBarAdmin />,
                
                  this.props.authUser.role === 2 && <SideBarChair />,
                  this.props.authUser.role === 3 && 
                    <SideBarDean />
                  ,
                  this.props.authUser.role === 8 && (
                    <SideBarSeniorStatistician />
                  ),
                  this.props.authUser.role === 9 && <SideBarPSHMS />,
                  this.props.authUser.role === 10 && <SideBarHoRIDAMIT />,
                ]
              ) : (
                <Redirect to="/profile" />
              )}
            </CustomScrollbars>
          </div>
        </Suspense>
      </Auxiliary>
    );
  }
}

const mapStateToProps = ({ settings, auth }) => {
  const { navStyle, themeType, locale, pathname } = settings;
  const { authUser } = auth;
  return {
    navStyle,
    themeType,
    locale,
    pathname,
    authUser,
  };
};
export default connect(mapStateToProps)(SidebarContent);
