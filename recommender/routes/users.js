var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:id', function(req, res, next) {
    res.json(req.params.id);
});

router.get('/:id/email', function(req, res, next) {
    res.json({user_id : req.params.id});
});

module.exports = router;
