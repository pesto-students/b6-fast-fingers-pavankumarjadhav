var express = require('express');
var router = express.Router();
var db= require('../db');
var parcer=require('body-parser');
var json= require('../public/data/dictionary.json');
/* GET users listing. */
router.post('/createUser', function(req, res, next) {

  var sql='INSERT INTO user (user_name,password,email) VALUES ("'+req.body.name+'","'+req.body.password+'","'+req.body.email+'")';
  console.log(sql,"sql")
  db.query(sql,function(err,result)
  {		
    if(err)
    {
      res.status(500).send({error:'something wrong'})
    }
    res.json({status:"Signup successfully"})
  })
});
router.post('/checkLogin', function(req, res, next) {

  var sql='SELECT user_name,user_id from user where email="'+req.body.email+'" and password="'+req.body.password+'" ';
  
  db.query(sql,function(err,result)
  {		
  
    if(err)
    {
      res.status(500).send({error:'something wrong'});
    }
    if (result.length > 0) {
      
        res.json({status:true,massage:"login successfully",name:result[0]['user_name'],id:result[0]['user_id']});
       
    } else {
      res.send({status:false,massage:'Incorrect Username and/or Password!'});
    }			
    
   
    res.end();
  })
});

router.get('/getUser', function(req, res, next) {
  var sql="SELECT * FROM user";
  db.query(sql,function(err,rows,feild)
  {
    if(err)
    {
      res.status(500).send({error:'something wrong'})
    }
    res.json(rows)
  })
  
});
router.get('/getLevels', function(req, res, next) {
  var sql="SELECT * FROM level";
  db.query(sql,function(err,rows,feild)
  {
    if(err)
    {
      res.status(500).send({error:'something wrong'})
    }
    res.json(rows)
  })
  
});
router.get('/getRandomWord', function(req, res, next) {
  const randomNumber = Math.floor(Math.random() * Math.floor(json.length));
        const word = json[randomNumber];
 
    res.json({'word':word})
});

router.post('/storeScore', function(req, res, next) {

  var max_sql='SELECT max(score_val) FROM user_score where user_id='+req.body.user_id+'';
  console.log(max_sql);
  db.query(max_sql,function(errmax,resultmax)
  {
   
    var is_best="no";
    console.log(resultmax[0]['max(score_val)'],req.body.score);
    if (resultmax.length > 0) {
      
      is_best=resultmax[0]['max(score_val)'] < req.body.score ? "yes":"no";    
  }
  else{
    is_best="yes";
  }
  if(is_best=="yes")
  {
    console.log(is_best,"is_best");
   var sql_update='update user_score set is_best="no" where user_id='+req.body.user_id+'' ;
   console.log(sql_update);
 db.query(sql_update,function(err,result)
 {});
  }
    var sql='INSERT into user_score (score_val,is_best,user_id,level_value) values ('+req.body.score+',"'+is_best+'",'+req.body.user_id+',"'+req.body.level+'")' ;
    console.log(sql);
  db.query(sql,function(err,result)
  {		
  
    if(err)
    {
      res.status(500).send({error:'something wrong'});
    }
    else  {
  
        res.json({status:true,massage:"Insert Record successfully"});
    }
   		
    
   
    res.end();
  })

  })


});

router.post('/getAllScore', function(req, res, next) {
  var sql='SELECT score_val,is_best FROM user_score where user_id='+req.body.user_id+'';
  console.log(sql);
  db.query(sql,function(err,result)
  {
    if(err)
    {
      res.status(500).send({error:'something wrong'});
    }
    if (result.length > 0) {
      
        res.json({status:true,massage:"fetch successfully",record:result});
       
    } else {
      res.send({status:false,massage:'not available!'});
    }			
  });
});

module.exports = router;
