var express = require('express');
var router = express.Router();

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'user_data'
});

connection.connect();

/* GET users listing. */
router.get('/', function(req, res, next) {
  connection.query('select * from emp_data', function (error, results, fields) {
    if (error) {
      res.json({
        success: false,
        msg: error
      })
    }

    res.json({
      success: true,
      data: results
    })
  });
});

module.exports = router;
