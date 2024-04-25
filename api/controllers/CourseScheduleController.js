const { get } = require("grunt");
const path = require("path");
const AmendmentService = require("../services/AmendmentService");
const CourseScheduleService = require("../services/CourseScheduleService");

module.exports = {
  
//   deleteInternalUser(req, res) {
//     Logger.debug("InternalUserController.deleteInternalUser");
//     const internalUserId = req.body.internalUserId;
//     Logger.verbose(internalUserId);
//     if (!internalUserId) {
//       res.send({
//         status: 300,
//         message: sails.config.serverMessage.serverError,
//       });
//     } else {
//       InternalUserService.updateInternalUser(
//         internalUserId,
//         { isActive: false },
//         (err) => {
//           if (err) {
//             res.send({
//               status: 300,
//               message: sails.config.serverMessage.serverError,
//             });
//           } else {
//             res.send({
//               status: 200,
//               message: sails.config.serverMessage.internalUserDelete,
//             });
//           }
//         }
//       );
//     }
//   },

//   getInternalUser(req, res) {
//     Logger.debug("InternalUserController.getInternalUser");
//     const internalUserId = req.body.internalUserId;
//     console.log(internalUserId);
//     if (!internalUserId) {
//       res.send({
//         status: 300,
//         message: sails.config.serverMessage.serverError,
//       });
//     } else {
//       InternalUserService.getInternalUser(
//         internalUserId,
//         (err, internalUserData) => {
//           if (err) {
//             res.send({
//               status: 300,
//               message: sails.config.serverMessage.serverError,
//             });
//           } else if (!internalUserData) {
//             Logger.warn(
//               "InternalUserController.getInternalUser.findActiveById userModel undefined"
//             );
//             Logger.verbose(internalUserData);
//             return res.send({
//               status: 300,
//               message: sails.config.serverMessage.invalidURL,
//             });
//           } else {
//             res.send({ status: 200, internalUserData });
//           }
//         }
//       );
//     }
//   },
getCourseDetails(req, res) {
    Logger.debug("CourseScheduleController.getCourseDetails");
    const indCourseId = req.body.indCourseId;
    console.log(indCourseId);
    if (!indCourseId) {
      res.send({
        status: 300,
        message: sails.config.serverMessage.serverError,
      });
    } else {
      CourseScheduleService.getIndCourseData(
        indCourseId,
        (err, coursePerData) => {
          if (err) {
            res.send({status: 300,message: sails.config.serverMessage.serverError});
          } else if (!coursePerData) {
            Logger.warn("InternalUserController.getInternalUser.findActiveById userModel undefined");
            Logger.verbose(coursePerData);
            return res.send({status: 300,message: sails.config.serverMessage.invalidURL});
          } else {
            res.send({ status: 200, coursePerData });
          }
        }
      );
    }
  },
  approveCourseByChair(req, res) {
    Logger.debug("CouseSchedule.approveCourseByChair");
    Logger.debug(req.body);
    const id = req.body.id;
    const signedByChair = req.body.signedByChair
    Logger.verbose(id);
    CourseScheduleService.updateCourse(
      id,
      { signedByChair },
      
      (err, updatedCourse) => {
        if (err) {
          res.send({
            status: 300,
            message: sails.config.serverMessage.serverError,
          });
        } else {
          console.log("mark complete", updatedCourse);
          res.send({
            status: 200,
            courseData: updatedCourse,
            message: 'Course Marked as Approved',
          });
        //   EmailService.markCompleteProposalEmailToCoordinator(
        //     req.session.user,
        //     updatedProposal[0]
        //   );
        //   Investigator.findActiveById(
        //     updatedProposal[0].investigatorId.toString(),
        //     (findActiveByIdErr, investigator) => {
        //       if (findActiveByIdErr) {
        //         Logger.warn(findActiveByIdErr);
        //         res.send({
        //           status: 300,
        //           message: sails.config.serverMessage.serverError,
        //         });
        //       } else {
        //         // eslint-disable-next-line no-underscore-dangle
        //         updatedProposal[0]._id = new ObjectId(updatedProposal[0].id);
        //         EmailService.markCompleteProposalEmailToInvestigator(
        //           investigator,
        //           updatedProposal[0]
        //         );
        //         res.send({
        //           status: 200,
        //           proposalData: updatedProposal[0],
        //           message: sails.config.serverMessage.proposalComplete,
        //         });
        //       }
        //     }
        //   );
        }
      }
    );
  },
  
  rejectCourseByChair(req, res) {
    Logger.debug("CouseSchedule.rejectCourseByChair");
    Logger.debug(req.body);
    const id = req.body.id;
    const signedByChair = req.body.signedByChair
    Logger.verbose(id);
    CourseScheduleService.updateCourse(
      id,
      { signedByChair },
      
      (err, updatedCourse) => {
        if (err) {
          res.send({
            status: 300,
            message: sails.config.serverMessage.serverError,
          });
        } else {
          console.log("mark complete", updatedCourse);
          res.send({
            status: 200,
            courseData: updatedCourse,
            message: 'Course Marked as Reject',
          });
        //   EmailService.markCompleteProposalEmailToCoordinator(
        //     req.session.user,
        //     updatedProposal[0]
        //   );
        //   Investigator.findActiveById(
        //     updatedProposal[0].investigatorId.toString(),
        //     (findActiveByIdErr, investigator) => {
        //       if (findActiveByIdErr) {
        //         Logger.warn(findActiveByIdErr);
        //         res.send({
        //           status: 300,
        //           message: sails.config.serverMessage.serverError,
        //         });
        //       } else {
        //         // eslint-disable-next-line no-underscore-dangle
        //         updatedProposal[0]._id = new ObjectId(updatedProposal[0].id);
        //         EmailService.markCompleteProposalEmailToInvestigator(
        //           investigator,
        //           updatedProposal[0]
        //         );
        //         res.send({
        //           status: 200,
        //           proposalData: updatedProposal[0],
        //           message: sails.config.serverMessage.proposalComplete,
        //         });
        //       }
        //     }
        //   );
        }
      }
    );
  },
  approveCourseByDean(req, res) {
    Logger.debug("CouseSchedule.approveCourseByDean");
    Logger.debug(req.body);
    const id = req.body.id;
    const signedByDean = req.body.signedByDean
    Logger.verbose(id);
    CourseScheduleService.updateCourse(
      id,
      { signedByDean },
      
      (err, updatedCourse) => {
        if (err) {
          res.send({
            status: 300,
            message: sails.config.serverMessage.serverError,
          });
        } else {
          console.log("mark complete", updatedCourse);
          res.send({
            status: 200,
            courseData: updatedCourse,
            message: 'Course Marked as Approved',
          });
        //   EmailService.markCompleteProposalEmailToCoordinator(
        //     req.session.user,
        //     updatedProposal[0]
        //   );
        //   Investigator.findActiveById(
        //     updatedProposal[0].investigatorId.toString(),
        //     (findActiveByIdErr, investigator) => {
        //       if (findActiveByIdErr) {
        //         Logger.warn(findActiveByIdErr);
        //         res.send({
        //           status: 300,
        //           message: sails.config.serverMessage.serverError,
        //         });
        //       } else {
        //         // eslint-disable-next-line no-underscore-dangle
        //         updatedProposal[0]._id = new ObjectId(updatedProposal[0].id);
        //         EmailService.markCompleteProposalEmailToInvestigator(
        //           investigator,
        //           updatedProposal[0]
        //         );
        //         res.send({
        //           status: 200,
        //           proposalData: updatedProposal[0],
        //           message: sails.config.serverMessage.proposalComplete,
        //         });
        //       }
        //     }
        //   );
        }
      }
    );
  },
  rejectCourseByDean(req, res) {
    Logger.debug("CouseSchedule.rejectCourseByChair");
    Logger.debug(req.body);
    const id = req.body.id;
    const signedByDean = req.body.signedByDean
    Logger.verbose(id);
    CourseScheduleService.updateCourse(
      id,
      { signedByDean },
      
      (err, updatedCourse) => {
        if (err) {
          res.send({
            status: 300,
            message: sails.config.serverMessage.serverError,
          });
        } else {
          console.log("mark complete", updatedCourse);
          res.send({
            status: 200,
            courseData: updatedCourse,
            message: 'Course Marked as Reject',
          });
        //   EmailService.markCompleteProposalEmailToCoordinator(
        //     req.session.user,
        //     updatedProposal[0]
        //   );
        //   Investigator.findActiveById(
        //     updatedProposal[0].investigatorId.toString(),
        //     (findActiveByIdErr, investigator) => {
        //       if (findActiveByIdErr) {
        //         Logger.warn(findActiveByIdErr);
        //         res.send({
        //           status: 300,
        //           message: sails.config.serverMessage.serverError,
        //         });
        //       } else {
        //         // eslint-disable-next-line no-underscore-dangle
        //         updatedProposal[0]._id = new ObjectId(updatedProposal[0].id);
        //         EmailService.markCompleteProposalEmailToInvestigator(
        //           investigator,
        //           updatedProposal[0]
        //         );
        //         res.send({
        //           status: 200,
        //           proposalData: updatedProposal[0],
        //           message: sails.config.serverMessage.proposalComplete,
        //         });
        //       }
        //     }
        //   );
        }
      }
    );
  },
//   updateInternalUser(req, res) {
//     Logger.debug("InternalUserController.updateInternalUser");
//     const internalUserData = req.body.data;
//     let args;
//     Logger.verbose(internalUserData);
//     if (
//       req.session.user.role === 2 ||
      
//       req.session.user.role === 5
//     ) {
//       args = [
//         {
//           name: "Salutation",
//           value: internalUserData.salutation,
//           validations: [
//             {
//               validation: "notEmpty",
//               message:
//                 sails.config.ValidationMessages.salutationRequiredMessage,
//             },
//           ],
//         },
//         {
//           name: "First name",
//           value: internalUserData.firstName,
//           validations: [
//             {
//               validation: "notEmpty",
//               message:
//                 sails.config.ValidationMessages.firstNameRequiredValidation,
//             },
//             {
//               validation: "regex",
//               regex: /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/,
//               message:
//                 sails.config.ValidationMessages.alphabetPatternValidation,
//             },
//             {
//               validation: "maxLengthString",
//               maxLength: 100,
//               message: sails.config.ValidationMessages.firstNameMaxValidation,
//             },
//             {
//               validation: "minLengthString",
//               minLength: 2,
//               message: sails.config.ValidationMessages.firstNameMinValidation,
//             },
//           ],
//         },
//         {
//           name: "Middle name",
//           value: internalUserData.middleName,
//           validations: [
//             {
//               validation: "regex",
//               regex: /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/,
//               message:
//                 sails.config.ValidationMessages.alphabetPatternValidation,
//             },
//           ],
//         },
//         {
//           name: "Last name",
//           value: internalUserData.lastName,
//           validations: [
//             {
//               validation: "notEmpty",
//               message:
//                 sails.config.ValidationMessages.lastNameRequiredValidation,
//             },
//             {
//               validation: "regex",
//               regex: /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/,
//               message:
//                 sails.config.ValidationMessages.alphabetPatternValidation,
//             },
//             {
//               validation: "maxLengthString",
//               maxLength: 100,
//               message: sails.config.ValidationMessages.lastNameMaxValidation,
//             },
//             {
//               validation: "minLengthString",
//               minLength: 2,
//               message: sails.config.ValidationMessages.lastNameMinValidation,
//             },
//           ],
//         },
//         {
//           name: "Email",
//           value: internalUserData.email,
//           validations: [
//             {
//               validation: "notEmpty",
//               message: sails.config.ValidationMessages.emailRequiredValidation,
//             },
//             {
//               validation: "email",
//               message: sails.config.ValidationMessages.EmailValidation,
//             },
//           ],
//         },
//         {
//           name: "Job Title",
//           value: internalUserData.jobTitle,
//           validations: [
//             {
//               validation: "notEmpty",
//               message:
//                 sails.config.ValidationMessages.jobTitleRequiredValidation,
//             },
//             {
//               validation: "maxLengthString",
//               maxLength: 100,
//               message: sails.config.ValidationMessages.jobTitleMaxValidation,
//             },
//             {
//               validation: "regex",
//               regex: /^[a-zA-Z0-9-,]+(\s{0,1}[a-zA-Z0-9-, ])*$/,
//               message: sails.config.ValidationMessages.patternValidation,
//             },
//           ],
//         },

//         {
//           name: "Highest Qualification conferred",
//           value: internalUserData.highestQualification,
//           validations: [
//             {
//               validation: "notEmpty",
//               message:
//                 sails.config.ValidationMessages
//                   .highestQualificationRequiredValidation,
//             },
//             {
//               validation: "maxLengthString",
//               maxLength: 100,
//               message:
//                 sails.config.ValidationMessages
//                   .highestQualificationMaxValidation,
//             },
//             {
//               validation: "regex",
//               regex: /^[a-zA-Z0-9-,]+(\s{0,1}[a-zA-Z0-9-, ])*$/,
//               message: sails.config.ValidationMessages.patternValidation,
//             },
//           ],
//         },
//         {
//           name: "Department",
//           value: internalUserData.department,
//           validations: [
//             {
//               validation: "notEmpty",
//               message:
//                 sails.config.ValidationMessages.departmentRequiredValidation,
//             },
//             {
//               validation: "maxLengthString",
//               maxLength: 100,
//               message: sails.config.ValidationMessages.departmentMaxValidation,
//             },
//             {
//               validation: "string",
//               message: sails.config.ValidationMessages.stringValidation,
//             },
//           ],
//         },
//         {
//           name: "Organization/Institution",
//           value: internalUserData.organization,
//           validations: [
//             {
//               validation: "notEmpty",
//               message:
//                 sails.config.ValidationMessages.organizationRequiredValidation,
//             },
//             {
//               validation: "maxLengthString",
//               maxLength: 100,
//               message:
//                 sails.config.ValidationMessages.organizationMaxValidation,
//             },
//             {
//               validation: "string",
//               message: sails.config.ValidationMessages.stringValidation,
//             },
//           ],
//         },
        
//         {
//           name: "Nationality",
//           value: internalUserData.nationality,
//           validations: [
//             {
//               validation: "notEmpty",
//               message:
//                 sails.config.ValidationMessages.nationalityRequiredValidation,
//             },
//           ],
//         },
        
//       ];
//     } 
//     else if(req.session.user.role === 3 ||
//       req.session.user.role === 4){
//         args = [
//           {
//             name: "Salutation",
//             value: internalUserData.salutation,
//             validations: [
//               {
//                 validation: "notEmpty",
//                 message:
//                   sails.config.ValidationMessages.salutationRequiredMessage,
//               },
//             ],
//           },
//           {
//             name: "First name",
//             value: internalUserData.firstName,
//             validations: [
//               {
//                 validation: "notEmpty",
//                 message:
//                   sails.config.ValidationMessages.firstNameRequiredValidation,
//               },
//               {
//                 validation: "regex",
//                 regex: /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/,
//                 message:
//                   sails.config.ValidationMessages.alphabetPatternValidation,
//               },
//               {
//                 validation: "maxLengthString",
//                 maxLength: 100,
//                 message: sails.config.ValidationMessages.firstNameMaxValidation,
//               },
//               {
//                 validation: "minLengthString",
//                 minLength: 2,
//                 message: sails.config.ValidationMessages.firstNameMinValidation,
//               },
//             ],
//           },
//           {
//             name: "Middle name",
//             value: internalUserData.middleName,
//             validations: [
//               {
//                 validation: "regex",
//                 regex: /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/,
//                 message:
//                   sails.config.ValidationMessages.alphabetPatternValidation,
//               },
//             ],
//           },
//           {
//             name: "Last name",
//             value: internalUserData.lastName,
//             validations: [
//               {
//                 validation: "notEmpty",
//                 message:
//                   sails.config.ValidationMessages.lastNameRequiredValidation,
//               },
//               {
//                 validation: "regex",
//                 regex: /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/,
//                 message:
//                   sails.config.ValidationMessages.alphabetPatternValidation,
//               },
//               {
//                 validation: "maxLengthString",
//                 maxLength: 100,
//                 message: sails.config.ValidationMessages.lastNameMaxValidation,
//               },
//               {
//                 validation: "minLengthString",
//                 minLength: 2,
//                 message: sails.config.ValidationMessages.lastNameMinValidation,
//               },
//             ],
//           },
//           {
//             name: "Email",
//             value: internalUserData.email,
//             validations: [
//               {
//                 validation: "notEmpty",
//                 message: sails.config.ValidationMessages.emailRequiredValidation,
//               },
//               {
//                 validation: "email",
//                 message: sails.config.ValidationMessages.EmailValidation,
//               },
//             ],
//           },
//           {
//             name: "Job Title",
//             value: internalUserData.jobTitle,
//             validations: [
//               {
//                 validation: "notEmpty",
//                 message:
//                   sails.config.ValidationMessages.jobTitleRequiredValidation,
//               },
//               {
//                 validation: "maxLengthString",
//                 maxLength: 100,
//                 message: sails.config.ValidationMessages.jobTitleMaxValidation,
//               },
//               {
//                 validation: "regex",
//                 regex: /^[a-zA-Z0-9-,]+(\s{0,1}[a-zA-Z0-9-, ])*$/,
//                 message: sails.config.ValidationMessages.patternValidation,
//               },
//             ],
//           },
  
//           {
//             name: "Highest Qualification conferred",
//             value: internalUserData.highestQualification,
//             validations: [
//               {
//                 validation: "notEmpty",
//                 message:
//                   sails.config.ValidationMessages
//                     .highestQualificationRequiredValidation,
//               },
//               {
//                 validation: "maxLengthString",
//                 maxLength: 100,
//                 message:
//                   sails.config.ValidationMessages
//                     .highestQualificationMaxValidation,
//               },
//               {
//                 validation: "regex",
//                 regex: /^[a-zA-Z0-9-,]+(\s{0,1}[a-zA-Z0-9-, ])*$/,
//                 message: sails.config.ValidationMessages.patternValidation,
//               },
//             ],
//           },
//           {
//             name: "Department",
//             value: internalUserData.department,
//             validations: [
//               {
//                 validation: "notEmpty",
//                 message:
//                   sails.config.ValidationMessages.departmentRequiredValidation,
//               },
//               {
//                 validation: "maxLengthString",
//                 maxLength: 100,
//                 message: sails.config.ValidationMessages.departmentMaxValidation,
//               },
//               {
//                 validation: "string",
//                 message: sails.config.ValidationMessages.stringValidation,
//               },
//             ],
//           },
//           {
//             name: "Organization/Institution",
//             value: internalUserData.organization,
//             validations: [
//               {
//                 validation: "notEmpty",
//                 message:
//                   sails.config.ValidationMessages.organizationRequiredValidation,
//               },
//               {
//                 validation: "maxLengthString",
//                 maxLength: 100,
//                 message:
//                   sails.config.ValidationMessages.organizationMaxValidation,
//               },
//               {
//                 validation: "string",
//                 message: sails.config.ValidationMessages.stringValidation,
//               },
//             ],
//           },
//           {
//             name: "Principle field of interest to review",
//             value: internalUserData.principleField,
//             validations: [
//               {
//                 validation: "notEmpty",
//                 message:
//                   sails.config.ValidationMessages.principleRequiredValidation,
//               },
//               {
//                 validation: "maxLengthString",
//                 maxLength: 100,
//                 message: sails.config.ValidationMessages.principleMaxValidation,
//               },
//               {
//                 validation: "string",
//                 message: sails.config.ValidationMessages.stringValidation,
//               },
//             ],
//           },
//           {
//             name: "Nationality",
//             value: internalUserData.nationality,
//             validations: [
//               {
//                 validation: "notEmpty",
//                 message:
//                   sails.config.ValidationMessages.nationalityRequiredValidation,
//               },
//             ],
//           },
//           {
//             name: "Target articles/proposals to review/year",
//             value: internalUserData.targetArticles,
//             validations: [
//               {
//                 validation: "notEmpty",
//                 message:
//                   sails.config.ValidationMessages
//                     .targetArticlesRequiredValidation,
//               },
//               {
//                 validation: "maxLengthString",
//                 maxLength: 100,
//                 message:
//                   sails.config.ValidationMessages.targetArticlesMaxValidation,
//               },
//               {
//                 validation: "string",
//                 message: sails.config.ValidationMessages.stringValidation,
//               },
//             ],
//           },
//         ];


//     }
//     else if (req.session.user.role === 7) {
//       args = [
//         {
//           name: "First name",
//           value: internalUserData.firstName,
//           validations: [
//             {
//               validation: "notEmpty",
//               message:
//                 sails.config.ValidationMessages.firstNameRequiredValidation,
//             },
//             {
//               validation: "regex",
//               regex: /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/,
//               message:
//                 sails.config.ValidationMessages.alphabetPatternValidation,
//             },
//             {
//               validation: "maxLengthString",
//               maxLength: 100,
//               message: sails.config.ValidationMessages.firstNameMaxValidation,
//             },
//             {
//               validation: "minLengthString",
//               minLength: 2,
//               message: sails.config.ValidationMessages.firstNameMinValidation,
//             },
//           ],
//         },
//         {
//           name: "Middle name",
//           value: internalUserData.middleName,
//           validations: [
//             {
//               validation: "regex",
//               regex: /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/,
//               message:
//                 sails.config.ValidationMessages.alphabetPatternValidation,
//             },
//           ],
//         },
//         {
//           name: "Last name",
//           value: internalUserData.lastName,
//           validations: [
//             {
//               validation: "notEmpty",
//               message:
//                 sails.config.ValidationMessages.lastNameRequiredValidation,
//             },
//             {
//               validation: "regex",
//               regex: /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/,
//               message:
//                 sails.config.ValidationMessages.alphabetPatternValidation,
//             },
//             {
//               validation: "maxLengthString",
//               maxLength: 100,
//               message: sails.config.ValidationMessages.lastNameMaxValidation,
//             },
//             {
//               validation: "minLengthString",
//               minLength: 2,
//               message: sails.config.ValidationMessages.lastNameMinValidation,
//             },
//           ],
//         },
//         {
//           name: "Email",
//           value: internalUserData.email,
//           validations: [
//             {
//               validation: "notEmpty",
//               message: sails.config.ValidationMessages.emailRequiredValidation,
//             },
//             {
//               validation: "email",
//               message: sails.config.ValidationMessages.EmailValidation,
//             },
//           ],
//         },
//         {
//           name: "Phone number",
//           value: internalUserData.phoneNumber,
//           validations: [
//             {
//               validation: "notEmpty",
//               message:
//                 sails.config.ValidationMessages.phoneNumberRequiredValidation,
//             },
//             {
//               validation: "integer",
//               message: sails.config.ValidationMessages.phoneNumberValidation,
//             },
//             // { validation: 'minLengthString', minLength: 10, message: sails.config.ValidationMessages.phoneNumberMinValidation },
//             //  { validation: 'maxLengthString', maxLength: 10, message: sails.config.ValidationMessages.phoneNumberMaxValidation },
//           ],
//         },
//         {
//           name: "University Name",
//           value: internalUserData.universityName,
//           validations: [
//             {
//               validation: "notEmpty",
//               message:
//                 sails.config.ValidationMessages
//                   .universityNameRequiredValidation,
//             },
//             // { validation: 'minLengthString', minLength: 10, message: sails.config.ValidationMessages.phoneNumberMinValidation },
//             //  { validation: 'maxLengthString', maxLength: 10, message: sails.config.ValidationMessages.phoneNumberMaxValidation },
//           ],
//         },
//       ];
//     } else if (
//       req.session.user.role === 8 ||
//       req.session.user.role === 9 ||
//       req.session.user.role === 10
//     ) {
//       args = [
//         {
//           name: "First name",
//           value: internalUserData.firstName,
//           validations: [
//             {
//               validation: "notEmpty",
//               message:
//                 sails.config.ValidationMessages.firstNameRequiredValidation,
//             },
//             {
//               validation: "regex",
//               regex: /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/,
//               message:
//                 sails.config.ValidationMessages.alphabetPatternValidation,
//             },
//             {
//               validation: "maxLengthString",
//               maxLength: 100,
//               message: sails.config.ValidationMessages.firstNameMaxValidation,
//             },
//             {
//               validation: "minLengthString",
//               minLength: 2,
//               message: sails.config.ValidationMessages.firstNameMinValidation,
//             },
//           ],
//         },
//         {
//           name: "Middle name",
//           value: internalUserData.middleName,
//           validations: [
//             {
//               validation: "regex",
//               regex: /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/,
//               message:
//                 sails.config.ValidationMessages.alphabetPatternValidation,
//             },
//           ],
//         },
//         {
//           name: "Last name",
//           value: internalUserData.lastName,
//           validations: [
//             {
//               validation: "notEmpty",
//               message:
//                 sails.config.ValidationMessages.lastNameRequiredValidation,
//             },
//             {
//               validation: "regex",
//               regex: /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/,
//               message:
//                 sails.config.ValidationMessages.alphabetPatternValidation,
//             },
//             {
//               validation: "maxLengthString",
//               maxLength: 100,
//               message: sails.config.ValidationMessages.lastNameMaxValidation,
//             },
//             {
//               validation: "minLengthString",
//               minLength: 2,
//               message: sails.config.ValidationMessages.lastNameMinValidation,
//             },
//           ],
//         },
//         {
//           name: "Email",
//           value: internalUserData.email,
//           validations: [
//             {
//               validation: "notEmpty",
//               message: sails.config.ValidationMessages.emailRequiredValidation,
//             },
//             {
//               validation: "email",
//               message: sails.config.ValidationMessages.EmailValidation,
//             },
//           ],
//         },
//       ];
//     } else if (req.session.user.role === 1) {
//       args = [
//         {
//           name: "Salutation",
//           value: internalUserData.salutation,
//           validations: [
//             {
//               validation: "notEmpty",
//               message:
//                 sails.config.ValidationMessages.salutationRequiredMessage,
//             },
//           ],
//         },
//         {
//           name: "First name",
//           value: internalUserData.firstName,
//           validations: [
//             {
//               validation: "notEmpty",
//               message:
//                 sails.config.ValidationMessages.firstNameRequiredValidation,
//             },
//             {
//               validation: "regex",
//               regex: /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/,
//               message:
//                 sails.config.ValidationMessages.alphabetPatternValidation,
//             },
//             {
//               validation: "maxLengthString",
//               maxLength: 100,
//               message: sails.config.ValidationMessages.firstNameMaxValidation,
//             },
//             {
//               validation: "minLengthString",
//               minLength: 2,
//               message: sails.config.ValidationMessages.firstNameMinValidation,
//             },
//           ],
//         },
//         {
//           name: "Middle name",
//           value: internalUserData.middleName,
//           validations: [
//             {
//               validation: "regex",
//               regex: /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/,
//               message:
//                 sails.config.ValidationMessages.alphabetPatternValidation,
//             },
//           ],
//         },
//         {
//           name: "Last name",
//           value: internalUserData.lastName,
//           validations: [
//             {
//               validation: "notEmpty",
//               message:
//                 sails.config.ValidationMessages.lastNameRequiredValidation,
//             },
//             {
//               validation: "regex",
//               regex: /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/,
//               message:
//                 sails.config.ValidationMessages.alphabetPatternValidation,
//             },
//             {
//               validation: "maxLengthString",
//               maxLength: 100,
//               message: sails.config.ValidationMessages.lastNameMaxValidation,
//             },
//             {
//               validation: "minLengthString",
//               minLength: 2,
//               message: sails.config.ValidationMessages.lastNameMinValidation,
//             },
//           ],
//         },
//         {
//           name: "Email",
//           value: internalUserData.email,
//           validations: [
//             {
//               validation: "notEmpty",
//               message: sails.config.ValidationMessages.emailRequiredValidation,
//             },
//             {
//               validation: "email",
//               message: sails.config.ValidationMessages.EmailValidation,
//             },
//           ],
//         },
//         {
//           name: "Job Title",
//           value: internalUserData.jobTitle,
//           validations: [
//             {
//               validation: "notEmpty",
//               message:
//                 sails.config.ValidationMessages.jobTitleRequiredValidation,
//             },
//             {
//               validation: "maxLengthString",
//               maxLength: 100,
//               message: sails.config.ValidationMessages.jobTitleMaxValidation,
//             },
//             {
//               validation: "regex",
//               regex: /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/,
//               message: sails.config.ValidationMessages.patternValidation,
//             },
//           ],
//         },
//       ];
//     }
//     ValidateService.validate(args, (validationErr, validationErrMsgs) => {
//       if (validationErr) {
//         Logger.error(
//           `InvestigatorController.registration at ValidateService.validate ${validationErr}`
//         );
//         res.send({
//           status: 300,
//           message: sails.config.serverMessage.serverError,
//         });
//       } else if (validationErrMsgs.length === 0) {
//         if (!internalUserData.id) {
//           res.send({
//             status: 300,
//             message: sails.config.serverMessage.serverError,
//           });
//         } else {
//           const internalUserId = internalUserData.id;
//           InternalUserService.updateInternalUser(
//             internalUserId,
//             internalUserData,
//             (err, updatedInternalUser) => {
//               if (err) {
//                 res.send({
//                   status: 300,
//                   message: sails.config.serverMessage.serverError,
//                 });
//               } else {
//                 var messageAccToRole;
//                 if (req.session.user.role === 1) {
//                   messageAccToRole = sails.config.serverMessage.adminUserUpdate;
//                 } else if (req.session.user.role === 2) {
//                   messageAccToRole =
//                     sails.config.serverMessage.coordinatorUserUpdate;
//                 } else if (req.session.user.role === 3) {
//                   messageAccToRole =
//                     sails.config.serverMessage.internalReviewerUpdate;
//                 } else if (req.session.user.role === 4) {
//                   messageAccToRole =
//                     sails.config.serverMessage.externalReviewerUpdate;
//                 } else if (req.session.user.role === 5) {
//                   messageAccToRole = sails.config.serverMessage.chairUserUpdate;
//                 } else if (req.session.user.role === 7) {
//                   messageAccToRole =
//                     sails.config.serverMessage.universityUserUpdate;
//                 } else if (req.session.user.role === 8) {
//                   AgendaService.notificationToSeniorStatistician()           
//                   messageAccToRole =
//                     sails.config.serverMessage.statisticianUserUpdate;
//                 } else if (req.session.user.role === 9) {
//                   messageAccToRole =
//                     sails.config.serverMessage.secretaryUserUpdate;
//                 } else if (req.session.user.role === 10) {
//                   messageAccToRole = sails.config.serverMessage.headUserUpdate;
//                 }
//                 res.send({
//                   status: 200,
//                   message: messageAccToRole,
//                   internalUserData: updatedInternalUser,
//                 });
//               }
//             }
//           );
//         }
//       } else {
//         ValidateService.getValidateMsg(
//           validationErrMsgs,
//           (getValidateMsgErr, errMsgs) => {
//             if (getValidateMsgErr) {
//               Logger.error(
//                 `AdminController.updateAdmin at ValidateService.getValidateMsg ${getValidateMsgErr}`
//               );
//               res.send({
//                 status: 300,
//                 message: sails.config.serverMessage.serverError,
//               });
//             } else {
//               Logger.verbose(errMsgs);
//               res.send({ status: 422, message: errMsgs });
//             }
//           }
//         );
//       }
//     });
//   },

saveCourseScheduleForm(req, res) {
    Logger.debug("CourseScheduleController.saveCourseScheduleForm");
    const courseFormData = req.body;
    console.log("***************saveCourseScheduleForm", courseFormData);
    Logger.verbose(courseFormData);
    const args = [
      {
        name: "Course ID, Section & CRN",
        value: courseFormData.courseId,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.courseId,
          },
         
        ],
      },
      {
        name: "Term",
        value: courseFormData.term,
        validations: [
          {
            validation: "notEmpty",
            message:
              sails.config.ValidationMessages.term,
          },
        
        ],
      },
    ];

    ValidateService.validate(args, (validationErr, validationErrMsgs) => {
      if (validationErr) {
        Logger.error(
          `CourseScheduleController.courseScheduleFormData at ValidateService.validate ${validationErr}`
        );
        res.send({
          status: 300,
          message: sails.config.serverMessage.serverError,
        });
      } else if (validationErrMsgs.length === 0) {
          CourseScheduleService.saveCourseData(courseFormData, (err) => {
          
              if (err) {
                res.send({
                    status: 300,
                    message: sails.config.serverMessage.serverError,
                  });
              } 
             else {
              res.send({
                status: 200,
                message: 'Successfully Saved',
              });
            }
          });
        
      } else {
        ValidateService.getValidateMsg(
          validationErrMsgs,
          (getValidateMsgErr, errMsgs) => {
            if (getValidateMsgErr) {
              Logger.error(
                `CourseScheduleController.courseScheduleFormData at ValidateService.getValidateMsg ${getValidateMsgErr}`
              );
              res.send({
                status: 300,
                message: sails.config.serverMessage.serverError,
              });
            } else {
              Logger.verbose(errMsgs);
              res.send({ status: 422, message: errMsgs });
            }
          }
        );
      }
    });
  },

  getAllCourseData(req, res) {
    Logger.debug("CourseScheduleController.getAllCourseDaya");
    console.log(req.body);

    const pageNo = req.body.pageNo;
    const limit = req.body.limit;
    const search = req.body.search;
    CourseScheduleService.getAllCourseData(
      pageNo,
      limit,
      search,
      (err, CourseData, length) => {
        if (err) {
          res.send({
            status: 300,
            message: sails.config.serverMessage.serverError,
          });
        } else {
            console.log('data in course controller',CourseData)
          console.log({ status: 200, CourseData, length });
          res.send({ status: 200, CourseData, length });
        }
      }
    );
  },
