/*Component to display all invited internal users*/

import React, { Component } from "react";
import {
  Card,
  Table,
  Button,
  
  Modal,
  Pagination,
  Input,
  Tooltip,
  Icon,
} from "antd";

import { toast } from "react-toastify";
import URL from "../../env/environmentVar";
import BreadcrumbDemo from "../BreadcrumbDemo";
import DataForDescription from "../DataForDescriptionUserManagement";
import AllMessage from "../AllMessages";
import "react-toastify/dist/ReactToastify.css";

const pageNo = 1;
const pageSize = 10;
let that;
const { error } = Modal;

const columns = [
  {
    title: (
      <div style={{ fontSize: 14 }}>
        <b>Name</b>
      </div>
    ),
    dataIndex: "name",
    key: "name",
    ellipsis: true,
  },
  {
    title: (
      <div style={{ fontSize: 14 }}>
        <b>Role</b>
      </div>
    ),
    dataIndex: "role",
    key: "role",
    ellipsis: true,
  },
  {
    title: (
      <div style={{ fontSize: 14 }}>
        <b>Status</b>
      </div>
    ),
    dataIndex: "status",
    key: "status",
    ellipsis: true,
  },
  {
    title: (
      <div style={{ fontSize: 14 }}>
        <b>Action</b>
      </div>
    ),
    dataIndex: "action",
    key: "action",
  },
];
export class UserManagement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      dataLength: "",
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
    that = this;
    this.getAllUserData = this.getAllUserData.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.handleSearchText = this.handleSearchText.bind(this);
  }

  componentDidMount() {
    this.getAllUserData(pageNo, pageSize, "");
  }

  onShowSizeChange(current, pageLimit) {
    const pageNo = current;
    const limit = pageLimit;

    that.getAllUserData(pageNo, limit, "");
  }

  onPageChange(current, pageLimit) {
    const pageNum = current;
    const limit = pageLimit;

    that.getAllUserData(pageNum, limit, "");
  }

  getAllUserData(pageNumber, limit, searchBy) {
    fetch(`${URL.APIURL}/getAllInternalUser`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      credentials: "include",
      body: JSON.stringify({
        pageNo: pageNumber,
        limit,
        search: searchBy,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            data: res.internalUserData,
            dataLength: res.length,
          });
        } else if (res.status === 300) {
          toast.error(res.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
          });
        } else if (res.status === 500) {
          this.setState({});
          this.props.history.push("/serverError");
        } else if (res.status === 400) {
          this.setState({});
          // bad request
          this.props.history.push("/badRequest");
        } else if (res.status === 403) {
          // forbidden request
          this.setState({});
          this.props.history.push("/forbiddenRequest");
        }
      });
  }

  handleSearchText(e) {
    const search = e.target.value;
    this.getAllUserData(pageNo, pageSize, search);
  }

  handleButtonClick() {
    this.props.history.push("/inviteUser");
  }

  // handleTableChange(e) {

  //   const pageNo = e.current;
  //   const limit = e.pageSize;

  //   this.getAllUserData(pageNo, limit);
  //   }
  handleClickOfViewInternalUser(id) {
    this.props.history.push(`/viewUser?id=${id}`);
  }

  renderTableData() {
    const { data } = this.state;

    return data.map((item, index) => {
      let role;
      if (item.role === 2) {
        role = AllMessage.Coordinator;
      } else if (item.role === 3) {
        role = AllMessage.InternalReviewer;
      } else if (item.role === 4) {
        role = AllMessage.ExternalReviewer;
      } else if (item.role === 5) {
        role = AllMessage.ChairPerson;
      } else if (item.role === 7) {
        role = AllMessage.UniversityUser;
      } else if (item.role === 8) {
        role = AllMessage.SeniorStatistician;
      } else if (item.role === 9) {
        role = AllMessage.PermanentSecretary;
      } else if (item.role === 10) {
        role = AllMessage.HeadOfResearch;
      } else {
        role = item.role;
      }
      return {
        key: index,
        name: `${item.firstName} ${item.lastName}`,
        role,
        status:
          item.isVerified === true ? (
            <span>Verified</span>
          ) : (
            <span>Pending</span>
          ),
        action: (
          <a
            // href={`/viewUser?id=${item.id}`}
            onClick={() => this.handleClickOfViewInternalUser(item.id)}
          >
            <Tooltip placement="top" title="View">
              <Icon
                style={{ marginRight: "15px", fontSize: "17px", color: "" }}
                type="eye"
              />
            </Tooltip>
          </a>
        ),
        description: <DataForDescription dataItem={item} />,
      };
    });
  }

  render() {
    document.title = `Course Schedule | ${AllMessage.PageTitle}`;

    return (
      <div>
        <BreadcrumbDemo propertyProps={this.props} />

        <Card
          className="cardcss"
          title={<b>All Users</b>}
          extra={
            <div style={{ display: "inline-flex" }}>
              <Input
                onChange={this.handleSearchText}
                style={{ marginRight: "14px" }}
                type="text"
                placeholder="Search"
              />
              <Button
                className="custom-button"
                onClick={this.handleButtonClick}
                type="primary"
              >
                Invite User
              </Button>
            </div>
          }
        >
          {/* <Pagination
            pagination={false}
            showSizeChanger
            pageSizeOptions={['10', '20', '30']}
            onShowSizeChange={this.onPageChange}

          /> */}

          <Table
            className="gx-table-responsive"
            columns={columns}
            // pagination={{ defaultPageSize: 5, showSizeChanger: true,
            // pageSizeOptions: ['5', '10', '15'] }}
            // onChange={this.handleTableChange}
            pagination={false}
            expandedRowRender={(record) => {
              return <p style={{ margin: 0 }}>{record.description}</p>;
            }}
            dataSource={this.renderTableData()}
          />
          <br />
          <div style={{ float: "right" }}>
            <Pagination
              //  showSizeChanger
              //  pageSizeOptions={['10', '20', '30']}
              //  onShowSizeChange={this.onShowSizeChange}
              total={this.state.dataLength}
              onChange={this.onPageChange}
            />
          </div>
        </Card>
      </div>
    );
  }
}

export default UserManagement;
