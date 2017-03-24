def api = 'https://api.helios.earth/v1'
def api_key_id = ''
def api_key_secret = ''
def jwt

// Exchange API keys for an OAuth access token
"${api}/oauth/token".toURL().openConnection().with {
  setRequestMethod('POST')
  setRequestProperty('Authorization', 'Basic ' + (api_key_id + ':' + api_key_secret).bytes.encodeBase64())
  setDoOutput(true)
  outputStream << ('grant_type=client_credentials' as byte[])
  jwt = new groovy.json.JsonSlurper().parseText(inputStream.text).access_token
  println jwt
}

// Request some data by including the access token in the Authorization header
"${api}/cameras".toURL().openConnection().with {
  setRequestProperty('Authorization', "Bearer ${jwt}")
  println inputStream.text
}

// Request some data by including the access token in a POST body
"${api}/cameras/_search".toURL().openConnection().with {
  setRequestMethod('POST')
  setDoOutput(true)
  outputStream << ("access_token=${jwt}" as byte[])
  println inputStream.text
}
