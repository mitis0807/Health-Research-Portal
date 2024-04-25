module.exports = function forbidden(data) {
    const req = this.req;
    const res = this.res;
    const sails = req._sails;
    
    if (data !== undefined) {
    sails.log.verbose('Sending 403 ("Forbidden") response: \n', data);
    } else {
    sails.log.verbose('Sending 403 ("Forbidden") response');
    }
    
    return res.send({ status: 403 });
    };