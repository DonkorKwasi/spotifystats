var https = require('https');
const express = require('express');
const bodyParser = require("body-parser");
const request = require("request");
const { buffer } = require('rxjs');
const app = express();
app.use(express.static('./dist/spotifystats'));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.listen(process.env.PORT || 8080);


var client_id = '3b4a09d08d634156b36117aed03332e5';
var client_secret = 'f6f409a0924e4d09ad1630be3411d6a7';


var token
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' +  Buffer.from(client_id + ':' + client_secret).toString('base64')
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};


app.get('/', function(req, res) {
  res.sendFile(express.static('index.html'), {root: 'dist/spotifystats'}
);
});
app.get('/token', function(req,res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
       token = body.access_token;
       console.log(token)
    }
  });

    res.status(200).json(token)
})