//   checkCoordinatorChairPresent(req, res) {
//     Logger.debug("ApplicationController.checkCoordinatorPresent");
//     InternalUserService.checkCoordinatorChairPresent(
//       (err, isCoordinatorPresent, isChairPresent,isSeniorStatisticianPresent, isPSHMSPresent, isHeadPresent) => {
//         console.log("isChairPresent");
//         console.log(isChairPresent);
//         if (err) {
//           console.log(err);
//           res.send({
//             status: 300,
//             message: sails.config.serverMessage.serverError,
//           });
//         } else {
//           res.send({ status: 200, isCoordinatorPresent, isChairPresent,isSeniorStatisticianPresent, isPSHMSPresent, isHeadPresent });
//         }
//       }
//     );
//   },

//   getInternalUsersExceptCordinator(req, res) {
//     Logger.debug("InternalUserController.getInternalUsersExceptCordinator");
//     InternalUserService.getInternalUsersExceptCordinator(
//       (err, internalUserData) => {
//         if (err) {
//           res.send({
//             status: 300,
//             message: sails.config.serverMessage.serverError,
//           });
//         } else {
//           res.send({ status: 200, internalUserData });
//         }
//       }
//     );
//   },

//   addCommittee(req, res) {
//     Logger.debug("InternalUserController.addCommittee");
//     const internalUserIds = req.body.internalUserIds;
//     Logger.verbose(internalUserIds);
//     if (!internalUserIds) {
//       res.send({
//         status: 300,
//         message: sails.config.serverMessage.serverError,
//       });
//     } else {
//       InternalUserService.addCommiteeMember(
//         internalUserIds,
//         (err, updatedInternalUser) => {
//           if (err) {
//             res.send({
//               status: 300,
//               message: sails.config.serverMessage.serverError,
//             });
//           } else {
//             res.send({
//               status: 200,
//               message: sails.config.serverMessage.committeeSuccess,
//               internalUserData: updatedInternalUser,
//             });
//           }
//         }
//       );
//     }
//   },

