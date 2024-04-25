const uuidv4 = require('uuid/v4');

module.exports = {

  generateForgotPasswordLink(email, next) {
    Logger.debug('ForgotpasswordService.generateForgotPasswordLink');
    console.log('email in forget password service', email);

    User.findByCriteria({ email, isActive: true }, (err, userModel) => {
      console.log('generateForgotPasswordLink.usermodel');
      console.log('user model is forgot password service',userModel);

      let resetPassWordExpiry = Date.now() + 259200000; //3 days TTL

      if (err) {
        Logger.error(`ForgotpasswordService.generateForgotPasswordLink : User.findOneByCriteria ${err}`);
        next(err);
      } else if (!userModel) {
        console.log('user model in forgot service', userModel)
        next('user not exist');
      } else {
        console.log('generateForgotPasswordLink in else');

        if (userModel.role === 6) {
          User.updateActiveByCriteria({ email: userModel.email, isActive: true}, { resetPassWordExpiry }, (error, updatedUser) => {
            if (error) {
              console.log('All user update error', error)
            }
            else{
              console.log('investigator updated in all user collections', updatedUser)
            }
          });
          Investigator.updateActiveByCriteria({ email: userModel.email, isActive: true, isVerified: true }, { resetPassWordExpiry }, (error, updatedUser) => {
            if (error) {
              console.log('investigator update error', error)
            }
            else{
              console.log('updated investigator', updatedUser)
              EmailService.sendEmailForForgotPassword(updatedUser[0]);
            }
          });
        } else {
          User.updateActiveByCriteria({ email: userModel.email, isActive: true}, { resetPassWordExpiry }, (error, updatedUser) => {
            if (error) {
              console.log('user collection update error', error)
            }
            else{
              console.log('updated user successfully', updatedUser)
            }
          });
          InternalUser.updateActiveByCriteria({ email: userModel.email, isActive: true, isVerified: true }, { resetPassWordExpiry }, (error, updatedUser) => {
            if (error) {
              console.log('internal user error while updating', error)
            }
            else{
              console.log('updated internal user', updatedUser);
              EmailService.sendEmailForForgotPassword(updatedUser[0]);
            }
          });
        }
        console.log('*****Where to go??')
        next(null, userModel);
      }
    });
  },

};
