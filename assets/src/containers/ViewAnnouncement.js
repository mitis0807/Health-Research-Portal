import React from 'react';
import PropTypes from 'prop-types';
import {
 Card, Col, Form, Row, Select, PageHeader, Button,Breadcrumb
} from 'antd';
import { toast } from 'react-toastify';
import URL from '../env/environmentVar';
import 'react-toastify/dist/ReactToastify.css';
import AllMessage from '../MyComponents/AllMessages';
import moment from "moment";
import MainHome from "./Home";
import Footer from "./FooterGlobalPage";


let role;

const FormItem = Form.Item;
const { Option } = Select;
class Tab1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
    this.handleBackButton = this.handleBackButton.bind(this)
  }

  componentWillMount() {
    window.scrollTo(0, 0);
    console.log('in compoenet will mount');
    console.log(this.props.location.state);

    const announcementId = this.props.location.state.id;
    fetch(`${URL.APIURL}/announcementsById/${announcementId}`, {
      // mode :'no-cors',
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log('in res 200 for announcementsById');
        console.log(res);
        if (res.status === 200) {
          this.setState({
            data: res.announcementData,
          });
        }
        if (res.status === 300) {
          toast.error(res.message, {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
          });
        } else if (res.status === 500) {
          this.props.history.push('/serverError');
        } else if (res.status === 400) {
          // bad request
          this.props.history.push('/badRequest');
        } else if (res.status === 403) {
          // forbidden request
          this.props.history.push('/forbiddenRequest');
        }
      });
  }
  handleBackButton(){
this.props.history.push('/announcement')
  }

  handleBreadCrumbHomeClick(){
    localStorage.setItem('tabkey',1)
    this.props.history.push('/home');
  }
  handleBreadCrumbDatRequestClick(){
    localStorage.setItem('tabkey',2)
    this.props.history.push('/announcement');
  }
  render() {
    // eslint-disable-next-line react/destructuring-assignment

  
    document.title = `View Announcement | ${AllMessage.PageTitle}`;
console.log('data in render');
console.log(this.state.data && this.state.data.title)
    return (
      <div>
      <MainHome />
      <div
       style={{
        marginLeft: "55px",
        marginRight: "auto",
        marginTop: "140px",
        //  zIndex:0,
        minHeight:'74vh',
        //  position:'absolute',
        height: '100%',
        overflow:'hidden'
      }}
      >
          <Breadcrumb  className="site-page-header"style={{ margin: '16px 0',marginLeft:'25px',paddingTop:'20px' }}>
        <Breadcrumb.Item  onClick={this.handleBreadCrumbHomeClick.bind(this)} className="gx-link">Home</Breadcrumb.Item>
        <Breadcrumb.Item  className="gx-link" onClick={this.handleBreadCrumbDatRequestClick.bind(this)}>Announcements
</Breadcrumb.Item>
        <Breadcrumb.Item>View Announcement</Breadcrumb.Item>
      </Breadcrumb>
        <PageHeader
          className="site-page-header"
          title={<h1>View Announcement</h1>}
        
          style={{paddingTop:'0px'}}
        />
        {/* <BreadcrumbDemo propertyProps={this.props} /> */}
        
        <Card
          className="cardcss"
          // style={{ fontSize: '16px' }}
          style={{marginTop:'-10px'}}
          title={this.state.data &&  moment(this.state.data.createdAt).format("DD-MM-YYYY")}
          extra={  
          <Button
          onClick={this.handleBackButton}
          type="primary"
          // className="gx-mb-0"
          htmlType="submit"
          style={{
            float: 'right',
            // marginTop: '23px',
            // marginRight: '-35px',
          }}
        >
          Back
        </Button>}
          >
   
          <Row style={{ fontSize: '14px' }}>
            <Col span={4}>
              <b>Title : </b>
            </Col>
            <Col style={{ textAlign: 'justify', wordBreak:'break-all' }} span={20}>
            {this.state.data && this.state.data.title}
            </Col>
          </Row>
          <br />
          <Row style={{ fontSize: '14px' }}>
            <Col span={4}>
              <b>Content : </b>
            </Col>
            <Col span={20} style={{ textAlign: 'justify', wordBreak:'break-all' }}>
            {this.state.data && this.state.data.content}
            </Col>
          </Row>
        </Card>
      </div>
      <Footer />
    </div>
    );
  }
}

const WrappedApp = Form.create()(Tab1);

Tab1.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  form: PropTypes.object.isRequired,
};

export default WrappedApp;
