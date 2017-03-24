// Authenticate and request data using Node.js and the request module from NPM

var request = require('request');
var api = 'https://api.helios.earth/v1';
var auth = {
  user: '',  // api key id
  pass: '',  // api key secret
  sendImmediately: true
};

// Exchange API keys for an OAuth access token
request.post({
  url:  api + '/oauth/token', 
  auth: auth, 
  json: {grant_type: 'client_credentials'}
}, function(err, res, body) {
  var jwt = body.access_token;
  
  // Request some data by including the access token in the Authorization header
  request.get({
    url: api + '/cameras', 
    headers: {authorization: 'Bearer ' + jwt}, 
    json: true
  }, function(err, res, body) {
    console.log(body);
  });
  
  // Request some data by including the access token in a POST body
  request.post({
    url: api + '/cameras/_search', 
    json: {access_token: jwt}
  }, function(err, res, body) {
    console.log(body);
  });
});
