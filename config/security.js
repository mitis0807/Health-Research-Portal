/**
 * Security Settings
 * (sails.config.security)
 *
 * These settings affect aspects of your app's security, such
 * as how it deals with cross-origin requests (CORS) and which
 * routes require a CSRF token to be included with the request.
 *
 * For an overview of how Sails handles security, see:
 * https://sailsjs.com/documentation/concepts/security
 *
 * For additional options and more information, see:
 * https://sailsjs.com/config/security
 */

module.exports.security = {
  cors: {
    allRoutes: true,
    // allowOrigins:"*",
     //  allowOrigins: ['http://staginghrp.wishtreetech.com','https://uat-who-fiji-hrp.wishtree.tech'],
    allowOrigins: ['http://localhost:8080', 'http://172.17.0.1:8080', 'http://192.168.1.19:1337', 'http://localhost:9000', 'http://localhost:1338', 'http://192.168.1.19:1338', 'http://192.168.1.19:8080', 'http://192.168.1.19:3006', 'http://192.168.1.15:1338', 'http://192.168.1.15:8080', 'http://localhost:1337', 'http://localhost:1340', 'http://localhost:3006'],
    allowCredentials: true,
    allowAnyOriginWithCredentialsUnsafe: true,
    allowRequestMethods: 'GET, POST, OPTIONS, HEAD, PATCH , DELETE',
    allowRequestHeaders: 'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept, Authorization,Access-Control-Allow-Origin',
    allowResponseHeaders: 'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept, Authorization,Access-Control-Allow-Origin',
  },
  /** *************************************************************************
  *                                                                          *
  * CORS is like a more modern version of JSONP-- it allows your application *
  * to circumvent browsers' same-origin policy, so that the responses from   *
  * your Sails app hosted on one domain (e.g. example.com) can be received   *
  * in the client-side JavaScript code from a page you trust hosted on _some *
  * other_ domain (e.g. trustedsite.net).                                    *
  *                                                                          *
  * For additional options and more information, see:                        *
  * https://sailsjs.com/docs/concepts/security/cors                          *
  *                                                                          *
  ************************************************************************** */

  // cors: {
  //   allRoutes: false,
  //   allowOrigins: '*',
  //   allowCredentials: false,
  // },


  /** **************************************************************************
  *                                                                           *
  * By default, Sails' built-in CSRF protection is disabled to facilitate     *
  * rapid development.  But be warned!  If your Sails app will be accessed by *
  * web browsers, you should _always_ enable CSRF protection before deploying *
  * to production.                                                            *
  *                                                                           *
  * To enable CSRF protection, set this to `true`.                            *
  *                                                                           *
  * For more information, see:                                                *
  * https://sailsjs.com/docs/concepts/security/csrf                           *
  *                                                                           *
  *************************************************************************** */

  // csrf: false

};
