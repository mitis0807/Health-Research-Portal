import React from 'react';
import {
  Button, Form, Input, Icon, Modal,
} from 'antd';
import {
  Link,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import URL from '../env/environmentVar';
import 'react-toastify/dist/ReactToastify.css';
import AllMessage from './AllMessages';

import Message from '../../../config/ValidationMessages';

const { error } = Modal;

const FormItem = Form.Item;
let that;
class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notificationOnGenerateForgotPasswordLink:false,
      resMessage:''
    };
    that = this;
    
  }


  handleSubmit = (e) => {
    e.preventDefault();


    this.props.form.validateFields((err, values) => {
      values.email = values.email.toLowerCase();
      if (!err) {
        fetch(`${URL.APIURL}/generateForgotPasswordLink`, {
          // mode :'no-cors',
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },

          credentials: 'include',
          body: JSON.stringify({
            email: values.email,
          }),
        })
        .then((res) => { return res.json(); })
        .then(
          (res) => {
              if (res.status === 200) {

                this.setState({notificationOnGenerateForgotPasswordLink : true,
                resMessage : res.message})
                
                setTimeout(()=>{

                  this.props.history.push('/signIn');
                },5000)
              
              } else if (res.status === 300) {
                toast.error(res.message, {
                  toastId:"forgetPasswordError",
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
    });
  };


  render() {
    document.title = `Forgot Password | ${AllMessage.PageTitle}`;

    const { getFieldDecorator } = this.props.form;
    const styles = {
      paperContainer: {
        backgroundSize: 'cover',

        resizeMode: 'repeat',
        backgroundImage: `url(${'https://cdn.sqoolz.com/ui/images/banner/sqoolz-index-banner-bg.jpg'})`,

      },
  };

 const componentOne = 
            (<div className="gx-login-content">
            <div className="gx-login-header gx-text-center">
              <h1 className="gx-login-title">Forgot Password</h1>
              <span><b>New Jersey Institute Of Technology</b></span>
            </div>
            <Form onSubmit={this.handleSubmit} className="gx-login-form gx-form-row0">
              <FormItem>
                {getFieldDecorator('email', {
                rules: [
                  { required: true, message: Message.ValidationMessages.emailRequiredValidation },
                //  { type: 'email', message: Message.ValidationMessages.emailValidation },
                // {
                //   pattern: new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$'),
                //   message: Message.ValidationMessages.emailValidation,
                //   },

                ],
              })(
                <Input
                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Email address"
                />,
              )}
              </FormItem>


              <FormItem className="gx-text-center">
                <Button type="primary" className="gx-mb-0" htmlType="submit">
              Submit
                </Button>
                <span style={{ marginRight: '6px' }}>or</span>
                {' '}

                <Link className="gx-mb-0" to="/signIn">
                Sign In

                </Link>

              </FormItem>

            </Form>

          </div>)

const componentTwo = (
  <div className="gx-login-content">
    {this.state.resMessage}
  </div>

)

const showComponent=this.state.notificationOnGenerateForgotPasswordLink ? componentTwo : componentOne

    return (
      <div className="gx-login-container" style={styles.paperContainer}>

        <div style={{ width: '94%', textAlign: 'center' }}>
          <img src={require('../assets/COA-MoHMS_Final.png')} alt="Neature" width="200px" style={{ marginLeft: '13px', marginBottom: '1px' }} />
          
        {showComponent}
         
        </div>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(ForgotPassword);


export default (WrappedNormalLoginForm);
