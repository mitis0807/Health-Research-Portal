


module.exports = {
  saveAnnouncement(req, res) {
    Logger.debug("AnnouncementController.saveAnnouncement");
    console.log("request....", req.body);
    const announcementData = req.body.data;
    const args = [
      {
        name: "Title",
        value: announcementData.title,
        validations: [
          {
            validation: "notEmpty",
            message:
              sails.config.ValidationMessages
                .announcementTitleRequiredValidation,
          },
        ],
      },
      {
        name: "Content",
        value: announcementData.content,
        validations: [
          {
            validation: "notEmpty",
            message:
              sails.config.ValidationMessages
                .announcementContentRequiredValidation,
          },
        ],
      },
    ];
    if (!announcementData) {
      res.send({ status: 300, message: "Server error. Please try again." });
    } else {
      ValidateService.validate(args, (validationErr, validationErrMsgs) => {
        if (validationErr) {
          Logger.error(
            `AnnouncementController.saveAnnouncement at ValidateService.validate ${validationErr}`
          );
          res.send({
            status: 300,
            message: sails.config.serverMessage.serverError,
          });
        } else if (validationErrMsgs.length === 0) {
          AnnouncementService.saveAnnouncement(
            announcementData,
            (err, savedAnnouncement) => {
              if (err) {
                console.log(err);
                res.send({
                  status: 300,
                  message: "Server error. Please try again.",
                });
              } else {
                if(req.session.user.role === 2){
                  InternalUser.findActiveByCriteria({role: 1}, (error, admin) => {
                    if (error) {
                      Logger.error(`AnnouncementController.saveAnnouncement at InternalUser.findActiveByCriteria ${error}`);
                    } else {
                      EmailService.announcementAddedEmailToAdmin(admin, savedAnnouncement);
                      EmailService.announcementAddedEmailToCoordinator(req.session.user, savedAnnouncement);
                        
                      res.send({
                        status: 200,
                        message: "Announcement added successfully",
                        announcementData: savedAnnouncement,
                      });
                    }
                  });
                } else {
                  InternalUser.findActiveByCriteria({ isActive: true, role: 2, isVerified : true}, (error, coordinator) => {
                    if (error) {
                      Logger.error('for admin in session.....')
                      Logger.error(`AnnouncementController.saveAnnouncement at InternalUser.findActiveByCriteria ${error}`);
                    } else {
                      EmailService.announcementAddedEmailToAdmin(req.session.user, savedAnnouncement);
                      if(coordinator!==undefined)
                       EmailService.announcementAddedEmailToCoordinator(coordinator, savedAnnouncement);
                      res.send({
                        status: 200,
                        message: "Announcement added successfully",
                        announcementData: savedAnnouncement,
                      });
                    }
                  });
                }
              }
            }
          );
        } else {
          ValidateService.getValidateMsg(
            validationErrMsgs,
            (getValidateMsgErr, errMsgs) => {
              if (getValidateMsgErr) {
                Logger.error(
                  `AnnouncementController.saveAnnouncement at ValidateService.getValidateMsg ${getValidateMsgErr}`
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
    }
  },

  getAnnouncementById(req, res) {
    Logger.debug("AnnouncementController.getAnnouncementById");
    const announcementId = req.params["announcementId"];
    Logger.verbose(announcementId);
    if (!announcementId) {
      res.send({ status: 300, message: "Server error. Please try again." });
    } else {
      AnnouncementService.getAnnouncement(
        announcementId,
        (err, announcementData) => {
          if (err) {
            res.send({
              status: 300,
              message: "Server error. Please try again.",
            });
          } else {
            res.send({ status: 200, announcementData });
          }
        }
      );
    }
  },
  announcementsByIdWithAuth(req, res) {
    Logger.debug("AnnouncementController.announcementsByIdWithAuth");
    const announcementId = req.params["announcementId"];
    Logger.verbose(announcementId);
    if (!announcementId) {
      res.send({ status: 300, message: "Server error. Please try again." });
    } else {
      AnnouncementService.getAnnouncement(announcementId,(err, announcementData) => {
          if (err) {
            res.send({status: 300,message: "Server error. Please try again."});
          } else {
            res.send({ status: 200, announcementData });
          }
      });
    }
  },
  getAnnouncements(req, res) {
    Logger.debug("AnnouncementController.getAnnouncements");
    const pageNo = req.params['pageNo'];

    AnnouncementService.getAllAnnouncements(pageNo, (err, announcementData, totalAnnouncements) => {
      if (err) {
        console.log(err);
        res.send({ status: 300, message: "Server error. Please try again." });
      } else {
        res.send({ status: 200, announcementData, totalAnnouncements});
      }
    });
  },
  
  getActiveAnnouncements(req, res) {
    Logger.debug("AnnouncementController.getActiveAnnouncements");
    const pageNo = req.params['pageNo'];

    AnnouncementService.getActiveAnnouncements(pageNo, (err, activeAnnouncements, activeAnnouncementsCount) => {
      if (err) {
        res.send({ status: 300, message: sails.config.serverMessage.serverError });
      } else {
        res.send({ status: 200, activeAnnouncements, activeAnnouncementsCount });
      }
    });
  },
  updateAnnouncement(req, res) {
    Logger.debug("AnnouncementController.updateAnnouncement");
    const announcementId = req.params.announcementId;
    Logger.debug(announcementId);
    const announcementData = req.body.data;
    Logger.verbose(announcementData);
    if (!announcementId) {
      res.send({ status: 300, message: "Server error. Please try again." });
    } else {
      AnnouncementService.updateAnnouncement(
        announcementId,
        announcementData,
        (err, updatedAnnouncement) => {
          if (err) {
            res.send({
              status: 300,
              message: "Server error. Please try again.",
            });
          } else {
            if(req.session.user.role === 2){
              InternalUser.findActiveByCriteria({role: 1}, (error, admin) => {
                if (error) {
                  Logger.error(`AnnouncementController.updateAnnouncement at InternalUser.findActiveByCriteria ${error}`);
                } else {
                  EmailService.announcementEditedEmailToAdmin(admin, updatedAnnouncement[0]);
                  EmailService.announcementEditedEmailToCoordinator(req.session.user, updatedAnnouncement[0]);
                  res.send({
                    status: 200,
                    message: sails.config.serverMessage.announcementUpdated,
                    announcementData: updatedAnnouncement,
                  });
                }
              });
            } else {
              InternalUser.findActiveByCriteria({ isActive: true, role: 2, isVerified : true}, (error, coordinator) => {
                if (error) {
                  Logger.error(`AnnouncementController.updateAnnouncement at InternalUser.findActiveByCriteria ${error}`);
                } else {
                  EmailService.announcementEditedEmailToAdmin(req.session.user, updatedAnnouncement[0]);
                  if(coordinator!==undefined)
                    EmailService.announcementEditedEmailToCoordinator(coordinator, updatedAnnouncement[0]);
                  res.send({
                    status: 200,
                    message: sails.config.serverMessage.announcementUpdated,
                    announcementData: updatedAnnouncement,
                  });
                }
              });
            }
          }
        }
      );
    }
  },

  deleteAnnouncement(req, res) {
    Logger.debug("AnnouncementController.deleteAnnouncement");
    const announcementId = req.params.announcementId;
    Logger.verbose(announcementId);
    if (!announcementId) {
      res.send({ status: 300, message: "Server error. Please try again." });
    } else {
      AnnouncementService.updateAnnouncement(
        announcementId,
        { isActive: false },
        (err, updatedAnnouncement) => {
          if (err) {
            res.send({
              status: 300,
              message: "Server error. Please try again.",
            });
          } else {
            if(req.session.user.role === 2){
              InternalUser.findActiveByCriteria({role: 1}, (error, admin) => {
                if (error) {
                  Logger.error(`AnnouncementController.deleteAnnouncement at InternalUser.findActiveByCriteria ${error}`);
                } else {
                  EmailService.announcementDeletedEmailToAdmin(admin, updatedAnnouncement[0]);
                  EmailService.announcementDeletedEmailToCoordinator(req.session.user, updatedAnnouncement[0]);
                  res.send({
                    status: 200,
                    message: "Announcement deleted successfully",
                  });
                }
              });
            } else {
              InternalUser.findActiveByCriteria({ isActive: true, role: 2, isVerified : true}, (error, coordinator) => {
                if (error) {
                  Logger.error(`AnnouncementController.deleteAnnouncement at InternalUser.findActiveByCriteria ${error}`);
                } else {
                  EmailService.announcementDeletedEmailToAdmin(req.session.user, updatedAnnouncement[0]);
                  if(coordinator!==undefined)
                    EmailService.announcementDeletedEmailToCoordinator(coordinator, updatedAnnouncement[0]);
                  res.send({
                    status: 200,
                    message: "Announcement deleted successfully",
                  });
                }
              });
            }
          }
        }
      );
    }
  },
  searchAnnouncements(req, res) {
    Logger.debug('ApplicationController.searchAnnouncements');
    const searchTerm = req.params['searchTerm'];
    console.log(searchTerm);
    Logger.verbose(searchTerm);
    if (!searchTerm) {
      res.send({ status: 300, message: 'Server error. Please try again.' });
    } else if(searchTerm.length <= 2){
      res.send({ status: 300, message: 'Search term length must be greater than 2' });
    }else {
      AnnouncementService.searchAnnouncement(searchTerm, (err, announcementData) => {
        if (err) {
          console.log(err)
          res.send({ status: 300, message: 'Server error. Please try again.' });
        } else {
          res.send({ status: 200, announcementData });
        }
      });
    }
  },
};
