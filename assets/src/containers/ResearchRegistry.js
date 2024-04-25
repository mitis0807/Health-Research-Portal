import React from "react";
import {
  Form,
  Layout,
  Menu,
  PageHeader,
  Select,
  Input,
  Card,
  Col,
  Row,
  Pagination,
  Breadcrumb
  
} from "antd";

import "react-toastify/dist/ReactToastify.css";
import AllMessage from "../MyComponents/AllMessages";
import "./index.css";
import URL from "../env/environmentVar";
import { toast } from "react-toastify";
import moment from "moment";
import MainHome from "./Home";
import Footer from "./FooterGlobalPage";

const { Header, Content } = Layout;
const { Option } = Select;

const { SubMenu } = Menu;

const FormItem = Form.Item;
const { TextArea, Search } = Input;
let propsData;
var that;
class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isReadMore: true,
      index: undefined,
      searchBasedOn:'',
      searchValue:'',
      selectedSortValue:'',
      pageNumber: 1,
      total: undefined,
    };
    propsData = this.props;
    this.onChangeOfpagination = this.onChangeOfpagination.bind(this);
     
 
    };
    
  getAllResearch(){
    const pageNo = this.state.pageNumber;
    fetch(`${URL.APIURL}/getAllResearchForCoordinator/${pageNo}`, {
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            data: res.researchData,
            total:res.total
           
          });
        } else if (res.status === 300) {
          toast.error(res.message, {
            toastId:"researchError",
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

  componentWillMount() {
    window.scrollTo(0, 0);
    this.getAllResearch();
    
  }
  
  handleClickofView=(proposalId,invId)=> {
    localStorage.setItem('tabkey',5)
    this.props.history.push(`/viewRegistry?id=${proposalId}&invId=${invId}`)
  }

  handleChange=(event)=>{
    console.log('search based on')
    console.log(event.target.value)

    this.setState({searchBasedOn:event.target.value})
  }

  onChangeOfpagination(pageNo) {
    console.log("in pn change of pagination");
    console.log(pageNo);
    this.setState({
      pageNumber: pageNo,
    });
    fetch(`${URL.APIURL}/getAllResearchForCoordinator/${pageNo}`, {
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            data: res.researchData,
            total:res.total
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
        }
      });
  }
  OnSearchChange=(event)=>{

  if(event.target.value === '' )
  { 
    fetch(`${URL.APIURL}/getAllResearchForCoordinator/${this.state.pageNumber}`, {
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            data: res.researchData,
            total:res.total
            
          });
  }})}}

  onCustomSearch = (value) => {
    console.log("search value ****", value);
    this.setState({ searchValue: value });
    
    fetch(`${URL.APIURL}/researches/${value}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            data: res.researchData,
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
        }  else if (res.status === 500) {
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
  handleBreadCrumbClick() {
    localStorage.setItem("tabkey", 1);
    this.props.history.push("/home");
  }

  handleSelectChange=(value)=>{
    console.log('value.......',value)

    this.setState({selectedSortValue:value})

    if(value === 'recommended'){
    this.getAllResearch();
    }
    else if(value == 1 || value == -1)
    {
      const pageNo = this.state.pageNumber
      fetch(`${URL.APIURL}/sortAllResearch/${pageNo}/${value}`, {
        credentials: "include",
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.status === 200) {
            this.setState({
              data: res.researchData,
              total:res.total
             
            });
          } else if (res.status === 300) {
            toast.error(res.message, {
              toastId:"researchError",
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
  }
  render() {
    const { data } = this.state;

   
    document.title = `Explore Research Registry | ${AllMessage.PageTitle}`;

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
        {/* <Breadcrumb
            className="site-page-header"
            style={{ margin: "16px 0", marginLeft: "25px", paddingTop: "20px" }}
          >
            <Breadcrumb.Item
              onClick={this.handleBreadCrumbClick.bind(this)}
              className="gx-link"
            >
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item>Explore Research Registry</Breadcrumb.Item>
          </Breadcrumb> */}
           <Breadcrumb
            className="site-page-header"
            style={{ margin: "16px 0", marginLeft: "25px", paddingTop: "20px" }}
          >
            <Breadcrumb.Item
              onClick={this.handleBreadCrumbClick.bind(this)}
              className="gx-link"
            >
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item>Explore Research Registry</Breadcrumb.Item>
          </Breadcrumb>

        <Row style={{marginTop:'-30px'}}>
      
          <Col span={8} style={{ textAlign: "left", marginTop: "20px" }}>
         
            <PageHeader
              className="site-page-header"
              title={<h1>Explore Research Registry</h1>}
             // breadcrumb={{ routes }}
             // style={{ paddingTop: "0px" }}
              // subTitle="This is a subtitle"
            ></PageHeader>
          </Col>
          <Col span={8} style={{ marginTop: "37px", textAlign: "center" ,zIndex:"0"}}>
          
            <Search
             
              placeholder="Search for research by title or keywords"
              onSearch={this.onCustomSearch}
              enterButton allowClear enterKeyHint
              onChange={this.OnSearchChange}
            />
           
          </Col>
          <Col span={8} style={{ textAlign: "right" ,marginTop:'37px'}}>
            <Select
              showSearch
              style={{ width: 197 ,marginRight:'83px'}}
              placeholder="Sort By"
              optionFilterProp="children"
              onChange={this.handleSelectChange}
          
            >
              <Option value="recommended">Recommended</Option>
              <Option value="1">A-Z</Option>
              <Option value="-1">Z-A</Option>


              
            </Select>
            
          </Col>
        </Row>
        
      {data && data.length == 0 ? <div style={{textAlign:'center'}}>No research data found </div>:
      
      data && data.map(item=>{
        return(

        item != null ?
            <Card
              style={{
                width: "92%", // display: "block",
                marginLeft: "25px",
                marginRight: "auto",
                // marginTop: "65px",
                // marginBottom: "10px",
                // width: "96%",
                overflow: "hidden",
               
              }}
              type="inner"
              title={<h4>{item && item.title}</h4>}
              extra={<a
               
                onClick={() => this.handleClickofView(item.proposalId,item.investigatorId)}
              >
                <span className="gx-link">View</span>
              </a> }
            >
              <div id="container" >
                <p>Keywords : {item && item.keywords}</p>
              </div>
            </Card>
            :null
            )})} 
            


        {  data && data.length !== 0? 
         
          <Row>
          <Col span={24} style={{ textAlign: "center"}}>
          <Pagination
            style={{ textAlign: "center",marginBottom:'40px' }}
            total={this.state.total}
            pageSize={10}
            current={this.state.pageNumber}
            onChange= {(current) => this.onChangeOfpagination(current)}
          />
          </Col>
          </Row>
        :null}
          
         
         
          <br></br> <br></br> <br></br> <br></br>
         
      </div>
      <Footer />
      </div>
    );
  }
}

const Home = Form.create()(HomePage);
export default Home;
