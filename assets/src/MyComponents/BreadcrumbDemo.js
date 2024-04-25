import React from 'react';
import {
 Card, Breadcrumb, Icon
} from 'antd';
 import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem';


let userData;
 class BreadcrumbDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };


    this.handleClickOfViewUser = this.handleClickOfViewUser.bind(this);
    this.handleClickOfReviewProposalReviewer = this.handleClickOfReviewProposalReviewer
    .bind(this);
    this.handleClickOfReviewAmendmentReviewer = this.handleClickOfReviewAmendmentReviewer
    .bind(this);
    this.handleClickOfInviteUserFormCoordinator = this.handleClickOfInviteUserFormCoordinator
    .bind(this);
    this.handleClickOfViewProposalCoordinator = this.handleClickOfViewProposalCoordinator
    .bind(this);
    this.handleClickOfManageResearchCoordinator = this.handleClickOfManageResearchCoordinator
    .bind(this);
    this.handleClickOfAddCommitteeMemberCoordinator = this.handleClickOfAddCommitteeMemberCoordinator
    .bind(this);
    this.handleClickOfViewCommitteeMemberCoordinator = this.handleClickOfViewCommitteeMemberCoordinator
    .bind(this);
    this.handleClickOfNewProposal = this.handleClickOfNewProposal.bind(this);
    this.handleClickOfViewProposalInvestigator = this.handleClickOfViewProposalInvestigator
    .bind(this);
    this.handleClickOfViewAmendmentInvestigator = this.handleClickOfViewProposalInvestigator
    .bind(this);
    this.handleClickOfManageResearchInvestigator = this.handleClickOfManageResearchInvestigator.bind(this);
  this.handleManageProposalClick = this.handleManageProposalClick.bind(this);
  this.handleManageAmendmentClick = this.handleManageAmendmentClick.bind(this);

  this.handleClickOfInviteUserAdmin = this.handleClickOfInviteUserAdmin.bind(this);
  this.handleClickOfViewUserAdmin = this.handleClickOfViewUserAdmin.bind(this);
  this.handleClickOfViewProposalChair = this.handleClickOfViewProposalChair.bind(this);
  this.handleClickOfViewAmendmentChair = this.handleClickOfViewAmendmentChair.bind(this);
  this.handleClickOfSignContentChair = this.handleClickOfSignContentChair.bind(this);
  this.handleClickOfManageResearchCoordinator = this.handleClickOfManageResearchCoordinator.bind(this);
  this.handleClickOfViewResearchInvestigator = this.handleClickOfViewResearchInvestigator.bind(this);
  this.handleClickOfViewDataRequestSeniorStatician = this.handleClickOfViewDataRequestSeniorStatician.bind(this);
  this.handleClickOfViewDataRequestPSHMS = this.handleClickOfViewDataRequestPSHMS.bind(this);
  this.handleClickOfViewDataRequestHOR = this.handleClickOfViewDataRequestHOR.bind(this);
  this.handleClickOfViewDashboardAdmin = this.handleClickOfViewDashboardAdmin.bind(this);



  userData = this.props.authUser;
  }

  handleClickOfReviewProposalReviewer() {
    this.props.propertyProps.history.push('/reviewProposal');
  }
 
  handleClickOfReviewAmendmentReviewer() {
    this.props.propertyProps.history.push('/reviewAmendment');
  }

  handleClickOfInviteUserFormCoordinator() {
    this.props.propertyProps.history.push('/userManagement');
  }

  handleClickOfViewUser() {
    console.log('propertyProps propertyProps', this.props.propertyProps);
    this.props.propertyProps.history.push('/userManagement');
  }

  handleClickOfManageAnnouncement=()=>{
    console.log('propertyProps propertyProps', this.props.propertyProps);
    this.props.propertyProps.history.push('/manageAnnouncement');
  }

  handleClickOfViewProposalCoordinator() {
    this.props.propertyProps.history.push('/manageProposal');
  }
  handleClickOfViewAmendmentCoordinator() {
    this.props.propertyProps.history.push('/manageAmendment');
  }

  handleClickOfManageResearchCoordinator() {
    this.props.propertyProps.history.push('/manageResearch');
  }

  handleClickOfAddCommitteeMemberCoordinator() {
    this.props.propertyProps.history.push('/manageCommittee');
  }

  handleClickOfViewCommitteeMemberCoordinator() {
    this.props.propertyProps.history.push('/manageCommittee');
  }

  handleClickOfNewProposal() {
    this.props.propertyProps.history.push('/manageProposal');
  }

  handleClickOfViewProposalInvestigator() {
    this.props.propertyProps.history.push('/manageProposal');
  }

  handleClickOfManageResearchInvestigator() {
    this.props.propertyProps.history.push('/manageResearch');
  }

  handleManageProposalClick() {
    this.props.propertyProps.history.push('/manageProposal');
  }
  handleManageAmendmentClick() {
    this.props.propertyProps.history.push('/manageAmendment');
  }

  handleClickOfResetPassword(){
    this.props.history.push('/profile')
  }
  handleClickOfResetPasswordExceptInvestigation(){
    this.props.history.push('/profile')
  }


  handleClickOfInviteUserAdmin() {
    this.props.propertyProps.history.push('/userManagement');
  }

  handleClickOfViewUserAdmin() {
    this.props.propertyProps.history.push('/userManagement');
  }

  handleClickOfViewProposalChair() {
    this.props.propertyProps.history.push('/signProposal');
  }

  handleClickOfViewAmendmentChair(){
    this.props.propertyProps.history.push('/signAmendment');

  }
  handleClickOfSignContentChair() {
    this.props.propertyProps.history.push('/signProposal');
  }
  handleClickOfSignAmendmentContentChair(){
    this.props.propertyProps.history.push('/signAmendment');

  }

  handleClickOfManageResearchCoordinator() {
    this.props.propertyProps.history.push('/manageResearch');
  }

  handleClickOfViewResearchInvestigator() {
    this.props.propertyProps.history.push('/manageResearch');
  }
  handleHomeChange(){
    this.props.propertyProps.history.push('/profile');
  }
  handleClickOfManageAmendmentCoordinator(){
    this.props.propertyProps.history.push('/manageAmendment');

  }

  handleClickOfViewDataRequestSeniorStatician(){
    this.props.propertyProps.history.push('/reports');
  }
  handleClickOfManageDataRequestSeniorStatician(){
    this.props.propertyProps.history.push('/manageRequests');

  }
  handleClickOfViewDataRequestPSHMS(){
    this.props.propertyProps.history.push('/manageRequests');
  }

  handleClickOfViewDataRequestHOR(){
    this.props.propertyProps.history.push('/manageRequests');
  }
  handleClickOfViewDashboardAdmin(){
    this.props.propertyProps.history.push('/dashboard');
  }
  componentDidUnMount() {
    global.previous = '';
    global.current = '';
  }
  
  render() {
    console.log('in component will receive props')
    console.log(this.props)
    const urlName = window.location.pathname;
    const UrlQueryStrings = this.props.location.search;
    const queryValues = queryString.parse(UrlQueryStrings);
    console.log(queryValues.type); 
    const type = queryValues.type
    return (

      <Card className="ant-card">

        <Breadcrumb separator=">">
          <Breadcrumb.Item><span className="gx-link"><Icon type="home" onClick={this.handleHomeChange.bind(this)} /></span></Breadcrumb.Item>
          {userData.role === 3 && urlName === '/reviewProposal' ? <Breadcrumb.Item><span>Review Proposal</span></Breadcrumb.Item> : null}
          {userData.role === 3 && urlName === '/profile' ? <Breadcrumb.Item><span>Profile</span></Breadcrumb.Item> : null}
          {userData.role === 3 && urlName === '/viewProposal'
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfReviewProposalReviewer.bind(this)}>Review Proposal</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>View Proposal</span></Breadcrumb.Item>] : null}
              {userData.role === 3 && urlName === '/viewAmendment'
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfReviewAmendmentReviewer.bind(this)}>Review Amendment</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>View Amendment</span></Breadcrumb.Item>] : null}
              
          {userData.role === 3 && urlName === '/proposalReviewForm'
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfReviewProposalReviewer.bind(this)}>Review Proposal</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>Review Form</span></Breadcrumb.Item>] : null}

