module.exports.policies = {

  auth: {
    '*': true,
  },

  investigator: {
    '*': ['isAuthenticated'],
    registration: true,
    deleteInvestigator: ['isAuthenticated'],
    // getInvestigator: ['isAuthenticated'],
    updateInvestigator: ['isAuthenticated'],
    proposalHistory: ['isInvestigator'],
    investigatorconfirmAccount: true,
    getInvestigator:true,
    getInvestigatorWithAuth: ['isAuthenticated'],
    
  },
// courseSchedule:{
//   getAllCourseData:['isAuthenticated'],
// },
  internalUser: {
    '*': ['isAuthenticated'],
    deleteInternalUser: ['isAuthenticated'],
    // getInternalUser: ['isAuthenticated'],
    updateInternalUser: ['isAuthenticated'],
    sendInvite: ['isAuthenticated'],
    getAllInternalUser: ['isAuthenticated'],
    checkCoordinatorChairPresent: true,
    getInternalUsersExceptCordinator: ['isAuthenticated'],
    addCommittee: ['isAuthenticated'],
    getAllInternalReviewer: ['isAuthenticated'],
    getAllExternalReviewer: ['isAuthenticated'],
    getInternalUser:true,
    getInternalUserWithAuth:['isAuthenticated'],
    deleteCommiteeMember:['isAuthenticated'],
    UniversityUserReports:['isAuthenticated'],
  },

  application: {
    // '*': true,
    '*': ['isAuthenticated'],
    getAllProposal: true,
    saveProposal: ['isAuthenticated'],
    deleteProposal: ['isAuthenticated'],
    getProposal: ['isAuthenticated'],
    getInvestigatorProposals: ['isAuthenticated'],
    markCompleteProposal: ['isAuthenticated'],
    markCompleteAmendment: ['isAuthenticated'],
    markIncompleteProposal: ['isAuthenticated'],
    assignReviewType:['isAuthenticated','isCoordinator'],
    assignReviewers: ['isAuthenticated','isCoordinator'],
    proposalHistory:['isAuthenticated','isCoordinator',],
    getAllResearchForCoordinatorWithAuth :['isAuthenticated','isCoordinator',],
    getResearchForViewWithAuth :['isAuthenticated'],
    getResearchesForInvestigator: true,
    getAllResearchForCoordinator: true,
    getResearchForView:true,
    searchResearch:true,
    getProposalForView:['isAuthenticated'],
    getAllProposalForSign: ['isChair'],
    getAllResearchForInvestigator:['isInvestigator'],
    markProposalAsResearch:['isAuthenticated'],

  },
  announcement:{
    '*': ['isAuthenticated','isCoordinatorOrAdmin'],
    getAnnouncements: true,
    getAnnouncementById:true,
    getActiveAnnouncements: true,
    announcementsByIdWithAuth: ['isAuthenticated','isCoordinatorOrAdmin'],
  },
  report:{
    '*': ['isAuthenticated'],
    saveReportType:['isAuthenticated'],
    // reportForCoordinator:['isAuthenticated'],
    reportForCoordinator:true,
  }
};
