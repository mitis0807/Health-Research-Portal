module.exports = function sendOK() {
    const req = this.req;
    const res = this.res;
    const sails = req._sails;
    
    sails.log.silly('res.ok() :: Sending 200 ("OK") response');
    
    return res.send({ status: 200 });
    };