{userData.role === 3 && urlName === '/amendmentReviewForm'
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfReviewAmendmentReviewer.bind(this)}>Review Amendment</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>Review Form</span></Breadcrumb.Item>] : null}

{userData.role === 3 && urlName === '/reviewAmendment'?
           
              <Breadcrumb.Item><span>Review Amendment</span></Breadcrumb.Item> : null}

{userData.role === 4 && urlName === '/reviewAmendment'?
           
           <Breadcrumb.Item><span>Review Amendment</span></Breadcrumb.Item> : null}

          {userData.role === 4 && urlName === '/reviewProposal' ? <Breadcrumb.Item><span>Review Proposal</span></Breadcrumb.Item> : null}
          {userData.role === 4 && urlName === '/profile' ? <Breadcrumb.Item><span>Profile</span></Breadcrumb.Item> : null}
          {userData.role === 4 && urlName === '/viewProposal'
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfReviewProposalReviewer.bind(this)}>Review Proposal</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>View Proposal</span></Breadcrumb.Item>] : null}
               {userData.role === 4 && urlName === '/viewAmendment'
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfReviewAmendmentReviewer.bind(this)}>Review Amendment</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>View Amendment</span></Breadcrumb.Item>] : null}
               {userData.role === 4 && urlName === '/proposalReviewForm'
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfReviewProposalReviewer.bind(this)}>Review Proposal</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>Review Form</span></Breadcrumb.Item>] : null}
              

              {userData.role === 4 && urlName === '/amendmentReviewForm'
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfReviewAmendmentReviewer.bind(this)}>Review Amendment</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>Review Form</span></Breadcrumb.Item>] : null}

          {userData.role === 2 && urlName === '/profile' ? <Breadcrumb.Item><span>Profile</span></Breadcrumb.Item> : null}
          {userData.role === 2 && urlName === '/userManagement' ? <Breadcrumb.Item><span>User Management</span></Breadcrumb.Item> : null}
          {userData.role === 2 && urlName === '/manageAnnouncement' ? <Breadcrumb.Item><span>Manage Announcement</span></Breadcrumb.Item> : null}
          {userData.role === 2 && urlName === '/manageAmendment' ? <Breadcrumb.Item><span>Manage Amendment</span></Breadcrumb.Item> : null}


          {userData.role === 2 && urlName === '/viewUser'
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfViewUser}>User Management</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>View User</span></Breadcrumb.Item>] : null}

          {userData.role === 2 && urlName === '/addAnnouncement'
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfManageAnnouncement}>Manage Announcement</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>Add Announcement</span></Breadcrumb.Item>] : null}

          {userData.role === 2 && urlName === '/editAnnouncement'
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfManageAnnouncement}>Manage Announcement</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>Edit Announcement</span></Breadcrumb.Item>] : null}

          {userData.role === 2 && urlName === '/searchContent' ? <Breadcrumb.Item><span>Seach Content</span></Breadcrumb.Item> : null}

          {userData.role === 2 && urlName === '/inviteUser'
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfInviteUserFormCoordinator.bind(this)}>User Management</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>Invite User</span></Breadcrumb.Item>] : null}
          {userData.role === 2 && urlName === '/manageProposal' ? <Breadcrumb.Item><span>Manage Proposal</span></Breadcrumb.Item> : null}


          {userData.role === 2 && urlName === '/manageResearch' ? <Breadcrumb.Item><span>Manage Research</span></Breadcrumb.Item> : null}


          {userData.role === 2 && urlName === '/viewProposal'
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfViewProposalCoordinator.bind(this)}>Manage Proposal</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>View Proposal</span></Breadcrumb.Item>] : null}

