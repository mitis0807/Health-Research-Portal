module.exports.serverMessage = {

  // AuthController.js

  // isAuthenticated
  auth: 'Authenticated user',
  userSessionExpired: 'User session has expired. Kindly login again',
  pleaseLogin: 'Please login',
  loginSuccess: 'Login successfully',

  // processLogin
  loginError: 'Error occurred while logIn',
  somethingWrong: 'Something went wrong. Please try again later.',

  // logout
  logoutSuccess: 'Logout successfully',

  // confirmAccount
  errorconfirmAccount: 'Oops! Something went wrong. Please try again later after sometime',
  invalidURL: 'Invalid request URL. Please check the URL and try again.',
  confirmedRegistration: 'This account is already registered. Please login with your email and password.',
  validUser: 'User is valid',
  confirmSuccess: 'Password set successfully. Please login with email and password.',

  // setPassword
  passwordValidation: 'Password required',
  confirmPasswordValidation: 'Confirm Password required',
  passwordMatch: 'Password & Confirm Password should match',

  // investigatorconfirmAccount

  // investigatorSetPassword

  // resetPassword
  notConfirmedRegistration: 'You have not confirmed your registration. Please verify your account before setting password.',
  successResetPassword: 'You have successfully reset your password. Please login with your email and password.',
  linkExpired:'Password reset link is invalid or has expired',
  // ApplicationController.js

  // getInvestigatorProposals
  serverError: 'Server error. Please try again later',


  // saveProposal
  proposalUpdateSuccess: 'Proposal details updated successfully',
  proposalSavedSuccess: 'Proposal details saved successfully',
  uploadFileSuccess: 'File uploaded successfully.',

  // deleteProposal
  proposalDeleteSuccess: 'Proposal deleted successfully',

  // markIncompleteProposal
  proposalIncomplete: 'Proposal marked as incomplete',

  // markCompleteProposal
  proposalComplete: 'Proposal marked as completed',

  // assignReviewType
  reviewTypeAssigned: 'Review type assigned',
  proposalAssignedForReview: 'Propsal assigned for review',

  // rejectProposalByReviewer
  proposalRejectReviewer: 'Proposal is rejected',

  // markProposalUnderSigned
  proposalUnderSign: 'Proposal has been accepted and sent to chair.',

  // markProposalAsResearch
  proposalMarkedResearch: 'Proposal marked as research',

  // rejectProposalByCoordinator
  rejectProposal: 'Proposal is rejected',


  // generateForgotPasswordLink
  setPassworkLink: 'Email has been sent to your registered email with link to reset password.',

  // InternalUserController

  // registration
  emailAlreadyPresent: 'Email already registered.',
  registeredSuccess: 'You have successfully registered.Please check email to verify and confirm account.',

  // deleteInternalUser
  internalUserDelete: 'Internal user deleted successfully',

  // updateInternalUser
  internalUserUpdate: 'Internal user details updated successfully',
  adminUserUpdate:'Admin profile updated successfully',
  coordinatorUserUpdate:'Coordinator profile updated successfully',
  internalReviewerUpdate:'Internal reviewer profile updated successfully',
  externalReviewerUpdate:'External reviewer profile updated successfully',
  chairUserUpdate :'Chair profile updated successfully',
  universityUserUpdate:'University user profile updated successfully',
  statisticianUserUpdate:'Senior statistician profile updated successfully',
  secretaryUserUpdate:'Secretary profile updated successfully',
  headUserUpdate:'Head profile updated successfully',

  // sendInvite
  emailRoleValidation: 'Please enter valid email & role',
  inviteSuccess: 'Invite sent successfully',

  // addCommittee
  committeeSuccess: 'Committee created successfully',

  // deleteCommiteeMember
  committeeMemberDelete: 'Internal user deleted successfully',

  // InvestigatorController.js

  // deleteInvestigator
  investigatorDeleteSuccess: 'Investigator deleted successfully',

  // updateInvestigator
  investigatorDetailsSuccess: 'Investigator details saved successfully',

  //uploadReport
  fileUploadError: 'Only .doc, .docx, .xls, .xlsx files are allowed and should not exceed 5Mb',
  setReportTypeSuccess : 'Report type updated successfully.',
  uploadReportSuccess : 'Report uploaded successfully.',
  reportURLFound: 'Report URL Found',

  //Withdraw proposal
  proposalWithdrawn:'Proposal withdrawn successfully.',
  invalidWithdrawProcess: 'Withdraw process is not valid.',

  // Announcements
  announcementUpdated: 'Announcement updated successfully',

  //Term Extension
  appliedForTermExtension:'You have successfully applied for term extension',
  failedToApply:'There is an error applying for term extension, please try again',
  invalidExtension:'Invalid term extension application',
  invalidCountExtension:'You have exceeded the permitted limit for term extension',
  
  //Make Amendment 
  researchNotFound:'Research does not exist',
  foundResearch:'Research found successfully',
  amendmentSavedSuccess: 'Amendment details saved successfully',
  amendmentComplete: 'Amendment marked as completed',
  amendmentIncomplete:'Amendment marked as incompleted',
  rejectAmendment:'Amendment is rejected',
  amendmentWithdrawn:'Amendment withdrawn successfully',
  amendmentUnderSign:'The amendment has been approved and sent to the chair',
  amendmentMarkedResearch: 'Amendment marked as research',


  // Data Request
  markRequestComplete : 'Data Request marked as completed',
  markRequestInComplete : 'Data Request marked as incompleted',
  refferedDataRequestSuccess : 'Reffered Data Request Successfully',
  markRequestApproved:'Successfully approved the data request',
  markRequestRejected:'Successfully rejected the data request'
};
