/* eslint-disable global-require */
/* eslint-disable no-param-reassign */
import React from 'react';
import {
  Button, Form, Input, Icon,
} from 'antd';
import {
  Link,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import URL from '../env/environmentVar';
import AllMessage from '../MyComponents/AllMessages';
import 'react-toastify/dist/ReactToastify.css';
import Message from '../../../config/ValidationMessages';


const FormItem = Form.Item;

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      serverSideValidationError: [],
      isSignUpDisable:false
    };
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('in handel submit of signup', values);
      values.email = values.email.toLowerCase();
      values.role = 3;
      if (!err) {
        this.setState({isSignUpDisable:true})
      
        fetch(`${URL.APIURL}/registration`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          credentials: 'include',
          body: JSON.stringify({
            data: values,
          }),
        })
          .then((res) => { return res.json(); })
          .then(
            (res) => {
              console.log('resssssss in signup ', res);
              if (res.status === 200) {
              
              this.props.history.push('/signIn');
              toast.success(res.message, {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                });
                this.setState({isSignUpDisable:false})
              } else if (res.status === 300) {
                this.setState({isSignUpDisable:false})
                toast.error(res.message, {
                  toastId:"registrationError",
                  position: 'top-center',
                  autoClose: 5000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: false,
                  });
                } else if (res.status === 422) {
                  this.setState({
                    serverSideValidationError: res.message,
                    isSignUpDisable:false
                  

                }, () => {
                  console.log('serverSideValidationError', this.state.serverSideValidationError);
                });
                } else if (res.status === 500) {
                this.setState({isSignUpDisable:false})

                  this.props.history.push('/serverError');
                } else if (res.status === 400) {
                  // bad request
                this.setState({isSignUpDisable:false})

                  this.props.history.push('/badRequest');
                } else if (res.status === 403) {
                  // forbidden request
                this.setState({isSignUpDisable:false})

                  this.props.history.push('/forbiddenRequest');
                }
            },
            (error) => {
              toast.error(error, {
                toastId:"registrationError",

                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                });
            },
          );
      }
    });
  };

  render() {
    document.title = `Sign Up | ${AllMessage.PageTitle}`;

    const { getFieldDecorator } = this.props.form;
    const styles = {
      paperContainer: {
        backgroundSize: 'cover',
         overflow: 'hidden',
        resizeMode: 'repeat',
        backgroundImage: `url(${require('../assets/backgroundImage.jpg')})`,

      },
  };
    return (

      <div className="gx-login-container" style={styles.paperContainer}>
        <div style={{ width: '94%', textAlign: 'center' }}>
          <img src={require('../assets/COA-MoHMS_Final.png')} alt="Neature" width="200px" style={{ marginLeft: '13px', marginBottom: '1px' }} />
          <div className="gx-login-content">
            <div className="gx-login-header gx-text-center">
              <h1 className="gx-login-title">Sign Up</h1>
              <span><b>Fiji Health Research Portal</b></span>
            </div>
            <Form onSubmit={this.handleSubmit} className="gx-login-form gx-form-row0">

              <FormItem>
                {getFieldDecorator('firstName', {
                rules: [
                  {
                  required: true,
                  message: Message.ValidationMessages.firstNameRequiredValidation,
                },
                {
                  max: 100, message: Message.ValidationMessages.firstNameMaxValidation,
                },
                {
                  min: 2, message: Message.ValidationMessages.firstNameMinValidation,
                },
                {
                  pattern: new RegExp('^[a-zA-Z-,]+(s{0,1}[a-zA-Z-, ])*$'),
                  message: Message.ValidationMessages.alphabetPatternValidation,
                  },

              ],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Firstname"
                  type="text"
                />,
              )}
              </FormItem>

              <FormItem>
                {getFieldDecorator('middleName', {
                rules: [
                { max: 100, message: Message.ValidationMessages.middleNameMaxValidation },
                { min: 2, message: Message.ValidationMessages.middleNameMinValidation },
                {
                   pattern: new RegExp('^[a-zA-Z-,]+(s{0,1}[a-zA-Z-, ])*$'),

                  message: Message.ValidationMessages.alphabetPatternValidation,
                  },
              ],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Middle name"
                />,
              )}
              </FormItem>

              <FormItem>
                {getFieldDecorator('lastName', {
                rules: [{
                  required: true,
                  message: Message.ValidationMessages.lastNameRequiredValidation,
                },
                 { max: 100, message: Message.ValidationMessages.lastNameMaxValidation },
                 { min: 2, message: Message.ValidationMessages.lastNameMinValidation },

                {
                  pattern: new RegExp('^[a-zA-Z-,]+(s{0,1}[a-zA-Z-, ])*$'),
                  message: Message.ValidationMessages.alphabetPatternValidation,
                  },
              ],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Last name"
                />,
              )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('email', {
                 rules: [
                   { required: true, message: Message.ValidationMessages.emailRequiredValidation },

                   {
                    pattern: new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$'),
                    message: Message.ValidationMessages.emailValidation,
                    },

                ],
              })(
                <Input
                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Email address"
                />,
              )}
              </FormItem>
              <span className="ant-form-text">
                {' '}
                {
                    this.state.serverSideValidationError
                    && this.state.serverSideValidationError.map((data, index) => {
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
              {this.state.serverSideValidationError

              && <br />,
                <br />}

              <FormItem className="gx-text-center" >
                <Button className="gx-mb-0 ant-btn-primary" style={{marginLeft:"-95px"}} disabled={this.state.isSignUpDisable} htmlType="submit">
                  Sign Up
                </Button>
                <span style={{ marginRight: '6px' }}>or</span>
                {' '}
                <Link to="/signIn">
                  Sign In
                </Link>
                <Link to="/Home" style={{ float: 'right' }}>
                Go to Home Page


                </Link>
               
            
              </FormItem>
            </Form>

          </div>
        </div>
      </div>

    );
  }
}

const WrappedSignUpForm = Form.create()(SignUp);
export default (WrappedSignUpForm);
