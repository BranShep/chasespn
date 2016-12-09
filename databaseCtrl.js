var app = require('./index.js');
var db = app.get('db');
var config = require('./database');

module.exports = {

  getTeams: function(req, res, next){
      console.log('in get teams');
      console.log(req.body.week);
      console.log(req.body.year);
      db.get_teams([req.body.week, req.body.year], function(err, teams){
        console.log(err, teams);
        res.json(teams);
      })
  },

  getTeamsTwo: function(req, res, next){
      console.log('in get teamsTwo');
      db.get_teams_two(function(err, teams){
        console.log(err, teams);
        res.json(teams);
      })
  },

  getDescriptions: function(req, res, next){
      console.log('in get descriptions');
      db.get_descriptions(function(err, descriptions){
        console.log(err, descriptions);
        res.json(descriptions);
      })
  },

  updateRankings: function(req, res, next){
    console.log(req.body);
    db.post_rankings([req.body.week, req.body.teamid, req.body.ranking, req.body.previous_ranking, req.body.year, req.body.position, req.body.name, req.body.date], function(err, ranking){
      console.log(err, ranking);
      console.log(ranking);
      res.json(ranking);
    })
  },

  updateDetails: function(req, res, next){
    db.update_details([req.body.description, req.body.teamid, req.body.weekid, req.body.year], function(err, details){
      console.log(err, details);
      res.json(details);
    })
  },

  updateRecord: function(req, res, next){
    db.update_record([req.body.name, req.body.record], function(err, record){
      console.log(err, record);
      res.json(record);
    })
  },

  getWeeks: function(req, res, next){
    db.get_weeks(function(err, weeks){
      res.json(weeks);
    })
  },

  updateWeeks: function(req, res, next){
    console.log(req.body.week);
    db.update_weeks([req.body.week], function(err, week){
      res.json(week);
    })
  },

  getAllTeams: function(req, res, next){
    db.get_all_teams(function(err, teams){
      res.json(teams);
    })
  },

  upload: function(req, res, next){
    db.upload([req.body.file, req.body.week, req.body.year], function(err,image){
      res.json(image);
    })
  },

  saveTitle: function(req, res, next){
    db.save_title([req.body.title, req.body.week, req.body.year], function(err, title){
        res.json(title);
    })
  }

}