{userData.role === 2 && urlName === '/viewAmendment'
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfViewAmendmentCoordinator.bind(this)}>Manage Amendment</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>View Amendment</span></Breadcrumb.Item>] : null}


{userData.role === 2 && urlName === '/viewNotification' &&  this.props.location.state && this.props.location.state.prevRoute==="manageProposal"
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleManageProposalClick.bind(this)}>Manage Proposal</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>View Notification</span></Breadcrumb.Item>] : null}
              
              {userData.role === 2 && urlName === '/viewAmendmentNotification'
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleManageAmendmentClick.bind(this)}>Manage Amendment</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>View Amendment Notification</span></Breadcrumb.Item>] : null}


       {userData.role === 2 && urlName === '/viewNotification' &&  this.props.location.state && this.props.location.state.prevRoute==="manageResearch"
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfManageResearchCoordinator.bind(this)}>Manage Research</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>View Notification</span></Breadcrumb.Item>] : null}       

          {userData.role === 2 && urlName === '/viewResearch'
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfManageResearchCoordinator.bind(this)}>Manage Research</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>View Research</span></Breadcrumb.Item>] : null}

          {userData.role === 2 && urlName === '/viewReviewForm'
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfViewProposalCoordinator.bind(this)}>Manage Proposal</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>Review Form</span></Breadcrumb.Item>] : null}    


          {userData.role === 2 && urlName === '/acceptanceLetter'
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfManageResearchCoordinator.bind(this)}>Manage Research</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>Acceptance Letter</span></Breadcrumb.Item>] : null}


          {userData.role === 2 && urlName === '/manageCommittee' ? <Breadcrumb.Item><span>Manage Committee</span></Breadcrumb.Item> : null}
          {userData.role === 2 && urlName === '/addMember'
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfAddCommitteeMemberCoordinator.bind(this).bind(this)}>Manage Committee</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>Add Member</span></Breadcrumb.Item>] : null}
          {userData.role === 2 && urlName === '/viewCommitteeMember'
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfViewCommitteeMemberCoordinator.bind(this).bind(this)}>Manage Committee</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>View Committee Member</span></Breadcrumb.Item>] : null}

          {userData.role === 2 && urlName === '/manageReports'
            ? [<Breadcrumb.Item><span>Manage Reports</span></Breadcrumb.Item>,
    ]: null}   
     {userData.role === 2 && urlName === '/viewAmendmentReviewForm'
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfManageAmendmentCoordinator.bind(this).bind(this)}>Manage Amendment</span></Breadcrumb.Item>,
            <Breadcrumb.Item><span>Amendment Review Form </span></Breadcrumb.Item>,
    ]: null}    
          {userData.role === 6 && urlName === '/profile' ? <Breadcrumb.Item><span>Profile</span></Breadcrumb.Item> : null}
          {userData.role === 6 && urlName === '/manageProposal' ? <Breadcrumb.Item><span>Manage Proposal</span></Breadcrumb.Item> : null}
          {userData.role === 6 && urlName === '/manageResearch' ? <Breadcrumb.Item><span>Manage Research</span></Breadcrumb.Item> : null}
          {userData.role === 6 && urlName === '/searchContent' ? <Breadcrumb.Item><span>Search Content</span></Breadcrumb.Item> : null}
          {userData.role === 6 && urlName === '/viewNotification'
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfViewProposalInvestigator.bind(this)}>Manage Proposal</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>View Notification</span></Breadcrumb.Item>] : null}

              
          {userData.role === 6 && urlName === '/newProposal'
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfNewProposal.bind(this).bind(this)}>Manage Proposal</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>New Proposal</span></Breadcrumb.Item>] : null}
          {userData.role === 6 && urlName === '/viewProposal'
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfViewProposalInvestigator.bind(this).bind(this)}>Manage Proposal</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>View Proposal</span></Breadcrumb.Item>] : null}

