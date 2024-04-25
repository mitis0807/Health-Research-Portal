import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Icon ,Modal} from 'antd';
import { Link ,withRouter} from 'react-router-dom';
import { Slide, toast } from 'react-toastify';

import URL from '../../env/environmentVar';

import '../../css/custom.css';

import {

  THEME_TYPE_LITE,
} from '../../constants/ThemeSetting';
import IntlMessages from '../../util/IntlMessages';
import 'react-toastify/dist/ReactToastify.css';
let that;
let user;
const { error } = Modal;

class SideBarCoordinator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '',
      isProfileComplete: false,
    };
     user = this.props.authUser;
     that = this;
  }


  componentDidMount() {
    console.log('in side bar of coordinator user')
    console.log(this.props.authUser.id)
    console.log(this.props.authUser);
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
          console.log('res', res);
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
                toastId:"profile",
                position: 'top-center',

                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                transition:Slide
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
              transition:Slide
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
            console.log('logout')
            this.props.userSignOut();
            localStorage.removeItem("tabkey");
          this.props.history.push('/signIn');
          }
        },
);
  }


  render() {
    const { themeType, pathname } = this.props;
    const selectedKeys = pathname.substr(1);
    const defaultOpenKeys = selectedKeys.split('/')[1];

  
    return (
      <div style={{height:'673px',overflow:'auto'}}>
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
         ? [<Menu.Item key="profile">
           <Link to="/profile">
             <i className="icon icon-auth-screen" />
             <IntlMessages id="Profile" />
           </Link>
            </Menu.Item>,
             <Menu.Item key="dashboard" disabled >
             <Link to="/dashboard" >
               <Icon type="dashboard" style={{ fontSize: '18px' }}/>
               <IntlMessages id="Dashboard" />
             </Link>
             </Menu.Item>,

           <Menu.Item key="userManagement" disabled>
             <Link to="/profile">
               <Icon type="user" style={{ fontSize: '18px' }} />
               <IntlMessages id="User Management" />

             </Link>
           </Menu.Item>,

           <Menu.Item key="manageProposal" disabled>
             <Link to="/profile">
               <i className="icon icon-feedback" />
               <IntlMessages id="Manage Proposal" />
             </Link>
           </Menu.Item>,

           <Menu.Item key="manageResearch" disabled>
             <Link to="/profile">
               <i className="icon icon-files" />
               <IntlMessages id="Manage Research" />

             </Link>
           </Menu.Item>,
            <Menu.Item key="manageAmendment" disabled>
            <Link to="/manageAmendment">
              {/* <Icon type="file" style={{ fontSize: '18px' }} /> */}
              <i className="icon icon-files" />

              <IntlMessages id="Manage Amendment" />
            </Link>
            </Menu.Item>,

            <Menu.Item key="manageAnnouncement" disabled>
            <Link to="/profile">
            <i className="icon icon-megaphone" />

              <IntlMessages id="Manage Research" />

            </Link>
            </Menu.Item>,


          //  <Menu.Item key="searchContent" disabled>
          //    <Link to="/profile">
          //      <i className="icon icon-search-new" />

          //      <IntlMessages id="Search Content" />
          //    </Link>
          //  </Menu.Item>,

           <Menu.Item key="manageCommittee" disabled>
             <Link to="/profile">
               <Icon type="team" style={{ fontSize: '18px' }} />
               <IntlMessages id="Manage Committee" />
             </Link>
           </Menu.Item>,
            <Menu.Item key="manageReports" disabled>
            <Link to="/profile">
              <Icon type="file-text" style={{ fontSize: '18px' }} />
              <IntlMessages id="Manage Reports" />
            </Link>
          </Menu.Item>,

         
          
 ]
 : null}

          {this.state.data.isProfileComplete === true
          ? [<Menu.Item key="profile">
            <Link to="/profile">
              <i className="icon icon-auth-screen" />
              <IntlMessages id="Profile" />
            </Link>
             </Menu.Item>,
          <Menu.Item key="dashboard" >
          <Link to="/dashboard" >
            <Icon type="dashboard" style={{ fontSize: '18px' }}/>
            <IntlMessages id="Dashboard" />
          </Link>
          </Menu.Item>,

            <Menu.Item key="userManagement">
              <Link to="/userManagement">
                <Icon type="user" style={{ fontSize: '18px' }} />
                <IntlMessages id="User Management" />

              </Link>
            </Menu.Item>,

            <Menu.Item key="manageProposal">
              <Link to="/manageProposal">
                <i className="icon icon-feedback" />
                <IntlMessages id="Manage Proposal" />
              </Link>
            </Menu.Item>,

            <Menu.Item key="manageResearch">
              <Link to="/manageResearch">
                <i className="icon icon-files" />
                <IntlMessages id="Manage Research" />

              </Link>
            </Menu.Item>,
             <Menu.Item key="manageAmendment" >
             <Link to="/manageAmendment">
               <Icon type="file" style={{ fontSize: '18px' }} />
             
              
               <IntlMessages id="Manage Amendment" />
             </Link>
             </Menu.Item>,

            <Menu.Item key="manageAnnouncement">
            <Link to="/manageAnnouncement">
              <i className="icon icon-megaphone" />
              <IntlMessages id="Manage Announcement" />

            </Link>
            </Menu.Item>,


            <Menu.Item key="manageCommittee">
              <Link to="/manageCommittee">
                <Icon type="team" style={{ fontSize: '18px' }} />
                <IntlMessages id="Manage Committee" />
              </Link>
            </Menu.Item>,
            
             <Menu.Item key="manageReports">
             <Link to="/manageReports">
               <Icon type="file-text" style={{ fontSize: '18px' }} />
               <IntlMessages id="Manage Reports" />
             </Link>
             </Menu.Item>,

           
]
: null}

          {/* <Menu.Item key="dashboard">
          <Link to="/dashboard">
            <i className="icon icon-apps" />
            <IntlMessages id="Dashboard" />

          </Link>
        </Menu.Item> */}
          {/* <Menu.Item key="announcement">
          <Link to="/announcement">
            <i className="icon icon-megaphone" />
            <IntlMessages id="Announcement" />

          </Link>
        </Menu.Item>

        <Menu.Item key="managePolicy">
          <Link to="/managePolicy">
            <i className="icon icon-select" />
            <IntlMessages id="Manage Policy" />
          </Link>
        </Menu.Item>

        // <Menu.Item key="searchContent">
        //   <Link to="/searchContent">
        //     <i className="icon icon-search-new" />

        //     <IntlMessages id="Search Content" />
        //   </Link>
        // </Menu.Item> */}


        </Menu>
      </div>


    );
  }
}

SideBarCoordinator.propTypes = {};
const mapStateToProps = ({ settings, auth }) => {
  const { themeType, locale, pathname } = settings;
  const { authUser } = auth;

  return {
 themeType, locale, pathname, authUser,
};
};
const MyComponent = connect(mapStateToProps)(SideBarCoordinator);
export default withRouter(MyComponent);
