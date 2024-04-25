
const pass = require('passport');

module.exports.http = {

  middleware: {

    passportInit: pass.initialize(),
    passportSession: pass.session(),

    order: [
      'cookieParser',
      'session',
      'passportInit',
      'passportSession',
      'myRequestLogger',
      'bodyParser',
      'compress',
      '$custom',
      'router',
      'www',
      'favicon',
    ],

    myRequestLogger(req, res, next) {
      const url = req.url;
      Logger.info(`Request Time : ${new Date()} : ${url}`);
      Logger.info(`Request Method : ${req.method}`);
      next();
    },

  },
};
