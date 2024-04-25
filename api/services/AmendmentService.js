module.exports = {
  saveAmendment(amendmentData, callback) {
    Logger.debug(`AmendmentService.saveAmendment ${amendmentData}`);
    Amendment.createAmendment(amendmentData, (err, savedAmendment) => {
      Logger.verbose(`savedAmendment`);
      Logger.verbose(savedAmendment);
      if (err) {
        Logger.error(`AmendmentService.saveAmendment at Amendment.createAmendment ${err}`);
        callback(err, null);
      } else {
        Logger.verbose('Amendment saved successfully.');
        callback(null, savedAmendment);
      }
    });
  },
  updateAmendment(proposalId, amendmentData, timelineData, callback) {
    Logger.debug('AmendmentService.updateAmendment');
    Logger.verbose(proposalId);

    Amendment.findActiveById( proposalId , (err, amendment) => {
      console.log('amendment in service', amendment);
      if (err) {
        Logger.error(`AmendmentService.updateAmendment at Amendment.findActiveById ${err}`);
        callback(err);
      } else if (amendment) {
        Amendment.updateAmendmentRecord(proposalId, amendmentData,timelineData, (error, updatedAmendment) => {
          if (error) {
            Logger.error(`AmendmentService.updateAmendment at Amendment.updateActiveById ${error}`);
            callback(error);
          } else {
      

            Amendment.findActiveByCriteria({ proposalId }, (err1, amendmentData) => {
              if(err1){
                Logger.error(`AmendmentService.registration at ApplicationService.findActiveByCriteria ${err1}`);
                callback(err1);
              }
              else{
                Logger.info('Amendment details updated successfully.');
                callback(null, [amendmentData]);
              }
            })
          }
        });
      } else {
        console.log('amendment...................', proposal);
        Logger.warn('amendment id not present.');
        callback('Not Present');
      }
    });
  },

  getAmendment(pageNo, callback) {
    Logger.debug('AmendmentService.getAmendment');
    const skip = (pageNo - 1) * sails.config.recordsPerPage;
    Amendment.findByCriteria({ isActive: true, isSubmitted: true },skip,sails.config.recordsPerPage, (err, amendmentData) => {
      if (err) {
        Logger.error(`AmendmentService.getAmendment at Amendment.findAmendmentByInvestigator ${err}`);
        callback(err);
      }else {
        console.log('proposalData in get proposal', amendmentData);
        Amendment.countAmendmentByCriteria({isActive: true, isSubmitted: true}, (countErr, count) => {
          if (countErr) {
            Logger.error(`AmendmentService.getAmendment at Amendment.countAmendmentByCriteria ${countErr}`);
            callback(countErr);
          } else {
            callback(null, amendmentData, count);
          }
        });
      }
    });
  },

  getAmendmentByProposalId(proposalId, callback) {
    Logger.debug('AmendmentService.getAmendmentByProposalId');
    console.log('proposalId', proposalId);
    console.log('type of proposalId', typeof proposalId);

    Amendment.findAmendmentByProposalId({ proposalId, isActive:true}, (err, amendmentData) => {
      if (err) {
        Logger.error(`AmendmentService.getAmendmentByProposalId at Amendment.findAmendmentByProposalId ${err}`);
        callback(err);
      } else if (amendmentData.length === 0) {
        callback('Amendment Not found');
      } else {
        console.log('proposalData in findAmendmentByProposalId', amendmentData);
        callback(null, amendmentData[0]);
      }
    });
  },
  searchAmendment(searchTerm,callback){
    Amendment.searchAmendmentRequest(searchTerm,{isActive:true,isSubmitted:true} ,(err, amendmentRequest) => {
      if (err) {
        Logger.error(`AmendmentService.searchAmendment at Amendment.searchAmendmentRequest ${err}`);
        callback(err);
      } else {
        console.log('Amendment request in get amendment', amendmentRequest);
        callback(null, amendmentRequest);
      }
    });
  },
  getAllAmendmentForSign(callback) {
    Logger.debug('AmendmentService.getAllAmendmentForSign');
    Amendment.findAllByCriteria({
      isActive: true, isSubmitted: true, isUnderReview: false, isUnderSigned: true,
    }, (err, amendmentData) => {
      if (err) {
        Logger.error(`AmendmentService.getAllAmendmentForSign at Amendment.findActivesByCriteria ${err}`);
        callback(err);
      } else {
        callback(null, amendmentData);
      }
    });
  },
  getAmendmentHistory(proposalId, callback) {
    Logger.debug('AmendmentService.getAmendmentHistory');

    Amendment.findActiveByCriteria({proposalId}, (err, amendmentData) => {
      if (err) {
        Logger.error(`AmendmentService.getAmendmentHistory at Amendment.findByCriteria ${err}`);
        callback(err);
      } else if (amendmentData.length === 0) {
        callback('Amendment Not of this user');
      } else {
        console.log('amendmentData in get amendment', amendmentData);
        let timelineArray=[]
        amendmentData.timeline.forEach(element => {
          if(element!=null)
          timelineArray.push(element)
        });
        callback(null, timelineArray);
      }
    });
  },
  getAmendmentExpectInvestigator(proposalId, callback) {
    Logger.debug('AmendmentService.getAmendmentExpectInvestigator');
    Amendment.findActiveById(proposalId, (err, amendmentData) => {
      if (err) {
        Logger.error(`AmendmentService.getAmendmentExpectInvestigator at Amendment.findActiveById ${err}`);
        callback(err);
      } else if (!amendmentData) {
        callback('Amendment if not match');
      } else {
        callback(null, amendmentData);
      }
    });
  },
}