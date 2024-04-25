const ObjectId = require('mongodb').ObjectID;

module.exports = {

  registration(req, res) {
    Logger.debug('InvestigatorController.registration');

    const registrationData = req.body.data;
    Logger.verbose(registrationData);
    registrationData.email = registrationData.email.toLowerCase();

    const args = [
      {
        name: 'First name',
        value: registrationData.firstName,
        validations: [{ validation: 'notEmpty', message: sails.config.ValidationMessages.firstNameRequiredValidation },
          { validation: 'regex', regex: /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/, message: sails.config.ValidationMessages.alphabetPatternValidation },
          { validation: 'maxLengthString', maxLength: 100, message: sails.config.ValidationMessages.firstNameMaxValidation },
          { validation: 'minLengthString', minLength: 2, message: sails.config.ValidationMessages.firstNameMinValidation },
        ],
      },
      {
        name: 'Middle name',
        value: registrationData.middleName,
        validations: [
          // { validation: 'regex', regex: /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/, message: sails.config.ValidationMessages.alphabetPatternValidation },
          // { validation: 'maxLengthString', maxLength: 100, message: sails.config.ValidationMessages.middleNameMaxValidation },
          // { validation: 'minLengthString', minLength: 2, message: sails.config.ValidationMessages.middleNameMinValidation },
        ],
      },
      {
        name: 'Last name',
        value: registrationData.lastName,
        validations: [{ validation: 'notEmpty', message: sails.config.ValidationMessages.lastNameRequiredValidation },
          { validation: 'regex', regex: /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/, message: sails.config.ValidationMessages.alphabetPatternValidation },
          { validation: 'maxLengthString', maxLength: 100, message: sails.config.ValidationMessages.lastNameMaxValidation },
          { validation: 'minLengthString', minLength: 2, message: sails.config.ValidationMessages.lastNameMinValidation },
        ],
      },
      {
        name: 'Email',
        value: registrationData.email,
        validations: [{ validation: 'notEmpty', message: sails.config.ValidationMessages.emailRequiredValidation },
          { validation: 'email', message: sails.config.ValidationMessages.EmailValidation },
        ],
      },
    ];
    ValidateService.validate(args, (validationErr, validationErrMsgs) => {
      if (validationErr) {
        Logger.error(`InvestigatorController.registration at ValidateService.validate ${validationErr}`);
        res.send({ status: 300, message: sails.config.serverMessage.serverError });
      } else if (validationErrMsgs.length === 0) {
        InvestigatorService.registration(registrationData, (err) => {
          console.log('registrationData in controller', registrationData);
          if (err) {
            console.log('err', err);

            if (err === 'Already Present') {
              res.send({ status: 300, message: sails.config.serverMessage.emailAlreadyPresent });
            } else {
              res.send({ status: 300, message: sails.config.serverMessage.serverError });
            }
          } else {
            res.send({ status: 200, message: sails.config.serverMessage.registeredSuccess });
          }
        });
      } else {
        ValidateService.getValidateMsg(validationErrMsgs, (getValidateMsgErr, errMsgs) => {
          if (getValidateMsgErr) {
            Logger.error(`InvestigatorController.registration at ValidateService.getValidateMsg ${getValidateMsgErr}`);
            res.send({ status: 300, message: sails.config.serverMessage.serverError });
          } else {
            Logger.verbose(errMsgs);
            res.send({ status: 422, message: errMsgs });
          }
        });
      }
    });
  },

  deleteInvestigator(req, res) {
    Logger.debug('InvestigatorController.deleteInvestigator');
    const investigatorId = req.body.investigatorId;
    Logger.verbose(investigatorId);
    if (!investigatorId) {
      res.send({ status: 300, message: sails.config.serverMessage.serverError });
    } else {
      InvestigatorService.updateInvestigator(investigatorId, { isActive: false }, (err) => {
        if (err) {
          res.send({ status: 300, message: sails.config.serverMessage.serverError });
        } else {
          res.send({ status: 200, message: sails.config.serverMessage.investigatorDeleteSuccess });
        }
      });
    }
  },

  getInvestigator(req, res) {
    Logger.debug('InvestigatorController.getInvestigator');
    const investigatorId = req.body.investigatorId;
    Logger.verbose(investigatorId);
    if (!investigatorId) {
      res.send({ status: 300, message: sails.config.serverMessage.serverError });
    } else {
      InvestigatorService.getInvestigator(investigatorId, (err, investigatorData) => {
        if (err) {
          res.send({ status: 300, message: sails.config.serverMessage.serverError });
        } 
        else if(investigatorData === undefined){
          res.send({ status: 300, message :'Not an investigator' });
        }
        else {
          res.send({ status: 200, investigatorData });
        }
      });
    }
  },

  getInvestigatorWithAuth(req, res) {
    Logger.debug('InvestigatorController.getInvestigatorWithAuth');
    const investigatorId = req.body.investigatorId;
    Logger.verbose(investigatorId);
    if (!investigatorId) {
      res.send({ status: 300, message: sails.config.serverMessage.serverError });
    } else {
      InvestigatorService.getInvestigator(investigatorId, (err, investigatorData) => {
        if (err) {
          res.send({ status: 300, message: sails.config.serverMessage.serverError});
        } 
        else if(investigatorData === undefined){
          Logger.debug(`investigatorData ${investigatorData}`)
          res.send({ status: 300, message :'Not an investigator' });
        }
        else {
          res.send({ status: 200, investigatorData });
        }
      });
    }
  },

  updateInvestigator(req, res) {
    Logger.debug('InvestigatorController.updateInvestigator');
    const investigatorData = req.body.data;
    Logger.verbose(investigatorData);

    const args = [
      {
        name: 'Salutation',
        value: investigatorData.salutation,
        validations: [{ validation: 'notEmpty', message: sails.config.ValidationMessages.salutationRequiredMessage }],
      },
      {
        name: 'Gender',
        value: investigatorData.gender,
        validations: [{ validation: 'notEmpty', message: sails.config.ValidationMessages.genderRequiredValidation }],
      },
      {
        name: 'First name',
        value: investigatorData.firstName,
        validations: [{ validation: 'notEmpty', message: sails.config.ValidationMessages.firstNameRequiredValidation },
          { validation: 'regex', regex: /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/, message: sails.config.ValidationMessages.alphabetPatternValidation },
          { validation: 'maxLengthString', maxLength: 100, message: sails.config.ValidationMessages.firstNameMaxValidation },
          { validation: 'minLengthString', minLength: 2, message: sails.config.ValidationMessages.firstNameMinValidation },
        ],
      },
      {
        name: 'Middle name',
        value: investigatorData.middleName,
        validations: []
      },
      {
        name: 'Last name',
        value: investigatorData.lastName,
        validations: [{ validation: 'notEmpty', message: sails.config.ValidationMessages.lastNameRequiredValidation },
          { validation: 'regex', regex: /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/, message: sails.config.ValidationMessages.alphabetPatternValidation },
          { validation: 'minLengthString', minLength: 2, message: sails.config.ValidationMessages.lastNameMinValidation },
          { validation: 'maxLengthString', maxLength: 100, message: sails.config.ValidationMessages.lastNameMaxValidation },

        ],
      },
      {
        name: 'Email',
        value: investigatorData.email,
        validations: [{ validation: 'notEmpty', message: sails.config.ValidationMessages.emailRequiredValidation },
          { validation: 'email', message: sails.config.ValidationMessages.EmailValidation },
        ],
      },
      {
        name: 'Phone number',
        value: investigatorData.phoneNumber,
        validations: [{ validation: 'notEmpty', message: sails.config.ValidationMessages.phoneNumberRequiredValidation },
          { validation: 'integer', message: sails.config.ValidationMessages.phoneNumberValidation },
        ],
      },
      {
        name: 'Affilation',
        value: investigatorData.affilation,
        validations: [
          { validation: 'notEmpty', message: sails.config.ValidationMessages.affilationRequiredValidation },
          { validation: 'maxLengthString', maxLength: 100, message: sails.config.ValidationMessages.affilationMaxValidation },
          { validation: 'string', message: sails.config.ValidationMessages.affilationStringValidation }],
      },
      {
        name: 'Nationality',
        value: investigatorData.nationality,
        validations: [{ validation: 'notEmpty', message: sails.config.ValidationMessages.nationalityValidation }],
      },
      investigatorData.malingAddress &&  (investigatorData.malingAddress !== '' ||    investigatorData.malingAddress !== undefined)?
      {
        name: 'Mailing address',
        value: investigatorData.malingAddress,
        validations: [
          
          { validation: 'maxLengthString', maxLength: 200, message: sails.config.ValidationMessages.mailingAddressMaxValidation },
          // { validation: 'string', message: sails.config.ValidationMessages.mailingAddressStringValidation }
        ],
      }:
      {
        name: 'Mailing address',
        value: investigatorData.malingAddress,
        validations: [],
      }
    ];
    ValidateService.validate(args, (validationErr, validationErrMsgs) => {
      if (validationErr) {
        Logger.error(`InvestigatorController.registration at ValidateService.validate ${validationErr}`);
        res.send({ status: 300, message: sails.config.serverMessage.serverError });
      } else if (validationErrMsgs.length === 0) {
        if (!investigatorData.id) {
          res.send({ status: 300, message: sails.config.serverMessage.serverError });
        } else {
          const investigatorId = investigatorData.id;
          InvestigatorService.updateInvestigator(investigatorId, investigatorData, (err, updatedInvestigator) => {
            if (err) {
              res.send({ status: 300, message: sails.config.serverMessage.serverError });
            } else {
              res.send({ status: 200, message: sails.config.serverMessage.investigatorDetailsSuccess, investigatorData: updatedInvestigator });
            }
          });
        }
      } else {
        ValidateService.getValidateMsg(validationErrMsgs, (getValidateMsgErr, errMsgs) => {
          if (getValidateMsgErr) {
            Logger.error(`AdminController.updateAdmin at ValidateService.getValidateMsg ${getValidateMsgErr}`);
            res.send({ status: 300, message: sails.config.serverMessage.serverError });
          } else {
            Logger.verbose(errMsgs);
            res.send({ status: 422, message: errMsgs });
          }
        });
      }
    });
  },

  getAllInvestigator(req, res) {
    Logger.debug('InvestigatorController.getInvestigator');
    InvestigatorService.getAllInvestigator((err, investigator) => {
      if (err) {
        res.send({ status: 300, message: sails.config.serverMessage.serverError });
      } else {
        res.send({ status: 200, investigator });
      }
    });
  },

  proposalHistory(req, res) {
    Logger.debug('InvestigatorController.proposalHistory');
    const proposalId = req.params['proposalId'];
    const investigatorId = new ObjectId(req.session.user.id);
    console.log(investigatorId);
    console.log(new ObjectId(req.session.user.id));
    Logger.verbose(proposalId);
    Logger.verbose(investigatorId);

    if (!proposalId || !investigatorId) {
      console.log('in here');
      res.send({ status: 300, message: 'Server error. Please try again.' });
    } else {
      InvestigatorService.getProposalHistory(proposalId, investigatorId, (err, proposalData) => {
        if (err) {
          console.log(err)
          res.send({ status: 300, message: 'Server error. Please try again.' });
        } else {
          res.send({ status: 200, proposalData });
        }
      });
    }
  },
};
