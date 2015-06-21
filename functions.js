// // functions.js/
var Q = require('q');
var mysql      = require('mysql');
var pool = mysql.createPool({
  host     : 'workflow.cmdci40vhwqs.eu-central-1.rds.amazonaws.com',
  //host     : 'flexiprice.c23asrnrwnqz.us-west-2.rds.amazonaws.com',
  user     : 'flexiprice',
  password : 'flexi2015',
  database : 'flexiprice'
});


//used in local-signup strategy
exports.localReg = function (emailNew, passwordNew) {
  var deferred = Q.defer();
  post = { email: emailNew, password: passwordNew, avatar:"http://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png"};
  var user;

  pool.getConnection(function (err, connection) {
    connection.query('INSERT INTO flexiprice.researchers SET ?', post, function (err, result) {
      if (err != null) {
        console.log(err);
        console.log("Email already in use");
       
        deferred.resolve(false);
      }
      if (err == null) {                           
        connection.query('SELECT * FROM flexiprice.researchers where email = \"' + emailNew + '\";' ,function(err, rows, fields) {
          if (err!= null) {
            console.log("Error finding user" + err);
          }

          if (err == null) {
            for (var i in rows) {
              console.log(rows[i].email +" "+ rows[i].password +" "+ rows[i].user_id);
              user = {
               "email": rows[i].email,
               "password": rows[i].password,
               "user_id": rows[i].user_id,
               "avatar": rows[i].avatar,
                "resetPasswordToken": rows[i].resetPasswordToken,
                "resetPasswordExpires": rows[i].resetPasswordExpires
             }
             deferred.resolve(user);
           }
         }
            
       });
      }
      connection.end();
    });

  });

  return deferred.promise;
};



exports.localAuth = function (emailNew, passwordNew) {
  var deferred = Q.defer();

  var user;

  pool.getConnection(function (err, connection) {
    connection.query('SELECT * FROM flexiprice.researchers where email = \"' + emailNew + '\";' ,function(err, rows, fields) {
    if (err!= null) {
      console.log("Error finding user" + err);
       deferred.resolve(false);
    }

    if (err == null) {
      for (var i in rows) {
        console.log(rows[i].email +" "+ rows[i].password +" "+ rows[i].user_id);
        if (passwordNew == rows[i].password) {
         user = {
           "email": rows[i].email,
           "password": rows[i].password,
           "user_id": rows[i].user_id,
           "avatar": rows[i].avatar,
           "resetPasswordToken": rows[i].resetPasswordToken,
           "resetPasswordExpires": rows[i].resetPasswordExpires
         }
         deferred.resolve(user);
        } else {
          console.log("PASSWORDS NOT MATCH");
          deferred.resolve(false);
        }
      }
      if (rows.length == 0) {
      console.log("Error finding user" + err);
       deferred.resolve(false);
    }

    }
      connection.end();
    });
  });
  return deferred.promise;
}

exports.findUser = function (emailNew) {
  var deferred = Q.defer();

  var user;

  pool.getConnection(function (err, connection) {
    connection.query('SELECT * FROM flexiprice.researchers where email = \"' + emailNew + '\";' ,function(err, rows, fields) {
    if (err!= null) {
      console.log("Error finding user" + err);
       deferred.resolve(false);
    }

    if (err == null) {
      for (var i in rows) {
        console.log(rows[i].email +" "+ rows[i].password +" "+ rows[i].user_id);
       
         user = {
           "email": rows[i].email,
           "password": rows[i].password,
           "user_id": rows[i].user_id,
           "avatar": rows[i].avatar,
           "resetPasswordToken": rows[i].resetPasswordToken,
           "resetPasswordExpires": rows[i].resetPasswordExpires
         }
         deferred.resolve(user);
      }
      if (rows.length == 0) {
      console.log("Error finding user" + err);
       deferred.resolve(false);
    }

    }
      connection.end();
    });
  });
  return deferred.promise;
}

