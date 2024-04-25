const { Logger } = require("mongodb");

module.exports = {
  updateProposal(proposalId, proposalData, callback) {
    Logger.debug('UserController.updateProposal');
    Logger.verbose(proposalId);
    Logger.verbose(proposalData);
    Application.findActiveByCriteria({ proposalId }, (err, proposal) => {
      if (err) {
        Logger.error(`UserController.updateProposal at Application.findActiveByCriteria ${err}`);
        callback(err);
      } else if (proposal) {
        Application.updateActiveById(proposalId, proposalData, (error, updatedProposal) => {
          if (err) {
            Logger.error(`UserController.updateProposal at Application.updateActiveById ${err}`);
            callback(err);
          } else {
            Logger.info('Application details updated successfully.');
            callback(null, updatedProposal);
          }
        });
      } else {
        console.log('investigator', proposal);
        Logger.warn('proposal id not present.');
        callback('Not Present');
      }
    });
  }
};
