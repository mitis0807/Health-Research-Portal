module.exports.routes = {

  'get /*': { view: 'pages/homepage', skipAssets: true, skipRegex: /^\/api\/.*$/ },


  '/api/isAuthenticated': {
    controller: 'AuthController',
    action: 'isAuthenticated',
  },

  'POST /api/processLogin': {
    controller: 'AuthController',
    action: 'processLogin',
  },

  '/api/logout': {
    controller: 'AuthController',
    action: 'logout',
  },

  'POST /api/saveCourseScheduleForm': {
    controller: 'CourseScheduleController',
    action: 'saveCourseScheduleForm',
  },

  '/api/getAllCourseData': {
    controller: 'CourseScheduleController',
    action: 'getAllCourseData',
  },
  'POST /api/getCourseDetails': {
    controller: 'CourseScheduleController',
    action: 'getCourseDetails',
  },
  
  'POST /api/approveCourseByChair': {
    controller: 'CourseScheduleController',
    action: 'approveCourseByChair',
  },
  'POST /api/rejectCourseByChair': {
    controller: 'CourseScheduleController',
    action: 'rejectCourseByChair',
  },

  'POST /api/approveCourseByDean': {
    controller: 'CourseScheduleController',
    action: 'approveCourseByDean',
  },
  'POST /api/rejectCourseByDean': {
    controller: 'CourseScheduleController',
    action: 'rejectCourseByDean',
  },
  'POST /api/registration': {
    controller: 'InvestigatorController',
    action: 'registration',
  },

  /* Proposal Form Webservices */

  'POST /api/getProposal': {
    controller: 'ApplicationController',
    action: 'getProposal',
  },
  '/api/getProposalForView': {
    controller: 'ApplicationController',
    action: 'getProposalForView',
  },

  'POST /api/getResearchForView': {
    controller: 'ApplicationController',
    action: 'getResearchForView',
  },
  'POST /api/getResearchForViewWithAuth': {
    controller: 'ApplicationController',
    action: 'getResearchForViewWithAuth',
  },
  'POST /api/getProposalExpectInvestigator': {
    controller: 'ApplicationController',
    action: 'getProposalExpectInvestigator',
  },

  'GET /api/getAllProposal': {
    controller: 'ApplicationController',
    action: 'getAllProposal',
  },

  'GET /api/getInvestigatorProposals': {
    controller: 'ApplicationController',
    action: 'getInvestigatorProposals',
  },

  'POST /api/saveProposal': {
    controller: 'ApplicationController',
    action: 'saveProposal',
  },

  'POST /api/submitProposal': {
    controller: 'ApplicationController',
    action: 'submitProposal',
  },

  'POST /api/deleteProposal': {
    controller: 'ApplicationController',
    action: 'deleteProposal',
  },

  'POST /api/markCompleteProposal': {
    controller: 'ApplicationController',
    action: 'markCompleteProposal',
  },

  'POST /api/markIncompleteProposal': {
    controller: 'ApplicationController',
    action: 'markIncompleteProposal',
  },

  'POST /api/assignReviewType': {
    controller: 'ApplicationController',
    action: 'assignReviewType',
  },

  'POST /api/rejectProposalByCoordinatorAfterReview': {
    controller: 'ApplicationController',
    action: 'rejectProposalByCoordinatorAfterReview',
  },

  'POST /api/responseByReviewer': { // confirm this API with team
    controller: 'InternalUserController',
    action: 'responseByReviewer',
  },


  'POST /api/markProposalUnderSigned': {
    controller: 'ApplicationController',
    action: 'markProposalUnderSigned',
  },

  '/api/markProposalAsResearch': {
    controller: 'ApplicationController',
    action: 'markProposalAsResearch',
  },

  'GET /api/getAllProposalForSign': {
    controller: 'ApplicationController',
    action: 'getAllProposalForSign',
  },

  'GET /api/getAllResearchForInvestigator': {
    controller: 'ApplicationController',
    action: 'getAllResearchForInvestigator',
  },

  'GET /api/getAllResearchForCoordinator/:pageNo': {
    controller: 'ApplicationController',
    action: 'getAllResearchForCoordinator',
  },
  'GET /api/getAllResearchForCoordinatorWithAuth/:pageNo': {
    controller: 'ApplicationController',
    action: 'getAllResearchForCoordinatorWithAuth',
  },

  'GET /api/getAllProposalResearchForCoordinator': {
    controller: 'ApplicationController',
    action: 'getAllProposalResearchForCoordinator',
  },

  /* Investigator Webservices */

  'POST /api/deleteInvestigator': {
    controller: 'InvestigatorController',
    action: 'deleteInvestigator',
  },

  'POST /api/getInvestigator': {
    controller: 'InvestigatorController',
    action: 'getInvestigator',
  },
  'POST /api/getInvestigatorWithAuth': {
    controller: 'InvestigatorController',
    action: 'getInvestigatorWithAuth',
  },

  'POST /api/updateInvestigator': {
    controller: 'InvestigatorController',
    action: 'updateInvestigator',
  },

  'POST /api/investigatorconfirmAccount': {
    controller: 'AuthController',
    action: 'confirmInvestigatorAccount',
  },

  'POST /api/setInvestigatorPassword': {
    controller: 'AuthController',
    action: 'investigatorSetPassword',
  },

  'GET /api/getAllInvestigator': {
    controller: 'InvestigatorController',
    action: 'getAllInvestigator',
  },

  /* Internal User Webservices */

  'POST /api/deleteInternalUser': {
    controller: 'InternalUserController',
    action: 'deleteInternalUser',
  },

  'POST /api/getInternalUser': {
    controller: 'InternalUserController',
    action: 'getInternalUser',
  },
  'POST /api/getInternalUserWithAuth': {
    controller: 'InternalUserController',
    action: 'getInternalUserWithAuth',
  },

  'POST /api/updateInternalUser': {
    controller: 'InternalUserController',
    action: 'updateInternalUser',
  },

  'POST /api/sendInvite': {
    controller: 'InternalUserController',
    action: 'sendInvite',
  },

  'POST /api/confirmAccount': {
    controller: 'AuthController',
    action: 'confirmAccount',
  },

  'POST /api/setPassword': {
    controller: 'AuthController',
    action: 'setPassword',
  },

  'POST /api/resetPassword': {
    controller: 'AuthController',
    action: 'resetPassword',
  }, 
  'POST /api/resetPasswordWithAuth': {
    controller: 'AuthController',
    action: 'resetPasswordWithAuth',
  }, 
  
  'GET /api/checkCoordinatorChairPresent': {
    controller: 'InternalUserController',
    action: 'checkCoordinatorChairPresent',
  },

  'GET /api/getAllProposalForReviewer': {
    controller: 'InternalUserController',
    action: 'getAllProposalForReviewer',
  },

  'POST /api/submitReview': {
    controller: 'ReviewFormController',
    action: 'submitReview'
  },
  'POST /api/getReviewForm': { 
    controller: 'ReviewFormController',
    action: 'getReviewForm'
  },
  '/api/getAllInternalUser': {
    controller: 'InternalUserController',
    action: 'getAllInternalUser',
  },
  'GET /api/universityUsers/:pageNo': {
    controller: 'InternalUserController',
    action: 'getUniversityUsers',
  },
  '/api/getInternalUsersExceptCordinator': {
    controller: 'InternalUserController',
    action: 'getInternalUsersExceptCordinator',
  },

  'POST /api/addCommittee': {
    controller: 'InternalUserController',
    action: 'addCommittee',
  },

  // 'GET /api/getAllInternalReviewer/:pageNo': {
  //   controller: 'InternalUserController',
  //   action: 'getAllInternalReviewer',
  // },
  'GET /api/getAllInternalReviewer': {
    controller: 'InternalUserController',
    action: 'getAllInternalReviewer',
  },


  'GET /api/getAllExternalReviewer': {
    controller: 'InternalUserController',
    action: 'getAllExternalReviewer',
  },

  'POST /api/assignReviewersToProposal' :{ 
    controller: 'ApplicationController',
    action: 'assignReviewers',
  },

  'GET /api/getAllCommitteeMember': {
    controller: 'InternalUserController',
    action: 'getAllCommitteeMember',
  },

  'POST /api/deleteCommiteeMember': {
    controller: 'InternalUserController',
    action: 'deleteCommiteeMember',
  },

  
  'POST /api/generateForgotPasswordLink': {
    controller: 'ForgotPasswordController',
    action: 'generateForgotPasswordLink',
  },
  'POST /api/getForgotPasswordLinkStatus': { // pending
    controller: 'ForgotPasswordController',
    action: 'getForgotPasswordLinkStatus',
  },

  'POST /api/uploadApplicationDocument': {
    controller: 'ApplicationController',
    action: 'uploadApplicationDocument',
  },

  'POST /api/saveReportType': {
    controller: 'ReportController',
    action: 'saveReportType',
  },
  'POST /api/updateReport': { // pending because of files
    controller: 'ReportController',
    action: 'updateReport',
  },

  'POST /api/announcements': {
    controller: 'AnnouncementController',
    action: 'saveAnnouncement',
  },
  'DELETE /api/announcements/:announcementId': {
    controller: 'AnnouncementController',
    action: 'deleteAnnouncement',
  },
  'PATCH /api/announcements/:announcementId': {
    controller: 'AnnouncementController',
    action: 'updateAnnouncement',
  },
  'GET /api/announcements/:pageNo': {
    controller: 'AnnouncementController',
    action: 'getAnnouncements',
  },
  'GET /api/announcementsById/:announcementId': {
    controller: 'AnnouncementController',
    action: 'getAnnouncementById',
  },
  'GET /api/announcementsByIdWithAuth/:announcementId': {
    controller: 'AnnouncementController',
    action: 'announcementsByIdWithAuth',
  },
  'GET /api/activeAnnouncements/:pageNo': {
    controller: 'AnnouncementController',
    action: 'getActiveAnnouncements',
  },
  'PATCH /api/rejectProposalByCoordinator/:proposalId': {
    controller: 'ApplicationController',
    action: 'rejectProposalByCoordinator',
  },
  'GET /api/history/:proposalId': {
    controller: 'ApplicationController',
    action: 'proposalHistory',
  },
  'GET /api/proposals/:searchTerm': {
    controller: 'ApplicationController',
    action: 'searchProposal',
  },
  'GET /api/researches/:searchTerm': {
    controller: 'ApplicationController',
    action: 'searchResearch',
  },
  'GET /api/searchAnnouncements/:searchTerm': {
    controller: 'AnnouncementController',
    action: 'searchAnnouncements',
  },
  
  'POST /api/contactUs':{
    controller: 'ContactUsController',
    action: 'createContactform'
  },
 
  'GET /api/investigatorHistory/:proposalId': {
    controller: 'InvestigatorController',
    action: 'proposalHistory',
  },
  'GET /api/reportForCoordinator/:proposalId/:reportType': {
    controller: 'ReportController',
    action: 'reportForCoordinator',
  },

  'POST /api/withdrawProposal': {
    controller:'ApplicationController',
    action: 'withdrawProposal'
  },

  'POST /api/requestTermExtension':{
    controller:'ApplicationController',
    action:'requestTermExtension'
  },
  'POST /api/forwardTermExtension':{
    controller:'ApplicationController',
    action:'forwardTermExtension'
  },
  'GET /api/getAllTermExtension/:pageNo':{
    controller:'ApplicationController',
    action:'getAllTermExtension'
  },
  'POST /api/approvedTermExtenstion':{
    controller:'ApplicationController',
    action:'approvedTermExtenstion'
  },
  'POST /api/rejectedTermExtenstion':{
    controller:'ApplicationController',
    action:'rejectedTermExtenstion'
  },
  'POST /api/forwardTermExtenstionResponse':{
    controller:'ApplicationController',
    action:'forwardTermExtenstionResponse'
  },

  'GET /api/downloadReportUniversityUser':{
    controller:'InternalUserController',
    action:'downloadReportUniversityUser'
  },

  'POST /api/universityUserReports':{ // file upload via swagger
    controller:'InternalUserController',
    action:'saveUniversityUserReports'
  },

  //data request API
  'POST /api/saveDataRequest':{ 
    controller:'DataRequestController',
    action:'saveDataRequest'
  },
  'GET /api/trackDataRequest/:docketNo':{
    controller:'DataRequestController',
    action:'trackDataRequest'
  },
  'PATCH /api/dataRequest/:requestId':{ 
    controller:'DataRequestController',
    action:'updateDataRequest'
  },
  'PATCH /api/uploadDataRequestDocument/:requestId': {
    controller: 'DataRequestController',
    action: 'uploadDocument',
  },

  /**Amendment APIs */
  'POST /api/amendmentRequest':{
    controller:'AmendmentController',
    action:'saveAmendment'
  },
  'GET /api/amendmentHistory/:proposalId': {
    controller: 'AmendmentController',
    action: 'amendmentHistory',
  },
  'POST /api/getAmendmentExpectInvestigator': {
    controller: 'AmendmentController',
    action: 'getAmendmentExpectInvestigator',
  },
  'POST /api/amendmentDocumentUpload':{
    controller:'AmendmentController',
    action:'uploadAmendmentDocument'
  },
  'POST /api/amendmentUpdate':{
    controller:'AmendmentController',
    action:'updateAmendment'
  },
  'POST /api/markCompleteAmendment': {
    controller: 'AmendmentController',
    action: 'markCompleteAmendment',
  },
  'POST /api/markIncompleteAmendment': {
    controller: 'AmendmentController',
    action: 'markIncompleteAmendment',
  },
  'GET /api/allAmendments/:pageNo': {
    controller: 'AmendmentController',
    action: 'getAmendment',
  },
  'PATCH /api/rejectAmendmentByCoordinatorBeforeAssigningReview/:proposalId':{
    controller: 'AmendmentController',
    action: 'rejectAmendmentByCoordinatorBeforeAssigningReview',
  },
  'GET /api/amendmentByProposalId/:proposalId':{
    controller: 'AmendmentController',
    action:'getAmendmentByProposalId'
  },
  'POST /api/assignReviewTypeAfterAmendment':{
    controller: 'AmendmentController',
    action: 'assignReviewTypeAfterAmendment'
  },
  'POST /api/assignReviewersToAmendment':{
    controller: 'AmendmentController',
    action: 'assignReviewers'
  },
  'GET /api/allAmendmentForReviewer':{
    controller: 'InternalUserController',
    action: 'getAllAmendmentForReviewer'
  },
  'POST /api/responseByReviewerForAmendment': {
    controller: 'InternalUserController',
    action: 'responseByReviewerForAmendment',
  },
  'POST /api/submitReviewForAmendment': {
    controller: 'ReviewFormForAmendmentController',
    action: 'submitReview'
  },
  'GET /api/getReviewFormForAmendment/:proposalId': { 
    controller: 'ReviewFormForAmendmentController',
    action: 'getReviewForm'
  },
  'GET /api/searchAmendmentRequest/:searchTerm': { 
    controller: 'AmendmentController',
    action: 'searchAmendmentRequest'
  },

  'POST /api/withdrawAmendment': {
    controller:'AmendmentController',
    action: 'withdrawAmendment'
  },
  'POST /api/markAmendmentUnderSigned': {
    controller: 'AmendmentController',
    action: 'markAmendmentUnderSigned',
  },
  'POST /api/rejectAmendmentByCoordinatorAfterReview': {
    controller: 'AmendmentController',
    action: 'rejectAmendmentByCoordinatorAfterReview',
  },
  'GET /api/getAllAmendmentForSign': {
    controller: 'AmendmentController',
    action: 'getAllAmendmentForSign',
  },
  'POST /api/markAmendmentAsResearch': {
    controller: 'AmendmentController',
    action: 'markAmendmentAsResearch',
  },
  'GET /api/sortAllResearch/:pageNo/:sort':{
    controller:'DataRequestController',
    action:'sortAllResearch'
  },
// Data Requests APIs
  'GET /api/dataRequests/:pageNo':{
    controller:'DataRequestController',
    action:'dataRequests'
  },
  'GET /api/viewDataRequests/:docketNo':{
    controller:'DataRequestController',
    action:'viewDataRequest'
  },
  'GET /api/dataRequest/:searchTerm': {
    controller: 'DataRequestController',
    action: 'searchDataRequest',
  },
  'PATCH /api/markDataRequestComplete/:docketNo':{
    controller:'DataRequestController',
    action:'markDataRequestComplete'
  },
  'PATCH /api/markDataRequestInComplete/:docketNo':{
    controller:'DataRequestController',
    action:'markDataRequestInComplete'
  },  
  'PATCH /api/approveDataRequest/:docketNo':{
    controller:'DataRequestController',
    action:'approveDataRequest'
  },
  'PATCH /api/rejectDataRequest/:docketNo':{
    controller:'DataRequestController',
    action:'rejectDataRequest'
  }, 
  'PATCH /api/referDataRequest/:docketNo':{
    controller: 'DataRequestController',
    action: 'referDataRequest',
  }, 
  'PATCH /api/referDataRequestByHead/:docketNo':{
    controller: 'DataRequestController',
    action: 'referDataToPSHMSByHead',
  }, 
  'GET /api/dataRequestsOfPSHMS/:pageNo':{
    controller:'DataRequestController',
    action:'dataRequestsOfPSHMS'
  },
  'PATCH /api/approveDataRequestByPSHMS/:docketNo':{
    controller:'DataRequestController',
    action:'approveDataRequestByPSHMS'
  },
  'PATCH /api/rejectDataRequestByPSHMS/:docketNo':{
    controller:'DataRequestController',
    action:'rejectDataRequestByPSHMS'
  },
  'GET /api/dataRequestsOfHoRIDAMIT/:pageNo':{
    controller:'DataRequestController',
    action:'dataRequestsOfHoRIDAMIT'
  },
  'PATCH /api/approveDataRequestByHoRIDAMIT/:docketNo':{
    controller:'DataRequestController',
    action:'approveDataRequestByHoRIDAMIT'
  },
  'PATCH /api/rejectDataRequestByHoRIDAMIT/:docketNo':{
    controller:'DataRequestController',
    action:'rejectDataRequestByHoRIDAMIT'
  },
  //senior statician report
  'GET /api/currentMonthReportToSeniorStatician':{
    controller:'DataRequestController',
    action:'currentMonthReportToSeniorStatician'
  },
  'POST /api/generateReportMonthlyToSeniorStatician':{
    controller:'DataRequestController',
    action:'generateReportMonthlyToSeniorStatician'
  },
  'POST /api/generateReportYearlyToSeniorStatician':{
    controller:'DataRequestController',
    action:'generateReportYearlyToSeniorStatician'
  },
  //Dashboard for admin and coordinator

  'GET /api/dashboardForAdminAndCoordinator':{
    controller:'ApplicationController',
    action:'dashboardForAdminAndCoordinator'
  },
  'POST /api/monthlyDashboardForAdminAndCoordinator':{
    controller:'ApplicationController',
    action:'monthlyDashboardForAdminAndCoordinator'
  },
  'POST /api/yearlyDashboardForAdminAndCoordinator':{
    controller:'ApplicationController',
    action:'yearlyDashboardForAdminAndCoordinator'
  },
};
