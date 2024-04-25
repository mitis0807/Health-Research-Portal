const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((req, user, done) => {
 if (user.role === 1 || user.role === 2 || user.role === 3 || user.role === 4 || user.role === 5 || user.role === 7 || user.role === 8 || user.role === 9 || user.role === 10) {
    InternalUser.findOne({ id: user.id }, (err, userData) => {
      done(err, userData);
    });
  } else {
    User.findOne({ id: user.id }, (err, userData) => {
      done(err, userData);
    });
  }
});

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true,
},
((req, username, password, done) => {
  Logger.debug('password LocalStrategy');
  console.log(username);
  User.findOne({ email: req.body.username.toLowerCase(), isActive: true }, (err, user) => {
    console.log('0000000000');
    console.log(err);
    console.log(user);
    if (err) {
      Logger.error(`Passport : at user.findOne ${err}`);
      return done(err);
    }
    if (!user) {
      Logger.warn({ message: 'Incorrect Username' });
      return done(null, false, { message: 'Incorrect Username' });
    }
    if (!user.password) {
      Logger.warn({ message: 'Incorrect Password' });
      return done(null, false, { message: 'Incorrect Password' });
    }
    bcrypt.compare(password, user.password, (bcryptErr, res) => {
      if (bcryptErr) {
        Logger.warn('password bcrypt Error');
        return done(bcryptErr);
      }
      if (!res) {
        Logger.warn({ message: 'Incorrect Password' });
        return done(null, false, { message: 'Incorrect Password' });
      }
     if (user.role === 1 || user.role === 2 || user.role === 3) {
        InternalUser.findActiveByCriteria({ email: user.email.toLowerCase() }, (findActiveByCriteriaErr, internalUser) => {
          if (err) {
            Logger.error(`Passport: at InternalUser.findActiveByCriteria ${findActiveByCriteriaErr}`);
            return res.send({ status: 300, message: 'Something went wrong. Please try again later.', user: null });
          }
          Logger.info({ message: 'Logged In Successfully' });
          console.log('in passport',internalUser)
          return done(null, internalUser, { message: 'Logged In Successfully' });
        });
      } else {
        Logger.info({ message: 'User Not found' });
        return done(null, null, { message: 'User not found' });
      }
    });
  });
})));
