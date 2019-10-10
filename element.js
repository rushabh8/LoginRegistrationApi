var ex = require('../Model/Users.js');
var HttpStatus = require('http-status-codes');

exports.login = function(req,res)
{
	
	// console.log(req.body);
	console.log("Login")
	var email=req.body.email;
	var password=req.body.password; 
	var array = [];
	
		if(email === '' || email === undefined || email === null ){
			array.push('email');
		}
		if(password ==='' || password === undefined || password === null){
			array.push('password');
		}

	if(array.length == 0)
	{
		ex.signIn(email,password,function(result)
		{
			if(result.response == true)
			res.status(HttpStatus.OK).json(result);
			else
			res.status(HttpStatus.NOT_FOUND).json(result);
			// res.json(result);
			console.log(result)
		});
	}
	else
	{
		res.json({"response":false,"responseString":"Please specify " + array + "."});
	}
}

exports.register = function(req,res)
{
	//  console.log(req.body);
	console.log("register")
        var first_name=req.body.first_name;
        var last_name=req.body.last_name;
        var email=req.body.email;
        var phone_no=req.body.phone_no;
		var password=req.body.password;
		
		var array =[];

        if(first_name==='' || first_name===undefined){
			array.push('first_name');
		}
		if(last_name==='' || last_name===undefined){
			array.push('last_name');
		}
		if(email==='' || email===undefined){
			array.push('email');
        }
        if(phone_no==='' || phone_no===undefined){
			array.push('mobile');
		}
		if(password==='' || password===undefined){
			array.push('password');
		}
		
		if (array.length==0)
		{
			ex.signup(first_name,last_name,email,phone_no,password,function(obj)
			{
				if(obj.response == true)
				res.status(HttpStatus.CREATED).json(obj);
				else
				res.status(HttpStatus.NOT_FOUND).json(obj);
				// res.json(obj);
			});
		}
		else 
		{
			res.json({"response":false,"responseString":array + ": These fields should not be empty."});
		}
	}