exports.findToken = function (token) {
  var deferred = Q.defer();

  var user;

  pool.getConnection(function (err, connection) {
    connection.query('SELECT * FROM flexiprice.researchers where resetPasswordToken = \"' + token + '\";' ,function(err, rows, fields) {
    if (err!= null) {
      console.log("Error finding user" + err);
       deferred.resolve(false);
    }

    if (err == null) {
      for (var i in rows) {
        console.log(rows[i].email +" "+ rows[i].password +" "+ rows[i].user_id);
       
         user = {
           "email": rows[i].email,
           "password": rows[i].password,
           "user_id": rows[i].user_id,
           "avatar": rows[i].avatar,
           "resetPasswordToken": rows[i].resetPasswordToken,
           "resetPasswordExpires": rows[i].resetPasswordExpires
         }
         deferred.resolve(user);
      }
      if (rows.length == 0) {
      console.log("Error finding user" + err);
       deferred.resolve(false);
    }

    }
      connection.end();
    });
  });
  return deferred.promise;
}

//UPDATE `flexiprice`.`researchers` SET `password`='78979', `resetPasswordToken`='76867', `resetPasswordExpires`='987987' WHERE `user_id`='11' and`email`='natalim82@gmail.com';
exports.updateUser = function (userN) {
  var deferred = Q.defer();

  var user;
          console.log("User Details: " +userN.resetPasswordToken+" "+ userN.resetPasswordExpires +" "+userN.email+" "+userN.user_id);
          var temp = userN.password
  user = { password: temp, resetPasswordToken: userN.resetPasswordToken, resetPasswordExpires:userN.resetPasswordExpires};

  pool.getConnection(function (err, connection) {
    connection.query('UPDATE flexiprice.researchers SET ? WHERE user_id=? and email=?;', [user, userN.user_id, userN.email] ,function(err, rows, fields) {
    if (err!= null) {
      console.log("Error finding user" + err);
       deferred.resolve(false);
    }

    if (err == null) {
        console.log("1. Changed user token");
        connection.query('SELECT * FROM flexiprice.researchers where email = \"' + userN.email + '\";' ,function(err, rows, fields) {
          if (err!= null) {
            console.log("Error finding user" + err);
          }

          if (err == null) {
            for (var i in rows) {
              console.log(rows[i].email +" "+ rows[i].password +" "+ rows[i].user_id);
              user = {
               "email": rows[i].email,
               "password": rows[i].password,
               "user_id": rows[i].user_id,
               "avatar": rows[i].avatar,
                "resetPasswordToken": rows[i].resetPasswordToken,
                "resetPasswordExpires": rows[i].resetPasswordExpires
             }
             deferred.resolve(user);
           }
         }
            
       });
      }
    
      connection.end();
    });
  });
  return deferred.promise;
}


//INSERT INTO `flexiprice`.`experiments` (`user_id`, `category_id`, `experiment_name`, `experiment_desc`, `creation_date`, `last_modified`, `survey_link`, `show_prices`, `open_negotiation`, `use_min_price`, `private`, `active`) 
//VALUES ('1', '1', 'hello', 'something', '12/04/15', '15/04/15', 'link.com', '1', '0', '0', '0', '1');

//INSERT INTO `flexiprice`.`titlesNMessages` (`experimentID`, `introduction`, `conclusion`, `showPricesON`, `minPriceON`, `minPriceOFF`, `openNegotiation`, `aboveProducts`, `priceTooLow`, `ratingHeader`, `ratingSubHeader`, `rate1`, `rate2`, `rate3`, `rate4`, `rate5`, `rate6`, `rate7`, `rate8`, `rate9`, `rate10`) 
//VALUES ('12', 'dfsdfsdf', 'fdfsf', 'fdsfdsf', 'fdsfsdf', 'fdsfsdf', 'fdfsd', 'fsdffdsfs', 'dfdsfsd', 'dfsfsd', 'fdsfdsfs', 'fdsfs', 'fdsfsf', 'fdsfsdf', 'dfsfsdf', 'fdfsf', 'fsdfsd', 'dfsdf', 'dsf', 'fds', 'dfs');

