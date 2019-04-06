var express = require('express');
var router = express.Router();

var request = require('request');
const curl = new (require( 'curl-request' ))();


/* GET home page. */
router.get('/', function(req, res, next) {

  request.get('https://api.instagram.com/v1/users/self/?access_token=ACCESS-TOKEN', function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
  });
  
  let algo = req.body.data;
  console.log('algo:',algo)
  
  res.render('index', { title: 'Instagram API'});
});

module.exports = router;
