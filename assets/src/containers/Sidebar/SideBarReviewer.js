import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Icon,Modal } from 'antd';
import { Link,withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import URL from '../../env/environmentVar';
import 'react-toastify/dist/ReactToastify.css';

import '../../css/custom.css';

import {

  THEME_TYPE_LITE,
} from '../../constants/ThemeSetting';
import IntlMessages from '../../util/IntlMessages';
let that;
const { error } = Modal;

class SideBarReviewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isProfileComplete: false,
    };
    that = this;
  }

  componentDidMount() {
   
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
          if (res.status === 200) {
            if (!res.internalUserData.isProfileComplete) {
              res.internalUserData.isProfileComplete = false;
            }
            this.setState({
              data: res.internalUserData,
              isProfileComplete: res.internalUserData.isProfileComplete,
            });
            if (res.internalUserData.isProfileComplete === false) {
              toast.info('Please complete your profile to enable the other menu items.', {
                toastId:"reviewerProfile",
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                });
              }
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
            this.props.history.push('/signIn');
            localStorage.removeItem("tabkey");
          }
        
        },
);
  }

  render() {
    const { themeType, pathname } = this.props;
    const selectedKeys = pathname.substr(1);
    const defaultOpenKeys = selectedKeys.split('/')[1];
    return (

      <div>
        <Menu
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
          {this.state.data.isProfileComplete === false
         ? [
           <Menu.Item key="profile">
             <Link to="/profile">
               <i className="icon icon-auth-screen" />
               <IntlMessages id="Profile" />

             </Link>
           </Menu.Item>,

           <Menu.Item key="reviewProposal" disabled>
             <Link to="/profile">
               <i className="icon icon-copy" />
              <IntlMessages id=" Review Proposal" />
             </Link>
           </Menu.Item>,
            <Menu.Item key="reviewAmendment" disabled>
            <Link to="/profile">
            <Icon type="file" style={{ fontSize: '18px' }} />

                  Review Amendment
            </Link>
          </Menu.Item> ]
 : null}

          {this.state.data.isProfileComplete === true
          ? [<Menu.Item key="profile">
            <Link to="/profile">
              <i className="icon icon-auth-screen" />
              <IntlMessages id="Profile" />

            </Link>
          </Menu.Item>,

            <Menu.Item key="reviewProposal">
              <Link to="/reviewProposal">
                <i className="icon icon-copy" />
              <IntlMessages id="Review Proposal" />
              </Link>
            </Menu.Item>,
            
            <Menu.Item key="reviewAmendment">
            <Link to="/reviewAmendment">
            <Icon type="file" style={{ fontSize: '18px' }} />
            <IntlMessages id="Review Amendment" />
                 
            </Link>
          </Menu.Item> ]
 : null}
         

          {/* <Menu.Item key="searchContent">
          <Link to="/searchContent">
            <i className="icon icon-search-new" />
              Search Content

          </Link>
        </Menu.Item> */}
          
        
        </Menu>
      </div>


    );
  }
}


const mapStateToProps = ({ settings, auth }) => {
  const { themeType, locale, pathname } = settings;
  const { authUser } = auth;

  return {
 themeType, locale, pathname, authUser,
};
};
const MyComponent = connect(mapStateToProps)(SideBarReviewer);
export default withRouter(MyComponent);