angular.module('musicPlayer.services', [])
  .service('beatsService',['$http', function($http){
    var baseURL = 'https://partner.api.beatsmusic.com/v1/api';

    this.searchCatalog = function(query){
      return $http({
        method:"GET",
        url: '/api/search?search='+ encodeURIComponent(query)
      }).then(function(result){
        return result.data.data;
      }, function(err){
        return err;
      });
    };

    this.getAudio = function(trackId, token){
      return $http({
        method: "GET",
        url: baseURL + '/tracks/' + trackId + '/audio?aquire=1&access_token=' + token
      }).then(function(result){
        return result.data.data;
      }, function(err){
        return err;
      });
    };
    
  }])

  .service('soundService', [function(){
    
    this.createSound = function(trackId, serverURL, assetURL){
      return soundManager.createSound({
        id: trackId,
        serverURL: serverURL,
        url: assetURL
      });
    };

  }]);