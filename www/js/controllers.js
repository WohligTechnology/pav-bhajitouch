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
        image: "img/slider/.png",

    }];
})

.controller('PlaylistCtrl', function ($scope, $stateParams) {})
    .controller('BrandsCtrl', function ($scope, $stateParams) {
        $scope.brands = [{
            image: "img/brands/acmemade.jpeg",
    }, {
            image: "img/brands/Adidas.png",

    }, {
            image: "img/brands/adonit.png",

    }, {
            image: "img/brands/apple.png",

    }, {
            image: "img/brands/autodrive.png",

    }, {
            image: "img/brands/autodrive.png",

    }, {
            image: "img/brands/beats.png",

    }, {
            image: "img/brands/dell.png",

    }, {
            image: "img/brands/gstarraw.png",

    }, {
            image: "img/brands/dolcegabbana.jpg",

    }, {
            image: "img/brands/gas.jpg",

            }, {
    image: "img/brands/hp.png",

}]; 
    $scope.brands=_.chunk($scope.brands,3);
    console.log($scope.brands);
    });