angular.module('chasepn').controller('updateRankingsCtrl', function($scope, mainService){
  $scope.test = 'Hello there angular';


  $scope.getTeamsTwo = function(){
        var d = new Date();
        console.log(d.getMonth());
        if(d.getMonth() === 1 || d.getMonth() === 2 || d.getMonth() === 3 || d.getMonth() === 4 || d.getMonth() === 5 || d.getMonth() === 6){
          var da = (d.getFullYear() - 1).toString();
          console.log(da);
          var date = da.slice(2,5);
          var dateTwo = (Number(date) + 1).toString();
          var year = date + '-' + dateTwo;
        }else {
          var da = d.getFullYear().toString();
          var dat = da.slice(2,5);
          var dateTwo = (Number(dat) + 1).toString();
          var year = da + '-' + dateTwo;
        }
    mainService.getTeamsTwo(year).then(function(response){
      $scope.currentWeek = response.data[0].max;

      var newObj = {
        week: $scope.currentWeek,
        year: year
      }

      mainService.getTeams(newObj).then(function(response){
        $scope.teams = response.data;
      })
    })
  }

  $scope.getTeamsTwo();

  $scope.description;
  $scope.record;

  $scope.updateDetails = function(description, teamid, weekid, tdesc, year){

    console.log(year);

    if(description === undefined){
      description = tdesc;
    }

    var newObj = {
      description: description,
      teamid: teamid,
      weekid: weekid,
      year: year
    }

    mainService.updateDetails(newObj).then(function(response){
        // $scope.getTeamsTwo($scope.date);
    })
  }

  $scope.newStandings=[];
  $scope.name;

  $scope.standings;

  $scope.getStandings = function(){

    mainService.getStandings().then(function(response){
      $scope.standings = response.data.standing;
      $scope.poo($scope.standings);
    })
  }


  $scope.updateRecord = function(obj){
    mainService.updateRecord(obj).then(function(response){
      $scope.getTeamsTwo();
    })
  }


    $scope.poo = function(standings){
      var standingsArr = [];
          for(var i = 0; i <= standings.length; i++){
              var newObj = {
                name: standings[i].first_name + ' ' + standings[i].last_name,
                record: standings[i].won + " " + '-' + " " + standings[i].lost
              }
              $scope.updateRecord(newObj);
          }

    }

  $scope.getStandings();

})
