angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
    $scope.searchbar = false;
    $scope.searchToggle = function () {
        $scope.searchbar = $scope.searchbar === true ? false : true;
    };
})

.controller('HomeCtrl', function ($scope) {
    $scope.slides = [{
        image: "img/slider/1.jpg",

    }, {
        image: "img/slider/2.jpg",

    }, {
        image: "img/slider/3.jpg",

    }];
})

.controller('PlaylistCtrl', function ($scope, $stateParams) {})
.controller('BrandsCtrl', function ($scope, $stateParams) {});