//   getAllInternalReviewer(req, res) {
//     Logger.debug("InternalUserController.getAllInternalReviewer");
//     InternalUserService.getAllInternalReviewer( (err, internalReviewerData,count) => {
//       if (err) {
//         res.send({
//           status: 300,
//           message: sails.config.serverMessage.serverError,
//         });
//       } else {
//         res.send({ status: 200, internalReviewerData,count});
//       }
//     }
//     );
//   },
//   getAllExternalReviewer(req, res) {
//     Logger.debug("InternalUserController.getAllExternalReviewer");
//     InternalUserService.getAllExternalReviewer((err, externalReviewerData) => {
//       if (err) {
//         res.send({
//           status: 300,
//           message: sails.config.serverMessage.serverError,
//         });
//       } else {
//         res.send({ status: 200, externalReviewerData });
//       }
//     });
//   },

 
//   responseByReviewer(req, res) {
//     Logger.debug("InternalUserController.responseByReviewer");

//     const proposalId = req.body.proposalId;
//     console.log(
//       "Proposal Id in InternalUserController.responseByReviewer",
//       proposalId
//     );

//     const isProposalAcceptedForReview = req.body.response;
//     console.log(
//       "isProposalAcceptedForReview in InternalUserController.responseByReviewer",
//       isProposalAcceptedForReview
//     );