exports.newExperiment = function (user_id, details) {
  console.log("==== Adding new experiment ====");
  
  if (details.showPrices == "false") {
    details.showPrices = 'off';
  }
  if (details.showPrices == "true") {
    details.showPrices = 'on';
  }

  if (details.openNegotiation == "false") {
    details.openNegotiation = 'off';
  }
  if (details.openNegotiation == "true") {
    details.openNegotiation = 'on';
  }

  if (details.MinPrice == "false") {
    details.MinPrice = 'off';
  }
  if (details.MinPrice == "true") {
    details.MinPrice = 'on';
  }

  if(details.MaxTries == "") {
    details.MaxTries = 0;
  }

  var rates = JSON.parse(details.ratesArray);

  var today = getTodayDate();

  var post = {
    user_id: user_id,
    category_id: details.Category,
    experiment_name: details.ExpName,
    experiment_desc : details.ExpDesc,
    creation_date: today,
    last_modified: today,
    gizmo_code: details.GizmoCode,
    show_prices: details.showPrices,
    open_negotiation: details.openNegotiation,
    use_min_price: details.MinPrice,
    active: '1',
    max_tries: details.MaxTries,
    starting_wallet: details.Wallet
  };

  var post2 = {
    introduction: details.intro,
    conclusion: details.conclusion,
    showPricesON: details.msgPriceOn,
    minPriceON: details.msgMinPriceOn,
    minPriceOFF: details.msgMinPriceOff,
    openNegotiation: details.msgNegoOn,
    aboveProducts: details.msgAboveProducts,
    priceTooLow: details.msgPriceLow,
    ratingHeader: details.rateHeader,
    ratingSubHeader: details.rateSubHeader,
    numOfRates: rates.length
  };

  for (var i=0; i<rates.length ; i++)
  {
    post2['rate'+(i+1)] = rates[i];
  }

  pool.getConnection(function (err, connection){
    connection.query('INSERT INTO flexiprice.experiments SET ?', post, function (err, result) {
      if (err != null) {
        console.log(err);
      }
      if (err == null) {                           
        console.log(result.insertId);
        var tempID = result.insertId;
        post2['experimentID'] = tempID;
        connection.query('INSERT INTO flexiprice.titlesNMessages SET ?', post2, function (err, result) {
          if (err != null) {
            console.log(err);
          }
          if (err == null) {                           

          }
             
        });
      }
          connection.end();
    });
  });

}


exports.updateExperiment = function (user_id, experiment_id, details) {
  console.log("==== Updating experiment " +experiment_id+ " ====");
  
  if (details.showPrices == "false") {
    details.showPrices = 'off';
  }
  if (details.showPrices == "true") {
    details.showPrices = 'on';
  }

  if (details.openNegotiation == "false") {
    details.openNegotiation = 'off';
  }
  if (details.openNegotiation == "true") {
    details.openNegotiation = 'on';
  }

  if (details.MinPrice == "false") {
    details.MinPrice = 'off';
  }
  if (details.MinPrice == "true") {
    details.MinPrice = 'on';
  }

  if(details.MaxTries == "") {
    details.MaxTries = 0;
  }

  var rates = JSON.parse(details.ratesArray);

  var today = getTodayDate();

  var post = {
    user_id: user_id,
    category_id: details.Category,
    experiment_name: details.ExpName,
    experiment_desc : details.ExpDesc,
    creation_date: today,
    last_modified: today,
    gizmo_code: details.GizmoCode,
    show_prices: details.showPrices,
    open_negotiation: details.openNegotiation,
    use_min_price: details.MinPrice,
    active: '1',
    max_tries: details.MaxTries,
    starting_wallet: details.Wallet
  };

  var post2 = {
    introduction: details.intro,
    conclusion: details.conclusion,
    showPricesON: details.msgPriceOn,
    minPriceON: details.msgMinPriceOn,
    minPriceOFF: details.msgMinPriceOff,
    openNegotiation: details.msgNegoOn,
    aboveProducts: details.msgAboveProducts,
    priceTooLow: details.msgPriceLow,
    ratingHeader: details.rateHeader,
    ratingSubHeader: details.rateSubHeader,
    numOfRates: rates.length
  };

  for (var i=0; i<rates.length ; i++)
  {
    post2['rate'+(i+1)] = rates[i];
  }

  pool.getConnection(function (err, connection){
    connection.query('UPDATE flexiprice.experiments SET ?  WHERE experiment_id = ?', [post, experiment_id], function (err, result) {
      if (err != null) {
        console.log(err);
      }
      if (err == null) {                           
        connection.query('UPDATE flexiprice.titlesNMessages SET ? WHERE experimentID = ?', [post2, experiment_id], function (err, result) {
          if (err != null) {
            console.log(err);
          }
          if (err == null) {                           

          }
             
        });
      }
          connection.end();
    });
  });

}


