module.exports = {

  sendNotification(req, res) {
    Logger.debug('NotificationController.sendNotification');
    Logger.verbose(req.body);
    const notifyType = 'UserProfile';
    const notifyTitle = 'UpdateProfile';
    const notifyLocals = {
      name: 'Pratiksha',
    };
    const notifyTo = [{ id: '5dea4c7021c019003e9dce4c' }];
    const isAction = true;
    const actionData = { actionType: 'navigation', action: 'Go to Setting', actionUrl: '/settings' };
    NotificationService.sendNotification(notifyType, notifyTitle, notifyLocals, notifyTo, isAction, actionData, (err, notifiedTo) => {
      if (err) {
        Logger.error(err, 'NotificationController.sendNotification at NotificationService.sendNotification');
        res.send({ status: 300, message: 'serverError' });
      } else {
        Logger.debug(`Notifications sent to ${notifiedTo}`);
        res.send({ status: 200, message: `Notifications sent to ${notifiedTo}` });
      }
    });
  },

  subscribeNotification(req, res) {
    Logger.debug('NotificationController.subscribeNotification');
    Logger.verbose(req.body.id);
    if (req.socket && req.body.id) {
      sails.sockets.join(req.socket, req.body.id);
      res.json({ message: `Subscribed to a room called ${req.body.id}!` });
    } else {
      res.json({ message: 'Unauthorized access ' });
    }
  },
  getNotifications(req, res) {
    Logger.debug('NotificationController.getNotifications');
    Logger.verbose(req.body);
    const pageNo = req.body.pageNo;
    NotificationService.getNotifications(req.session.user.id, pageNo, (err, response, count) => {
      if (err) {
        res.send({ status: 300, message: 'serverError' });
      } else {
        res.send({ status: 200, response, count });
      }
    });
  },
  test(req, res) {
    res.view('test');
  },
};
