const ContactUs = require("../models/ContactUs");

module.exports = 
{
    createContactform(contactData, callback){
        ContactUs.createContactform(contactData, (err, data)=>{
            if (err) {
                Logger.error(`ContactUsService.createContactform at ContactUs.createContactform ${err}`);
                console.log('error comes back in contact service', err)
                callback(err);
              } else {
                Logger.info('InternalUser details updated successfully.');
                callback(null, data);
            }
        })
    }
};