//DELETE FROM `flexiprice`.`experiments` WHERE `experiment_id`='20';
exports.deleteExperiment = function (exp_id) {
  console.log("==== Deleting experiment "+exp_id+ "====");

  pool.getConnection(function (err, connection){
    connection.query('DELETE FROM flexiprice.experiments WHERE experiment_id = ?', exp_id, function (err, result) {
      if (err != null) {
        console.log(err);
      }
      if (err == null) {                           

      }
          connection.end();
    });
  });

}

function getTodayDate() {
  var today = new Date();
   var dd = today.getDate();
   var mm = today.getMonth()+1; //January is 0!
   var yyyy = today.getFullYear();

   if(dd<10) {
       dd='0'+dd
   } 

   if(mm<10) {
       mm='0'+mm
  } 

  today = dd+'/'+mm+'/'+yyyy;

  return today;
}


exports.getExperiments = function (user_id) {
  var deferred = Q.defer();
 
   pool.getConnection(function (err, connection) {
   var sql = 'SELECT * FROM flexiprice.experiments where user_id=?;'
     connection.query(sql, user_id , function (err, rows) {
    if (err!= null) {
      console.log("Error finding experiments" + err);
    }

    if (err == null) {
         deferred.resolve(rows);
       }  
       connection.end();
    
    });
   });

  return deferred.promise;
}

exports.getExperiment = function (wanted) {
  var deferred = Q.defer();
  console.log("experiment_id: " + wanted)
   pool.getConnection(function (err, connection) {
   var sql = 'SELECT * FROM flexiprice.experiments inner join flexiprice.titlesNMessages where experiments.experiment_id=titlesNMessages.experimentID and experiment_id=?;'
     connection.query(sql, wanted , function (err, rows) {
    if (err!= null) {
      console.log("Error finding experiments" + err);
    }

    if (err == null) {
         console.log(rows[0].experiment_name);
         deferred.resolve(rows);
       }  
       connection.end();
    
    });
   });

  return deferred.promise;
}


exports.getCategories = function (user_id) {
  var deferred = Q.defer();
 
   pool.getConnection(function (err, connection) {
   var sql = 'SELECT * FROM flexiprice.categories where user_id=?;'
     connection.query(sql, user_id , function (err, rows) {
    if (err!= null) {
      console.log("Error finding categories" + err);
      deferred.reject(new Error(err.body));
    }

    if (err == null) {
         deferred.resolve(rows);
       }  
       connection.end();
    
    });
   });

  return deferred.promise;
}


//INSERT INTO `flexiprice`.`categories` (`user_id`, `active`, `category_name`, `products_number`, `category_desc`) 
//VALUES ('4', '1', 'Category2', '0', 'Something');
exports.newCategory = function (name, description, user_idNew) {
  var deferred = Q.defer();
  console.log("==== Adding new category ====");
  console.log(name + " " + description + " " + user_idNew);

  var post = {
    user_id: user_idNew,
    category_name: name,
    category_desc : description,
    active: '1',
    products_number: '0'
  }

  pool.getConnection(function (err, connection){
    connection.query('INSERT INTO flexiprice.categories SET ?', post, function (err, result) {
      if (err != null) {
        console.log(err);
        deferred.reject(new Error(err.body));
      }
      if (err == null) {                           
          console.log(result.insertId);
              var lastId = result.insertId;
              var category = exports.getCategory(lastId);
              deferred.resolve(category);

      }
          connection.end();
    });
  });
 return deferred.promise;
}

exports.getCategory = function (wanted) {
  var deferred = Q.defer();
  console.log("category_id: " + wanted)
   pool.getConnection(function (err, connection) {
   var sql = 'SELECT * FROM flexiprice.categories where category_id=?;'
     connection.query(sql, wanted , function (err, rows) {
    if (err!= null) {
      console.log("Error finding category" + err);
    }

    if (err == null) {
       
         deferred.resolve(rows);
       }  
       connection.end();
    
    });
   });

  return deferred.promise;
}

