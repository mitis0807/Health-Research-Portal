import React, { Component } from "react";
import { connect } from "react-redux";
import { Avatar } from "antd";
import { userSignOut } from "../../appRedux/actions/Auth";
import URL from "../../env/environmentVar";
import { Tooltip } from "antd";

let user;
class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    user = this.props.authUser;
  }

  render() {
    return (
      <div className="gx-flex-row gx-align-items-center gx-ml-4 gx-mt-4 gx-mb-4">
        <Avatar className="gx-size-30 gx-ml-2" icon="user" size="small" />
        
        <div className="gx-m-2 gx-avatar-name wt-color-black wt-font-100 username-profile">
          <Tooltip title={user && user.firstName + " " + user.lastName}>
            {user && (
              <span className="gx-mb-0">
                {user.firstName} {user.lastName}
              </span>
            )}
          </Tooltip>

          {user.role === 1 && <h6 className="gx-mb-0 gx-fs-xs">Admin</h6>}
          {user.role === 2 && <h6 className="gx-mb-0 gx-fs-xs">Chair</h6>}
          {user.role === 3 && (
            <h6 className="gx-mb-0 gx-fs-xs">Dean</h6>
          )}
          {/* {user.role === 4 && (
            <h6 className="gx-mb-0 gx-fs-xs">External Reviewer</h6>
          )}
          {user.role === 5 && <h6 className="gx-mb-0 gx-fs-xs">Chair</h6>}
          {user.role === 6 && (
            <h6 className="gx-mb-0 gx-fs-xs">Investigator</h6>
          )}
          {user.role === 7 && (
            <h6 className="gx-mb-0 gx-fs-xs">University User</h6>
          )}
           {user.role === 8 && (
            <h6 className="gx-mb-0 gx-fs-xs">Senior statistician</h6>
          )}

         
           {user.role === 9 && (
            <h6 className="gx-mb-0 gx-fs-xs">PSHMS</h6>
          )}
          {user.role === 10 && (
            <h6 className="gx-mb-0 gx-fs-xs">HoRIDAMIT</h6>
          )} */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { authUser } = auth;
  return { authUser };
};

export default connect(mapStateToProps)(UserProfile);
