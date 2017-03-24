require 'net/http'
require 'net/https'
require 'uri'
require 'json'

url = URI.parse('https://api.helios.earth/v1')
http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

api_key_id = ''
api_key_secret = ''

# Exchange API keys for an OAuth access token
req = Net::HTTP::Post.new(url.path + '/oauth/token')
req.basic_auth api_key_id, api_key_secret
req.body = 'grant_type=client_credentials'
res = http.request(req)
jwt = JSON.parse(res.body)['access_token']
puts jwt

# Request some data by including the access token in the Authorization header
req = Net::HTTP::Get.new(url.path + '/cameras', initheader = {'Authorization' => 'Bearer ' + jwt })
res = http.request(req)
puts res

# Request some data by including the access token in a POST body
req = Net::HTTP::Post.new(url.path + '/cameras/_search')
req.body = 'access_token=' + jwt
res = http.request(req)
puts res
