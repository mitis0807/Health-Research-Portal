import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Icon,Modal } from 'antd';
import {
 Link,withRouter
} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import URL from '../../env/environmentVar';

import '../../css/custom.css';


import {

  THEME_TYPE_LITE,
} from '../../constants/ThemeSetting';
import IntlMessages from '../../util/IntlMessages';
let that;
const { error } = Modal;

let user;
class SideBarDean extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // isProfileComplete: false,
      data: '',
      isProfileComplete: false,
    };
     user = this.props.authUser;
     that = this;
  }

  componentDidMount() {
//     fetch(`${URL.APIURL}/getInvestigatorWithAuth`, {
//       // mode :'no-cors',
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         'Access-Control-Allow-Origin': '*',
//       },
//       credentials: 'include',
//       body: JSON.stringify({
//         investigatorId: this.props.authUser.id,
//       }),

//     })
//       .then((res) => { return res.json(); })
//       .then(
//         (res) => {
//           console.log(res)
//           if (res.status === 200) {
//             if (!res.investigatorData.isProfileComplete) {
//               res.investigatorData.isProfileComplete = false;
//             }
//             this.setState({
//               data: res.investigatorData,
//               isProfileComplete: res.investigatorData.isProfileComplete,
//             });
//             if (res.investigatorData.isProfileComplete === false) {
//               toast.info('Please complete your profile to enable the other menu items', {
//                 toastId:"investigatorProfile",
//                 position: 'top-center',
//                 autoClose: 5000,
//                 hideProgressBar: true,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: false,
                
//                 });
// }
//           }
//           if (res.status === 300) {
//               toast.error(res.message, {
//                 toastId:"error",
//                 position: 'top-center',
//                 autoClose: 5000,
//                 hideProgressBar: true,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: false,
//                 });

//            // }
//           } else if (res.status === 401) {
//             error({
//               title: `Session expired.${res.message}`,
//               content: "",
//               onOk() {
//                 that.props.history.push("/signIn");
//               },
//             });
//           }
//         },


//       );
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
    // const { sidebarinvestigator } = this.props;
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

      
     
          <Menu.Item key="courseScheduleDean">
              <Link to="/courseScheduleDean">
                <i className="icon icon-auth-screen" />
                <IntlMessages id="Course Schedule" />
              </Link>
            </Menu.Item>


          

            {/* <Menu.Item key="manageProposal">
              <Link to="/manageProposal">
                <i className="icon icon-feedback" />
                <IntlMessages id="Manage Proposal" />

              </Link>
            </Menu.Item>

            <Menu.Item key="manageResearch">
              <Link to="/manageResearch">
                <i className="icon icon-files" />
                <IntlMessages id="Manage Research" />

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
const MyComponent = connect(mapStateToProps)(SideBarDean);
export default withRouter(MyComponent);
