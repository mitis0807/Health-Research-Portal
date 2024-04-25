const passport = require('passport');
const bcrypt = require('bcryptjs');

module.exports = {
  isAuthenticated(req, res) {
    Logger.debug('AuthController.isAuthenticated');
    // Logger.debug(req)
    if (req.isAuthenticated()) {
      req.session.authenticated = true;
      const user = req.user;
      req.session.user = {};
      req.session.user.id = user.id;
      req.session.user.role = user.role;
      req.session.user.firstName = user.firstName;
      req.session.user.lastName = user.lastName;
      return res.send({ status: 200, userData: user, message: sails.config.serverMessage.auth });
    }
    if (req.xhr) {
      return res.send({ status: 401, message: sails.config.serverMessage.userSessionExpired });
    }
    if (req.session.authenticated === undefined) {
      return res.send({ status: 300, message: sails.config.serverMessage.pleaseLogin });
    }
    return res.send({ status: 401, message: sails.config.serverMessage.userSessionExpired });
  },

  processLogin(req, res) {
    Logger.debug('AuthController.processLogin');
    if (req.session.user) {
      res.send({
        status: 300,
        message: 'You are already logged in.',
        user: req.session.user,
      });
    } else {
      passport.authenticate('local', (err, user, info) => {
        
        if (err) {
          console.log(err);
          Logger.error(`AuthController.processLogin at passport.authenticate ${err}`);
          return res.send({ status: 300, message: sails.config.serverMessage.loginError, user: null });
        }
        if (!user) {
          Logger.verbose('User not found');
          return res.send({ status: 300, message: info.message, user: null });
        }
        req.logIn(user, (logInErr) => {
          console.log(logInErr);
          if (logInErr) {
            Logger.error(`AuthController.processLogin at req.logIn ${logInErr}`);
            return res.send({ status: 300, message: sails.config.serverMessage.somethingWrong, user: null });
          }
          req.session.user = user;
          Logger.info('Login successfully');
          return res.send({ status: 200, message: sails.config.serverMessage.loginSuccess, user });
        });
      })(req, res);
    }
  },
  

  logout(req, res) {
    Logger.debug('AuthController.logout');
    req.session.destroy();
    return res.send({ status: 200, message: sails.config.serverMessage.logoutSuccess });
  },
 
  confirmAccount(req, res) {
    Logger.debug('AuthController.confirmAccount');
    const userId = req.body.internalUserId;
    InternalUser.findActiveById(userId, (err, userModel) => {
      if (err) {
        Logger.error(`AuthController.confirmAccount at InternalUser.findActiveById ${err}`);
        return res.send({ status: 300, message: sails.config.serverMessage.errorconfirmAccount });
      }
      if (!userModel) {
        Logger.warn('AuthController.confirmAccount at InternalUser.findActiveById userModel undefined');
        return res.send({ status: 300, message: sails.config.serverMessage.invalidURL });
      }
      Logger.verbose(userModel.password);
      Logger.verbose(userModel.password !== '');
      if (userModel.isVerified) {
        Logger.warn('AuthController.confirmAccount at InternalUser.findActiveById userModel already confirmed');
        return res.send({
          status: 200, isVerified: true, message: sails.config.serverMessage.confirmedRegistration, internalUser: userModel,
        });
      }
      return res.send({ status: 200, message: sails.config.serverMessage.validUser, internalUser: userModel });
    });
  },

  setPassword(req, res) {
    Logger.debug('AuthController.setPassword');

    const userId = req.body.id;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    InternalUser.findActiveById(userId, (err, userModel) => {
      if (err) {
        Logger.error(`AuthController.setPassword at InternalUser.findActiveById ${err}`);
        return res.send({ status: 300, message: sails.config.serverMessage.somethingWrong });
      }
      if (!userModel) {
        Logger.warn('AuthController.setPassword at InternalUser.findActiveById userModel undefined');
        return res.send({ status: 300, message: sails.config.serverMessage.invalidURL });
      }
      if (userModel.isVerified) {
        Logger.warn('You have already confirmed your registration. Please login with your email and password.');
        return res.send({ status: 200, isVerified: true, message: sails.config.serverMessage.confirmedRegistration });
      }

      if (password === undefined || password.trim() === '') {
        return res.send({ status: 300, message: sails.config.serverMessage.passwordValidation });
      }
      CustomValidator.validatePassword(password, (strongPasswordError) => {
        if (strongPasswordError) {
          return res.send({ status: 300, message: strongPasswordError });
        }
        if (confirmPassword === undefined || confirmPassword.trim() === '') {
          return res.send({ status: 300, message: sails.config.serverMessage.confirmPasswordValidation });
        }
        if (password !== confirmPassword.trim()) {
          return res.send({ status: 300, message: sails.config.serverMessage.passwordMatch });
        }
        bcrypt.genSalt(10, (bcryptGenSaltErr, salt) => {
          if (bcryptGenSaltErr) {
            Logger.warn('AuthController.setPassword at bcrypt.genSalt');
            return res.send({ status: 300, message: sails.config.serverMessage.somethingWrong });
          }
          bcrypt.hash(password, salt, (bcryptErr, hash) => {
            if (bcryptErr) {
              Logger.warn('AuthController.setPassword at InternalUser.findActiveById userModel password empty');
              res.send({ status: 300, message: sails.config.serverMessage.somethingWrong });
            } else {
              userModel.password = hash;
              InternalUser.updateActiveByCriteria({email:userModel.email}, { password: userModel.password, isVerified: true }, (updateActiveByIdErr) => {
                if (updateActiveByIdErr) {
                  Logger.error(`AuthController.setPassword at InternalUser.updateActiveByCriteria ${updateActiveByIdErr}`);
                  return res.send({ status: 300, message: sails.config.serverMessage.somethingWrong });
                }
                const userJSON = {
                  email: userModel.email,
                  password: userModel.password,
                  role: userModel.role,
                };
                User.createUser(userJSON, (userErr) => {
                  if (userErr) {
                    Logger.error(`AuthController.setPassword at User.createUser ${userErr}`);
                    return res.send({ status: 300, message: sails.config.serverMessage.somethingWrong });
                  }
                  Logger.info('Confirm Account: Email has been confirmed.');
                  return res.send({ status: 200, message: sails.config.serverMessage.confirmSuccess });
                });
              });
            }
          });
        });
      });
    });
  },

  confirmInvestigatorAccount(req, res) {
    Logger.debug('AuthController.investigatorconfirmAccount');
    const userId = req.body.internalUserId;
    Investigator.findActiveById(userId, (err, userModel) => {
      if (err) {
        Logger.error(`AuthController.investigatorconfirmAccount at Investigator.findActiveById ${err}`);
        return res.send({ status: 300, message: sails.config.serverMessage.errorconfirmAccount });
      }
      if (!userModel) {
        Logger.warn('AuthController.investigatorconfirmAccount at Investigator.findActiveById userModel undefined');
        return res.send({ status: 300, message: sails.config.serverMessage.invalidURL });
      }
      Logger.verbose(userModel.password);
      if (userModel.isVerified) {
        Logger.warn('You have already confirmed your registration. Please login with your email and password.');
        return res.send({ status: 200, isVerified: true, message: sails.config.serverMessage.confirmedRegistration });
      }
      return res.send({ status: 200, message: sails.config.serverMessage.confirmSuccess, investigatorData: userModel });
    });
  },

  investigatorSetPassword(req, res) {
    Logger.debug('AuthController.investigatorSetPassword');
    Logger.verbose(req.body);
    const userId = req.body.id;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    Investigator.findActiveById(userId, (err, userModel) => {
      if (err) {
        Logger.error(`AuthController.investigatorSetPassword at Investigator.findActiveById ${err}`);
        return res.send({ status: 300, message: sails.config.serverMessage.somethingWrong });
      }
      if (!userModel) {
        Logger.warn('AuthController.investigatorSetPassword at Investigator.findActiveById userModel undefined');
        return res.send({ status: 300, message: sails.config.serverMessage.invalidURL });
      }
      if (userModel.isVerified) {
        Logger.warn('AuthController.investigatorSetPassword at Investigator.findActiveById userModel password empty');
        return res.send({ status: 200, isVerified: true, message: sails.config.serverMessage.confirmedRegistration });
      }

      if (password === undefined || password.trim() === '') {
        return res.send({ status: 300, message: sails.config.serverMessage.passwordValidation });
      }
      CustomValidator.validatePassword(password, (strongPasswordError) => {
        if (strongPasswordError) {
          return res.send({ status: 300, message: strongPasswordError });
        }
        if (confirmPassword === undefined || confirmPassword.trim() === '') {
          return res.send({ status: 300, message: sails.config.serverMessage.confirmPasswordValidation });
        }
        if (password !== confirmPassword.trim()) {
          return res.send({ status: 300, message: sails.config.serverMessage.passwordMatch });
        }
        bcrypt.genSalt(10, (bcryptGenSaltErr, salt) => {
          if (bcryptGenSaltErr) {
            Logger.warn('AuthController.setPassword at bcrypt.genSalt');
            return res.send({ status: 300, message: sails.config.serverMessage.somethingWrong });
          }
          bcrypt.hash(password, salt, (bcryptErr, hash) => {
            if (bcryptErr) {
              Logger.warn('AuthController.investigatorSetPassword at Investigator.findActiveById userModel password empty');
              res.send({ status: 300, message: sails.config.serverMessage.somethingWrong });
            } else {
              userModel.password = hash;
              Investigator.updateActiveByCriteria({email:userModel.email}, { password: userModel.password, isVerified: true }, (updateActiveByIdErr) => {
                if (updateActiveByIdErr) {
                  Logger.error(`AuthController.investigatorSetPassword at Investigator.updateActiveById ${updateActiveByIdErr}`);
                  return res.send({ status: 300, message: sails.config.serverMessage.somethingWrong });
                }
                const userJson = {
                  email: userModel.email,
                  password: userModel.password,
                  role: userModel.role,
                };
                User.createUser(userJson, (createUserErr) => {
                  if (createUserErr) {
                    Logger.error(`AuthController.investigatorSetPassword at User.createUser ${createUserErr}`);
                    return res.send({ status: 300, message: sails.config.serverMessage.somethingWrong });
                  }
                  Logger.info('Confirm Account: Email has been confirmed.');
                  return res.send({ status: 200, message: sails.config.serverMessage.confirmSuccess });
                });
              });
            }
          });
        });
      });
    });
  },

  resetPassword(req, res) {
    Logger.debug('AuthController.resetPassword');
    Logger.debug('req.body');
    Logger.debug(req.body)
    const userId = req.body.id;
    const email = req.body.email;
    console.log('user id in reset password', userId);
    console.log('email in reset password', email);

    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
      User.findActiveByCriteria({email}, (err, userModel) => {
        Logger.debug(' User.findActiveById', userId);
        Logger.debug('InternalUser');
        Logger.verbose('userModel');
        Logger.verbose(userModel);
        if (err) {
          Logger.error(`AuthController.resetPassword at User.findActiveById ${err}`);
          return res.send({ status: 300, message: sails.config.serverMessage.somethingWrong });
        }
        if (!userModel) {
          return res.send({ status: 300, message: sails.config.serverMessage.notConfirmedRegistration });
        }
        if (password === undefined || password.trim() === '') {
          return res.send({ status: 300, message: sails.config.serverMessage.passwordValidation });
        }
        CustomValidator.validatePassword(password, (strongPasswordError) => {
          if (strongPasswordError) {
            return res.send({ status: 300, message: strongPasswordError });
          }

          if (confirmPassword === undefined || confirmPassword.trim() === '') {
            return res.send({ status: 300, message: sails.config.serverMessage.confirmPasswordValidation });
          }
          if (password !== confirmPassword.trim()) {
            return res.send({ status: 300, message: sails.config.serverMessage.passwordMatch });
          }

          bcrypt.genSalt(10, (bcryptGenSaltErr, salt) => {
            if (bcryptGenSaltErr) {
              Logger.warn('AuthController.setPassword at bcrypt.genSalt');
              return res.send({ status: 300, message: sails.config.serverMessage.somethingWrong });
            }
            bcrypt.hash(password, salt, (bcryptErr, hash) => {
              if (bcryptErr) {
                Logger.warn('AuthController.setPassword at InternalUser.findActiveById userModel password empty');
                res.send({ status: 300, message: sails.config.serverMessage.somethingWrong });
              } else {
                userModel.password = hash;
                User.updateActiveById(userModel.id, { password: userModel.password }, (updateActiveIdErr, data) => {
                  console.log('updated user collection');
                  console.log(data)
                  console.log(updateActiveIdErr)
                  if (updateActiveIdErr) {
                    Logger.error(`AuthController.investigatorSetPassword at User.createUser ${updateActiveIdErr}`);
                    return res.send({ status: 300, message: sails.config.serverMessage.somethingWrong });
                  }
                  if (userModel.role === 6) {
                    console.log('resetting password from inside the portal')
                    Investigator.updateActiveByCriteria({ email: userModel.email, isActive: true, isVerified: true }, { password: userModel.password }, (updateActiveByIdErr1) => {
                      if (updateActiveByIdErr1) {
                        Logger.error(`AuthController.setPassword at Investigator.updateActiveByCriteria ${updateActiveByIdErr1}`);
                        return res.send({ status: 300, message: sails.config.serverMessage.somethingWrong });
                      }
                      return res.send({ status: 200, message: sails.config.serverMessage.successResetPassword });
                    });
                  } else if (userModel.role === 1 || userModel.role === 2 || userModel.role === 3 || userModel.role === 4 ||userModel.role === 5||
                    userModel.role === 7 || userModel.role === 8 || userModel.role === 9 || userModel.role === 10) {
                      Logger.debug(`this is for internal user roles`)
                      InternalUser.updateActiveByCriteria({ email: userModel.email, isActive: true, isVerified: true }, { password: userModel.password }, (updateActiveByIdErr) => {
                      if (updateActiveByIdErr) {
                        Logger.error(`AuthController.setPassword at InternalUser.updateActiveByCriteria ${updateActiveByIdErr}`);
                        return res.send({ status: 300, message: sails.config.serverMessage.somethingWrong });
                      }
                      return res.send({ status: 200, message: sails.config.serverMessage.successResetPassword });
                    });
                  }
                });
              }
            });
          });
        });
      });
  },
  resetPasswordWithAuth(req, res) {
    Logger.debug('AuthController.resetPasswordWithAuth');
    Logger.debug('req.body');
    Logger.debug(req.body)
    const userId = req.body.id;
    console.log('user id in reset password', userId);
  
    const currentPassword = req.body.currentPassword;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
  
    if (req.session.user) {
      console.log('req.session.user', req.session.user)
  
      if (req.session.user.role === 6) {
        Investigator.findActiveById(req.session.user.id, (userFetchErr, user) => {
          if (userFetchErr)
            Logger.error(`AuthController.resetPasswordWithAuth at Investigator.findActiveById ${userFetchErr}`);
          if (!user)
            Logger.debug('No user with this id is found');
          else {
            Logger.debug('user found');
            Logger.debug(user)
            bcrypt.compare(currentPassword, user.password, (bcryptErr, compareResponse) => {
              console.log('on successfully compared', compareResponse)
              if (bcryptErr) {
                Logger.warn('password bcrypt Error');
                Logger.error(`Investigator.findActiveById at bcrypt.compare ${bcryptErr}`);
  
                return res.send({ status: 300, message: bcryptErr });
              }
              if (!compareResponse) {
                Logger.warn({ message: 'Incorrect Old Password' });
                return res.send({ status: 300, message: 'Incorrect Old Password' });
              }
              if (password === undefined || password.trim() === '') {
                return res.send({ status: 300, message: sails.config.serverMessage.passwordValidation });
              }
              CustomValidator.validatePassword(password, (strongPasswordError) => {
                if (strongPasswordError) {
                  return res.send({ status: 300, message: strongPasswordError });
                }
                if (confirmPassword === undefined || confirmPassword.trim() === '') {
                  return res.send({ status: 300, message: sails.config.serverMessage.confirmPasswordValidation });
                }
                if (password !== confirmPassword.trim()) {
                  return res.send({ status: 300, message: sails.config.serverMessage.passwordMatch });
                }
  
                bcrypt.genSalt(10, (bcryptGenSaltErr, salt) => {
                  if (bcryptGenSaltErr) {
                    Logger.warn('AuthController.resetPassword at bcrypt.genSalt');
                    return res.send({ status: 300, message: sails.config.serverMessage.somethingWrong });
                  }
                  bcrypt.hash(password, salt, (bcryptErr1, hash) => {
                    if (bcryptErr1) {
                      Logger.warn('AuthController.resetPassword at InternalUser.findActiveById userModel password empty');
                      res.send({ status: 300, message: sails.config.serverMessage.somethingWrong });
                    } else {
                      console.log('hash for investigator', hash);
                      user.password = hash;
                      console.log('updated password', user.password);
                      console.log('id sending to service', user.id);
                      console.log('typeof id sending to service',typeof user.id);
        
                      User.updateActiveByCriteria({email: user.email}, { password: user.password }, (updateActiveIdErr, userUpdated) => {
                        if (updateActiveIdErr) {
                          Logger.error(`AuthController.resetPassword at User.updateActiveById ${updateActiveIdErr}`);
                          return res.send({ status: 300, message: sails.config.serverMessage.somethingWrong });
                        }
                        else {
                          Logger.debug(`AuthController.resetPassword: User password updated in User collection`);
                          Logger.debug(userUpdated)
                          Investigator.updateActiveByCriteria({ email: user.email, isActive: true, isVerified: true }, { password: user.password }, (updateActiveByIdErr, updatedUser) => {
                            if (updateActiveByIdErr) {
                              Logger.debug(`AuthController.resetPassword at Investigator.updateActiveByCriteria ${updateActiveByIdErr}`);
                              return res.send({ status: 300, message: sails.config.serverMessage.somethingWrong });
                            }
                            Logger.debug(`AuthController.resetPassword: User password updated in Investigator collection`);
                            Logger.debug(updatedUser)
                            return res.send({ status: 200, message: sails.config.serverMessage.successResetPassword });
                          });
                        }
                      });
                    }
                  });
                });
              });
            })
          }
        })
      }
      else if (req.session.user.role === 1 || req.session.user.role === 2 || req.session.user.role === 3 || req.session.user.role === 4 || req.session.user.role === 5 || req.session.user.role === 7 || req.session.user.role === 8 || req.session.user.role === 9 || req.session.user.role === 10) {
        InternalUser.findActiveById(req.session.user.id, (userFetchErr, user) => {
          if (userFetchErr)
            console.log('error while fetching user');
          if (!user)
            console.log('no user with this id is found')
          else {
            console.log('user found', user);
            console.log('currentPassword', currentPassword);
            console.log('user.password', user.password);
  
            bcrypt.compare(currentPassword, user.password, (bcryptErr, compareResponse) => {
              console.log('if error while comparing', bcryptErr);
              console.log('on successfully compared', compareResponse)
              if (bcryptErr) {
                Logger.warn('password bcrypt Error');
                console.log('password bcrypt Error', bcryptErr);
                return res.send({ status: 300, message: bcryptErr });
              }
              if (!compareResponse) {
                Logger.warn({ message: 'Incorrect Old Password' });
                return res.send({ status: 300, message: 'Incorrect Old Password' });
              }
              if (password === undefined || password.trim() === '') {
                return res.send({ status: 300, message: sails.config.serverMessage.passwordValidation });
              }
              CustomValidator.validatePassword(password, (strongPasswordError) => {
                if (strongPasswordError) {
                  return res.send({ status: 300, message: strongPasswordError });
                }
                if (confirmPassword === undefined || confirmPassword.trim() === '') {
                  return res.send({ status: 300, message: sails.config.serverMessage.confirmPasswordValidation });
                }
                if (password !== confirmPassword.trim()) {
                  return res.send({ status: 300, message: sails.config.serverMessage.passwordMatch });
                }
  
                bcrypt.genSalt(10, (bcryptGenSaltErr, salt) => {
                  if (bcryptGenSaltErr) {
                    Logger.warn('AuthController.resetPassword at bcrypt.genSalt');
                    return res.send({ status: 300, message: sails.config.serverMessage.somethingWrong });
                  }
                  bcrypt.hash(password, salt, (bcryptErr1, hash) => {
                    if (bcryptErr1) {
                      Logger.warn('AuthController.resetPassword at bcrypt.hash for internalUser ');
                      res.send({ status: 300, message: sails.config.serverMessage.somethingWrong });
                    } else {
                      console.log('hash for internal users', hash);
                      user.password = hash;
                      User.updateActiveByCriteria({email:user.email}, { password: user.password }, (updateActiveIdErr) => {
                        if (updateActiveIdErr) {
                          Logger.error(`AuthController.investigatorSetPassword at User.createUser ${updateActiveIdErr}`);
                          return res.send({ status: 300, message: sails.config.serverMessage.somethingWrong });
                        }
                        InternalUser.updateActiveByCriteria({ email: user.email, isActive: true, isVerified: true }, { password: user.password }, (updateActiveByIdError) => {
                          if (updateActiveByIdError) {
                            Logger.error(`AuthController.setPassword at InternalUser.updateActiveByCriteria ${updateActiveByIdError}`);
                            return res.send({ status: 300, message: sails.config.serverMessage.somethingWrong });
                          }
                          return res.send({ status: 200, message: sails.config.serverMessage.successResetPassword });
                        });
                      });
                    }
                  });
                });
              });
            })
          }
        })
      }
    }
 
  },

};
