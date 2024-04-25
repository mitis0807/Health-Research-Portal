module.exports = {

    createContactform(req, res) {
      Logger.debug('ContactUsController.createContactform');
  
      const contactData = req.body;
      Logger.verbose(contactData);
  
      const args = [
          { name: 'First name', value: contactData.firstName, 
            validations: [
                { validation: 'notEmpty', message: sails.config.ValidationMessages.firstNameRequiredValidation },
                { validation: 'regex', regex: /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/, message: sails.config.ValidationMessages.alphabetPatternValidation }
            ]
          },
          { name: 'Last name', value: contactData.lastName,
            validations: [{ validation: 'string' },
            { validation: 'notEmpty', message: sails.config.ValidationMessages.lastNameRequiredValidation },
            { validation: 'regex', regex: /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/, message: sails.config.ValidationMessages.alphabetPatternValidation },
            ]
          },
          { name: 'Email', value: contactData.email,
            validations: [
            { validation: 'notEmpty', message: sails.config.ValidationMessages.emailRequiredValidation },
            { validation: 'email', message: sails.config.ValidationMessages.EmailValidation },
            ],
          },
          { name: 'Select Type of request', value: contactData.requestType,
            validations: [{ validation: 'notEmpty',  message: sails.config.ValidationMessages.requestTypeValidation},
            { validation: 'string' }]
          },
          { name: 'Message', value: contactData.message,
          validations: [
              { validation: 'notEmpty', message: sails.config.ValidationMessages.messageValidation},
              { validation: 'maxLengthString', maxLength: 1000, message: sails.config.ValidationMessages.messageLengthValidation },
          ]
        },
      ];
      ValidateService.validate(args, (validationErr, validationErrMsgs) => {
        if (validationErr) {
          Logger.error(`ContactUsController.createContactform at ValidateService.validate ${validationErr}`);
          return res.send({ status: 300, message: sails.config.serverMessage.serverError });
        } else if (validationErrMsgs.length === 0) {
          ContactUsService.createContactform(contactData, (err, responseContactData) => {
            if (err) {
                Logger.error(`ContactUsController.createContactform at ValidateService.validate ${err}`);
                res.send({status:300, message:sails.config.serverMessage.serverError})
            }
            else {
              Logger.debug('Thank you for contacting us, we will get back to you');
              InternalUserService.getCoordinator((coordinatorFetchErr, coordinator) =>{
                if(coordinatorFetchErr){
                  Logger.error(`Error while fetching coordinator data ${coordinatorFetchErr}`)
                }
                else{
                  Logger.debug('Found Coordinator Data ');
                  Logger.debug(coordinator)
                  EmailService.contactRequestToCoordinator(coordinator[0], contactData);
                }
              });
              InternalUserService.getAdmin((adminFetchErr, admin) =>{
                if(adminFetchErr){
                  Logger.error(`Error while fetching admin data ${adminFetchErr}`)
                }
                else{
                  Logger.debug('Found admin Data ');
                  Logger.debug(admin)
                  EmailService.contactRequestToAdmin(admin[0], contactData);
                }
              });
              res.send({ status: 200, data:responseContactData, message: 'Thank you for contacting us, we will get back to you' });
            }
          });
        } else {
          Logger.error('validation error');
          Logger.error({ status: 422, validationErrArr: validationErrMsgs });
          res.send({ status: 422, validationErrArr: validationErrMsgs });
        }
      });
    }
  };