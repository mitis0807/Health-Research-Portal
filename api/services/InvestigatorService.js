module.exports = {

  registration(registrationData, callback) {
    console.log('registrationData', registrationData);
    console.log('registrationData.email', registrationData.email);

    Logger.debug('InvestigatorService.registration');
    Investigator.findActiveByCriteria({ email: registrationData.email, isActive: true}, (err, investigator) => {
      if (err) {
        Logger.error(`InvestigatorService.registration at InvestigatorService.findActiveByCriteria ${err}`);
        callback(err);
      } else if (investigator) {
        console.log('investigator', investigator);
        Logger.warn('Investigator already present.');
        callback('Already Present');
      } else {
        delete registrationData.confirmPassword;
        User.findByCriteria({ email: registrationData.email}, (findErr, user) => {
          if (findErr) {
            Logger.error(`InvestigatorService.registration at User.findByCriteria ${findErr}`);
            callback(findErr);
          } else if (user) {
            console.log('user', user);
            Logger.warn('user already present.');
            callback('Already Present');
          }
          else {
            Investigator.create(registrationData).fetch().exec((createErr, investigatorData) => {
              if (createErr) {
                Logger.error(`InvestigatorService.registration at Investigator.create ${createErr}`);
                callback(err);
              } else {
                Logger.info('Investigator details saved successfully.');
                EmailService.confirmAccountEmailToInvestigator(investigatorData);
                Logger.verbose(investigatorData);
                callback(null, investigatorData);
              }
            });
          }
        })
     
      }
    });
  },

  updateInvestigator(investigatorId, investigatorData, callback) {
    Logger.debug('InvestigatorService.updateInvestigator');
    delete investigatorData.id;
    Investigator.updateActiveById(investigatorId, investigatorData, (err, updatedInvestigator) => {
      if (err) {
        Logger.error(`InvestigatorService.updateInvestigator at Investigator.updateActiveById ${err}`);
        callback(err);
      } else {
        Logger.info('Investigator details updated successfully.');
        callback(null, updatedInvestigator);
      }
    });
  },

  getInvestigator(investigatorId, callback) {
    Logger.debug('InvestigatorService.getInvestigator');
    Logger.verbose(investigatorId);
    console.log('investigator id in service', typeof investigatorId);

    Investigator.findActiveById(investigatorId, (err, investigatorData) => {
      if (err) {
        Logger.error(`InvestigatorService.getInvestigator at Investigator.findActiveById ${err}`);
       console.log(`InvestigatorService.getInvestigator at Investigator.findActiveById ${err}`);

        callback(err);
      } else {
        console.log('investigator found', investigatorData)
        Logger.verbose(investigatorData);
        callback(null, investigatorData);
      }
    });
  },

  getAllInvestigator(callback) {
    Logger.debug('InvestigatorService.getAllInvestigator');
    Investigator.findByCriteria({ isActive: true, isVerified: true }, (err, investigatorData) => {
      if (err) {
        Logger.error(`InvestigatorService.getAllInvestigator at Investigator.findActiveById ${err}`);
        callback(err);
      } else {
        callback(null, investigatorData);
      }
    });
  },
  getProposalHistory(proposalId, investigatorId, callback) {
    Logger.debug('InvestigatorService.getProposal');

    Application.findProposalByInvestigator({proposalId, investigatorId}, (err, proposalData) => {
      if (err) {
        Logger.error(`InvestigatorService.getProposalHistory at Application.findByCriteria ${err}`);
        callback(err);
      } else if (proposalData.length === 0) {
        callback('Proposal Not of this user');
      } else {
        console.log('proposalData in get proposal', proposalData);
        callback(null, proposalData[0].timeline);
      }
    });
  },
};
