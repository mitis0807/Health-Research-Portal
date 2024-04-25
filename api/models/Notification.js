module.exports = {
  datastore: 'mongoServer',
  tableName: 'fijihrp_notification',
  attributes: {
    id: { type: 'string', columnName: '_id' },
    createdAt: { type: 'ref', columnType: 'datetime', autoCreatedAt: true },
    updatedAt: { type: 'ref', columnType: 'datetime', autoUpdatedAt: true },
    notifyType: {
      type: 'string',
    },
    notifyTitle: {
      type: 'string',
    },
    notifyLocals: {
      type: 'json',
    },
    isAction: {
      type: 'boolean',
    },
    isRead: {
      type: 'boolean',
    },
    isDelivered: {
      type: 'boolean',
    },
    isActive: {
      type: 'boolean',
      required: true,
    },
  },

  createNotification(params, callback) {
    Notification.create(params).fetch().exec((err, data) => {
      callback(err, data);
    });
  },

  updateActiveById(id, params, callback) {
    Notification.update({ where: { id, isActive: true } }, { isRead: true }, (err, obj) => {
      callback(err, obj);
    });
  },
  findActiveNotificationsByBatch(userid, lastNotifyTime, batch, callback) {
    Notification.find({
      where: {
        user: userid, createdAt: { $lt: lastNotifyTime }, type: 'Notification', isActive: true,
      },
    }).sort({ createdAt: -1 }).limit(batch).exec((err, notifications) => {
      callback(err, notifications);
    });
  },
  countByCriteria(criteria, callback) {
    Notification.count(criteria).exec((err, nos) => {
      callback(err, nos);
    });
  },
  findByPaginate(searchTable, projection, showPage, iDisplayLength, sortColumn, callback) {
    Notification.find(searchTable, projection).paginate({ page: showPage, limit: iDisplayLength }).sort(sortColumn).exec((err, data) => {
      callback(err, data);
    });
  },
  async findByCriteria(criterion, limit, callback) {
    const data = await Notification.find({ where: criterion, limit }).sort('createdAt DESC');
    callback(null, data);
  },
};
