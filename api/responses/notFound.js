module.exports = function notFound(data) {
    const req = this.req;
    const res = this.res;
    const sails = req._sails;
    
    if (data !== undefined) {
    sails.log.verbose('Sending 404 ("Not Found") response: \n', data);
    } else {
    sails.log.verbose('Sending 404 ("Not Found") response');
    }
    
    return res.send({ status: 404 });
    };