{userData.role === 6 && urlName === '/viewAmendment'
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfViewAmendmentInvestigator.bind(this).bind(this)}>Manage Amendment</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>View Amendment</span></Breadcrumb.Item>] : null}
          {userData.role === 6 && urlName === '/acceptanceLetter'
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfManageResearchInvestigator.bind(this).bind(this)}>Manage Research</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>Acceptance Letter</span></Breadcrumb.Item>] : null}

          {userData.role === 6 && urlName === '/viewResearch'
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfViewResearchInvestigator.bind(this).bind(this)}>Manage Research</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>View Research</span></Breadcrumb.Item>] : null}

          {userData.role === 6 && urlName === '/reportSubmission' && type == 0
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfViewResearchInvestigator.bind(this).bind(this)}>Manage Research</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>Intermediate Report Submission</span></Breadcrumb.Item>] : 
              null}  

          {userData.role === 6 && urlName === '/reportSubmission' && type == 1
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfViewResearchInvestigator.bind(this).bind(this)}>Manage Research</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>Final Report Submission</span></Breadcrumb.Item>] : 
              null}   

              {userData.role === 6 && urlName === '/reportSubmission' && type == 2
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfViewResearchInvestigator.bind(this).bind(this)}>Manage Research</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>Data Submission</span></Breadcrumb.Item>] : 
              null}        


        {userData.role === 6 && urlName === '/finalReportSubmission'
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfViewResearchInvestigator.bind(this).bind(this)}>Manage Research</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>Final Report Submission</span></Breadcrumb.Item>] : null}  


        {userData.role === 6 && urlName === '/dataReportSubmission'
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfViewResearchInvestigator.bind(this).bind(this)}>Manage Research</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>Data Report Submission</span></Breadcrumb.Item>] : null} 

          {userData.role === 6 && urlName === '/editProposal'
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleManageProposalClick.bind(this).bind(this)}>Manage Proposal</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>Edit Proposal</span></Breadcrumb.Item>] : null}


