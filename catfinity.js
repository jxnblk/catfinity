'use strict';

var catfinity = angular.module('catfinity', []);
var apiKey = 'fUtdwgP36wKTV9LbYGbNNZ2qPMONCAIRxC3GZVTqnV0swO3RTZ';
catfinity.factory('tumblr', function($http) {
  var tumblr = {
    getCats: function($scope) {
      $http.jsonp('http://api.tumblr.com/v2/tagged?tag=cat-gif&api_key=' + apiKey + '&callback=JSON_CALLBACK&limit=32').
        error(function(error){ console.error('oh noes') }).
        success(function(cats){
            $scope.cats = cats.response;
            $scope.oldest = $scope.cats[$scope.cats.length-1].timestamp;
            $scope.loadingCats = false;
        });
    },
    getMoarCats: function($scope) {
      $http.jsonp('http://api.tumblr.com/v2/tagged?tag=cat-gif&api_key=' + apiKey + '&callback=JSON_CALLBACK&limit=32' + '&before=' + $scope.oldest).
        error(function(error){ console.error('oh noes') }).
        success(function(cats){
          $scope.cats = $scope.cats.concat(cats.response);
          $scope.oldest = $scope.cats[$scope.cats.length-1].timestamp;
          $scope.loadingCats = false;
        });
    }
  };
  return tumblr;
});
catfinity.controller('catfinity', ['$scope', 'tumblr', function($scope, tumblr) {
    tumblr.getCats($scope);
    $scope.moar = function() {
      if($scope.loadingCats == false) {
        tumblr.getMoarCats($scope);
        $scope.loadingCats = true;
      };
    };
}]);

