module.exports = {

  tableName: 'fijihrp_user',

  attributes: {
    email: {
      type: 'string',
      required: true,
    },
    password: {
      type: 'string',
    },
    role: {
      type: 'number',
     // required: true,
    },
    isActive: {
      type: 'boolean',
      defaultsTo: true,
    },
  },

  findByCriteria(criteria, callback) {
    User.findOne(criteria).exec((error, data) => {
      callback(error, data);
    });
  },

  findActiveById(id, callback) {
    console.log('id in user mode for reset', id)
    User.findOne({ id, isActive: true }).exec((err, data) => {
      console.log('user model found user', data)
      callback(err, data);
    });
  },

  findActiveByCriteria(criteria, callback) {
    User.findOne(criteria).exec((err, data) => {
      callback(err, data);
    });
  },

  findActivesByCriteria(criteria, callback) {
    User.find(criteria).exec((err, data) => {
      callback(err, data);
    });
  },

  updateActiveById(id, params, callback) {
    Logger.debug('User.updateActiveById');
    Logger.debug(id);
    Logger.debug('type of id comes in user model');
    Logger.debug(typeof id);
    
    User.update({ id, isActive: true }, params).fetch().exec((err, data) => {
      Logger.debug('User.updateActiveById at User.update');
      Logger.debug(data);

      callback(err, data);
    });
  },

  updateActiveByCriteria(criteria, params, callback) {
    User.update(criteria, params).fetch().exec((err, data) => {
      Logger.debug('User.updateActiveByCriteria at User.update');
      Logger.debug(data);

      callback(err, data);
    });
  },

  createUser(params, callback) {
    User.create(params).fetch().exec((err, data) => {
      callback(err, data);
    });
  },

  findByPaginate(criteria, projection, skipNo, limitNo, sortColumn, callback) {
    User.find(criteria, projection).skip(skipNo).limit(limitNo).sort(sortColumn)
      .exec((err, data) => {
        callback(err, data);
      });
  },
};
