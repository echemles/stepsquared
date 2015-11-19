'use strict';
var router = require('express').Router();
module.exports = router;


router.use('/tutorials', require('./tutorials'));
router.use('/users', require('./users'));
router.use('/steps', require('./steps'));


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
