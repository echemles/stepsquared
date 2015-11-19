'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/steps', require('./steps'));
router.use('/tutorials', require('./tutorials'));
router.use('/users', require('./users'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
