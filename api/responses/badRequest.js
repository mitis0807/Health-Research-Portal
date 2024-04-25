module.exports = function badRequest(data) {
    const req = this.req;
    const res = this.res;
    const sails = req._sails;
    
    if (data !== undefined) {
    sails.log.verbose('Sending 400 ("Bad Request") response: \n', data);
    } else {
    sails.log.verbose('Sending 400 ("Bad Request") response');
    }
    
    return res.send({ status: 400 });
    };