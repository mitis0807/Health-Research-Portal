import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Prompt } from 'react-router';
import {
  Button, Card, Cascader, Checkbox, Col, Form, Icon, Input, Row, Select, Tooltip, message, Breadcrumb,Modal,Divider,Typography,Descriptions
} from 'antd';
import { toast } from 'react-toastify';
import URL from '../env/environmentVar';
import BreadcrumbDemo from './BreadcrumbDemo';
import 'react-toastify/dist/ReactToastify.css';
import AllMessage from './AllMessages';
import ReactToPrint from 'react-to-print';
let that;
let role;
const { error } = Modal;
let propsData;
const FormItem = Form.Item;
const { Option } = Select;
// import SweetAlert from "react-bootstrap-sweetalert";
class ViewAllCourseDeatils extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],

    };
    that = this;
    propsData = this.props;
  }


  onChange = (checkedValues) => {

  }


  handleSelectChange = (value) => {

    // this.props.form.setfieldsvalue({
    //   note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
    // });
  }

  componentWillMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    fetch(`${URL.APIURL}/getCourseDetails`, {
      // mode :'no-cors',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      credentials: 'include',
      body: JSON.stringify({
        indCourseId: id,
      }),

    })
      .then((res) => { return res.json(); })
      .then(
        (res) => {
          if (res.status === 200) {
              console.log('dataaaaaaa',res)
            this.setState({
             data: res.coursePerData,

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
        },


      );
  }


  render() {
    // eslint-disable-next-line react/destructuring-assignment

    const { data } = this.state;
    const { getFieldDecorator } = this.props.form;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  document.title = `Course Deatils | ${AllMessage.PageTitle}`;

    return (
      <div>

        {/* <BreadcrumbDemo propertyProps={this.props} /> */}
        <Card className="cardcss" style={{ fontSize: '16px' }} title={<b>Course Details</b>} extra={<Button type="primary" href="/courseScheduleAdmin">Back</Button>}>
        <Row>
      <Col span={12}><img id="njit" style={{height:'40%',width:'40%'}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/New_Jersey_IT_logo.svg/1280px-New_Jersey_IT_logo.svg.png"></img></Col>
      <Col span={2}/>
      <Col span={10}>
      <Card style={{width:400}}>
              <Typography id="modal-modal-title" variant="h6" component="h5">
                <u style={{fontWeight:'bold'}}>Office of the Registrar</u>
              </Typography>
    <Typography id="modal-modal-title" variant="h6" component="h5">
      <p style={{fontWeight:'bold'}}>Course Schedule Update Form</p>
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
     Please scan the complete form and upload it with your Course Change/Addition Request
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
     Questions?
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
     Email <a href="">Ronchi@njit.edu</a> or <a href="">Rattray@njit.edu</a>
    </Typography>
  </Card>
</Col>
</Row>
<Divider  />
          <Form>
         
            <FormItem
              className="formItemCss"

              label={<b>Course Id</b>}
              {...formItemLayout}
            >
              <span>{data.courseId}</span>
            </FormItem>

            <FormItem
              className="formItemCss"
              label={<b>Term</b>}
              {...formItemLayout}
            >
              <span className="ant-form-text">{data.term}</span>
            </FormItem>

            <FormItem
              className="formItemCss"
              label={<b>Requestor Name</b>}
              {...formItemLayout}
            >
              <span className="ant-form-text">{data.requestorName}</span>
            </FormItem>

            <FormItem
              className="formItemCss"
              label={<b>Date</b>}
              {...formItemLayout}
            >
              <span className="ant-form-text">{data.date}</span>
            </FormItem>
            <Divider  />
            <br></br>

 <Descriptions title={<h4><b><u>Current Course Information :</u></b></h4>}size="middle">
    <Descriptions.Item label={<b>Meeting Days</b>}>{data.currentCourseMeetingDays}</Descriptions.Item>
    <Descriptions.Item label={<b>Start/End Time</b>}>{data.currentCourseStartEndTime}</Descriptions.Item>
    <Descriptions.Item label={<b>Buildin Room</b>}>{data.currentCourseBuildingRoom}</Descriptions.Item>
    <Descriptions.Item label={<b>CAP</b>}>{data.currentCourseCap}</Descriptions.Item>
    <Descriptions.Item label={<b>Professor</b>}>{data.currentCourseProfessor}</Descriptions.Item>
    <Descriptions.Item label={<b>Professor Id</b>}>
    {data.currentCourseProfessorId}
    </Descriptions.Item>
  </Descriptions>
            <Divider  />

            <br></br>
     
            <Descriptions title={<h4><b><u>New/Changed Course Information :</u></b></h4>}size="middle">
                <Descriptions.Item label={<b>Meeting Days</b>}>{data.changedCourseMeetingDays}</Descriptions.Item>
                <Descriptions.Item label={<b>Start/End Time</b>}>{data.changedCourseStartEndTime}</Descriptions.Item>
                <Descriptions.Item label={<b>Buildin Room</b>}>{data.changedCourseBuildingRoom}</Descriptions.Item>
                <Descriptions.Item label={<b>CAP</b>}>{data.changedCourseCap}</Descriptions.Item>
                <Descriptions.Item label={<b>Professor</b>}>{data.changedCourseProfessor}</Descriptions.Item>
                <Descriptions.Item label={<b>Professor Id</b>}>
                {data.changedCourseProfessorId}
                </Descriptions.Item>
            </Descriptions>
            <Divider  />
      <br></br>
            <FormItem
              className="formItemCss"
              label={<b>Note for Web Schedule</b>}
              {...formItemLayout}
            >
              <span className="ant-form-text">{data.noteWebSchedule}</span>
            </FormItem>
            <FormItem
              className="formItemCss"
              label={<b>Delivery Attribute(FTF, ONL, HYB, FLXm CL)</b>}
              {...formItemLayout}
            >
              <span className="ant-form-text">{data.deliveryAttribute}</span>
            </FormItem>
            <FormItem
              className="formItemCss"
              label={<b>Reason For Change</b>}
              {...formItemLayout}
            >
              <span className="ant-form-text">{data.reasonForChange}</span>
            </FormItem>
      
            <Divider  />
            <br></br>
            <Descriptions style={{textAlign:'center'}}layout="vertical" size="middle">
                <Descriptions.Item label={<b><u>Signed By Chair</u></b>}>{data.signedByChair==="approved"?<p>James Geller</p>:'Pending'}</Descriptions.Item>
                <Descriptions.Item label={<b><u>Signed By Dean</u></b>}>{data.signedByDean==="approved"?<p>Mili Ali</p>:'Pending'}</Descriptions.Item>
               
            </Descriptions>
          </Form>
          </Card>
      </div>
    );
  }
}

const WrappedApp = Form.create()(ViewAllCourseDeatils);

ViewAllCourseDeatils.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  form: PropTypes.object.isRequired,
};

export default (WrappedApp);
