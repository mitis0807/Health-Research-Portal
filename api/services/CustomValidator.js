module.exports = {

  validatePassword(password, cb) {
    Logger.debug('CustomValidator.validatePassword');

    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    const minLength = 6;
    const maxLength = 20;
    if (password === undefined) {
      return cb('Please enter password');
    }
    if (password === '') {
      return cb('Please enter password');
    }
    if (password.length < minLength) {
      return cb('Password must be at least 6 characters long');
    }
    if (password.length > maxLength) {
      return cb('Password must be less than 20 characters');
    }
    for (const pass of password) {
      if (chars.indexOf(pass) === -1) {
        return cb('Password can only have number, alphabet & special chars(!@#$%^&*) ');
      }
    }
    return cb(null);
  },
};