//     const comment = req.body.comment;
//     InternalUserService.getInternalUser(
//       req.session.user.id,
//       (err, internalUserData) => {
//         if (err) {
//           Logger.error(
//             "InternalUserController.responseByReviewer at InternalUserService.getInternalUser"
//           );
//           res.send({
//             status: 300,
//             message: sails.config.serverMessage.serverError,
//           });
//         } else {
//           let assignedProposal = internalUserData.assignedProposal;
//           console.log("assignedProposal before push", assignedProposal);

//           let finalArr = [];
//           assignedProposal &&
//             assignedProposal.forEach((element) => {
//               if (
//                 element.proposalId === proposalId &&
//                 element.isProposalAcceptedForReview === undefined
//               ) {
//                 element.isProposalAcceptedForReview =
//                   isProposalAcceptedForReview;
//                 element.comment = comment;
//                 if (isProposalAcceptedForReview === "true") {
//                   let proposalAcceptedForReviewOnDate = Date.now();
//                   element.proposalAcceptedForReviewOnDate =
//                     proposalAcceptedForReviewOnDate;
//                 } else if (isProposalAcceptedForReview === "false") {
//                   let proposalRejectedForReviewOnDate = Date.now();
//                   element.proposalRejectedForReviewOnDate =
//                     proposalRejectedForReviewOnDate;
//                 }
//                 finalArr.push(element);
//               } else if (
//                 element.proposalId === proposalId &&
//                 element.isProposalAcceptedForReview === "false" &&
//                 (isProposalAcceptedForReview === "false" ||
//                   isProposalAcceptedForReview === undefined)
//               ) {
//                 finalArr.push(element);
//               } else if (
//                 element.proposalId === proposalId &&
//                 element.isProposalAcceptedForReview === "false" &&
//                 isProposalAcceptedForReview === "true"
//               ) {
//                 element.isProposalAcceptedForReview =
//                   isProposalAcceptedForReview;
//                 finalArr.push(element);
//               } else if (
//                 element.proposalId === proposalId &&
//                 element.isProposalAcceptedForReview === "true" &&
//                 (isProposalAcceptedForReview === "true" ||
//                   isProposalAcceptedForReview === undefined)
//               ) {
//                 finalArr.push(element);
//               } else if (element.proposalId !== proposalId) {
//                 finalArr.push(element);
//               }
//             });

