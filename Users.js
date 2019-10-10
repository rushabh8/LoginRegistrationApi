const mysql = require('mysql');
var sha1 = require('sha1');
var config = require('../config.js');
var connection = mysql.createConnection(config.sqlConn);

exports.signIn = function(email,password, callback) {
 
    var query1 = "Select * from users where email=?";
    connection.query(query1, email, function(error, result) {
        if (error) {
            console.log("error in login", error);
            callback({ "response": false, "responseString": { "title": "Incorrect credentials", "text": "Please try login again" } });
        } else if (result.length == 0) {
                callback({ "response": false, "responseString": { "title": "Account Not Found.", "text": " Sorry we do not have an account with the email entered." } });
            } else {
                var query = "select * from users where email = ? and password = ? "; 
                connection.query(query, [email, sha1(password)], function(error1, result1) {
                    if (result1.length == 0) {
                        callback({ "response": false, "responseString": { "title": "Incorrect credentials", "text": "Please try after sometime." } });
                    } else {
                        if (error1) {
                            console.log("carwash registration session  error ", error1);
                            callback({ "response": false, "responseString": { "title": "Something went wrong.", "text": "Please try login again" } });
                        } else if(result1[0].password == sha1(password) || result1[0].email == email) {
                          
                            callback({ "response": true, "responseString": { "title": "Account Found.", "text": "Successfully Login." } });
                       }
                    }
                  
            });
          }
        
     });
    }


exports.signup = function(first_name, last_name, email, phone_no, password, callback) {
 console.log("register")
  var query1 = "Select * from users where email = ?";
  connection.query(query1, [email], function(error, result) {
      if (error) {
          callback({ "response": false, "responseString": { "title": "Incorrect Details", "text": "Please check the details and register once again" } });
      } else {
              if (result.length == 0) {
                  var qry1 = "insert into users (first_name,last_name,email,phone_no,password,role_id) values (?,?,?,?,?,?)";
                  connection.query(qry1, [first_name,last_name,email,phone_no, sha1(password), 3 ], function(error1, result1) {
                      console.log(error1);
                      if (error1) {
                        //   console.log("users Reg insert error , " + JSON.stringify(error1));
                          callback({ "response": false, "responseString": { "title": "Incorrect Details", "text": "Please check the details and register once again" } });
                      } else {
                        callback({ "response": true, "responseString": { "title": "Success inserted", "text": "your data inserted into DB" } });
                      }
                      console.log("record inserted", result1);
                  });
              } else {
                  callback({ "response": false, "responseString": { "title": "Email Exists", "text": "Account with this Email already exists." } });
              }
          }
  });
}



// app.listen(3000) 



// const express = require('express')
// const app = express()
// const bodyParser =require('body-parser')

// app.use(bodyParser.urlencoded({extended:false}))
//  app.use(bodyParser.json())

// connection.connect((err) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log("Connected!");
//   var sqlUp = "INSERT INTO users (id, first_name, last_name, email, phone_no, password) VALUES ('xyz', 'qwe', 'jk2@gmail.com', 80990, 'pwdQ')";
//   connection.query(sqlUp, function (err, result) {
//     if (err) {
//       console.log(err);
//     } 
//     console.log("1 record inserted", result);
//   });
// });



// const bodyParser =require('body-parser')
// app.use(bodyParser.urlencoded({extended:false}))
// app.use(bodyParser.json())

// app.get('/', (req,res) => {
//     // console.log(req.query) 
//     // console.log(req.body)
//     // console.log(req.header)
//     // console.log(req.params) 
//     res.send('running')
//     console.log('express server working')
// }) 

// app.post('/signUp', (req,res) => {
//     console.log(req.body)
//     const user = {
//         f_name : "ni get",
//         l_name: "nknd",
//         email:"dekn@gmail.com",
//         password:"2md",
//         contact:'78900'
//     }
//     res.send(user)
//     // console.log('express server working')
// })

