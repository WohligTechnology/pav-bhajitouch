angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

.controller('HomeCtrl', function($scope) {
         $scope.slides = [{
            image: "img/slider/1.jpg",
           
    },  {
            image: "img/slider/2.jpg",
           
    }, {
            image: "img/slider/3.jpg",
           
    }];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
