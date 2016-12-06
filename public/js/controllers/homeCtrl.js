angular.module('chasepn').controller('homeCtrl', function($scope, mainService){
  $scope.test = 'Hello there angular';

  console.log('in home ctrl');

  $scope.d = new Date();
  console.log($scope.d.getMonth());
  if($scope.d.getMonth() === 1 || $scope.d.getMonth() === 2 || $scope.d.getMonth() === 3 || $scope.d.getMonth() === 4 || $scope.d.getMonth() === 5 || $scope.d.getMonth() === 6){
    $scope.date = ($scope.d.getFullYear() - 1).toString();
    console.log($scope.date);
    var date = $scope.date.slice(2,5);
    var dateTwo = (Number(date) + 1).toString();
    $scope.date = $scope.date + '-' + dateTwo;
  }else {
    $scope.date = $scope.d.getFullYear().toString();
    var date = $scope.date.slice(2,5);
    var dateTwo = (Number(date) + 1).toString();
    $scope.date = $scope.d.getFullYear().toString() + '-' + dateTwo;
  }

  $scope.getTeamsTwo = function(year){
    mainService.getTeamsTwo().then(function(response){
      console.log(response);
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

  $scope.getTeamsTwo($scope.date);

  $scope.getTeams = function(week){
    var newObj = {
      week: week,
      year: $scope.date
    }
      mainService.getTeams(newObj).then(function(response){
        console.log(response);
        $scope.teams = response.data;
      })
  }

  $scope.getWeeks = function(){
    mainService.getWeeks().then(function(response){
      console.log(response.data);
      $scope.weeks = response.data;
    })
  }

  $scope.getWeeks();


})
