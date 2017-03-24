# Specify the API keys
API_KEY_ID=
API_KEY_SECRET=

# Specify the API version
export HELIOS_API_URL=https://api.helios.earth/v1

# Request an access token
curl -X POST $HELIOS_API_URL/oauth/token -d "grant_type=client_credentials" -u "$API_KEY_ID:$API_KEY_SECRET" > auth.json
export HELIOS_JWT=`jq '.access_token' auth.json | sed 's/"//g'`

# Request some data by including the access token in the Authorization header
curl -H "Authorization: Bearer $HELIOS_JWT" $HELIOS_API_URL/cameras

# Request some data by including the access token in a POST body
curl -X POST $HELIOS_API_URL/cameras/_search -d "access_token=$HELIOS_JWT"