//           InternalUserService.updateInternalUser(
//             req.session.user.id,
//             { assignedProposal: finalArr },
//             (error, updatedInternalUser) => {
//               if (error) {
//                 Logger.error(
//                   "InternalUserController.responseByReviewer at InternalUserService.updateInternalUser"
//                 );
//                 res.send({
//                   status: 300,
//                   message: sails.config.serverMessage.serverError,
//                 });
//               } else {
//                 console.log("updated user", updatedInternalUser);

//                 res.send({
//                   status: 200,
//                   message: `Proposal is ${
//                     isProposalAcceptedForReview === "true"
//                       ? "accepted"
//                       : "rejected"
//                   } for review`,
//                   internalUserData: updatedInternalUser,
//                 });
//               }
//             }
//           );

//           ApplicationService.getProposalByProposalId(
//             proposalId,
//             (error, foundProposal) => {
//               if (error) {
//                 Logger.error(
//                   "InternalUserController.responseByReviewer at ApplicationService.getProposalByProposalId"
//                 );
//               } else {
//                 console.log("found application", foundProposal);

//                 let reviewers = foundProposal.assignedReviewers;
//                 reviewers.forEach((element) => {
//                   if (element.id === req.session.user.id) {
//                     element.isReviewAccepted = isProposalAcceptedForReview;
//                     element.comment = comment;

