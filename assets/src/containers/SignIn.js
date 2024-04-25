import React from 'react';
import {
  Button, Form, Input, Icon,
} from 'antd';
import { connect } from 'react-redux';
import {
  Link,
} from 'react-router-dom';
import {  Flip, Slide, toast ,ToastContainer, Zoom} from 'react-toastify';
import URL from '../env/environmentVar';
import 'react-toastify/dist/ReactToastify.css';
import AllMessage from '../MyComponents/AllMessages';
import Message from '../../../config/ValidationMessages';
import {
  userSignIn,
} from '../appRedux/actions/Auth';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";


const FormItem = Form.Item;
toast.configure({

})
class SignIn extends React.Component {
  toastId=null
  constructor(props) {
    super(props);

    this.state = {
      data: '',
      isSignInDisable:false,
    
    };
    this.responseGoogle = this.responseGoogle.bind(this);
  }


  responseGoogle =(response)=> {
    console.log('response in success...............',response)
    const userObject = jwt_decode(response.credential);
    console.log('userObject',userObject)
    if(response.credential){
          fetch(`${URL.APIURL}/processLogin`, {
            // mode :'no-cors',
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
  
            credentials: 'include',
            body: JSON.stringify({
              username: userObject.email,
              password: '123456',
            }),
          })
          .then((res) => { return res.json(); })
          .then(
            (res) => {
                if (res.status === 200) {
                  console.log('resssssss',res)
                  var values ={
                    id:res.user.id,
                    firstName: userObject.given_name,
                    lastName:userObject.family_name,
                    picture :userObject.picture
                  }
                  console.log('values before sending',values)
                  fetch(`${URL.APIURL}/updateInternalUser`, {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                      'Access-Control-Allow-Origin': '*',
                    },
          
                    credentials: 'include',
                    body: JSON.stringify({
                      data:values
                    }),
                  })
                  .then((response) => { return response.json(); })
                  .then(
                    (response) => {
                      if (response.status === 200) {
                        console.log('resssssssss in login 20000-0-000000',res)
                        this.props.userSignIn(res.user);
                        global.user = res.user;
                        this.setState({
                          data: res,
                        });
                        if (this.state.data.user.role === 1) {
                          this.props.history.push('/courseScheduleAdmin');
                        } 
                        else if (this.state.data.user.role === 2) {
                          this.props.history.push('/courseScheduleChair')
                        } 
                        else if (this.state.data.user.role === 3) {
                          this.props.history.push('/courseScheduleDean')
                        } 
                    }else if(response.status === 300){
                      toast.error(res.message, {
                        toastId:"101",
                        position:"top-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        transition:Slide,
                        
                        });
                    }else if (response.status === 500) {
                      this.props.history.push('/serverError');
                    }else if (response.status === 400) {
                      this.props.history.push('/badRequest');
                    }else if (response.status === 403) {
                      this.props.history.push('/forbiddenRequest');
                    }
                      
                    }) 
                 
          
                } else if (res.status === 300) {
                  
                  this.setState({isSignInDisable:false})
                toast.error(res.message, {
                        toastId:"101",
                        position:"top-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        transition:Slide,
                        
                        });
              
                  
                } else if (res.status === 500) {
                  this.setState({isSignInDisable:false})
                  this.props.history.push('/serverError');
                } else if (res.status === 400) {
                  this.setState({isSignInDisable:false})
                  // bad request
                  this.props.history.push('/badRequest');
                } else if (res.status === 403) {
                  this.setState({isSignInDisable:false})
                  // forbidden request
                  this.props.history.push('/forbiddenRequest');
                }
              },
            );
      
    
     
    }
  }
  handleLoginFailure=(response)=>{
    console.log('response in failure...............',response)
  }
  handleSubmit = (e) => {
    e.preventDefault();

    // const form = this.props;
    // eslint-disable-next-line react/prop-types
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({isSignInDisable:true})
        values.email = values.email.toLowerCase().trim();
        fetch(`${URL.APIURL}/processLogin`, {
          // mode :'no-cors',
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },

          credentials: 'include',
          body: JSON.stringify({
            username: values.email,
            password: values.password,
          }),
        })
        .then((res) => { return res.json(); })
        .then(
          (res) => {
              if (res.status === 200) {
                this.props.userSignIn(res.user);
                global.user = res.user;
                this.setState({
                  data: res,
                });
                console.log('this.state.data.user.role this.state.data.user.role ',this.state.data.user.role)
                this.setState({isSignInDisable:false})
                if (this.state.data.user.role === 1) {
                
                      this.props.history.push('/courseScheduleAdmin');
                } 
               else if (this.state.data.user.role === 2) {
                this.props.history.push('/courseScheduleChair')
                } 
                else if (this.state.data.user.role === 3) {
                  this.props.history.push('/courseScheduleDean')
                  } 
              } else if (res.status === 300) {
                
                this.setState({isSignInDisable:false})
               //using toast isActive
              //   if (!toast.isActive(this.toastId)) {
              //  this.toastId=   toast.error(res.message, {
                    
              //       position:"top-center",
              //       autoClose: 1000,
              //       hideProgressBar: true,
              //       closeOnClick: true,
              //       pauseOnHover: true,
              //       draggable: false,
              //       transition:Zoom,

              //       });
              //   }

              // using toastid
              toast.error(res.message, {
                      toastId:"101",
                      position:"top-center",
                      autoClose: 3000,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: false,
                      transition:Slide,
                      
                      });
                    
                  


               
                  // toast.clearWaitingQueue();
                
                  // clearWaitingClue
                // {<ToastContainer  />}
                
              } else if (res.status === 500) {
                this.setState({isSignInDisable:false})
                this.props.history.push('/serverError');
              } else if (res.status === 400) {
                this.setState({isSignInDisable:false})
                // bad request
                this.props.history.push('/badRequest');
              } else if (res.status === 403) {
                this.setState({isSignInDisable:false})
                // forbidden request
                this.props.history.push('/forbiddenRequest');
              }
            },
          );
      }
    });
  };


  render() {
   
    console.log('****************','inside signin')
    document.title = `Sign In | ${AllMessage.PageTitle}`;
    const { getFieldDecorator } = this.props.form;
    const styles = {
      paperContainer: {
        backgroundSize: 'cover',
         overflow: 'visible',
        resizeMode: 'repeat',
        backgroundImage: `url(${require('../assets/backgroundImage.jpg')})`,
        // backgroundRepeat: repeat-x;

      },
  };


    return (
      <div className="gx-login-container" style={styles.paperContainer}>
        {/* <ToastContainer limit={3} /> */}
        <div style={{ width: '94%', textAlign: 'center' }}>
        {/* <img id="njit" style={{height:'40%',width:'40%'}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/New_Jersey_IT_logo.svg/1280px-New_Jersey_IT_logo.svg.png"></img> */}
          <div className="gx-login-content">
            <div className="gx-login-header gx-text-center">
              <h1 className="gx-login-title">Sign In</h1>
              <span><b>New Jersey Institute Of Technology</b></span>
            </div>
            <Form onSubmit={this.handleSubmit} className="gx-login-form gx-form-row0">
              <FormItem>
                {getFieldDecorator('email', {
                rules: [{
                  required: true,
                   message: Message.ValidationMessages.emailRequiredValidation,
                    },
                    {
                      pattern: new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$'),
                      message: Message.ValidationMessages.emailValidation,
                    },
                ],  
              })(
                <Input
                  type="email"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Email"
                />,
              )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                rules: [{
            required: true,
                  message: Message.ValidationMessages.passwordRequiredValidation,
}],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
              </FormItem>


              <FormItem className="gx-text-center">
                <Button  disabled={this.state.isSignInDisable} type="primary" style={{float:'left'}} className="gx-mb-0" htmlType="submit">
                Sign In
                </Button>
                <span style={{float:'left'}}>or</span>
                {' '}

                <Link style={{float:'left',marginLeft:'6px'}} className="gx-mb-0" to="/signUp">
                Sign Up


                </Link>

                {/* <Link to="/forgotPassword" style={{ float: 'right' }}>
            Forgot Password?

              </Link>
              <Link to="/home" style={{ float: 'right' ,marginTop:"-12px",marginBottom:"-20px"}}>
          Go to Home Page

              </Link> */}

              </FormItem>
              
              
             <GoogleLogin
              render={(renderProps) => (
                <button
                  type="button"
                  className=""
                  // onClick={renderProps.onClick}
                  // disabled={renderProps.disabled}
                >
                  Sign in with google
                </button>
              )}
              onSuccess={this.responseGoogle}
              onFailure={this.handleLoginFailure}
              cookiePolicy="single_host_origin"
            />
          
            </Form>

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { authUser } = auth;
  return { authUser };
};

const WrappedNormalLoginForm = Form.create()(SignIn);

export default connect(mapStateToProps, { userSignIn })(WrappedNormalLoginForm);
