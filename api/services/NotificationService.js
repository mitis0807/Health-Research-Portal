/* eslint-disable no-param-reassign */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
/**
 * NotificationService.js
 *
 * @description :: Server-side services for Notifications
 */

const assert = require('chai').assert;
const moment = require('moment');

module.exports = {

  sendNotification(notifyType, notifyTitle, notifyLocals, notifyTo, isAction, actionData, callback) {
    Logger.debug('NotificationService.sendNotification');

    assert.isDefined(notifyType, 'notifyType cannot be undefined');
    assert.isDefined(notifyTitle, 'notifyTitle cannot be undefined');
    assert.isObject(notifyLocals, 'notifyLocals must be an object');
    assert.isArray(notifyTo, 'notifyTo must be an array');

    assert.isBoolean(isAction, 'isAction should be a boolean');

    if (!notifyTo.length) {
      return Logger.info('Notification Service: notifyTo empty not sending notification to anyone.');
    }

    if (checkNotifyTemplate(notifyType, notifyTitle, notifyLocals)) {
      sendNotification(notifyType, notifyTitle, notifyLocals, notifyTo, isAction, actionData, callback);
    }
  },
  // Get templates for different types of web notifications . Templates are stored in sails.config.notifyTemplates
  getNotificationTemplate(notification, callback) {
    Logger.debug('NotificationService.getNotificationTemplate');

    const template = sails.config.notifyTemplates[notification.notifyTitle][notification.notifyType];
    Logger.warn(template);
    const view = setTemplateData(template, notification.notifyLocals);
    return callback(null, view);
  },
  getNotifications(userId, pageNo, callback) {
    Logger.debug('NotificationService.getNotifications');
    const limit = (pageNo) * sails.config.recordsPerPage;

    Notification.findByCriteria({ user: userId }, limit, (err, notificationData) => {
      if (err) {
        Logger.verbose(`NotificationService.getNotifications at Notification.findByCriteria err ${err}`);
      } else {
        Notification.countByCriteria({ user: userId }, (error, notificationCount) => {
          if (error) {
            Logger.verbose(`NotificationService.getNotifications at Notification.countByCriteria err ${err}`);
          } else {
            callback(null, notificationData, notificationCount);
          }
        });
      }
    });
  },
};

function sendNotification(notifyType, notifyTitle, notifyLocals, notifyTo, isAction, actionData, callback) {
  const notifiedTo = [];
  const notifyFailed = [];
  const notifyLength = notifyTo.length;
  for (let i = 0; i < notifyLength; i += 1) {
    const notification = {
      user: notifyTo[i].id,
      notifyType,
      notifyTitle,
      notifyLocals,
      isAction,
      isRead: false,
      isDelivered: false,
      isActive: true,
      type: 'Notification',
    };
    Logger.verbose(notification);
    if (isAction) {
      notification.actionData = actionData;
    }
    console.log(notification);
    Notification.createNotification(notification, (createErr, notify) => {
      if (createErr) {
        notifyFailed.push(notification.user);
        if ((notifyFailed.length + notifiedTo.length) === notifyLength) { callback({ errMsg: 'Server Error', notifyFailed }, notifiedTo); }
        return;
      }
      Logger.verbose('notification created sucessfully');
      NotificationService.getNotificationTemplate(notify, (err, template) => {
        if (err || !user) {
          notifyFailed.push(notify.user);
          if ((notifyFailed.length + notifiedTo.length) === notifyLength) { callback({ errMsg: 'Server Error', notifyFailed }, notifiedTo); }
          return;
        }
        notify.template = template;
        Logger.verbose('template', template);
        sails.sockets.broadcast(notify.user, 'notification', {
          badgeCount: updatedUser.notificationBadge,
          notification: [notify],
        });
        notifiedTo.push(notify.user);

        if ((notifyFailed.length + notifiedTo.length) === notifyLength) {
          if (notifyFailed.length) { callback({ errMsg: 'Server Error', notifyFailed }, notifiedTo); } else { callback(null, notifiedTo); }
        }
      });
    });
  }
}

//* ****** Notification Template Methods ******//

function setTemplateData(template, locals) {
  Logger.debug('NotificationService.setTemplateData');
  for (const key in locals) {
    template = template.replace(new RegExp(`{{${key}}}`, 'g'), locals[key]);
  }
  return template;
}

function checkNotifyTemplate(notifyType, notifyTitle, notifyLocals) {
  Logger.debug('NotificationService.checkNotifyTemplate');
  assert.isString(sails.config.notifyTemplates[notifyTitle][notifyType], `notifyTemplate error. template for ${notifyTitle} is missing`);

  const template = sails.config.notifyTemplates[notifyTitle][notifyType];
  const templateParams = template.match(/{{\w+}}/g);

  const createdAt = new Date();
  notifyLocals.createdAt = createdAt.toISOString();
  notifyLocals.displayDate = moment(new Date(createdAt)).format('DD MMM, YYYY HH:mm');
  notifyLocals.icon = 'thumb-up gx-text-blue';
  
  for (const templateParam of templateParams) {
    const templateParam1 = templateParam.slice(2, -2);
    assert.ok(notifyLocals[templateParam1], `Missing Template Param ${templateParam} in notifyTemplates.js`);
  }
  return true;
}
