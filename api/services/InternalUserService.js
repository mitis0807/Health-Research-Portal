const { element } = require("prop-types");

module.exports = {
  registration(registrationData, callback) {
    Logger.debug("InternalUserService.registration");
    InternalUser.findActiveByCriteria(
      { email: registrationData.email, isActive: true },
      (err, internalUser) => {
        if (err) {
          Logger.error(
            `InternalUserService.registration at InternalUserService.findActiveByCriteria ${err}`
          );
          callback(err);
        } else if (internalUser) {
          Logger.warn("InternalUser already present.");
          callback("Already Present");
        } else {
          delete registrationData.confirmPassword;
          InternalUser.create(registrationData)
            .fetch()
            .exec((createErr, internalUserData) => {
              if (createErr) {
                Logger.error(
                  `InternalUserService.registration at InternalUser.create ${createErr}`
                );
                callback(createErr);
              } else {
                Logger.info("InternalUser details saved successfully.");
                Logger.verbose(internalUserData);
                callback(null, internalUserData);
              }
            });
        }
      }
    );
  },

  updateInternalUser(internalUserId, internalUserData, callback) {
    Logger.debug("InternalUserService.updateInternalUser");
    InternalUser.updateActiveById(
      internalUserId,
      internalUserData,
      (err, updatedInternalUser) => {
        if (err) {
          Logger.error(
            `InternalUserService.updateInternalUser at InternalUser.updateActiveById ${err}`
          );
          console.log("error comes back in service", err);
          callback(err);
        } else {
          Logger.info("InternalUser details updated successfully.");
          callback(null, updatedInternalUser);
        }
      }
    );
  },

  getInternalUser(internalUserId, callback) {
    Logger.debug("InternalUserService.getInternalUser");
    console.log("internalUserId", internalUserId);
    InternalUser.findActiveById(internalUserId, (err, internalUserData) => {
      if (err) {
        Logger.error(
          `InternalUserService.getInternalUser at InternalUser.findActiveById ${err}`
        );
        callback(err);
      } else {
        callback(null, internalUserData);
      }
    });
  },

  sendInvite(internalUserData, callback) {
    internalUserData.email = internalUserData.email.toLowerCase();
    internalUserData.role = parseInt(internalUserData.role, 10);
    console.log("internalUserData.email in service", internalUserData.email);
    console.log("internalUserData.role in service", internalUserData.role);
    console.log("internalUserData in service", internalUserData);

    Logger.debug("InternalUserService.sendInvite");
    InternalUser.findActiveByCriteria(
      { email: internalUserData.email, isActive: true },
      (err, internalUser) => {
        console.log("internalUserData in findActiveByCriteria", internalUser);
        if (err) {
          Logger.error(
            `InternalUserService.sendInvite at InternalUser.findActiveByCriteria ${err}`
          );
          callback(err);
        } else if (internalUser) {
          Logger.warn("Internal User already present.");
          callback("Already Present");
        } else {
          console.log("internalUserData in else");
          InternalUser.create(internalUserData)
            .fetch()
            .exec((createErr, user) => {
              console.log(
                "internalUserData in findcreateActiveByCriteria",
                user
              );
              if (createErr) {
                Logger.error(
                  `InternalUserService.sendInvite at InternalUser.create ${createErr}`
                );
                callback(createErr);
              } else {
                Logger.info("InternalUser details saved successfully.");
                console.log("internalUserData details saved successfully");
                EmailService.sendInviteEmailToInternalUser(user);
                Logger.verbose(user);
                callback(null, user);
              }
            });
        }
      }
    );
  },

  getAllInternalUser(pageNo, limit, search, callback) {
    Logger.debug("InternalUserService.getInternalUser");
    const searchTable = { where: { isActive: true, role: { "!=": 1 } } };
    const skip = (pageNo - 1) * limit;
    if (search !== "" && search !== undefined) {
      const searchObj = [{ firstName: { contains: search } }];
      searchTable.where.or = searchObj;
    }
    InternalUser.countByCriteria(searchTable, (error, count) => {
      if (error) {
        callback(error);
      } else {
        InternalUser.findByPagination(
          searchTable,
          skip,
          limit,
          (err, internalUserData) => {
            if (err) {
              Logger.error(
                `InternalUserService.getInternalUser at InternalUser.findActiveById ${err}`
              );
              callback(err);
            } else {
              callback(null, internalUserData, count);
            }
          }
        );
      }
    });
  },

  checkCoordinatorChairPresent(callback) {
    Logger.debug("InternalUserService.checkCoordinatorChairPresent");
    let isCoordinatorPresent = false;
    let isChairPresent = false;
    let isSeniorStatisticianPresent = false;
    let isPSHMSPresent = false;
    let isHeadPresent = false;
    InternalUser.findActiveByCriteria({ isActive: true, role: 2, isVerified: true }, (err, coordinator) => {
      if (err) {
        Logger.error(`InternalUserService.checkCoordinatorChairPresent at InternalUser.findActiveByCriteria ${err}`);
        callback(err);
      } else {
        InternalUser.findActiveByCriteria({ isActive: true, role: 5, isVerified: true }, (findErr, chair) => {
          console.log('chairrrrrrrrrrrrr');
          console.log(chair);
          if (findErr) {
            Logger.error(`InternalUserService.checkCoordinatorChairPresent at InternalUser.findActiveByCriteria ${err}`);
            callback(findErr);
          } else {
            InternalUser.findActiveByCriteria({ isActive: true, role: 8, isVerified: true }, (findSSErr, senior) => {
              if (findSSErr) {
                Logger.error(`InternalUserService.checkCoordinatorChairPresent at InternalUser.findActiveByCriteria ${findSSErr}`);
                callback(findSSErr);
              } else {
                InternalUser.findActiveByCriteria({ isActive: true, role: 9, isVerified: true }, (findPSHMSErr, PSHMS) => {
                  if (findPSHMSErr) {
                    Logger.error(`InternalUserService.checkCoordinatorChairPresent at InternalUser.findActiveByCriteria ${findPSHMSErr}`);
                    callback(findPSHMSErr);
                  } else {
                    InternalUser.findActiveByCriteria({ isActive: true, role: 10, isVerified: true }, (findHeadErr, Head) => {
                      if (findHeadErr) {
                        Logger.error(`InternalUserService.checkCoordinatorChairPresent at InternalUser.findActiveByCriteria ${findHeadErr}`);
                        callback(findHeadErr);
                      } else {
                        isCoordinatorPresent = !!coordinator;
                        isChairPresent = !!chair;
                        isSeniorStatisticianPresent = !! senior;
                        isPSHMSPresent = !! PSHMS;
                        isHeadPresent = !! Head;
                        callback(null, isCoordinatorPresent, isChairPresent, isSeniorStatisticianPresent, isPSHMSPresent, isHeadPresent);
                      }
                    }); 
                  }
                });
               }
            });
          }
        });
      }
    });
  },

  checkChairPresent(callback) {
    Logger.debug("InternalUserService.checkChairPresent");
    InternalUser.findActiveByCriteria(
      { isActive: true, role: 5, isVerified: true },
      (err, chair) => {
        if (err) {
          Logger.error(
            `InternalUserService.checkChairPresent at InternalUser.findActiveByCriteria ${err}`
          );
          callback(err);
        } else if (!chair) {
          callback(null, false);
        } else {
          callback(null, true);
        }
      }
    );
  },

  getInternalUsersExceptCordinator(callback) {
    Logger.debug("InternalUserService.getInternalUsersExceptCordinator");
    InternalUser.findByCriteria(
      { isActive: true, role: { "!=": [2, 1] } },
      (err, internalUserData) => {
        if (err) {
          Logger.error(
            `InternalUserService.getInternalUsersExceptCordinator at InternalUser.findActiveById ${err}`
          );
          callback(err);
        } else {
          callback(null, internalUserData);
        }
      }
    );
  },

  getOnlyReviewers(callback) {
    Logger.debug("InternalUserService.getOnlyReviewers");
    InternalUser.findByCriteria(
      { isActive: true, role: { "!=": [2, 1, 5] } },
      (err, internalUserData) => {
        if (err) {
          Logger.error(
            `InternalUserService.getOnlyReviewers at InternalUser.findActiveById ${err}`
          );
          callback(err);
        } else {
          callback(null, internalUserData);
        }
      }
    );
  },
  getAllInternalReviewer(callback) {
    Logger.debug("InternalUserService.getAllInternalReviewer");

      InternalUser.findByCriteria(
        { isActive: true, role: 3, isVerified: true },
        (err, internalReviewerData) => {
          if (err) {
            Logger.error(
              `InternalUserService.getAllInternalReviewer at InternalUser.findByCriteria ${err}`
            );
            callback(err);
          } else {
            callback(null, internalReviewerData);
          }
        }
      );
    
  },
  // getAllInternalReviewer(pageNo, callback) {
  //   Logger.debug("InternalUserService.getAllInternalReviewer");
  //   if(pageNo>0){
  //     const skip = (pageNo - 1) * sails.config.recordsPerPage;
    
  //     InternalUser.findActivesByCriteria(
  //       { isActive: true, role: 3, isVerified: true },
  //       skip,
  //       (err, internalReviewerData) => {
  //         if (err) {
  //           Logger.error(`InternalUserService.getAllInternalReviewer at InternalUser.findActivesByCriteria ${err}`);
  //           callback(err);
  //         } else {
  //           InternalUser.countByCriteria({ isActive: true, role: 3, isVerified: true }, (countErr, count) => {
  //             if (countErr) {
  //               Logger.error(`InternalUserService.getAllInternalReviewer at InternalUser.countByCriteria ${countErr}`);
  //               callback(err);
  //             } else {
  //               callback(null, internalReviewerData, count);
  //             }
  //           });
  //         }
  //       }
  //     );
  //   }else{
  //     InternalUser.findByCriteria(
  //       { isActive: true, role: 3, isVerified: true },
  //       (err, internalReviewerData) => {
  //         if (err) {
  //           Logger.error(
  //             `InternalUserService.getAllInternalReviewer at InternalUser.findByCriteria ${err}`
  //           );
  //           callback(err);
  //         } else {
  //           callback(null, internalReviewerData);
  //         }
  //       }
  //     );
  //   }
  // },

  getAllExternalReviewer(callback) {
    Logger.debug("InternalUserService.getAllExternalReviewer");
    InternalUser.findByCriteria(
      { isActive: true, role: 4, isVerified: true },
      (err, externalReviewerData) => {
        if (err) {
          Logger.error(
            `InternalUserService.getAllExternalReviewer at InternalUser.findByCriteria ${err}`
          );
          callback(err);
        } else {
          callback(null, externalReviewerData);
        }
      }
    );
  },

  getChair(callback) {
    Logger.debug("InternalUserService.getChair");
    InternalUser.findByCriteria(
      { isActive: true, role: 5, isVerified: true },
      (err, chairData) => {
        if (err) {
          Logger.error(
            `InternalUserService.getChair at InternalUser.findByCriteria ${err}`
          );
          callback(err);
        } else {
          callback(null, chairData);
        }
      }
    );
  },

  getAllProposalForReviewer(id, callback) {
    Logger.debug("InternalUserService.getAllProposalForReviewer");

    InternalUser.findByCriteria({ id }, (err, userData) => {
      if (err) {
        Logger.error(
          `InternalUserService.getAllProposalForReviewer at InternalUser.findActiveById ${err}`
        );
        callback(err);
      } else {
        Logger.debug(
          `InternalUserService.getAllProposalForReviewer at InternalUser.findActiveById`
        );
        Logger.debug(userData[0].assignedProposal);
        let proposalAssignedToThisReviewer = [];
        userData[0].assignedProposal.forEach((proposal) => {
          if (
            proposal.isProposalAcceptedForReview === undefined ||
            proposal.isProposalAcceptedForReview === "true"
          ) {
            proposalAssignedToThisReviewer.push(proposal);
          }
        });
        callback(null, proposalAssignedToThisReviewer);
      }
    });
  },
  getAllAmendmentForReviewer(id, callback) {
    Logger.debug('InternalUserService.getAllAmendmentForReviewer');
    console.log(id)
    
    InternalUser.findByCriteria({id}, (err, userData) => {
      if (err) {
        Logger.error(`InternalUserService.getAllAmendmentForReviewer at InternalUser.findActiveById ${err}`);
        callback(err);
      } else {
        Logger.debug(
          `InternalUserService.getAllAmendmentForReviewer at InternalUser.findActiveById`
        );
        Logger.debug(userData[0].assignedAmendment);
        let amendmentAssignedToThisReviewer = [];
        userData[0].assignedAmendment.forEach((amendment) => {
          if (
            amendment.isAmendmentAcceptedForReview === undefined ||
            amendment.isAmendmentAcceptedForReview === "true"
          ) {
            amendmentAssignedToThisReviewer.push(amendment);
          }
        });
        callback(null, amendmentAssignedToThisReviewer);
      }
    });
  },
  getCoordinator(callback) {
    Logger.debug("InternalUserService.getCoordinator");
    InternalUser.findByCriteria(
      { isActive: true, role: 2, isVerified: true },
      (err, coordinatorData) => {
        if (err) {
          Logger.error(
            `InternalUserService.getCoordinator at InternalUser.findByCriteria ${err}`
          );
          callback(err);
        } else {
          callback(null, coordinatorData);
        }
      }
    );
  },

  getAdmin(callback) {
    Logger.debug("InternalUserService.getAdmin");
    InternalUser.findByCriteria(
      { isActive: true, role: 1, isVerified: true },
      (err, adminData) => {
        if (err) {
          Logger.error(
            `InternalUserService.getAdmin at InternalUser.findByCriteria ${err}`
          );
          callback(err);
        } else {
          callback(null, adminData);
        }
      }
    );
  },

  getAllCommitteeMember(callback) {
    Logger.debug("InternalUserService.getAllCommitteeMember");
    InternalUser.findByCriteria(
      { isActive: true, isVerified: true, role: 3, isCommitteeMember: true },
      (err, committeeMemberData) => {
        if (err) {
          Logger.error(
            `InternalUserService.getAllCommitteeMember at InternalUser.findByCriteria ${err}`
          );
          callback(err);
        } else {
          InternalUser.countByCriteria(
            {
              isActive: true,
              isVerified: true,
              role: 3,
              isCommitteeMember: true,
            },
            (countErr, count) => {
              if (countErr) {
                Logger.error(
                  `InternalUserService.getAllCommitteeMember at InternalUser.countByCriteria ${countErr}`
                );
                callback(err);
              } else {
                Logger.debug(
                  "InternalUserService.getAllCommitteeMember at InternalUser.countByCriteria"
                );
                Logger.debug(committeeMemberData);
                Logger.debug(count);
                callback(null, committeeMemberData, count);
              }
            }
          );
        }
      }
    );
  },

  addCommiteeMember(internalUserIds, callback) {
    Logger.debug("InternalUserService.addCommiteeMember");
    InternalUser.findByCriteria(
      {
        isActive: true,
        isVerified: true,
        role: 3,
        isCommitteeMember: true,
      },
      (err, committeeMemberData) => {
        if (err) {
          Logger.error(
            `InternalUserService.addCommiteeMember at InternalUser.findActiveById ${err}`
          );
          callback(err);
        } else {
          const committeeMemberIds = [];
          for (let member of committeeMemberData) {
            committeeMemberIds.push(member.id);
          }
          const unionIds = _.union(internalUserIds, committeeMemberIds);
          const uniqueIds = _.uniq(unionIds);
          if (uniqueIds.length > 10) {
            callback("You can not add more than 10 member to create commitee");
          } else {
            InternalUser.updateActiveById(
              uniqueIds,
              { isCommitteeMember: true },
              (error, updatedInternalUser) => {
                if (error) {
                  Logger.error(
                    `InternalUserService.addCommiteeMember at InternalUser.updateActiveById ${error}`
                  );
                  callback(err);
                } else {
                  Logger.info("InternalUser details updated successfully.");
                  callback(null, updatedInternalUser);
                }
              }
            );
          }
        }
      }
    );
  },

  downloadReportUniversityUser(internalUserId, callback) {
    Logger.debug("ReportService.downReportSentByUniversityUser");
    console.log("downReportSentByUniversityUser in service");
    console.log(internalUserId);
    InternalUser.findActiveByCriteria(
      { id: internalUserId, isActive: true },
      (err, internalUser) => {
        if (err) {
          Logger.error(
            `InternalUserService.downloadReportUniversityUser at InternalUserService.findActiveByCriteria ${err}`
          );
          callback(err);
        } else {
          Logger.debug(
            `InternalUserService.downloadReportUniversityUser at InternalUserService.findActiveByCriteria`
          );
          Logger.debug(internalUser);

          callback(null, internalUser);
        }
      }
    );
  },
  getUniversityUsers(pageNo, callback) {
    Logger.debug('InternalUserService.getUniversityUsers');
    const skip = (pageNo - 1) * sails.config.recordsPerPage;
    InternalUser.findActivesByCriteria({role:7}, skip, (err, data) => {
      if (err) {
        Logger.error(`InternalUserService.getUniversityUsers at InternalUser.findActivesByCriteria ${err}`);
        callback(err);
      } else {
        InternalUser.countByCriteria({role:7}, (countErr, count) => {
          if (countErr) {
            Logger.error(`InternalUserService.getUniversityUsers at InternalUser.countByCriteria ${countErr}`);
            callback(err);
          } else {
            Logger.debug('InternalUserService.getUniversityUsers at InternalUser.countByCriteria');
            Logger.debug(data);
            let universityUsers=[];
            data.forEach((ele)=>{
              if(ele.quarterly!==undefined || ele.annual!==undefined || (ele.annual&&ele.quarterly))
              {
                universityUsers.push(ele)
              }
            })
            callback(null, universityUsers, count);
          }
        });
      }
    });
  },
  getSeniorStatistician(callback){
    Logger.debug('ExternalUserService.getSenoirStatistician');
    InternalUser.findActiveByCriteria({role:8}, (err, data) => {
      if (err) {
        Logger.error(`ExternalUserService.getSenoirStatistician at ExternalUser.findOneByCriteria ${err}`);
        callback(err);
      } else {
        callback(null, data);
      }
    });
  },
  getChairPerson(callback){
    Logger.debug('ExternalUserService.getSenoirStatistician');
    InternalUser.findActiveByCriteria({role:5}, (err, data) => {
      if (err) {
        Logger.error(`ExternalUserService.getSenoirStatistician at ExternalUser.findOneByCriteria ${err}`);
        callback(err);
      } else {
        callback(null, data);
      }
    });
  },
};
