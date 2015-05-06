var app = angular.module('WebsiteApp', ['ng']);

app.controller('HomeCtrl',[
  '$scope', '$rootScope', '$http', '$timeout',
  function($scope, $rootScope, $http, $timeout) {
    $scope.templates = [];
    $scope.website = '';

    var socket = io();

    $scope.search = function(){
      if(!$scope.website){ return; }
      socket.emit('search', $scope.website);
      console.log('app::search');
    };

    $scope.setTemplate = function(templateUrl){
      $scope.template = templateUrl;
    };

    socket.on('found', function (data) {
      $timeout(function(){
        $scope.status = '';
        $scope.website = '';
        $scope.message = '';
        $scope.templates.push(data);
        $scope.setTemplate($scope.templates[$scope.templates.length -1].url);
        console.log('app::found');
      }, 1);
    });

    socket.on('current', function (data) {
      $timeout(function(){
        $scope.numUsers = data.numUsers;
      }, 1);

      console.log('app::current');
    });

    socket.on('message', function (data) {
      $timeout(function(){
        console.log(data)
        if(data.error){
          if(data.error.cert){
            $scope.message = data.error.cert.reason;
          }
          else{
            $scope.message = JSON.stringify(data.error);
          }
        }else{
          $scope.message = 'Error retriving that website';
        }
      }, 1);
      console.log('app::message');
    });

    socket.emit('online');

  }
]);
