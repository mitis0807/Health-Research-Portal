const uuidv4 = require('uuid/v4');

module.exports = {

  saveAnnouncement(announcementData, callback) {
    Logger.debug('AnnouncementService.saveAnnouncement');
    const uniqueUUID = uuidv4();
    announcementData.uid = uniqueUUID;
    Announcement.createAnnouncement(announcementData, (err, savedAnnouncement) => {
      if (err) {
        Logger.error(`AnnouncementService.saveAnnouncement at Announcement.createAnnouncement ${err}`);
        callback(err);
      } else {
        Logger.info('Announcement details saved successfully.');
        callback(null, savedAnnouncement);
      }
    });
  },

  getAnnouncement(announcementId, callback) {
    Logger.debug('AnnouncementService.getAnnouncement');
    Announcement.findActiveById(announcementId, (err, announcementData) => {
      if (err) {
        Logger.error(`AnnouncementService.getAnnouncement at Announcement.findActiveById ${err}`);
        callback(err);
      } else {
        callback(null, announcementData);
      }
    });
  },

  updateAnnouncement(uid, announcementData, callback) {
    Logger.debug('AnnouncementService.updateAnnouncement');
    delete announcementData.uid;
    Announcement.updateActiveById(uid, announcementData, (err, updatedAnnouncement) => {
      if (err) {
        Logger.error(`AnnouncementService.updateAnnouncement at Announcement.updateActiveById ${err}`);
        callback(err);
      } else {
        Logger.info('Announcement details updated successfully.');
        callback(null, updatedAnnouncement);
      }
    });
  },

  getAllAnnouncements(pageNo, callback) {
    Logger.debug('AnnouncementService.getAllAnnouncements');
    const skip = (pageNo - 1) * sails.config.recordsPerPage;
    Announcement.findActivesByCriteria({}, skip, (err, allActiveAnnouncements) => {
      if (err) {
        Logger.error(`AnnouncementService.getAllAnnouncements at Announcement.findActivesByCriteria ${err}`);
        callback(err);
      } else {
        Announcement.countByCriteria({}, (countErr, count) => {
          if (countErr) {
            Logger.error(`AnnouncementService.getAllAnnouncements at Announcement.countByCriteria ${countErr}`);
            callback(err);
          } else {
            callback(null, allActiveAnnouncements, count);
          }
        });
      }
    });
  },

  getActiveAnnouncements(pageNo, callback) {
    Logger.debug('AnnouncementService.getActiveAnnouncements');
    const skip = (pageNo - 1) * sails.config.recordsPerPage;

    Announcement.findActivesByCriteria({ isActive: true }, skip, (err, announcementData) => {
      if (err) {
        Logger.error(`AnnouncementService.getActiveAnnouncements at Announcement.findActivesByCriteria ${err}`);
        callback(err);
      } else {
        Announcement.countByCriteria({ isActive: true }, (countErr, count) => {
          if (countErr) {
            Logger.error(`AnnouncementService.getActiveAnnouncements at Announcement.countByCriteria ${countErr}`);
            callback(err);
          } else {
            callback(null, announcementData, count);
          }
        });
      }
    });
  },
  searchAnnouncement(searchTerm, callback) {
    Logger.debug('AnnouncementService.searchAnnouncement');
    Announcement.searchAnnouncement(searchTerm, (err, announcementData) => {
      if (err) {
        Logger.error(`AnnouncementService.searchAnnouncement at Application.searchAnnouncement ${err}`);
        callback(err);
      } else {
        console.log('announcementData', announcementData);
        callback(null, announcementData);
      }
    });
  },
};
