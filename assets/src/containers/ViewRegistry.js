import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Form, Row, Select, PageHeader, Button ,Tooltip,Breadcrumb} from "antd";
import { toast } from "react-toastify";
import URL from "../env/environmentVar";
import "react-toastify/dist/ReactToastify.css";
import AllMessage from "../../src/MyComponents/AllMessages";
import queryString from 'query-string';
import Footer from "./FooterGlobalPage";

import MainHome from "./Home";

let role;

const FormItem = Form.Item;
const { Option } = Select;
class Tab1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data:'',
      proposalId:'',
      investigatorData:''
    };
    this.handleBackButton = this.handleBackButton.bind(this)

  }
  handleBackButton(){
    this.props.history.push('/researchRegistry')
      }
  componentWillMount() {
    window.scrollTo(0, 0);
    console.log("in compoenet will mount");
    console.log(this.props.location.state);
    const UrlQueryStrings = this.props.location.search;
    const queryValues = queryString.parse(UrlQueryStrings);
  
    console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
    console.log(queryValues.id); 

    this.setState({proposalId:queryValues.id})
   
    fetch(`${URL.APIURL}/getResearchForView`, {
      // mode :'no-cors',
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      credentials: "include",
      body: JSON.stringify({
        proposalId :queryValues.id,
        investigatorId:queryValues.invId
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.status === 200) {

          this.setState({
            data: res.proposalData,
          });

        }
        if (res.status === 300) {
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
        }
      });

    
  }
  handleBreadCrumbHomeClick(){
    localStorage.setItem('tabkey',1)
    this.props.history.push('/home');
  }
  handleBreadCrumbDatRequestClick(){
    localStorage.setItem('tabkey',5)
    this.props.history.push('/researchRegistry');
  }
  render() {
    
    console.log('this.state.data', this.state.data.objectives)

    const routes = [
      {
        path: "home",
        breadcrumbName: "Home",
      },
      {
        path: "exploreRegistry",
        breadcrumbName: "Explore Research Registry",
      },
      {
        path: "viewRegistry",
        breadcrumbName: "View Registry",
      },
    ];
    document.title = `View Registry | ${AllMessage.PageTitle}`;

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
        <Breadcrumb.Item  className="gx-link" onClick={this.handleBreadCrumbDatRequestClick.bind(this)}>Explore Research Registry
        </Breadcrumb.Item>
        <Breadcrumb.Item>View Registry</Breadcrumb.Item>
      </Breadcrumb>
        <PageHeader
          className="site-page-header"
          title={<h1>View Registry</h1>}
          style={{paddingTop:'0px'}}
         // breadcrumb={{ routes }}
          // subTitle="This is a subtitle"
        ></PageHeader>
        {/* <BreadcrumbDemo propertyProps={this.props} /> */}
        <Card
          className="cardcss"
          style={{marginTop:'-10px'}}
          // style={{ fontSize: "16px" }}
          title={<div><b>Title : </b>
          <Tooltip title={this.state && this.state.data && this.state.data.title}><span
              // style={{  display: 'inline-block',
              // width: '500px',
              // whiteSpace: 'nowrap',
              // overflow: 'hidden',
              // textOverflow: 'ellipsis'}}
              >
              
              {this.state && this.state.data && this.state.data.title}</span></Tooltip></div>}
       
          
       extra={<Button type= "primary" onClick={this.handleBackButton}>Back</Button>}
        
        
        >


          <Row style={{ paddingBottom: '15px' }}>
            <Col md={3} xs={10}>
                <span> <b>Background: </b></span>
              </Col>
              <Col md={20}>
              <Tooltip title={this.state && this.state.data && this.state.data.background}>
                <span 
              // style={{  display: 'inline-block',
              // width: '500px',
              // whiteSpace: 'nowrap',
              // overflow: 'hidden',
              // textOverflow: 'ellipsis'}}
              >
              
              {this.state.data &&this.state.data.background}
              
              </span>
              </Tooltip>
              </Col>
            </Row>
         
            <Row style={{ paddingBottom: '15px' }}>
            <Col md={3} xs={10}>
                <span><b>Objectives:</b>  </span>
              </Col>
              <Col md={20}>
              <Tooltip title={this.state && this.state.data && this.state.data.objectives}>
                <span 
              // style={{  display: 'inline-block',
              // width: '500px',
              // whiteSpace: 'nowrap',
              // overflow: 'hidden',
              // textOverflow: 'ellipsis'}}
              >
              
              {this.state.data &&this.state.data.objectives}
            

              
              </span>
              </Tooltip>
              </Col>
            </Row>

            <Row style={{ paddingBottom: '15px' }}>
            <Col md={3} xs={10}>
                <span><b>Study methods:</b> </span>
              </Col>
              <Col md={20}>
              <Tooltip title={this.state && this.state.data && this.state.data.studyMethods}>
                <span 
              // style={{  display: 'inline-block',
              // width: '500px',
              // whiteSpace: 'nowrap',
              // overflow: 'hidden',
              // textOverflow: 'ellipsis'}}
              >
              
              {this.state.data &&this.state.data.studyMethods}
              
              </span>
              </Tooltip>
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
