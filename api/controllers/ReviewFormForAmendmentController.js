const ObjectId = require("mongodb").ObjectID;
/* eslint-disable no-undef */

module.exports = {
  submitReview(req, res) {
    Logger.debug("ReviewFormForAmendmentController.submitReview");
    const reviewData = req.body;

    const args = [
      {
        name: "Is the proposed research relevance to Fiji context",
        value: reviewData.relevanceToFijiContext,
        validations: [
          {
            validation: "notEmpty",
            message:
              sails.config.ValidationMessages
                .relevanceToFijiContextRequiredValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 5000,
            message: sails.config.ValidationMessages.maxLengthValidation,
          },
        ],
      },
      {
        name: "Will the research contribute to new generalizable knowledge to improve the health of Fiji people?",
        value: reviewData.contributeToNewGeneralizableKnowledge,
        validations: [
          {
            validation: "notEmpty",
            message:
              sails.config.ValidationMessages
                .contributeToNewGeneralizableKnowledgeRequiredValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 5000,
            message: sails.config.ValidationMessages.maxLengthValidation,
          },
        ],
      },
      {
        name: "Statement of the Problem",
        value: reviewData.problemStatement,
        validations: [
          {
            validation: "notEmpty",
            message:
              sails.config.ValidationMessages
                .problemStatementRequiredValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 5000,
            message: sails.config.ValidationMessages.maxLengthValidation,
          },
        ],
      },
      {
        name: "Rationale of the study",
        value: reviewData.rationaleOfTheStudy,
        validations: [
          {
            validation: "notEmpty",
            message:
              sails.config.ValidationMessages
                .rationaleOfTheStudyRequiredValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 5000,
            message: sails.config.ValidationMessages.maxLengthValidation,
          },
        ],
      },
      {
        name: "Benefits of Study",
        value: reviewData.studyBenefits,
        validations: [
          {
            validation: "notEmpty",
            message:
              sails.config.ValidationMessages.studyBenefitsRequiredValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 5000,
            message: sails.config.ValidationMessages.maxLengthValidation,
          },
        ],
      },
      {
        name: "Research Question, Aim, Hypothesis/ese",
        value: reviewData.researchQuestionAimHypothesisEse,
        validations: [
          {
            validation: "notEmpty",
            message:
              sails.config.ValidationMessages
                .researchQuestionAimHypothesisEseRequiredValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 5000,
            message: sails.config.ValidationMessages.maxLengthValidation,
          },
        ],
      },
      {
        name: "Objectives",
        value: reviewData.objectives,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.objectivesValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 5000,
            message: sails.config.ValidationMessages.maxLengthValidation,
          },
        ],
      },
      {
        name: "Review of Literature",
        value: reviewData.reviewOfLiterature,
        validations: [
          {
            validation: "notEmpty",
            message:
              sails.config.ValidationMessages.reviewOfLiteratureValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 5000,
            message: sails.config.ValidationMessages.maxLengthValidation,
          },
        ],
      },
      {
        name: "Study design",
        value: reviewData.studyDesign,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.studyDesignValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 5000,
            message: sails.config.ValidationMessages.maxLengthValidation,
          },
        ],
      },
      {
        name: "Study Setting",
        value: reviewData.studySetting,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.studySettingValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 5000,
            message: sails.config.ValidationMessages.maxLengthValidation,
          },
        ],
      },
      {
        name: "Study Population or Sample",
        value: reviewData.studyPopulationOrSample,
        validations: [
          {
            validation: "notEmpty",
            message:
              sails.config.ValidationMessages.studyPopulationOrSampleValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 5000,
            message: sails.config.ValidationMessages.maxLengthValidation,
          },
        ],
      },
      {
        name: "Selection of participants",
        value: reviewData.selectionOfParticipants,
        validations: [
          {
            validation: "notEmpty",
            message:
              sails.config.ValidationMessages.selectionOfParticipantsValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 5000,
            message: sails.config.ValidationMessages.maxLengthValidation,
          },
        ],
      },
      {
        name: "Sampling, sample size & Power of Study",
        value: reviewData.samplingSampleSizeAndPowerOfStudy,
        validations: [
          {
            validation: "notEmpty",
            message:
              sails.config.ValidationMessages
                .samplingSampleSizeAndPowerOfStudyValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 5000,
            message: sails.config.ValidationMessages.maxLengthValidation,
          },
        ],
      },
      {
        name: "Method for Recruitment of Participants (where appropriate not in secondary data analysis type of research)",
        value: reviewData.participantsRecruitmentMethod,
        validations: [
          {
            validation: "notEmpty",
            message:
              sails.config.ValidationMessages
                .participantsRecruitmentMethodValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 5000,
            message: sails.config.ValidationMessages.maxLengthValidation,
          },
        ],
      },
      {
        name: "Data Collection Techniques & Instruments",
        value: reviewData.dataCollectionTechniquesAndInstruments,
        validations: [
          {
            validation: "notEmpty",
            message:
              sails.config.ValidationMessages
                .dataCollectionTechniquesAndInstrumentsValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 5000,
            message: sails.config.ValidationMessages.maxLengthValidation,
          },
        ],
      },
      {
        name: "Cultural Sensitivity (where appropriate)",
        value: reviewData.culturalSensitivity,
        validations: [
          {
            validation: "notEmpty",
            message:
              sails.config.ValidationMessages.culturalSensitivityValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 5000,
            message: sails.config.ValidationMessages.maxLengthValidation,
          },
        ],
      },
      {
        name: "Reliability & Validity of Methods & Tools",
        value: reviewData.reliabilityAndValidityOfMethodsAndTools,
        validations: [
          {
            validation: "notEmpty",
            message:
              sails.config.ValidationMessages
                .reliabilityAndValidityOfMethodsAndToolsValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 5000,
            message: sails.config.ValidationMessages.maxLengthValidation,
          },
        ],
      },
      {
        name: "Data Management",
        value: reviewData.dataManagement,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.dataManagementValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 5000,
            message: sails.config.ValidationMessages.maxLengthValidation,
          },
        ],
      },
      {
        name: "Data Storage",
        value: reviewData.dataStorage,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.dataStorageValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 5000,
            message: sails.config.ValidationMessages.maxLengthValidation,
          },
        ],
      },
      {
        name: "Data Analysis Plan",
        value: reviewData.dataAnalysisPlan,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.dataAnalysisPlanValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 5000,
            message: sails.config.ValidationMessages.maxLengthValidation,
          },
        ],
      },
      {
        name: "Pretest or Pilot Study where appropriate",
        value: reviewData.pretestOrPilotStudy,
        validations: [
          {
            validation: "notEmpty",
            message:
              sails.config.ValidationMessages.pretestOrPilotStudyValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 5000,
            message: sails.config.ValidationMessages.maxLengthValidation,
          },
        ],
      },
      {
        name: "Confidentiality",
        value: reviewData.confidentiality,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.confidentialityValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 5000,
            message: sails.config.ValidationMessages.maxLengthValidation,
          },
        ],
      },
      {
        name: "Privacy",
        value: reviewData.privacy,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.privacyRequiredValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 5000,
            message: sails.config.ValidationMessages.maxLengthValidation,
          },
        ],
      },
      {
        name: "Voluntary Informed Consent",
        value: reviewData.voluntaryInformedConsent,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.fieldRequiredValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 5000,
            message: sails.config.ValidationMessages.maxLengthValidation,
          },
        ],
      },
      {
        name: "Provision of debriefing, counselling, referral for treatment, and processes to enhance duty of care for participants",
        value: reviewData.provisionOfDebriefing,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.fieldRequiredValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 5000,
            message: sails.config.ValidationMessages.maxLengthValidation,
          },
        ],
      },
      {
        name: "Anticipated Risks of research & planned methods of management of risks",
        value: reviewData.anticipatedRisks,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.fieldRequiredValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 5000,
            message: sails.config.ValidationMessages.maxLengthValidation,
          },
        ],
      },
      {
        name: "Timelines/ Gantt Chart",
        value: reviewData.timelinesOrGanttChart,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.fieldRequiredValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 5000,
            message: sails.config.ValidationMessages.maxLengthValidation,
          },
        ],
      },
      {
        name: "Activities,Equipment,Personnel etc",
        value: reviewData.activitiesEquipmentPersonnel,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.fieldRequiredValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 5000,
            message: sails.config.ValidationMessages.maxLengthValidation,
          },
        ],
      },
      {
        name: "Source of Funds",
        value: reviewData.sourceOfFunds,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.fieldRequiredValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 5000,
            message: sails.config.ValidationMessages.maxLengthValidation,
          },
        ],
      },
      {
        name: "Administration Monitoring Utilization(including Publication)",
        value: reviewData.administrationMonitoringUtilization,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.fieldRequiredValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 5000,
            message: sails.config.ValidationMessages.maxLengthValidation,
          },
        ],
      },
      {
        name: "References included",
        value: reviewData.references,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.fieldRequiredValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 5000,
            message: sails.config.ValidationMessages.maxLengthValidation,
          },
        ],
      },
      {
        name: "Data Collection Form, Tools, Surveys, Questionnaires, FGD & Interview Guides",
        value: reviewData.dataCollectionForm,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.fieldRequiredValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 5000,
            message: sails.config.ValidationMessages.maxLengthValidation,
          },
        ],
      },
      {
        name: "Secondary Data De-identification/ Coding Forms",
        value: reviewData.secondaryDataForm,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.fieldRequiredValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 5000,
            message: sails.config.ValidationMessages.maxLengthValidation,
          },
        ],
      },
      {
        name: "Information Statement(s) (Written in a language that will be understood by prospective participants.)",
        value: reviewData.informationStatements,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.fieldRequiredValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 5000,
            message: sails.config.ValidationMessages.maxLengthValidation,
          },
        ],
      },
      {
        name: "Consent Form(s)",
        value: reviewData.consentForms,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.fieldRequiredValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 5000,
            message: sails.config.ValidationMessages.maxLengthValidation,
          },
        ],
      },
      {
        name: "Third-Party Consent",
        value: reviewData.thirdPartyConsent,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.fieldRequiredValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 5000,
            message: sails.config.ValidationMessages.maxLengthValidation,
          },
        ],
      },
      {
        name: "Assent Forms",
        value: reviewData.assentForms,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.fieldRequiredValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 5000,
            message: sails.config.ValidationMessages.maxLengthValidation,
          },
        ],
      },
      {
        name: "Translated versions of above if applicable",
        value: reviewData.translatedVersions,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.fieldRequiredValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 5000,
            message: sails.config.ValidationMessages.maxLengthValidation,
          },
        ],
      },
      {
        name: "Facility Approvals",
        value: reviewData.facilityApprovals,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.fieldRequiredValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 5000,
            message: sails.config.ValidationMessages.maxLengthValidation,
          },
        ],
      },
      {
        name: "Other Country Research & Ethics Approvals",
        value: reviewData.otherCountryResearchEthicsApprovals,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.fieldRequiredValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 5000,
            message: sails.config.ValidationMessages.maxLengthValidation,
          },
        ],
      },
      {
        name: "General Comments:",
        value: reviewData.generalComments,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.fieldRequiredValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 5000,
            message: sails.config.ValidationMessages.maxLengthValidation,
          },
        ],
      },
      {
        name: "Recommendation:",
        value: reviewData.recommendation,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.fieldRequiredValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 5000,
            message: sails.config.ValidationMessages.maxLengthValidation,
          },
        ],
      },
      {
        name: "Please select the appropriate",
        value: reviewData.selectAppropriate,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.fieldRequiredValidation,
          },
        ],
      },
      {
        name: "Comments to investigator",
        value: reviewData.commentsToInvestigator,
        validations: [],
      },
    ];

    ValidateService.validate(args, (validationErr, validationErrMsgs) => {
      if (validationErr) {
        Logger.error(
          `ReviewFormForAmendmentController.submitReview at ValidateService.validate ${validationErr}`
        );
        res.send({
          status: 300,
          message: sails.config.serverMessage.serverError,
        });
      } else if (validationErrMsgs.length === 0) {
        reviewData.reviewerId = req.session.user.id;

        console.log(
          "reviewer id type",
          typeof reviewData.reviewerId + " id reviewer=" + reviewData.reviewerId
        );
        Logger.verbose(reviewData);
        console.log("reviewData.proposalId", reviewData.proposalId);

        ReviewFormForAmendmentService.submitReview(reviewData, (err, updatedReviewData) => {
          if (err) {
            Logger.error(
              `ReviewFormForAmendmentController.submitReview at ReviewFormForAmendmentService.submitReview ${err}`
            );
            res.send({
              status: 300,
              message: sails.config.serverMessage.serverError,
            });
          } else {
            Logger.verbose(updatedReviewData);
            console.log("updatedReviewData", updatedReviewData);
            /**Emails to coordinator and reviewer */
            InternalUserService.getInternalUser(
              req.session.user.id,
              (error, foundData) => {
                if (error) {
                  Logger.error(
                    `ReviewFormForAmendmentController.submitReview at InternalUserService.getInternalUser ${err}`
                  );
                } else {
                  console.log(
                    `ReviewFormForAmendmentController.submitReview at InternalUserService.getInternalUser = ${foundData}`
                  );
                  let proposalArray = foundData.assignedAmendment;
                  proposalArray.forEach((assignedProposal) => {
                    if (reviewData.proposalId === assignedProposal.proposalId)
                      assignedProposal.isReviewSubmitted = true;
                  });
                  console.log("updated assigned proposal array", proposalArray);

                  InternalUserService.updateInternalUser(
                    req.session.user.id,
                    { assignedAmendment: proposalArray },
                    (err1, finalData) => {
                      if (err1) {
                        console.log("error while updating reviewers data");
                      } else {
                        console.log("updated reviewers data", finalData);
                      }
                    }
                  );
                }
              }
            );

            AmendmentService.getAmendmentByProposalId(
              reviewData.proposalId,
              (error, foundProposal) => {
                if (error) {
                  Logger.error(
                    `ReviewFormForAmendmentController.submitReview at AmendmentService.getAmendmentByProposalId ${error}`
                  );
                } else {
                  console.log("foundProposal", foundProposal);
                  let assignReviewersArray = foundProposal.assignedReviewers;
                  console.log(
                    "assignReviewersArray before push",
                    assignReviewersArray
                  );
                  assignReviewersArray.forEach((element) => {
                    if (req.session.user.id === element.id) {
                      element.isReviewSubmitted = true;
                    }
                  });
                  console.log(
                    "assignReviewersArray after push",
                    assignReviewersArray
                  );
                  ApplicationService.updateProposal(
                    reviewData.proposalId,
                    { isAmendmentUnderReview: true },
                    { date: new Date(), status: 'Review form submitted by -'+req.session.user.firstName+' '+req.session.user.lastName},
                    (error1, proposal) => {
                      if (error1) {
                        res.send({
                          status: 300,
                          message: sails.config.serverMessage.serverError,
                        });
                      }
                      else{
                        Logger.info('amendment under reviw', proposal);
                      } 
                    })
                  AmendmentService.updateAmendment(
                    reviewData.proposalId,
                    { assignedReviewers: assignReviewersArray },
                    { date: new Date(), status: 'Review form submitted by -' +req.session.user.firstName+' '+req.session.user.lastName},
                    (err1, updatedData) => {
                      if (err1) {
                        Logger.error(
                          `ReviewFormForAmendmentController.submitReview at AmendmentService.updateAmendment ${err1}`
                        );
                        console.log(
                          `ReviewFormForAmendmentController.submitReview at AmendmentService.updateAmendment ${err1}`
                        );
                      } else {
                        console.log(
                          `**ReviewFormForAmendmentController.submitReview at AmendmentService.updateAmendment`
                        );
                        console.log(updatedData);
                      }
                    }
                  );
                }
              }
            );

            /**Emails to coordinator and reviewer */
            EmailService.ProposalReviewedToReviewer(
              req.session.user,
              updatedReviewData
            );

            InternalUserService.getCoordinator((error, coordinator) => {
              if (error) {
                res.send({ status: 300, message: error.message });
              } else {
                console.log("coordinator data", coordinator[0]);
                EmailService.ProposalReviewedToCoordinator(
                  coordinator[0],
                  updatedReviewData
                );
              }
            });

            res.send({  
              status: 200,
              message: "Review submitted successfully",
              reviewData: updatedReviewData,
            });
          }
        });
      } else {
        Logger.verbose("validation error");
        console.log("validation error");
        Logger.verbose({ status: 422, validationErrArr: validationErrMsgs });
        res.send({ status: 422, validationErrArr: validationErrMsgs });
      }
    });
  },

  getReviewForm(req, res) {
    Logger.debug("ReviewFormForAmendmentController.getReviewForm");
    let proposalId = req.params.proposalId;

    ReviewFormForAmendmentService.getReviewForm(proposalId, (err, reviewFormData) => {
      if (err) {
        res.send({
          status: 300,
          message: sails.config.serverMessage.serverError,
        });
      } else {
        res.send({ status: 200, reviewFormData });
      }
    });
  },
  
};
