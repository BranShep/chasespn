var express = require('express');
var bodyParser = require('body-parser');



var config = require('./database');
var massive = require('massive');
var connectionString = "postgres://brandonshepherd@localhost/chasepn";

var massiveInstance = massive.connectSync({connectionString : connectionString});





var app = module.exports = express();

var jwt = require('express-jwt');
var cors = require('cors');

app.use(express.static('public'));
app.set('db', massiveInstance);

var databaseCtrl = require('./databaseCtrl.js');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(cors());

var authCheck = jwt({
  secret: new Buffer('j4I9S4g5e1peIlHUeSJABgPCE95JoSqOW-bZmiowBdnjoHY3GmzLbGEQe98IAxXm', 'base64'),
  audience: 'F2NNe3ImV4h7jGDghIoNyZ3btaEkxrKu'
})

var port = process.env.PORT || 8080;

app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));



app.get('/api/home', authCheck, function(req, res){
  res.json({message: "Hello there you don't have access.  Sorry!"});
});

app.post('/teams', databaseCtrl.getTeams);
app.get('/teams', databaseCtrl.getTeamsTwo);
app.get('/description', databaseCtrl.getDescriptions);
app.post('/rankings', databaseCtrl.updateRankings);
app.put('/rankings', databaseCtrl.updateDetails);
app.put('/rankings/image', databaseCtrl.upload);
app.put('/record', databaseCtrl.updateRecord);
app.get('/weeks', databaseCtrl.getWeeks);
app.post('/weeks', databaseCtrl.updateWeeks);
app.get('/allTeams', databaseCtrl.getAllTeams);
app.put('/title', databaseCtrl.saveTitle);

app.listen('3000', function(){
  console.log("Successfully listening on : 3000");
});
