const ObjectId = require("mongodb").ObjectID;
const path = require("path");
const uuidv1 = require("uuid/v1");

module.exports = {
  uploadApplicationDocument(req, res) {
    Logger.debug("ApplicationController.uploadApplicationDocument");
    const proposalId = req.body.proposalId;
    if (!proposalId) {
      Logger.warn("Proposal id not found");
      res.send({
        status: 300,
        message: sails.config.serverMessage.serverError,
      });
    } else {
      req.file("file").upload(
        {
          dirname: path.resolve(`files/ApplicationDocuments/${proposalId}`),
          // saveAs: req.body.fileName,
        },
        (uploadErr, files) => {
          if (uploadErr) {
            Logger.error(
              `ApplicationController.uploadApplicationDocument at req.file ${uploadErr}`
            );
            res.send({
              status: 300,
              message: sails.config.serverMessage.serverError,
            });
          } else if (files.length === 0) {
            Logger.warn("Document not found");
            res.send({ status: 300, message: "Document not found" });
          } else {
            const file = files[0];
            Logger.debug("file*****************888");
            Logger.debug(file);
            const fileLocArray = file ? file.fd.split("/") : [];
            const fileLoc = fileLocArray[fileLocArray.length - 1];
            const uploadFile = {
              uid: fileLoc,
              size: file.size,
              type: file.type,
              name: file.filename,
              url: `/ApplicationDocuments/${proposalId}/${fileLoc}`,
              status: "done",
            };
            Logger.verbose(uploadFile);
            const proposalData = {};
            proposalData[req.body.fileName] = uploadFile;
            ApplicationService.updateProposal(
              proposalId,
              proposalData,
              null,
              (err, updatedProposal) => {
                if (err) {
                  res.send({
                    status: 300,
                    message: sails.config.serverMessage.serverError,
                  });
                } else {
                  res.send({
                    status: 200,
                    message: sails.config.serverMessage.uploadFileSuccess,
                    proposalData: updatedProposal,
                  });
                }
              }
            );
          }
        }
      );
    }
  },

  getInvestigatorProposals(req, res) {
    Logger.debug("ApplicationController.getInvestigatorProposals");
    const investigatorId = new ObjectId(req.session.user.id);
    Logger.verbose(investigatorId);
    if (!investigatorId) {
      res.send({
        status: 300,
        message: sails.config.serverMessage.serverError,
      });
    } else {
      ApplicationService.getInvestigatorProposals(
        investigatorId,
        (err, proposalData) => {
          if (err) {
            res.send({
              status: 300,
              message: sails.config.serverMessage.serverError,
            });
          } else {
            res.send({ status: 200, proposalData });
          }
        }
      );
    }
  },

  saveProposal(req, res) {
    Logger.debug("ApplicationController.saveProposal");
    const proposalData = req.body.data;

    if (proposalData.startDate) {
      proposalData.startDate = new Date(proposalData.startDate);
    }
    if (proposalData.endDate) {
      proposalData.endDate = new Date(proposalData.endDate);
    }
    proposalData.investigatorId = new ObjectId(req.session.user.id);

    Logger.verbose("proposalData in application controller");
    Logger.verbose(proposalData);
    if (proposalData.proposalId) {
      const proposalId = proposalData.proposalId;
      ApplicationService.updateProposal(
        proposalId,
        proposalData,
        null,
        (err, updatedProposal) => {
          if (err) {
            Logger.error("ApplicationService.updateProposal", err);
            if (err === "Not Present") {
              res.send({
                status: 300,
                message: sails.config.serverMessage.proposalIdNotpresent,
              });
            } else {
              res.send({
                status: 300,
                message: sails.config.serverMessage.serverError,
              });
            }
          } else {
            res.send({
              status: 200,
              message: sails.config.serverMessage.proposalUpdateSuccess,
              proposalData: updatedProposal,
            });
          }
        }
      );
    } else {
      
      let proposalId;
      if (new Date().getMonth() + 1 > 0 && new Date().getMonth() + 1 <= 9)
        proposalId = `P-00001-0${
          new Date().getMonth() + 1
        }-${new Date().getFullYear()}`;
      else
        proposalId = `P-00001-${
          new Date().getMonth() + 1
        }-${new Date().getFullYear()}`;

      Logger.debug("hard coded proposalId");
      Logger.debug(proposalId);

      let regExpToSearch = `${
        new Date().getMonth() + 1
      }-${new Date().getFullYear()}`;

      console.log("regExpToSearch", regExpToSearch);

      Application.findAllApplicationWithInvestigator(
        { proposalId: { $regex: regExpToSearch } },
        (err, proposalsArr) => {
          if (err) {
            res.send({
              status: 300,
              message: sails.config.serverMessage.serverError,
            });
          } else {
            Logger.debug("found proposal data in save proposal method");
            Logger.verbose(proposalsArr);
            let splittedProposalId = proposalId.split("-");
            console.log("splittedProposalId", splittedProposalId);
            if (proposalsArr.length === 0) {
              Logger.debug("found proposal length 0");
              proposalId = `P-0000${parseInt(splittedProposalId[1])}-${
                splittedProposalId[2]
              }-${splittedProposalId[3]}`;
            }
            else {
              proposalsArr.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
              }); //ascending sort
              Logger.debug("sortedArr for proposal");
              Logger.verbose(proposalsArr);
              let splittedArr = proposalsArr[0].proposalId.split("-"); //[P, 00001, 08, 2021]
              Logger.debug("splittedArr");
              Logger.verbose(splittedArr);
              if (splittedArr[1] < '00009')
              {
                Logger.debug('proposal less than 9',splittedArr[1]);
                proposalId = `P-0000${parseInt(splittedArr[1]) + 1}-${splittedArr[2]}-${splittedArr[3]}`;
              }
              else if (splittedArr[1] >= '00009' && splittedArr[1] <'00099') {
                Logger.debug('proposals between 10 to 99',splittedArr[1])
                proposalId = `P-000${parseInt(splittedArr[1]) + 1}-${splittedArr[2]}-${splittedArr[3]}`;
              }
              else if (splittedArr[1] >= '00099' && splittedArr[1] < '00999') {
                Logger.debug('proposals between 100 to 999',splittedArr[1])
                proposalId = `P-00${parseInt(splittedArr[1]) + 1}-${splittedArr[2]}-${splittedArr[3]}`;
              }
              else if (splittedArr[1] >= '00999' && splittedArr[1] <= '09999') {
                Logger.debug('proposals between 1000 to 9999',splittedArr[1])
                proposalId = `P-0${parseInt(splittedArr[1]) + 1}-${splittedArr[2]}-${splittedArr[3]}`;
              }
              else if (splittedArr[1] >= '09999' && splittedArr[1] < '99999') {
                Logger.debug('proposals between 10000 to 99999',splittedArr[1])
                proposalId = `P-0${parseInt(splittedArr[1]) + 1}-${splittedArr[2]}-${splittedArr[3]}`;
              }
              
            }
            proposalData.proposalId = proposalId;
            Logger.debug("proposalId outer scope");
            Logger.verbose(proposalId);
            proposalData.isSubmitted = false;
            ApplicationService.saveProposal(
              proposalData,
              (error, savedProposal) => {
                if (error) {
                  res.send({
                    status: 300,
                    message: sails.config.serverMessage.serverError,
                  });
                } else {
                  res.send({
                    status: 200,
                    message: sails.config.serverMessage.proposalSavedSuccess,
                    proposalData: savedProposal,
                  });
                }
              }
            );
          }
        }
      );
    }
  },

  deleteProposal(req, res) {
    Logger.debug("ApplicationController.deleteProposal");
    const proposalId = req.body.proposalId;
    Logger.verbose(proposalId);
    ApplicationService.updateProposal(
      proposalId,
      { isActive: false },
      null,
      (err) => {
        if (err) {
          res.send({
            status: 300,
            message: sails.config.serverMessage.serverError,
          });
        } else {
          res.send({
            status: 200,
            message: sails.config.serverMessage.proposalDeleteSuccess,
          });
        }
      }
    );
  },

  getProposal(req, res) {
    Logger.debug("ApplicationController.getProposal");
    const proposalId = req.body.proposalId;
    const investigatorId = req.session.user
      ? new ObjectId(req.session.user.id)
      : new ObjectId(req.body.investigatorId);
    Logger.verbose(proposalId);
    if (!proposalId) {
      res.send({
        status: 300,
        message: sails.config.serverMessage.serverError,
      });
    } else {
      ApplicationService.getProposal(
        proposalId,
        investigatorId,
        (err, proposalData) => {
          if (err) {
            if (err === "Proposal Not of this user") {
              res.send({
                status: 300,
                message: sails.config.serverMessage.invalidURL,
                notUserProposal: "notUserProposal",
              });
            } else {
              res.send({
                status: 300,
                message: sails.config.serverMessage.serverError,
              });
            }
          } else {
            res.send({ status: 200, proposalData });
          }
        }
      );
    }
  },

  getProposalForView(req, res) {
    Logger.debug("ApplicationController.getProposalForView");
    const proposalId = req.body.proposalId;
    const investigatorId = req.session.user
      ? new ObjectId(req.session.user.id)
      : new ObjectId(req.body.investigatorId);
    Logger.verbose(proposalId);
    if (!proposalId) {
      res.send({
        status: 300,
        message: sails.config.serverMessage.serverError,
      });
    } else {
      ApplicationService.getProposalForView(
        proposalId,
        investigatorId,
        (err, proposalData) => {
          if (err) {
            if (err === "Proposal Not of this user") {
              res.send({
                status: 300,
                message: sails.config.serverMessage.invalidURL,
                notUserProposal: "notUserProposal",
              });
            } else {
              res.send({
                status: 300,
                message: sails.config.serverMessage.serverError,
              });
            }
          } else {
            console.log("in controller else", proposalData);

            res.send({ status: 200, proposalData });
          }
        }
      );
    }
  },

  getResearchForView(req, res) {
    Logger.debug("ApplicationController.getProposalForView");
    const proposalId = req.body.proposalId;
    const investigatorId = req.session.user
      ? new ObjectId(req.session.user.id)
      : new ObjectId(req.body.investigatorId);
    Logger.verbose(proposalId);
    if (!proposalId) {
      res.send({
        status: 300,
        message: sails.config.serverMessage.serverError,
      });
    } else {
      ApplicationService.getResearchForView(
        proposalId,
        investigatorId,
        (err, proposalData) => {
          if (err) {
            if (err === "Research is Not of this user") {
              res.send({
                status: 300,
                message: sails.config.serverMessage.invalidURL,
                notUserProposal: "notUserProposal",
              });
            } else {
              res.send({
                status: 300,
                message: sails.config.serverMessage.serverError,
              });
            }
          } else {
            console.log("in controller else", proposalData);

            res.send({ status: 200, proposalData });
          }
        }
      );
    }
  },
  getResearchForViewWithAuth(req, res) {
    Logger.debug("ApplicationController.getResearchForViewWithAuth");
    const proposalId = req.body.proposalId;
    const investigatorId = req.session.user
      ? new ObjectId(req.session.user.id)
      : new ObjectId(req.body.investigatorId);
    Logger.verbose(proposalId);
    if (!proposalId) {
      res.send({
        status: 300,
        message: sails.config.serverMessage.serverError,
      });
    } else {
      ApplicationService.getResearchForView(
        proposalId,
        investigatorId,
        (err, proposalData) => {
          if (err) {
            if (err === "Research is Not of this user") {
              res.send({
                status: 300,
                message: sails.config.serverMessage.invalidURL,
                notUserProposal: "notUserProposal",
              });
            } else {
              res.send({
                status: 300,
                message: sails.config.serverMessage.serverError,
              });
            }
          } else {
            res.send({ status: 200, proposalData });
          }
        }
      );
    }
  },

  submitProposal(req, res) {
    Logger.debug("ApplicationController.submitProposal");
    const proposalData = req.body.data;

    const args = [
      {
        name: "Title",
        value: proposalData.title,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.titleRequiredValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 100,
            message: sails.config.ValidationMessages.titleMaxValidation,
          },
          {
            validation: "string",
            message: sails.config.ValidationMessages.titleStringValidation,
          },
        ],
      },
      {
        name: "Background",
        value: proposalData.background,
        validations: [
          {
            validation: "notEmpty",
            message:
              sails.config.ValidationMessages.backgroundRequiredValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 200,
            message: sails.config.ValidationMessages.backgroundMaxValidation,
          },
          {
            validation: "string",
            message: sails.config.ValidationMessages.backgroundStringValidation,
          },
        ],
      },
      {
        name: "Objectives",
        value: proposalData.objectives,
        validations: [
          {
            validation: "notEmpty",
            message:
              sails.config.ValidationMessages.objectiveRequiredValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 300,
            message: sails.config.ValidationMessages.objectiveMaxValidation,
          },
          {
            validation: "string",
            message: sails.config.ValidationMessages.objectiveStringValidation,
          },
        ],
      },
      {
        name: "Study methods",
        value: proposalData.studyMethods,
        validations: [
          {
            validation: "notEmpty",
            message:
              sails.config.ValidationMessages.studyMethodsRequiredValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 300,
            message: sails.config.ValidationMessages.studyMethodsMaxValidation,
          },
          {
            validation: "string",
            message:
              sails.config.ValidationMessages.studyMethodsStringValidation,
          },
        ],
      },
      {
        name: "Expected outcomes and use of results",
        value: proposalData.expectedOutcomes,
        validations: [
          {
            validation: "notEmpty",
            message:
              sails.config.ValidationMessages.expectedOutcomeRequiredValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 200,
            message:
              sails.config.ValidationMessages.expectedOutcomeMaxValidation,
          },
          {
            validation: "string",
            message:
              sails.config.ValidationMessages.expectedOutcomeStringValidation,
          },
        ],
      },
      {
        name: "Keywords",
        value: proposalData.keywords,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.keywordRequiredValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 100,
            message: sails.config.ValidationMessages.keywordMaxValidation,
          },
          {
            validation: "string",
            message: sails.config.ValidationMessages.keywordStringValidation,
          },
        ],
      },
      {
        name: "Student research",
        value: proposalData.studentResearch,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.studentResearchValidation,
          },
          {
            validation: "boolean",
            message: sails.config.ValidationMessages.booleanValidation,
          },
        ],
      },
      {
        name: "Start date",
        value: proposalData.startDate,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.startDateValidation,
          },
        ],
      },
      {
        name: "End date",
        value: proposalData.endDate,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.endDateValidation,
          },
        ],
      },
      {
        name: "Key implementing institution",
        value: proposalData.keyInstitution,
        validations: [
          {
            validation: "notEmpty",
            message:
              sails.config.ValidationMessages.keyImplementationValidation,
          },
        ],
      },
      {
        name: "Multi-country research",
        value: proposalData.multiCountryResearch,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.multiCountryValidation,
          },
          {
            validation: "boolean",
            message: sails.config.ValidationMessages.booleanValidation,
          },
        ],
      },
      {
        name: "Nation-wide research",
        value: proposalData.nationWideResearch,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.nationWideValidation,
          },
        ],
      },
      {
        name: "Research domain(s)",
        value: proposalData.researchDomain,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.researchDomainValidation,
          },
        ],
      },
      {
        name: "Research field(s)",
        value: proposalData.researchField,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.researchFieldValidation,
          },
        ],
      },
      proposalData.researchField && proposalData.researchField === "Other"?
      {
        name: "Other research field(s)",
        value: proposalData.otherResearchForm,
        validations: [
          {
            validation: "notEmpty",
            message:
              sails.config.ValidationMessages.otherResearchFormValidation,
          },
          {
            validation: "maxLengthString",
            maxLength: 100,
            message:
              sails.config.ValidationMessages.otherResearchFormMaxValidation,
          },
          {
            validation: "string",
            message:
              sails.config.ValidationMessages.otherResearchStringValidation,
          },
        ],
      }: {
        name: "Other research field(s)",
        value: proposalData.otherResearchForm,
        validations: [
          // {
          //   validation: "maxLengthString",
          //   maxLength: 100,
          //   message:
          //     sails.config.ValidationMessages.otherResearchFormMaxValidation,
          // },
          // {
          //   validation: "string",
          //   message:
          //     sails.config.ValidationMessages.otherResearchStringValidation,
          // },
        ],
      },
      {
        name: "Involves human subjects",
        value: proposalData.humanSubjects,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.humanSubjectValidation,
          },
          {
            validation: "boolean",
            message: sails.config.ValidationMessages.booleanValidation,
          },
        ],
      },
      {
        name: "Data collection",
        value: proposalData.dataCollection,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.dataCollectionValidation,
          },
        ],
      },
      {
        name: "Proposal reviewed by other committee",
        value: proposalData.otherCommitte,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.otherCommitteeRequired,
          },
          {
            validation: "boolean",
            message: sails.config.ValidationMessages.booleanValidation,
          },
        ],
      },
      {
        name: "Source",
        value: proposalData.source,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.sourceValidation,
          },
        ],
      },
      {
        name: "Amount",
        value: proposalData.amount,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.amountValidation,
          },
        ],
      },

      {
        name: "Whose identity may be revealed during the research process?",
        value: proposalData.identity,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.fieldRequiredValidation,
          },
          {
            validation: "boolean",
            message: sails.config.ValidationMessages.booleanValidation,
          },
        ],
      },
      {
        name: "Under 18 years old?",
        value: proposalData.age,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.fieldRequiredValidation,
          },
          {
            validation: "boolean",
            message: sails.config.ValidationMessages.booleanValidation,
          },
        ],
      },
      {
        name: "In a dependent relationship with any of the research team members?",
        value: proposalData.dependentRelation,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.fieldRequiredValidation,
          },
          {
            validation: "boolean",
            message: sails.config.ValidationMessages.booleanValidation,
          },
        ],
      },
      {
        name: "From an ethnic minority group?",
        value: proposalData.minorityGroup,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.fieldRequiredValidation,
          },
          {
            validation: "boolean",
            message: sails.config.ValidationMessages.booleanValidation,
          },
        ],
      },
      {
        name: "With intellectual or mental impairment?",
        value: proposalData.mentalImpairment,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.fieldRequiredValidation,
          },
          {
            validation: "boolean",
            message: sails.config.ValidationMessages.booleanValidation,
          },
        ],
      },
      {
        name: "Who are pregnant?",
        value: proposalData.pregnant,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.fieldRequiredValidation,
          },
          {
            validation: "boolean",
            message: sails.config.ValidationMessages.booleanValidation,
          },
        ],
      },
      {
        name: "A new treatment, medical procedure or test?",
        value: proposalData.anyTest,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.fieldRequiredValidation,
          },
          {
            validation: "boolean",
            message: sails.config.ValidationMessages.booleanValidation,
          },
        ],
      },
      {
        name: "Collection of biological samples including tissue extraction?",
        value: proposalData.biologicalSamples,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.fieldRequiredValidation,
          },
          {
            validation: "boolean",
            message: sails.config.ValidationMessages.booleanValidation,
          },
        ],
      },
      {
        name: "Use of ionizing radiation?",
        value: proposalData.ionizationRadiation,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.fieldRequiredValidation,
          },
          {
            validation: "boolean",
            message: sails.config.ValidationMessages.booleanValidation,
          },
        ],
      },
      {
        name: "Pain or psychological distress?",
        value: proposalData.distress,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.fieldRequiredValidation,
          },
          {
            validation: "boolean",
            message: sails.config.ValidationMessages.booleanValidation,
          },
        ],
      },
      {
        name: "Inducements?",
        value: proposalData.inducements,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.fieldRequiredValidation,
          },
          {
            validation: "boolean",
            message: sails.config.ValidationMessages.booleanValidation,
          },
        ],
      },
      {
        name: "Collection of sensitive information?",
        value: proposalData.sensitiveInfo,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.fieldRequiredValidation,
          },
          {
            validation: "boolean",
            message: sails.config.ValidationMessages.booleanValidation,
          },
        ],
      },
      {
        name: "Assisted reproductive technology?",
        value: proposalData.humanGenetic,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.fieldRequiredValidation,
          },
          {
            validation: "boolean",
            message: sails.config.ValidationMessages.booleanValidation,
          },
        ],
      },
      {
        name: "Human genetic or genomic studies?",
        value: proposalData.reproductiveTech,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.fieldRequiredValidation,
          },
          {
            validation: "boolean",
            message: sails.config.ValidationMessages.booleanValidation,
          },
        ],
      },
      {
        name: "Stem cell research?",
        value: proposalData.stemCell,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.fieldRequiredValidation,
          },
          {
            validation: "boolean",
            message: sails.config.ValidationMessages.booleanValidation,
          },
        ],
      },
      {
        name: "Biosafety issue?",
        value: proposalData.biosafeIssue,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.fieldRequiredValidation,
          },
          {
            validation: "boolean",
            message: sails.config.ValidationMessages.booleanValidation,
          },
        ],
      },
      {
        name: "Level of the risk involved in research",
        value: proposalData.levelRisk,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.riskInvolvedValidation,
          },
        ],
      },
      {
        name: "Benefits from the research project",
        value: proposalData.benefits,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.benifitsFromValidation,
          },
        ],
      },
      {
        name: "Multi-institution project",
        value: proposalData.multiInistitution,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.fieldRequiredValidation,
          },
          {
            validation: "boolean",
            message: sails.config.ValidationMessages.booleanValidation,
          },
        ],
      },
      {
        name: "Conflict of interest",
        value: proposalData.conflict,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.fieldRequiredValidation,
          },
        ],
      },
    ];
    ValidateService.validate(args, (validationErr, validationErrMsgs) => {
      if (validationErr) {
        Logger.error(
          `ApplicationController.submitProposal at ValidateService.validate ${validationErr}`
        );
        res.send({
          status: 300,
          message: sails.config.serverMessage.serverError,
        });
      } else if (validationErrMsgs.length === 0) {
        proposalData.investigatorId = new ObjectId(req.session.user.id);
        Logger.verbose(proposalData);
        if (proposalData.proposalId) {
          const proposalId = proposalData.proposalId;
          ApplicationService.updateProposal(
            proposalId,
            proposalData,
            null,
            (err, updatedProposal) => {
              if (err) {
                console.log(err);
                Logger.error(
                  `ApplicationController.submitProposal at ApplicationService.updateProposal ${err}`
                );
                res.send({
                  status: 300,
                  message: sails.config.serverMessage.serverError,
                });
              } else {
                Logger.verbose(updatedProposal);
                const proposal = updatedProposal[0];
                if (proposal) {
                  ApplicationService.updateProposal(
                    proposalId,
                    { isSubmitted: true },
                    { date: new Date(), status: "Proposal Submitted" },
                    (updateProposalErr, updatedProposalData) => {
                      if (updateProposalErr) {
                        console.log("updateProposalErr");
                        console.log(updateProposalErr);
                        Logger.error(
                          `ApplicationController.submitProposal at ApplicationService.updateProposal ${updateProposalErr}`
                        );
                        res.send({
                          status: 300,
                          message: sails.config.serverMessage.serverError,
                        });
                      } else {
                        console.log("sending email");

                        EmailService.submitProposalEmailToInvestigator(
                          req.session.user,
                          updatedProposalData[0]
                        );
                        InternalUser.findActiveByCriteria(
                          { isActive: true, role: 2, isVerified: true },
                          (findError, coordinator) => {
                            if (findError) {
                              Logger.error(
                                `ApplicationController.submitProposal at InternalUser.findActiveByCriteria ${findError}`
                              );
                            } else {
                              if (coordinator !== undefined) {
                                EmailService.submitProposalEmailToCoordinator(
                                  coordinator,
                                  updatedProposalData[0]
                                );
                              }
                              res.send({
                                status: 200,
                                message:
                                  sails.config.serverMessage
                                    .proposalSavedSuccess,
                                proposalData: updatedProposalData,
                              });
                            }
                          }
                        );
                      }
                    }
                  );
                } else {
                  Logger.error(
                    "ApplicationController.submitProposal at ApplicationService.updateProposal"
                  );
                  res.send({
                    status: 300,
                    message: sails.config.serverMessage.serverError,
                  });
                }
              }
            }
          );
        } else {
          res.send({
            status: 300,
            message: sails.config.serverMessage.serverError,
          });
        }
      } else {
        Logger.verbose("validation error");
        Logger.verbose({ status: 422, validationErrArr: validationErrMsgs });
        res.send({ status: 422, validationErrArr: validationErrMsgs });
      }
    });
  },

  getAllProposal(req, res) {
    Logger.debug("ApplicationController.getAllProposal");

    ApplicationService.getAllProposal((err, proposalData) => {
      if (err) {
        res.send({
          status: 300,
          message: sails.config.serverMessage.serverError,
        });
      } else {
        console.log("application controller data", proposalData);
        res.send({ status: 200, proposalData });
      }   
    });
  },

  markIncompleteProposal(req, res) {
    Logger.debug("ApplicationController.markIncompleteProposal");
    const proposalId = req.body.proposalId;
    const commentForMarkInComplete = req.body.commentForMarkInComplete;
    Logger.verbose(proposalId);
    ApplicationService.updateProposal(
      proposalId,
      { isSubmitted: false, commentForMarkInComplete },
      { date: new Date(), status: "Mark Incomplete" },
      (err, updatedProposal) => {
        if (err) {
          res.send({
            status: 300,
            message: sails.config.serverMessage.serverError,
          });
        } else {
          console.log("updatedProposal in mark incomplete", updatedProposal);
          EmailService.markIncompleteProposalEmailToCoordinator(
            req.session.user,
            updatedProposal[0]
          );
          Investigator.findActiveById(
            updatedProposal[0].investigatorId.toString(),
            (findActiveByIdErr, investigator) => {
              if (findActiveByIdErr) {
                Logger.warn(findActiveByIdErr);
                res.send({
                  status: 300,
                  message: sails.config.serverMessage.serverError,
                });
              } else {
                // eslint-disable-next-line no-underscore-dangle
                updatedProposal[0]._id = new ObjectId(updatedProposal[0].id);
                EmailService.markIncompleteProposalEmailToInvestigator(
                  investigator,
                  updatedProposal[0]
                );
                res.send({
                  status: 200,
                  proposalData: updatedProposal,
                  message: sails.config.serverMessage.proposalIncomplete,
                });
              }
            }
          );
        }
      }
    );
  },

  markCompleteProposal(req, res) {
    Logger.debug("ApplicationController.markCompleteProposal");
    Logger.debug(req.body);
    const proposalId = req.body.proposalId;
    const commentForMarkComplete = req.body.commentForMarkComplete;
    console.log("commentForMarkComplete", commentForMarkComplete);
    Logger.verbose(proposalId);
    ApplicationService.updateProposal(
      proposalId,
      { isComplete: true, commentForMarkComplete },
      { date: new Date(), status: "Mark Complete" },
      (err, updatedProposal) => {
        if (err) {
          res.send({
            status: 300,
            message: sails.config.serverMessage.serverError,
          });
        } else {
          console.log("mark complete", updatedProposal);
          EmailService.markCompleteProposalEmailToCoordinator(
            req.session.user,
            updatedProposal[0]
          );
          Investigator.findActiveById(
            updatedProposal[0].investigatorId.toString(),
            (findActiveByIdErr, investigator) => {
              if (findActiveByIdErr) {
                Logger.warn(findActiveByIdErr);
                res.send({
                  status: 300,
                  message: sails.config.serverMessage.serverError,
                });
              } else {
                // eslint-disable-next-line no-underscore-dangle
                updatedProposal[0]._id = new ObjectId(updatedProposal[0].id);
                EmailService.markCompleteProposalEmailToInvestigator(
                  investigator,
                  updatedProposal[0]
                );
                res.send({
                  status: 200,
                  proposalData: updatedProposal[0],
                  message: sails.config.serverMessage.proposalComplete,
                });
              }
            }
          );
        }
      }
    );
  },

  assignReviewType(req, res) {
    Logger.debug("ApplicationController.assignReviewType");
    const proposalId = req.body.proposalId;
    let fullReviewEndDate, fullReviewEndDateReminder;
    let reviewType;
    let reviewName;
    if (req.body.reviewType === "exemptedReview") {
      reviewType = sails.config.reviewTypeMapping.Exempted_Review;
      reviewName = "Exempted";
    } else if (req.body.reviewType === "fullReview") {
      reviewName = "Full Review";
      fullReviewEndDate = new Date();
      fullReviewEndDateReminder = new Date();
      fullReviewEndDateReminder.setDate(fullReviewEndDate.getDate() + 25);
      fullReviewEndDate.setDate(fullReviewEndDate.getDate() + 30);

      Logger.verbose("fullReviewEndDate");
      Logger.verbose(fullReviewEndDate);
      reviewType = sails.config.reviewTypeMapping.Full_Review;
    }
    Logger.verbose("req.body.reviewType");
    Logger.verbose(proposalId);
    Logger.verbose(reviewType);

    ApplicationService.updateProposal(
      proposalId,
      reviewType === 2
        ? { reviewType, isUnderReview: true, fullReviewEndDate }
        : { reviewType, isUnderReview: true },
      { date: new Date(), status: "Under Review - " + reviewName },
      (err, updatedProposal) => {
        if (err) {
          Logger.error(
            `ApplicationController.assignReviewType at ApplicationService.updateProposal ${err}`
          );
          return res.send({
            status: 300,
            message: sails.config.serverMessage.serverError,
          });
        } else {
          Logger.debug("updated proposal data");
          Logger.verbose(updatedProposal[0]);
          if (updatedProposal[0].reviewType === 0) {
            Logger.info("its for exempted review process", req.session.user);
            EmailService.AssignedForExemptedReviewToCoordinator(
              req.session.user,
              updatedProposal[0]
            );

            InternalUserService.getChair((error, chairData) => {
              if (error) {
                Logger.error(
                  `ApplicationController.assignReviewType at InternalUserService.getChair ${error}`
                );
                res.send({ status: 300, message: error.message });
              } else {
                console.log("chair data", chairData[0]);
                EmailService.AssignedForExemptedReviewToChair(
                  chairData[0],
                  updatedProposal[0]
                );
              }
            });
            let investigatorId = updatedProposal[0].investigatorId.toString();
            Logger.debug("investigator Id in find investigator");
            Logger.verbose(investigatorId);
            InvestigatorService.getInvestigator(
              investigatorId,
              (error, investigatorData) => {
                if (error) {
                  Logger.error(
                    `ApplicationController.assignReviewType at InvestigatorService.getInvestigator ${error}`
                  );
                  res.send({ status: 300, message: error.message });
                } else {
                  console.log("investigator data", investigatorData);
                  EmailService.AssignedForReviewToInvestigator(
                    investigatorData,
                    updatedProposal[0]
                  );
                }
              }
            );
          } else if (updatedProposal[0].reviewType === 2) {
            Logger.info("its for full review process", req.session.user);
            EmailService.AssignedForFullReviewToCoordinator(
              req.session.user,
              updatedProposal[0]
            );

            let investigatorId = updatedProposal[0].investigatorId.toString();
            Logger.debug("investigator Id in find investigator");
            Logger.verbose(investigatorId);
            InvestigatorService.getInvestigator(
              investigatorId,
              (error, investigatorData) => {
                if (error) {
                  Logger.error(
                    `ApplicationController.assignReviewType at InvestigatorService.getInvestigator ${error}`
                  );
                  res.send({ status: 300, message: error.message });
                } else {
                  Logger.debug("investigator data");
                  Logger.info(investigatorData);
                  EmailService.AssignedForReviewToInvestigator(
                    investigatorData,
                    updatedProposal[0]
                  );
                }
              }
            );
            InternalUserService.getAllCommitteeMember(
              (getErr, committeeMembers) => {
                if (getErr) {
                  Logger.error(
                    `ApplicationController.assignReviewType at InternalUserService.getAllCommitteeMember ${getErr}`
                  );
                  res.send({ status: 300, message: getErr.message });
                } else {
                  console.log("committeeMembers", committeeMembers);
                  EmailService.AssignedForFullReviewToReviewer(
                    committeeMembers,
                    updatedProposal[0]
                  );
                }
              }
            );

            updatedProposal[0]._id = new ObjectId(updatedProposal[0].id); //ask why
            AgendaService.startAgenda(
              [req.session.user, updatedProposal[0]],
              fullReviewEndDateReminder
            );
          }
          return res.send({
            status: 200,
            proposalData: updatedProposal[0],
            message: sails.config.serverMessage.reviewTypeAssigned,
          });
        }
      }
    );
  },
  assignReviewers(req, res) {
    Logger.debug("ApplicationController.assignReviewers");
    const proposalId = req.body.proposalId;
    const assignedReviewersFromBody = req.body.data;
    let expeditedReviewEndDate, expeditedReviewEndDateReminder;
    let reviewType;
    if (req.body.reviewType === "expeditedReview") {
      reviewType = sails.config.reviewTypeMapping.Expedited_Review;

      expeditedReviewEndDate = new Date();
      expeditedReviewEndDateReminder = new Date();
      expeditedReviewEndDateReminder.setDate(
        expeditedReviewEndDate.getDate() + 11
      );
      expeditedReviewEndDate.setDate(expeditedReviewEndDate.getDate() + 14);

      ApplicationService.getProposalByProposalId(
        proposalId,
        (err2, foundProposal) => {
          if (err2) {
            Logger.error(
              `ApplicationController.assignReviewers at ApplicationService.getProposalByProposalId ${err2}`
            );
            console.log("error while getting proposal");
          } else {
            Logger.debug(
              "ApplicationController.assignReviewers at ApplicationService.getProposalByProposalId"
            );
            Logger.debug(foundProposal);
            let finalReviewersArray = [];

            if (foundProposal.assignedReviewers !== undefined) {
              console.log(
                "inside if of foundProposal.assignedReviewers !== undefined"
              );
              foundProposal.assignedReviewers.forEach((existingReviewer) => {
                assignedReviewersFromBody.forEach((newReviewer) => {
                  if (newReviewer.isReviewAccepted === "true") {
                    finalReviewersArray.push(newReviewer);
                  } else if (
                    newReviewer.isReviewAccepted === "false" ||
                    newReviewer.isReviewAccepted === undefined
                  ) {
                    if (
                      (existingReviewer.id === newReviewer.id &&
                        existingReviewer.isReviewAccepted === "false" &&
                        newReviewer.isReviewAccepted === undefined) ||
                      (existingReviewer.isReviewAccepted === undefined &&
                        newReviewer.isReviewAccepted === undefined)
                    ) {
                      finalReviewersArray.push(newReviewer);
                    } else if (existingReviewer.id !== newReviewer.id) {
                      Logger.debug(`newReviewer ${newReviewer}`);
                      finalReviewersArray.push(newReviewer);
                    }
                  }
                });
              });
              finalReviewersArray = finalReviewersArray.filter(function (
                value,
                index,
                finalArray
              ) {
                return finalArray.indexOf(value) === index;
              });
              console.log("finalReviewersArray ", finalReviewersArray);

              ApplicationService.updateProposal(
                proposalId,
                {
                  reviewType,
                  isUnderReview: true,
                  assignedReviewers: finalReviewersArray,
                  expeditedReviewEndDate,
                },
                { date: new Date(), status: "Under Review - Expedited" },
                (err, updatedProposal) => {
                  if (err) {
                    Logger.error(
                      `ApplicationController.assignReviewers at ApplicationService.updateProposal ${err}`
                    );
                    res.send({
                      status: 300,
                      message: sails.config.serverMessage.serverError,
                    });
                  } else {
                    Logger.debug(
                      `ApplicationController.assignReviewers at ApplicationService.updateProposal`
                    );
                    Logger.debug(updatedProposal);
                    console.log("updated proposal", updatedProposal);
                    let finalProposalArray = [];

                    let proposalToBeSentToReviewers = {
                      proposalId: updatedProposal[0].proposalId,
                      proposalTitle: updatedProposal[0].title,
                      investigatorId:
                        updatedProposal[0].investigatorId.toString(),
                      reviewType: updatedProposal[0].reviewType,
                    };
                    let reviewersInUpdatedProposal =
                      updatedProposal[0].assignedReviewers;
                    console.log(
                      "reviewersInUpdatedProposal",
                      reviewersInUpdatedProposal
                    );

                    reviewersInUpdatedProposal.forEach(
                      (reviewerInUpdatedProposal) => {
                        console.log(
                          "each reviewerInUpdatedProposal",
                          reviewerInUpdatedProposal
                        );
                        if (
                          reviewerInUpdatedProposal.isReviewAccepted ===
                            "false" ||
                          reviewerInUpdatedProposal.isReviewAccepted ===
                            undefined
                        ) {
                          InternalUserService.getInternalUser(
                            reviewerInUpdatedProposal.id,
                            (getUserErr, getUserData) => {
                              if (getUserErr) {
                                Logger.error(
                                  `ApplicationController.assignReviewers at InternalUserService.getInternalUser ${getUserErr}`
                                );
                                res.send({
                                  status: 300,
                                  message:
                                    sails.config.serverMessage.serverError,
                                });
                              } else {
                                if (
                                  getUserData.assignedProposal !== undefined &&
                                  getUserData.assignedProposal.length !== 0
                                ) {
                                  console.log("getUserData", getUserData);
                                  console.log("role=", getUserData.role);
                                  getUserData.assignedProposal.forEach(
                                    (existingProposal) => {
                                      if (
                                        existingProposal.proposalId ===
                                          proposalToBeSentToReviewers.proposalId &&
                                        ((reviewerInUpdatedProposal.isReviewAccepted ===
                                          undefined &&
                                          existingProposal.isProposalAcceptedForReview ===
                                            undefined) ||
                                          (reviewerInUpdatedProposal.isReviewAccepted ===
                                            undefined &&
                                            existingProposal.isProposalAcceptedForReview ===
                                              "false"))
                                      ) {
                                        finalProposalArray.push(
                                          proposalToBeSentToReviewers
                                        );
                                        console.log(
                                          "final array in if",
                                          finalProposalArray
                                        );
                                      } else if (
                                        existingProposal.proposalId !==
                                        proposalToBeSentToReviewers.proposalId
                                      ) {
                                        finalProposalArray.push(
                                          existingProposal
                                        );
                                        finalProposalArray.push(
                                          proposalToBeSentToReviewers
                                        );
                                        console.log(
                                          "final array in else if 2",
                                          finalProposalArray
                                        );
                                      }
                                    }
                                  );
                                } else {
                                  finalProposalArray.push(
                                    proposalToBeSentToReviewers
                                  );
                                  console.log(
                                    "final array in else",
                                    finalProposalArray
                                  );
                                }
                                finalProposalArray = finalProposalArray.filter(
                                  function (value, index, finalArray) {
                                    return finalArray.indexOf(value) === index;
                                  }
                                );
                              }
                              InternalUserService.updateInternalUser(
                                reviewerInUpdatedProposal.id,
                                { assignedProposal: finalProposalArray },
                                (error, updatedInternalUser) => {
                                  if (error) {
                                    Logger.error(
                                      `ApplicationController.assignReviewers at InternalUserService.updateInternalUser ${error}`
                                    );
                                    res.send({
                                      status: 300,
                                      message:
                                        sails.config.serverMessage.serverError,
                                    });
                                  } else {
                                    Logger.debug(
                                      "ApplicationController.assignReviewers at InternalUserService.updateInternalUser"
                                    );
                                    Logger.debug(updatedInternalUser);
                                  }
                                }
                              );
                              finalProposalArray = [];
                            }
                          );
                        }
                      }
                    );

                    if (updatedProposal[0].reviewType === 1) {
                      console.log("it goes into this");
                      EmailService.AssignedForExpeditedReviewToCoordinator(
                        req.session.user,
                        updatedProposal[0]
                      );
                      EmailService.AssignedForExpeditedReviewToReviewer(
                        req.session.user,
                        updatedProposal[0]
                      );

                      let investigatorId =
                        updatedProposal[0].investigatorId.toString();

                      InvestigatorService.getInvestigator(
                        investigatorId,
                        (error, investigatorData) => {
                          if (error) {
                            console.log(
                              "error is getting investigator in review type 1"
                            );
                            res.send({ status: 300, message: error.message });
                          } else {
                            Logger.info(
                              "investigator data in review type 1",
                              investigatorData
                            );
                            EmailService.AssignedForReviewToInvestigator(
                              investigatorData,
                              updatedProposal[0]
                            );
                          }
                        }
                      );
                      // AgendaService.startAgendaForExpeditedReviewReminder(updatedProposal[0], expeditedReviewEndDate);
                      AgendaService.startAgendaForExpeditedReviewReminder(
                        updatedProposal[0],
                        expeditedReviewEndDateReminder
                      );
                    }
                  }
                  res.send({
                    status: 200,
                    proposalData: updatedProposal,
                    message:
                      sails.config.serverMessage.proposalAssignedForReview,
                  });
                }
              );
            } else {
              console.log(
                "inside else of foundProposal.assignedReviewers !== undefined"
              );
              ApplicationService.updateProposal(
                proposalId,
                {
                  reviewType,
                  isUnderReview: true,
                  assignedReviewers: assignedReviewersFromBody,
                  expeditedReviewEndDate,
                },
                { date: new Date(), status: "Under Review - Expedited" },
                (err, updatedProposal) => {
                  if (err) {
                    Logger.error(
                      `ApplicationController.assignReviewers at ApplicationService.updateProposal ${err}`
                    );
                    res.send({
                      status: 300,
                      message: sails.config.serverMessage.serverError,
                    });
                  } else {
                    Logger.debug(
                      `ApplicationController.assignReviewers at ApplicationService.updateProposal`
                    );
                    Logger.debug(updatedProposal);
                    console.log("updated proposal", updatedProposal);
                    let finalProposalArray = [];

                    let proposalToBeSentToReviewers = {
                      proposalId: updatedProposal[0].proposalId,
                      proposalTitle: updatedProposal[0].title,
                      investigatorId:
                        updatedProposal[0].investigatorId.toString(),
                      reviewType: updatedProposal[0].reviewType,
                    };
                    let reviewersInUpdatedProposal =
                      updatedProposal[0].assignedReviewers;
                    console.log(
                      "reviewersInUpdatedProposal",
                      reviewersInUpdatedProposal
                    );

                    reviewersInUpdatedProposal.forEach(
                      (reviewerInUpdatedProposal) => {
                        if (
                          reviewerInUpdatedProposal.isReviewAccepted ===
                            "false" ||
                          reviewerInUpdatedProposal.isReviewAccepted ===
                            undefined
                        ) {
                          InternalUserService.getInternalUser(
                            reviewerInUpdatedProposal.id,
                            (getUserErr, getUserData) => {
                              if (getUserErr) {
                                Logger.error(
                                  `ApplicationController.assignReviewers at InternalUserService.getInternalUser ${getUserErr}`
                                );
                                res.send({
                                  status: 300,
                                  message:
                                    sails.config.serverMessage.serverError,
                                });
                              } else {
                                if (
                                  getUserData.assignedProposal !== undefined &&
                                  getUserData.assignedProposal.length !== 0
                                ) {
                                  getUserData.assignedProposal.forEach(
                                    (existingProposal) => {
                                      if (
                                        existingProposal.proposalId ===
                                          proposalToBeSentToReviewers.proposalId &&
                                        ((reviewerInUpdatedProposal.isReviewAccepted ===
                                          undefined &&
                                          existingProposal.isProposalAcceptedForReview ===
                                            undefined) ||
                                          (reviewerInUpdatedProposal.isReviewAccepted ===
                                            undefined &&
                                            existingProposal.isProposalAcceptedForReview ===
                                              "false"))
                                      ) {
                                        finalProposalArray.push(
                                          proposalToBeSentToReviewers
                                        );
                                      } else if (
                                        existingProposal.proposalId !==
                                        proposalToBeSentToReviewers.proposalId
                                      ) {
                                        finalProposalArray.push(
                                          existingProposal
                                        );
                                        finalProposalArray.push(
                                          proposalToBeSentToReviewers
                                        );
                                      }
                                    }
                                  );
                                } else {
                                  finalProposalArray.push(
                                    proposalToBeSentToReviewers
                                  );
                                }
                                finalProposalArray = finalProposalArray.filter(
                                  function (value, index, finalArray) {
                                    return finalArray.indexOf(value) === index;
                                  }
                                );
                              }
                              InternalUserService.updateInternalUser(
                                reviewerInUpdatedProposal.id,
                                { assignedProposal: finalProposalArray },
                                (err1, updatedInternalUser) => {
                                  if (err1) {
                                    Logger.error(
                                      `ApplicationController.assignReviewers at InternalUserService.updateInternalUser ${err1}`
                                    );
                                    res.send({
                                      status: 300,
                                      message:
                                        sails.config.serverMessage.serverError,
                                    });
                                  } else {
                                    Logger.debug(
                                      "ApplicationController.assignReviewers at InternalUserService.updateInternalUser"
                                    );
                                    Logger.debug(updatedInternalUser);
                                  }
                                }
                              );
                              finalProposalArray = [];
                            }
                          );
                        }
                      }
                    );

                    if (updatedProposal[0].reviewType === 1) {
                      console.log("it goes into this");
                      EmailService.AssignedForExpeditedReviewToCoordinator(
                        req.session.user,
                        updatedProposal[0]
                      );
                      EmailService.AssignedForExpeditedReviewToReviewer(
                        req.session.user,
                        updatedProposal[0]
                      );

                      let investigatorId =
                        updatedProposal[0].investigatorId.toString();
                      console.log(
                        "investigator id type",
                        typeof investigatorId
                      );
                      console.log("investigator id", investigatorId);

                      InvestigatorService.getInvestigator(
                        investigatorId,
                        (error, investigatorData) => {
                          if (error) {
                            Logger.error(
                              "error is getting investigator in review type 1"
                            );
                            res.send({ status: 300, message: error.message });
                          } else {
                            console.log(
                              "investigator data in review type 1",
                              investigatorData
                            );
                            EmailService.AssignedForReviewToInvestigator(
                              investigatorData,
                              updatedProposal[0]
                            );
                          }
                        }
                      );
                      AgendaService.startAgendaForExpeditedReviewReminder(
                        updatedProposal[0],
                        expeditedReviewEndDateReminder
                      );
                    }
                  }
                  res.send({
                    status: 200,
                    proposalData: updatedProposal,
                    message:
                      sails.config.serverMessage.proposalAssignedForReview,
                  });
                }
              );
            }
          }
        }
      );
    } else {
      res.send({
        status: 300,
        message: sails.config.serverMessage.serverError,
      });
    }
  },

  rejectProposalByCoordinatorAfterReview(req, res) {
    Logger.debug(
      "ApplicationController.rejectProposalByCoordinatorAfterReview"
    );
    const proposalId = req.body.proposalId;
    Logger.verbose(proposalId);
    let rejectionComment = req.body.rejectionComment;
    console.log("what is in rejection Comment", rejectionComment);
    ApplicationService.updateProposal(
      proposalId,
      { isUnderReview: false, isRejected: true, rejectionComment },
      { date: new Date(), status: "Rejected" },
      (err, updatedProposal) => {
        if (err) {
          res.send({
            status: 300,
            message: sails.config.serverMessage.serverError,
          });
        } else {
          Investigator.findActiveById(
            updatedProposal[0].investigatorId.toString(),
            (findActiveByIdErr, investigator) => {
              if (findActiveByIdErr) {
                Logger.warn(findActiveByIdErr);
                res.send({
                  status: 300,
                  message: sails.config.serverMessage.serverError,
                });
              } else {
                // eslint-disable-next-line no-underscore-dangle
                updatedProposal[0]._id = new ObjectId(updatedProposal[0].id);
                EmailService.rejectProposalEmailToInvestigator(
                  investigator,
                  updatedProposal[0]
                );
                EmailService.rejectProposalEmailToCoordinator(
                  req.session.user,
                  updatedProposal[0]
                );
                res.send({
                  status: 200,
                  proposalData: updatedProposal,
                  message: sails.config.serverMessage.rejectProposal,
                });
              }
            }
          );
        }
      }
    );
  },

  markProposalUnderSigned(req, res) {
    Logger.debug("ApplicationController.markProposalUnderSigned");
    const proposalId = req.body.proposalId;
    Logger.verbose(proposalId);
    ApplicationService.updateProposal(
      proposalId,
      { isUnderReview: false, isUnderSigned: true },
      { date: new Date(), status: "Approved" },
      (err, updatedProposal) => {
        if (err) {
          res.send({
            status: 300,
            message: sails.config.serverMessage.serverError,
          });
        } else {
          /**email to chair and coordinator */
          EmailService.ProposalApprovedToCoordinator(
            req.session.user,
            updatedProposal[0]
          );
          InternalUserService.getChair((error, chairData) => {
            if (error) {
              console.log("error is getting chair data");
              res.send({ status: 300, message: error.message });
            } else {
              console.log("chair data", chairData[0]);
              EmailService.ProposalApprovedToChair(
                chairData[0],
                updatedProposal[0]
              );
            }
          });
          res.send({
            status: 200,
            proposalData: updatedProposal,
            message: sails.config.serverMessage.proposalUnderSign,
          });
        }
      }
    );
  },

  markProposalAsResearch(req, res) {
    Logger.debug("ApplicationController.markProposalAsResearch");
    const proposalId = req.body.proposalId;
    const chairPerson = req.body.chairPersonDetails;
    const chairPersonSign = req.body.chairPersonSign;
    console.log("chair person details", chairPerson);
    Logger.verbose(proposalId);
    const dateOfApproval = new Date();
    const tempDateOfApproval = new Date();
    console.log("dateOfApproval in app controller", dateOfApproval);

    Logger.debug("ApplicationController.markProposalAsResearch.dateOfApproval");
    Logger.verbose(dateOfApproval);
    const emailDateForIntermediateReport = new Date(
      tempDateOfApproval.setMonth(tempDateOfApproval.getMonth() + 5)
    );
    const emailDateForFinalReport = new Date(
      tempDateOfApproval.setMonth(tempDateOfApproval.getMonth() + 10)
    );

    ApplicationService.updateProposal(
      proposalId,
      {
        chairPerson,
        chairPersonSign,
        dateOfApproval,
        isResearch: true,
        isProposal: false,
        isSubmitted: false,
        isComplete: false,
        isUnderReview: false,
        isUnderSigned: false,
        emailDateForIntermediateReport,
        emailDateForFinalReport,
      },
      { date: new Date(), status: "Mark Research" },
      (err, updatedProposal) => {
        if (err) {
          res.send({
            status: 300,
            message: sails.config.serverMessage.serverError,
          });
        } else {
          EmailService.markResearchProposalEmailToChair(
            req.session.user,
            updatedProposal[0]
          );
          InternalUserService.getCoordinator(
            (findActiveByIdErr, coordinator) => {
              if (findActiveByIdErr) {
                Logger.warn(findActiveByIdErr);
                res.send({
                  status: 300,
                  message: sails.config.serverMessage.serverError,
                });
              } else {
                // eslint-disable-next-line no-underscore-dangle
                updatedProposal[0]._id = new ObjectId(updatedProposal[0].id);
                EmailService.markResearchProposalEmailToCoordinator(
                  coordinator[0],
                  updatedProposal[0]
                );
                res.send({
                  status: 200,
                  proposalData: updatedProposal[0],
                  message: sails.config.serverMessage.proposalMarkedResearch,
                });
              }
            }
          );
          Investigator.findActiveById(
            updatedProposal[0].investigatorId.toString(),
            (findActiveByIdErr, investigator) => {
              if (findActiveByIdErr) {
                Logger.warn(findActiveByIdErr);
                res.send({
                  status: 300,
                  message: sails.config.serverMessage.serverError,
                });
              } else {
                // eslint-disable-next-line no-underscore-dangle
                updatedProposal[0]._id = new ObjectId(updatedProposal[0].id);
                console.log("ddddddddddddd");
                console.log(investigator);
                AgendaService.reportReminderAgenda(
                  updatedProposal[0],
                  investigator
                );
                EmailService.markResearchProposalEmailToInvestigator(
                  investigator,
                  updatedProposal[0]
                );
                res.send({
                  status: 200,
                  proposalData: updatedProposal[0],
                  message: sails.config.serverMessage.proposalMarkedResearch,
                });
              }
            }
          );
        }
      }
    );
  },

  getAllProposalForReview(req, res) {
    Logger.debug("ApplicationController.getAllProposalForReview");
    ApplicationService.getAllProposalForReview(
      req.session.user,
      (error, proposalData) => {
        if (error) {
          res.send({
            status: 300,
            message: sails.config.serverMessage.serverError,
          });
        } else {
          res.send({ status: 200, proposalData });
        }
      }
    );
  },

  getAllProposalForSign(req, res) {
    Logger.debug("ApplicationController.getAllProposalForSign");
    ApplicationService.getAllProposalForSign((error, proposalData) => {
      if (error) {
        console.log("error", error);
        res.send({
          status: 300,
          message: sails.config.serverMessage.serverError,
        });
      } else {
        res.send({ status: 200, proposalData });
      }
    });
  },
  getProposalExpectInvestigator(req, res) {
    Logger.debug("ApplicationController.getProposal");
    const proposalId = req.body.proposalId;
    Logger.verbose(proposalId);
    if (!proposalId) {
      res.send({
        status: 300,
        message: sails.config.serverMessage.serverError,
      });
    } else {
      ApplicationService.getProposalExpectInvestigator(
        proposalId,
        (err, proposalData) => {
          if (err) {
            if (err === "Proposal if not match") {
              res.send({
                status: 300,
                message: sails.config.serverMessage.invalidURL,
                idNotMatch: "idNotMatch",
              });
            } else {
              res.send({
                status: 300,
                message: sails.config.serverMessage.serverError,
              });
            }
          } else {
            res.send({ status: 200, proposalData });
          }
        }
      );
    }
  },
  rejectProposalByCoordinator(req, res) {
    Logger.debug("ApplicationController.rejectProposalByCoordinator");
    const proposalId = req.params["proposalId"];
    Logger.debug(proposalId);
    Logger.debug(req.body.data);
    console.log("req.session.user");
    console.log(req.session.user);
    const { rejectionComment } = req.body.data;
    if (!proposalId) {
      res.send({
        status: 300,
        message: sails.config.serverMessage.serverError,
      });
    }
    ApplicationService.updateProposal(
      proposalId,
      { isRejected: true, rejectionComment },
      { date: new Date(), status: "Rejected" },
      (err, updatedProposal) => {
        if (err) {
          res.send({
            status: 300,
            message: sails.config.serverMessage.serverError,
          });
        } else {
          debugger;
          Investigator.findActiveById(
            updatedProposal[0].investigatorId.toString(),
            (findActiveByIdErr, investigator) => {
              if (findActiveByIdErr) {
                Logger.warn(findActiveByIdErr);
                res.send({
                  status: 300,
                  message: sails.config.serverMessage.serverError,
                });
              } else {
                // eslint-disable-next-line no-underscore-dangle
                updatedProposal[0]._id = new ObjectId(updatedProposal[0].id);
                console.log("*********************************");
                console.log(updatedProposal[0]);
                console.log(investigator);
                EmailService.rejectProposalEmailToInvestigator(
                  investigator,
                  updatedProposal[0]
                );
                EmailService.rejectProposalEmailToCoordinator(
                  req.session.user,
                  updatedProposal[0]
                );
                res.send({
                  status: 200,
                  proposalData: updatedProposal,
                  message: sails.config.serverMessage.rejectProposal,
                });
              }
            }
          );
        }
      }
    );
  },

  getAllResearchForInvestigator(req, res) {
    Logger.debug("ApplicationController.getAllResearchForInvestigator");
    const investigatorId = new ObjectId(req.session.user.id);
    Logger.verbose(`investigator id in controller ${investigatorId}`);
    if (!investigatorId) {
      console.log("investigator in app controller error");
      res.send({
        status: 300,
        message: sails.config.serverMessage.serverError,
      });
    } else {
      ApplicationService.getAllResearchForInvestigator(
        investigatorId,
        (err, researchData) => {
          if (err) {
            console.log("error in getting reaearch data", err);
            return res.send({
              status: 300,
              message: sails.config.serverMessage.serverError,
            });
          } else {
            console.log("Found research data in app controller", researchData);
            return res.send({ status: 200, researchData });
          }
        }
      );
    }
  },

  getAllResearchForCoordinator(req, res) {
    Logger.debug("ApplicationController.getAllResearchForCoordinator");
    const pageNo = req.params["pageNo"];

    ApplicationService.getAllResearchForCoordinator(
      pageNo,
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
  },
  getAllResearchForCoordinatorWithAuth(req, res) {
    Logger.debug("ApplicationController.getAllResearchForCoordinatorWithAuth");
    const pageNo = req.params["pageNo"];

    ApplicationService.getAllResearchForCoordinator(
      pageNo,
      (error, researchData, total) => {
        if (error) {
          res.send({
            status: 300,
            message: sails.config.serverMessage.serverError,
          });
        } else {
          Logger.debug(
            "ApplicationController.getAllResearchForCoordinatorWithAuth at ApplicationService.getAllResearchForCoordinator"
          );
          Logger.debug(researchData);
          Logger.debug(total);
          res.send({ status: 200, researchData, total });
        }
      }
    );
  },

  getAllProposalResearchForCoordinator(req, res) {
    Logger.debug("ApplicationController.getAllProposalResearchForCoordinator");
    ApplicationService.getAllProposalResearchForCoordinator(
      (err, proposalResearchData) => {
        if (err) {
          res.send({
            status: 300,
            message: sails.config.serverMessage.serverError,
          });
        } else {
          res.send({ status: 200, proposalResearchData });
        }
      }
    );
  },
  proposalHistory(req, res) {
    Logger.debug("ApplicationController.proposalHistory");
    const proposalId = req.params["proposalId"];
    console.log(proposalId);
    Logger.verbose(proposalId);
    if (!proposalId) {
      console.log("in here");
      res.send({ status: 300, message: "Server error. Please try again." });
    } else {
      ApplicationService.getProposalHistory(proposalId, (err, proposalData) => {
        if (err) {
          console.log(err);
          res.send({ status: 300, message: "Server error. Please try again." });
        } else {
          res.send({ status: 200, proposalData });
        }
      });
    }
  },
  searchProposal(req, res) {
    Logger.debug("ApplicationController.searchProposal");
    const searchTerm = req.params["searchTerm"];
    console.log(searchTerm);
    Logger.verbose(searchTerm);
    if (!searchTerm) {
      console.log("in here");
      res.send({ status: 300, message: "Server error. Please try again." });
    } else if (searchTerm.length <= 2) {
      res.send({
        status: 300,
        message: "Search term length must be greater than 2",
      });
    } else {
      ApplicationService.searchProposal(searchTerm, (err, proposals) => {
        if (err) {
          console.log(err);
          res.send({ status: 300, message: "Server error. Please try again." });
        } else {
          res.send({ status: 200, proposals });
        }
      });
    }
  },
  searchResearch(req, res) {
    Logger.debug("ApplicationController.searchResearch");
    const searchTerm = req.params["searchTerm"];
    console.log(searchTerm);
    Logger.verbose(searchTerm);
    if (!searchTerm) {
      console.log("in here");
      res.send({ status: 300, message: "Server error. Please try again." });
    } else if (searchTerm.length <= 2) {
      res.send({
        status: 300,
        message: "Search term length must be greater than 2",
      });
    } else {
      ApplicationService.searchResearch(searchTerm, (err, researchData) => {
        if (err) {
          console.log(err);
          res.send({ status: 300, message: "Server error. Please try again." });
        } else {
          res.send({ status: 200, researchData });
        }
      });
    }
  },
  
  withdrawProposal(req, res) {
    Logger.debug("ApplicationController.withdrawProposal");
    const proposalId = req.body.proposalId;
    const withdrawComment = req.body.withdrawComment;

    Logger.verbose(proposalId);
    Logger.verbose(withdrawComment);

    ApplicationService.getProposalByProposalId(
      proposalId,
      (error, proposal) => {
        if (error) {
          console.log("error while getting proposal", error);
        } else if (proposal) {
          console.log("proposal data ", proposal);
          if (
            proposal.isUnderReview ||
            proposal.isUnderSigned ||
            proposal.isResearch
          ) {
            console.log("withdraw process is not valid");
            res.send({
              status: 300,
              proposalData: proposal,
              message: sails.config.serverMessage.invalidWithdrawProcess,
            });
          } else {
            ApplicationService.updateProposal(
              proposalId,
              { withdrawComment, isProposalWithdrawn: true, isActive: false },
              { date: new Date(), status: "Proposal Withdrawn" },
              (err, updatedProposal) => {
                if (err) {
                  res.send({
                    status: 300,
                    message: sails.config.serverMessage.serverError,
                  });
                } else {
                  console.log("updated proposal", updatedProposal);
                  InternalUserService.getCoordinator(
                    (fetchErr, coordinatorData) => {
                      if (fetchErr) {
                        console.log("error while fetching coordinator data");
                      } else {
                        console.log("coordinator data", coordinatorData);
                        EmailService.withdrawProposalEmailToCoordinator(
                          coordinatorData[0],
                          updatedProposal[0]
                        );
                      }
                    }
                  );
                  EmailService.withdrawProposalEmailToInvestigator(
                    req.session.user,
                    updatedProposal[0]
                  );
                  res.send({
                    status: 200,
                    proposalData: updatedProposal,
                    message: sails.config.serverMessage.proposalWithdrawn,
                  });
                }
              })
             
            }
        }})
  },
      
  
  requestTermExtension(req, res) {
    Logger.debug("ApplicationController.withdrawProposal");
    const proposalId = req.body.proposalId;
    const extensionComment = req.body.extensionComment;
    Logger.verbose(proposalId);
    Logger.verbose(extensionComment);

    ApplicationService.getProposalByProposalId(
      proposalId,
      (error, proposal) => {
        if (error) {
          console.log("error while getting proposal", error);
          return res.send({
            status: 300,
            message: "No proposal found for the proposalId",
          });
        } else if (proposal) {
          console.log("proposal data in application controller", proposal);

          if (proposal.isResearch) {
            console.log("date of approval", proposal.dateOfApproval);
            let currentDate = new Date();
            console.log("currentDate", currentDate);

            let diffYears =
              currentDate.getFullYear() - proposal.dateOfApproval.getFullYear();
            console.log("diffYears", diffYears);
            let diffMonths =
              currentDate.getMonth() - proposal.dateOfApproval.getMonth();
            console.log("diffMonths", diffMonths);
            var months = diffYears * 12 + diffMonths;
            console.log("months", months);

            if (
              proposal.termExtensionCount === undefined ||
              proposal.termExtensionCount < 2
            ) {
              if (months >= 11 || months <= 12) {
                ApplicationService.updateProposal(
                  proposalId,
                  {
                    termExtensionAppliedDate:new Date(),
                    extensionComment,
                    appliedForTermExtension: true,
                    termExtensionCount:
                      proposal.termExtensionCount === undefined
                        ? 1
                        : proposal.termExtensionCount + 1,
                  },
                  { date: new Date(), status: "Applied For Term Extension" },
                  (err, updatedProposal) => {
                    if (err) {
                      res.send({
                        status: 300,
                        message: sails.config.serverMessage.failedToApply,
                      });
                    } else {
                      /**email to investigator and coordinator */
                      console.log("updated proposal", updatedProposal);
                      if(updatedProposal[0].termExtensionCount==2){
                        ApplicationService.updateProposalForTermExtension(updatedProposal[0].proposalId,{
                          isTermExtensionForwardToChair:"undefined",
                          termExtensionForwardComment:"undefined",
                          commentForApprovedTermExtension:"undefined",
                          termExtensionApproved:"undefined",
                          extensionResponseToInvestigator : "undefined",
                          commentForResponseToInvestigator:"undefined",
                          commentForRejectedTermExtension:"undefined"

                        },(error2,updateProposal)=>{
                          if(error2){
                            console.log("Error while updating")
                          }
                          else{
                            Logger.verbose("updated Proposal with term extension changes",updateProposal);
                          }
                        })
                      }
                      InternalUserService.getCoordinator(
                        (fetchErr, coordinatorData) => {
                          if (fetchErr) {
                            console.log(
                              "error while fetching coordinator data"
                            );
                          } else {
                            console.log("coordinator data", coordinatorData);
                            EmailService.requestTermExtensionEmailToCoordinator(
                              coordinatorData[0],
                              updatedProposal[0]
                            );
                          }
                        }
                      );
                      EmailService.requestTermExtensionEmailToInvestigator(
                        req.session.user,
                        updatedProposal[0]
                      );
                      res.send({
                        status: 200,
                        proposalData: updatedProposal,
                        message:
                          sails.config.serverMessage.appliedForTermExtension,
                      });
                    }
                  }
                );
              } else {
                res.send({
                  status: 300,
                  proposalData: null,
                  message: sails.config.serverMessage.invalidExtension,
                });
              }
            } else {
              res.send({
                status: 300,
                proposalData: null,
                message: sails.config.serverMessage.invalidCountExtension,
              });
            }
          }
        }
      }
    );
  },
  forwardTermExtension(req,res){
    Logger.debug("ApplicationController.forwardTermExtension");
    const proposalId = req.body.proposalId;
    const termExtensionForwardComment = req.body.termExtensionForwardComment;
    let args = [
      {
        name: "Comment",
        value: termExtensionForwardComment,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.commentRequiredValidation,
          },
        ],
      },
      {
        name: "Comment",
        value: termExtensionForwardComment,
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
          `ApplicationController.forwardTermExtension at ValidateService.validate ${validationErr}`
        );
        res.send({
          status: 300,
          message: sails.config.serverMessage.serverError,
        });
      } 
      else if(validationErrMsgs.length === 0){
        ApplicationService.getProposalByProposalId(proposalId,(err,proposal)=>{
          if (err) {
            console.log("error while getting proposal", err);
            return res.send({
              status: 300,
              message: "No proposal found for the proposalId",
            });
          }
          else{
            ApplicationService.updateProposal(proposalId,
              {
                termExtensionForwardComment,
                isTermExtensionForwardToChair:true
              },
              { date: new Date(), status: "Forward Term Extension" },(error,updatedPropsal)=>{
                  if(error){
                    res.send({
                      status: 300,
                      message: sails.config.serverMessage.serverError,
                    });
                  }
                  else{
                    InternalUser.findActiveByCriteria(
                      { isActive: true, role: 5, isVerified: true },(error1,chair)=>{
                      if(error1){
                        console.log("error while fetching details of chair")
                      }
                      else{
                        console.log(chair)
                        EmailService.forwardTermExtensionEmailToChair(
                          chair,
                          updatedPropsal[0]
                        );
                        EmailService.forwardTermExtensionEmailToCoordinator(
                          req.session.user,
                          updatedPropsal[0]
                        );
                        res.send({
                          status: 200,
                          proposalData: updatedPropsal,
                          message:
                          "Extension request sent to chair."
                        });
                      }
                    }
                    )
                   
                  }
              })
          }
        })
      }
      else{
        ValidateService.getValidateMsg(
          validationErrMsgs,
          (getValidateMsgErr, errMsgs) => {
            if (getValidateMsgErr) {
              Logger.error(
                `ApplicationController.forwardTermExtension at ValidateService.getValidateMsg ${getValidateMsgErr}`
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
  getAllTermExtension(req,res){
    Logger.debug("ApplicationController.getAllTermExtension");
    const pageNo = req.params["pageNo"];
    ApplicationService.getAllTermExtensionRequest(pageNo,{isTermExtensionForwardToChair:true},
      (err, termExtensions) => {
        if (err) {
          res.send({
            status: 300,
            message: sails.config.serverMessage.serverError,
          });
        } else {
          res.send({ status: 200, termExtensions });
        }
      }
    );
  },
  approvedTermExtenstion(req,res){
    Logger.debug("ApplicationController.approvedTermExtenstion");
    const proposalId = req.body.proposalId;
    const commentForApprovedTermExtension = req.body.commentForApprovedTermExtension;
    let args = [
      {
        name: "Comment",
        value: commentForApprovedTermExtension,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.commentRequiredValidation,
          },
        ],
      },
      {
        name: "Comment",
        value: commentForApprovedTermExtension,
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
          `ApplicationController.approvedTermExtenstion at ValidateService.validate ${validationErr}`
        );
        res.send({
          status: 300,
          message: sails.config.serverMessage.serverError,
        });
      } 
      else if(validationErrMsgs.length === 0){
        ApplicationService.getProposalByProposalId(proposalId,(err,proposal)=>{
          if (err) {
            console.log("error while getting proposal", err);
            return res.send({
              status: 300,
              message: "No proposal found for the proposalId",
            });
          }
          else{
            ApplicationService.updateProposal(proposalId,
              {
                commentForApprovedTermExtension,
                termExtensionApproved:true
              },
              { date: new Date(), status: "approved Term Extension" },(error,updatedPropsal)=>{
                  if(error){
                    res.send({
                      status: 300,
                      message: sails.config.serverMessage.serverError,
                    });
                  }
                  else{
                    InternalUser.findActiveByCriteria(
                      { isActive: true, role: 2, isVerified: true },(error1,coordinator)=>{
                      if(error1){
                        console.log("error while fetching details of chair")
                      }
                      else{
                        EmailService.approvedTermExtenstionToCoordinator(
                          coordinator,
                          updatedPropsal[0]
                        );
                        EmailService.approvedTermExtenstionToChair(
                          req.session.user,
                          updatedPropsal[0]
                        );
                        res.send({
                          status: 200,
                          proposalData: updatedPropsal,
                          message:
                          "Extension request is accepted."
                        });
                      }
                    }
                    )
                   
                  }
              })
          }
        })
      }
      else{
        ValidateService.getValidateMsg(
          validationErrMsgs,
          (getValidateMsgErr, errMsgs) => {
            if (getValidateMsgErr) {
              Logger.error(
                `ApplicationController.approvedTermExtenstion at ValidateService.getValidateMsg ${getValidateMsgErr}`
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
  rejectedTermExtenstion(req,res){
    Logger.debug("ApplicationController.rejectedTermExtenstion");
    const proposalId = req.body.proposalId;
    const commentForRejectedTermExtension = req.body.commentForRejectedTermExtension;
    let args = [
      {
        name: "Comment",
        value: commentForRejectedTermExtension,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.commentRequiredValidation,
          },
        ],
      },
      {
        name: "Comment",
        value: commentForRejectedTermExtension,
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
          `ApplicationController.rejectedTermExtenstion at ValidateService.validate ${validationErr}`
        );
        res.send({
          status: 300,
          message: sails.config.serverMessage.serverError,
        });
      } 
      else if(validationErrMsgs.length === 0){
        ApplicationService.getProposalByProposalId(proposalId,(err,proposal)=>{
          if (err) {
            console.log("error while getting proposal", err);
            return res.send({
              status: 300,
              message: "No proposal found for the proposalId",
            });
          }
          else{
            ApplicationService.updateProposal(proposalId,
              {
                commentForRejectedTermExtension,
                termExtensionApproved:false
              },
              { date: new Date(), status: "reject Term Extension" },(error,updatedPropsal)=>{
                  if(error){
                    res.send({
                      status: 300,
                      message: sails.config.serverMessage.serverError,
                    });
                  }
                  else{
                    InternalUser.findActiveByCriteria(
                      { isActive: true, role: 2, isVerified: true },(error1,coordinator)=>{
                      if(error1){
                        console.log("error while fetching details of chair")
                      }
                      else{
                        EmailService.rejectedTermExtenstionToCoordinator(
                          coordinator,
                          updatedPropsal[0]
                        );
                        EmailService.rejectedTermExtenstionToChair(
                          req.session.user,
                          updatedPropsal[0]
                        );
                        res.send({
                          status: 200,
                          proposalData: updatedPropsal,
                          message:
                          "Extension request is rejected."
                        });
                      
                      }
                    }
                    )
                   
                  }
              })
          }
        })
      }
      else{
        ValidateService.getValidateMsg(
          validationErrMsgs,
          (getValidateMsgErr, errMsgs) => {
            if (getValidateMsgErr) {
              Logger.error(
                `ApplicationController.rejectedTermExtenstion at ValidateService.getValidateMsg ${getValidateMsgErr}`
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
  forwardTermExtenstionResponse(req,res){
    Logger.debug("ApplicationController.forwardTermExtenstionResponse");
    const proposalId = req.body.proposalId;
    const commentForResponseToInvestigator = req.body.commentForResponseToInvestigator;
    let args = [
      {
        name: "Comment",
        value: commentForResponseToInvestigator,
        validations: [
          {
            validation: "notEmpty",
            message: sails.config.ValidationMessages.commentRequiredValidation,
          },
        ],
      },
      {
        name: "Comment",
        value: commentForResponseToInvestigator,
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
          `ApplicationController.forwardTermExtenstionResponse at ValidateService.validate ${validationErr}`
        );
        res.send({
          status: 300,
          message: sails.config.serverMessage.serverError,
        });
      } 
      else if(validationErrMsgs.length === 0){
        ApplicationService.getProposalByProposalId(proposalId,(err,proposal)=>{
          if (err) {
            console.log("error while getting proposal", err);
            return res.send({
              status: 300,
              message: "No proposal found for the proposalId",
            });
          }
          else{
            ApplicationService.updateProposal(proposalId,
              {
                commentForResponseToInvestigator,
                extensionResponseToInvestigator:true
              },
              { date: new Date(), status: "response Term Extension" },(error,updatedPropsal)=>{
                  if(error){
                    res.send({
                      status: 300,
                      message: sails.config.serverMessage.serverError,
                    });
                  }
                  else{
                    Investigator.findActiveById(updatedPropsal[0].investigatorId.toString(),(error1,investigator)=>{
                      if(error1){
                        console.log("error while fetching details of investigattor")
                      }
                      else{
                        EmailService.forwardResponseExtenstionToCoordinator(
                          req.session.user,
                          updatedPropsal[0]
                        );
                        EmailService.forwardResponseExtenstionToInvestigator(
                          investigator,
                          updatedPropsal[0]
                        );
                        res.send({
                          status: 200,
                          proposalData: updatedPropsal[0],
                          message:
                          "Feedback sent to investigator."
                        });
                      }
                  })
                   
                  }
              })
          }
        })
      }
      else{
        ValidateService.getValidateMsg(
          validationErrMsgs,
          (getValidateMsgErr, errMsgs) => {
            if (getValidateMsgErr) {
              Logger.error(
                `ApplicationController.forwardTermExtenstionResponse at ValidateService.getValidateMsg ${getValidateMsgErr}`
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
  dashboardForAdminAndCoordinator(req,res){
    Logger.debug(`ApplicationController.dashboardForAdminAndCoordinator`)
      var date = new Date();
      
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1);
      console.log("first date",firstDay)
      console.log("last date",lastDay)
      ApplicationService.generateCurrentMonthReport(firstDay,lastDay,(err,results)=>{
        if (err) {
          Logger.error(`ApplicationController.dashboardForAdminAndCoordinator ${sails.config.serverMessage.serverError}`)
          res.send({ status: 300, message: sails.config.serverMessage.serverError });
        } else {
          Logger.debug(`ApplicationController.dashboardForAdminAndCoordinator at ApplicationService.generateReport ${results}`)
          res.send({ status: 200, data: results, message: 'Proposal found successfully' });
        }
      })
  },
  monthlyDashboardForAdminAndCoordinator(req,res){
    Logger.debug(`ApplicationController.monthlyDashboardForAdminAndCoordinator`)
    var startDate=new Date(req.body.startDate);
    var endDate=new Date(req.body.endDate)
    var endDate1=new Date(endDate.getFullYear(),endDate.getMonth(),endDate.getDate()+1);
      
      if(startDate>endDate){
        res.send({ status: 300, message: 'End date should be greator than start date' });
      }
      else{
        ApplicationService.monthlyDashboardForAdminAndCoordinator(startDate,endDate,endDate1,(err,results)=>{
          if (err) {
            Logger.error(`ApplicationController.monthlyDashboardForAdminAndCoordinator ${sails.config.serverMessage.serverError}`)
            res.send({ status: 300, message: sails.config.serverMessage.serverError });
          } else {
            Logger.debug(`ApplicationController.monthlyDashboardForAdminAndCoordinator at ApplicationService.monthlyDashboardForAdminAndCoordinator ${results}`)
            res.send({ status: 200, data: results, message: 'Proposal found successfully' });
          }
        })
      }
        
    
  },
  yearlyDashboardForAdminAndCoordinator(req,res){
    Logger.debug(`ApplicationController.yearlyDashboardForAdminAndCoordinator`)
    var startDate=new Date(req.body.startDate);
    var endDate=new Date(req.body.endDate)
    var lastDay = new Date(endDate.getFullYear(), endDate.getMonth() , endDate.getDate()+1);
    let diffYears=endDate.getFullYear()-startDate.getFullYear()
    console.log("differnce in years",diffYears)
    if(diffYears >11){
      res.send({ status: 300, message: 'Selected date should not exceed more than 12 years' });
    }
    else{
      ApplicationService.yearlyDashboardForAdminAndCoordinator(startDate,lastDay,(err,results)=>{
        if (err) {
          Logger.error(`ApplicationController.yearlyDashboardForAdminAndCoordinator ${sails.config.serverMessage.serverError}`)
          res.send({ status: 300, message: sails.config.serverMessage.serverError });
        } else {
          Logger.debug(`ApplicationController.yearlyDashboardForAdminAndCoordinator at ApplicationService.yearlyDashboardForAdminAndCoordinator ${results}`)
          res.send({ status: 200, data: results, message: 'Data requests found successfully' });
        }
      })
  
    }
   
  }
};
