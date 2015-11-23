'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var _ = require('lodash');

var AWS = require('aws-sdk');

var accessKeyId =  require('../../../env')['AWS']['accessKey'];
var secretAccessKey = require('../../../env')['AWS']['secretKey'];

AWS.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
});

var s3 = new AWS.S3();


router.post('/', function (req, res, next) {

	var data = req.body.buffer;

	var params = {
            Bucket: 'stepssquared',
            Key: Date.now().toString(), //filename
            Body: data,
            ACL: 'public-read'
    };
    
    s3.putObject(params, function (err1, res1) {
    	if (err1) {
    		console.log("Error uploading data: ", err1);
    		res.send("Error", err1);
    	} else {
			console.log("Successfully uploaded data to AWS");
			res1.imageUrl = 'https://s3.amazonaws.com/stepssquared/' + key;
    		res.status(200).json(res1);
      	}
    });
});

module.exports = router;