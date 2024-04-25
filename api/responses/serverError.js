/* eslint-disable eqeqeq */
module.exports = function serverError(data) {
    Logger.warn('Server Error');
    const req = this.req;
    const res = this.res;
    const sails = req._sails;
    
    if (data) {
    sails.log.error('Sending 500 ("Server Error") response: \n', data);
    } else {
    sails.log.error('Sending 500 ("Server Error") response');
    }
    
    return res.send({ status: 500 });
    };