exports.getProducts = function (category_id) {
  var deferred = Q.defer();
 
   pool.getConnection(function (err, connection) {
   var sql = 'SELECT * FROM flexiprice.products where category_id=?;'
     connection.query(sql, category_id , function (err, rows) {
    if (err!= null) {
      console.log("Error finding products" + err);
      deferred.reject(new Error(err.body));
    }

    if (err == null) {
         deferred.resolve(rows);
       }  
       connection.end();
    
    });
   });

  return deferred.promise;
}

exports.getProduct = function (wanted) {
  var deferred = Q.defer();
  console.log("Product_id: " + wanted)
   pool.getConnection(function (err, connection) {
   var sql = 'SELECT * FROM flexiprice.products where product_id=?;'
     connection.query(sql, wanted , function (err, rows) {
    if (err!= null) {
      console.log("Error finding product" + err);
    }

    if (err == null) {
         deferred.resolve(rows);
       }  
       connection.end();
    
    });
   });

  return deferred.promise;
}


//INSERT INTO `flexiprice`.`products` (`category_id`, `description`, `type`, `name`, `value`) 
//VALUES ('2', 'something', 'url', 'Product1', '20');
exports.newProduct = function (name, description, value, min_price, url, file_url, type, category_id) {
  console.log("==== Adding new Product ====");
  console.log(name + " " + description + " " + value + " " + min_price + " " + category_id);

 var final_url;
  if (url == null && file_url != "")
  {
    final_url = file_url;
  }


  if (url != null && file_url == "")
  {
    final_url = url;
  }
    console.log("Link: " +url+" File: " + file_url + " Final:" +final_url);

  var post = {
    category_id: category_id,
    name: name,
    description : description,
    value: value,
    type: type,
    path:final_url, 
    min_price: min_price
  }

 

  pool.getConnection(function (err, connection){
    connection.query('INSERT INTO flexiprice.products SET ?', post, function (err, result) {
      if (err != null) {
        console.log(err);

      }
      if (err == null) {                           
        exports.updateCategory(category_id);
          console.log(result.insertId);      
      }
          connection.end();
    });
  });

}

//UPDATE `flexiprice`.`products` SET `category_id`='2', `description`='PHP dynamic insert - mysql. Is there a better !', `type`='url', `name`='codereview !', `value`='52', `min_price`='43' WHERE `product_id`='16';
exports.updateProduct = function (name, description, value, min_price, url, file_url, type, product_id) {
  console.log("==== Adding new Product ====");
  console.log(name + " " + description + " " + value + " " + min_price + " " + product_id);

 var final_url;

  switch(type)
  {
    case 'URL': final_url = url; break;
    case 'Image': final_url = file_url; break;
  }


    console.log("Link: " +url+" File: " + file_url + " Final:" +final_url);

  var post = {
    name: name,
    description : description,
    value: value,
    type: type,
    path:final_url, 
    min_price: min_price
  }

  pool.getConnection(function (err, connection){
    connection.query('UPDATE flexiprice.products SET ? WHERE product_id = ?', [post, product_id], function (err, result) {
      if (err != null) {
        console.log(err);

      }
      if (err == null) {                           
        //exports.updateCategory(category_id);
          console.log(result.insertId);      
      }
          connection.end();
    });
  });

}

//DELETE FROM `flexiprice`.`products` WHERE `product_id`='43';
exports.deleteProduct = function (pro_id, cat_id) {
  console.log("==== Deleting product "+pro_id+ "====");
  pool.getConnection(function (err, connection){
    connection.query('DELETE FROM flexiprice.products WHERE product_id = ?', pro_id, function (err, result) {
      if (err != null) {
        console.log(err);
      }
      if (err == null) {                           
          exports.deleteFromCategory(cat_id);
      }
          connection.end();
    });
  });

}

//DELETE FROM `flexiprice`.`categories` WHERE `product_id`='43';
exports.deleteCategory = function (cat_id) {
  console.log("==== Deleting category "+cat_id+ "====");
  pool.getConnection(function (err, connection){
    connection.query('DELETE FROM flexiprice.categories WHERE category_id = ?', cat_id, function (err, result) {
      if (err != null) {
        console.log(err);
      }
      if (err == null) {  

        connection.query('DELETE FROM flexiprice.products WHERE category_id = ?', cat_id, function (err, result) {
          if (err != null) {
            console.log(err);
          }
          if (err == null) {             
              
          }
             
        });                     
          
      }
          connection.end();
    });
  });

}

