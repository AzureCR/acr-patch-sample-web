var express = require('express');

var router = express.Router();

var os = require('os')
var http = require("http");

var backend = process.env['BACKEND']||""

/* GET home page. */
router.get('/', function(req, res, next) {
  if(backend != "")
  {
    InvokeAPI(backend, (s)=>{
      res.render('index', 
        { 
          title: 'ACR Build Sample', 
          content: 'Backend returned  ' + JSON.stringify(s, null, 2) 
        }); 
    });
  } else{
    res.render('index', 
      { 
        title: 'ACR Build Sample',
        content: 'Backend is not configured'
      });
  }
});

function InvokeAPI(endpoint, callback) {
  var url = "http://" + endpoint + "/api/values";
  http.get(url, function(res){
    var body = '';
    res.on('data', function(chunk){
        body += chunk;
    });

    res.on('end', function(){
        var resp = JSON.parse(body);
        console.log("Got a response: ", resp);
        callback(resp);
    });
  }).on('error', function(e){
      console.log("Got an error: ", e);
  });
}

module.exports = router;
