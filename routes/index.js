const {config} = require('./../config/serverconfig');

var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
     res.render('index', { title: config.server.appName});
});

/* GET home page. */
router.get('/doc', function(req, res, next) {
    res.render('analysis', { title: config.server.appName});
});


module.exports = router;  