angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $location, $ionicPopup, $rootScope) {
    $rootScope.transparent_header = false;

    $scope.searchbar = false;
    $scope.search = function () {
        $scope.searchbar = $scope.searchbar === true ? false : true;
    };
    $scope.user = {
        cart: 1
    };
    $scope.cartCheck = function () {
        if ($scope.user.cart === 0)
            $scope.showAlert();
        else
            $location.path('/app/cart');
    };
    $scope.showAlert = function () {
        var alertPopup = $ionicPopup.alert({
            title: 'Cart',
            template: 'There is nothing here. Keep shopping!'
        });
        alertPopup.then(function (res) {
            console.log('Thank you for not eating my delicious ice cream cone');
        });
    };

    $scope.loginData = {};
    //    -------------------LOGIN MODAL---------------------
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };
    $scope.login = function () {
        $scope.modal.show();
        $scope.closeSignup();
    };
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };
    $scope.openSignup = function () {
        $scope.closeLogin();
        $scope.signup();
    };
    //    -------------------END- LOGIN MODAL----------------------

    //    --------------------SIGNUP MODAL-------------------------
    $ionicModal.fromTemplateUrl('templates/signup.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modalSignup = modal;
    });
    $scope.closeSignup = function () {
        $scope.modalSignup.hide();
    };
    $scope.signup = function () {
        $scope.modalSignup.show();
    };
    $scope.doSignup = function () {
        console.log('Doing Signup', $scope.loginData);
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };
    //    -----------------END- SIGNUP MODAL-------------------------
    //   ---------------------FORGOT PASSWORD
    $ionicModal.fromTemplateUrl('templates/forgotpassword.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modalFrgt = modal;
    });
    $scope.closeFrgt = function () {
        $scope.modalFrgt.hide();
    };
    $scope.frgt = function () {
        $scope.modalFrgt.show();
    };
    $scope.doFrgt = function () {
        console.log('Doing Signup', $scope.loginData);
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };
    $scope.openFrgt = function () {
        $scope.closeLogin();
        $scope.frgt();
    };
    //    --------------------END- FORGOT PASSWORD
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
    .controller('DealsCtrl', function ($scope, $stateParams) {})
    .controller('NewArrivalsCtrl', function ($scope, $stateParams) {})
    .controller('MyAccountCtrl', function ($scope, $stateParams) {})
    .controller('EditInfoCtrl', function ($scope,$ionicScrollDelegate, $stateParams) {
        $scope.edit_save = "Edit information";
        $scope.disabled = true;
        $scope.saved = false;
        $scope.editSave = function () {
            if ($scope.edit_save === "Edit information") {
                $scope.edit_save = "Save";
                $scope.disabled = false;
                
            } else {
                $scope.edit_save = "Edit information";
//                SAVE OPERATIONS
                $scope.disabled=true;
                $scope.saved = true;
                $ionicScrollDelegate.scrollTop();
            }
        }
    })

