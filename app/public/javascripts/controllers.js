angular.module('musicPlayer.controllers', [])
  .controller('indexCtrl', ['$scope', '$cookies', '$http', 'beatsService', 'soundService', 
    function($scope, $cookies, $http, beatsService, soundService){
    $scope.token = $cookies.music;
    $scope.currentSong = null;

    $scope.search = function(){
      beatsService.searchCatalog($scope.catalogQuery)
      .then(function(tracks){
        $scope.tracks = tracks;
      }, function(err){
        console.log('error', err);
      });
    };

    $scope.playTrack = function(trackId){
      var existingSong = soundManager.getSoundById(trackId);

      if(existingSong && $scope.currentSong){
        if($scope.currentSong.id === trackId){
          $scope.currentSong.togglePause();
        } else {
          $scope.currentSong.pause();
          $scope.currentSong = existingSong;
          $scope.currentSong.togglePause();
        }
      } else if(existingSong) {
        $scope.currentSong = existingSong;
        $scope.currentSong.togglePause();
      } else {
        beatsService.getAudio(trackId, $scope.token)
        .then(function(result){
          var newSong = soundService.createSound(trackId, result.location, result.resource);          
          
          if($scope.currentSong && $scope.currentSong.playState === 1){
            $scope.currentSong.pause();
          } 
          $scope.currentSong = newSong;
          
          soundManager.play('newSong', {
            onfinish: function(){
              $scope.currentSong = null;
            }
          });
        newSong.play();

        }, function(err){
          console.log('getAudio error', err);
        });

      }
    };


  }]);