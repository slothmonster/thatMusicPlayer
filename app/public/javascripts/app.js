angular.module('musicPlayer', [
  'ngRoute',
  'ngCookies',
  'musicPlayer.controllers',
  'musicPlayer.services'
  ])
.config(['$routeProvider', function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: '../templates/index.html',
    controller: 'indexCtrl'
  });

  //soundmanager2 init
  soundManager.setup({
    url: '../soundmanager/swf/',
    flashVersion: 9,
    preferFlash: true,
    onready: function(){
      console.log('soundmanager initialized successfully');
    }
  });
}]);