var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var config = require('./config.js');
var massive = require('massive');
var connectionString = "postgres://" + config.connectString + "@localhost/chasepn";

var massiveInstance = massive.connectSync({connectionString : connectionString});





var app = module.exports = express();

var jwt = require('express-jwt');


app.use(express.static('public'));
app.use(cors());

app.set('db', massiveInstance);
var databaseCtrl = require('./databaseCtrl.js');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


var port = 80;


app.get('/teams/:id', databaseCtrl.getTeams);
app.get('/teamsFinal/:id', databaseCtrl.getTeamsFinal);
app.get('/teamsTwo/:year', databaseCtrl.getTeamsTwo);
app.get('/teamsTwoFinal/:year', databaseCtrl.getTeamsTwoFinal);
app.get('/description', databaseCtrl.getDescriptions);
app.post('/rankings', databaseCtrl.updateRankings);
app.post('/temp', databaseCtrl.updateTemp);
app.delete('/temp/:week', databaseCtrl.deleteLive);
app.put('/rankings', databaseCtrl.updateDetails);
app.put('/rankings/image', databaseCtrl.upload);
app.put('/record', databaseCtrl.updateRecord);
app.get('/weeks/:year', databaseCtrl.getWeeks);
app.post('/weeks', databaseCtrl.updateWeeks);
app.get('/allTeams', databaseCtrl.getAllTeams);
app.put('/title', databaseCtrl.saveTitle);
app.delete('/rankings/:id', databaseCtrl.deleteWeek);
app.delete('/weeks/:id', databaseCtrl.deleteWeekTwo);
app.get('/test', databaseCtrl.test);

app.listen(port, function(){
  console.log("Successfully listening on : 3000");
});