exports.updateCategory = function (wanted) {
  console.log("==== Updating category ====");
  pool.getConnection(function (err, connection){
      var sql = 'UPDATE flexiprice.categories SET products_number=products_number+1 WHERE category_id=?;'
     connection.query(sql, wanted , function (err, rows) {
      if (err != null) {
        console.log(err);
      }
      if (err == null) {                           

      }
          connection.end();
    });
  });

}

exports.deleteFromCategory = function (wanted) {
  console.log("==== Updating category ====");
  pool.getConnection(function (err, connection){
      var sql = 'UPDATE flexiprice.categories SET products_number=products_number-1 WHERE category_id=?;'
     connection.query(sql, wanted , function (err, rows) {
      if (err != null) {
        console.log(err);
      }
      if (err == null) {                           

      }
          connection.end();
    });
  });

}

//SELECT * FROM experiments INNER JOIN products ON experiments.category_id = products.category_id And experiments.experiment_id = 12;

exports.getRunningExperiment = function (experiment_id) {
  var deferred = Q.defer();
 
   pool.getConnection(function (err, connection) {
   var sql = 'SELECT * FROM experiments INNER JOIN products ON experiments.category_id = products.category_id inner join titlesNMessages ON experiments.experiment_id = titlesNMessages.experimentID And experiments.experiment_id =?;'
     connection.query(sql, experiment_id , function (err, rows) {
    if (err!= null) {
      console.log("Error finding running experiment" + err);
      deferred.reject(new Error(err.body));
    }

    if (err == null) {
         deferred.resolve(rows);
       }  
       connection.end();
    
    });
   });

  return deferred.promise;
}

exports.getIterations = function (experiment_id) {
  var deferred = Q.defer();
 
   pool.getConnection(function (err, connection) {
   var sql = 'SELECT * FROM flexiprice.iterations where experiment_id=?;'
     connection.query(sql, experiment_id , function (err, rows) {
    if (err!= null) {
      console.log("Error finding iterations" + err);
      deferred.reject(new Error(err.body));
    }

    if (err == null) {
         deferred.resolve(rows);
       }  
       connection.end();
    
    });
   });

  return deferred.promise;
}

//Enter User iteration details
//INSERT INTO `flexiprice`.`users` (`iteration_id`, `grade`, `balance`, `name`) VALUES ('353454', '434', '23', '534543');
exports.iterationDetails = function (details) {
  console.log("==== Adding Iteration Details" + details.iteration +" " +details.sessionID+"====");
  //console.log("Number of questions: " + details.numOfquestions+" "+ details.grade +" "+ details["question_array[0][products][0][min_price]"]);

  var tempUserId = Math.floor(Math.random() * 10000);
  console.log(tempUserId);

  //Insert New User
  var postNew = {
    iteration_id: details.iteration,
    grade: details.grade,
    balance : details.balance,
    name: details.name,
    user_id: tempUserId,
    sessionID: details.sessionID
  }

  pool.getConnection(function (err, connection){

          connection.query('INSERT INTO flexiprice.users SET ?', postNew, function (err, result) {
            if (err != null) {
              console.log(err);
            }
            if (err == null) {                           
                exports.iterationDetailsQuestions(details, tempUserId);
                exports.updateIteration(details.iteration);
            }
                connection.end();
          });
  });

  
}

