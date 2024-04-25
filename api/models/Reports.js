module.exports = {

    tableName: 'fijihrp_reports',

    attributes: {
        proposalId: {
            type: 'ref',
            columnType: 'string',
            required: true,
        },
        investigatorId: {
            type: 'ref',
            columnType: 'objectid',
            required: true,
        },
    },

    async saveReportType(params, callback) {
        console.log('savedReportType', params);
        const data = await Reports.create(params).fetch();
        callback(null, data);
    },
    findReport(criteria, callback) {
        const db = Application.getDatastore().manager;
        db.collection('fijihrp_reports')
            .find(criteria)
            .toArray((aggregateErr, reportData) => {
                callback(aggregateErr, reportData);
            });
    },
    updateReport(proposalId, reportType, params, callback) {
        console.log('params in model', params);

        Reports.update({proposalId, reportType}, {report: params}).fetch().exec((err, data) => {
            callback(err, data);
        });
    },
    findOneByCriteria(criteria, callback) {
        console.log(criteria);
        Reports.findOne(criteria).exec((err, data) => {
          console.log('data..............', data);
          callback(err, data);
        });
      },
}