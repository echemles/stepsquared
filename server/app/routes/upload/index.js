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

// @OB heavy router logic, I'd recommend abstracting to some sort of custom module, "S3Utility" or whatever, or perhaps with your media model code
router.post('/', function (req, res, next) {
    var media = req.body;
    var ext = media.name.match(/\..{3}/)[0]
    var key = Date.now().toString() + ext;
	var params = {
            Bucket: 'step-squared-media',
            Key: key,
            ContentType: media.type,
            Expires: 60,
            ACL: 'public-read'
    };
    
    s3.getSignedUrl('putObject', params, function (err, data) {
    	if (err) {
    		console.log("Error uploading data: ", err);
    		res.send("Error", err);
    	} else {
            var return_data = {
                signed_request: data,
                url: 'https://step-squared-media.s3.amazonaws.com/' + key
            }
			console.log("Successfully sent presigned URL."); // @OB dead code
    		res.write(JSON.stringify(return_data));
            res.end();
      	}
    });
});

module.exports = router;