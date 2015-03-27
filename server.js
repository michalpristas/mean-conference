var express = require("express");
var bodyParser = require("body-parser");

// start expres web server
var app = express();

// configure to use body parser
// deprecated: app(use.bodyParser)
// must use separately these two 
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// use default or 8080
var port = process.env.PORT || 8080;

// use mongoose for mongoDB connection
var mongoose = require("mongoose");

// connect to default db (test)
mongoose.connect("mongodb://127.0.0.1/test");

// defining speaker
var Speaker = require("./server/models/speaker");

// define routes for CRUD
var router = express.Router();

// router method
router.use(function(req, res, next){
	// log something happend
	console.log("request arrived");

	// call next so router won't stop 
	next();
});

// path: root
router.get('/', function(req, res){
	res.json({message: 'hi from conference api'});
});

// path api/speakers
// post - cretes speaker
// get - get list of speaker
router.route('/speakers')

	.post(function(req,res){
		// create speaker
		var speaker = new Speaker();

		// set speaker properties
		speaker.name = req.body.name;
	    speaker.company = req.body.company;
	    speaker.title = req.body.title;
	    speaker.description = req.body.description;
	    speaker.picture = req.body.picture;
	    speaker.schedule = req.body.schedule;

	    //save speaker
	    speaker.save(function(err){
	    	if(err)
	    		res.send(err);
	    	res.json({message: 'speaker created'});
	    });
	})
	.get(function(req, res){
		Speaker.find(function(err, speakers){
			if(err)
				res.send(err);
			res.json(speakers);
		});
	});

// path speakers/id
// GET: get speaker by id
// PUT: update speaker with id
// DEL: delete by id
router.route('/speakers/:speaker_id')
	.get(function(req, res){
		// find speaker by id
		Speaker.findById(req.params.speaker_id, function(err, speaker){
			if(err)
				res.send(err);
			res.json(speaker)
		});
	})
	.put(function(req, res){
		// find speaker
		Speaker.findById(req.params.speaker_id, function(err, speaker){
			if(err)
				res.send(err);
			// if found update values
			speaker.name = req.body.name;
	        speaker.company = req.body.company;
	        speaker.title = req.body.title;
	        speaker.description = req.body.description;
	        speaker.picture = req.body.picture;
	        speaker.schedule = req.body.schedule;

	        speaker.save(function(err){
	        	if(err)
	        		res.send(err);
	        	res.json({message: 'speaker updated'});
	        });
		})
	})
	.delete(function(req, res){
		Speaker.remove(
			{
				_id: req.params.speaker_id
			}, function(err, speaker){
				if(err)
					res.send(err);
				res.json({message: 'speaker deleted'});
			});
	});

// register route
app.use('/api', router);

// start server
app.listen(port);

   console.log('Magic happens on port ' + port);

