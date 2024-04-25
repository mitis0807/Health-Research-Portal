
const bcrypt = require('bcrypt');

module.exports = {
  async registration(registrationData, callback) {
    Logger.verbose('UserService.registration');
    User.findActiveByCriteria({ email: registrationData.email, isActive: true }, (findErr, user) => {
      if (findErr) {
        Logger.error(`UserService.registration at UserService.findActiveByCriteria ${findErr}`);
        callback(findErr);
      } else if (user) {
        callback('Already Present');
      } else {
        bcrypt.genSalt(10, (bcryptGenSaltErr, salt) => {
          if (bcryptGenSaltErr) {
            Logger.error('UserService.createUser at bcrypt.genSalt');
            callback(bcryptGenSaltErr);
          } else {
            const password = registrationData.password;
            bcrypt.hash(password, salt, (bcryptErr, hash) => {
              if (bcryptErr) {
                Logger.error('UserService.setPassword at InternalUser.findActiveById userModel password empty');
                callback(bcryptErr);
              } else {
                Logger.verbose('in else of password');
                registrationData.password = hash;
                User.createUser(registrationData, (createErr) => {
                  if (createErr) {
                    Logger.error(`UserService.registration at User.create ${createErr}`);
                    callback(err);
                  } else {
                    Logger.verbose('in final else true');
                    registrationData.isVerified = true;
                    registrationData.firstName = '';
                    registrationData.lastName = '';
                    InternalUser.createInternalUser(registrationData, (internalUserCreateErr, internalUserData) => {
                      if (internalUserCreateErr) {
                        Logger.error(`UserService.registration at User.create ${createErr}`);
                        callback(err);
                      } else {
                        Logger.info('User details saved successfully.');
                        callback(null, internalUserData);
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
};
