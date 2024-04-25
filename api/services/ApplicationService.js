const ObjectId = require('mongodb').ObjectID;

module.exports = {
  getInvestigatorProposals(investigatorId, callback) {
    Logger.debug('ApplicationService.getInvestigatorProposals');

    Logger.verbose(`investigatorId : ${investigatorId}`);

    Application.findProposalByInvestigator({ isActive: true, isProposal: true, investigatorId }, (err, proposalData) => {
      if (err) {
        Logger.error(`ApplicationService.getInvestigatorProposals at Application.findActivesByCriteria ${err}`);
        callback(err);
      } else {
        callback(null, proposalData);
      }
    });
  },
  saveProposal(proposalData, callback) {
    Logger.debug('ApplicationService.saveProposal');
    console.log('ApplicationService.saveProposal', proposalData);
    Application.createApplication(proposalData, (err, savedProposal) => {
      console.log('savedProposal before', savedProposal);
      if (err) {
        console.log('error', err);
        Logger.error(`ApplicationService.saveProposal at Application.createApplication ${err}`);
        callback(err);
      } else {
        Logger.info('Application details saved successfully.');
        console.log('savedProposal after', savedProposal);

        callback(null, savedProposal);
      }
    });
  },

  updateProposal(proposalId, proposalData, timelineData, callback) {
    Logger.debug('ApplicationService.updateProposal');
    Logger.verbose(proposalId);
    console.log('proposalID', proposalId);

    Application.findActiveByCriteria({ proposalId }, (err, proposal) => {
      if (err) {
        Logger.error(`ApplicationService.registration at ApplicationService.findActiveByCriteria ${err}`);
        callback(err);
      } else if (proposal) {
        if (timelineData){
          Application.updateRecord(proposalId, proposalData,timelineData, (error, updatedProposal) => {
            if (err) {
              Logger.error(`ApplicationService.updateProposal at Application.updateActiveById ${error}`);
              callback(error);
            } else {
              Logger.info('Application details updated successfully.');
              Application.findActiveByCriteria({ proposalId }, (err1, proposal1) => {
                if(err1){
                  Logger.error(`ApplicationService.registration at ApplicationService.findActiveByCriteria ${err1}`);
                  callback(err1);
                }
                else{
                  Logger.info('Application details updated successfully.');
                  callback(null, [proposal1]);
                }
              })
            }
          });
        } else {
          Application.updateActiveById(proposalId, proposalData, (error, updatedProposal) => {
            if (error) {
              Logger.error(`ApplicationService.updateProposal at Application.updateActiveById ${error}`);
              callback(error);
            } else {
              Logger.info('Application details updated successfully.');
              callback(null, updatedProposal);
            }
          });
        }
      } else {
        console.log('proposal...................', proposal);
        Logger.warn('proposal id not present.');
        callback('Not Present');
      }
    });
  },
  updateProposalForTermExtension(proposalId,proposalData,callback){
    Logger.debug('ApplicationService.updateProposalForTermExtension');
    Logger.verbose(proposalId);
    console.log('proposalID', proposalId);

    Application.findActiveByCriteriaAndUpdate({ proposalId },proposalData, (err, proposal) => {
     if(err){
      console.log("Application.findActiveByCriteriaAndUpdat",err)
     }
     else{
       return callback(null,proposal)
     }
    });
  } , 
  getProposal(proposalId, investigatorId, callback) {
    Logger.debug('ApplicationService.getProposal');
    console.log('ApplicationService.getProposal++++++++++++++++++++++++++++++++++++++++++');
    console.log('proposalId', proposalId);
    console.log('type of proposalId', typeof proposalId);

    console.log('investigatorId', investigatorId);
    console.log('type of investigatorId', typeof investigatorId);

    Application.findProposalByInvestigator({
      proposalId, investigatorId, isActive: true, isSubmitted: false,
    }, (err, proposalData) => {
      if (err) {
        Logger.error(`ApplicationService.getProposal at Application.findActiveById ${err}`);
        callback(err);
      } else if (proposalData.length === 0) {
        callback('Proposal Not of this user');
      } else {
        console.log('proposalData in get proposal', proposalData);
        callback(null, proposalData[0]);
      }
    });
  },
  getProposalByProposalId(proposalId, callback) {
    Logger.debug('ApplicationService.getProposalByProposalId');
    console.log('proposalId', proposalId);
    console.log('type of proposalId', typeof proposalId);

    Application.findProposalByInvestigator({proposalId}, (err, proposalData) => {
      if (err) {
        Logger.error(`ApplicationService.getProposal at Application.findProposalByInvestigator ${err}`);
        callback(err);
      } else if (proposalData.length === 0) {
        callback('Proposal Not found');
      } else {
        callback(null, proposalData[0]);
      }
    });
  },

  getProposalHistory(proposalId, callback) {
    Logger.debug('ApplicationService.getProposalHistory');

    Application.findByCriteria({proposalId}, (err, proposalData) => {
      if (err) {
        Logger.error(`ApplicationService.getProposalHistory at Application.findByCriteria ${err}`);
        callback(err);
      } else if (proposalData.length === 0) {
        callback('Proposal Not of this user');
      } else {
        console.log('proposalData in get proposal', proposalData);
        callback(null, proposalData[0].timeline);
      }
    });
  },
  searchProposal(searchTerm, callback) {
    Logger.debug('ApplicationService.searchProposal');
    Application.searchProposalByTitle(searchTerm, (err, proposalData) => {
      if (err) {
        Logger.error(`ApplicationService.searchProposal at Application.findByCriteria ${err}`);
        callback(err);
      } else {
        console.log('proposalData in get proposal', proposalData);
        callback(null, proposalData);
      }
    });
  },
  searchResearch(searchTerm, callback) {
    Logger.debug('ApplicationService.searchResearch');
    Application.searchResearchByTitle(searchTerm, (err, researchData) => {
      if (err) {
        Logger.error(`ApplicationService.searchResearch at Application.searchResearchByTitle ${err}`);
        callback(err);
      } else {
        console.log('searchResearch', researchData);
        callback(null, researchData);
      }
    });
  },
  getProposalForView(proposalId, investigatorId, callback) {
    Logger.debug('ApplicationService.getProposalForView');
    console.log('proposalId getProposalForView', proposalId);

    console.log('investigatorId getProposalForView', investigatorId);
    Application.findProposalByInvestigator({
      proposalId,
      investigatorId,
      isActive: true,
    }, (err, proposalData) => {
      console.log('proposalData.length', proposalData);

      if (err) {
        console.log(proposalData.length);
        Logger.error(`ApplicationService.getProposal at Application.findActiveById ${err}`);
        callback(err);
      } else if (proposalData.length === 0) {
        callback('Proposal Not of this user');
      } else {
        console.log('proposalData in get proposal', proposalData);
        callback(null, proposalData[0]);
      }
    });
  },
  getResearchForView(proposalId, investigatorId, callback) {
    Logger.debug('ApplicationService.getProposalForView');
    console.log('proposalId getProposalForView', proposalId);

    console.log('investigatorId getProposalForView', investigatorId);
    Application.findProposalByInvestigator({
      isResearch: true,
      proposalId,
      investigatorId,
      isActive: true,
    }, (err, proposalData) => {
      console.log('proposalData.length', proposalData);

      if (err) {
        console.log(proposalData.length);
        Logger.error(`ApplicationService.getResearchForView at Application.findProposalByInvestigator ${err}`);
        callback(err);
      } else if (proposalData.length === 0) {
        callback('Proposal Not of this user');
      } else {
        console.log('proposalData in get proposal', proposalData);
        callback(null, proposalData[0]);
      }
    });
  },

  getAllProposal(callback) {
    Logger.debug('ApplicationService.getAllProposal');
    
    Application.findAllApplicationWithInvestigator({ isActive: true, isProposal: true, isSubmitted: true }, (err, proposalData) => {
      if (err) {
        Logger.error(`ApplicationService.getAllProposal at Application.findActivesByCriteria ${err}`);
        callback(err);
      } else {
        Logger.debug(`ApplicationService.getAllProposal at Application.findAllApplicationWithInvestigator`);
        Logger.debug(proposalData)
        callback(null, proposalData);
      }
    });
  },
  
  getAllProposalForReview(reviewerDetails, callback) {
    Logger.debug('ApplicationService.getAllProposalForReview');
    Application.findAllApplicationWithInvestigator({
      isActive: true, isProposal: true, isSubmitted: true, isUnderReview: true}, (err, proposalData) => {
      if (err) {
        Logger.error(`ApplicationService.getAllProposalForReview at Application.findActivesByCriteria ${err}`);
        callback(err);
      } else {
        InternalUser.findByCriteria({
          email: reviewerDetails.email,
          isActive: true,
          isVerified: true,
          isCommitteeMember: true,
        }, (findByIdErr, reviewerData) => {
          if (findByIdErr) {
            Logger.error(`ApplicationService.getAllProposalForReview at Application.findActivesByCriteria ${findByIdErr}`);
            callback(findByIdErr);
          } else if (reviewerData.length === 0) {
            callback(null, []);
          } else {
            callback(null, proposalData);
          }
        });
      }
    });
  },

  getAllProposalForSign(callback) {
    Logger.debug('ApplicationService.getAllProposalForReview');
    Application.findAllApplicationWithInvestigator({
      isActive: true, isProposal: true, isSubmitted: true, isUnderReview: false, isUnderSigned: true,
    }, (err, proposalData) => {
      if (err) {
        Logger.error(`ApplicationService.getAllProposalForReview at Application.findActivesByCriteria ${err}`);
        callback(err);
      } else {
        callback(null, proposalData);
      }
    });
  },
  getProposalExpectInvestigator(proposalId, callback) {
    Logger.debug('ApplicationService.getProposalExpectInvestigator');
    Application.findActiveById(proposalId, (err, proposalData) => {
      if (err) {
        Logger.error(`ApplicationService.getProposal at Application.findActiveById ${err}`);
        callback(err);
      } else if (!proposalData) {
        callback('Proposal if not match');
      } else {
        callback(null, proposalData);
      }
    });
  },
  getAllResearchForInvestigator(investigatorId, callback) {
    Logger.debug('ApplicationService.getAllResearchForInvestigator');
    Application.findProposalByInvestigator({ isActive: true, isResearch: true, investigatorId }, (err, proposalData) => {
      if (err) {
        Logger.error(`ApplicationService.getAllResearchForInvestigator at Application.findActivesByCriteria ${err}`);
        callback(err);
      } else {
        Logger.info(`ApplicationService.getAllResearchForInvestigator at Application.findActivesByCriteria ${proposalData}`);
        callback(null, proposalData);
      }
    });
  },

  getAllResearchForCoordinator(pageNo, callback) {
    Logger.debug('ApplicationService.getAllResearchForCoordinator');
    const skip = (pageNo - 1) * sails.config.recordsPerPage;

    Application.findAllApplicationWithInvestigatorWithPagination(skip,sails.config.recordsPerPage,{ isActive: true, isResearch: true }, (err, proposalData) => {
      if (err) {
        Logger.error(`ApplicationService.getAllResearchForCoordinator at Application.findActivesByCriteria ${err}`);
        callback(err);
      } else {
        Application.findAllApplicationWithInvestigatorCount({ isActive: true, isResearch: true }, (countErr, count) => {
          if (countErr) {
            Logger.error(`ApplicationService.getAllResearchForCoordinator at Application.findActivesByCriteria ${countErr}`);
            callback(countErr);
          } else {
            callback(null, proposalData, count);
          }
        });
      }
    });
  },

  getAllProposalResearchForCoordinator(callback) {
    Logger.debug('ApplicationService.getAllProposalResearchForCoordinator');

    Application.findAllApplicationWithInvestigator({ $or: [{ isActive: true, isSubmitted: true }, { isActive: true, isResearch: true }] }, (err, researchProposalData) => {
      if (err) {
        Logger.error(`ApplicationService.getAllProposalResearchForCoordinator at Application.findActivesByCriteria ${err}`);
        callback(err);
      } else {
        callback(null, researchProposalData);
      }
    });
  },
  sortAllResearch(pageNo,sort,callback){
    Logger.debug('ApplicationService.sortAllResearch');
    const skip = (pageNo - 1) * sails.config.recordsPerPage;

    Application.findAllApplicationWithSortPagination(skip,sails.config.recordsPerPage,sort,{ isActive: true,isResearch: true  }, (err, researchData) => {
      if (err) {
        Logger.error(`ApplicationService.sortAllResearch at Application.findAllApplicationWithSortPagination ${err}`);
        callback(err);
      } else {
        Application.findAllApplicationWithInvestigatorCount({ isActive: true, isResearch: true }, (countErr, count) => {
          if (countErr) {
            Logger.error(`ApplicationService.sortAllResearch at Application.findAllApplicationWithInvestigatorCount ${countErr}`);
            callback(countErr);
          } else {
            let finalResults=[]
            for(let i=skip;i<(skip+10);i++){
                finalResults.push(researchData[i])  
            }
            callback(null, finalResults, count);
          }
        });
      }
    });
  

  },
  getAllTermExtensionRequest(pageNo,criteria,callback){
    
    Logger.debug('ApplicationService.getAllTermExtensionRequest');
    const skip = (pageNo - 1) * sails.config.recordsPerPage;
    Application.findTermExtensionsByPagination(criteria,skip,sails.config.recordsPerPage, (err, termExtensions) => {
      if (err) {
        Logger.error(`ApplicationService.getAllTermExtensionRequest at Application.findByCriteria ${err}`);
        callback(err);
      } else {
            callback(null, termExtensions);
          }
        })
      
    },
    generateCurrentMonthReport(startDate,endDate,callback){
      let yearArray=[],monthArray=[],result=[]
      Logger.debug(`ApplicationService.generateCurrentMonthReport`)
      let date=new Date()
      let startDateForYear=new Date(date.getFullYear(),0,1)
      let endDateForYear=new Date(date.getFullYear(),11,31)
      Application.generateCurrentYearReport(startDateForYear,endDateForYear, (err, yearData) => {
        if (err) {
          Logger.error(`ApplicationService.generateCurrentMonthReport at Application.generateCurrentMonthReport ${err}`);
          callback(err);
        } else {
          Application.generateCurrentMonthReport(startDate,endDate, (error, monthData) => {
            if (error) {
              Logger.error(`ApplicationService.generateCurrentMonthReport at Application.generateCurrentMonthReport ${err}`);
              callback(error);
            } else {
              yearData.forEach(element => {
                if(element.proposalReceived>=0){
                  var yearlyReceivedProposal={type:"Proposal received",yearly:element.proposalReceived}       
                 yearArray.push(yearlyReceivedProposal)
                }
                if(element.proposalAccepted>=0){
                  var yearlyAcceptedProposal={type:"Proposal accepted",yearly:element.proposalAccepted}
                  yearArray.push(yearlyAcceptedProposal)
                }
                if(element.proposalDeclined>=0){
                  var yearlyDeclinedProposal={type:"Proposal declined",yearly:element.proposalDeclined}
                  yearArray.push(yearlyDeclinedProposal)
                }
                
              });
              monthData.forEach(element => {
                if(element.proposalReceived>=0){
                  var monthlyReceivedProposal={type:"Proposal received",monthly:element.proposalReceived}       
                  monthArray.push(monthlyReceivedProposal)
                }
                if(element.proposalAccepted>=0){
                  var monthlyAcceptedProposal={type:"Proposal accepted",monthly:element.proposalAccepted}
                  monthArray.push(monthlyAcceptedProposal)
                }
                if(element.proposalDeclined>=0){
                  var monthlyDeclinedProposal={type:"Proposal declined",monthly:element.proposalDeclined}
                  monthArray.push(monthlyDeclinedProposal)
                }
                
              });
                 result.push(yearArray)
                 result.push(monthArray)
                }
                callback(null,result)
              })
            }
          })
          
    },
    monthlyDashboardForAdminAndCoordinator(startDate,endDate,endDate1,callback){
      finalArray=[]
    var  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    Application.generateCurrentMonthReport(startDate, endDate1, (err, results) => {
      if (err) {
        console.log(err)
      }
      else {
        console.log("ApplicationService.monthlyDashboardForAdminAndCoordinator",results[0])
        let sortedArray=results.sort((a,b)=>{
          if(a._id.year !== b._id.year){
            return a._id.year - b._id.year;
         }else{
            return a._id.month - b._id.month;
         }
        })
        sortedArray.forEach(element => {
          let dateRange,searchStartDate,searchEndDate,month;
          if(element._id.month-1==startDate.getMonth() && element._id.year==startDate.getFullYear() &&
          element._id.month-1!=endDate.getMonth()){
            searchStartDate=(startDate.getDate()+months[element._id.month-1]+element._id.year)
            searchEndDate=new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0)
            dateRange= (searchStartDate+"-"+searchEndDate.getDate()+months[searchEndDate.getMonth()]+searchEndDate.getFullYear()) 
            month=(months[element._id.month-1]+"-"+element._id.year)
          }
          else if(element._id.month-1!=startDate.getMonth()
          && element._id.month-1!=endDate.getMonth()){
            searchStartDate = new Date(element._id.year, element._id.month-1, 1);
            searchEndDate = new Date(element._id.year, element._id.month-1 + 1, 0);
            dateRange= (searchStartDate.getDate()+months[searchStartDate.getMonth()]+searchStartDate.getFullYear()+"-"+searchEndDate.getDate()+months[searchEndDate.getMonth()]+searchEndDate.getFullYear()) 
            month=(months[element._id.month-1]+"-"+element._id.year)
          }
          else if(element._id.month-1!=startDate.getMonth() 
          && element._id.month-1==endDate.getMonth()){
            searchStartDate = new Date(element._id.year, element._id.month-1, 1);
            searchEndDate = (endDate.getDate()+months[element._id.month-1]+element._id.year)
            dateRange= (searchStartDate.getDate()+months[searchStartDate.getMonth()]+searchStartDate.getFullYear()+"-"+searchEndDate) 
            month=(months[element._id.month-1]+"-"+element._id.year)
          }
          else if(startDate.getMonth()==endDate.getMonth() && startDate.getFullYear()==endDate.getFullYear()){
            dateRange= (startDate.getDate()+months[startDate.getMonth()]+startDate.getFullYear()+"-"+endDate.getDate()+months[endDate.getMonth()]+endDate.getFullYear()) 
            month=(months[element._id.month-1]+"-"+element._id.year)
          }
          var obj={
            month:month,dateRange:dateRange,proposalReceived:element.proposalReceived,
            proposalDeclined:element.proposalDeclined,proposalAccepted:element.proposalAccepted
            }
         finalArray.push(obj)
       });
       callback(null, finalArray)  
      }
      
    })
    },
    yearlyDashboardForAdminAndCoordinator(startDate,endDate,callback){
      finalArray=[]
     Application.generateCurrentYearReport(startDate, endDate, (err, results) => {
      if (err) {
        console.log(err)
      }
      else {
        console.log("ApplicationService.generateYearlyReport",results)
        results.forEach(element => {
          let year=element._id.year
            var obj={
              year:year,proposalReceived:element.proposalReceived,proposalDeclined:element.proposalDeclined,
              proposalAccepted:element.proposalAccepted
            }
            finalArray.push(obj)   
        });
        
      }
      let sortedArray=finalArray.sort((a,b)=>{return a.year-b.year})
      callback(null, sortedArray)
    })
    }
  // getAllProposals(callback) {
  //   Logger.debug('ApplicationService.getAllProposals');

  //   Application.findAllApplicationWithInvestigator({ $or: [{ isActive: true, isSubmitted: true },{ isActive: true, isSubmitted: false }] }, (err, proposalData) => {
  //     if (err) {
  //       Logger.error(`ApplicationService.getAllProposals at Application.findActivesByCriteria ${err}`);
  //       callback(err);
  //     } else {
  //       callback(null, proposalData);
  //     }
  //   });
  // },
};
