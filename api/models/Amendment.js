module.exports = {

  tableName: 'fijihrp_amendment',

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
    },
  },

  findByCriteria(criteria,skip,limit,callback) {
   const db = Amendment.getDatastore().manager;
    db.collection('fijihrp_amendment')
      .aggregate([
        {
          $match: criteria,
        },
        { $sort: { createdAt: -1 } },
        { $skip:skip },
        {$limit:limit},
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
        }
      ]).toArray((aggregateErr, amendmentData) => {
        Logger.debug(amendmentData)
        callback(aggregateErr, amendmentData);
      });
  },

  findActiveById(proposalId, callback) {
    Amendment.findOne({ proposalId, isActive: true }).exec((err, data) => {
      callback(err, data);
    });
  },
  
  findActiveByCriteria(criteria, callback) {
    console.log('criteria data', criteria);
    Amendment.findOne(criteria).exec((err, data) => {
      console.log('findActiveByCriteria data', data);
      callback(err, data);
    });
  },

  updateActiveById(proposalId, params, callback) {
    console.log('proposal id in modal',proposalId)
    Amendment.update({ proposalId, isActive: true }, params).fetch().exec((err, data) => {
      
      console.log('updated data in amendment model',data)
      callback(err, data);
    });
  },

  async createAmendment(params, callback) {
    console.log('createAmendment', params);
    const data = await Amendment.create(params).fetch();
    console.log('data im amendment model', data)
    callback(null, data);
  },

  findAmendmentByProposalId(criteria, callback) {
    Amendment.find(criteria).exec((err, data) => {
      console.log('data fetched in amendment model', data);
      callback(err, data);
    });
  },
  countAmendmentByCriteria(criteria, callback) {
    Amendment.count(criteria).exec((err, count) => {
      console.log('no of records', count);
      callback(err, count);
    });
  },
  async updateAmendmentRecord(proposalId, amendmentData, toPush, callback) {
    try {

      Amendment.native((err, collection) => {
        collection.findOneAndUpdate(
          { proposalId, isActive: true },
          {
            $push: { timeline: toPush },
            $set: amendmentData,
          }, (error, results) => {
            if (error) return callback(error);
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
  searchAmendmentRequest(searchTerm,criteria,callback){
    const db = Amendment.getDatastore().manager;
    db.collection('fijihrp_amendment')
      .aggregate([
        {
          $match: criteria,
        },
        {
          $match:{ $or:[{proposalId: { $regex: ".*"+searchTerm+".*" , $options:'i'}},{title: { $regex: ".*"+searchTerm+".*" , $options:'i'}}]}
        }
        
      ]).toArray((aggregateErr, amendmentData) => {
        Logger.debug(amendmentData)
        callback(aggregateErr, amendmentData);
      });


    // Amendment.native((queryErr, collection) => {
    //   console.log(queryErr);
    //   collection.find().toArray((error, results) => {
    //     if (error) return callback(error);
    //     return callback(null, results);
    //   });
    // });
  },
  findAllByCriteria(criteria,callback) {
    // console.log(criteria)

    // Amendment.find(criteria).exec((err, data) => {
    // console.log('data criteria')

    // console.log(data)

    //   callback(err, data);
    // });

    const db = Amendment.getDatastore().manager;
    db.collection('fijihrp_amendment')
      .aggregate([
        {
          $match: criteria,
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
      .toArray((aggregateErr, amendmentData) => {
        Logger.debug(amendmentData)
        callback(aggregateErr, amendmentData);
      });
  },
};
