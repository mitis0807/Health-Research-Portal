
module.exports.models = {

  datastore: 'mongoServer',

  migrate: 'safe',
  // schema:true,
  attributes: {
    createdAt: { type: 'ref', columnType: 'datetime', autoCreatedAt: true },
    updatedAt: { type: 'ref', columnType: 'datetime', autoUpdatedAt: true },
    id: { type: 'string', columnName: '_id' }, // <-- for MongoDB
  },

  dataEncryptionKeys: {
    default: 'QrKVPHowccmKaS3jJUWFxonaugozjzo4cickdlFgRQk=',
  },

  cascadeOnDestroy: true,

};