{userData.role === 6 && urlName === '/withDrawProposal'
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfViewProposalInvestigator.bind(this).bind(this)}>Manage Proposal</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>Withdraw Proposal</span></Breadcrumb.Item>] : null}


{userData.role === 6 && urlName === '/withDrawAmendment'
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfViewResearchInvestigator.bind(this).bind(this)}>Manage Research</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>Amendment Withdrawal</span></Breadcrumb.Item>] : null}

{userData.role === 6 && urlName === '/termExtensionRequest'
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfViewResearchInvestigator.bind(this).bind(this)}>Manage Research</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>Term Extension Request</span></Breadcrumb.Item>] : null}

{userData.role === 6 && urlName === '/amendmentRequest'
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfViewResearchInvestigator.bind(this).bind(this)}>Manage Research</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>Amendment Request</span></Breadcrumb.Item>] : null}
        


          {urlName === '/resetPassword' ?[<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfResetPasswordExceptInvestigation.bind(this)}>Profile</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>Reset Password</span></Breadcrumb.Item>] : null} 

          {urlName === '/internalResetPassword' ?[<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfResetPasswordExceptInvestigation.bind(this)}>Profile</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>Reset Password</span></Breadcrumb.Item>] : null} 


          {userData.role === 1 && urlName === '/userManagement' ? <Breadcrumb.Item><span>Course Schedule</span></Breadcrumb.Item> : null}
          {userData.role === 1 && urlName === '/editAnnouncement'
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfManageAnnouncement}>Manage Announcement</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>Edit Announcement</span></Breadcrumb.Item>] : null}
         
         {userData.role === 1 && urlName === '/addAnnouncement'
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfManageAnnouncement}>Manage Announcement</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>Add Announcement</span></Breadcrumb.Item>] : null}
          
          {userData.role === 1 && urlName === '/inviteUser'
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfInviteUserAdmin.bind(this).bind(this)}>User Management</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>Invite User</span></Breadcrumb.Item>] : null}
             
             {userData.role === 1 && urlName === '/viewUser'
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfViewUser}>User Management</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>View User</span></Breadcrumb.Item>] : null}
           {userData.role === 1 && urlName === '/manageAnnouncement'
            ? [<Breadcrumb.Item><span>Manage Announcement</span></Breadcrumb.Item>] : null}
  
         
          {userData.role === 5 && urlName === '/searchContent' ? <Breadcrumb.Item><span>Search Content</span></Breadcrumb.Item> : null}

          {userData.role === 5 && urlName === '/signProposal' ? <Breadcrumb.Item><span>Sign Proposal</span></Breadcrumb.Item> : null}
          {userData.role === 5 && urlName === '/signAmendment' ? <Breadcrumb.Item><span>Sign Amendment</span></Breadcrumb.Item> : null}
          {userData.role === 5 && urlName === '/manageResearch' ? <Breadcrumb.Item><span>Manage Research</span></Breadcrumb.Item> : null}
          {userData.role === 5 && urlName === '/viewResearch' ? <Breadcrumb.Item><span>View Research</span></Breadcrumb.Item> : null}

          {userData.role === 5 && urlName === '/viewProposal'
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfViewProposalChair.bind(this).bind(this)}>Sign Proposal</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>View Proposal</span></Breadcrumb.Item>] : null}

