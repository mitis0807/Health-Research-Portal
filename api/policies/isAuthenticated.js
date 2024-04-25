// eslint-disable-next-line consistent-return
module.exports = function auth(req, res, next) {
  Logger.debug('Policy :: isAuthenticate');
  Logger.verbose(req.session.user);
  console.log("user in session",req.session.user)
  console.log('req session',req.session.authenticated)
  if (req.isAuthenticated()) {
    req.session.authenticated = true;
    const user = req.user;
    // console.log('user',user)
    req.session.user = {};
    req.session.user.id = user.id;
    req.session.user.role = user.role;
    req.session.user.firstName = user.firstName;
    req.session.user.lastName = user.lastName;
    req.session.user.email = user.email;
    return next();
  }
  if (req.xhr) {
    return res.send({ status: 401, message: 'The user session has expired. Please login!' });
  }
  if (req.session.authenticated === undefined) {
    return res.send({ status: 401, message: 'Please login.' });
  }
  return res.send({ status: 401, message: 'The user session has expired. Please login!' });
};
