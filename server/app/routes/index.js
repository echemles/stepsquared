'use strict';
var router = require('express').Router();
module.exports = router;


router.use('/tutorials', require('./tutorials'));
router.use('/users', require('./users'));
router.use('/steps', require('./steps'));
router.use('/categories', require('./categories'));
router.use('/help', require('./help'));
router.use('/media', require('./media'));
router.use('/upload', require('./upload'));


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
