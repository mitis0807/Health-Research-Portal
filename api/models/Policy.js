module.exports = {

  tableName: 'fijihrp_policy',

  attributes: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
  },

  findByCriteria(criteria, callback) {
    Policy.find(criteria).exec((err, data) => {
      callback(err, data);
    });
  },

  findActiveById(id, callback) {
    Policy.findOne({ id, isActive: true }).exec((err, data) => {
      callback(err, data);
    });
  },

  updateActiveById(id, params, callback) {
    Policy.update({ id, isActive: true }, params).fetch().exec((err, data) => {
      callback(err, data);
    });
  },

  createPolicy(params, callback) {
    Policy.create(params).fetch().exec((err, data) => {
      callback(err, data);
    });
  },

  findByPaginate(criteria, projection, skipNo, limitNo, sortColumn, callback) {
    Policy.find(criteria, projection).skip(skipNo).limit(limitNo).sort(sortColumn)
      .exec((err, data) => {
        callback(err, data);
      });
  },

};