//                     if (isProposalAcceptedForReview === "true") {
//                       let acceptedOn = Date.now();
//                       element.proposalAcceptedForReviewOnDate = acceptedOn;

//                       EmailService.AcceptedForReviewToReviewer(
//                         req.session.user,
//                         foundProposal
//                       );
//                       InternalUserService.getCoordinator(
//                         (getErr, gotCoordinator) => {
//                           if (getErr) {
//                             console.log("error in getting coordinator", getErr);
//                           } else {
//                             console.log("found coordinator", gotCoordinator);
//                             EmailService.AcceptedForReviewToCoordinator(
//                               gotCoordinator[0],
//                               foundProposal
//                             );
//                           }
//                         }
//                       );
//                     } else if (isProposalAcceptedForReview === "false") {
//                       EmailService.rejectedForReviewToReviewer(
//                         req.session.user,
//                         foundProposal
//                       );

//                       InternalUserService.getCoordinator(
//                         (getErr, gotCoordinator) => {
//                           if (getErr) {
//                             console.log("error in getting coordinator", getErr);
//                           } else {
//                             console.log("found coordinator", gotCoordinator);
//                             EmailService.rejectedForReviewToCoordinator(
//                               gotCoordinator[0],
//                               foundProposal
//                             );
//                           }
//                         }
//                       );
//                     }
//                   }
//                 });
//                 console.log("updated reviewers array", reviewers);
//                 ApplicationService.updateProposal(
//                   proposalId,
//                   { assignedReviewers: reviewers },
//                   {
//                     date: new Date(),
//                     status: `${
//                       isProposalAcceptedForReview === "false"
//                         ? "Proposal rejected for review"
//                         : "Proposal accepted for review"
//                     }`,
//                   },
//                   (err1, updatedProposal) => {
//                     if (err1) {
//                       Logger.error(
//                         "InternalUserController.responseByReviewer at ApplicationService.updateProposal"
//                       );
//                     } else {
//                       console.log("updated application", updatedProposal);
//                       console.log({
//                         status: 200,
//                         message: sails.config.serverMessage.internalUserUpdate,
//                         proposalsData: updatedProposal,
//                       });
//                     }
//                   }
//                 );
//               }
//             }
//           );
//         }
//       }
//     );
//   },

//   getChair(req, res) {
//     Logger.debug("InternalUserController.getChair");
//     InternalUserService.getChair((err, chairData) => {
//       if (err) {
//         res.send({
//           status: 300,
//           message: sails.config.serverMessage.serverError,
//         });
//       } else {
//         res.send({ status: 200, chairData });
//       }
//     });
//   },

//   getAllProposalForReviewer(req, res) {
//     console.log("req.body.reviewerId", req.session.user.id);
//     Logger.debug("InternalUserController.getAllProposalForReviewer");
//     InternalUserService.getAllProposalForReviewer(
//       req.session.user.id,
//       (err, proposalsData) => {
//         if (err) {
//           res.send({
//             status: 300,
//             message: sails.config.serverMessage.serverError,
//           });
//         } else {
//           Logger.debug("proposalsData for get all proposals for reviewers");

