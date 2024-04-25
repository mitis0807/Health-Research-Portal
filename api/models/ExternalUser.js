
module.exports = {

    tableName: 'fijihrp_externalUser',
  
    attributes: {
      firstName: {
        type: 'string',
      },
  
      lastName: {
        type: 'string',
      },
  
      email: {
        type: 'string',
        required: true,
      },
      phoneNumber:{
        type: 'number',
      },
      universityName: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
  
      isActive: {
        type: 'boolean',
        defaultsTo: true,
      },
    },
  
    customToJSON() {
      return _.omit(this, ['password']);
    },
  
  
    findOneByCriteria(criteria, callback) {
      ExternalUser.findOne(criteria).exec((err, data) => {
        console.log(data);
        callback(err, data);
      });
    },
    findByCriteria(criteria, callback) {
      ExternalUser.find(criteria).exec((err, data) => {
        console.log(data);
        callback(err, data);
      });
    },
    findEmailByCriteria(criteria, callback) {
      ExternalUser.find(criteria,{email:1}).exec((err, data) => {
        console.log(data);
        callback(err, data);
      });
    },
    createExternalUser(params, callback) {
      ExternalUser.create(params).fetch().exec((err, data) => {
        callback(err, data);
      });
    },
    updateByCriterion(id, params, callback) {
      ExternalUser.update({ id, isActive: true }, params).fetch().exec((err, data) => {
        callback(err, data);
      });
    },
    async findActivesByCriteria(criteria, skip, callback) {
      try{
      const data = await ExternalUser.find({
        where: criteria,
        limit: sails.config.recordsPerPage,
        skip,
      }).sort('createdAt DESC');
      return callback(null, data);
    } catch (error) {
      return callback(error);
    }
    },
    countByCriteria(criteria, callback) {
      ExternalUser.count(criteria).exec((err, count) => {
        console.log('no of records', count);
        callback(err, count);
      });
    },
  };
  