.controller('ContactUsCtrl', function ($scope, $stateParams) {})
    .controller('ProductCategoriesCtrl', function ($scope, $stateParams) {})
    .controller('CartCtrl', function ($scope, $stateParams, $location, $ionicHistory) {
        $scope.goHome = function () {
            console.log($ionicHistory.viewHistory());
            $location.path('app/home');
        };
    })
    .controller('CheckoutCtrl', function ($scope, $stateParams) {
        $scope.different_address = false;
        $scope.address_select = "Ship to different address";
        $scope.toggleAddress = function () {
            if ($scope.different_address === false) {
                $scope.different_address = true;
                $scope.address_select = "Ship to same address";
            } else {
                $scope.different_address = false;
                $scope.address_select = "Ship to different address";
            }
        };
    })
    .controller('MyOrdersCtrl', function ($scope, $stateParams, $location, $ionicHistory) {

    })
    .controller('MyWishlistCtrl', function ($scope, $stateParams, $location, $ionicHistory) {

    })
    .controller('DistributionCtrl', function ($scope, $stateParams) {
        $scope.brands = [{
            image: "img/brands/acmemade.jpeg"
                                    }, {
            image: "img/brands/Adidas.png"

                                    }, {
            image: "img/brands/adonit.png"

                                    }, {
            image: "img/brands/apple.png"

                                    }, {
            image: "img/brands/autodrive.png"

                                    }, {
            image: "img/brands/autodrive.png"

                                    }, {
            image: "img/brands/beats.png"

                                    }, {
            image: "img/brands/dell.png"

                                    }, {
            image: "img/brands/gstarraw.png"

                                    }, {
            image: "img/brands/dolcegabbana.jpg"

                                    }, {
            image: "img/brands/gas.jpg"
                                    }, {
            image: "img/brands/hp.png"

                                    }, {
            image: "img/brands/jackjones.png"

                                    }, {
            image: "img/brands/levis.png"

                                    }, {
            image: "img/brands/logo.png"

                                    }, {
            image: "img/brands/motorola.png"

                                    }, {
            image: "img/brands/sony.png"

                                    }, {
            image: "img/brands/tommy.jpg"
                                            }];
        $scope.brands = _.chunk($scope.brands, 3);
    })
    .controller('ProductCtrl', function ($scope, $stateParams, $timeout, $rootScope) {
        $scope.addwishlist = false;
        $rootScope.transparent_header = false;
        console.log($rootScope.transparent_header);
        $scope.params = $stateParams;

        $scope.addWishlist = function () {
            $scope.addwishlist = true;
            console.log($scope.addwishlist);
        };
        $scope.products = [{
            "name": "N4L 4S0",
            "company": "Apple Systems",
            "price": "Rs.5,807",
            "rating": 4
        }, {
            "name": "Q8M 7V6",
            "company": "Chami",
            "price": "Rs.6,439",
            "rating": 4
        }, {
            "name": "D1G 6X1",
            "company": "Lycos",
            "price": "Rs.9,173",
            "rating": 2
        }, {
            "name": "J7D 4A9",
            "company": "Lycos",
            "price": "Rs.7,359",
            "rating": 5
        }, {
            "name": "I4V 5E3",
            "company": "Borland",
            "price": "Rs.8,508",
            "rating": 3
        }, {
            "name": "E5B 7H1",
            "company": "Macromedia",
            "price": "Rs.7,069",
            "rating": 4
        }, {
            "name": "G2Z 7I0",
            "company": "Microsoft",
            "price": "Rs.9,877",
            "rating": 1
        }, {
            "name": "T3Y 5M4",
            "company": "Lavasoft",
            "price": "Rs.7,375",
            "rating": 4
        }, {
            "name": "P5M 4E3",
            "company": "Cakewalk",
            "price": "Rs.5,237",
            "rating": 2
        }, {
            "name": "E9B 1Y5",
            "company": "Sibelius",
            "price": "Rs.5,388",
            "rating": 2
        }, {
            "name": "O1W 7H3",
            "company": "Altavista",
            "price": "Rs.6,285",
            "rating": 2
        }, {
            "name": "V4V 3M6",
            "company": "Borland",
            "price": "Rs.9,667",
            "rating": 3
        }, {
            "name": "C5C 1P0",
            "company": "Macromedia",
            "price": "Rs.5,325",
            "rating": 1
        }, {
            "name": "T2D 9W7",
            "company": "Google",
            "price": "Rs.5,695",
            "rating": 2
        }, {
            "name": "C5B 2E6",
            "company": "Macromedia",
            "price": "Rs.7,935",
            "rating": 1
        }, {
            "name": "G9Z 5X7",
            "company": "Microsoft",
            "price": "Rs.6,260",
            "rating": 5
        }, {
            "name": "R9N 6F4",
            "company": "Lavasoft",
            "price": "Rs.9,963",
            "rating": 1
        }, {
            "name": "I8K 1Y9",
            "company": "Chami",
            "price": "Rs.5,001",
            "rating": 5
        }, {
            "name": "M6C 1G2",
            "company": "Cakewalk",
            "price": "Rs.6,820",
            "rating": 4
        }, {
            "name": "B9G 8O9",
            "company": "Borland",
            "price": "Rs.8,185",
            "rating": 4
        }, {
            "name": "F9Y 8Q9",
            "company": "Sibelius",
            "price": "Rs.5,129",
            "rating": 3
        }, {
            "name": "W0W 7Y7",
            "company": "Finale",
            "price": "Rs.6,774",
            "rating": 1
        }, {
            "name": "V9S 9B1",
            "company": "Sibelius",
            "price": "Rs.5,627",
            "rating": 3
        }, {
            "name": "K1R 8P1",
            "company": "Sibelius",
            "price": "Rs.8,179",
            "rating": 5
        }, {
            "name": "I1X 6M0",
            "company": "Finale",
            "price": "Rs.5,607",
            "rating": 4
        }, {
            "name": "K5W 0Z6",
            "company": "Sibelius",
            "price": "Rs.9,854",
            "rating": 4
        }, {
            "name": "D7U 7E0",
            "company": "Microsoft",
            "price": "Rs.5,699",
            "rating": 3
        }, {
            "name": "S6U 6C1",
            "company": "Apple Systems",
            "price": "Rs.9,765",
            "rating": 3
        }, {
            "name": "S6N 0Y9",
            "company": "Sibelius",
            "price": "Rs.9,990",
            "rating": 5
        }, {
            "name": "B2I 6L6",
            "company": "Yahoo",
            "price": "Rs.6,344",
            "rating": 3
        }];
        $scope.products = _.chunk($scope.products, 2);
    })
    .controller('ProductDetailCtrl', function ($scope, $stateParams, $rootScope, $ionicScrollDelegate) {
        $rootScope.transparent_header = true;
        $scope.activate = true;
        $scope.tab = {
            left: true,
            right: false
        }
        var i = 0;
        $scope.pageScrolled = function () {
            console.log(++i);
            if ($ionicScrollDelegate.getScrollPosition().top > 240) {
                $rootScope.transparent_header = false;
                $scope.$apply();
            } else {
                $rootScope.transparent_header = true;
                $scope.$apply();
            }
        };
        $scope.clickTab = function (side) {

            if (side === "left") {
                $scope.tab.left = true;
                $scope.tab.right = false;
            } else {
                $scope.tab.right = true;
                $scope.tab.left = false;
                console.log("here");
            }
        };

    })
    .controller('BrandsCtrl', function ($scope, $stateParams, $rootScope) {
        $rootScope.nosearch = true;
        $scope.brands = [{
            image: "img/brands/acmemade.jpeg"
                                    }, {
            image: "img/brands/Adidas.png"

                                    }, {
            image: "img/brands/adonit.png"

                                    }, {
            image: "img/brands/apple.png"

                                    }, {
            image: "img/brands/autodrive.png"

                                    }, {
            image: "img/brands/autodrive.png"

                                    }, {
            image: "img/brands/beats.png"

                                    }, {
            image: "img/brands/dell.png"

                                    }, {
            image: "img/brands/gstarraw.png"

                                    }, {
            image: "img/brands/dolcegabbana.jpg"

                                    }, {
            image: "img/brands/gas.jpg"
                                    }, {
            image: "img/brands/hp.png"

                                    }, {
            image: "img/brands/jackjones.png"

                                    }, {
            image: "img/brands/levis.png"

                                    }, {
            image: "img/brands/logo.png"

                                    }, {
            image: "img/brands/motorola.png"

                                    }, {
            image: "img/brands/sony.png"

                                    }, {
            image: "img/brands/tommy.jpg"
                                            }];
        $scope.brands = _.chunk($scope.brands, 3);
    })
    .controller('AboutCtrl', function ($scope, $ionicScrollDelegate, $stateParams) {
        $scope.activate = true;
        $scope.tab = {
            left: true,
            right: false
        }
        $scope.clickTab = function (side) {
            $ionicScrollDelegate.scrollTop();
            if (side === "left") {
                $scope.tab.left = true;
                $scope.tab.right = false;
            } else {
                $scope.tab.right = true;
                $scope.tab.left = false;
                console.log("here");
            }
        };
        $scope.clientele = [{
            image: 'img/clientele/BipashaBasu.JPG',
            caption: 'Lorem ipsum dolor sit amet eni'
        }, {
            image: 'img/clientele/KarishmaKapoor.jpg',
            caption: 'consectetur adipisicing elit.'
        }, {
            image: 'img/clientele/MSG.jpg',
            caption: 'assumenda ipsam minus '
        }, {
            image: 'img/clientele/NicolasAnelka.jpg',
            caption: 'sequi aliquam pariatur unde nihil '
        }];
    });