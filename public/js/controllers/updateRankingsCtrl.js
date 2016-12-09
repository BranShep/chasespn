angular.module('chasepn').controller('updateRankingsCtrl', function($scope, mainService, $location){
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
        $scope.title = $scope.teams[0].title;
      })
    })
  }

  $scope.getTeamsTwo();



  $scope.description;
  $scope.record;

  $scope.updateDetails = function(teams, weekid, year){

    console.log(year);
    for (var i = 0; i <= teams.length; i++){
      var newObj = {
        description: teams[i].description,
        teamid: teams[i].teamid,
        weekid: weekid,
        year: year
      }
      mainService.updateDetails(newObj).then(function(response){
        location.reload();
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


  $scope.creds = {
    bucket: 'chasepn',
    access_key: 'AKIAJEAOLYQOTZGBNGVA',
    secret_key: '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'
  }

  $scope.sizeLimit      = 10585760; // 10MB in Bytes
    $scope.uploadProgress = 0;

    $scope.upload = function(week, year) {
      console.log(week, year);
      console.log($scope.file);
      var newObj = {
        file: 'https://s3-us-west-2.amazonaws.com/chasepn/' + $scope.file.name,
        week: week,
        year: year
      }
      mainService.upload(newObj).then(function(response){
        console.log(response);
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

              $scope.getTeamsTwo();
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
        console.log(response);
        $scope.getTeamsTwo();
      })
    }
})
