var express = require('express');
var router = express.Router();
let neo4j = require('../lib/neo4j');

/* GET users listing. */
router.get('/', function(req, res, next) {
  neo4j.getTest(req, res)
});

module.exports = router;
