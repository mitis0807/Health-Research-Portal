import React from 'react';

import 'react-toastify/dist/ReactToastify.css';
import AllMessage from '../MyComponents/AllMessages';
import './index.css';
import MainHome from './Home';
import Footer from './FooterGlobalPage';
class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    window.scrollTo(0, 0);
    document.title = `Home Page | ${AllMessage.PageTitle}`;

    return (
      <div>
        <MainHome />
      <div style={{ textAlign: 'justify' }}>
        <img
          // eslint-disable-next-line global-require
          src={require('../assets/FijiSunset.jpg')}
          alt="Neature"
          style={{
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',

            marginBottom: '1px',
            width: '96%',
            // height: "500px",
          }}
        />

        <div
          style={{
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '40px',
            marginBottom: '20px',
            width: '96%',
          }}
        >
          The Fiji online Human Health Research Portal was developed with the
          technical support of WHO and launched in 2012. The portal provides a
          platform for an <b>integrated online research management system</b> for all
          human health research conducted in Fiji.
        </div>

        <div
          style={{
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            // marginTop:'40px'
            marginBottom: '10px',
            width: '96%',
          }}
        >
          The portal aims to improve efficiency, accountability and the quality
          of human health research conducted in Fiji through a transparent and
          streamlined process of human ethics review. Since its inception, there
          were issues identified in the delivery of the services so in 2019 a
          review was conducted with the technical support of WHO. The review
          recommends the need to redevelop the Research portal due mainly to the
          major policy changes in the Human research ethics review process and
          the improvement in the technology.
          {' '}
        </div>
        <div
          style={{
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            // marginTop:'40px'
            marginBottom: '10px',
            width: '96%',
          }}
        >
          The new health research portal has now improved functionality,
          integration with other research components and most importantly more
          accommodating the needs of clients with the availability of a feedback
          loop and help desk to provide guidance.
        </div>

        <div
          style={{
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            // marginTop:'40px'
            marginBottom: '10px',
            width: '96%',
          }}
        >
          The Health Research Portal can be used to:
        </div>

        <div
          style={{
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            // marginTop:'40px'
            marginBottom: '10px',
            width: '96%',
          }}
        >
          <b> Submit research proposals anytime from anywhere</b>
          {' '}
          for review by
          the newly established Fiji Human Research Ethics Committee (FHREC) and
          reporting by the accredited Human research ethics committees in
          academia and other institutions. The researcher, preferably the
          principal investigator needs to register on the research portal to
          establish an account before submission of an application. Furthermore,
          this process allows the researcher to communicate with the secretariat
          and track the review status of the application until its completion.
        </div>

        <div
          style={{
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            // marginTop:'40px'
            marginBottom: '10px',
            width: '96%',
          }}
        >
          Receive and respond to comments by reviewers on any aspect of the
          research application/submission.
        </div>

        <div
          style={{
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            // marginTop:'40px'
            marginBottom: '10px',
            width: '96%',
          }}
        >
          <b>Search ongoing and completed health research</b>
          {' '}
          projects could be
          accessed through a publicly accessible research registry.
        </div>

        <div
          style={{
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            // marginTop:'40px'
            marginBottom: '10px',
            width: '96%',
          }}
        >
          <b>Access complete research reports</b>
          {' '}
          for completed research, if
          available.
        </div>

        <div
          style={{
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            // marginTop:'40px'
            marginBottom: '10px',
            width: '96%',
          }}
        >
          <b>
            Access information directly on existing government policies,
            guidelines, and governance on the conduct of
          </b>
          {' '}
          health research in Fiji
        </div>

        <div
          style={{
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            // marginTop:'40px'
            marginBottom: '10px',
            width: '96%',
          }}
        >
          <b>Access a “Researchers' Directory”</b>
          {' '}
          containing information on the
          national and international researchers conducting research in Fiji.
        </div>
        {/* <div className="site-layout-background" style={{ padding: '0 50px', minHeight: 380 }}>
          Content
        </div> */}
      </div>
      <Footer />
      </div>
    );
  }
}

export default HomePage;
