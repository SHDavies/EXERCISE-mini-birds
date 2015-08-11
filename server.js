//npm init
//npm install express body-parser cors mongojs --save
var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

app.use(bodyParser.json());

//How to connect to database:

//Run mongod
//var db = mongoJS('birds', ['sightings']);
var db = mongojs('birds', ['sightings']);
//var port = [mongod port from cmd];


app.post('/api/sighting', function(req, res){
	console.log('post hit');
	db.sightings.insert(req.body, function(err, result) {
		if(err) {
			return res.status(500).json(err);
		} else {
			return res.json(result);
		}
	});
});
app.get('/api/sighting', function(req, res){
  console.log('get hit');
  db.sightings.find(req.query, function(err, bird) {
  	if(!err) {
  		res.json(bird);
  	} else {
  		res.status(500).json(err);
  	}
  });
});
app.delete('/api/sighting', function(req, res){
  console.log('delete hit');
  db.sightings.remove(req.query, function(err, result) {
  	if(!err) {
  		res.json(result);
  	} else {
  		res.status(500).json(err);
  	}
  })
})
app.put('/api/sighting', function(req, res){
  console.log('put hit');
  db.sightings.update(req.query, req.body, function(err, result) {
  	if (err) {
  		res.status(500).json(err);
  	} else {
  		res.json(result);
  	}
  })
})


app.listen(3000, function(){
    
});