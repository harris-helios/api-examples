var api = 'https://api.helios.earth/v1';
var api_key_id = '';
var api_key_secret = '';

// Exchange API keys for an OAuth access token
$.ajax({
  type:      'POST',
  url:       api + '/oauth/token',
  dataType:  'json',
  data:      {grant_type: 'client_credentials'},
  headers:   {'Authorization': 'Basic ' + btoa(api_key_id + ':' + api_key_secret)},
  xhrFields: {withCredentials: true},
  success:   function(data) { 
    var jwt = data.access_token;
    console.log(jwt);
    
    // Request some data by including the access token in the Authorization header
    $.ajax({
      type:      'GET',
      url:       api + '/cameras',
      dataType:  'json',
      headers:   {'Authorization': 'Bearer ' + jwt},
      xhrFields: {withCredentials: true},
      success:   function(data) { console.log(data); }
    });
    
    // Request some data by including the access token in a POST body
    $.ajax({
      type:      'POST',
      url:       api + '/cameras/_search',
      dataType:  'json',
      data:      {access_token: jwt},
      xhrFields: {withCredentials: true},
      success:   function(data) { console.log(data); }
    });
  }
});
