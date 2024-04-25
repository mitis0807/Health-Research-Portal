module.exports = {

  generateForgotPasswordLink(req, res) {
    Logger.debug('ForgotpasswordController.generateForgotPasswordLink');
    const email = req.body.email.toLowerCase();
    Logger.verbose(email);

    ForgotpasswordService.generateForgotPasswordLink(email, (err) => {
      console.log('err', err);
      if (err) {
        console.log('in errrrrrr ifffff');
        if (err === 'user not exist') {
          return res.send({ status: 300, message: 'No such user exists' });
        }
        Logger.error(err, 'ForgotpasswordController.generateResetPasswordLink at ForgotpasswordService.generateResetPasswordLink');
        return res.send({ status: 300, message: sails.config.serverMessage.serverError });
      }
      console.log('after hitting fotgot password service comes back here')
      return res.send({ status: 200, message: sails.config.serverMessage.setPassworkLink });
    });
  },

  getForgotPasswordLinkStatus(req, res){
    let email = req.body.email;
    User.findActiveByCriteria({email}, (error, user) => {
      // { where: { id: userId, resetPassWordExpiry: { '>': Date.now() } } }
      if (error) {
        Logger.error(`AuthController.resetPassword at User.findActiveByCriteria ${error}`);

        return res.send({ status: 300, message: sails.config.serverMessage.somethingWrong });
      }
      if (user === undefined) {
        Logger.debug(`AuthController.resetPassword at User.findActiveByCriteria`);
        Logger.debug(user);
        return res.send({ status: 300, message: sails.config.serverMessage.notConfirmedRegistration });
      }
      else {
        Logger.debug(`AuthController.resetPassword at User.findActiveByCriteria`);
        Logger.debug(user);
        if(user.resetPassWordExpiry > Date.now())
          return res.send({ status: 200, message: 'Reset password link is active' });
        else
          return res.send({ status: 300, message: sails.config.serverMessage.linkExpired });
      }
    })
  },
};
