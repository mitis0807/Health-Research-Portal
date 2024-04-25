module.exports = {

    tableName: 'fijihrp_contactUs',
  
    attributes: {
      firstName: {
        type: 'string',
        required: true,
      },
  
      lastName: {
        type: 'string',
        required: true,
      },
  
      email: {
        type: 'string',
        required: true,
      },

      requestType: {
        type: 'string',
        required: true,
      },

      message:{
        type: 'string',
        required: true,
      }
     
    },
    createContactform(params, callback) {
      ContactUs.create(params).fetch().exec((err, data) => {
        callback(err, data);
      });
    },
  
  };