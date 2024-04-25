const DataRequest = require("../models/DataRequest");
const AgendaService = require("./AgendaService");

module.exports = {
  saveDataRequest(data, callback) {
    Logger.debug('DataRequestService.saveDataRequest');
    Logger.debug(data);

    const dateReceived = new Date();
    let reminderDate = new Date();
    reminderDate.setDate(
      reminderDate.getDate() + 3
    );
    console.log('date of request received', dateReceived);
    data.dateReceived = dateReceived;
    data.isSubmitted = true;

    let docketNo;
    if ((new Date().getMonth() + 1) > 0 && (new Date().getMonth() + 1) <= 9)
      docketNo = `00001-0${new Date().getMonth() + 1}-${new Date().getFullYear()}`;
    else
      docketNo = `00001-${new Date().getMonth() + 1}-${new Date().getFullYear()}`;
    console.log('hard coded docket number', docketNo)

    let regExpToSearch = `${new Date().getMonth() + 1}-${new Date().getFullYear()}`;
    console.log('regExpToSearch', regExpToSearch)

    DataRequest.findData({ docketNo: { $regex: regExpToSearch } }, (err, foundRequests) => {
      if (err) {
        console.log('error in getting docket number', err)
      }
      else {
        console.log("foundRequests", foundRequests);
        let splittedDocketNo = docketNo.split('-');
        console.log('splittedDocketNo', splittedDocketNo);

        if (foundRequests.length === 0) {
          data.docketNo = `0000${parseInt(splittedDocketNo[0])}-${splittedDocketNo[1]}-${splittedDocketNo[2]}`;

          console.log('requestData in if', data)
        }
        else {
          console.log('foundRequests.length', foundRequests.length)
          foundRequests.sort((a, b) => { return new Date(b.dateReceived) - new Date(a.dateReceived) });//ascending sort
          console.log('sortedArr', foundRequests)
          let arr = foundRequests[0].docketNo.split('-')
          console.log('type of arr', typeof arr[1]);

          if (arr[0] < '00009') {
            console.log('type of arr in if', arr[0]);
            data.docketNo = `0000${parseInt(arr[0]) + 1}-${arr[1]}-${arr[2]}`;
          }
          else if (arr[0] >= '00009' && arr[0] <= '00099') {
            console.log('type of arr in else if', arr[0]);
            data.docketNo = `000${parseInt(arr[0]) + 1}-${arr[1]}-${arr[2]}`;
          }
          console.log('requestData in else', data)
        }
        DataRequest.saveDataRequest(data, (error, savedRequest) => {
          if (error) {
            Logger.error(`DataRequestService.saveDataRequest at DataRequest.saveDataRequest ${error}`);
            callback(error);
          } else {
            AgendaService.startAgendaForDataRequestReminder(reminderDate, savedRequest)
            Logger.info('Data request saved successfully.');
            console.log('saved request data', savedRequest);
            callback(null, savedRequest);
          }
        });
      }
    });
  },

  updateRequestForData(id, dataToUpdate, timelineData, callback) {
    Logger.debug('DataRequestService.updateRequestForData');
    Logger.debug(dataToUpdate);

    DataRequest.updateDataRequestById(id, dataToUpdate, (err, updatedRequest) => {
      console.log('amendment in service', updatedRequest);
      if (err) {
        Logger.error(`DataRequestService.updateRequestForData at DataRequest.updateDataRequestById ${err}`);
        callback(err);
      }
      else {
        Logger.debug(`DataRequestService.updateRequestForData at DataRequest.updateDataRequestById`);
        Logger.debug(updatedRequest)
        callback(null, updatedRequest);
      }
    });
  },

  trackDataRequest(trackId, callback) {
    results=[]
    Logger.debug('DataRequestService.trackDataRequest');
    console.log('DataRequestService.trackDataRequest', trackId);

    DataRequest.findDataByCriteria({ docketNo: trackId }, (err, fetchedData) => {
      if (err) {
        console.log('error while fetching request data', err);
        Logger.error(`DataRequestService.trackDataRequest at DataRequest.saveReportType ${err}`);
        callback(err);
      } else {
        Logger.info('Request data fetched successfully.');
        let status;
        if(fetchedData.isSubmitted===true && fetchedData.isApproved===true){
            status="Approved"
            let obj={datarequest:fetchedData,status:status}
            results.push(obj)
        }
       else if(fetchedData.isSubmitted===true && fetchedData.isRejected===true){
          status="Rejected"
          let obj={datarequest:fetchedData,status:status}
          results.push(obj)
      }
       else if(fetchedData.isSubmitted===true && fetchedData.isCompleted===true){
        status="Mark complete"
        let obj={datarequest:fetchedData,status:status}
        results.push(obj)
       }
       else if(fetchedData.isSubmitted===true && fetchedData.isInCompleted===true){
        status="Rejected"
        let obj={datarequest:fetchedData,status:status}
        results.push(obj)
       }
       else if(fetchedData.isSubmitted===true){
        status="Submitted"
        let obj={datarequest:fetchedData,status:status}
        results.push(obj)
       }
        callback(null, results);
      }
    });
  },

  dataRequests(pageNo, callback) {
    Logger.debug('DataRequestService.dataRequests');
    const skip = (pageNo - 1) * sails.config.recordsPerPage;
    DataRequest.findRequestsByCriteria({}, skip, (err, dataRequests) => {
      if (err) {
        Logger.error(`DataRequestService.dataRequests at DataRequest.findRequestsByCriteria ${err}`);
        callback(err);
      } else {
        DataRequest.countByCriteria({}, (countErr, count) => {
          if (countErr) {
            Logger.error(`DataRequestService.dataRequests at DataRequest.countByCriteria ${countErr}`);
            callback(err);
          } else {
            callback(null, dataRequests, count);
          }
        });
      }
    });
  },
  updateRequest(docketNo, requestData, callback) {
    Logger.debug('DataRequestService.updateRequest');

    DataRequest.updateByDocketNo(docketNo, requestData, (error, updatedData) => {
      if (error) {
        Logger.error(`DataRequestService.updateRequest at DataRequest.updateByDocketNo ${error}`);
        callback(error);
      } else {
        Logger.info('Request details updated successfully.');
        callback(null, updatedData);
      }
    });
  },
  searchDataRequest(searchTerm, user, callback) {
    Logger.debug('DataRequestService.searchDataRequest');
    if (user.role == 8) {
      DataRequest.searchDataRequestByIdAndTitle(searchTerm, (err, dataRequests) => {
        if (err) {
          Logger.error(`DataRequestService.searchDataRequest at DataRequest.searchDataRequestByIdAndTitle ${err}`);
          callback(err);
        } else {
          console.log('DataRequest in get DataRequest', dataRequests);
          callback(null, dataRequests);
        }
      });
    }
    if (user.role == 9) {
      DataRequest.searchDataRequestByIdAndTitleOfPSHMS({ refferedTo: 9 }, { refferedToPSHMS: 9 }, searchTerm, (err, dataRequests) => {
        if (err) {
          Logger.error(`DataRequestService.searchDataRequest at DataRequest.searchDataRequestByIdAndTitleOfPSHMS ${err}`);
          callback(err);
        } else {
          console.log('DataRequest in get DataRequest', dataRequests);
          callback(null, dataRequests);
        }
      });
    }
    if (user.role == 10) {
      DataRequest.searchDataRequestByIdAndTitleOfHead({ refferedTo: 10 }, searchTerm, (err, dataRequests) => {
        if (err) {
          Logger.error(`DataRequestService.searchDataRequest at DataRequest.searchDataRequestByIdAndTitleOfHead ${err}`);
          callback(err);
        } else {
          console.log('DataRequest in get DataRequest', dataRequests);
          callback(null, dataRequests);
        }
      });
    }
  },

  getAllDataRequest(pageNo, callback) {
    const skip = (pageNo - 1) * sails.config.recordsPerPage;
    DataRequest.findByCriteria({}, skip, (err, dataRequestData) => {
      if (err) {
        callback(err);
      } else {
        DataRequest.countDataRequestByCriteria({}, (countErr, count) => {
          if (countErr) {
            callback(countErr);
          } else {
            callback(null, dataRequestData, count);
          }
        });
      }
    });

  },
  getAllDataRequestOfPSHMS(pageNo, callback) {
    const skip = (pageNo - 1) * sails.config.recordsPerPage;
    DataRequest.findByOrCriteria({ refferedTo: 9 }, { refferedToPSHMS: 9 }, skip, (err, dataRequestData) => {
      if (err) {
        callback(err);
      } else {
        DataRequest.countDataRequestByCriteria({ refferedTo: 9 }, (countErr, count) => {
          if (countErr) {
            callback(countErr);
          } else {
            callback(null, dataRequestData, count);
          }
        });
      }
    })
  },
  getAllDataRequestOfHoRIDAMIT(pageNo, callback) {
    const skip = (pageNo - 1) * sails.config.recordsPerPage;
    DataRequest.findByCriteria({ refferedTo: 10 }, skip, (err, dataRequestData) => {
      if (err) {
        callback(err);
      } else {
        DataRequest.countDataRequestByCriteria({ refferedTo: 10 }, (countErr, count) => {
          if (countErr) {
            callback(countErr);
          } else {
            callback(null, dataRequestData, count);
          }
        });
      }
    });

  },


  generateReport(startDate, endDate, callback) {
    let finalArray = [], organizationalApproved = 0, organizationalRejected = 0, individualApproved = 0, individualRejected = 0;
    let organizationalPending = 0, individualPending = 0, markIncompleteCount = 0
    DataRequest.findByDateCritria(startDate, endDate, (err, amendmentData) => {
      if (err) {
        callback(err);
      } else {
        amendmentData.forEach(element => {
          console.log("elemnet", element)
          if (element.typeOfApplication == "organizational" && element.isApproved === true) {
            organizationalApproved++;
          }
          else if (element.typeOfApplication == "organizational" && element.isRejected === true) {
            organizationalRejected++;
          }
          else if (element.typeOfApplication == "organizational" && element.isApproved === false && element.isRejected === false && element.isCompleted === false && element.isInCompleted === false) {
            organizationalPending++;
          }
          else if (element.typeOfApplication == "individualStatus" && element.isApproved === true) {
            individualApproved++;
          }
          else if (element.typeOfApplication == "individualStatus" && element.isRejected === true) {
            individualRejected++;
          }
          else if (element.typeOfApplication == "individualStatus" && element.isApproved === false && element.isRejected === false && element.isCompleted === false && element.isInCompleted === false) {
            individualPending++;
          }
          else if (element.isInCompleted === true) {
            markIncompleteCount++;
          }
        });
        var obj1 = {
          type: "Approved", organization: organizationalApproved, individual: individualApproved,
          markInComplete: 0, cumulative: organizationalApproved + individualApproved
        }
        finalArray.push(obj1)
        var obj2 = {
          type: "Rejected", organization: organizationalRejected, individual: individualRejected,
          markInComplete: markIncompleteCount, cumulative: organizationalRejected + individualRejected + markIncompleteCount
        }
        finalArray.push(obj2)
        var obj3 = {
          type: "Pending", organization: organizationalPending, individual: individualPending,
          markInComplete: 0, cumulative: organizationalPending + individualPending
        }
        finalArray.push(obj3)
        callback(null, finalArray)
      }

    })

  },
  generateMothlyReport(startDate, endDate,endDate1, callback) {
    finalArray=[]
    var  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    DataRequest.generateMothlyReport(startDate, endDate1, (err, results) => {
      if (err) {
        console.log(err)
      }
      else {
        console.log("DataRequestService.generateMothlyReport",results[0])
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
         let cumulative=(element.approvedIndividual+element.rejectedIndividual+element.approvedOrganization+
          element.rejectedOrganization+element.rejectedMarkInComplete)
          let totalApproved = (
            element.approvedIndividual + element.approvedOrganization
          )

          let totalRejected = (
            element.rejectedOrganization + element.rejectedIndividual+element.rejectedMarkInComplete
          )
          var obj={
            month:month,dateRange:dateRange,approvedIndividual:element.approvedIndividual,rejectedIndividual:element.rejectedIndividual,
            approvedOrganization:element.approvedOrganization,rejectedOrganization:element.rejectedOrganization,
            rejectedMarkInComplete:element.rejectedMarkInComplete,cumulative:cumulative,totalApproved:totalApproved,totalRejected:totalRejected
          }
         finalArray.push(obj)
       });
       callback(null, finalArray)  
      }
      
    })
  },
  generateYearlyReport(startDate, endDate, callback) {
    finalArray=[]
    DataRequest.generateYearlyReport(startDate, endDate, (err, results) => {
      if (err) {
        console.log(err)
      }
      else {
        console.log("DataRequestService.generateYearlyReport",results)
        results.forEach(element => {
          let year=element._id.year
          let cumulative=(element.approvedIndividual+element.rejectedIndividual+element.approvedOrganization+
            element.rejectedOrganization+element.rejectedMarkInComplete)

            let totalApproved = (
              element.approvedIndividual + element.approvedOrganization
            )
  
            let totalRejected = (
              element.rejectedOrganization + element.rejectedIndividual+element.rejectedMarkInComplete
            )
            var obj={
              year:year,approvedIndividual:element.approvedIndividual,rejectedIndividual:element.rejectedIndividual,
              approvedOrganization:element.approvedOrganization,rejectedOrganization:element.rejectedOrganization,
              rejectedMarkInComplete:element.rejectedMarkInComplete,cumulative:cumulative,totalApproved:totalApproved,totalRejected:totalRejected
            }
            finalArray.push(obj)   
        });
        
      }
      let sortedArray=finalArray.sort((a,b)=>{return a.year-b.year})
      callback(null, sortedArray)
    })
  },
  getDataRequest(docketNo, callback) {
    DataRequest.findDataByCriteria({ docketNo }, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    })
  }
}