const ObjectId = require('mongodb').ObjectID;

module.exports = {

  saveAmendment(req, res) {
    const newAmendment = {
      proposalId: req.body.proposalId,
      investigatorId: new ObjectId(req.session.user.id),
      title: req.body.title,
      isSubmitted: false
    }
    AmendmentService.saveAmendment(newAmendment, (err, savedData) => {
      if (err) {
        Logger.error(`AmendmentController.saveAmendment at AmendmentService.saveAmendment${err}`)
        return res.send({ status: 300, message: sails.config.serverMessage.serverError })
      }
      else {
        Logger.debug(`AmendmentController.saveAmendment at AmendmentService.saveAmendment${savedData}`)
        return res.send({ status: 200, message: 'Amedment saved', data: savedData })
      }
    })
  },
  uploadAmendmentDocument(req, res) {
    Logger.debug('AmendmentController.uploadAmendmentDocument');
    const proposalId = req.body.proposalId;
    if (!proposalId) {
      Logger.warn('Proposal id not found');
      res.send({ status: 300, message: sails.config.serverMessage.serverError });
    } else {
      console.log('sails.config.appPath', sails.config.appPath)
      /**if amendment in db */
      console.log('req.file', req.file)
      req.file('file').upload({
        adapter: require('skipper-disk'),
        maxBytes: 5000000,
        dirname: require('path').resolve(`files/AmendmentDocuments/${proposalId}`),
        // saveAs: req.body.fileName
      }, (uploadErr, files) => {
        if (uploadErr) {
          Logger.error(`AmendmentController.uploadAmendmentDocument at req.file.upload ${uploadErr}`);
          res.send({ status: 300, message: sails.config.serverMessage.serverError });
        } else if (files.length === 0) {
          Logger.warn('No document was uploaded');
          res.send({ status: 300, message: 'No document was uploaded' });
        } else {
          const file = files[0];
          Logger.debug('file uploaded in DB');
          Logger.info(file)

          Logger.debug('file extension type')
          Logger.info(file.fd.split('.'))

          if (file.fd.split('.').pop() === 'doc' ||
            file.fd.split('.').pop() === 'docx' ||
            file.fd.split('.').pop() === 'xls'  ||
            file.fd.split('.').pop() === 'xlsx' ||
            file.fd.split('.').pop() === 'pdf') {

            const fileLocArray = file ? file.fd.split('/') : [];

            console.log("fileLocArray", fileLocArray);
            const fileLoc = fileLocArray[fileLocArray.length - 1];
            console.log("fileLoc", fileLoc);

            const uploadFile = {
              uid: fileLoc,
              size: file.size,
              type: file.type,
              name: file.filename,
              url: `/AmendmentDocuments/${proposalId}/${fileLoc}`,
              status: 'done',
            };
            Logger.verbose(`uploadFile ${uploadFile}`);
            const amendmentData = {};

            amendmentData[req.body.fileName] = uploadFile;
            console.log('check amendment data before upload', amendmentData)
            AmendmentService.updateAmendment(proposalId, amendmentData, null, (err, updatedAmendment) => {
              if (err) {
                Logger.error(`AmendmentController.uploadAmendmentDocument at AmendmentService.updateAmendment ${err}`)
                res.send({ status: 300, message: sails.config.serverMessage.serverError });
              } else {
                Logger.debug(`AmendmentController.uploadAmendmentDocument at AmendmentService.updateAmendment ${updatedAmendment}`)
                res.send({ status: 200, message: sails.config.serverMessage.uploadFileSuccess, amendmentData: updatedAmendment });
              }
            });
          }
          else {
            res.send({ status: 400, message: sails.config.serverMessage.fileUploadError });
          }
        }
      });
    }
  },

  updateAmendment(req, res) {
    Logger.debug('AmendmentController.updateAmendment');
    const proposalId = req.body.proposalId;
    Logger.info(`proposalId ${proposalId}`)
    let amendmentData = {};

    const args = [
      {
        name: 'Description',
        value: req.body.description,
        validations: [
          { validation: 'notEmpty', message: sails.config.ValidationMessages.descriptionRequiredValidation },
          { validation: 'maxLengthString', maxLength: 100, message: sails.config.ValidationMessages.descriptionMaxValidation },
        ],
      },
      {
        name: 'Co-investigator name',
        value: req.body.coinvestigatorName,
        validations: [
          { validation: 'isArray' },
        ],
      }
    ];
    ValidateService.validate(args, (validationErr, validationErrMsgs) => {
      if (validationErr) {
        Logger.error(`AmendmentController.updateAmendment at ValidateService.validate ${validationErr}`);
        res.send({ status: 300, message: sails.config.serverMessage.serverError });
      }
      else if (validationErrMsgs.length === 0) {
        amendmentData.description = req.body.description;
        if (req.body.coinvestigatorName) {
          amendmentData.coinvestigatorName = req.body.coinvestigatorName;
        }
        amendmentData.isSubmitted = true;
        Logger.verbose(`Amendment data`);
        Logger.info(amendmentData)

        AmendmentService.updateAmendment(proposalId, amendmentData, { date: new Date(), status: 'Made amendment request' }, (saveError, savedData) => {
          if (saveError) {
            Logger.error(`AmendmentController.updateAmendment at AmendmentService.updateAmendment ${saveError}`);
            return res.send({ status: 300, message: sails.config.serverMessage.serverError })
          }
          else {
            Logger.verbose(`AmendmentController.updateAmendment at AmendmentService.updateAmendment ${savedData}`);
            ApplicationService.updateProposal(proposalId, { isAppliedForAmendment: true, status: 'On Hold' }, { date: new Date(), status: 'Made amendment request' }, (err, updatedProposal) => {
              if (err) {
                Logger.error(`AmendmentController.updateAmendment at ApplicationService.updateProposal ${err}`);
                return res.send({ status: 300, message: sails.config.serverMessage.serverError })
              } else {
                Logger.error(`AmendmentController.updateAmendment at ApplicationService.updateProposal ${updatedProposal}`);
              }
            })
            EmailService.submittedAmendmentRequestToInvestigator(req.session.user, savedData[0])
            InternalUserService.getCoordinator((err, coordinator) => {
              if (err) {
                Logger.err(`AmendmentController.updateAmendment at InternalUserService.getCoordinator ${err}`);
                return res.send({ status: 300, message: sails.config.serverMessage.serverError })
              }
              else {
                Logger.verbose(`AmendmentController.updateAmendment at InternalUserService.getCoordinator ${coordinator}`);
                EmailService.receivedAmendmentRequestToCoordinator(coordinator[0], savedData[0])
              }
            })
            return res.send({ status: 200, message: sails.config.serverMessage.amendmentSavedSuccess, data: savedData })
          }
        });
      }
      else {
        Logger.verbose('validation error');
        Logger.verbose({ status: 422, validationErrArr: validationErrMsgs });
        res.send({ status: 422, validationErrArr: validationErrMsgs });
      }
    });
  },

  getAmendment(req, res) {
    Logger.debug('AmendmentController.getAmendment');
    const pageNo = req.params['pageNo'];
    AmendmentService.getAmendment(pageNo, (err, amendmentData, count) => {
      if (err) {
        Logger.error(`AmendmentController.getAmendment ${sails.config.serverMessage.serverError}`)
        res.send({ status: 300, message: sails.config.serverMessage.serverError });
      } else {
        Logger.debug(`AmendmentController.getAmendment at AmendmentService.getAmendment ${amendmentData}`)
        res.send({ status: 200, data: amendmentData, count, message: 'Amendments found successfully' });
      }
    });

  },
  markCompleteAmendment(req, res) {
    Logger.debug('AmendmentController.markCompleteAmendment');
    Logger.debug(req.body);
    const proposalId = req.body.proposalId;
    const commentForMarkComplete = req.body.commentForMarkComplete;

    AmendmentService.updateAmendment(proposalId, { isComplete: true, commentForMarkComplete }, { date: new Date(), status: "Amendment Mark Complete" }, (err, updatedAmendment) => {
      if (err) {
        Logger.error(`AmendmentController.markCompleteAmendment at AmendmentService.updateAmendment ${err}`)
        res.send({ status: 300, message: sails.config.serverMessage.serverError });
      } else {
        
        Logger.debug(`AmendmentController.markCompleteAmendment at AmendmentService.updateAmendment ${updatedAmendment}`);
        EmailService.markCompleteAmendmentEmailToCoordinator(req.session.user, updatedAmendment[0]);

        Investigator.findActiveById(updatedAmendment[0].investigatorId.toString(), (findActiveByIdErr, investigator) => {
          if (findActiveByIdErr) {
            Logger.warn(findActiveByIdErr);
            return res.send({ status: 300, message: sails.config.serverMessage.serverError });
          } else {
            console.log('found investigator', investigator)
            EmailService.markCompleteAmendmentEmailToInvestigator(investigator, updatedAmendment[0]);
          }
        });
        ApplicationService.updateProposal(
          proposalId,
          { isAmendmentUnderReview: true },
          { date: new Date(), status: "Mark amendment complete" },
          (error, proposal) => {
            if (error) {
              res.send({
                status: 300,
                message: sails.config.serverMessage.serverError,
              });
            }
            else{
              Logger.info('amendment mark complete', proposal);
            } 
          })

        res.send({ status: 200, proposalData: updatedAmendment[0], message: sails.config.serverMessage.amendmentComplete });
      }
    });
  },
  markIncompleteAmendment(req, res) {
    Logger.debug('AmendmentController.markIncompleteAmendment');
    Logger.debug(req.body);
    const proposalId = req.body.proposalId;
    const commentForMarkInComplete = req.body.commentForMarkInComplete;

    AmendmentService.updateAmendment(proposalId, { isSubmitted: false, commentForMarkInComplete }, { date: new Date(), status: "Amendment Mark InComplete" }, (err, updatedAmendment) => {
      if (err) {
        Logger.error(`AmendmentController.markIncompleteAmendment at AmendmentService.updateAmendment ${err}`)
        res.send({ status: 300, message: sails.config.serverMessage.serverError });
      } else {
        Logger.debug(`AmendmentController.markIncompleteAmendment at AmendmentService.updateAmendment ${updatedAmendment}`);

        ApplicationService.updateProposal(proposalId, { isAppliedForAmendment: false, status: 'Draft' }, { date: new Date(), status: 'Mark amendment incomplete' }, (error, updatedProposal) => {
          if (error) {
            Logger.error(`AmendmentController.updateAmendment at ApplicationService.updateProposal ${error}`);
            return res.send({ status: 300, message: sails.config.serverMessage.serverError })
          } else {
            Logger.debug(`AmendmentController.updateAmendment at ApplicationService.updateProposal ${updatedProposal}`);
           
          }
        });
        EmailService.markIncompleteAmendmentEmailToCoordinator(req.session.user, updatedAmendment[0]);

        Investigator.findActiveById(updatedAmendment[0].investigatorId.toString(), (findActiveByIdErr, investigator) => {
          if (findActiveByIdErr) {
            Logger.warn(findActiveByIdErr);
            return res.send({ status: 300, message: sails.config.serverMessage.serverError });
          } else {
            console.log('found investigator', investigator)
            EmailService.markIncompleteAmendmentEmailToInvestigator(investigator, updatedAmendment[0]);
          }
        });
        res.send({ status: 200, proposalData: updatedAmendment[0], message: sails.config.serverMessage.amendmentIncomplete });
      }
    });
  },
  rejectAmendmentByCoordinatorBeforeAssigningReview(req, res) {
    Logger.debug('ApplicationController.rejectAmendmentByCoordinatorBeforeAssigningReview');
    const proposalId = req.params['proposalId'];
    Logger.debug(proposalId);

    const rejectionComment = req.body.rejectionComment;
    if (!proposalId) {
      res.send({ status: 300, message: sails.config.serverMessage.serverError });
    }
    AmendmentService.updateAmendment(proposalId, { isRejected: true, rejectionComment }, { date: new Date(), status: "Amendment Rejected" }, (err, updatedAmendment) => {
      if (err) {
        res.send({ status: 300, message: sails.config.serverMessage.serverError });
      } else {
        ApplicationService.updateProposal(proposalId, { isAppliedForAmendment: true, isAmendmentRejected:true }, { date: new Date(), status: 'Rejected Amendment' }, (err1, updatedProposal) => {
          if (err1) {
            Logger.error(`AmendmentController.rejectAmendmentByCoordinatorBeforeAssigningReview at AmendmentService.updateAmendment ${err1}`);
            return res.send({ status: 300, message: sails.config.serverMessage.serverError })
          } else {
            Logger.debug(`AmendmentController.rejectAmendmentByCoordinatorBeforeAssigningReview at AmendmentService.updateAmendment ${updatedProposal[0]}`);
            EmailService.rejectAmendmentEmailToCoordinator(req.session.user, updatedProposal[0]);

        Investigator.findActiveById(updatedProposal[0].investigatorId.toString(), (findActiveByIdErr, investigator) => {
          if (findActiveByIdErr) {
            Logger.warn(findActiveByIdErr);
            res.send({ status: 300, message: sails.config.serverMessage.serverError });
          } else {
            Logger.warn(`found investigator ${investigator}`);
            EmailService.rejectAmendmentEmailToInvestigator(investigator, updatedProposal[0]);
          }
        });
        res.send({ status: 200, amendmentData: updatedAmendment, message: sails.config.serverMessage.rejectAmendment });

          }
        });
              }
    });
  },
  assignReviewTypeAfterAmendment(req, res) {
    Logger.debug('AmendmentController.assignReviewTypeAfterAmendment');
    const proposalId = req.body.proposalId;
    let fullReviewEndDate, fullReviewEndDateReminder;
    let reviewType;
    let reviewName;
    if (req.body.reviewType === 'exemptedReview') {
      reviewType = sails.config.reviewTypeMapping.Exempted_Review
      reviewName = "Exempted"
    } else if (req.body.reviewType === 'fullReview') {
      reviewName = "Full Review"
      fullReviewEndDate = new Date();
      fullReviewEndDateReminder = new Date();
      fullReviewEndDateReminder.setDate(fullReviewEndDate.getDate() + 25);
      fullReviewEndDate.setDate(fullReviewEndDate.getDate() + 30);

      Logger.verbose('fullReviewEndDate');
      Logger.verbose(fullReviewEndDate);
      reviewType = sails.config.reviewTypeMapping.Full_Review
    }
    Logger.verbose('req.body.reviewType')
    Logger.verbose(proposalId);
    Logger.verbose(reviewType);
    ApplicationService.updateProposal(
      proposalId,
      { isAmendmentUnderReview: true },
      { date: new Date(), status: 'Amendment Under Review - ' + reviewName},
      (error, proposal) => {
        if (error) {
          res.send({
            status: 300,
            message: sails.config.serverMessage.serverError,
          });
        }
        else{
          Logger.info('amendment under reviw', proposal);
        } 
      })
    AmendmentService.updateAmendment(proposalId, reviewType === 2 ? { reviewType, isUnderReview: true, fullReviewEndDate } : { reviewType, isUnderReview: true }, { date: new Date(), status: 'Under Review - ' + reviewName }, (err, updatedProposal) => {
      if (err) {
        Logger.error(`AmendmentController.assignReviewTypeAfterAmendment at ApplicationService.updateProposal ${err}`)
        return res.send({ status: 300, message: sails.config.serverMessage.serverError });
      } else {
        
        if (updatedProposal[0].reviewType === 0) {
          Logger.info(`its for exempted review process ${req.session.user}`);
          EmailService.AssignedForExemptedReviewToCoordinator(req.session.user, updatedProposal[0]);

          InternalUserService.getChair((error, chairData) => {
            if (error) {
              Logger.error(`AmendmentController.assignReviewTypeAfterAmendment at InternalUserService.getChair ${error}`)
              res.send({ status: 300, message: error.message });
            }
            else {
              console.log('chair data', chairData[0])
              EmailService.AssignedForExemptedReviewToChair(chairData[0], updatedProposal[0]);
            }
          });
          let investigatorId = updatedProposal[0].investigatorId.toString();
          Logger.debug('investigator Id in find investigator')
          Logger.verbose(investigatorId)
          InvestigatorService.getInvestigator(investigatorId, (error, investigatorData) => {
            if (error) {
              Logger.error(`AmendmentController.assignReviewTypeAfterAmendment at InvestigatorService.getInvestigator ${error}`)
              res.send({ status: 300, message: error.message });
            }
            else {
              console.log('investigator data', investigatorData)
              EmailService.amendmentAssignedForReviewToInvestigator(investigatorData, updatedProposal[0]);
            }
          })
        }
        else if (updatedProposal[0].reviewType === 2) {
          Logger.info('its for full review process', req.session.user);
          EmailService.AssignedForFullReviewToCoordinator(req.session.user, updatedProposal[0]);

          let investigatorId = updatedProposal[0].investigatorId.toString();
          Logger.debug('investigator Id in find investigator')
          Logger.verbose(investigatorId)
          InvestigatorService.getInvestigator(investigatorId, (error, investigatorData) => {
            if (error) {
              Logger.error(`AmendmentController.assignReviewTypeAfterAmendment at InvestigatorService.getInvestigator ${error}`)
              res.send({ status: 300, message: error.message });
            }
            else {
              Logger.debug('investigator data');
              Logger.info(investigatorData)
              EmailService.amendmentAssignedForReviewToInvestigator(investigatorData, updatedProposal[0]);
            }
          });
          InternalUserService.getAllCommitteeMember((getErr, committeeMembers) => {
            if (getErr) {
              Logger.error(`AmendmentController.assignReviewTypeAfterAmendment at InternalUserService.getAllCommitteeMember ${getErr}`)
              res.send({ status: 300, message: getErr.message });
            }
            else {
              console.log('committeeMembers', committeeMembers);
              EmailService.AssignedForFullReviewToReviewer(committeeMembers, updatedProposal[0]);
            }
          })

          updatedProposal[0]._id = new ObjectId(updatedProposal[0].id);//ask why
          AgendaService.startAgenda([req.session.user, updatedProposal[0]], fullReviewEndDateReminder);
        }
        if(updatedProposal[0].isUnderReview){
          
        }
        
        return res.send({ status: 200, proposalData: updatedProposal[0], message: sails.config.serverMessage.reviewTypeAssigned });
      }
    });
  },
  assignReviewers(req, res) {
    Logger.debug('AmendmentController.assignReviewers');
    const proposalId = req.body.proposalId;
    const assignedReviewersFromBody = req.body.data;
    let expeditedReviewEndDate, expeditedReviewEndDateReminder;
    let reviewType;
    if (req.body.reviewType === 'expeditedReview') {
      expeditedReviewEndDate = new Date();
      expeditedReviewEndDateReminder = new Date();
      expeditedReviewEndDateReminder.setDate(expeditedReviewEndDate.getDate() + 11);
      expeditedReviewEndDate.setDate(expeditedReviewEndDate.getDate() + 14);
      Logger.verbose('expeditedReviewEndDate');
      Logger.verbose(expeditedReviewEndDate);
      reviewType = sails.config.reviewTypeMapping.Expedited_Review;

      AmendmentService.getAmendmentByProposalId(proposalId, (err2, foundProposal) => {
        if (err2) {
          Logger.error(`AmendmentController.assignReviewers at AmendmentService.getAmendmentByProposalId ${err2}`)
          console.log('error while getting proposal')
        }
        else {
          Logger.debug('AmendmentController.assignReviewers at AmendmentService.getAmendmentByProposalId')
          Logger.debug(foundProposal);
          let finalReviewersArray = [];

          if (foundProposal.assignedReviewers !== undefined) {
            console.log('inside if of foundProposal.assignedReviewers !== undefined')
            foundProposal.assignedReviewers.forEach(existingReviewer => {
              assignedReviewersFromBody.forEach(newReviewer => {
                if (newReviewer.isReviewAccepted === "true") {
                  finalReviewersArray.push(newReviewer)
                }
                else if (newReviewer.isReviewAccepted === "false" || newReviewer.isReviewAccepted === undefined) {
                  if (existingReviewer.id === newReviewer.id &&
                    (existingReviewer.isReviewAccepted === "false" && newReviewer.isReviewAccepted === undefined)
                    || (existingReviewer.isReviewAccepted === undefined && newReviewer.isReviewAccepted === undefined)
                  ) {
                    finalReviewersArray.push(newReviewer)
                  }
                  else if (existingReviewer.id !== newReviewer.id) {
                    finalReviewersArray.push(newReviewer);
                  }
                }
              });
            });
            finalReviewersArray = finalReviewersArray.filter(function (value, index, finalArray) {
                return finalArray.indexOf(value) === index;
              });
            console.log('finalReviewersArray ', finalReviewersArray);
            ApplicationService.updateProposal(
              proposalId,
              { isAmendmentUnderReview: true },
              { date: new Date(), status: "Amendment Under Review - Expedited"},
              (error, proposal) => {
                if (error) {
                  res.send({
                    status: 300,
                    message: sails.config.serverMessage.serverError,
                  });
                }
                else{
                  Logger.info('amendment under reviw', proposal);
                } 
              })
            AmendmentService.updateAmendment(proposalId,
              { reviewType, isUnderReview: true, assignedReviewers: finalReviewersArray },
              { date: new Date(), status: 'Under Review - Expedited' },
              (err, updatedProposal) => {
                if (err) {
                  Logger.error(`AmendmentController.assignReviewers at AmendmentService.updateAmendment ${err}`)
                  res.send({ status: 300, message: sails.config.serverMessage.serverError });
                }
                else {
                  Logger.debug(`AmendmentController.assignReviewers at AmendmentService.updateAmendment`);
                  Logger.debug(updatedProposal);
                  console.log('updated proposal', updatedProposal)
                  let finalProposalArray = [];

                  let proposalToBeSentToReviewers = {
                    proposalId: updatedProposal[0].proposalId,
                    proposalTitle: updatedProposal[0].title,
                    investigatorId: updatedProposal[0].investigatorId.toString(),
                    reviewType: updatedProposal[0].reviewType
                  };
                  let reviewersInUpdatedProposal = updatedProposal[0].assignedReviewers;
                  console.log('reviewersInUpdatedProposal', reviewersInUpdatedProposal)

                  reviewersInUpdatedProposal.forEach(reviewerInUpdatedProposal => {
                    console.log('each reviewerInUpdatedProposal', reviewerInUpdatedProposal)
                    if(reviewerInUpdatedProposal.isReviewAccepted==='false'|| reviewerInUpdatedProposal.isReviewAccepted===undefined)
                    {
                      InternalUserService.getInternalUser(reviewerInUpdatedProposal.id, (getUserErr, getUserData) => {
                        if (getUserErr) {
                          Logger.error(`AmendmentController.assignReviewers at InternalUserService.getInternalUser ${getUserErr}`)
                          res.send({ status: 300, message: sails.config.serverMessage.serverError });
                        } else {
                          if (getUserData.assignedAmendment !== undefined && getUserData.assignedAmendment.length !== 0) {
                            console.log('getUserData', getUserData)
                            console.log('role=',getUserData.role)
                            getUserData.assignedAmendment.forEach(existingProposal => {
                              if (existingProposal.proposalId === proposalToBeSentToReviewers.proposalId &&
                                ((reviewerInUpdatedProposal.isReviewAccepted === undefined && existingProposal.isProposalAcceptedForReview === undefined) ||
                                  (reviewerInUpdatedProposal.isReviewAccepted === undefined && existingProposal.isProposalAcceptedForReview === "false") 
                                )) {
                                finalProposalArray.push(proposalToBeSentToReviewers)
                                console.log('final array in if', finalProposalArray)
                              } 
                              else if (existingProposal.proposalId !== proposalToBeSentToReviewers.proposalId) {
                                finalProposalArray.push(existingProposal);
                                finalProposalArray.push(proposalToBeSentToReviewers);
                                console.log('final array in else if 2', finalProposalArray)
                              }
                            });
                          }
                          else {
                            finalProposalArray.push(proposalToBeSentToReviewers)
                            console.log('final array in else', finalProposalArray)
                          }
                          finalProposalArray = finalProposalArray.filter(function (value, index, finalArray) {
                            return finalArray.indexOf(value) === index;
                          });
                        }
                        InternalUserService.updateInternalUser(reviewerInUpdatedProposal.id, { assignedAmendment: finalProposalArray }, (err1, updatedInternalUser) => {
                          if (err1) {
                            Logger.error(`AmendmentController.assignReviewers at InternalUserService.updateInternalUser ${err1}`);
                            res.send({ status: 300, message: sails.config.serverMessage.serverError });
                          } else {
                            Logger.debug('AmendmentController.assignReviewers at InternalUserService.updateInternalUser');
                            Logger.debug(updatedInternalUser);
                          }
                        });
                        finalProposalArray = [];
                      })
                    }
                  });

                  if (updatedProposal[0].reviewType === 1) {
                    console.log('it goes into this')
                    EmailService.AssignedForExpeditedReviewToCoordinator(req.session.user, updatedProposal[0]);
                    EmailService.AssignedForExpeditedReviewToReviewer(req.session.user, updatedProposal[0]);

                    let investigatorId = updatedProposal[0].investigatorId.toString();
                    console.log('investigator id type', typeof investigatorId);
                    console.log('investigator id', investigatorId);

                    InvestigatorService.getInvestigator(investigatorId, (error, investigatorData) => {
                      if (error) {
                        console.log('error is getting investigator in review type 1')
                        res.send({ status: 300, message: error.message });
                      }
                      else {
                        console.log('investigator data in review type 1', investigatorData)
                        EmailService.amendmentAssignedForReviewToInvestigator(investigatorData, updatedProposal[0]);
                      }
                    })
                  }
                }
                res.send({ status: 200, proposalData: updatedProposal, message: sails.config.serverMessage.proposalAssignedForReview });
              })
          }
          else {
            ApplicationService.updateProposal(
              proposalId,
              { isAmendmentUnderReview: true },
              { date: new Date(), status: "Amendment Under Review - Expedited"},
              (error, proposal) => {
                if (error) {
                  res.send({
                    status: 300,
                    message: sails.config.serverMessage.serverError,
                  });
                }
                else{
                  Logger.info('amendment under reviw', proposal);
                } 
              })
            console.log('inside else of foundProposal.assignedReviewers !== undefined')
            AmendmentService.updateAmendment(proposalId,
              { reviewType, isUnderReview: true, assignedReviewers: assignedReviewersFromBody },
              { date: new Date(), status: 'Under Review - Expedited' },
              (err, updatedProposal) => {
                if (err) {
                  Logger.error(`AmendmentController.assignReviewers at AmendmentService.updateAmendment ${err}`)
                  res.send({ status: 300, message: sails.config.serverMessage.serverError });
                }
                else {
                  Logger.debug(`AmendmentController.assignReviewers at AmendmentService.updateAmendment`);
                  Logger.debug(updatedProposal);
                  console.log('updated proposal', updatedProposal)
                  let finalProposalArray = [];

                  let proposalToBeSentToReviewers = {
                    proposalId: updatedProposal[0].proposalId,
                    proposalTitle: updatedProposal[0].title,
                    investigatorId: updatedProposal[0].investigatorId.toString(),
                    reviewType: updatedProposal[0].reviewType
                  };
                  let reviewersInUpdatedProposal = updatedProposal[0].assignedReviewers;
                  console.log('reviewersInUpdatedProposal', reviewersInUpdatedProposal)

                  reviewersInUpdatedProposal.forEach(reviewerInUpdatedProposal => {
                    if(reviewerInUpdatedProposal.isReviewAccepted==='false'|| reviewerInUpdatedProposal.isReviewAccepted===undefined)
                    {
                      InternalUserService.getInternalUser(reviewerInUpdatedProposal.id, (getUserErr, getUserData) => {
                        if (getUserErr) {
                          Logger.error(`AmendmentController.assignReviewers at InternalUserService.getInternalUser ${getUserErr}`)
                          res.send({ status: 300, message: sails.config.serverMessage.serverError });
                        } else {
                          if (getUserData.assignedAmendment !== undefined && getUserData.assignedAmendment.length !== 0) {
                            getUserData.assignedAmendment.forEach(existingProposal => {
                              if (existingProposal.proposalId === proposalToBeSentToReviewers.proposalId &&
                                ((reviewerInUpdatedProposal.isReviewAccepted === undefined && existingProposal.isProposalAcceptedForReview === undefined) ||
                                  (reviewerInUpdatedProposal.isReviewAccepted === undefined && existingProposal.isProposalAcceptedForReview === "false") 
                                  // )
                                )
                              ) {
                                finalProposalArray.push(proposalToBeSentToReviewers)
                                console.log('final array in if', finalProposalArray)
                              } 
                              else if (existingProposal.proposalId !== proposalToBeSentToReviewers.proposalId) {
                                finalProposalArray.push(existingProposal);
                                finalProposalArray.push(proposalToBeSentToReviewers);
                                console.log('final array in else if 2', finalProposalArray)
                              }
                            });
                          }
                          else {
                            finalProposalArray.push(proposalToBeSentToReviewers)
                            console.log('final array in else', finalProposalArray)
                          }
                          finalProposalArray = finalProposalArray.filter(function (value, index, finalArray) {
                            return finalArray.indexOf(value) === index;
                          });
                        }
                        InternalUserService.updateInternalUser(reviewerInUpdatedProposal.id, { assignedAmendment: finalProposalArray }, (err1, updatedInternalUser) => {
                          if (err1) {
                            Logger.error(`AmendmentController.assignReviewers at InternalUserService.updateInternalUser ${err1}`);
                            res.send({ status: 300, message: sails.config.serverMessage.serverError });
                          } else {
                            Logger.debug('AmendmentController.assignReviewers at InternalUserService.updateInternalUser');
                            Logger.debug(updatedInternalUser);
                          }
                        });
                        finalProposalArray = [];
                      })
                    }
                  });

                  if (updatedProposal[0].reviewType === 1) {
                    console.log('it goes into this')
                    EmailService.AssignedForExpeditedReviewToCoordinator(req.session.user, updatedProposal[0]);
                    EmailService.AssignedForExpeditedReviewToReviewer(req.session.user, updatedProposal[0]);

                    let investigatorId = updatedProposal[0].investigatorId.toString();
                    console.log('investigator id type', typeof investigatorId);
                    console.log('investigator id', investigatorId);

                    InvestigatorService.getInvestigator(investigatorId, (error, investigatorData) => {
                      if (error) {
                        console.log('error is getting investigator in review type 1')
                        res.send({ status: 300, message: error.message });
                      }
                      else {
                        console.log('investigator data in review type 1', investigatorData)
                        EmailService.amendmentAssignedForReviewToInvestigator(investigatorData, updatedProposal[0]);
                      }
                    })
                  }
                }
                res.send({ status: 200, proposalData: updatedProposal, message: sails.config.serverMessage.proposalAssignedForReview });
              });
          }
        }
      })
    }
    else {
      res.send({ status: 300, message: sails.config.serverMessage.serverError })
    }
  },
  getAmendmentByProposalId(req, res) {
    Logger.debug(`AmendmentController.getAmendmentByProposalId`);
    const proposalId = req.params['proposalId'];
    AmendmentService.getAmendmentByProposalId(proposalId, (err, amendmentData) => {
      if (err) {
        if (err === 'Amendment Not found') {
          Logger.error(`AmendmentController.getAmendmentByProposalId : Amendment Not found`)
          res.send({ status: 300, message: 'Amendment Not found' });
        } else {
          Logger.error(`AmendmentController.getAmendmentByProposalId ${sails.config.serverMessage.serverError}`)
          res.send({ status: 300, message: sails.config.serverMessage.serverError });
        }
      } else {
        Logger.debug(`AmendmentController.getAmendmentByProposalId at AmendmentService.getAmendmentByProposalId ${amendmentData}`)
        res.send({ status: 200, data: amendmentData, message: 'Amendment found successfully' });
      }
    })
  },
  searchAmendmentRequest(req,res){
    Logger.debug("AmendmentController.searchAmendmentRequest");
    const searchTerm = req.params["searchTerm"];
    Logger.verbose(searchTerm);
    if (!searchTerm) {
      console.log("in here");
      res.send({ status: 300, message: "Server error. Please try again." });
    }else if(searchTerm.length <= 2){
      res.send({ status: 300, message: 'Search term length must be greater than 2' });
    } 
    else {
      AmendmentService.searchAmendment(searchTerm, (err, amendmentRequests) => {
        if (err) {
          console.log(err);
          res.send({ status: 300, message: "Server error. Please try again." });
        } else {
          if(amendmentRequests.length==0){
            res.send({ status: 200, message:'No results found' });
          }
          else{
            res.send({ status: 200, amendmentRequests });
          }
          
        }
      });
    }

  },
  withdrawAmendment(req, res) {
    Logger.debug('AmendmentController.withdrawProposal');
    const proposalId = req.body.proposalId;
    const withdrawComment = req.body.withdrawComment;

    Logger.verbose(proposalId);
    Logger.verbose(withdrawComment);

    AmendmentService.getAmendmentByProposalId(proposalId, (error, amendmentData) => {
      if (error) {
        if (error === 'Proposal Not found') {
          Logger.error(`AmendmentController.getAmendmentByProposalId : Amendment Not found`)
          res.send({ status: 300, message: 'Amendment Not found' });
        } else {
          Logger.error(`AmendmentController.getAmendmentByProposalId ${sails.config.serverMessage.serverError}`)
          res.send({ status: 300, message: sails.config.serverMessage.serverError });
        }
      } else if(amendmentData) {
        Logger.debug(`AmendmentController.getAmendmentByProposalId at AmendmentService.getAmendmentByProposalId`);
        Logger.debug(amendmentData)
        if (amendmentData[0] && (amendmentData[0].isUnderReview || amendmentData[0].isUnderSigned || amendmentData[0].isRejected)) {
          console.log('withdraw process is not valid');
          res.send({ status: 300, proposalData: amendmentData, message: sails.config.serverMessage.invalidWithdrawProcess });
        }
        else {
          AmendmentService.updateAmendment(proposalId, { withdrawComment, isAmendmentWithdrawn: true, isActive: false }, { date: new Date(), status: 'Amendment Withdrawn' }, (err, updatedProposal) => {
            if (err) {
              res.send({ status: 300, message: sails.config.serverMessage.serverError });
            } else {
              console.log('updated proposal', updatedProposal);
              InternalUserService.getCoordinator((fetchErr, coordinatorData) => {
                if (fetchErr) {
                  console.log('error while fetching coordinator data');
                  res.send({ status: 300, message: sails.config.serverMessage.serverError });
                }
                else {
                  console.log('coordinator data', coordinatorData);
                  EmailService.withdrawAmendmentEmailToCoordinator(coordinatorData[0], updatedProposal[0]);
                }
              })
              EmailService.withdrawAmendmentEmailToInvestigator(req.session.user, updatedProposal[0]);
              ApplicationService.updateProposal(
                proposalId,
                { isAmendmentWithdrawn: true },
                { date: new Date(), status: "Amendment withdrawn" },
                (error1, proposal) => {
                  if (error1) {
                    res.send({
                      status: 300,
                      message: sails.config.serverMessage.serverError,
                    });
                  }
                  else{
                    Logger.info('amendment mark complete', proposal);
                  } 
                }) 

              res.send({ status: 200, proposalData: updatedProposal, message: sails.config.serverMessage.amendmentWithdrawn });
            }
          });
        }
      }
    });
  }, 
  
  markAmendmentUnderSigned(req,res){
    Logger.debug("ApplicationController.markProposalUnderSigned");
    const proposalId = req.body.proposalId;
    const commentForApproveReject=req.body.commentForApproveReject;
    Logger.verbose(proposalId);
    AmendmentService.updateAmendment(
      proposalId,
      { isUnderReview: false, isUnderSigned: true ,commentForApproveReject},
      { date: new Date(), status: "Approved" },
      (err, updatedAmendment) => {
        if (err) {
          res.send({
            status: 300,
            message: sails.config.serverMessage.serverError,
          });
        } else {
          /**email to chair and coordinator */
          EmailService.amendmentApprovedToCoordinator(
            req.session.user,
            updatedAmendment[0]
          );
          InternalUserService.getChair((error, chairData) => {
            if (error) {
              console.log("error is getting chair data");
              res.send({ status: 300, message: error.message });
            } else {
              console.log("chair data", chairData[0]);
              EmailService.amendmentApprovedToChair(
                chairData[0],
                updatedAmendment[0]
              );
            }
          });
          ApplicationService.updateProposal(
            proposalId,
            { isAmendmentUnderSigned: true },
            { date: new Date(), status: "Amendment Approved" },
            (error, proposal) => {
              if (error) {
                res.send({
                  status: 300,
                  message: sails.config.serverMessage.serverError,
                });
              }
              else{
                Logger.info('amendment approved', proposal);
              } 
            })
          res.send({
            status: 200,
            amendmentData: updatedAmendment,
            message: sails.config.serverMessage.amendmentUnderSign,
          });
        }
      }
    );
  },
  rejectAmendmentByCoordinatorAfterReview(req,res){
    Logger.debug(
      "AmendmentController.rejectAmendmentByCoordinatorAfterReview"
    );
    const proposalId = req.body.proposalId;
    Logger.verbose(proposalId);
    let commentForApproveReject = req.body.commentForApproveReject;
    console.log("what is in rejection Comment", commentForApproveReject);
    AmendmentService.updateAmendment(
      proposalId,
      { isUnderReview: false, isRejected: true, commentForApproveReject },
      { date: new Date(), status: "Rejected" },
      (err, updatedAmendment) => {
        if (err) {
          res.send({
            status: 300,
            message: sails.config.serverMessage.serverError,
          });
        } else {
          Investigator.findActiveById(
            updatedAmendment[0].investigatorId.toString(),
            (findActiveByIdErr, investigator) => {
              if (findActiveByIdErr) {
                Logger.warn(findActiveByIdErr);
                res.send({
                  status: 300,
                  message: sails.config.serverMessage.serverError,
                });
              } else {
                // eslint-disable-next-line no-underscore-dangle
                updatedAmendment[0]._id = new ObjectId(updatedAmendment[0].id);
                EmailService.rejectAmendmentEmailToInvestigator(
                  investigator,
                  updatedAmendment[0]
                );
                EmailService.rejectAmendmentEmailToCoordinator(
                  req.session.user,
                  updatedAmendment[0]
                );
                ApplicationService.updateProposal(
                  proposalId,
                  { isAmendmentRejected:true },
                  { date: new Date(), status: "Amendment rejected" },
                  (error, proposal) => {
                    if (error) {
                      res.send({
                        status: 300,
                        message: sails.config.serverMessage.serverError,
                      });
                    }
                    else{
                      Logger.info('amendment rejected', proposal);
                    } 
                  })
                res.send({
                  status: 200,
                  amendmentData: updatedAmendment,
                  message: sails.config.serverMessage.rejectAmendment,
                });
              }
            }
          );
        }
      }
    );
  },
  getAllAmendmentForSign(req,res){
    Logger.debug("AmendmentController.getAllAmendmentForSign");
    AmendmentService.getAllAmendmentForSign((error, amendmentData) => {
      if (error) {
        console.log("error", error);
        res.send({
          status: 300,
          message: sails.config.serverMessage.serverError,
        });
      } else {
        res.send({ status: 200, amendmentData });
      }
    });
  },
  getAmendmentExpectInvestigator(req, res) {
    Logger.debug("AmendmentController.getAmendmentExpectInvestigator");
    const proposalId = req.body.proposalId;
    Logger.verbose(proposalId);
    if (!proposalId) {
      res.send({
        status: 300,
        message: sails.config.serverMessage.serverError,
      });
    } else {
      AmendmentService.getAmendmentExpectInvestigator(
        proposalId,
        (err, amendmentData) => {
          if (err) {
            if (err === "Amendment if not match") {
              res.send({
                status: 300,
                message: sails.config.serverMessage.invalidURL,
                idNotMatch: "idNotMatch",
              });
            } else {
              res.send({
                status: 300,
                message: sails.config.serverMessage.serverError,
              });
            }
          } else {
            res.send({ status: 200, amendmentData });
          }
        }
      );
    }
  },
  markAmendmentAsResearch(req,res){
    Logger.debug("AmendmentController.markAmendmentAsResearch");
    const proposalId = req.body.proposalId;
    const chairPerson = req.body.chairPersonDetails;
    const chairPersonSign = req.body.chairPersonSign;
    console.log("chair person details", chairPerson);
    Logger.verbose(proposalId);
    const dateOfApproval = new Date();

    AmendmentService.updateAmendment(
      proposalId,
      {
        chairPerson,
        chairPersonSign,
        dateOfApproval,
        isResearch: true,
        isSubmitted: false,
        isComplete: false,
        isUnderReview: false,
        isUnderSigned: false,
      },
      { date: new Date(), status: "Mark Research" },
      (err, updatedAmendment) => {
        if (err) {
          res.send({
            status: 300,
            message: sails.config.serverMessage.serverError,
          });
        } else {
          ApplicationService.updateProposal(
            proposalId,
            { isAmendmentResearch:true },
            { date: new Date(), status: "Amendment mark as research" },
            (error, proposal) => {
              if (error) {
                res.send({
                  status: 300,
                  message: sails.config.serverMessage.serverError,
                });
              }
              else{
                Logger.info('amendment research', proposal);
              } 
            })
          EmailService.markResearchAmendmentEmailToChair(
            req.session.user,
            updatedAmendment[0]
          );
          InternalUserService.getCoordinator(
            (findActiveByIdErr, coordinator) => {
              if (findActiveByIdErr) {
                Logger.warn(findActiveByIdErr);
                res.send({
                  status: 300,
                  message: sails.config.serverMessage.serverError,
                });
              } else {
               
                updatedAmendment[0]._id = new ObjectId(updatedAmendment[0].id);
                EmailService.markResearchAmendmentEmailToCoordinator(
                  coordinator[0],
                  updatedAmendment[0]
                );
                res.send({
                  status: 200,
                  amendmentData: updatedAmendment[0],
                  message: sails.config.serverMessage.amendmentMarkedResearch,
                });
              }
            }
          );
          Investigator.findActiveById(
            updatedAmendment[0].investigatorId.toString(),
            (findActiveByIdErr, investigator) => {
              if (findActiveByIdErr) {
                Logger.warn(findActiveByIdErr);
                res.send({
                  status: 300,
                  message: sails.config.serverMessage.serverError,
                });
              } else {
               
                updatedAmendment[0]._id = new ObjectId(updatedAmendment[0].id);
                console.log(investigator);
                EmailService.markResearchAmendmentEmailToInvestigator(
                  investigator,
                  updatedAmendment[0]
                );
                res.send({
                  status: 200,
                  amendmentData: updatedAmendment[0],
                  message: sails.config.serverMessage.amendmentMarkedResearch,
                });
              }
            }
          );
        }
      }
    );
  },
  amendmentHistory(req,res){
    Logger.debug("AmendmentController.amendmentHistory");
    const proposalId = req.params["proposalId"];
    console.log(proposalId);
    Logger.verbose(proposalId);
    if (!proposalId) {
      console.log("in here");
      res.send({ status: 300, message: "Server error. Please try again." });
    } else {
      AmendmentService.getAmendmentHistory(proposalId, (err, amendmentData) => {
        if (err) {
          console.log(err);
          res.send({ status: 300, message: "Server error. Please try again." });
        } else {
          res.send({ status: 200, amendmentData });
        }
      });
    }
  },
};
