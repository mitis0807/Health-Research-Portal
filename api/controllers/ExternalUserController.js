/* This controller is for Data Team and University User */
const path = require('path');
const EmailService = require('../services/EmailService');
const ExternalUserService = require('../services/ExternalUserService');

module.exports = {
  sendInvite(req, res) {
    Logger.debug('ExternalUserController.sendInvite');
    const externalUserData = req.body.data;
    Logger.verbose(externalUserData);
    const args = [
      {
        name: 'Email',
        value: externalUserData.email,
        validations: [{ validation: 'notEmpty', message: sails.config.ValidationMessages.emailRequiredValidation },
        { validation: 'email', message: sails.config.ValidationMessages.EmailValidation },
        ],
      },
      {
        name: 'First name',
        value: externalUserData.firstName,
        validations: [{ validation: 'notEmpty', message: sails.config.ValidationMessages.firstNameRequiredValidation },
        { validation: 'regex', regex: /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/, message: sails.config.ValidationMessages.alphabetPatternValidation },
        { validation: 'maxLengthString', maxLength: 100, message: sails.config.ValidationMessages.firstNameMaxValidation },
        { validation: 'minLengthString', minLength: 2, message: sails.config.ValidationMessages.firstNameMinValidation },
        ],
      },
      {
        name: 'Last name',
        value: externalUserData.lastName,
        validations: [{ validation: 'notEmpty', message: sails.config.ValidationMessages.lastNameRequiredValidation },
        { validation: 'regex', regex: /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/, message: sails.config.ValidationMessages.alphabetPatternValidation },
        { validation: 'maxLengthString', maxLength: 100, message: sails.config.ValidationMessages.lastNameMaxValidation },
        { validation: 'minLengthString', minLength: 2, message: sails.config.ValidationMessages.lastNameMinValidation },
        ],
      },
      {
        name: 'Role',
        value: externalUserData.role,
        validations: [{ validation: 'notEmpty', message: sails.config.ValidationMessages.roleValidation }],
      },
    ];

    ValidateService.validate(args, (validationErr, validationErrMsgs) => {
      if (validationErr) {
        Logger.error(`ExternalUserController.sendInvite at ValidateService.validate ${validationErr}`);
        res.send({ status: 300, message: sails.config.serverMessage.serverError });
      } else if (validationErrMsgs.length === 0) {
        ExternalUserService.sendInvite(externalUserData, (err) => {
            if (err) {
              console.log(err);
              if (err === 'Already Present') {
                res.send({ status: 300, message: sails.config.serverMessage.emailAlreadyPresent });
              } else {
                res.send({ status: 300, message: sails.config.serverMessage.serverError });
              }
            } else {
              res.send({ status: 200, message: sails.config.serverMessage.inviteSuccess });
            }
          });
      } else {
        ValidateService.getValidateMsg(validationErrMsgs, (getValidateMsgErr, errMsgs) => {
          if (getValidateMsgErr) {
            Logger.error(`ExternalUserController.sendInvite at ValidateService.getValidateMsg ${getValidateMsgErr}`);
            res.send({ status: 300, message: sails.config.serverMessage.serverError });
          } else {
            Logger.verbose(errMsgs);
            res.send({ status: 422, message: errMsgs });
          }
        });
      }
    });
  },
  getExternalUser(req, res) {
    Logger.debug('ExternalUserController.getExternalUser');
    const externalUserId = req.params['externalUserId'];
    console.log(externalUserId);
    if (!externalUserId) {
      res.send({ status: 300, message: sails.config.serverMessage.serverError });
    } else {
      ExternalUserService.getExternalUser(externalUserId, (err, externalUserData) => {
        if (err) {
          res.send({ status: 300, message: sails.config.serverMessage.serverError });
        } else if (!externalUserData) {
          Logger.warn('ExternalUserController.getExternalUser userModel undefined');
          Logger.verbose(externalUserData);
          return res.send({ status: 300, message: sails.config.serverMessage.invalidURL });
        } else {
          res.send({ status: 200, externalUserData });
        }
      });
    }
  },

  updateExternalUser(req, res) {
    Logger.debug('ExternalUserController.updateExternalUser');
    const externalUserData = req.body.data;
    console.log(externalUserData);
    
      let args = [];
    ValidateService.validate(args, (validationErr, validationErrMsgs) => {
      if (validationErr) {
        Logger.error(`ExternalUserController.updateExternalUser at ValidateService.validate ${validationErr}`);
        res.send({ status: 300, message: sails.config.serverMessage.serverError });
      } else if (validationErrMsgs.length === 0) {
        if (!externalUserData.id) {
          res.send({ status: 300, message: sails.config.serverMessage.serverError });
        } else {
          const externalUserId = externalUserData.id;
          ExternalUserService.updateExternalUser(externalUserId, externalUserData, (err, updatedExternalUser) => {
            if (err) {
              res.send({ status: 300, message: sails.config.serverMessage.serverError });
            } else {
              res.send({ status: 200, message: sails.config.serverMessage.externalUserUpdate, externalUserData: updatedExternalUser });
            }
          });
        }
      } else {
        ValidateService.getValidateMsg(validationErrMsgs, (getValidateMsgErr, errMsgs) => {
          if (getValidateMsgErr) {
            Logger.error(`ExternalUserController.updateExternalUser at ValidateService.getValidateMsg ${getValidateMsgErr}`);
            res.send({ status: 300, message: sails.config.serverMessage.serverError });
          } else {
            Logger.verbose(errMsgs);
            res.send({ status: 422, message: errMsgs });
          }
        });
      }
    });
  },
  
  

};
