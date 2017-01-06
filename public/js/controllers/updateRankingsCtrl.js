angular.module('chasepn').controller('updateRankingsCtrl', function($stateParams, $rootScope, $state, $scope, mainService, $location, authService){
  $scope.test = 'Hello there angular';
  $rootScope.$on('$viewContentLoaded',function(){
            jQuery('html, body').animate({ scrollTop: 0 }, 200);
        });
  $scope.user = JSON.parse(localStorage.getItem('profile'));
  $scope.name = $scope.user.name;
  $scope.profilePic = $scope.user.picture;

  $scope.d = new Date();
  if($scope.d.getMonth() === 0 || $scope.d.getMonth() === 1 || $scope.d.getMonth() === 2 || $scope.d.getMonth() === 3 || $scope.d.getMonth() === 4 || $scope.d.getMonth() === 5){
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

  $scope.getTeamsTwo($scope.date);

  $scope.description;
  $scope.record;

  $scope.updateDetails = function(teams, weekid, year){

    for (var i = 0; i <= teams.length; i++){
      var newObj = {
        description: teams[i].description,
        teamid: teams[i].teamid,
        weekid: weekid,
        year: year
      }
      mainService.updateDetails(newObj).then(function(response){
         $state.go('home');
      })
    }

    // if(description === undefined){
    //   description = tdesc;
    // }




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
  
  $scope.creds = {
    bucket: 'chasepn',
    access_key: 'AKIAJEAOLYQOTZGBNGVA',
    secret_key: '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'
  }

  $scope.setFile = function(element) {
          $scope.$apply(function($scope) {
              $scope.file = element.files[0];
          });
      }; 

  $scope.sizeLimit      = 10585760; // 10MB in Bytes
    $scope.uploadProgress = 0;

    $scope.upload = function(week, year) {
      var newObj = {
        file: 'https://s3-us-west-2.amazonaws.com/chasepn/' + $scope.file.name,
        week: week,
        year: year
      }
      mainService.upload(newObj).then(function(response){
      })
      AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
      AWS.config.region = 'us-east-1';
      var bucket = new AWS.S3({ params: { Bucket: $scope.creds.bucket } });

      if($scope.file) {
          // Perform File Size Check First
          var fileSize = Math.round(parseInt($scope.file.size));
          if (fileSize > $scope.sizeLimit) {
            toastr.error('Sorry, your attachment is too big. <br/> Maximum '  + $scope.fileSizeLabel() + ' file attachment allowed','File Too Large');
            return false;
          }
          // Prepend Unique String To Prevent Overwrites
          var uniqueFileName = $scope.file.name;

          var params = { Key: uniqueFileName, ContentType: $scope.file.type, Body: $scope.file, ServerSideEncryption: 'AES256' };

          bucket.putObject(params, function(err, data) {
            if(err) {
              toastr.error(err.message,err.code);
              return false;
            }
            else {
              // Upload Successfully Finished
              toastr.success('File Uploaded Successfully', 'Done');
              
              $state.reload();
              // Reset The Progress Bar
              setTimeout(function() {
                $scope.uploadProgress = 0;
                $scope.$digest();
              }, 4000);
            }
          })
          .on('httpUploadProgress',function(progress) {
            $scope.uploadProgress = Math.round(progress.loaded / progress.total * 100);
            $scope.$digest();
          });
        }
        else {
          // No File Selected
          toastr.error('Please select a file to upload');
        }
      }

      $scope.fileSizeLabel = function() {
      // Convert Bytes To MB
      return Math.round($scope.sizeLimit / 1024 / 1024) + 'MB';
    };

    $scope.saveTitle = function(title, week, year) {
      var newObj = {
        title: title,
        week: week,
        year: year
      }

      mainService.saveTitle(newObj).then(function(response){
         $state.reload();
      })
    }

    $scope.deleteWeek = function(week, year) {
          var x = confirm("Are you sure you want to delete?");
       if(x){
	 var newObj = {
           week: week,
           year: year
         }
          mainService.deleteWeek(newObj).then(function(response){
            $state.reload();
          })
       }else {
          return false;
       }    
    }
   
   $scope.deleteWeekTwo = function() {
      mainService.deleteWeekTwo().then(function(response){
        $scope.getTeamsTwo();
      })
    }
   
  $scope.makeLive = function(week, year) {
    console.log(week,year);
    var x = confirm("Are you sure you want to go live?");
       if(x){
          var newObj = {
           week: week,
           year: year
         }
          mainService.makeLive(newObj).then(function(respsone){
          })
       }else {
         return false;
       }
  }
  

})
