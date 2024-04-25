
module.exports = {

  tableName: 'fijihrp_investigator',

  attributes: {

    email: {
      type: 'string',
      required: true,
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

  findByCriteria(criteria, callback) {
    Investigator.find(criteria).exec((err, data) => {
      callback(err, data);
    });
  },

  findActiveById(id, callback) {
    Investigator.findOne({ where: { id, isActive: true } }).exec((err, data) => {
      callback(err, data);
    });
  },

  findActiveByCriteria(criteria, callback) {
    console.log('criteria................', criteria);
    Investigator.findOne(criteria).exec((err, data) => {
      console.log('data..............', data);
      callback(err, data);
    });
  },

  updateActiveById(id, params, callback) {
    Investigator.update({ id, isActive: true }, params).fetch().exec((err, data) => {
      callback(err, data);
    });
  },
  updateActiveByCriteria(criteria, params, callback) {
    Investigator.update(criteria, params).fetch().exec((err, data) => {
      callback(err, data);
    });
  },

};
