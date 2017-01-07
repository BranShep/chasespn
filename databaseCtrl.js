var app = require('./index.js');
var db = app.get('db');

module.exports = {

  getTeams: function(req, res, next){
      console.log('in get teams');
      db.get_teams([req.params.id, req.query.year] , function(err, teams){
        res.json(teams);
      })
  },

  getTeamsFinal: function(req, res, next){
      console.log('in get teamsfinal');
      db.get_teams_final([req.params.id, req.query.year] , function(err, teams){
        res.json(teams);
      })
  },


  getTeamsTwo: function(req, res, next){
      console.log('in get teamsTwo');
      db.get_teams_two([req.params.year], function(err, teams){
        res.json(teams);
      })
  },

  getTeamsTwoFinal: function(req, res, next){
      console.log('in get teamsTwo final');
      console.log(req.params.year);
      db.get_teams_two_final([req.params.year], function(err, teams){
        res.json(teams);
      })
  },

  getDescriptions: function(req, res, next){
      console.log('in get descriptions');
      db.get_descriptions(function(err, descriptions){
        res.json(descriptions);
      })
  },

  updateRankings: function(req, res, next){
    db.post_rankings([req.body.week, req.body.teamid, req.body.ranking, req.body.previous_ranking, req.body.year, req.body.position, req.body.name, req.body.date], function(err, ranking){
      res.json(ranking);
    })
  },

  updateTemp: function(req, res, next){
   console.log(req.body.week);
   console.log('in updateTemp');
    db.post_temp([req.body.week, req.body.year], function(err, temp){
      res.json(temp);
    })
  },

  deleteLive: function(req, res, next){
   console.log('in updateTemp');
    db.delete_live([req.params.week, req.query.year], function(err, temp){
      res.json(temp);
    })
  },

  updateDetails: function(req, res, next){
    console.log('in details');
    db.update_details([req.body.description, req.body.teamid, req.body.weekid, req.body.year], function(err, details){
      res.json(details);
    })
  },

  updateRecord: function(req, res, next){
    db.update_record([req.body.name, req.body.record], function(err, record){
      res.json(record);
    })
  },

  getWeeks: function(req, res, next){
    db.get_weeks([req.params.year], function(err, weeks){
      res.json(weeks);
    })
  },

  updateWeeks: function(req, res, next){
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
  },

  deleteWeek: function(req, res, next){
    db.delete_week([req.params.id, req.query.year], function(err, week){
       res.json(week);
    })

    db.delete_week_two([req.params.id, req.query.year], function(err, week){
       res.json(week);
    })

    db.delete_week_temp([req.params.id, req.query.year], function(err, week){
      res.json(week);
    })
  },

 deleteWeekTwo: function(req, res, next){
    db.delete_week_two([req.params.id, req.query.year], function(err, week){
       res.json(week);
    })
  }

}
