module.exports = {
    updatePolicy(policyId, policyData, callback) {
      Logger.debug('PolicyService.updatePolicy');
      delete policyData.id;
      Policy.updateActiveById(policyId, policyData, (err, updatedPolicy) => {
        if (err) {
          Logger.error(`PolicyService.updatePolicy at Policy.updateActiveById ${err}`);
          callback(err);
        } else {
          Logger.info('Policy details updated successfully.');
          callback(null, updatedPolicy);}
      });
    },
    getPolicy(policyId, callback) {
      Logger.debug('PolicyService.getPolicy');
      Policy.findActiveById(policyId, (err, policyData) => {
        if (err) {
          Logger.error(`PolicyService.getPolicy at Policy.findActiveById ${err}`);
          callback(err);
        } else {
          callback(null, policyData);
        }
      });
    },
  };