//           Logger.debug(proposalsData);

//           res.send({
//             status: 200,
//             message:
//               "List proposals assigned to reviewer is found successfully.",
//             assignedProposal: proposalsData,
//           });
//         }
//       }
//     );
//   },
//   getAllAmendmentForReviewer(req, res) {
//     Logger.debug("InternalUserController.getAllAmendmentForReviewer");
//     console.log(req.session.user.id);
//     InternalUserService.getAllAmendmentForReviewer(
//       req.session.user.id,
//       (err, amendmentData) => {
//         if (err) {
//           Logger.error(
//             `InternalUserController.getAllAmendmentForReviewer at InternalUserService.getAllAmendmentForReviewer ${err}`
//           );
//           res.send({
//             status: 300,
//             message: sails.config.serverMessage.serverError,
//           });
//         } else {
//           Logger.debug("amendmentData for for reviewer");
//           console.log(amendmentData);
//           res.send({
//             status: 200,
//             message:
//               "List amendment assigned to reviewer is found successfully.",
//             assignedAmendment: amendmentData,
//           });
//         }
//       }
//     );
//   },
//   getAllCommitteeMember(req, res) {
//     Logger.debug("InternalUserController.getAllCommitteeMember");
//     InternalUserService.getAllCommitteeMember(
//       (err, committeeMemberData, totalCommitteeMembers) => {
//         if (err) {
//           res.send({
//             status: 300,
//             message: sails.config.serverMessage.serverError,
//           });
//         } else {
//           res.send({ status: 200, committeeMemberData, totalCommitteeMembers });
//         }
//       }
//     );
//   },

//   deleteCommiteeMember(req, res) {
//     Logger.debug("InternalUserController.deleteCommiteeMember");
//     const committeeMemberId = req.body.committeeMemberId;
//     Logger.verbose(committeeMemberId);
//     if (!committeeMemberId) {
//       res.send({
//         status: 300,
//         message: sails.config.serverMessage.serverError,
//       });
//     } else {
//       InternalUserService.updateInternalUser(
//         committeeMemberId,
//         { isCommitteeMember: false },
//         (err, updatedInternalUser) => {
//           if (err) {
//             res.send({
//               status: 300,
//               message: sails.config.serverMessage.serverError,
//             });
//           } else {
//             res.send({
//               status: 200,
//               updatedCommitteeMember: updatedInternalUser,
//               message: sails.config.serverMessage.committeeMemberDelete,
//             });
//           }
//         }
//       );
//     }
//   },

//   downloadReportUniversityUser(req, res) {
//     Logger.debug("InternalUserController.downloadReportUniversityUser");
//     const internalUserId = req.session.user.id;
//     console.log("internal uer id in controller");
//     console.log(internalUserId);
//     InternalUserService.downloadReportUniversityUser(
//       internalUserId,
//       (err, foundReport) => {
//         if (err) {
//           console.log(err);
//           res.send({ status: 300, message: "Server error. Please try again." });
//         } else {
//           console.log("found report", foundReport);
//           res.send({
//             status: 200,
//             message: sails.config.serverMessage.reportURLFound,
//             reportData: foundReport,
//           });
//         }
//       }
//     );
//   },
//   saveUniversityUserReports(req, res) {
//     // 0 quarterly report
//     // 1 annual report
//     const reportType = req.body.reportType;
//     let reportKey;
//     if (reportType == 0) {
//       reportKey = "quarterly";
//     }
//     if (reportType == 1) {
//       reportKey = "annual";
//     }
//     console.log("in saveUniversityUserReports");

//     req.file("file").upload(
//       {
//         adapter: require("skipper-disk"),
//         maxBytes: 5000000,
//         dirname: require("path").resolve(`files/UniversityUserReports/`),
//       },
//       (uploadErr, files) => {
//         console.log("in file of save report");
//         console.log(files);
//         if (uploadErr) {
//           Logger.error(
//             `ReportController.uploadReports at req.file ${uploadErr}`
//           );
//           console.log(
//             `ReportController.uploadReports at req.file ${uploadErr}`
//           );
//           res.send({
//             status: 300,
//             message: sails.config.serverMessage.fileUploadError,
//           });
//         } else if (files.length === 0) {
//           Logger.warn("No document was uploaded");
//           res.send({ status: 300, message: "No document was uploaded" });
//         } else {
//           const file = files[0];
//           console.log("file extension type", typeof file.fd.split(".").pop());
//           if (
//             file.fd.split(".").pop() === "doc" ||
//             file.fd.split(".").pop() === "docx" ||
//             file.fd.split(".").pop() === "xls" ||
//             file.fd.split(".").pop() === "xlsx" ||
//             file.fd.split(".").pop() === "pdf"
//           ) {
//             const fileLocArray = file ? file.fd.split("/") : [];
//             console.log("fileLocArray", fileLocArray);
//             const fileLoc = fileLocArray[fileLocArray.length - 1];
//             console.log("fileLoc", fileLoc);

//             const uploadFile = {
//               // uid: fileLoc,
//               size: file.size,
//               type: file.type,
//               name: file.filename,
//               url: `/UniversityUserReports/${fileLoc}`,
//               status: "done",
//             };
//             Logger.verbose(uploadFile);
//             console.log("uploaded file", uploadFile.url);
//             const reportData = uploadFile;
//             console.log("reportData in controller", reportData);
//             InternalUserService.updateInternalUser(
//               req.session.user.id,
//               { [reportKey]: reportData },
//               (err1, user) => {
//                 if (err1) {
//                   res.send({
//                     status: 300,
//                     message: sails.config.serverMessage.serverError,
//                   });
//                 } else {
//                   InternalUser.findActiveByCriteria(
//                     { isActive: true, role: 2, isVerified: true },
//                     (err, coordinator) => {
//                       if (err) {
//                         Logger.error(
//                           `InternalUserController.saveUniversityUserReports at InternalUser.findActiveByCriteria ${err}`
//                         );
//                       } else {
//                         // send emails for annual and quarterly reports
//                         if (reportType == 0) {
//                           console.log('uni user',user)
//                           EmailService.sendEmailForQuaterlyReportSubmitted(
//                             user[0]
//                           );
//                           if(coordinator!==undefined){
//                             EmailService.sendEmailForQuaterlyReportReceived(
//                               coordinator
//                             );
//                           }

//                         } else if (reportType == 1) {
//                           EmailService.sendEmailForAnnualReportSubmitted(user[0]);
//                           if(coordinator!==undefined){
//                             EmailService.sendEmailForAnnualReportReceived(
//                               coordinator
//                             );
//                           }

                          
//                         }
//                         res.send({
//                           status: 200,
//                           message:
//                             sails.config.serverMessage.uploadReportSuccess,
//                           reportData: user,
//                         });
//                       }
//                     }
//                   );
//                 }
//               }
//             );
//           }
//         }
//       }
//     );
//   },
//   getUniversityUsers(req, res) {
//     Logger.debug("InternalUserController.getUniversityUsers");
//     const pageNo = req.params["pageNo"];

//     InternalUserService.getUniversityUsers(
//       pageNo,
//       (err, internalUsersData, total) => {
//         if (err) {
//           console.log("internaluser controller****", err);
//           res.send({ status: 300, message: "Server error. Please try again." });
//         } else {
//           console.log("internaluser controller****", internalUsersData);
//           console.log("internaluser controller****", total);

//           res.send({ status: 200, internalUsersData, total });
//         }
//       }
//     );
//   },

