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
import "react-toastify/dist/ReactToastify.css"

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
export class CourseScheduleDean extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      dataLength: "",
      visbleApprove:false,
      visibleReject:false,
      disabledApproveButton:false,
      disabledRejectButton:false,
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
    that = this;
    this.getAllUserData = this.getAllUserData.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.handleSearchText = this.handleSearchText.bind(this);
  }
  handleOk = (id) => {
    this.state.disabledApproveButton = false;
    this.setState({
        disabledApproveButton: false,
    });
    // marks complete proposal 
    fetch(`${URL.APIURL}/approveCourseByDean`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      credentials: "include",
      body: JSON.stringify({
        id,
        signedByDean:'approved'
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.status === 200) {
          this.state.disabledApproveButton = false;
          this.setState({
            disabledApproveButton: false,
          });

          this.setState(
            () => {
              const data = this.state.data.map((item, j) => {
                if (item.id === res.courseData.id) {
                  item = res.courseData;
                  return item;
                }

                return item;
              });

              return {
                data,
              };
            },
            () => {}
          );

          this.props.history.push("/courseScheduleDean");
          toast.success(res.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
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
          this.props.history.push("/serverError");
        } else if (res.status === 400) {
          // bad request
          this.props.history.push("/badRequest");
        } else if (res.status === 403) {
          // forbidden request
          this.props.history.push("/forbiddenRequest");
        } else if (res.status === 401) {
          error({
            title: AllMessage.SessionExpired + res.message,
            content: "",
            onOk() {
              that.props.history.push("/signIn");
            },
          });
        }
      });
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visbleApprove: false });
    }, 1000);
  };
  handleForReject = (id) => {
    this.state.disabledRejectButton = false;
    this.setState({
        disabledRejectButton: false,
    });
    // marks complete proposal 
    fetch(`${URL.APIURL}/rejectCourseByDean`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      credentials: "include",
      body: JSON.stringify({
        id,
        signedByDean:'reject',
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.status === 200) {
          this.state.disabledRejectButton = false;
          this.setState({
            disabledRejectButton: false,
          });

          this.setState(
            () => {
              const data = this.state.data.map((item, j) => {
                if (item.id === res.courseData.id) {
                  item = res.courseData;
                  return item;
                }

                return item;
              });

              return {
                data,
              };
            },
            () => {}
          );

          this.props.history.push("/courseScheduleChair");
          toast.success(res.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
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
          this.props.history.push("/serverError");
        } else if (res.status === 400) {
          // bad request
          this.props.history.push("/badRequest");
        } else if (res.status === 403) {
          // forbidden request
          this.props.history.push("/forbiddenRequest");
        } else if (res.status === 401) {
          error({
            title: AllMessage.SessionExpired + res.message,
            content: "",
            onOk() {
              that.props.history.push("/signIn");
            },
          });
        }
      });
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visbleApprove: false });
    }, 1000);
  };
  handleCancel = () => {
    this.setState({ visbleApprove: false });
    this.props.form.resetFields();
  };
  handleCancelReject = () => {
    this.setState({ visbleReject: false });
    this.props.form.resetFields();
  };
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
  handleApproveClick(id,courseId,term) {
    this.setState({
      visbleApprove: true,
      id,
      courseId,
      term
    });
  }

  handleClickOfReject = (id, courseId,term) => {
    this.setState({
      visibleReject: true,
      id,
      courseId,
      term
    });
  };

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
          !item.signedByChair? 'Pending':item.signedByChair==='approved'?'Approved':item.signedByChair==='reject'?'Rejected':item.signedByChair,
          signedByDean: 
          item.signedByDean && item.signedByDean==='approved'? (
            <span>Approved</span>
          ) : item.signedByDean==='reject'?<span>Reject</span>:(
            <span>Pending</span>
          ),
          action: [
            <React.Fragment>
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
          {item.signedByDean==='approved'?
          <Tooltip placement="top" title="Approve">
              
          <Icon
           
            style={{
              marginRight: "15px",
              fontSize: "16px",
              color: "grey",
            }}
            type="check-circle"
            theme="outlined"
          />
       
      </Tooltip>
          :
          <Tooltip placement="top" title="Approve">
              
                  <Icon
                    onClick={() => {
                      return this.handleApproveClick(
                        item.id,item.courseId,item.term
                      );
                    }}
                    style={{
                      marginRight: "15px",
                      fontSize: "16px",
                      color: "green",
                    }}
                    type="check-circle"
                    theme="outlined"
                  />
               
              </Tooltip>}

              {item.signedByDean==='reject'?
          <Tooltip placement="top" title="Reject">
              
          <Icon
           
            style={{
              marginRight: "15px",
              fontSize: "16px",
              color: "grey",
            }}
            type="stop"
            theme="outlined"
          />
       
      </Tooltip>
          :
          <Tooltip placement="top" title="Reject">
              
                  <Icon
                    onClick={() => {
                      return this.handleClickOfReject(
                        item.id,item.courseId,item.term
                      );
                    }}
                    style={{
                      marginRight: "15px",
                      fontSize: "16px",
                      color: "red",
                    }}
                    type="stop"
                    theme="outlined"
                  />
               
              </Tooltip>}

              
                   </React.Fragment>,
          ],
       
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
            <Modal
            visible={this.state.visbleApprove}
            title={<b>Approve Course</b>} 
            onOk={() => {
                return this.handleOk(this.state.id);
              }}
              onCancel={this.handleCancel}
              footer={[
                <Button className="custom-button" key="back" onClick={this.handleCancel}>
                  Cancel
                </Button>,
                <Button
                  key="submit"
                  className="custom-button"
                  type="primary"
                  loading={this.state.loading}
                  disabled={this.state.disabledApproveButton}
                  onClick={() => {
                    return this.handleOk(this.state.id);
                  }}
                >
                  Approve
                </Button>,
              ]}
              >
                  
          {`${"Are you sure you want to approve  " }${this.state.courseId}?`}
          
          </Modal>

          <Modal
            visible={this.state.visibleReject}
            title={<b>Reject Course</b>} 
            onOk={() => {
                return this.handleForReject(this.state.id);
              }}
              onCancel={this.handleCancelReject}
              footer={[
                <Button className="custom-button" key="back" onClick={this.handleCancelReject}>
                  Cancel
                </Button>,
                <Button
                  key="submit"
                  className="custom-button"
                  type="primary"
                  loading={this.state.loading}
                  disabled={this.state.disabledRejectButton}
                  onClick={() => {
                    return this.handleForReject(this.state.id);
                  }}
                >
                  Reject
                </Button>,
              ]}
              >
                  
          {`${"Are you sure you want to reject course with course id :  " }${this.state.courseId}?`}
          
          </Modal>

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

export default CourseScheduleDean;
