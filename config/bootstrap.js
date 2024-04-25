/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

const AgendaService = require("../api/services/AgendaService");

module.exports.bootstrap = (cb) => {
  function logAndExitSails(err, message) {
    console.log(err.message);
    sails.log.error(err.message);
    console.log(message);
    sails.log.error(message);
    return setTimeout(() => {
      process.exit();
    }, 3000);
  }

  const registrationData = 
    {
      email: 'am3326@njit.edu',
      password: '123456',
      role: 3,
    }
    
    
    console.log('registrationData length',registrationData.length)
    // for(var i=0;i<registrationData.length;i++){
  UserService.registration(registrationData, (registrationErr, registeredUSer) => {
    if (registrationErr) {
      if (registrationErr === 'Already Present') {
        sails.log.info('Super Admin exists.');
      AgendaService.reminderUniversityUsers();
        cb();
      } else {
        logAndExitSails(registrationErr, 'Error while creating Super Admin. Please contact your Administrator.');
      }
    } else if (!registeredUSer) {
      logAndExitSails(registrationErr, 'Error while creating Super Admin. Please contact your Administrator.');
    } else {
      sails.log.info('Super Admin created successfully.');
      AgendaService.reminderUniversityUsers();
      cb();
    }
  });
// }
};
