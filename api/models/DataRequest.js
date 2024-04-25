module.exports = {
  tableName: "fijihrp_dataRequest",

  attributes: {
    email: {
      type: "string",
      required: true,
    },
    isCompleted: {
      type: "boolean",
      defaultsTo: false,
    },
    isInCompleted: {
      type: "boolean",
      defaultsTo: false,
    },
    isApproved: {
      type: "boolean",
      defaultsTo: false,
    },
    isRejected: {
      type: "boolean",
      defaultsTo: false,
    },
  },

  findDataByCriteria(criteria, callback) {
    console.log(criteria);
    DataRequest.findOne(criteria).exec((err, data) => {
      console.log("request data..............", data);
      callback(err, data);
    });
  },

  updateDataRequestById(id, params, callback) {
    Logger.debug("DataRequest.updateDataRequestById");
    Logger.debug(id);

    DataRequest.update({ _id: id }, params)
      .fetch()
      .exec((err, data) => {
        Logger.debug(
          "DataRequest.updateDataRequestById at  DataRequest.update"
        );
        Logger.debug(data);
        callback(err, data[0]);
      });
  },
  async saveDataRequest(params, callback) {
    console.log('saveDataRequest', params);
    const data = await DataRequest.create(params).fetch();
    callback(null, data);
},
findData(criteria, callback) {
    const db = DataRequest.getDatastore().manager;
    console.log('criteria in model',criteria)
    db.collection('fijihrp_dataRequest')
        .find(criteria)
        .toArray((aggregateErr, requestData) => {
            console.log('inside model...',requestData)
            callback(aggregateErr, requestData);
        });
},

//changes
async findByCriteria(criteria,skip,callback) {
  const dataRequests = await DataRequest.find({
    where: criteria,
    sort:{ createdAt: -1 },
    limit: sails.config.recordsPerPage,
    skip,
    
  })
  return callback(null, dataRequests);
},
async findByOrCriteria(criteria1,criteria2,skip,callback) {
  const dataRequests = await DataRequest.find({
    where:({or:[criteria1,criteria2]}),
    limit: sails.config.recordsPerPage,
    skip,
  })
  return callback(null, dataRequests);
},

async searchDataRequestByIdAndTitle(searchTerm, callback) {
  DataRequest.native((queryErr, collection) => {
    console.log(queryErr);
    collection.find({ $or:[{docketNo: { $regex: ".*"+searchTerm+".*" , $options:'i'}},{purposeOfRequest: { $regex: ".*"+searchTerm+".*" , $options:'i'}}]}).toArray((error, results) => {
      if (error) return callback(error);
      return callback(null, results);
    });
  });
},
async searchDataRequestByIdAndTitleOfHead(matchCriteria,searchTerm, callback) {
  const db = Application.getDatastore().manager;
    db.collection('fijihrp_dataRequest')
      .aggregate([
        {
          $match: matchCriteria,
        },   
          { $match:  {$or:[{docketNo: { $regex: ".*"+searchTerm+".*" , $options:'i'}},{purposeOfRequest: { $regex: ".*"+searchTerm+".*" , $options:'i'}}]} }       
      ])
      .toArray((aggregateErr, applicationData) => {
        callback(aggregateErr, applicationData);
      });
},
async searchDataRequestByIdAndTitleOfPSHMS(Criteria1,Criteria2,searchTerm, callback) {
  const db = Application.getDatastore().manager;
    db.collection('fijihrp_dataRequest')
      .aggregate([
        {
          $match: {$or:[Criteria1,Criteria2]},
        },   
          { $match:  {$or:[{docketNo: { $regex: ".*"+searchTerm+".*" , $options:'i'}},{purposeOfRequest: { $regex: ".*"+searchTerm+".*" , $options:'i'}}]} }       
      ])
      .toArray((aggregateErr, applicationData) => {
        callback(aggregateErr, applicationData);
      });
},
countDataRequestByCriteria(criteria, callback) {
  DataRequest.count(criteria).exec((err, count) => {
    console.log('no of records', count);
    callback(err, count);
  });
},
updateByDocketNo(docketNo, requestData,callback){
  Logger.debug("DataRequest.updateByDocketNo");
  Logger.debug(docketNo);

  DataRequest.update({docketNo}, requestData)
    .fetch()
    .exec((err, data) => {
      Logger.debug(
        "DataRequest.updateByDocketNo at  DataRequest.update"
      );
      Logger.debug(data);
      callback(err, data[0]);
    });
},
findByDateCritria(startDate,endDate,callback){
  const db = Application.getDatastore().manager;
  db.collection('fijihrp_dataRequest')
    .aggregate([ 
      
      { $match:  {$and:[{createdAt:{$lt : endDate }} ,{createdAt: { $gte : startDate}}]}},      
       
    ])
    .toArray((aggregateErr, applicationData) => {
      callback(aggregateErr, applicationData);
    });
  },
  generateMothlyReport(startDate,endDate,callback){
    const db = Application.getDatastore().manager;
  db.collection('fijihrp_dataRequest').aggregate([
    { $match:  {$and:[{createdAt:{$lt : endDate }} ,{createdAt: { $gte : startDate}}]}},
    {
      $sort:{createdAt:1}
    },
    {
      "$group": {
        "_id": 
          { month: { $month: "$createdAt" }, year: { $year: "$createdAt" }},     
        "approvedIndividual":{
        $sum: { $cond: [ {$and : [ { $eq: [ "$isApproved", true] },
            { $eq: [ "$typeOfApplication","individualStatus"] } ] },1,0 ] }},
        "rejectedIndividual":{
        $sum: { $cond: [ {$and : [ { $eq: [ "$isRejected", true] },
          { $eq: [ "$typeOfApplication","individualStatus"] } ] },1,0 ] }},
        "approvedOrganization":{
         $sum: { $cond: [ {$and : [ { $eq: [ "$isApproved", true] },
                { $eq: [ "$typeOfApplication","organizational"] }] },1,0 ] }},
        "rejectedOrganization":{
         $sum: { $cond: [ {$and : [ { $eq: [ "$isRejected", true] },
         { $eq: [ "$typeOfApplication","organizational"] } ] },1,0 ] }},
         "rejectedMarkInComplete":{
         $sum: { $cond: [ {$and : [ { $eq: [ "$isInCompleted", true] } ] },1,0 ] }},
    },

  }
  ]) .toArray((aggregateErr, applicationData) => {
    callback(aggregateErr, applicationData);
  });
  },
  
  generateYearlyReport(startDate,endDate,callback){
    const db = Application.getDatastore().manager;
  db.collection('fijihrp_dataRequest').aggregate([
    { $match:  {$and:[{createdAt:{$lt : endDate }} ,{createdAt: { $gte : startDate}}]}},
    {
      $sort:{createdAt:1}
    },
    {
      "$group": {
        "_id": 
          { year: { $year: "$createdAt" }},     
        "approvedIndividual":{
        $sum: { $cond: [ {$and : [ { $eq: [ "$isApproved", true] },
            { $eq: [ "$typeOfApplication","individualStatus"] } ] },1,0 ] }},
        "rejectedIndividual":{
        $sum: { $cond: [ {$and : [ { $eq: [ "$isRejected", true] },
          { $eq: [ "$typeOfApplication","individualStatus"] } ] },1,0 ] }},
        "approvedOrganization":{
         $sum: { $cond: [ {$and : [ { $eq: [ "$isApproved", true] },
                { $eq: [ "$typeOfApplication","organizational"] }] },1,0 ] }},
        "rejectedOrganization":{
         $sum: { $cond: [ {$and : [ { $eq: [ "$isRejected", true] },
         { $eq: [ "$typeOfApplication","organizational"] } ] },1,0 ] }},
         "rejectedMarkInComplete":{
         $sum: { $cond: [ {$and : [ { $eq: [ "$isInCompleted", true] } ] },1,0 ] }},
    },
  }
  ]) .toArray((aggregateErr, applicationData) => {
    callback(aggregateErr, applicationData);
  });
  },
};
