module.exports = {

  tableName: 'fijihrp_internalUser',

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

    password: {
      type: 'string',
    },
    role:{
      type: 'number'
    },
    isActive: {
      type: 'boolean',
      defaultsTo: true,
    },
  },

  customToJSON() {
    return _.omit(this, ['password']);
  },

  countByCriteria(criteria, callback) {
    console.log('====== countByCriteria =======');
    console.log(criteria);
    InternalUser.count(criteria).exec((err, count) => {
      console.log('no of records', count);
      callback(err, count);
    });
  },

  findByCriteria(criteria, callback) {
    InternalUser.find(criteria).exec((err, data) => {
      console.log('found data', data);
      callback(err, data);
    });
  },

  findByPagination(criteria, skip, limit, callback) {
    InternalUser.find(criteria).skip(skip).limit(limit).exec((err, data) => {
      callback(err, data);
    });
  },
  findActiveById(id, callback) {
    console.log('id', id);
    InternalUser.findOne(id).exec((err, data) => {
      console.log('data', data);
      callback(err, data);
    });
  },

  findActiveByCriteria(criteria, callback) {
    Logger.verbose(criteria);
    InternalUser.findOne(criteria).exec((err, data) => {
      callback(err, data);
    });
  },
  updateActiveById(id, params, callback) {
    console.log('InternalUser at updateActiveById', params)
    console.log('InternalUser at updateActiveById id', id)

    InternalUser.update({ id, isActive: true }, params).fetch().exec((err, data) => {
      callback(err, data);
    });
  },

  updateActiveByCriteria(criteria, params, callback) {
    InternalUser.update(criteria, params).fetch().exec((err, data) => {
      callback(err, data);
    });
  },
  createInternalUser(params, callback) {
    InternalUser.create(params).fetch().exec((err, data) => {
      callback(err, data);
    });
  },
  async findEmailByCriteria(criteria, callback) {
    Logger.verbose(criteria)
    try {
      InternalUser.native((err, collection) => {
        console.log(err);
        collection.find( criteria,{email:1}).toArray((error, results) => {
          if (error) return callback(error);
          return callback(null, results);
        });
      });
    } catch (error) {
      Logger.debug(`in catch ${error}`);
      return callback(error);
    }
  },
  async findActivesByCriteria(criteria, skip, callback) {
    try{
    const data = await InternalUser.find({
      where: criteria,
      limit: sails.config.recordsPerPage,
      skip,
    }).sort('createdAt DESC');
    console.log('****data****')
    console.log(data)
    return callback(null, data);
  } catch (error) {
    return callback(error);
  }
  },
};
