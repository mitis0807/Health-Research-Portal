import React from 'react';


const environmentVar = {


  // production
  // APIURL: process.env.NODE_ENV === 'development' ? 'http://:1337/api' : process.env.NODE_ENV === 'production' ? 'http://:1337/api' : null,
  // baseURL: 'http://localhost:1337',

 // staging
  // APIURL: 'http://staginghrp.wishtreetech.com/api',
  // baseURL: 'http://staginghrp.wishtreetech.com',
  //  documentURL: 'http://staginghrp.wishtreetech.com/file',

APIURL: 'http://localhost:1340/api',
   baseURL: 'http://localhost:3006',
  documentURL: 'http://localhost:1340/',
//uat
// APIURL : 'https://uat-who-fiji-hrp.wishtree.tech/api',
// baseURL:'https://uat-who-fiji-hrp.wishtree.tech',
// documentURL:'https://uat-who-fiji-hrp.wishtree.tech/file',
};
export default environmentVar;
