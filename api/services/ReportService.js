module.exports = {
  updateReport(proposalId, reportType, reportData, callback) {
    Logger.debug('ReportService.updateReport');
    Logger.verbose(proposalId);
    console.log('reportData in service', reportData);

    Reports.findReport({ proposalId, reportType }, (err, foundReport) => {
      if (err) {
        Logger.error(`ReportService.updateReport at Reports.findReport ${err}`);
        console.log(`ReportService.updateReport at Reports.findReport ${err}`);
        callback(err);
      } else if (foundReport.length !== 0) {
        console.log('foundReport', foundReport)
        
        Reports.updateReport(proposalId, reportType, reportData, (error, updatedReport) => {
          if (error) {
            Logger.error(`ReportService.updateReport at Reports.updateReport ${error}`);
            console.log(`ReportService.updateReport at Reports.updateReport ${error}`);
            callback(error);
          } else {
            Logger.info('report file updated successfully.');
            console.log('report file updated successfully.', updatedReport);
            callback(null, updatedReport);
          }
        });
      } else {
        console.log('found...................', foundReport);
        Logger.warn('proposal id not present.');
        callback('Proposal is not present');
      }
    })
  },

  saveReportType(reportData, callback) {
    Logger.debug('ReportService.saveReportType');
    console.log('ReportService.saveReportType', reportData);

    Reports.saveReportType(reportData, (err, savedReportType) => {
      console.log('savedReportType before', savedReportType);
      if (err) {
        console.log('error while saving report type', err);
        Logger.error(`ReportService.saveReportType at Report.saveReportType ${err}`);
        callback(err);
      } else {
        Logger.info('Report type saved successfully.');
        console.log('savedReportType after', savedReportType);

        callback(null, savedReportType);
      }
    });
  },

  getReports(proposalId, callback) {
    Logger.debug('ReportService.getReports');
    console.log('proposalId', proposalId);
    Reports.findReport({ proposalId }, (err, reportData) => {
      if (err) {
        Logger.error(`ReportService.getReports at Reports.findReport ${err}`);
        callback(err);
      }
      // else if (reportData.length === 0) {
      //   callback('Reports not found for this proposal');
      // }
      else {
        console.log('reportData in get reports', reportData);
        callback(null, reportData);
      }
    })
  },

  intermediateReportForCoordinator(proposalId, reportType, callback) {
    Logger.debug('ReportService.intermediateReportForCoordinator');
    Logger.verbose(proposalId);
    console.log('intermediateReportForCoordinator in service', reportType);

    Reports.findOneByCriteria({ proposalId, reportType }, (err, foundReport) => {
      if (err) {
        Logger.error(`ReportService.updateReport at Reports.findReport ${err}`);
        console.log(`ReportService.updateReport at Reports.findReport ${err}`);
        callback(err);
      } else if (!foundReport) {
        console.log('foundReport', foundReport)
        callback(null);
      } else {
        console.log('found...................', foundReport);
        callback(null, foundReport);
      }
    })
  },

  reportForCoordinator(proposalId, reportType, callback) {
    Logger.debug('ReportService.reportForCoordinator');
    Logger.verbose(proposalId);
    console.log('reportForCoordinator in service', reportType);

    Reports.findOneByCriteria({ proposalId, reportType }, (err, foundReport) => {
      if (err) {
        Logger.error(`ReportService.reportForCoordinator at Reports.findOneByCriteria ${err}`);
        console.log(`ReportService.reportForCoordinator at Reports.findOneByCriteria ${err}`);
        callback(err);
      } else if (!foundReport) {
        console.log('foundReport in reportForCoordinator', foundReport)
        callback(null);
      } else {
        console.log('found...................', foundReport);
        callback(null, foundReport);
      }
    })
  },
};
