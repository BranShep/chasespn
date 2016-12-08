angular.module('chasepn').service('mainService', function($http, $sce){

  this.getTeams = function(obj){
    console.log(obj);
    return $http({
      method: 'POST',
      url: '/teams',
      data: obj
    })
  }

  this.getTeamsTwo = function(){
    return $http({
      method: 'GET',
      url: '/teams'
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
      url: 'https://erikberg.com/nba/standings.json'
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

  this.getWeeks = function(){
    return $http({
      method: 'GET',
      url: '/weeks'
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

})