{userData.role === 5 && urlName === '/viewAmendment'
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfViewAmendmentChair.bind(this).bind(this)}>Sign Amendment</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>View Amendment</span></Breadcrumb.Item>] : null}

          {userData.role === 5 && urlName === '/researchPdf'
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfSignContentChair.bind(this)}>Sign Proposal</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>Research Pdf</span></Breadcrumb.Item>] : null}

               {userData.role === 5 && urlName === '/amendmentResearchPdf'
            ? [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfSignAmendmentContentChair.bind(this)}>Sign Amendment</span></Breadcrumb.Item>,
              <Breadcrumb.Item><span>Amendment Pdf</span></Breadcrumb.Item>] : null}

          {userData.role === 5 && urlName === '/profile' ? <Breadcrumb.Item><span>Profile</span></Breadcrumb.Item> : null}
          {userData.role === 1 && urlName === '/profile' ? <Breadcrumb.Item><span>Profile</span></Breadcrumb.Item> : null}
          {(userData.role === 1 ||userData.role===2 )&& urlName === '/dashboard' ? <Breadcrumb.Item><span>Dashboard</span></Breadcrumb.Item> : null}
          {(userData.role === 1 ||userData.role===2 )&& urlName === '/historicalData' ? [<Breadcrumb.Item><span  className="gx-link" onClick={this.handleClickOfViewDashboardAdmin.bind(this)}>Dashboard</span></Breadcrumb.Item>,
        <Breadcrumb.Item>Historic Data</Breadcrumb.Item>] : null}

          {userData.role === 7 && urlName === '/profile' ? <Breadcrumb.Item><span>Profile</span></Breadcrumb.Item> : null}
          {userData.role === 7 && urlName === '/manageReports' ? <Breadcrumb.Item><span>Manage Reports</span></Breadcrumb.Item> : null}

          {(userData.role === 8 || userData.role ===9||userData.role === 10 )&& urlName === '/manageRequests' ? <Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfSignAmendmentContentChair.bind(this)}>Manage Requests</span></Breadcrumb.Item> : null}
          {(userData.role === 8 || userData.role === 9 || userData.role === 10 )&& urlName === '/profile' ? <Breadcrumb.Item><span>Profile</span></Breadcrumb.Item> : null}
          {userData.role === 8 && urlName === '/reports' ? <Breadcrumb.Item><span>Reports</span></Breadcrumb.Item> : null}


          {userData.role === 8 && urlName === '/viewDataRequest' ? 
        [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfManageDataRequestSeniorStatician.bind(this)}>Manage Requests</span></Breadcrumb.Item> ,
        <Breadcrumb.Item>View Data Request</Breadcrumb.Item>]:null
        }

{userData.role === 8 && urlName === '/historicData' ? 
        [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfViewDataRequestSeniorStatician.bind(this)}>Reports</span></Breadcrumb.Item>,
        <Breadcrumb.Item>Historical Data</Breadcrumb.Item>]:null
        }

      {userData.role === 9 && urlName === '/viewDataRequest' ? 
        [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfViewDataRequestPSHMS.bind(this)}>Manage Requests</span></Breadcrumb.Item> ,
        <Breadcrumb.Item>View Data Request</Breadcrumb.Item>]:null
        }

      {userData.role === 10 && urlName === '/viewDataRequest' ? 
        [<Breadcrumb.Item><span className="gx-link" onClick={this.handleClickOfViewDataRequestHOR.bind(this)}>Manage Requests</span></Breadcrumb.Item> ,
        <Breadcrumb.Item>View Data Request</Breadcrumb.Item>]:null
        }

        </Breadcrumb>
      </Card>

    );
  }
}


const mapStateToProps = ({ auth }) => {
  const { authUser } = auth;
  return { authUser };
};



const MyComponent = connect(mapStateToProps)(BreadcrumbDemo);
export default withRouter(MyComponent);
