const ObjectId = require('mongodb').ObjectID;

module.exports = {

  /** For getting what type of report to be submitted */
  saveReportType(req, res) {
    Logger.debug('ReportController.saveReportType');
    const proposalId = req.body.proposalId;
    const investigatorId = new ObjectId(req.session.user.id);

    if (!proposalId) {
      return res.send({ status: 300, message: sails.config.serverMessage.serverError });
    }
    if (!investigatorId) {
      return res.send({ status: 300, message: sails.config.serverMessage.serverError });
    }
    ReportService.getReports(proposalId, (getErr, reports) => {
      let reportType;
      if (getErr) {
        Logger.error(`ReportController.saveReportType at ReportService.getReports ${getErr}`);
        console.log(`ReportController.saveReportType at ReportService.getReports ${getErr}`);
      }
      else if (reports.length === 0) {
        console.log('reports data when array length 0', reports);
        if (req.body.reportType === 'Intermediate Report') {
          reportType = 0
        } else if (req.body.reportType === 'Final Report') {
          reportType = 1
        }
        else if (req.body.reportType === 'Data Report') {
          reportType = 2
        }
        ReportService.saveReportType({
          proposalId: proposalId,
          investigatorId: investigatorId,
          reportType: reportType,
          report: {}
        }, (err1, savedReport) => {
          if (err1) {
            return res.send({ status: 300, message: sails.config.serverMessage.serverError });
          } else {
            console.log('saved new report', savedReport);
            ApplicationService.getProposal(proposalId, investigatorId, (error, proposal) => {
              if (error) {
                if (error === 'Proposal Not of this user') {
                  console.log('proposal found error')
                  return res.send({ status: 300, message: sails.config.serverMessage.invalidURL, notUserProposal: 'notUserProposal' });
                } else {
                  return res.send({ status: 300, message: sails.config.serverMessage.serverError });
                }
              } else {
                console.log('got proposal data', proposal);
                console.log('report type from updated data', savedReport.reportType);
                if (savedReport.reportType === 0) {
                  ApplicationService.updateProposal(proposalId, { reportType: savedReport.reportType, isIntermediateReportType: true }, null, (err2, proposal2) => {
                    if (err2) {
                      console.log('ReportController error in updating proposal', err2)
                      return res.send({ status: 300, message: sails.config.serverMessage.serverError });
                    }
                    else {
                      console.log('ReportController - successfully updated proposal after submitting intermediate report', proposal2)
                    }
                  });
                }
                else if (savedReport.reportType === 1) {
                  ApplicationService.updateProposal(proposalId, { reportType: savedReport.reportType, isFinalReportType: true }, null, (err2, proposal2) => {
                    if (err2) {
                      console.log('ReportController error in updating proposal', err2)
                      res.send({ status: 300, message: sails.config.serverMessage.serverError });
                    }
                    else {
                      console.log('ReportController -  successfully updated proposal after submitting final report', proposal2)
                    }
                  });
                }

                else if (savedReport.reportType === 2) {
                  ApplicationService.updateProposal(proposalId, { reportType: savedReport.reportType, isDataReportType: true }, null, (err2, proposal2) => {
                    if (err2) {
                      console.log('ReportController error in updating proposal', err2)
                      res.send({ status: 300, message: sails.config.serverMessage.serverError });
                    }
                    else {
                      console.log('ReportController -  successfully updated proposal after submitting data report', proposal2)
                    }
                  });
                }
              }
            });
            return res.send({ status: 200, message: sails.config.serverMessage.setReportTypeSuccess, reportData: savedReport });
          }
        });
      }
      else {
        console.log('reports data', reports);
        ApplicationService.getProposal(proposalId, investigatorId, (err1, proposal) => {
          if (err1) {
            if (err1 === 'Proposal Not of this user') {
              console.log('proposal found error')
              return res.send({ status: 300, message: sails.config.serverMessage.invalidURL, notUserProposal: 'notUserProposal' });
            } else {
              return res.send({ status: 300, message: sails.config.serverMessage.serverError });
            }
          }
          else {
            console.log('got proposal data in else', proposal);
            if (proposal.reportType === 0 && req.body.reportType === 'Intermediate Report') {
              return res.send({ status: 409, message: 'Intermediate report already exist' });
            }
            else if (proposal.reportType === 1 && req.body.reportType === 'Final Report') {
              return res.send({ status: 409, message: 'Final report already exist' });
            }
            else if (proposal.reportType === 2 && req.body.reportType === 'Data Report') {
              return res.send({ status: 409, message: 'Data report already exist' });
            }
            else {
              if (req.body.reportType === 'Intermediate Report') {
                reportType = 0
              } else if (req.body.reportType === 'Final Report') {
                reportType = 1
              }
              else if (req.body.reportType === 'Data Report') {
                reportType = 2
              }
              ReportService.saveReportType({
                proposalId: proposalId,
                investigatorId: investigatorId,
                reportType: reportType,
                report: {}
              }, (error1, updatedReport) => {
                if (error1) {
                  res.send({ status: 300, message: sails.config.serverMessage.serverError });
                } else {
                  if (updatedReport.reportType === 0) {
                    ApplicationService.updateProposal(proposalId, { reportType: updatedReport.reportType, isIntermediateReportType: true }, null, (err2, proposal2) => {
                      if (err2) {
                        Logger.error('ReportController.saveReportType at ReportService.saveReportType', err2)
                        return res.send({ status: 300, message: sails.config.serverMessage.serverError });
                      }
                      else {
                        console.log('ReportController - successfully updated proposal after submitting intermediate report', proposal2)
                      }
                    });
                  }
                  else if (updatedReport.reportType === 1) {
                    ApplicationService.updateProposal(proposalId, { reportType: updatedReport.reportType, isFinalReportType: true }, null, (err2, proposal2) => {
                      if (err2) {
                        console.log('error in updating proposal', err2)
                        return res.send({ status: 300, message: sails.config.serverMessage.serverError });
                      }
                      else {
                        console.log('ReportController - successfully updated proposal after submitting intermediate report', proposal2)
                      }
                    });
                  }
                  else if (updatedReport.reportType === 2) {
                    ApplicationService.updateProposal(proposalId, { reportType: updatedReport.reportType, isDataReportType: true }, null, (err2, proposal2) => {
                      if (err2) {
                        console.log('ReportController at ApplicationService.updateProposal error in updating proposal', err2)
                        return res.send({ status: 300, message: sails.config.serverMessage.serverError });
                      }
                      else {
                        console.log('ReportController - successfully updated proposal after submitting intermediate report', proposal2)
                      }
                    });
                  }
                  res.send({ status: 200, message: sails.config.serverMessage.setReportTypeSuccess, reportData: updatedReport });
                }
              });
            }
          }
        });
      }
    })
  },

  /**For uploading the report */
  updateReport(req, res) {
    Logger.debug('ReportController.updateReport');
    const proposalId = req.body.proposalId;
    let reportType;
    if (req.body.reportType === 'Intermediate Report')
      reportType = 0;
    else if (req.body.reportType === 'Final Report')
      reportType = 1;
    else if (req.body.reportType === 'Data Report')
      reportType = 2;
    const comment = req.body.comment;
    if (!proposalId) {
      Logger.warn('Proposal id not found');
      console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhh');
      console.log(sails.config.appPath);
      res.send({ status: 300, message: sails.config.serverMessage.serverError });
    } else {
      req.file('file').upload({
        adapter: require('skipper-disk'),
        maxBytes: 50000000,
        dirname: require('path').resolve(`files/InvestigatorReports/${proposalId}`)
      }, (uploadErr, files) => {
        if (uploadErr) {
          Logger.error(`ReportController.uploadReports at req.file ${uploadErr}`);
          console.log(`ReportController.uploadReports at req.file ${uploadErr}`)
          res.send({ status: 300, message: sails.config.serverMessage.fileUploadError });
        } else if (files.length === 0) {
          Logger.warn('No document was uploaded');
          res.send({ status: 300, message: 'No document was uploaded' });
        } else {
          const file = files[0];
        
          console.log('file saved to DB');
          console.log(file);

          console.log('file extension')
          console.log(file.fd.split('.').pop());

          
          console.log('file extension type', file.fd.split('.').pop())
          if (file.fd.split('.').pop() === 'doc' ||
            file.fd.split('.').pop() === 'docx' ||
            file.fd.split('.').pop() === 'xls'
            || file.fd.split('.').pop() === 'xlsx'|| 
            file.fd.split('.').pop() === 'pdf'
            ) {
            const fileLocArray = file ? file.fd.split('/') : [];
            console.log("fileLocArray", fileLocArray);
            const fileLoc = fileLocArray[fileLocArray.length - 1];
            console.log("fileLoc", fileLoc);

            const uploadFile = {
              // uid: fileLoc,
              comment,
              size: file.size,
              type: file.type,
              name: file.filename,
              url: `/InvestigatorReports/${proposalId}/${fileLoc}`,
              status: 'done',
            };
            Logger.verbose(uploadFile);
            console.log('uploaded file', uploadFile.url);
            console.log('report Data*****************')
            
            
            const reportData ={};
            
            reportData[req.body.fileName] =uploadFile ;
            
            

            console.log('reportData in controller', reportData);
            ReportService.updateReport(proposalId, reportType, reportData, (err, updatedReport) => {
              if (err) {
                console.log('error after update before email')
                res.send({ status: 300, message: sails.config.serverMessage.serverError });
              } else {
                //email to investigator
                const investigatorId = new ObjectId(req.session.user.id);
                console.log('investigator Id after update before email', investigatorId)
                ApplicationService.getProposal(proposalId, investigatorId, (err1, proposalData) => {
                  if (err1) {
                    if (err1 === 'Proposal Not of this user') {
                      res.send({ status: 300, message: sails.config.serverMessage.invalidURL, notUserProposal: 'notUserProposal' });
                    } else {

                      res.send({ status: 300, message: sails.config.serverMessage.serverError });
                    }
                  } else {
                    let finalProposalData;
                   if(proposalData.reportData !== undefined){
                     finalProposalData={...proposalData.reportData,...reportData};
                     console.log('finalProposalData******')
                     console.log(finalProposalData)

                   }
                   else{
                    finalProposalData = reportData
                   }
                    console.log('got proposal data', proposalData);
                    console.log('report type from updated data', updatedReport[0].reportType);
                    if (updatedReport[0].reportType === 0) {
                      ApplicationService.updateProposal(proposalId, { isIntermediateReportSubmitted: true,reportData:finalProposalData }, { date: new Date(), status: 'Submitted Intermediate Report' }, (err2, proposal2) => {
                        if (err2) {
                          console.log('ReportController error in updating proposal', err2)
                          res.send({ status: 300, message: sails.config.serverMessage.serverError });
                        }
                        else {
                          console.log('ReportController - successfully updated proposal after submitting intermediate report', proposal2)
                        }
                      });
                      EmailService.SubmittedIntermediateReportToInvestigator(proposalData.title, req.session.user, updatedReport[0]);
                    }
                    else if (updatedReport[0].reportType === 1) {
                      ApplicationService.updateProposal(proposalId, { isFinalReportSubmitted: true,reportData:finalProposalData }, { date: new Date(), status: 'Submitted Final Report' }, (err2, proposal2) => {
                        if (err2) {
                          console.log('ReportController.updateReport at ApplicationService.updateProposal error in updating proposal', err2)
                          res.send({ status: 300, message: sails.config.serverMessage.serverError });
                        }
                        else {
                          console.log('ReportController -  successfully updated proposal after submitting final report', proposal2)
                        }
                      });
                      EmailService.SubmittedFinalReportToInvestigator(proposalData.title, req.session.user, updatedReport[0]);
                    }

                    else if (updatedReport[0].reportType === 2) {
                      ApplicationService.updateProposal(proposalId, { isDataReportSubmitted: true ,reportData:finalProposalData}, { date: new Date(), status: 'Submitted Data Report' }, (err2, proposal2) => {
                        if (err2) {
                          console.log('ReportController.updateReport error in updating proposal', err2)
                          res.send({ status: 300, message: sails.config.serverMessage.serverError });
                        }
                        else {
                          console.log('ReportController -  successfully updated proposal after submitting data report', proposal2)
                        }
                      });
                      EmailService.SubmittedDataReportToInvestigator(proposalData.title, req.session.user, updatedReport[0]);
                    }
                    InternalUserService.getCoordinator((error, coordinator) => {
                      if (error) {
                        res.send({ status: 300, message: error.message });
                      }
                      else {
                        console.log('coordinator data', coordinator[0])
                        if (updatedReport[0].reportType === 0)
                          EmailService.SubmittedIntermediateReportToCoordinator(proposalData.title, coordinator[0], updatedReport[0]);
                        else if (updatedReport[0].reportType === 1)
                          EmailService.SubmittedFinalReportToCoordinator(proposalData.title, coordinator[0], updatedReport[0]);
                        else if (updatedReport[0].reportType === 2)
                          EmailService.SubmittedDataReportToCoordinator(proposalData.title, coordinator[0], updatedReport[0]);
                      }
                    });
                  }
                });
                res.send({ status: 200, message: sails.config.serverMessage.uploadFileSuccess, reportData: updatedReport });
              }
            });
          }
          else {
            res.send({ status: 400, message: sails.config.serverMessage.fileUploadError });
          }
        }
      });
    }
  },
  reportForCoordinator(req, res) {
    Logger.debug('ReportController.reportForCoordinator');
    const proposalId = req.params['proposalId'];
    const reportType = parseInt(req.params['reportType']);
    ReportService.reportForCoordinator(proposalId, reportType, (err, foundReport) => {
      if (err) {
        console.log(err)
        res.send({ status: 300, message: 'Server error. Please try again.' });
      } else {
        res.send({ status: 200, message: sails.config.serverMessage.reportURLFound, URL: foundReport.report.url, });
      }
    });
  },
}