import React from 'react';
import {
  Layout, Menu, Button, Row, Col
} from 'antd';
import 'react-toastify/dist/ReactToastify.css';
import {
 Link, Redirect,
} from 'react-router-dom';

import './index.css';


const { Header ,Content} = Layout;

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
      current: '',
    };
   this.handleMenuClick = this.handleMenuClick.bind(this);
   this.handleButtonClick = this.handleButtonClick.bind(this)
  
  }

componentDidMount(){
  window.scrollTo(0, 0);
  var currentKey=localStorage.getItem('tabkey');
  console.log('currentKey in home');
  console.log(currentKey);
  

this.setState({
  current:currentKey
})
}
  handleMenuClick(e) {
  console.log('in handle menu click');
  console.log(e);
  localStorage.setItem('tabkey',e.key)
  this.setState({
    current:e.key
  })
  }
  handleButtonClick(){
    window.location.replace('/signIn');
    localStorage.setItem('tabkey',1)
  }
 
  render() {
    const { current } = this.state;
    return (
      <div style={{
      position:'fixed',
      zIndex: 1,
     top: 0,
      width: '100%',
     // height: "87px",
    }}
      >
         
        <Header
          style={{
            position: 'fixed',
            zIndex: 1,
           top: 0,
            width: '100%',
            height: '87px',
            overflow:'hidden',
          }}
        >
          <Row style={{ width: '100%' }} >
            <Col span={8}>
              <img style={{position:'absolute', top:'10%',marginLeft:'-10px'}} height="100%" width="100%"
                src={require('../assets/MoHMS Portal Logo.png')}
                alt="Neature"
              />
            </Col>
            <Col  span={14}  style={{textAlign:'center'}}>
              <p
                style={{
                  fontSize: '20px',
                  marginTop: '30px',
                 // marginRight: '-90px',
                 marginLeft:'-147px'
                }}
              >
               New Jersey Institute Of Technology
              </p>
            </Col>
            <Col span={1}>
              <Button
                onClick={this.handleButtonClick}
                type="primary"
                // className="gx-mb-0"
                htmlType="submit"
                style={{
                  float: 'right',
                  position:'absolute',
                  right:0,
                  // top:'30%',
                  // marginTop: '23px',
                   margin: '18px 10px',
                   padding: "0px 12px",
                   width:"73px"

                }}
              >
                Sign in
              </Button>
            </Col>
            <Col span={1}>
              <Button
              
                type="primary"
                // className="gx-mb-0"
                htmlType="submit"
                style={{
                  float: 'right',
                  position:'absolute',
                  right:0,
                  // top:'30%',
                  // marginTop: '23px',
                   margin: '18px -24px',
                   padding: "0px 12px",
                   width:"73px"
                   
                }}
              >
                <Link to="/signUp">Sign up</Link>
                   
              </Button>
            </Col>
            <Col span={1}>
              <Button
               
                type="primary"
                // className="gx-mb-0"
                htmlType="submit"
                style={{
                  float: 'right',
                  position:'absolute',
                  right:0,
                  // top:'30%',
                  // marginTop: '23px',
                   margin: '18px -24px',
                   padding:'auto 9px',
                  //  paddingLeft:'9px',
                  //  paddingRight:'9px'
                }}
              ><Link to="/signUp">Sign Up</Link>
                
              </Button>
            </Col>
          </Row>
      
      </Header>
       
        <div   style={{
              position: 'fixed',
              width: '100%',
              backgroundColor: '#7AC5CD',
             overflowY: 'scroll',
             zIndex:1,
             marginTop:86,
            // minHeight:"10vh"
            }}>
             
        <Menu
              onClick={this.handleMenuClick}
              mode="horizontal"
              selectedKeys={this.state.current}
             // defaultSelectedKeys={['1']}
             // defaultSelectedKeys={[current]}
              style={{ justifyContent: 'space-between', display: 'flex'}}
            >
              <Menu.Item key="1">
                {/* <NavLink activeClassName="active" to="/">
                 home
                </NavLink> */}
               
                  {' '}
                  <Link
                    style={{ color: 'white', fontSize: '16px' }}
                    to="/home"
                  >
                    Home
                  </Link>
                </Menu.Item>
             
              <Menu.Item style={{ color: 'white', fontSize: '16px' }} key="2">
                {' '}
                <Link
                  style={{ color: 'white', fontSize: '16px' }}
                  to="/announcement"
                >
                  Announcements
                </Link>
              </Menu.Item>
              <Menu.Item style={{ color: 'white', fontSize: '16px' }} key="3">
                <Link
                  style={{ color: 'white', fontSize: '16px' }}
                  to="/governancePolicy"
                >
                  Governance and Policy
                </Link>
              </Menu.Item>
              <Menu.Item style={{ color: 'white', fontSize: '16px' }} key="4">
                <Link
                  style={{ color: 'white', fontSize: '16px' }}
                  to="/dataTracker"
                >
                  Data Request
                </Link>
              </Menu.Item>
              <Menu.Item style={{ color: 'white', fontSize: '16px' }} key="5">

                <Link
                  style={{ color: 'white', fontSize: '16px' }}
                  to="/researchRegistry"
                >
                  Explore Research Registry
                </Link>
              </Menu.Item>
              <Menu.Item style={{ color: 'white', fontSize: '16px',
             }} key="6">
                <Link
                  style={{ color: 'white', fontSize: '16px' }}
                  to="/contactUs"
                >
                  Contact Us
                </Link>
                {/* <NavLink activeClassName="active" to="/contactUs">
                  Contact Us
                </NavLink> */}
              </Menu.Item>
            </Menu>
                </div>
             
            
                {/* <FooterGlobalPage /> */}
       
      </div>

    );
  }
}

export default HomePage;