//   responseByReviewerForAmendment(req, res) {
//     Logger.debug("InternalUserController.responseByReviewerForAmendment");
//     const proposalId = req.body.proposalId;
//     console.log(
//       "Proposal Id in InternalUserController.responseByReviewerForAmendment",
//       proposalId
//     );
//     const isAmendmentAcceptedForReview = req.body.response;
//     console.log(
//       "isProposalAcceptedForReview in InternalUserController.responseByReviewerForAmendment",
//       isAmendmentAcceptedForReview
//     );
//     const comment = req.body.comment;
//     InternalUserService.getInternalUser(
//       req.session.user.id,
//       (err, internalUserData) => {
//         if (err) {
//           Logger.error(
//             "InternalUserController.responseByReviewer at InternalUserService.getInternalUser"
//           );
//           res.send({
//             status: 300,
//             message: sails.config.serverMessage.serverError,
//           });
//         } else {
//           let assignedAmendment = internalUserData.assignedAmendment;
//           console.log("assignedProposal before push", assignedAmendment);
//           let finalArr = [];
//           assignedAmendment &&
//             assignedAmendment.forEach((element) => {
//               if (
//                 element.proposalId === proposalId &&
//                 element.isAmendmentAcceptedForReview === undefined
//               ) {
//                 element.isAmendmentAcceptedForReview =
//                 isAmendmentAcceptedForReview;
//                 element.comment = comment;
//                 if (isAmendmentAcceptedForReview === "true") {
//                   let proposalAcceptedForReviewOnDate = Date.now();
//                   element.proposalAcceptedForReviewOnDate =
//                     proposalAcceptedForReviewOnDate;
//                 } else if (isAmendmentAcceptedForReview === "false") {
//                   let proposalRejectedForReviewOnDate = Date.now();
//                   element.proposalRejectedForReviewOnDate =
//                     proposalRejectedForReviewOnDate;
//                 }
//                 finalArr.push(element);
//               } else if (
//                 element.proposalId === proposalId &&
//                 element.isAmendmentAcceptedForReview === "false" &&
//                 (isAmendmentAcceptedForReview === "false" ||
//                 isAmendmentAcceptedForReview === undefined)
//               ) {
//                 finalArr.push(element);
//               } else if (
//                 element.proposalId === proposalId &&
//                 element.isAmendmentAcceptedForReview === "false" &&
//                 isAmendmentAcceptedForReview === "true"
//               ) {
//                 element.isAmendmentAcceptedForReview =
//                 isAmendmentAcceptedForReview;
//                 finalArr.push(element);
//               } else if (
//                 element.proposalId === proposalId &&
//                 element.isAmendmentAcceptedForReview === "true" &&
//                 (isAmendmentAcceptedForReview === "true" ||
//                 isAmendmentAcceptedForReview === undefined)
//               ) {
//                 finalArr.push(element);
//               } else if (element.proposalId !== proposalId) {
//                 finalArr.push(element);
//               }
//             });
//           InternalUserService.updateInternalUser(
//             req.session.user.id,
//             { assignedAmendment: finalArr },
//             (error, updatedInternalUser) => {
//               if (error) {
//                 Logger.error(
//                   "InternalUserController.responseByReviewer at InternalUserService.updateInternalUser"
//                 );
//                 res.send({
//                   status: 300,
//                   message: sails.config.serverMessage.serverError,
//                 });
//               } else {
//                 console.log("updated user", updatedInternalUser);
//                 res.send({
//                   status: 200,
//                   message: `Amendment is ${
//                     isAmendmentAcceptedForReview === "true"
//                       ? "accepted"
//                       : "rejected"
//                   }
//     for review`,
//                   internalUserData: updatedInternalUser,
//                 });
//               }
//             }
//           );
//           AmendmentService.getAmendmentByProposalId(
//             proposalId,
//             (error, foundProposal) => {
//               if (error) {
//                 Logger.error(`InternalUserController.responseByReviewer at
//     AmendmentService.getAmendmentByProposalId`);
//               } else {
//                 console.log("found application", foundProposal);
//                 let reviewers = foundProposal.assignedReviewers;
//                 reviewers.forEach((element) => {
//                   if (element.id === req.session.user.id) {
//                     element.isReviewAccepted = isAmendmentAcceptedForReview;
//                     element.comment = comment;
//                     if (isAmendmentAcceptedForReview === "true") {
//                       let acceptedOn = Date.now();
//                       element.proposalAcceptedForReviewOnDate = acceptedOn;
//                       EmailService.AcceptedForReviewToReviewer(
//                         req.session.user,
//                         foundProposal
//                       );
//                       InternalUserService.getCoordinator(
//                         (getErr, gotCoordinator) => {
//                           if (getErr) {
//                             console.log("error in getting coordinator", getErr);
//                           } else {
//                             console.log("found coordinator", gotCoordinator);
//                             EmailService.AcceptedForReviewToCoordinator(
//                               gotCoordinator[0],
//                               foundProposal
//                             );
//                           }
//                         }
//                       );
//                     } else if (isAmendmentAcceptedForReview === "false") {
//                       EmailService.rejectedForReviewToReviewer(
//                         req.session.user,
//                         foundProposal
//                       );
//                       InternalUserService.getCoordinator(
//                         (getErr, gotCoordinator) => {
//                           if (getErr) {
//                             console.log("error in getting coordinator", getErr);
//                           } else {
//                             console.log("found coordinator", gotCoordinator);
//                             EmailService.rejectedForReviewToCoordinator(
//                               gotCoordinator[0],
//                               foundProposal
//                             );
//                           }
//                         }
//                       );
//                     }
//                   }
//                 });
//                 console.log("updated reviewers array", reviewers);
               
//                 AmendmentService.updateAmendment(
//                   proposalId,
//                   { assignedReviewers: reviewers },
//                   {
//                     date: new Date(),
//                     status: `${
//                       isAmendmentAcceptedForReview === "false"
//                       ? 'Amendment rejected for review by -'+req.session.user.firstName+' '+req.session.user.lastName
//                       : 'Amendment accepted for review by -'+req.session.user.firstName+' '+req.session.user.lastName
//                     }`,
//                   },
//                   (err1, updatedProposal) => {
//                     if (err1) {
//                       Logger.error(
//                         "InternalUserController.responseByReviewer at AmendmentService.updateAmendment"
//                       );
//                     } else {
//                       ApplicationService.updateProposal(
//                         proposalId,
//                         { isAmendmentUnderReview: true },
//                         { date: new Date(),
//                           status: `${
//                             isAmendmentAcceptedForReview === "false"
//                               ? 'Amendment rejected for review by -'+req.session.user.firstName+' '+req.session.user.lastName
//                               : 'Amendment accepted for review by -'+req.session.user.firstName+' '+req.session.user.lastName
//                           }`},
//                         (error1, proposal) => {
//                           if (error1) {
//                             res.send({
//                               status: 300,
//                               message: sails.config.serverMessage.serverError,
//                             });
//                           }
//                           else{
//                             Logger.info('amendment under reviw', proposal);
//                           } 
//                         })
//                       console.log("updated application", updatedProposal);
//                       console.log({
//                         status: 200,
//                         message: sails.config.serverMessage.internalUserUpdate,
//                         proposalsData: updatedProposal,
//                       });
//                     }
//                   }
//                 );
//               }
//             }
//           );
//         }
//       }
//     );
//   },
 };
