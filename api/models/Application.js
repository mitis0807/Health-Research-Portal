const { stringify } = require("query-string");



module.exports = {

  tableName: 'fijihrp_application',

  attributes: {
    isActive: {
      type: 'boolean',
      defaultsTo: true,
    },
    investigatorId: {
      type: 'ref',
      columnType: 'string',
      required: true,
    },
    timeline: {
      type: 'json',
      columnType: 'array',
      defaultsTo: [],
    }
  },

  findByCriteria(criteria, callback) {
    Application.find(criteria).exec((err, data) => {
      callback(err, data);
    });
  },

  findActiveById(proposalId, callback) {
    Application.findOne({ proposalId, isActive: true }).exec((err, data) => {
      callback(err, data);
    });
  },
  async searchProposalByTitle(searchTerm, callback) {
    Application.native((queryErr, collection) => {
      console.log(queryErr);
      collection.find({ title: { $regex: ".*" + searchTerm + ".*", $options: 'i' } }).toArray((error, results) => {
        if (error) return callback(error);
        return callback(null, results);
      });
    });
  },
  async searchResearchByTitle(searchTerm, callback) {
    Application.native((err, collection) => {
      console.log(err);
      collection.find(
        {
          $or: [{ title: { $regex: ".*" + searchTerm + ".*", $options: 'i' } }, { keywords: { $regex: ".*" + searchTerm + ".*", $options: 'i' } }]
          , isResearch: true
        }
      ).toArray((error, results) => {
        if (error) return callback(error);
        return callback(null, results);
      });
    });
  },
  findActiveByCriteria(criteria, callback) {
    console.log('criteria data', criteria);
    Application.findOne(criteria).exec((err, data) => {
      console.log('data in findActiveByCriteria', data);
      callback(err, data);
    });
  },

  findActivesByCriteria(criteria, callback) {
    Application.find(criteria).exec((error, data) => {
      callback(error, data);
    });
  },

  async updateRecord(proposalId, proposalData, toPush, callback) {
    try {

      Application.native((err, collection) => {
        collection.findOneAndUpdate(
          { proposalId, isActive: true },
          {
            $push: { timeline: toPush },
            $set: proposalData,
          }, (error, results) => {
            if (error) return callback(error);
            console.log('******************');
            console.log(results);
            return callback(null, [results.value]);
          },
        );
      });
    } catch (error) {
      Logger.debug(`in catch ${error}`);
      return callback(error);
    }
  },
  updateActiveById(proposalId, params, callback) {
    Application.update({ proposalId, isActive: true }, params).fetch().exec((err, data) => {
      callback(err, data);
    });
  },
  async findActiveByCriteriaAndUpdate(criteria, proposalData, callback) {


    try {

      Application.native((err, collection) => {
        collection.findOneAndUpdate(
          criteria,
          {
            $set: proposalData,
          }, (error, results) => {
            if (error) return callback(error);
            console.log('******************');
            console.log("after change", results);
            return callback(null, [results.value]);
          },
        );
      });
    } catch (error) {
      Logger.debug(`in catch ${error}`);
      return callback(error);
    }

    // console.log(".....data of change",proposalData)
    // Application.update(criteria,proposalData).fetch().exec((err, data) => {
    //   console.log("upfated Record after ",data)
    //   callback(err, data);

    // });
  },
  async createApplication(params, callback) {
    console.log('createApplication', params);
    const data = await Application.create(params).fetch();
    callback(null, data);
  },
  findByPaginate(criteria, projection, skipNo, limitNo, sortColumn, callback) {
    Application.find(criteria, projection).skip(skipNo).limit(limitNo).sort(sortColumn)
      .exec((err, data) => {
        callback(err, data);
      });
  },
  countProposalByCriteria(criteria, callback) {
    console.log('====== countByCriteria =======');
    console.log(criteria);

    const db = Application.getDatastore().manager;
    db.collection('fijihrp_application')
      .find(criteria)
      .toArray((findErr, applicationData) => {
        console.log('no of records application js', applicationData.length);
        console.log('err ', findErr);
        callback(findErr, applicationData.length);
      });
  },

  findProposalInvestigatorByPagination(criteria, skip, limit, callback) {
    console.log('====== findByPagination =======');
    console.log('limit................', limit);
    console.log('skip...............', skip);
    console.log(criteria);
    const db = Application.getDatastore().manager;
    db.collection('fijihrp_application')
      .find(criteria).skip(skip).limit(limit)
      .toArray((aggregateErr, applicationData) => {
        callback(aggregateErr, applicationData);
      });
  },
  findTermExtensionsByPagination(criteria, skip, limit, callback) {
    const db = Application.getDatastore().manager;
    db.collection('fijihrp_application')
      .find(criteria).skip(skip).limit(limit)
      .toArray((aggregateErr, applicationData) => {
        callback(aggregateErr, applicationData);
      });
  },

  findApplicationWithInvestigator(matchCriteria, callback) {
    console.log(matchCriteria);

    const db = Application.getDatastore().manager;
    db.collection('fijihrp_application')
      .aggregate([
        {
          $match: matchCriteria,
        },
        {
          $lookup: {
            from: 'fijihrp_investigator',
            localField: 'investigatorId',
            foreignField: '_id',
            as: 'investigator',
          },
        },
        {
          $unwind: '$investigator',
        },
        {
          $project: {
            isSubmitted: 1,
            benefits: 1,
            title: 1,
            background: 1,
            objectives: 1,
            studyMethods: 1,
            expectedOutcomes: 1,
            keywords: 1,
            dataCollection: 1,
            endDate: 1,
            humanSubjects: 1,
            keyInstitution: 1,
            multiCountryResearch: 1,
            nationWiseResearch: 1,
            otherCommitte: 1,
            otherResearchForm: 1,
            researchDomain: 1,
            researchField: 1,
            startDate: 1,
            studentResearch: 1,
            amount: 1,
            source: 1,
            age: 1,
            anyTest: 1,
            biologicalSamples: 1,
            biosafeIssue: 1,
            dependentRelation: 1,
            distress: 1,
            humanGenetic: 1,
            identity: 1,
            inducements: 1,
            ionizationRadiation: 1,
            mentalImpairment: 1,
            minorityGroup: 1,
            pregnant: 1,
            reproductiveTech: 1,
            sensitiveInfo: 1,
            stemCell: 1,
            conflict: 1,
            levelRisk: 1,
            multiInistitution: 1,
            investigatorName: { $concat: ['$investigator.firstName', ' ', '$investigator.lastName'] },
          },
        },
      ])
      .toArray((aggregateErr, applicationData) => {
        callback(aggregateErr, applicationData);
      });
  },

  findProposalByInvestigator(criteria, callback) {
    const db = Application.getDatastore().manager;
    db.collection('fijihrp_application')
      .aggregate([
        {
          $match: criteria,
        },
        { $sort: { createdAt: -1 } }
      ])
      .toArray((aggregateErr, applicationData) => {
        console.log("aggregateerr", aggregateErr)
        console.log("application data", applicationData)
        callback(aggregateErr, applicationData);
      });
  },


  findAllApplicationWithInvestigator(matchCriteria, callback) {
    const db = Application.getDatastore().manager;
    db.collection('fijihrp_application')
      .aggregate([
        {
          $match: matchCriteria,
        },
        { $sort: { createdAt: -1 } },
        {
          $lookup: {
            from: 'fijihrp_investigator',
            localField: 'investigatorId',
            foreignField: '_id',
            as: 'investigator',
          },
        },
        {
          $unwind: '$investigator',
        },
      ])
      .toArray((aggregateErr, applicationData) => {
        Logger.debug(applicationData)
        callback(aggregateErr, applicationData);
      });
  },

  findAllApplicationWithInvestigatorWithPagination(skip, limit, matchCriteria, callback) {
    const db = Application.getDatastore().manager;
    db.collection('fijihrp_application')
      .aggregate([
        {
          $match: matchCriteria,
        },
        { $sort: { createdAt: -1 } },
        {
          $lookup: {
            from: 'fijihrp_investigator',
            localField: 'investigatorId',
            foreignField: '_id',
            as: 'investigator',
          },
        },
        {
          $unwind: '$investigator',
        },
        { $skip: skip }, { $limit: limit }
      ])
      .toArray((aggregateErr, applicationData) => {
        Logger.debug(applicationData)
        callback(aggregateErr, applicationData);
      });
  },
  getResearchesForInvestigator(matchCriteria, searchTerm, callback) {
    const db = Application.getDatastore().manager;
    db.collection('fijihrp_application')
      .aggregate([
        {
          $match: matchCriteria,
        },
        { $sort: { createdAt: -1 } },
        {
          $lookup: {
            from: 'fijihrp_investigator',
            //localField: 'investigatorId',
            //foreignField: '_id',
            pipeline: [
              { $match: { firstName: { $regex: searchTerm, $options: "i" } } }
            ],
            as: 'investigator',
          },
        },
        {
          $unwind: '$investigator',
        },
        {
          $project: {
            title: 1,
            objectives: 1,
            studyMethods: 1,
            //investigator:1
          },
        },
      ])
      .toArray((aggregateErr, applicationData) => {
        callback(aggregateErr, applicationData);
      });
  },
  findAllApplicationWithInvestigatorCount(matchCriteria, callback) {
    const db = Application.getDatastore().manager;
    db.collection('fijihrp_application')
      .aggregate([
        {
          $match: matchCriteria,
        },
        {
          $lookup: {
            from: 'fijihrp_investigator',
            localField: 'investigatorId',
            foreignField: '_id',
            as: 'investigator',
          },
        },
        {
          $unwind: '$investigator',
        },
        { $group: { "_id": null, "count": { "$sum": 1 } } }
      ])
      .toArray((aggregateErr, total) => {
        Logger.debug('total')
        Logger.debug(total)
        callback(aggregateErr, total.length);
      });
  },

  async findAllApplicationWithSortPagination(skip, limit, sorting, matchCriteria, callback) {
    const db = Application.getDatastore().manager;
    if (sorting < 0) {
      db.collection('fijihrp_application')
        .find(matchCriteria).sort({ title: sorting }).skip(skip).limit(limit)
        .toArray((aggregateErr, applicationData) => {
          callback(aggregateErr, applicationData);
        });
    }
    else {
      let researches = []
      db.collection('fijihrp_application').aggregate([
        {
          $match: matchCriteria
        },
        {
          $match: { title: /^[a-z*]/i },
        },
        {
          $sort: { title: sorting }
        }
      ]).toArray((error, results) => {
        if (error) return callback(error);
        else {
          for (let i = 0; i < results.length; i++) {
            researches.push(results[i])
          }
          db.collection('fijihrp_application').aggregate([
            {
              $match: matchCriteria
            },
            {
              $match: { title: /^[0-9]/g },
            },
            {
              $sort: { title: sorting }
            }
          ]).toArray((err, result) => {
            if (err) return callback(err);
            else {
              for (let i = 0; i < result.length; i++) {
                researches.push(result[i])
              }

            }
            return callback(null, researches)
          })
        }
      })


    }

  },
  generateCurrentMonthReport(startDate, enddate, callback) {
    const db = Application.getDatastore().manager;
    db.collection('fijihrp_application')
      .aggregate([

        {
          $project: {
            StringToDate: {
              $dateFromString: {
                dateString: '$createdAt'
              }
            }, isActive: 1, isResearch: 1, isSubmitted: 1, isRejected: 1
          }
        },
        { $match: { $and: [{ StringToDate: { $gte: startDate } }, { StringToDate: { $lt: enddate } }] } },
        {
          "$group": {
            "_id":
              { month: { $month: "$StringToDate" }, year: { $year: "$StringToDate" } },
            "proposalReceived": {
              $sum: {
                $cond: [{
                  $and: [{ $eq: ["$isSubmitted", true] },
                  { $eq: ["$isActive", true] }]
                }, 1, 0]
              }
            },
            "proposalDeclined": {
              $sum: {
                $cond: [{
                  $and: [{ $eq: ["$isRejected", true] },
                  { $eq: ["$isActive", true] }]
                }, 1, 0]
              }
            },
            "proposalAccepted": {
              $sum: {
                $cond: [{
                  $and: [{ $eq: ["$isResearch", true] },
                  { $eq: ["$isActive", true] }]
                }, 1, 0]
              }
            },
          }
        }
      ]).toArray((aggregateErr, applicationData) => {
        console.log("data", applicationData)
        callback(aggregateErr, applicationData);
      });

  },
  generateCurrentYearReport(startDate, enddate, callback) {
    const db = Application.getDatastore().manager;
    db.collection('fijihrp_application')
      .aggregate([
        {
          $project: {
            StringToDate: {
              $dateFromString: {
                dateString: '$createdAt'
              }
            }, isActive: 1, isResearch: 1, isSubmitted: 1, isRejected: 1
          }
        },
        { $match: { $and: [{ StringToDate: { $gte: startDate } }, { StringToDate: { $lt: enddate } }] } },
        {
          "$group": {
            "_id":
            {
              year: { $year: "$StringToDate" }},
              "proposalReceived": {
                $sum: {
                  $cond: [{
                    $and: [{ $eq: ["$isSubmitted", true] },
                    { $eq: ["$isActive", true] }]
                  }, 1, 0]
                }
              },
              "proposalDeclined": {
                $sum: {
                  $cond: [{
                    $and: [{ $eq: ["$isRejected", true] },
                    { $eq: ["$isActive", true] }]
                  }, 1, 0]
                }
              },
              "proposalAccepted": {
                $sum: {
                  $cond: [{
                    $and: [{ $eq: ["$isResearch", true] },
                    { $eq: ["$isActive", true] }]
                  }, 1, 0]
                }
              },
            }
          }  
        
  ]).toArray((aggregateErr, applicationData) => {
            console.log("data", applicationData)
            callback(aggregateErr, applicationData);
          });

  },
};

