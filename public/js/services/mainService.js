angular.module('chasepn').service('mainService', function($http, $sce){

  this.getTeams = function(obj){
    console.log(obj);
    return $http({
      method: 'GET',
      url: '/teams/' + obj.week,
      params: {
        year: obj.year
      }
    })
  }

  this.getTeamsFinal = function(obj){
    console.log(obj);
    return $http({
      method: 'GET',
      url: '/teamsFinal/' + obj.week,
      params: {
        year: obj.year
      }
    })
  }

  this.getTeamsTwo = function(year){
    return $http({
      method: 'GET',
      url: '/teamsTwo/' + year
    })
  }

  this.getTeamsTwoFinal = function(year){
    console.log(year);
    return $http({
      method: 'GET',
      url: '/teamsTwoFinal/' + year
    })
  }

  this.updateRankings = function(obj){
    console.log(obj);
    return $http({
      method: 'POST',
      url: '/rankings',
      data: obj
    })
  }

  this.updateRankingsTemp = function(obj){
    console.log(obj);
    return $http({
      method: 'POST',
      url: '/temp',
      data: obj
    })
  }

  this.updateDetails = function(obj){
    console.log(obj);
    return $http({
      method: 'PUT',
      url: '/rankings',
      data: obj
    })
  }

  this.getStandings = function(){
    return $http({
      method: 'GET',
      url: 'https://cors-anywhere.herokuapp.com/https://erikberg.com/nba/standings.json'
    })
  }

  this.updateRecord = function(obj){
    console.log(obj);
    return $http({
      method: 'PUT',
      url: '/record',
      data: obj
    })
  }

  this.updateWeeks = function(week){
    console.log(week);
    return $http({
      method: 'POST',
      url: '/weeks',
      data: week
    })
  }

  this.getWeeks = function(year){
    return $http({
      method: 'GET',
      url: '/weeks/' + year
    })
  }

  this.getAllTeams = function(){
    return $http({
      method: 'GET',
      url: '/allTeams'
    })
  }

  this.upload = function(obj){
    console.log(obj);
    return $http({
      method: 'PUT',
      url: '/rankings/image',
      data: obj
    })
  }

  this.saveTitle = function(obj){
    console.log(obj);
    return $http({
      method: 'PUT',
      url: '/title',
      data: obj
    })
  }

 this.deleteWeek = function(obj){
    console.log(obj);
    return $http({
      method: 'DELETE',
      url: '/rankings/' + obj.week,
      params: {
        year: obj.year
      }
    })
  }

 this.deleteWeekTwo = function(obj){
    return $http({
      method: 'DELETE',
      url: '/weeks/' + obj.week,
      params: {
        year: obj.year
      }
    })
  }

 this.makeLive = function(obj){
    console.log(obj);
    return $http({
      method: 'POST',
      url: '/temp',
      data: obj
    })
 }

 this.deleteLive = function(obj){
    console.log(obj);
    return $http({
      method: 'DELETE',
      url: '/temp/' + obj.week,
      params: {
        year: obj.year
      }
    })
 }

})
