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
        <b>Course Id</b>
      </div>
    ),
    dataIndex: "courseId",
    key: "courseId",
    ellipsis: true,
  },
  {
    title: (
      <div style={{ fontSize: 14 }}>
        <b>Term</b>
      </div>
    ),
    dataIndex: "term",
    key: "term",
    ellipsis: true,
  },
  {
    title: (
      <div style={{ fontSize: 14 }}>
        <b>Chair Status</b>
      </div>
    ),
    dataIndex: "signedByChair",
    key: "signedByChair",
    ellipsis: true,
  },
  {
    title: (
      <div style={{ fontSize: 14 }}>
        <b>Dean Status</b>
      </div>
    ),
    dataIndex: "signedByDean",
    key: "signedByDean",
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
    fetch(`${URL.APIURL}/getAllCourseData`, {
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
        console.log('respinse in 20--------------0-------first.......---------',res)
        return res.json();
      })
      .then((res) => {
        if (res.status === 200) {
            console.log('respinse in 20--------------0----------------',res)
          this.setState({
            data: res.CourseData,
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
    this.props.history.push("/courseScheduleForm");
  }

  handleTableChange(e) {

    const pageNo = e.current;
    const limit = e.pageSize;

    this.getAllUserData(pageNo, limit);
    }
    handleClickOfViewCourseDetails(id) {
    this.props.history.push(`/viewAllCourseDeatils?id=${id}`);
  }

  renderTableData() {
    const { data } = this.state;
    console.log('data in render table',data)
    return data && data.map((item, index) => {
     console.log('item in render',item)
      return {
        key: index,
        courseId: item.courseId,
        term:item.term,
        signedByChair: 
        item.signedByChair && item.signedByChair==='approved'? (
          <span>Approved</span>
        ) : item.signedByChair==='reject'?<span>Reject</span>:(
          <span>Pending</span>
        ),
        signedByDean: 
        item.signedByDean && item.signedByDean==='approved'? (
          <span>Approved</span>
        ) : item.signedByDean==='reject'?<span>Reject</span>:(
          <span>Pending</span>
        ),
        action: (
          <a
            // href={`/viewUser?id=${item.id}`}
            onClick={() => this.handleClickOfViewCourseDetails(item.id)}
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
          title={<b>Course Schedule Update</b>}
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
                 Schedule Form
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