//Insert Questions
//INSERT INTO `flexiprice`.`questions` (`question_title`) VALUES ('Something');
//Insert QuestionToProduct
//INSERT INTO `flexiprice`.`questionToProduct` (`userID`, `questionID`, `productID`, `min_price`, `subjecitve_price`, `revealed_price`, `paid_price`, `rating`) VALUES ('43', '3423', '432', '453', '554534', '543534', '5434', 'Something');
exports.iterationDetailsQuestions = function (details, userId) {
  console.log("==== Adding Iteration Questions Details to user: "+ userId +" ====");
  console.log("Number of questions: " + details.numOfquestions+" "+ details.grade +" "+details["question_array[0][products][0][min_price]"] +" "+ details["question_array[0][products][0][subjective_price][]"]);

var questions = [];
pool.getConnection(function (err, connection){
    for (var i=0 ; i<details.numOfquestions ; i++){
      var postQuestion = {
        question_title: JSON.stringify(details["question_array["+i+"][title]"]).replace(/['"]+/g, ''),
      }
      connection.query('INSERT INTO flexiprice.questions SET ?', postQuestion, function (err, result) {
        if (err != null) {
          console.log(err);
        }
        if (err == null) {                           
          questionID = result.insertId;
          console.log("QuestionID: " + questionID + " " + i);
          console.log("User: " + userId + " Question: "+ questionID + " Index: "+i)
          questions.push(questionID);
          if (questions.length == details.numOfquestions) exports.questionToProduct(details, userId, questions);
        }
            
      });
      console.log(questions.length);
    
  }
    connection.end();


  });

  
}

exports.questionToProduct = function(details, userID, questions)
{
  console.log("User: " + userID + " Questions: "+ questions)

  pool.getConnection(function (err, connection){
    for (var i=0 ; i<details.numOfquestions ; i++){

      for (var j=0; j<details["question_array["+i+"][numOfProducts]"] ; j++) {
        var postProduct = {
          userID: userID,
          questionID: questions[i],
          productID: details["question_array["+i+"][products]["+j+"][product_id]"],
          min_price: details["question_array["+i+"][products]["+j+"][min_price]"],
          revealed_price: details["question_array["+i+"][products]["+j+"][revealed_price]"],
          paid_price: details["question_array["+i+"][products]["+j+"][paid_price]"], 
          rating: JSON.stringify(details["question_array["+i+"][products]["+j+"][rating]"]).replace(/['"]+/g, ''),
          sessionID: details.sessionID
        }
        if (details["question_array["+i+"][products]["+j+"][subjective_price][]"] != null)
        {
            postProduct['subjective_price']=JSON.stringify(details["question_array["+i+"][products]["+j+"][subjective_price][]"]).replace(/['"]+/g, '');
        }

        connection.query('INSERT INTO flexiprice.questionToProduct SET ?', postProduct, function (err, result) {
          if (err != null) {
            console.log(err);
          }
          if (err == null) { 
            console.log("Question #" + i + " with details " + j);
          }
        });     
      }
    }
    connection.end();
  });
}

//UPDATE `flexiprice`.`iterations` SET `date`='32', `subjects`='43' WHERE `iteration_id`='5s2cF52G' and`experiment_id`='12' and`link`='http://localhost:5000/experimentWelcomePage?exp_id=12&iteration_id=5s2cF52G';
exports.updateIteration = function(iterationId){
  console.log("==== Updating iteration id: "+ iterationId +" ====");

  

  pool.getConnection(function (err, connection){
     var sql = 'UPDATE flexiprice.iterations SET date=\''+getTodayDate() +'\', subjects=subjects+1 WHERE iteration_id=?;'
     connection.query(sql, iterationId , function (err, rows) {
      if (err != null) {
        console.log(err);
      }
      if (err == null) {                           

      }
          connection.end();
    });  
   });
}

exports.modifyIteration = function(iterationId, details){
  console.log("==== Modify iteration id: "+ iterationId +" ====");

if (details.privateIteration == "false") {
    details.privateIteration = 'off';
  }
  if (details.privateIteration == "true") {
    details.privateIteration = 'on';
  }

  var post = {
  comment: details.comment,
  private: details.privateIteration}

  if(details.privateIteration == 'on')
  {
    post['password'] = details.iterationPassword;
  }

  pool.getConnection(function (err, connection){
     var sql = 'UPDATE flexiprice.iterations SET ? WHERE iteration_id=?;'
     connection.query(sql, [post,iterationId] , function (err, rows) {
      if (err != null) {
        console.log(err);
      }
      if (err == null) {                           

      }
          connection.end();
    });  
   });

}



exports.newIteration = function(userId, details){
  console.log("==== Create new iteration ====");

  if (details.privateIteration == "false") {
    details.privateIteration = 'off';
  }
  if (details.privateIteration == "true") {
    details.privateIteration = 'on';
  }

  var post = {
    comment: details.comment,
    private: details.privateIteration,
    iteration_id: details.iteration_id,
    experiment_id: details.experiment_id,
    link: details.link,
    subjects: details.subjects,
    researcher_id: userId
  }

  if(details.privateIteration == 'on')
  {
    post['password'] = details.iterationPassword;
  }

  pool.getConnection(function (err, connection){
     var sql = 'INSERT INTO flexiprice.iterations SET ?'
     connection.query(sql, post , function (err, rows) {
      if (err != null) {
        console.log(err);
      }
      if (err == null) {                           

      }
          connection.end();
    });  
   });
}

//Getting Iteration Details for excel
exports.getIterationsDetails = function (iterationId) {
  var deferred = Q.defer();
 
   pool.getConnection(function (err, connection) {
   var sql = 'SELECT * FROM flexiprice.users as users INNER JOIN questionToProduct as questionToProduct ON users.user_id=questionToProduct.userID ';
    sql += 'INNER JOIN questions as questions ON questionToProduct.questionID =questions.question_id ';
    sql += 'INNER JOIN (select products.name as product_name, products.product_id from products) products ON questionToProduct.productID=products.product_id where users.iteration_id =?;';
     connection.query(sql, iterationId , function (err, rows) {
    if (err!= null) {
      console.log("Error finding running experiment" + err);
      deferred.reject(new Error(err.body));
    }

    if (err == null) {

        deferred.resolve(rows);
       }  
       connection.end();
    
    });
   });

  return deferred.promise;
}

exports.getExperimentsNum = function (user_id) {
  var deferred = Q.defer();
 
   pool.getConnection(function (err, connection) {
   var sql = 'select count(*) from experiments where experiments.user_id =?;'
     connection.query(sql, user_id , function (err, rows) {
    if (err!= null) {
      console.log("Error finding iterations" + err);
      deferred.reject(new Error(err.body));
    }

    if (err == null) {
      console.log(rows);
         deferred.resolve(rows);
       }  
       connection.end();
    
    });
   });

  return deferred.promise;
}

exports.getCategoriesNum = function (user_id) {
  var deferred = Q.defer();
 
   pool.getConnection(function (err, connection) {
   var sql = 'select count(*) from categories where categories.user_id =?;'
     connection.query(sql, user_id , function (err, rows) {
    if (err!= null) {
      console.log("Error finding iterations" + err);
      deferred.reject(new Error(err.body));
    }

    if (err == null) {
      console.log(rows);
         deferred.resolve(rows);
       }  
       connection.end();
    
    });
   });

  return deferred.promise;
}

exports.getIterationsByUser = function (user_id) {
  var deferred = Q.defer();
 
   pool.getConnection(function (err, connection) {
   var sql = 'SELECT * FROM flexiprice.iterations ';
sql += 'inner JOIN (select experiments.experiment_name, experiments.user_id, experiments.experiment_id from experiments) experiments ';
 sql+= 'where iterations.experiment_id = experiments.experiment_id and researcher_id=?;';
     connection.query(sql, user_id , function (err, rows) {
    if (err!= null) {
      console.log("Error finding iterations" + err);
      deferred.reject(new Error(err.body));
    }

    if (err == null) {
         deferred.resolve(rows);
       }  
       connection.end();
    
    });
   });

  return deferred.promise;
}

exports.getIntro = function (exp_id) {
  var deferred = Q.defer();
 
   pool.getConnection(function (err, connection) {
   var sql = 'SELECT introduction FROM flexiprice.titlesNMessages where experimentID=?;';     
   connection.query(sql, exp_id , function (err, rows) {
    if (err!= null) {
      console.log("Error finding introduction" + err);
      deferred.reject(new Error(err.body));
    }

    if (err == null) {
         deferred.resolve(rows);
       }  
       connection.end();
    
    });
   });

  return deferred.promise;
}

exports.getIteration = function (iteration_id) {
  var deferred = Q.defer();
 
   pool.getConnection(function (err, connection) {
   var sql = 'SELECT * FROM flexiprice.iterations ';
 sql+= 'where iterations.iteration_id=?;';
     connection.query(sql, iteration_id , function (err, rows) {
    if (err!= null) {
      console.log("Error finding iterations" + err);
      deferred.reject(new Error(err.body));
    }

    if (err == null) {
         deferred.resolve(rows);
       }  
       connection.end();
    
    });
   });

  return deferred.promise;
}
