'use strict';
var router = require('express').Router();
module.exports = router;
var accountSid= require('../../env')['TWILIO']['clientID'];
var authToken = require('../../env')['TWILIO']['clientSecret'];

var client = require('twilio')(accountSid, authToken);

router.post('/', function(req,res,next){
	client.messages.create({ 
		// to: "+19148746170", 
		to: "+19497018406",
		from: "+17148743954", 
		body: req.body.groceryList,   
	}, function(err, message) { 
		if (err) next(err); 
		else res.json(message);
	});

})


