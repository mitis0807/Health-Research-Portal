import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Icon,Modal } from 'antd';
import { Link ,withRouter} from 'react-router-dom';
import { toast } from 'react-toastify';

import URL from '../../env/environmentVar';

import '../../css/custom.css';

import {

  THEME_TYPE_LITE,
} from '../../constants/ThemeSetting';
import IntlMessages from '../../util/IntlMessages';
import { DashboardOutlined } from '@ant-design/icons';
const { error } = Modal;

let that;
class SideBarAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isProfileComplete: false,
      
    };
    that = this;
  }

  componentWillMount() {
    fetch(`${URL.APIURL}/getInternalUserWithAuth`, {
      // mode :'no-cors',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      credentials: 'include',
      body: JSON.stringify({
        internalUserId: this.props.authUser.id,
      }),

    })
      .then((res) => { return res.json(); })
      .then(
        (res) => {
          console.log('side bar admin component did mont', res);
          if (res.status === 200) {
            if (!res.internalUserData.isProfileComplete) {
              res.internalUserData.isProfileComplete = false;
            }
            this.setState({
              data: res.internalUserData,
              isProfileComplete: res.internalUserData.isProfileComplete,
            });
          }
          if (res.status === 300) {
            toast.error(res.message, {
              toastId:"error",
              position: 'top-center',
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              });
          }else if (res.status === 401) {
            error({
              title: `Session expired.${res.message}`,
              content: "",
              onOk() {
                that.props.history.push("/signIn");
              },
            });
          }
        },


      );
  }

  componentWillUnMount() {
  }

  logout() {
    fetch(`${URL.APIURL}/logout`, {
    // mode :'no-cors',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      credentials: 'include',

    })
      .then((res) => { return res.json(); })
      .then(
        (res) => {
          if (res.status === 200) {
           this.props.userSignOut();
           localStorage.removeItem("tabkey");
           this.props.history.push('/signIn');
          }
        },


      );
  }

  render() {
    console.log('authuser in side bar admin', this.props.authUser);
    const { themeType, pathname } = this.props;
    const selectedKeys = pathname.substr(1);
    const defaultOpenKeys = selectedKeys.split('/')[1];
    return (


      <Menu
        style={{ marginLeft: '-5px' }}
        defaultOpenKeys={[defaultOpenKeys]}
        selectedKeys={[selectedKeys]}
        theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
        mode="inline"
      >


        <Menu.Item key="logout">
          <Link onClick={this.logout} to="/signIn">
            <Icon type="logout" style={{ fontSize: '18px' }} />
            <IntlMessages id="Logout" />
          </Link>
        </Menu.Item>
        <div className="dividercss"> </div>
   
            <Menu.Item key="courseScheduleAdmin" style={{ paddingLeft: '28px !important', paddingRight: '20px !important' }}>
              <Link to="/courseScheduleAdmin">
                <i className="icon icon-editor" />
                <IntlMessages id="Course Schedule" />

              </Link>
            </Menu.Item>
           


      </Menu>


    );
  }
}

// SideBarAdmin.propTypes = {};
const mapStateToProps = ({ settings, auth }) => {
  const { themeType, locale, pathname } = settings;
  const { authUser } = auth;
  return {
 themeType, locale, pathname, authUser,
};
};
const MyComponent = connect(mapStateToProps)(SideBarAdmin);
export default withRouter(MyComponent);