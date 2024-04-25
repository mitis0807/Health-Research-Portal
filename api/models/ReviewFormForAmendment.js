module.exports = {
  tableName: "fijihrp_reviewFormForAmendment",

  attributes: {
    proposalId: {
      type: "string",
      required: true,
    },
    researchTitle: {
      type: "string",
      required: true,
    },
  },
  async createReviewForm(params, callback) {
    console.log("createReviewForm params", params);
    const data = await ReviewFormForAmendment.create(params).fetch();
    console.log("data after creation of review", data);
    callback(null, data);
  },
  getReviewForm(id, callback) {
    ReviewFormForAmendment.find({ proposalId: id }).exec((err, data) => {
      callback(err, data);
    });
  },
  // findByCriteria(criteria, callback) {
  //   Application.find(criteria).exec((err, data) => {
  //     callback(err, data);
  //   });
  // },

  // findActiveById(proposalId, callback) {
  //   Application.findOne({ proposalId, isActive: true }).exec((err, data) => {
  //     callback(err, data);
  //   });
  // },

  // findActiveByCriteria(criteria, callback) {
  //   console.log('criteria data', criteria);
  //   Application.findOne(criteria).exec((err, data) => {
  //     console.log('data datadata', data);

  //     callback(err, data);
  //   });
  // },

  // findActivesByCriteria(criteria, callback) {
  //   Application.find(criteria).exec((err, data) => {
  //     callback(err, data);
  //   });
  // },

  // updateActiveById(proposalId, params, callback) {
  //   Application.update({ proposalId, isActive: true }, params).fetch().exec((err, data) => {
  //     callback(err, data);
  //   });
  // },
  // findByPaginate(criteria, projection, skipNo, limitNo, sortColumn, callback) {
  //   Application.find(criteria, projection).skip(skipNo).limit(limitNo).sort(sortColumn)
  //     .exec((err, data) => {
  //       callback(err, data);
  //     });
  // },
  // countProposalByCriteria(criteria, callback) {
  //   console.log('====== countByCriteria =======');
  //   console.log(criteria);
  //   // Application.find({ isActive: true, isProposal: true, investigatorId: '5e04b22ce205dc0037c65d6d' }).exec((err, count) => {
  //   //   console.log('count application js', count);
  //   //   console.log('no of records application js', count.length);
  //   //   console.log('err ', err);
  //   //   callback(err, count.length);
  //   // });

  //   const db = Application.getDatastore().manager;
  //   db.collection('fijihrp_application')
  //     .find(criteria)
  //     .toArray((findErr, applicationData) => {
  //       console.log('no of records application js', applicationData.length);
  //       console.log('err ', findErr);
  //       callback(findErr, applicationData.length);
  //     });
  // },

  // findProposalInvestigatorByPagination(criteria, skip, limit, callback) {
  //   console.log('====== findByPagination =======');
  //   console.log('limit................', limit);
  //   console.log('skip...............', skip);
  //   console.log(criteria);
  //   const db = Application.getDatastore().manager;
  //   db.collection('fijihrp_application')
  //     .find(criteria).skip(skip).limit(limit)
  //     .toArray((aggregateErr, applicationData) => {
  //       callback(aggregateErr, applicationData);
  //     });
  // },

  // findApplicationWithInvestigator(matchCriteria, callback) {
  //   console.log(matchCriteria);

  //   const db = Application.getDatastore().manager;
  //   db.collection('fijihrp_application')
  //     .aggregate([
  //       {
  //         $match: matchCriteria,
  //       },
  //       {
  //         $lookup: {
  //           from: 'fijihrp_investigator',
  //           localField: 'investigatorId',
  //           foreignField: '_id',
  //           as: 'investigator',
  //         },
  //       },
  //       {
  //         $unwind: '$investigator',
  //       },
  //       {
  //         $project: {
  //           isSubmitted: 1,
  //           benefits: 1,
  //           title: 1,
  //           background: 1,
  //           objectives: 1,
  //           studyMethods: 1,
  //           expectedOutcomes: 1,
  //           keywords: 1,
  //           dataCollection: 1,
  //           endDate: 1,
  //           humanSubjects: 1,
  //           keyInstitution: 1,
  //           multiCountryResearch: 1,
  //           nationWiseResearch: 1,
  //           otherCommitte: 1,
  //           otherResearchForm: 1,
  //           researchDomain: 1,
  //           researchField: 1,
  //           startDate: 1,
  //           studentResearch: 1,
  //           amount: 1,
  //           source: 1,
  //           age: 1,
  //           anyTest: 1,
  //           biologicalSamples: 1,
  //           biosafeIssue: 1,
  //           dependentRelation: 1,
  //           distress: 1,
  //           humanGenetic: 1,
  //           identity: 1,
  //           inducements: 1,
  //           ionizationRadiation: 1,
  //           mentalImpairment: 1,
  //           minorityGroup: 1,
  //           pregnant: 1,
  //           reproductiveTech: 1,
  //           sensitiveInfo: 1,
  //           stemCell: 1,
  //           conflict: 1,
  //           levelRisk: 1,
  //           multiInistitution: 1,
  //           investigatorName: { $concat: ['$investigator.firstName', ' ', '$investigator.lastName'] },
  //         },
  //       },
  //     ])
  //     .toArray((aggregateErr, applicationData) => {
  //       callback(aggregateErr, applicationData);
  //     });
  // },

  // findProposalByInvestigator(criteria, callback) {
  //   const db = Application.getDatastore().manager;
  //   db.collection('fijihrp_application')
  //     .find(criteria)
  //     .toArray((aggregateErr, applicationData) => {
  //       callback(aggregateErr, applicationData);
  //     });
  // },

  // findAllApplicationWithInvestigator(matchCriteria, callback) {
  //   const db = Application.getDatastore().manager;
  //   db.collection('fijihrp_application')
  //     .aggregate([
  //       {
  //         $match: matchCriteria,
  //       },
  //       {
  //         $lookup: {
  //           from: 'fijihrp_investigator',
  //           localField: 'investigatorId',
  //           foreignField: '_id',
  //           as: 'investigator',
  //         },
  //       },
  //       {
  //         $unwind: '$investigator',
  //       },
  //     ])
  //     .toArray((aggregateErr, applicationData) => {
  //       callback(aggregateErr, applicationData);
  //     });
  // },
};
