/**
* AuditLog.js
*
* @description :: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  tableName: 'fijihrp_auditLog',
  attributes: {
    requestTime: {
      type: 'string',
      columnType: 'date',
    },
    userId: {
      type: 'string',
    },
    userRole: {
      type: 'string',
    },
    action: {
      type: 'string',
    },
    remoteAddress: {
      type: 'string',
    },
    method: {
      type: 'string',
    },
    source: {
      type: 'string',
    },
  },
};
