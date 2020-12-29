var express = require('express');
var router = express.Router();
const moment = require('moment');

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'user_data'
});

connection.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("../views/index.html");
});

router.post('/addUser', function(req, res, next) {
  const data = req.body;
  const firstName = data.firstName;
  const lastName = data.lastName;
  var momentDob = moment(data.dob, 'DD-MM-YYYY');
  const DOB = moment(momentDob).format("YYYY-MM-DD");
  console.log(DOB)
  const city = data.city || null;
  const mobileNo = data.mobileNo || null;

  if(data.firstName && data.lastName && data.dob) {
    connection.query('insert into emp_data(emp_fname, emp_lname, emp_dob, emp_city, emp_mobno) values(?,?,?,?,?)', [firstName, lastName, DOB, city, mobileNo], function (error, results, fields) {
      if (error) {
        res.json({
          success: false,
          msg: error
        })
      }

      res.json({
        success: true,
        msg: "Data Inserted"
      })
    });

  } else {
    res.json({
      msg: "Insufficient data"
    })
  }

 });

 router.post('/deleteUser', function(req, res, next) {
  const data = req.body;
  const empNo = data.empno;

  connection.query('DELETE FROM emp_data Where empno=?', [empNo], function (error, results, fields) {
    if (error) {
      res.json({
        success: false,
        msg: error
      })
    }

    res.json({
      success: true,
      msg: "User Deleted!"
    })
 })

})

module.exports = router;
