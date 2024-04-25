/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  baseURL: 'http://localhost:3006',
  APIURL: 'http://localhost:1340',

  // baseURL: 'http://staginghrp.wishtreetech.com',
  // APIURL: 'http://staginghrp.wishtreetech.com',

  // baseURL:'https://uat-who-fiji-hrp.wishtree.tech',
  // APIURL:'https://uat-who-fiji-hrp.wishtree.tech',

  noreplyEmail: 'noreply@wishtreetech.com',
  noreplyEmailPass: 'm3ss3ng34',
  recordsPerPage: 10,
  mongoConnectionString: 'mongodb://mongoDB/FijiHRP',


  // connection : mongodb
  datastores: {
    // mongoServer: {
    //   adapter: 'sails-mongo',
    //   host: '172.17.0.1',
    //   port: 27018,
    //   database: 'FijiHRP',
    // }, 
    mongoServer: {
      adapter: 'sails-mongo',
      url: 'mongodb://mongoDB/FijiHRP',
    },
  },

  /** *************************************************************************************************
   * Logger Configuration
   * This should have the following configuration -
   * 1. logLevelConfig - should have all the levels : debug, info, warn, error. Every level must have a channels key with
   *    an array value. You can define the channels in this array.
   * 2. channels - should have configurations for every channel specified in `logLevelConfig`. Each channel should
   *    have the key as its name and type field which can be one of the following values - slack, email, console, file.
   * 3. console is the default channel that requires no configuration in `channels`.
   * 4. file channel should have the following  fields :`fileName` - filePath of the log file to be used.
   **************************************************************************************************** */

  logger: {
    channels: {
      file: {
        type: 'file',
        fileName: 'FijiHRP_Logs/popp.logs/popp.log',
      },
      errorFile: {
        type: 'file',
        fileName: 'FijiHRP_Logs/popp.logs/error.popp.log',
      },
    },

    logLevelConfig: {
      verbose: {
        channels: ['console','file'],
      },
      debug: {
        channels: ['console'],
      },
      info: {
        channels: ['console'],
      },
      warn: {
        channels: ['console'],
      },
      error: {
        channels: ['console'],
      },
    },
  },
};
