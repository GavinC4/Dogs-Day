
var passport = require("../config/passport");
var db = require("../models");

module.exports = function(app) {

    //DATA
	var listAct = [
			{ plan1: "EAT." },
			{ plan2: "DRINK." },
			{ plan3: "PLAY." },
			{ plan4: "SHOP." }
	];
		
	app.get('/', function (req, res) {
		console.log("loading home");

		if(req.isAuthenticated()) {
			// console.log("req.session object after re-render " + req.session);
			// console.log("req.session.user after re-render " + req.session.user);
		    res.render('index', {index: listAct, showLogout: true});
		}

		res.render('index', {index: listAct});
    });

	// app.post("/login", function(req, res, next) {
    app.post("/login", function(req, res, next) {
		passport.authenticate('local-login', function(err, user, msg) {
			
			if(err) {
				console.log("passport authen error: " + err);
				return res.status(500).send(err);
			}
			if(!user)
				return res.json({loginErr: msg.errMsg});
			req.login(user, function(err) {
				if(err) {
					console.error(err);
					return next(err);
				}
                else {		            
		            req.session.user = req.body.username;
		            console.log('The passport user id set in cookies ', req.session.passport.user);
		            console.log('The user variable set in request session ', req.session.user);
		            console.log('The request session object after setting user variable', req.session);
					// return res.json({ loggedinUser: req.body.username});
					// res.redirect('/');
					res.redirect('/text');
			    }

			});
		}) (req, res, next);
	}); 

    //This is for testing if redirect is successful
    app.get('/text', function(req, res) {
       res.send('redirected');
    });

	app.post("/register", function(req, res) {
		//back-end validation
		req.checkBody('username', 'Username field cannot be empty.').notEmpty();
		req.checkBody('email', 'Invalid email address.').isEmail();
		req.checkBody('password', 'Password must be between 8-20 characters long.').len(8,20);
		
		var errors= req.validationErrors();
     
		if(errors) {
			console.log('errors: %s', JSON.stringify(errors));
			return res.json({ registerErr: errors });
			// res.status(400).render('index', {registerErr: errors});
		}
		else {
			db.User.findOne({
				where: {username : req.body.username}
			}).then(function(user) {
				if(user) {
					return res.json({ registerErr: ['Username already taken!'] });
				}
				else {
					db.User.create({
				    	username: req.body.username,
				    	email: req.body.email,
				    	password: req.body.password
				    }).then(function(user) {
				    	console.log(user);
				    	req.login(user, function(err) {
				    		if(err) {
				    			return console.error(err);
		                        // return next(err);
				    		}
				    		else {
		                        req.session.user = req.body.username;
		                        console.log('The passport user id set in cookies ', req.session.passport.user);
		                        console.log('The user variable set in request session ', req.session.user);
		                        console.log('The request session object after setting user variable', req.session);
				    			res.status(200).json({ registeredUser: req.body.username});
				    			// res.redirect("/");
				    		}
				    	});
				    })
		            .catch(function(err) {
		            	console.log(err);
				    	// res.status(422).json({ errors: err.errors[0].message });
				    	res.status(422).send(err);
				    });

				}
			});		    
	    }
	});

	app.get('/logout', function(req, res) {
		req.logout();
		req.session.destroy();
		res.redirect('/');
	});
   
};

