import React, { Component } from 'react';
import {
  Button, Card, Form, Input, Select,Typography,Row,Col,
   Modal,DatePicker
} from 'antd';
import { connect } from 'react-redux';

import { toast } from 'react-toastify';
import URL from '../env/environmentVar';
import BreadcrumbDemo from './BreadcrumbDemo';
import 'react-toastify/dist/ReactToastify.css';
import Message from '../../../config/ValidationMessages';
import moment from 'moment';

import AllMessages from './AllMessages';

let that;
const { error } = Modal;
let user;
const FormItem = Form.Item;
const dateFormat = 'MM/DD/YYYY';
const today = moment();
//var today = new Date();
class CourseScheduleForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courseId: '',
      term: '',
      requestorName:'Daniel K Pavlick',
      date:moment(today, dateFormat),
      currentCourseMeetingDays:'',
      currentCourseStartEndTime:'',
      currentCourseBuildingRoom:'',
      currentCourseCap:'',
      currentCourseProfessor:'',
      currentCourseProfessorId:'',
      changedCourseMeetingDays:'',
      changedCourseStartEndTime:'',
      changedCourseBuildingRoom:'',
      changedCourseCap:'',
      changedCourseProfessor:'',
      changedCourseProfessorId:'',
      noteWebSchedule:'',
      deliveryAttribute:'',
      reasonForChange:'',
      disabledButton: false,
      serverSideValidationError: [],
      roleId:''

    };
    this.handleSubmit = this.handleSubmit.bind(this);
    that = this;
     user = this.props.authUser;
  }


  componentWillMount() {
    // fetch(`${URL.APIURL}/checkCoordinatorChairPresent`, {
    //   // method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': '*',
    //   },
    //   credentials: 'include',
    // })
    //   .then((res) => { return res.json(); })
    //   .then(
    //     (res) => {
    //       if (res.status === 200) {
    //         this.setState({
    //           isCoordinatorPresent: res.isCoordinatorPresent,
    //           isChairPresent: res.isChairPresent,
    //           isSeniorStatisticianPresent:res.isSeniorStatisticianPresent,
    //           isPSHMSPresent:res.isPSHMSPresent,
    //           isHeadPresent:res.isHeadPresent,
    //           email: '',
    //           firstName: '',
    //           lastName: '',
    //         });
    //       } else if (res.status === 300) {
    //         toast.error(res.message, {
    //           toastId:"inviteerror",
    //           position: 'top-center',
    //           autoClose: 5000,
    //           hideProgressBar: true,
    //           closeOnClick: true,
    //           pauseOnHover: true,
    //           draggable: false,
    //           });
    //           } else if (res.status === 500) {
    //           this.props.history.push('/serverError');
    //           } else if (res.status === 400) {
    //           // bad request
    //           this.props.history.push('/badRequest');
    //           } else if (res.status === 403) {
    //           // forbidden request
    //           this.props.history.push('/forbiddenRequest');
    //           }
    //     },

    //   );
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('valuessssss',values)
      if (!err) {
        this.setState({
          disabledButton: true,
    });
      // values.email = values.email.toLowerCase();

      //  const roleValue = parseInt(values.role, 10);
      const role = this.state.roleId
     
        console.log('inside else.....................')

        fetch(`${URL.APIURL}/saveCourseScheduleForm`, {
          // mode :'no-cors',
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          credentials: 'include',
          body: JSON.stringify({
            courseId: values.courseId,
            term: values.term,
            requestorName:this.state.requestorName,
            date:this.state.date,
            currentCourseMeetingDays:values.currentCourseMeetingDays,
            currentCourseStartEndTime:values.currentCourseStartEndTime,
            currentCourseBuildingRoom:values.currentCourseBuildingRoom,
            currentCourseCap:values.currentCourseCap,
            currentCourseProfessor:values.currentCourseProfessor,
            currentCourseProfessorId:values.currentCourseProfessorId,
            changedCourseMeetingDays:values.changedCourseBuildingRoom,
            changedCourseStartEndTime:values.changedCourseStartEndTime,
            changedCourseBuildingRoom:values.changedCourseBuildingRoom,
            changedCourseCap:values.changedCourseCap,
            changedCourseProfessor:values.changedCourseProfessor,
            changedCourseProfessorId:values.changedCourseProfessorId,
            noteWebSchedule:values.noteWebSchedule,
            deliveryAttribute:values.deliveryAttribute,
            reasonForChange:values.reasonForChange,
          }),
        })
          .then((res) => { return res.json(); })
          .then(
            (res) => {
              console.log('res', res);
              if (res.status === 200) {
                this.setState({
                  disabledButton: false,
                  serverSideValidationError: [],

                });
                toast.success(res.message, {
                  position: 'top-center',
                  autoClose: 5000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: false,
                  });

                this.props.form.resetFields();
              } else if (res.status === 300) {
                this.setState({
                  disabledButton: false,
                  serverSideValidationError: [],
                });
                toast.error(res.message, {
                  toastId:"inviteerror",
                  position: 'top-center',
                  autoClose: 5000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: false,
                  });
            } else if (res.status === 401) {
              this.setState({
                disabledButton: false,
                serverSideValidationError: [],
              });
              error({
                title: AllMessages.SessionExpired + res.message,
                content: '',
                onOk() {
                  that.props.history.push('/signIn');
                },
              });
            } else if (res.status === 500) {
              this.setState({
                disabledButton: false,
              });
            this.props.history.push('/serverError');
          } else if (res.status === 400) {
            this.setState({
              disabledButton: false,
            });
            // bad request
            this.props.history.push('/badRequest');
          } else if (res.status === 403) {
            // forbidden request
            this.setState({
              disabledButton: false,
            });
            this.props.history.push('/forbiddenRequest');
          } else if (res.status === 422) {
            this.setState({
              disabledButton: false,
              serverSideValidationError: res.message,

            });
          }
            },
          )}
      })
  
  }

  // handleSelectChange = (value) => {
  //   console.log('role id &&&&&&&&&&&&&&&&&&&&&&&&&',value)
  //   this.setState({
  //     roleId:value,
  //   });
  // }

  handelBreadcrumbClick() {
    this.props.history.push('/courseScheduleAdmin');
  }

  render() {
    document.title = `Course Schedule Form | ${AllMessages.PageTitle}`;

    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        
      span: 4 ,
      },
      wrapperCol: {
       
      span: 18 ,
      },
    };
    const formItemLayout1 = {
      labelCol: {
        
      span: 5 ,
      },
      wrapperCol: {
       
      span: 18 ,
      },
    };
    const formItemLayout2 = {
      labelCol: {
        
      span: 5,
      },
      wrapperCol: {
       
      span: 19 ,
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 20,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    return (
      <div>
        <BreadcrumbDemo propertyProps={this.props} />

        <Card className="cardcss" title={<b>Course Schedule Form</b>} extra={<Button className="custom-button" type="primary" href="/courseScheduleAdmin">Back</Button>}>
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


          <Form  layout="vertical"  onSubmit={this.handleSubmit}>
            <Row>
              <Col span={20}>
              <FormItem
              {...formItemLayout}
              name="Course ID, Section & CRN"
              required
              label="Course ID "
        //rules={[{ required: true, message: 'Please input Course ID, Section & CRN' }]}
            >
            {getFieldDecorator('courseId', {

                rules: [
                    { required: true, message:  Message.ValidationMessages.courseId },
                    
                ],
                })( 
                  <Input  placeholder="Course ID, Section & CRN" name="courseId" onChange={this.handleChange} setFieldsValue={this.state.courseId} id="courseId" />
           )} 
              
            </FormItem>


              </Col>
             
            </Row>

            <Row>
      
              <Col span={20}>
              <FormItem
              {...formItemLayout}
              label="Term"
            >
              {getFieldDecorator('term', {

                rules: [
                    { required: true, message:  Message.ValidationMessages.term },
                   
                ],
                })(
                  <Input name="term" onChange={this.handleChange} setFieldsValue={this.state.term} id="term" placeholder="Please input term" />
            )} 
            </FormItem>
              </Col>
            </Row>

            <Row>
              <Col span={20}>
              <FormItem
              {...formItemLayout}
              name="Requestor Name"
              required
              label="Requestor Name"
        //rules={[{ required: true, message: 'Please input Course ID, Section & CRN' }]}
            >
          
                  <Input  disabled  name="requestorName" defaultValue ={this.state.requestorName}onChange={this.handleChange} setFieldsValue={this.state.requestorName} id="requestorName" />
           
              
            </FormItem>


              </Col>
     
            </Row>

    <Row>
              <Col span={20}>
              <FormItem
              {...formItemLayout}
              name="Date"
              required
              label="Date"
        //rules={[{ required: true, message: 'Please input Course ID, Section & CRN' }]}
            >
             
                  <DatePicker disabled style={{width:'100%'}}defaultValue={this.state.date} format={dateFormat} setFieldsValue={this.state.date}/>
                  
          
            </FormItem>


              </Col>
             
            </Row>
            <br></br>
           <Row>
             <Col span={12}>
             <h4><b><u>Current Course Information :</u></b></h4>
             </Col>
           </Row>
           <br></br>
           <Row>
              <Col span={12}>
              <FormItem
              {...formItemLayout1}
              name="Meeting Days"
              required
              label="Meeting Days"
        //rules={[{ required: true, message: 'Please input Course ID, Section & CRN' }]}
            >
            {getFieldDecorator('currentCourseMeetingDays', {

                rules: [
                    { required: true, message:  Message.ValidationMessages.currentCourseMeetingDays },
                    
                ],
                })( 
                 
                   <Input  placeholder="Meeting Days" name="currentCourseMeetingDays" onChange={this.handleChange} setFieldsValue={this.state.currentCourseMeetingDays} id="currentCourseMeetingDays" />
           )} 
              
            </FormItem>


              </Col>
              <Col span={12}>
              <FormItem
              {...formItemLayout1}
              name="Start/End Time"
              required
              label="Start/End Time"
        //rules={[{ required: true, message: 'Please input Course ID, Section & CRN' }]}
            >
            {getFieldDecorator('currentCourseStartEndTime', {

                rules: [
                    { required: true, message:  Message.ValidationMessages.currentCourseStartEndTime },
                    
                ],
                })( 
                 
                   <Input  placeholder="Start/End Time" name="currentCourseStartEndTime" onChange={this.handleChange} setFieldsValue={this.state.currentCourseStartEndTime} id="currentCourseStartEndTime" />
           )} 
              
            </FormItem>


              </Col>
            </Row>

           
            <Row>
              <Col span={12}>
              <FormItem
              {...formItemLayout1}
              name="Building Room"
              required
              label="Building Room"
        //rules={[{ required: true, message: 'Please input Course ID, Section & CRN' }]}
            >
            {getFieldDecorator('currentCourseBuildingRoom', {

                rules: [
                    { required: true, message:  Message.ValidationMessages.currentCourseBuildingRoom },
                    
                ],
                })( 
                 
                   <Input  placeholder="Building Room" name="currentCourseBuildingRoom" onChange={this.handleChange} setFieldsValue={this.state.currentCourseBuildingRoom} id="currentCourseBuildingRoom" />
           )} 
              
            </FormItem>


              </Col>
              <Col span={12}>
              <FormItem
              {...formItemLayout1}
              name="CAP"
              required
              label="CAP"
        //rules={[{ required: true, message: 'Please input Course ID, Section & CRN' }]}
            >
            {getFieldDecorator('currentCourseCap', {

                rules: [
                    { required: true, message:  Message.ValidationMessages.currentCourseCap },
                    
                ],
                })( 
                 
                   <Input  placeholder="CAP" name="currentCourseCap" onChange={this.handleChange} setFieldsValue={this.state.currentCourseCap} id="currentCourseCap" />
           )} 
              
            </FormItem>


              </Col>
            </Row>


            <Row>
              <Col span={12}>
              <FormItem
              {...formItemLayout1}
              name="Professor"
              required
              label="Professor"
        //rules={[{ required: true, message: 'Please input Course ID, Section & CRN' }]}
            >
            {getFieldDecorator('currentCourseProfessor', {

                rules: [
                    { required: true, message:  Message.ValidationMessages.currentCourseProfessor },
                    
                ],
                })( 
                 
                   <Input  placeholder="Professor" name="currentCourseProfessor" onChange={this.handleChange} setFieldsValue={this.state.currentCourseProfessor} id="currentCourseProfessor" />
           )} 
              
            </FormItem>


              </Col>
              <Col span={12}>
              <FormItem
              {...formItemLayout1}
              name="Professor Id"
              required
              label="Professor Id"
        //rules={[{ required: true, message: 'Please input Course ID, Section & CRN' }]}
            >
            {getFieldDecorator('currentCourseProfessorId', {

                rules: [
                    { required: true, message:  Message.ValidationMessages.currentCourseProfessorId },
                    
                ],
                })( 
                 
                   <Input  placeholder="Professor Id" name="currentCourseProfessorId" onChange={this.handleChange} setFieldsValue={this.state.currentCourseProfessorId} id="currentCourseProfessorId" />
           )} 
              
            </FormItem>


              </Col>
            </Row>

            <br></br>
           <Row>
             <Col span={12}>
             <h4><b><u>New/Changed Course Information :</u></b></h4>
             </Col>
           </Row>
           <br></br>

           <Row>
              <Col span={12}>
              <FormItem
              {...formItemLayout1}
              name="Meeting Days"
              required
              label="Meeting Days"
        //rules={[{ required: true, message: 'Please input Course ID, Section & CRN' }]}
            >
            {getFieldDecorator('changedCourseMeetingDays', {

                rules: [
                    { required: true, message:  Message.ValidationMessages.changedCourseMeetingDays },
                    
                ],
                })( 
                 
                   <Input  placeholder="Meeting Days" name="changedCourseMeetingDays" onChange={this.handleChange} setFieldsValue={this.state.changedCourseMeetingDays} id="changedCourseMeetingDays" />
           )} 
              
            </FormItem>


              </Col>
              <Col span={12}>
              <FormItem
              {...formItemLayout1}
              name="Start/End Time"
              required
              label="Start/End Time"
        //rules={[{ required: true, message: 'Please input Course ID, Section & CRN' }]}
            >
            {getFieldDecorator('changedCourseStartEndTime', {

                rules: [
                    { required: true, message:  Message.ValidationMessages.changedCourseStartEndTime },
                    
                ],
                })( 
                 
                   <Input  placeholder="Start/End Time" name="changedCourseStartEndTime" onChange={this.handleChange} setFieldsValue={this.state.changedCourseStartEndTime} id="changedCourseStartEndTime" />
           )} 
              
            </FormItem>


              </Col>
            </Row>


            <Row>
              <Col span={12}>
              <FormItem
              {...formItemLayout1}
              name="Building Room"
              required
              label="Building Room"
        //rules={[{ required: true, message: 'Please input Course ID, Section & CRN' }]}
            >
            {getFieldDecorator('changedCourseBuildingRoom', {

                rules: [
                    { required: true, message:  Message.ValidationMessages.changedCourseBuildingRoom },
                    
                ],
                })( 
                 
                   <Input  placeholder="Building Room" name="changedCourseBuildingRoom" onChange={this.handleChange} setFieldsValue={this.state.changedCourseBuildingRoom} id="changedCourseBuildingRoom" />
           )} 
              
            </FormItem>


              </Col>
              <Col span={12}>
              <FormItem
              {...formItemLayout1}
              name="CAP"
              required
              label="CAP"
        //rules={[{ required: true, message: 'Please input Course ID, Section & CRN' }]}
            >
            {getFieldDecorator('changedCourseCap', {

                rules: [
                    { required: true, message:  Message.ValidationMessages.changedCourseCap },
                    
                ],
                })( 
                 
                   <Input  placeholder="CAP" name="changedCourseCap" onChange={this.handleChange} setFieldsValue={this.state.changedCourseCap} id="changedCourseCap" />
           )} 
              
            </FormItem>


              </Col>
            </Row>

            <Row>
              <Col span={12}>
              <FormItem
              {...formItemLayout1}
              name="Professor"
              required
              label="Professor"
        //rules={[{ required: true, message: 'Please input Course ID, Section & CRN' }]}
            >
            {getFieldDecorator('changedCourseProfessor', {

                rules: [
                    { required: true, message:  Message.ValidationMessages.changedCourseProfessor },
                    
                ],
                })( 
                 
                   <Input  placeholder="Professor" name="changedCourseProfessor" onChange={this.handleChange} setFieldsValue={this.state.changedCourseProfessor} id="changedCourseProfessor" />
           )} 
              
            </FormItem>


              </Col>
              <Col span={12}>
              <FormItem
              {...formItemLayout1}
              name="Professor Id"
              required
              label="Professor Id"
        //rules={[{ required: true, message: 'Please input Course ID, Section & CRN' }]}
            >
            {getFieldDecorator('changedCourseProfessorId', {

                rules: [
                    { required: true, message:  Message.ValidationMessages.changedCourseProfessorId },
                    
                ],
                })( 
                 
                   <Input  placeholder="Professor Id" name="changedCourseProfessorId" onChange={this.handleChange} setFieldsValue={this.state.changedCourseProfessorId} id="changedCourseProfessorId" />
           )} 
              
            </FormItem>


              </Col>
            </Row>
<br></br>
            <Row>
              <Col span={20}>
              <FormItem
              {...formItemLayout2}
              name="Note for Web Schedule"
             // required
              label="Note for Web Schedule"
        //rules={[{ required: true, message: 'Please input Course ID, Section & CRN' }]}
            >
            {getFieldDecorator('noteWebSchedule', {

                rules: [
                    { required: true, message:  Message.ValidationMessages.noteWebSchedule },
                    
                ],
                })( 
                  <Input  placeholder="Note for Web Schedule" name="noteWebSchedule" onChange={this.handleChange} setFieldsValue={this.state.noteWebSchedule} id="noteWebSchedule" />
           )} 
              
            </FormItem>


              </Col>
             
            </Row>

            <Row>
              <Col span={20}>
              <FormItem
              {...formItemLayout2}
              name="Delivery Attribute: (FTF, ONL, ONK, HYB, FLXm CL)"
             // required
              label="Delivery Attribute: (FTF, ONL, ONK, HYB, FLXm CL)"
        //rules={[{ required: true, message: 'Please input Course ID, Section & CRN' }]}
            >
            {getFieldDecorator('deliveryAttribute', {

                rules: [
                    { required: true, message:  Message.ValidationMessages.deliveryAttribute },
                    
                ],
                })( 
                  <Input  placeholder="Delivery Attribute: (FTF, ONL, ONK, HYB, FLXm CL)" name="deliveryAttribute" onChange={this.handleChange} setFieldsValue={this.state.deliveryAttribute} id="deliveryAttribute" />
           )} 
              
            </FormItem>


              </Col>
             
            </Row>

            <Row>
              <Col span={20}>
              <FormItem
              {...formItemLayout2}
              name="Reason for Change"
             // required
              label="Reason for Change"
        //rules={[{ required: true, message: 'Please input Course ID, Section & CRN' }]}
            >
            {getFieldDecorator('reasonForChange', {

                rules: [
                    { required: true, message:  Message.ValidationMessages.reasonForChange },
                    
                ],
                })( 
                  <Input  placeholder="Reason for Change" name="reasonForChange" onChange={this.handleChange} setFieldsValue={this.state.reasonForChange} id="reasonForChange" />
           )} 
              
            </FormItem>


              </Col>
             
            </Row>

            <br></br>
           <Row>
             <Col span={24}>
             <h4><b>** Faculty assignment changes can be done directly through Baneer (SIAASGN)</b></h4>
             </Col>
           </Row>
           <br></br>

            <span style={{ marginLeft: '35%' }} className="ant-form-text">
              {' '}
              {
                    this.state.serverSideValidationError.length !== 0
                    && this.state.serverSideValidationError.map((data) => {
                      return (
                        <span>
                          {' '}
                          <span className="wt-color-red">
                            {data}
                            {' '}
                          </span>
                          {' '}
                          <br />
                        </span>
                      );
                      })
                                      }

            </span>
           

            <FormItem {...tailFormItemLayout}>
              <Button className="custom-button" type="primary" disabled={this.state.disabledButton} htmlType="submit">Submit</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}


const mapStateToProps = ({ auth }) => {
  const { authUser } = auth;
  return { authUser };
};

const InviteUser = Form.create()(CourseScheduleForm);

export default connect(mapStateToProps)(InviteUser);
