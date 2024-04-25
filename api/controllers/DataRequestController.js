

module.exports = {
    uploadDocument(req, res) {
        Logger.debug('DataRequestController.uploadDocument');
  
        console.log('req.file', req.file)
        const requestId = req.params['requestId']
        
            req.file('file').upload({
                adapter: require('skipper-disk'),
                maxBytes: 5000000,
                dirname: require('path').resolve(`files/DataRequestDocuments`)
            }, (uploadErr, files) => {
                if (uploadErr) {
                    Logger.error(`DataRequestController.uploadDataUtilizationDoc at req.file ${uploadErr}`);
                    res.send({ status: 300, message: sails.config.serverMessage.fileUploadError });
                } else if (files.length === 0) {
                    Logger.warn('No document was uploaded');
                    res.send({ status: 300, message: 'No document was uploaded' });
                } else {
                    const file = files[0];
                    Logger.debug('file uploaded in DB');
                    Logger.info(file)
  
                    console.log('file extension type', file.fd.split('.').pop());
  
                    if (file.fd.split('.').pop() === 'doc' ||
                        file.fd.split('.').pop() === 'docx' ||
                        file.fd.split('.').pop() === 'xls'
                        || file.fd.split('.').pop() === 'xlsx'||
                        file.fd.split('.').pop() === 'pdf') {
                        const fileLocArray = file ? file.fd.split('/') : [];
                        console.log("fileLocArray", fileLocArray);
                        const fileLoc = fileLocArray[fileLocArray.length - 1];
                        console.log("fileLoc", fileLoc);
  
                        const uploadFile = {
                            uid: fileLoc,
                            size: file.size,
                            type: file.type,
                            name: file.filename,
                            url: `/DataRequestDocuments/${fileLoc}`,
                            status: 'done',
                        };
                        Logger.verbose('uploadFile');
                        Logger.verbose(uploadFile);
                        console.log('uploaded file', uploadFile.url);
                        const reqData = {};
                        reqData["dataUtilizationDocument"] = uploadFile;
                        reqData.dataUtilization = true;
                        console.log('reqData[req.body.fileName]', reqData[req.body.fileName]);
                        console.log('reportData in controller', file);
  
                        DataRequestService.updateRequestForData(requestId, reqData, null, (err, updatedProposal) => {
                            if (err) {
                                res.send({ status: 300, message: sails.config.serverMessage.serverError });
                            } else {
                                res.send({ status: 200, message: sails.config.serverMessage.uploadFileSuccess, reqData: updatedProposal });
                            }
                        });
                    }
                    else {
                        res.send({ status: 400, message: sails.config.serverMessage.fileUploadError });
                    }
                }
            });
        
    },
    saveDataRequest(req, res) {
        let newRequest = {}
        newRequest.email = req.body.email;
        newRequest.isSubmitted = false;
        Logger.debug('DataRequestController.saveDataRequest');
        DataRequestService.saveDataRequest(newRequest, (err, savedData) => {
            if (err) {
                Logger.error(`DataRequestController.saveDataRequest at DataRequestService.saveDataRequest${err}`)
                return res.send({ status: 300, message: sails.config.serverMessage.serverError })
            }
            else {
                Logger.debug(`DataRequestController.saveDataRequest at DataRequestService.saveDataRequest`);
                Logger.debug(savedData)
                return res.send({ status: 200, message: 'Data request saved', data: savedData })
            }
        })
    },
    updateDataRequest(req, res) {
        Logger.debug('DataRequestController.updateDataRequest');
        Logger.debug(req.body);
        let reqData=req.body;
        const requestId = req.params['requestId'];
        const nameValidation = req.body.fullName !== '' || req.body.fullName !== undefined ?
            {
                name: 'Full Name ',
                value: req.body.fullName,
                validations: [
                    { validation: 'regex', regex: /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/, message: sails.config.ValidationMessages.alphabetPatternValidation }
                ],
            } :
            {
                name: 'Full Name ',
                value: req.body.fullName,
                validations: [],
            }
  
        const requestedDataOrInformationValidation = req.body.requestedDataOrInformation.length > 150 ?
            {
                name: 'What data or information is requested?',
                value: req.body.requestedDataOrInformation,
                validations: [{ validation: 'maxLengthString', maxLength: 150, message: sails.config.ValidationMessages.messageLengthValidation }
                ],
            } : {
                name: 'What data or information is requested?',
                value: req.body.requestedDataOrInformation,
                validations: [],
            }
  
        const purposeOfRequestValidation = req.body.purposeOfRequest.length > 150 ?
            {
                name: 'What is the purpose for the request?',
                value: req.body.purposeOfRequest,
                validations: [{ validation: 'maxLengthString', maxLength: 150, message: sails.config.ValidationMessages.messageLengthValidation }],
            } : {
  
                name: 'What is the purpose for the request?',
                value: req.body.purposeOfRequest,
                validations: []
            }
  
        const args = [
  
            req.body.fullName === '' || req.body.fullName === undefined ?
                {
                    name: 'Full Name ',
                    value: req.body.fullName,
                    validations: [
                        { validation: 'notEmpty', message: sails.config.ValidationMessages.fullNameRequiredValidation },
                    ],
                } : nameValidation,
            req.body.typeOfApplication === '' || req.body.typeOfApplication === undefined ?
                {
                    name: 'Type of Application',
                    value: req.body.typeOfApplication,
                    validations: [
                        { validation: 'notEmpty', message: sails.config.ValidationMessages.typeOfApplicationRequiredValidation },
                    ],
                } : {
                    name: 'Type of Application',
                    value: req.body.typeOfApplication,
                    validations: [],
                },
            req.body.typeOfApplication === 'organizational' ?
                {
                    name: 'Types of Organization or Institution',
                    value: req.body.typeOfOrganization,
  
                    validations: [
                        { validation: 'notEmpty', message: sails.config.ValidationMessages.typeOfOrganizationRequiredValidation }
                    ],
                } : {
                    name: 'Types of Organization or Institution',
                    value: req.body.typeOfOrganization,
                    validations: [],
                },
            req.body.typeOfOrganization === 'others' ?
                {
                    name: 'Types of Organization Comment',
                    value: req.body.typeOfOrganizationComment,
                    validations: [
                        { validation: 'notEmpty', message: sails.config.ValidationMessages.typeOfOrganizationCommentRequiredValidation },
                        { validation: 'maxLengthString', maxLength: 150, message: sails.config.ValidationMessages.messageLengthValidation }
                    ],
                } : {
                    name: 'Types of Organization Comment',
                    value: req.body.typeOfOrganizationComment,
                    validations: [],
                },
            req.body.typeOfApplication === 'individualStatus' ?
                {
                    name: 'Individual status',
                    value: req.body.individualStatus,
                    validations: [
                        { validation: 'notEmpty', message: sails.config.ValidationMessages.individualStatusRequiredValidation }
                    ]
                } : {
                    name: 'Individual status',
                    value: req.body.individualStatus,
                    validations: []
                },
            req.body.individualStatus === 'others' ?
                {
                    name: 'Individual status comment',
                    value: req.body.individualStatusComment,
                    validations: [
                        { validation: 'notEmpty', message: sails.config.ValidationMessages.individualStatusCommentRequiredValidation },
                        { validation: 'maxLengthString', maxLength: 150, message: sails.config.ValidationMessages.messageLengthValidation }
                    ]
                } : {
                    name: 'Individual status comment',
                    value: req.body.individualStatusComment,
                    validations: []
                },
            req.body.countryOfOrigin === '' || req.body.countryOfOrigin === undefined ?
                {
                    name: 'Application country of origin',
                    value: req.body.countryOfOrigin,
                    validations: [
                        { validation: 'notEmpty', message: sails.config.ValidationMessages.countryOfOriginRequiredValidation },
                    ],
                } : {
                    name: 'Application country of origin',
                    value: req.body.countryOfOrigin,
                    validations: [
  
                    ],
                },
            req.body.phone === '' || req.body.phone === undefined ?
                {
                    name: 'Phone',
                    value: parseInt(req.body.phone),
                    validations: [{ validation: 'notEmpty', message: sails.config.ValidationMessages.studentResearchValidation }],
                } : {
                    name: 'Phone',
                    value: parseInt(req.body.phone),
                    validations: [{ validation: 'integer', message: sails.config.ValidationMessages.phoneNumberValidation },]
                },
            req.body.requestedDataOrInformation === '' || req.body.requestedDataOrInformation === undefined ?
                {
                    name: 'What data or information is requested?',
                    value: req.body.requestedDataOrInformation,
                    validations: [{ validation: 'notEmpty', message: sails.config.ValidationMessages.requestedDataOrInformationValidation }],
                } : requestedDataOrInformationValidation,
  
            req.body.purposeOfRequest === '' || req.body.purposeOfRequest === undefined ?
                {
                    name: 'What is the purpose for the request?',
                    value: req.body.purposeOfRequest,
                    validations: [{ validation: 'notEmpty', message: sails.config.ValidationMessages.purposeOfRequestValidation }],
                } : purposeOfRequestValidation,
  
            req.body.plannedOutputs === '' || req.body.plannedOutputs === undefined ?
                {
                    name: 'Indicate the planned outputs from your end?',
                    value: req.body.plannedOutputs,
                    validations: [{ validation: 'notEmpty', message: sails.config.ValidationMessages.plannedOutputsValidation }],
                } : {
                    name: 'Indicate the planned outputs from your end?',
                    value: req.body.plannedOutputs,
                    validations: [],
                },
            req.body.plannedOutputs === 'others' ?
                {
                    name: 'Indicate the planned outputs comments',
                    value: req.body.plannedOutputsComments,
                    validations: [
                        { validation: 'notEmpty', message: sails.config.ValidationMessages.plannedOutputsCommentsRequiredValidation },
                        { validation: 'maxLengthString', maxLength: 150, message: sails.config.ValidationMessages.messageLengthValidation }
                    ]
                } : {
                    name: 'Indicate the planned outputs comments',
                    value: req.body.plannedOutputsComments,
                    validations: []
                },
            req.body.dataUtilization === '' || req.body.dataUtilization === undefined ?
                {
                    name: 'If the data is utilized for any of the following, please attach supporting documents as listed below',
                    value: req.body.dataUtilization,
                    validations: [
                        { validation: 'notEmpty', message: sails.config.ValidationMessages.dataUtilizationValidation },
                    ]
                } : {
                    name: 'If the data is utilized for any of the following, please attach supporting documents as listed below',
                    value: req.body.dataUtilization,
                    validations: []
                },
            req.body.statement === '' || req.body.statement === undefined ?
                {
                    name: 'Statement',
                    value: (req.body.statement) === "true" ? true : false,
                    validations: [{ validation: 'notEmpty', message: sails.config.ValidationMessages.statementValidation }],
                } : {
                    name: 'Statement',
                    value: (req.body.statement) === "true" ? true : false,
                    validations: [{ validation: 'boolean', message: sails.config.ValidationMessages.booleanValidation }],
                },
            req.body.agreement === '' || req.body.agreement === undefined ?
                {
                    name: 'Agreement for information/ data delivery',
                    value: (req.body.agreement) === "true" ? true : false,
                    validations: [{ validation: 'notEmpty', message: sails.config.ValidationMessages.agreementValidation }],
  
                } : {
                    name: 'Agreement for information/ data delivery',
                    value: (req.body.agreement) === "true" ? true : false,
                    validations: []
                },
            req.body.signature === '' || req.body.signature === undefined ?
                {
                    name: 'Signature',
                    value: req.body.signature,
                    validations: [{ validation: 'notEmpty', message: sails.config.ValidationMessages.signatureValidation }],
                } : {
                    name: 'Signature',
                    value: req.body.signature,
                    validations: [],
                },
        ];
  
        ValidateService.validate(args, (validationErr, validationErrMsgs) => {
            if (validationErr) {
                Logger.error(
                    `DataRequestController.updateDataRequest at ValidateService.validate ${validationErr}`
                );
                res.send({ status: 300, message: sails.config.serverMessage.serverError });
            } else if (validationErrMsgs.length === 0) {
  
                DataRequestService.updateRequestForData(requestId,reqData, null,(err, savedRequest) => {
                    if (err) {
                        Logger.error(`DataRequestController.updateDataRequest at DataRequestService.updateRequestForData ${err}`)
                        res.send({ status: 300, message: sails.config.serverMessage.serverError});
                    } else {
                        console.log('savedRequest', savedRequest);
                        InternalUserService.getSeniorStatistician((error, seniorStatistician) => {
                            if (error)
                                console.log('error while getting senior statistician', error);
                            else {
                                console.log('senior statistician data', seniorStatistician);
                                if(seniorStatistician !== undefined){
                                EmailService.requestedDataToSeniorStatistician(seniorStatistician, savedRequest);
                                }
                            }
                        });
                        EmailService.requestedDataToRequester(reqData.email,savedRequest);
                        res.send({ status: 200, message: 'Request for data has been submitted successfully.', requestData: savedRequest });
                    }
                });
            } else {
                Logger.verbose('validation error');
                console.log('validation error');
                Logger.verbose({ status: 422, validationErrArr: validationErrMsgs });
                res.send({ status: 422, validationErrArr: validationErrMsgs });
            }
        });
    },
    trackDataRequest(req, res) {
      Logger.debug('DataRequestController.trackDataRequest');
      console.log("req.query.docketNo", req.params['docketNo']);
      if (req.params['docketNo']){
          DataRequestService.trackDataRequest(req.params.docketNo, (err, data) => {
              if (err) {
                  res.send({ status: 300, message: sails.config.serverMessage.serverError });
              } else if(data.length==0){
                res.send({ status: 300, message: 'Docket number does not exist' });               
              }else{
                console.log('fetched data in controller', data);
                res.send({ status: 200, data });
              }
          });
      } else{
          console.log('docket id is not provided')
          res.send({ status: 300, message: 'Please input Request Id' });
      }
    },
  //Data request mark as Complete from senior statiscian
  markDataRequestComplete(req, res) {
    Logger.debug("DataRequestController.markDataRequestComplete");
    const docketNo = req.params["docketNo"];
    const commentForMarkComplete = req.body.commentForMarkComplete;
    Logger.verbose(docketNo);
    let args = [
      {
        name: "Senior Statistician Comment",
        value: commentForMarkComplete,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.commentRequiredValidation,
          },
        ],
      },
      {
        name: "Senior Statistician Comment",
        value: commentForMarkComplete,
        validations: [
          {
            validation: "maxLengthString",
            maxLength: 150,
            message: sails.config.ValidationMessages.seniorStatisticianCommentMaxValidation,
          },
        ],
      }];

        ValidateService.validate(args,(validationErr, validationErrMsgs)=>{
          if (validationErr) {
            Logger.error(
              `DataRequestController.markDataRequestComplete at ValidateService.validate ${validationErr}`
            );
            res.send({
              status: 300,
              message: sails.config.serverMessage.serverError,
            });
          } 
          else if(validationErrMsgs.length === 0){
            DataRequestService.updateRequest(
              docketNo,
              { commentForMarkComplete, isCompleted: true },
              (updateErr, updatedRequest) => {
                if (updateErr) {
                  Logger.error(
                    `DataRequestController.markDataRequestComplete at DataRequestService.updateRequest ${updateErr}`
                  );
                  res.send({
                    status: 300,
                    message: sails.config.serverMessage.serverError,
                  });
                } else {
                  Logger.info("Updated request successfully");
                  // get senior statisticion and send email
                  InternalUser.findActiveByCriteria(
                    { isActive: true, role: 8, isVerified: true },
                    (err, seniorStatistician) => {
                      if (err) {
                        Logger.error(
                          `DataRequestController.markDataRequestComplete at InternalUser.findActiveByCriteria ${err}`
                        );
                      } else {
                        EmailService.markCompleteDataRequestToRequestor(
                          updatedRequest
                        );
                        EmailService.markCompleteDataRequestToSeniorStatisticion(
                          seniorStatistician,
                          updatedRequest
                        );
        
                        res.send({
                          status: 200,
                          message: sails.config.serverMessage.markRequestComplete,
                          updatedRequest,
                        });
                      }
                    }
                  );
                }
              }
            );
          }
          else{
            ValidateService.getValidateMsg(
              validationErrMsgs,
              (getValidateMsgErr, errMsgs) => {
                if (getValidateMsgErr) {
                  Logger.error(
                    `DataRequestController.markDataRequestComplete at ValidateService.getValidateMsg ${getValidateMsgErr}`
                  );
                  res.send({
                    status: 300,
                    message: sails.config.serverMessage.serverError,
                  });
                } else {
                  Logger.verbose(errMsgs);
                  res.send({ status: 422, message: errMsgs });
                }
              }
            );
          }
        })
         
   
  },
  
    markDataRequestInComplete(req, res) {
      Logger.debug("DataRequestController.markDataRequestInComplete");
      const docketNo = req.params["docketNo"];
      const commentForMarkInComplete = req.body.commentForMarkInComplete;
      Logger.verbose(docketNo);
      let args = [
        {
          name: "Senior Statistician Comment",
          value: commentForMarkInComplete,
          validations: [
            {
              validation: "notEmpty",
              message: sails.config.ValidationMessages.commentRequiredValidation,
            },
          ],
        },
        {
          name: "Senior Statistician Comment",
          value: commentForMarkInComplete,
          validations: [
            {
              validation: "maxLengthString",
              maxLength: 150,
              message: sails.config.ValidationMessages.seniorStatisticianCommentMaxValidation,
            },
          ],
        }
      ];
        
        ValidateService.validate(args,(validationErr, validationErrMsgs)=>{
          if (validationErr) {
            Logger.error(
              `DataRequestController.markDataRequestInComplete at ValidateService.validate ${validationErr}`
            );
            res.send({
              status: 300,
              message: sails.config.serverMessage.serverError,
            });
          } 
          else if(validationErrMsgs.length === 0){
            DataRequestService.updateRequest(
              docketNo,
              { commentForMarkInComplete, isInCompleted: true },
              (updateErr, updatedRequest) => {
                if (updateErr) {
                  Logger.error(
                    `DataRequestController.markDataRequestInComplete at DataRequestService.updateRequest ${updateErr}`
                  );
                  res.send({
                    status: 300,
                    message: sails.config.serverMessage.serverError,
                  });
                } else {
                  Logger.info("Updated request successfully");
                  // get senior statisticion and send email
                  InternalUser.findActiveByCriteria(
                    { isActive: true, role: 8, isVerified: true },
                    (err, seniorStatistician) => {
                      if (err) {
                        Logger.error(
                          `DataRequestController.markDataRequestInComplete at InternalUser.findActiveByCriteria ${err}`
                        );
                      } else {
                        
                        EmailService.markInCompleteDataRequestToRequestor(
                          updatedRequest
                        );
                        EmailService.markInCompleteDataRequestToSeniorStatisticion(
                          seniorStatistician,
                          updatedRequest
                        );
        
                        res.send({
                          status: 200,
                          message: sails.config.serverMessage.markRequestInComplete,
                          updatedRequest,
                        });
                      }
                    }
                  );
                }
              }
            );
          }
          else{
            ValidateService.getValidateMsg(
              validationErrMsgs,
              (getValidateMsgErr, errMsgs) => {
                if (getValidateMsgErr) {
                  Logger.error(
                    `DataRequestController.markDataRequestComplete at ValidateService.getValidateMsg ${getValidateMsgErr}`
                  );
                  res.send({
                    status: 300,
                    message: sails.config.serverMessage.serverError,
                  });
                } else {
                  Logger.verbose(errMsgs);
                  res.send({ status: 422, message: errMsgs });
                }
              }
            );
          }
        })
     
    },
    searchDataRequest(req,res){
      Logger.debug("DataRequestController.searchDataRequest");
    const searchTerm = req.params["searchTerm"];
    const user=req.session.user;
    console.log(searchTerm);
    Logger.verbose(searchTerm);
    if (!searchTerm) {
      console.log("in here");
      res.send({ status: 300, message: "Server error. Please try again." });
    }else if(searchTerm.length <= 2){
      res.send({ status: 300, message: 'Search term length must be greater than 2' });
    } 
    else {
      DataRequestService.searchDataRequest(searchTerm,user, (err, dataRequests) => {
        if (err) {
          console.log(err);
          res.send({ status: 300, message: "Server error. Please try again." });
        } else {
          if(dataRequests.length==0){
            res.send({ status: 200, message:'No results found' });
          }
          else{
            res.send({ status: 200, dataRequests });
          }
          
        }
      });
    }
    },
    approveDataRequest(req, res) {
      Logger.debug("DataRequestController.approveDataRequest");
      const docketNo = req.params["docketNo"];
      const commentForApproved = req.body.commentForApproved;
      Logger.verbose(docketNo);
      let args = [
        {
          name: "Comment",
          value: commentForApproved,
          validations: [
            {
              validation: "notEmpty",
              message: sails.config.ValidationMessages.commentRequiredValidation,
            },
          ],
        },
        {
          name: "Comment",
          value: commentForApproved,
          validations: [
            {
              validation: "maxLengthString",
              maxLength: 150,
              message: sails.config.ValidationMessages.CommentMaxLength,
            },
          ],
        }
      ];
        
        ValidateService.validate(args,(validationErr, validationErrMsgs)=>{
          if (validationErr) {
            Logger.error(
              `DataRequestController.approveDataRequest at ValidateService.validate ${validationErr}`
            );
            res.send({
              status: 300,
              message: sails.config.serverMessage.serverError,
            });
          } 
          else if(validationErrMsgs.length === 0){
            DataRequestService.updateRequest(
              docketNo,
              { commentForApproved, isApproved: true },
              (err, updatedRequest) => {
                if (err) {
                  Logger.error(
                    `DataRequestController.approveDataRequest at DataRequestService.updateRequest ${err}`
                  );
                  res.send({
                    status: 300,
                    message: sails.config.serverMessage.serverError,
                  });
                } else {
                  Logger.info("Updated request successfully");
                  Logger.verbose(updatedRequest);
                  // get senior statisticion and send email
                  InternalUser.findActiveByCriteria(
                    { isActive: true, role: 8, isVerified: true },
                    (internalUserErr, seniorStatistician) => {
                      if (internalUserErr) {
                        Logger.error(
                          `DataRequestController.approveDataRequest at InternalUser.findActiveByCriteria ${internalUserErr}`
                        );
                      } else {
                        EmailService.approvedDataRequestToRequestor(updatedRequest);
                        EmailService.approvedDataRequestToSeniorStatisticion(
                          seniorStatistician,
                          updatedRequest
                        );
              
                        res.send({
                          status: 200,
                          message: sails.config.serverMessage.markRequestApproved,
                          updatedRequest,
                        });
                      }
                    }
                  );
                 
                }
              }
            );
          }
          else{
            ValidateService.getValidateMsg(
              validationErrMsgs,
              (getValidateMsgErr, errMsgs) => {
                if (getValidateMsgErr) {
                  Logger.error(
                    `DataRequestController.approveDataRequest at ValidateService.getValidateMsg ${getValidateMsgErr}`
                  );
                  res.send({
                    status: 300,
                    message: sails.config.serverMessage.serverError,
                  });
                } else {
                  Logger.verbose(errMsgs);
                  res.send({ status: 422, message: errMsgs });
                }
              }
            );
          }
        })
     
    },
  
    rejectDataRequest(req, res) {
      Logger.debug("DataRequestController.rejectDataRequest");
      const docketNo = req.params["docketNo"];
      const commentForRejected = req.body.commentForRejected;
      Logger.verbose(docketNo);
      let args = [
        {
          name: "Comment",
          value: commentForRejected,
          validations: [
            {
              validation: "notEmpty",
              message: sails.config.ValidationMessages.commentRequiredValidation,
            },
          ],
        },
        {
          name: "Comment",
          value: commentForRejected,
          validations: [
            {
              validation: "maxLengthString",
              maxLength: 150,
              message: sails.config.ValidationMessages.CommentMaxLength,
            },
          ],
        }
      ];
        
        ValidateService.validate(args,(validationErr, validationErrMsgs)=>{
          if (validationErr) {
            Logger.error(
              `DataRequestController.rejectDataRequest at ValidateService.validate ${validationErr}`
            );
            res.send({
              status: 300,
              message: sails.config.serverMessage.serverError,
            });
          } 
          else if(validationErrMsgs.length === 0){
            DataRequestService.updateRequest(
              docketNo,
              { commentForRejected, isRejected: true },
              (updateErr, updatedRequest) => {
                if (updateErr) {
                  Logger.error(
                    `DataRequestController.rejectDataRequest at DataRequestService.updateRequest ${updateErr}`
                  );
                  res.send({
                    status: 300,
                    message: sails.config.serverMessage.serverError,
                  });
                } else {
                  Logger.info("Updated request successfully");
                  // get senior statisticion and send email
                  InternalUser.findActiveByCriteria(
                    { isActive: true, role: 8, isVerified: true },
                    (err, seniorStatistician) => {
                      if (err) {
                        Logger.error(
                          `DataRequestController.rejectDataRequest at InternalUser.findActiveByCriteria ${err}`
                        );
                      } else {
                        EmailService.rejectedDataRequestToRequestor(
                          updatedRequest
                        );
                        EmailService.rejectedDataRequestToSeniorStatisticion(
                          seniorStatistician,
                          updatedRequest
                        );
        
                        res.send({
                          status: 200,
                          message: sails.config.serverMessage.markRequestRejected,
                          updatedRequest,
                        });
                      }
                    }
                  );
                }
              }
            );
          }
          else{
            ValidateService.getValidateMsg(
              validationErrMsgs,
              (getValidateMsgErr, errMsgs) => {
                if (getValidateMsgErr) {
                  Logger.error(
                    `DataRequestController.rejectDataRequest at ValidateService.getValidateMsg ${getValidateMsgErr}`
                  );
                  res.send({
                    status: 300,
                    message: sails.config.serverMessage.serverError,
                  });
                } else {
                  Logger.verbose(errMsgs);
                  res.send({ status: 422, message: errMsgs });
                }
              }
            );
          }
        })
    },
  
    referDataRequest(req, res) {
      Logger.debug("DataRequestController.referDataRequest");
      const docketNo = req.params["docketNo"];
      const refferedTo  = parseInt(req.body.refferedTo);
      const refferedBy = req.session.user.role;
      const { referComment } = req.body;
      
      let reminderDateForPSHMS=new Date();
      let reminderDateForHead=new Date();
      reminderDateForPSHMS.setDate(
        reminderDateForPSHMS.getDate() + 8
      );
      reminderDateForHead.setDate(
        reminderDateForHead.getDate() + 3
      );
      if(!docketNo || !refferedTo || !refferedBy || ! referComment){
        return res.send({status:300, message:"Server error. Please try again later"});
      }
      Logger.verbose(docketNo);
      // Validations
      let args = [
        {
          name: "Senior Statistician Comment",
          value: referComment,
          validations: [
            {
              validation: "maxLengthString",
              maxLength: 150,
              message: sails.config.ValidationMessages.seniorStatisticianReferComment,
            },
          ],
        },
        {
          name: "Role Id",
          value: parseInt(refferedTo),
          validations: [
            {
              validation: "roleIdEnum",
              roleIds: [9, 10],
              message: sails.config.ValidationMessages.roleIdNotValid,
            }
          ],
        },
      ];
      ValidateService.validate(args, (validationErr, validationErrMsgs) => {
        if (validationErr) {
          Logger.error(
            `DataRequestController.referDataRequest at ValidateService.validate ${validationErr}`
          );
          res.send({
            status: 300,
            message: sails.config.serverMessage.serverError,
          });
        } else if (validationErrMsgs.length === 0) {
          DataRequestService.updateRequest(
            docketNo,
            { referComment, refferedTo, refferedBy, isReffered: true },
            (updateErr, updatedRequest) => {
              if (updateErr) {
                Logger.error(
                  `DataRequestController.referDataRequest at DataRequestService.updateRequest ${updateErr}`
                );
                res.send({
                  status: 300,
                  message: sails.config.serverMessage.serverError,
                });
              } else {
                Logger.info("Updated request successfully");
                // get senior statisticion and send email
                InternalUser.findActiveByCriteria(
                  { isActive: true, role: refferedTo, isVerified: true },
                  (err, user) => {
                    if (err) {
                      Logger.error(
                        `DataRequestController.referDataRequest at InternalUser.findActiveByCriteria ${err}`
                      );
                    } else {
                      // reffered by email
                      // reffered to email
                      // case I - reffered by SS and reffered to Head
                      // case II - reffered by SS and reffered to PSHMS
                      // case III - reffered by Head and reffered to PSHMS
                      Logger.verbose(`before email ${user}`);
                      EmailService.refferedToEmail(req.session.user, updatedRequest);
                      EmailService.refferedByEmail(user, updatedRequest);
                      // if(refferedTo == 9 && refferedBy == 10){
                      //   // send email to PA
                      //   EmailService.sendEmailToPA(updatedRequest);
                      // }
                      //send reminder for response to PSHMS
                      if(refferedTo==9){
                        AgendaService.reminderToPSHMS(reminderDateForPSHMS,updatedRequest);
                      }
                      if(refferedTo==10){
                        AgendaService.reminderToHead(reminderDateForHead,updatedRequest);
                      }
                      res.send({
                        status: 200,
                        message: sails.config.serverMessage.refferedDataRequestSuccess,
                        updatedRequest,
                      });
                    }
                  }
                );
              }
            }
          );
        } else {
          ValidateService.getValidateMsg(
            validationErrMsgs,
            (getValidateMsgErr, errMsgs) => {
              if (getValidateMsgErr) {
                Logger.error(
                  `DataRequestController.referDataRequest at ValidateService.getValidateMsg ${getValidateMsgErr}`
                );
                res.send({
                  status: 300,
                  message: sails.config.serverMessage.serverError,
                });
              } else {
                Logger.verbose(errMsgs);
                res.send({ status: 422, message: errMsgs });
              }
            }
          );
        }
      });
    },
    referDataToPSHMSByHead(req, res) {
      Logger.debug("DataRequestController.referDataToPSHMSByHead");
      const docketNo = req.params["docketNo"];
      const refferedToPSHMS  = parseInt(req.body.refferedTo);
      const refferedByHead = req.session.user.role;
      const { referCommentByHead } = req.body;
      
      let reminderDateForPSHMS=new Date();
      reminderDateForPSHMS.setDate(
        reminderDateForPSHMS.getDate() + 8
      );
      if(!docketNo || !refferedToPSHMS || !refferedByHead || ! referCommentByHead){
        return res.send({status:300, message:"Server error. Please try again later"});
      }
      Logger.verbose(docketNo);
      // Validations
      let args = [
        {
          name: "Comment",
          value: referCommentByHead,
          validations: [
            {
              validation: "notEmpty",
              message: sails.config.ValidationMessages.commentRequiredValidation,
            },
          ],
        },
        
        {
          name: "Comment",
          value: referCommentByHead,
          validations: [
            {
              validation: "maxLengthString",
              maxLength: 150,
              message: sails.config.ValidationMessages.seniorStatisticianReferComment,
            },
          ],
        },
        
      ];
      ValidateService.validate(args, (validationErr, validationErrMsgs) => {
        if (validationErr) {
          Logger.error(
            `DataRequestController.referDataToPSHMSByHead at ValidateService.validate ${validationErr}`
          );
          res.send({
            status: 300,
            message: sails.config.serverMessage.serverError,
          });
        } else if (validationErrMsgs.length === 0) {
          DataRequestService.updateRequest(
            docketNo,
            { referCommentByHead, refferedToPSHMS, refferedByHead, isReffered: true },
            (updateErr, updatedRequest) => {
              if (updateErr) {
                Logger.error(
                  `DataRequestController.referDataToPSHMSByHead at DataRequestService.updateRequest ${updateErr}`
                );
                res.send({
                  status: 300,
                  message: sails.config.serverMessage.serverError,
                });
              } else {
                Logger.info("Updated request successfully");
                // get senior statisticion and send email
                InternalUser.findActiveByCriteria(
                  { isActive: true, role: refferedToPSHMS, isVerified: true },
                  (err, user) => {
                    if (err) {
                      Logger.error(
                        `DataRequestController.referDataToPSHMSByHead at InternalUser.findActiveByCriteria ${err}`
                      );
                    } else {
                      
                      Logger.verbose(`before email ${user}`);
                      EmailService.refferedToEmail(req.session.user, updatedRequest);
                      EmailService.refferedByEmail(user, updatedRequest);
                      // if(refferedTo == 9 && refferedBy == 10){
                      //   // send email to PA
                      //   EmailService.sendEmailToPA(updatedRequest);
                      // }
                      //send reminder for response to PSHMS
                      if(refferedToPSHMS==9){
                        AgendaService.reminderToPSHMS(reminderDateForPSHMS,updatedRequest);
                      }
                      res.send({
                        status: 200,
                        message: sails.config.serverMessage.refferedDataRequestSuccess,
                        updatedRequest,
                      });
                    }
                  }
                );
              }
            }
          );
        } else {
          ValidateService.getValidateMsg(
            validationErrMsgs,
            (getValidateMsgErr, errMsgs) => {
              if (getValidateMsgErr) {
                Logger.error(
                  `DataRequestController.referDataRequest at ValidateService.getValidateMsg ${getValidateMsgErr}`
                );
                res.send({
                  status: 300,
                  message: sails.config.serverMessage.serverError,
                });
              } else {
                Logger.verbose(errMsgs);
                res.send({ status: 422, message: errMsgs });
              }
            }
          );
        }
      });
    },
    //get all data requests
    dataRequests(req,res){
      const pageNo = req.params['pageNo'];
      DataRequestService.getAllDataRequest(pageNo, (err, dataRequestsData, count) => {
        if (err) {
          Logger.error(`DataRequestController.dataRequests ${sails.config.serverMessage.serverError}`)
          res.send({ status: 300, message: sails.config.serverMessage.serverError });
        } else {
          Logger.debug(`DataRequestController.dataRequests at DataRequestService.getAllDataRequest ${dataRequestsData}`)
          res.send({ status: 200, data: dataRequestsData, count, message: 'Data Requests found successfully' });
        }
      });
    },
    approveDataRequestByPSHMS(req,res){
      Logger.debug("DataRequestController.approveDataRequestByPSHMS");
      const docketNo = req.params["docketNo"];
      const user=req.session.user;
      const commentByPSHMSForApproved = req.body.commentByPSHMSForApproved;
      Logger.verbose(docketNo);
      let args = [
        {
          name: "Comment",
          value: commentByPSHMSForApproved,
          validations: [
            {
              validation: "notEmpty",
              message: sails.config.ValidationMessages.commentRequiredValidation,
            },
          ],
        },
        {
          name: "Comment",
          value: commentByPSHMSForApproved,
          validations: [
            {
              validation: "maxLengthString",
              maxLength: 150,
              message: sails.config.ValidationMessages.CommentMaxLength,
            },
          ],
        }
      ];
        
        ValidateService.validate(args,(validationErr, validationErrMsgs)=>{
          if (validationErr) {
            Logger.error(
              `DataRequestController.approveDataRequestByPSHMS at ValidateService.validate ${validationErr}`
            );
            res.send({
              status: 300,
              message: sails.config.serverMessage.serverError,
            });
          } 
          else if(validationErrMsgs.length === 0){
            DataRequestService.updateRequest(
              docketNo,
              { commentByPSHMSForApproved, isApprovedByPSHMS: true },
              (err, updatedRequest) => {
                if (err) {
                  Logger.error(
                    `DataRequestController.approveDataRequestByPSHMS at DataRequestService.updateRequest ${err}`
                  );
                  res.send({
                    status: 300,
                    message: sails.config.serverMessage.serverError,
                  });
                } else {
                  Logger.info("Updated request successfully");
                  Logger.verbose(updatedRequest);
                  // get senior statisticion and send email
                  InternalUser.findActiveByCriteria(
                    { isActive: true, role: 8, isVerified: true },
                    (internalUserErr, seniorStatistician) => {
                      if (internalUserErr) {
                        Logger.error(
                          `DataRequestController.approveDataRequestByPSHMS at InternalUser.findActiveByCriteria ${internalUserErr}`
                        );
                      } else {
                        
                        EmailService.approvedDataByPSHMSToPSHMS(user,updatedRequest);
                        EmailService.approvedDataByPSHMSToSeniorStatisticion(
                          seniorStatistician,
                          updatedRequest
                        );
              
                        res.send({
                          status: 200,
                          message: sails.config.serverMessage.markRequestApproved,
                          updatedRequest,
                        });
                      }
                    }
                  );
                 
                }
              }
            );
          }
          else{
            ValidateService.getValidateMsg(
              validationErrMsgs,
              (getValidateMsgErr, errMsgs) => {
                if (getValidateMsgErr) {
                  Logger.error(
                    `DataRequestController.approveDataRequestByPSHMS at ValidateService.getValidateMsg ${getValidateMsgErr}`
                  );
                  res.send({
                    status: 300,
                    message: sails.config.serverMessage.serverError,
                  });
                } else {
                  Logger.verbose(errMsgs);
                  res.send({ status: 422, message: errMsgs });
                }
              }
            );
          }
        })
    },
    rejectDataRequestByPSHMS(req,res){
      Logger.debug("DataRequestController.rejectDataRequestByPSHMS");
      const docketNo = req.params["docketNo"];
      const user=req.session.user;
      const commentByPSHMSForRejected = req.body.commentByPSHMSForRejected;
      Logger.verbose(docketNo);
      let args = [
        {
          name: "Comment",
          value: commentByPSHMSForRejected,
          validations: [
            {
              validation: "notEmpty",
              message: sails.config.ValidationMessages.commentRequiredValidation,
            },
          ],
        },
        {
          name: "Comment",
          value: commentByPSHMSForRejected,
          validations: [
            {
              validation: "maxLengthString",
              maxLength: 150,
              message: sails.config.ValidationMessages.CommentMaxLength,
            },
          ],
        }
      ];
        
        ValidateService.validate(args,(validationErr, validationErrMsgs)=>{
          if (validationErr) {
            Logger.error(
              `DataRequestController.rejectDataRequestByPSHMS at ValidateService.validate ${validationErr}`
            );
            res.send({
              status: 300,
              message: sails.config.serverMessage.serverError,
            });
          } 
          else if(validationErrMsgs.length === 0){
            DataRequestService.updateRequest(
              docketNo,
              { commentByPSHMSForRejected, isRejectedByPSHMS: true },
              (err, updatedRequest) => {
                if (err) {
                  Logger.error(
                    `DataRequestController.rejectDataRequestByPSHMS at DataRequestService.updateRequest ${err}`
                  );
                  res.send({
                    status: 300,
                    message: sails.config.serverMessage.serverError,
                  });
                } else {
                  Logger.info("Updated request successfully");
                  Logger.verbose(updatedRequest);
                  // get senior statisticion and send email
                  InternalUser.findActiveByCriteria(
                    { isActive: true, role: 8, isVerified: true },
                    (internalUserErr, seniorStatistician) => {
                      if (internalUserErr) {
                        Logger.error(
                          `DataRequestController.rejectDataRequestByPSHMS at InternalUser.findActiveByCriteria ${internalUserErr}`
                        );
                      } else {
                        console.log("PSHMS",req.session.user)
                        EmailService.rejectedDataByPSHMSToPSHMS(user,updatedRequest);
                        EmailService.rejectedDataByPSHMSToSeniorStatisticion(
                          seniorStatistician,
                          updatedRequest
                        );
              
                        res.send({
                          status: 200,
                          message: sails.config.serverMessage.markRequestRejected,
                          updatedRequest,
                        });
                      }
                    }
                  );
                 
                }
              }
            );
          }
          else{
            ValidateService.getValidateMsg(
              validationErrMsgs,
              (getValidateMsgErr, errMsgs) => {
                if (getValidateMsgErr) {
                  Logger.error(
                    `DataRequestController.rejectDataRequestByPSHMS at ValidateService.getValidateMsg ${getValidateMsgErr}`
                  );
                  res.send({
                    status: 300,
                    message: sails.config.serverMessage.serverError,
                  });
                } else {
                  Logger.verbose(errMsgs);
                  res.send({ status: 422, message: errMsgs });
                }
              }
            );
          }
        })

    },
    dataRequestsOfHoRIDAMIT(req,res){
      const pageNo = req.params['pageNo'];
      DataRequestService.getAllDataRequestOfHoRIDAMIT(pageNo, (err, dataRequestsData, count) => {
        if (err) {
          Logger.error(`DataRequestController.dataRequestsOfHoRIDAMIT ${sails.config.serverMessage.serverError}`)
          res.send({ status: 300, message: sails.config.serverMessage.serverError });
        } else {
          Logger.debug(`DataRequestController.dataRequestsOfHoRIDAMIT at DataRequestService.getAllDataRequest ${dataRequestsData}`)
          res.send({ status: 200, data: dataRequestsData, count, message: 'Data Requests found successfully' });
        }
      });
    },
    approveDataRequestByHoRIDAMIT(req,res){
      Logger.debug("DataRequestController.approveDataRequestByHoRIDAMIT");
      const docketNo = req.params["docketNo"];
      const user=req.session.user;
      const commentByHoRIDAMITForApproved = req.body.commentByHoRIDAMITForApproved;
      Logger.verbose(docketNo);
      let args = [
        {
          name: "Comment",
          value: commentByHoRIDAMITForApproved,
          validations: [
            {
              validation: "notEmpty",
              message: sails.config.ValidationMessages.commentRequiredValidation,
            },
          ],
        },
        {
          name: "Comment",
          value: commentByHoRIDAMITForApproved,
          validations: [
            {
              validation: "maxLengthString",
              maxLength: 150,
              message: sails.config.ValidationMessages.CommentMaxLength,
            },
          ],
        }
      ];
        
        ValidateService.validate(args,(validationErr, validationErrMsgs)=>{
          if (validationErr) {
            Logger.error(
              `DataRequestController.approveDataRequestByHoRIDAMIT at ValidateService.validate ${validationErr}`
            );
            res.send({
              status: 300,
              message: sails.config.serverMessage.serverError,
            });
          } 
          else if(validationErrMsgs.length === 0){
            DataRequestService.updateRequest(
              docketNo,
              { commentByHoRIDAMITForApproved, isApprovedByHoRIDAMIT: true },
              (err, updatedRequest) => {
                if (err) {
                  Logger.error(
                    `DataRequestController.approveDataRequestByHoRIDAMIT at DataRequestService.updateRequest ${err}`
                  );
                  res.send({
                    status: 300,
                    message: sails.config.serverMessage.serverError,
                  });
                } else {
                  Logger.info("Updated request successfully");
                  Logger.verbose(updatedRequest);
                  // get senior statisticion and send email
                  InternalUser.findActiveByCriteria(
                    { isActive: true, role: 8, isVerified: true },
                    (internalUserErr, seniorStatistician) => {
                      if (internalUserErr) {
                        Logger.error(
                          `DataRequestController.approveDataRequestByHoRIDAMIT at InternalUser.findActiveByCriteria ${internalUserErr}`
                        );
                      } else {
                        EmailService.approvedDataByHoRIDAMITToHoRIDAMIT(user,updatedRequest);
                        EmailService.approvedDataByHoRIDAMITToSeniorStatisticion(
                          seniorStatistician,
                          updatedRequest
                        );
              
                        res.send({
                          status: 200,
                          message: sails.config.serverMessage.markRequestApproved,
                          updatedRequest,
                        });
                      }
                    }
                  );
                 
                }
              }
            );
          }
          else{
            ValidateService.getValidateMsg(
              validationErrMsgs,
              (getValidateMsgErr, errMsgs) => {
                if (getValidateMsgErr) {
                  Logger.error(
                    `DataRequestController.approveDataRequestByHoRIDAMIT at ValidateService.getValidateMsg ${getValidateMsgErr}`
                  );
                  res.send({
                    status: 300,
                    message: sails.config.serverMessage.serverError,
                  });
                } else {
                  Logger.verbose(errMsgs);
                  res.send({ status: 422, message: errMsgs });
                }
              }
            );
          }
        })

    },
    rejectDataRequestByHoRIDAMIT(req,res){
      Logger.debug("DataRequestController.rejectDataRequestByHoRIDAMIT");
      const docketNo = req.params["docketNo"];
      const user=req.session.user;
      const commentByHoRIDAMITForRejected = req.body.commentByHoRIDAMITForRejected;
      Logger.verbose(docketNo);
      let args = [
        {
          name: "Comment",
          value: commentByHoRIDAMITForRejected,
          validations: [
            {
              validation: "notEmpty",
              message: sails.config.ValidationMessages.commentRequiredValidation,
            },
          ],
        },
        {
          name: "Comment",
          value: commentByHoRIDAMITForRejected,
          validations: [
            {
              validation: "maxLengthString",
              maxLength: 150,
              message: sails.config.ValidationMessages.CommentMaxLength,
            },
          ],
        }
      ];
        
        ValidateService.validate(args,(validationErr, validationErrMsgs)=>{
          if (validationErr) {
            Logger.error(
              `DataRequestController.rejectDataRequestByHoRIDAMIT at ValidateService.validate ${validationErr}`
            );
            res.send({
              status: 300,
              message: sails.config.serverMessage.serverError,
            });
          } 
          else if(validationErrMsgs.length === 0){
            DataRequestService.updateRequest(
              docketNo,
              { commentByHoRIDAMITForRejected, isRejectedByHoRIDAMIT: true },
              (err, updatedRequest) => {
                if (err) {
                  Logger.error(
                    `DataRequestController.rejectDataRequestByHoRIDAMIT at DataRequestService.updateRequest ${err}`
                  );
                  res.send({
                    status: 300,
                    message: sails.config.serverMessage.serverError,
                  });
                } else {
                  Logger.info("Updated request successfully");
                  Logger.verbose(updatedRequest);
                  // get senior statisticion and send email
                  InternalUser.findActiveByCriteria(
                    { isActive: true, role: 8, isVerified: true },
                    (internalUserErr, seniorStatistician) => {
                      if (internalUserErr) {
                        Logger.error(
                          `DataRequestController.rejectDataRequestByHoRIDAMIT at InternalUser.findActiveByCriteria ${internalUserErr}`
                        );
                      } else {
                        EmailService.rejectedDataByHoRIDAMITToHoRIDAMIT(user,updatedRequest);
                        EmailService.rejectedDataByHoRIDAMITToSeniorStatisticion(
                          seniorStatistician,
                          updatedRequest
                        );
              
                        res.send({
                          status: 200,
                          message: sails.config.serverMessage.markRequestRejected,
                          updatedRequest,
                        });
                      }
                    }
                  );
                 
                }
              }
            );
          }
          else{
            ValidateService.getValidateMsg(
              validationErrMsgs,
              (getValidateMsgErr, errMsgs) => {
                if (getValidateMsgErr) {
                  Logger.error(
                    `DataRequestController.rejectDataRequestByPSHMS at ValidateService.getValidateMsg ${getValidateMsgErr}`
                  );
                  res.send({
                    status: 300,
                    message: sails.config.serverMessage.serverError,
                  });
                } else {
                  Logger.verbose(errMsgs);
                  res.send({ status: 422, message: errMsgs });
                }
              }
            );
          }
        })

    },

    dataRequestsOfPSHMS(req,res){
      const pageNo = req.params['pageNo'];
      DataRequestService.getAllDataRequestOfPSHMS(pageNo, (err, dataRequestsData, count) => {
        if (err) {
          Logger.error(`DataRequestController.dataRequestsOfPSHMS ${sails.config.serverMessage.serverError}`)
          res.send({ status: 300, message: sails.config.serverMessage.serverError });
        } else {
          Logger.debug(`DataRequestController.dataRequestsOfPSHMS at DataRequestService.getAllDataRequest ${dataRequestsData}`)
          res.send({ status: 200, data: dataRequestsData, count, message: 'Data Requests found successfully' });
        }
      });
    },
    currentMonthReportToSeniorStatician(req,res){
      Logger.debug(`DataRequestController.generateReportOfDataRequest`)
      var date = new Date();
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1);
      console.log("first date",firstDay)
      console.log("last date",lastDay)
      DataRequestService.generateReport(firstDay,lastDay,(err,results)=>{
        if (err) {
          Logger.error(`DataRequestController.generateReportOfDataRequest ${sails.config.serverMessage.serverError}`)
          res.send({ status: 300, message: sails.config.serverMessage.serverError });
        } else {
          Logger.debug(`DataRequestController.generateReportOfDataRequest at DataRequestService.generateReport ${results}`)
          res.send({ status: 200, data: results, message: 'Data Requests found successfully' });
        }
      })
    },
    generateReportMonthlyToSeniorStatician(req,res){
      Logger.debug(`DataRequestController.generateReportMonthlyToSeniorStatician`)
      var startDate=new Date(req.body.startDate);
      var endDate=new Date(req.body.endDate)
      var endDate1=new Date(endDate.getFullYear(),endDate.getMonth(),endDate.getDate()+1);
      
      console.log("end date",endDate)
      console.log("end date before change",endDate1)
      if(startDate>endDate){
        res.send({ status: 300, message: 'End date should be greator than start date' });
      }
      else{
        DataRequestService.generateMothlyReport(startDate,endDate,endDate1,(err,results)=>{
          if (err) {
            Logger.error(`DataRequestController.generateReportMonthlyToSeniorStatician ${sails.config.serverMessage.serverError}`)
            res.send({ status: 300, message: sails.config.serverMessage.serverError });
          } else {
            Logger.debug(`DataRequestController.generateReportMonthlyToSeniorStatician at DataRequestService.generateMothlyReport ${results}`)
            res.send({ status: 200, data: results, message: 'Data requests found successfully' });
          }
        })
      }
        
    
    },
    generateReportYearlyToSeniorStatician(req,res){
      Logger.debug(`DataRequestController.generateReportYearlyToSeniorStatician`)
      var startDate=new Date(req.body.startDate);
      var endDate=new Date(req.body.endDate)
      var lastDay = new Date(endDate.getFullYear(), endDate.getMonth() , endDate.getDate()+1);
      let diffYears=endDate.getFullYear()-startDate.getFullYear()
      console.log("differnce in years",diffYears)
      if(diffYears >11){
        res.send({ status: 300, message: 'Selected date should not exceed more than 12 years' });
      }
      else{
        DataRequestService.generateYearlyReport(startDate,lastDay,(err,results)=>{
          if (err) {
            Logger.error(`DataRequestController.generateReportYearlyToSeniorStatician ${sails.config.serverMessage.serverError}`)
            res.send({ status: 300, message: sails.config.serverMessage.serverError });
          } else {
            Logger.debug(`DataRequestController.generateReportYearlyToSeniorStatician at DataRequestService.generateMothlyReport ${results}`)
            res.send({ status: 200, data: results, message: 'Data requests found successfully' });
          }
        })
    
      }
       
    },
    viewDataRequest(req,res){
      const docketNo = req.params['docketNo'];
      DataRequestService.getDataRequest(docketNo, (err, dataRequestData) => {
        if (err) {
          Logger.error(`DataRequestController.viewDataRequest ${sails.config.serverMessage.serverError}`)
          res.send({ status: 300, message: sails.config.serverMessage.serverError });
        } else {
          Logger.debug(`DataRequestController.viewDataRequest at DataRequestService.getDataRequest`)
          res.send({ status: 200, data: dataRequestData, message: 'Data Request found successfully' });
        }
      });
    },
    sortAllResearch(req,res){
      Logger.debug("ApplicationController.sortAllResearch");
      const pageNo = req.params["pageNo"];
      const sort=parseInt(req.params["sort"])
      ApplicationService.sortAllResearch(
        pageNo,sort,
        (error, researchData, total) => {
          if (error) {
            res.send({
              status: 300,
              message: sails.config.serverMessage.serverError,
            });
          } else {
            res.send({ status: 200, researchData, total });
          }
        }
      );
    }
  };
  
  
