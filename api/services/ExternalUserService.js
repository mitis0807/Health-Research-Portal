const ExternalUser = require("../models/ExternalUser");

module.exports = {
  
    sendInvite(externalUserData, callback) {
      externalUserData.email = externalUserData.email.toLowerCase();
      externalUserData.role = parseInt(externalUserData.role, 10);
   
      Logger.debug('ExternalUserService.sendInvite');
      console.log(externalUserData);
      ExternalUser.findByCriteria({ email: externalUserData.email, isActive: true, isVerified: true }, (err, externalUser) => {
        if (err) {
          Logger.error(`ExternalUserService.sendInvite at ExternalUser.findActiveByCriteria ${err}`);
          callback(err);
        } else if (externalUser.length === 2 && role ===7) {
          Logger.warn('University User already present.');
          callback('Already Present');
        }else if (externalUser.length === 1 && (role === 8 || role === 9 || role === 10)) {
          Logger.warn('Data team User already present.');
          callback('Already Present');
        } else {
          User.findByCriteria({ email: externalUserData.email}, (findErr, user) => {
            if (findErr) {
              Logger.error(`ExternalUserService.sendInvite at User.findByCriteria ${findErr}`);
              callback(findErr);
            } else if (user) {
              console.log('user', user);
              Logger.warn('user already present.');
              callback('Already Present');
            }else{
              ExternalUser.createExternalUser(externalUserData,(createErr, user1) => {
                if (createErr) {
                  Logger.error(`ExternalUserService.sendInvite at ExternalUser.create ${createErr}`);
                  callback(createErr);
                } else {
                  Logger.info('ExternalUser details saved successfully.');
                  EmailService.sendInviteEmailToExternalUser(user1);
                  Logger.verbose(user1);
                  callback(null, user1);
                }
              });
            }
          });
        
        }
      });
    },
    updateExternalUser(externalUserId, externalUserData, callback) {
      Logger.debug('ExternalUserService.updateExternalUser');
      delete externalUserData.id;
      ExternalUser.updateByCriterion(externalUserId, externalUserData, (err, updatedExternalUser) => {
        if (err) {
          Logger.error(`ExternalUserService.updateExternalUser at ExternalUser.updateByCriterion ${err}`);
          console.log('error comes back in service', err)
          callback(err);
        } else {
          Logger.info('ExternalUser details updated successfully.');
          callback(null, updatedExternalUser);
        }
      });
    },
  
    getExternalUser(externalUserId, callback) {
      Logger.debug('ExternalUserService.getExternalUser');
      console.log('ExternalUserId', externalUserId);
      ExternalUser.findOneByCriteria(externalUserId, (err, externalUserData) => {
        if (err) {
          Logger.error(`ExternalUserService.getExternalUser at ExternalUser.findOneByCriteria ${err}`);
          callback(err);
        } else {
          callback(null, externalUserData);
        }
      });
    },

    getSeniorStatistician(callback){
      Logger.debug('ExternalUserService.getSenoirStatistician');
      ExternalUser.findOneByCriteria({role:8}, (err, data) => {
        if (err) {
          Logger.error(`ExternalUserService.getSenoirStatistician at ExternalUser.findOneByCriteria ${err}`);
          callback(err);
        } else {
          callback(null, data);
        }
      });
    },
  
    getUniversityUsers(pageNo, callback) {
      Logger.debug('ExternalUserService.getAllExternalUsers');
      const skip = (pageNo - 1) * sails.config.recordsPerPage;
      ExternalUser.findActivesByCriteria({role:7}, skip, (err, data) => {
        if (err) {
          Logger.error(`ExternalUserService.getUniversityUsers at Announcement.findActivesByCriteria ${err}`);
          callback(err);
        } else {
          ExternalUser.countByCriteria({role:7}, (countErr, count) => {
            if (countErr) {
              Logger.error(`ExternalUserService.getUniversityUsers at ExternalUser.countByCriteria ${countErr}`);
              callback(err);
            } else {
              callback(null, data, count);
            }
          });
        }
      });
    },
  };
  