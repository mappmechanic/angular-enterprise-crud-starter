// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var _ = require('lodash');

var usersArray = [
{id:1,name:'User1',location:'Location 1'},
{id:2,name:'User2',location:'Location 2'},
{id:3,name:'User3',location:'Location 3'},
{id:4,name:'User4',location:'Location 4'}];


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var userRouter = express.Router();              // get an instance of the express Router

userRouter.route('/users')

    // create a user (accessed at POST http://localhost:8080/api/users)
    /*
    	{
			"user": {
				"name":"NewUser",
				"location":"NewLocation"
			}
    	}
     */
    .post(function(req, res) {
    	var user = req.body.user ? req.body.user : null;
    	if(user)
    	{
    		var id = usersArray.length+1;
    		var newUser = user;
    		newUser['id'] = id;
    		usersArray.push(newUser);
    		res.send({success:true});
    	}else
    	{
    		res.status(500)
    		.send({error:'Malformed Request Body'});
    	}
    })

    // get all the users (accessed at GET http://localhost:8080/api/users)
    .get(function(req, res) {
    	res.status(200).send(usersArray);
    });

// on routes 
// ----------------------------------------------------
userRouter.route('/users/:user_id')

    // get the user with that id (accessed at GET http://localhost:8080/api/users/:user_id)
    .get(function(req, res) {
    	var userFound = null;
    	if(req.params.user_id) {
	        usersArray.map(function(user){
	        	if(user.id == req.params.user_id)
	        	{
	        		userFound = user;
	        	}
	        });
	        if(userFound)
	        {
	        	res.status(200).send(userFound);
	        }else
	        {
	        	res.status(404).send({error:"No User exists."});
	        }
        }
    })

    // update the user with that id (accessed at GET http://localhost:8080/api/user/:user_id)
    .put(function(req, res) {
    	var userFound = null;
    	console.log(req.params.user_id);
    	if(req.params.user_id) {
    		var index = 0;
	        userFoundIndex = _.findIndex(usersArray,function(user){
	        	return user.id == req.params.user_id;
	        });
	        if(userFoundIndex)
	        {
	        	if(req.body.user)
	        	{
	        		usersArray[userFoundIndex] = req.body.user;
	        		res.status(200).send(usersArray[userFoundIndex]);
	        	}else
	        	{
	        		res.status(500).send({error:'Malformed Request Body'});
	        	}
	        	
	        }else
	        {
	        	res.status(404).send({error:"No User exists."});
	        }
        }
    });



// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', userRouter);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);