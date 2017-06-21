// Authenticate and request data using ECMAScript2015 (ES6) syntax and the fetch API
//
// Note that we are storing the API key id and secret in JavaScript code here
// to simplify the example. In general, you will not want to do this since the
// browser will not be able to protect the secret value. For production apps,
// consider generating your access tokens on your own server and then have your
// app retrieve the new access tokens as they are available.

const API = 'https://api.helios.earth/v1';
const API_KEY_ID = '';
const API_KEY_SECRET = '';

// Request an access token
fetch(API + '/oauth/token', {
  method:  'POST',
  headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
  body:    JSON.stringify({
    grant_type:    'client_credentials',
    client_id:     API_KEY_ID,
    client_secret: API_KEY_SECRET
   })
})
.then(response => response.json())
.then(fetchData)
.catch(err => {
  console.log('Error retrieving access token: ' + err.message);
});

// Request some data by including the access token in the Authorization header
function fetchData(json) {
  fetch(API + '/cameras', {
    headers: {'Authorization': 'Bearer ' + json.access_token},
    credentials: 'include'
  })
  .then(response => response.json())
  .then(json => {
    console.log(json);  // GeoJSON Feature Collection
  })
  .catch(err => {
    console.log('Error fetching camera data: ' + err.message);
  });
}
