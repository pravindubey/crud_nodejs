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


});

router.post('/updateUser', function(req, res, next) {

  const empNo = req.params.empNo;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  var momentDob = moment(req.body.dob, 'DD-MM-YYYY');
  const Dob = moment(momentDob).format("YYYY-MM-DD");
  console.log(Dob)
  const city = req.body.city;
  const mobileNo = req.body.mobileNo;
  const errors = false;

  if(firstName.length === 0 || lastName.length === 0 || DOB.length === 0 || city.length === 0 || mobileNo.length == 0) {
      errors = true;
      
      // set flash message
      req.json('error', "Please enter firstNmae,lastName,DOB,city and mobileNo");
      // render to add.ejs with flash message
      res.json('emp_data/edit', {
          emoNo: req.params.empNo,
          firstName: firstName,
          lastName: lastName,
          DOB:DOB,
          city:city,
          mobileNO:mobileNo

      })
  }

  // if no error
  if( !errors ) {   

      var data = {
        firstName: firstName,
        lastName: lastName,
        Dob:Dob,
        city:city,
        mobileNO:mobileNo
      }
      // update query
      connection.query('UPDATE emp_data SET ? WHERE empNo = ' + No, data, function(err, result) {
          //if(err) throw err
          if (err)  {
            res.json({
              success: false,
              msg: error
            })
          }
              // render to edit.ejs
              res.json({
                success: true,
                msg: "Data updated"
              })
            }
        

              else {
            res.json({
              msg: "not updated"
            })
            }
          })    
  
});






module.exports = router;
