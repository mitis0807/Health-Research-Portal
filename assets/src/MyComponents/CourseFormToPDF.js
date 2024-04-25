
/* Component to print the acceptance letter which will get after making proposal as research */

import React from 'react';
import { Card, Button } from 'antd';
import URL from '../env/environmentVar';
import ReactToPrint from 'react-to-print';
import App from './ViewAllCourseDetails';
import { connect } from 'react-redux';
import { Link ,withRouter} from 'react-router-dom';

// import BreadcrumbDemo from '../BreadcrumbDemo';

let user;

let propsData;

class ProposalToResearchPdf extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
    user = this.props.authUser;

    propsData = this.props;
  }
  componentDidMount() {
      console.log('in componsent did mount')
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log('id.......',id)
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
              console.log('dataaaaaaa..... in courseform to pdf',res)
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
    
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get('id');
      console.log('this.props user',this.props.authUser.role)
      console.log('this.props data.........',this.state.data  && this.state.data.signedByDean)
     
    return (
      <div>
        {/* <BreadcrumbDemo propertyProps={this.props} /> */}

        <Card className="cardcss" style={{ fontSize: '16px' }} title={<b>Course Details</b>} extra={[
          this.props.authUser.role =='1'&&this.state.data  && this.state.data.signedByChair=="approved"
           &&this.state.data.signedByDean=="approved"&& <ReactToPrint
            pageStyle="@page { margin:'20px'}"

            trigger={() => { return <Button type="primary">Print</Button>; }}
            content={() => { return this.componentRef; }}
          />,
          <Button type="primary" href="/userManagement">Back</Button>]}>
        
          <App
            propsData={propsData}
            ref={(el) => {
              this.componentRef = el;
              return this.componentRef;
            }}
          />
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ settings, auth }) => {
    const { themeType, locale, pathname } = settings;
    const { authUser } = auth;
    return {
   themeType, locale, pathname, authUser,
  };
  };
  const MyComponent = connect(mapStateToProps)(ProposalToResearchPdf);
  export default withRouter(MyComponent);