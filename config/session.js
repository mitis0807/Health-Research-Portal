/**
 * Session Configuration
 * (sails.config.session)
 *
 * Use the settings below to configure session integration in your app.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For all available options, see:
 * https://sailsjs.com/config/session
 */

module.exports.session = {

  /** *************************************************************************
  *                                                                          *
  * Session secret is automatically generated when your new app is created   *
  * Replace at your own risk in production-- you will invalidate the cookies *
  * of your users, forcing them to log in again.                             *
  *                                                                          *
  ************************************************************************** */
  secret: '4db18dbc5d813c696ba89679c0c1d04a',

  cookie: {
    // Cookie expiration in milliseconds.
    // For example, use 24 * 60 * 60 * 1000 to make sessions expire in 24 hours.
    // Default is null, making it a browser cookie, so the session will
    // last only for as long as the browser is open.
     maxAge: 1 * 30 * 60 * 1000, 
    // maxAge: 0.25 * 1 * 60 * 1000, 

     //1800000 --> 30 mins
    // Path that the cookie is valid for.
    path: '/',
    rolling: true,
    // Should the session cookie be HTTP-only? (See https://www.owasp.org/index.php/HttpOnly)
    // httpOnly: true,
    // Should the session cookie be secure? (only valid for HTTPS sites)
    // secure: false,
  },
  /** *************************************************************************
  *                                                                          *
  * Customize when built-in session support will be skipped.                 *
  *                                                                          *
  * (Useful for performance tuning; particularly to avoid wasting cycles on  *
  * session management when responding to simple requests for static assets, *
  * like images or stylesheets.)                                             *
  *                                                                          *
  * https://sailsjs.com/config/session                                       *
  *                                                                          *
  ************************************************************************** */
  // isSessionDisabled: function (req){
  //   return !!req.path.match(req._sails.LOOKS_LIKE_ASSET_RX);
  // },

};
