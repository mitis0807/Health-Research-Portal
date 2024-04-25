module.exports = {

  tableName: 'fijihrp_announcement',

  attributes: {
    isActive: {
      type: 'boolean',
      defaultsTo: true,
    },
    title: {
      type: 'string',
      defaultsTo: '',
    },
    content: {
      type: 'string',
      defaultsTo: '',
    },
  },
  customToJSON() {
    return _.omit(this, ['id']);
  },

  findActiveById(uid, callback) {
    Announcement.findOne({ uid, isActive: true }).exec((err, data) => {
      callback(err, data);
    });
  },
  
  async searchAnnouncement(searchTerm, callback) {
    try {
      Announcement.native((err, collection) => {
        console.log(err);
        collection.find({ title: { $regex: ".*"+searchTerm+".*" , $options:'i'} }).toArray((error, results) => {
          if (error) return callback(error);
          return callback(null, results);
        });
      });
    } catch (error) {
      Logger.debug(`in catch ${error}`);
      return callback(error);
    }
  },
  findActiveByCriteria(criteria, callback) {
    Announcement.findOne(criteria).exec((err, data) => {
      callback(err, data);
    });
  },

  async findActivesByCriteria(criteria, skip, callback) {
    try{
    const announcements = await Announcement.find({
      where: criteria,
      limit: sails.config.recordsPerPage,
      skip,
    }).sort('createdAt DESC');
    return callback(null, announcements);
  } catch (error) {
    return callback(error);
  }
  },

  updateActiveById(uid, params, callback) {
    Announcement.update({ uid, isActive: true }, params).fetch().exec((err, data) => {
      callback(err, data);
    });
  },

  createAnnouncement(params, callback) {
    Announcement.create(params).fetch().exec((err, data) => {
      callback(err, data);
    });
  },

  findByPaginate(criteria, projection, skipNo, limitNo, sortColumn, callback) {
    Announcement.find(criteria, projection).skip(skipNo).limit(limitNo).sort(sortColumn)
      .exec((err, data) => {
        callback(err, data);
      });
  },
  countByCriteria(criteria, callback) {
    Announcement.count(criteria).exec((err, count) => {
      console.log('no of records', count);
      callback(err, count);
    });
  },
};
