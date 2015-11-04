var allfunction = {};
angular.module('starter.controllers', ['ui.bootstrap'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $location, $ionicPopup, $rootScope, MyServices, $ionicLoading) {
    $rootScope.transparent_header = false;
    $scope.userSignup = {};
    $scope.loginData = {};
    $scope.forgot = {};
    $scope.searchbar = false;
    allfunction.msg = function (msg, title) {
        var myPopup = $ionicPopup.show({
            template: '<p class="text-center">' + msg + '!</p>',
            title: title,
            scope: $scope,
        });
        $timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 2500);
    };
    allfunction.loading = function () {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-positive"></ion-spinner>'
        });
        $timeout(function () {
            $ionicLoading.hide();
        }, 5000);
    };
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
    //    -------------------LOGIN MODAL---------------------
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });
    $scope.closeLogin = function () {
        $scope.loginData = {};
        $scope.modal.hide();
    };
    $scope.login = function () {
        $scope.modal.show();
        $scope.closeSignup();
    };

    $scope.doLogin = function () {
        $scope.allvalidation = [{
            field: $scope.loginData.email,
            validation: ""
        }, {
            field: $scope.loginData.password,
            validation: ""
        }];
        var check = formvalidation($scope.allvalidation);
        if (check) {
            console.log($scope.loginData);
            allfunction.loading();
            MyServices.login($scope.loginData, function (data) {
                console.log(data);
                if (data != "false") {
                    $ionicLoading.hide();
                    MyServices.setuser(data);
                    $scope.closeLogin();
                    $location.path("/app/home");
                } else {
                    $ionicLoading.hide();
                    allfunction.msg("Email & Password Did Not Match", 'Error!');
                }
            });
        } else {
            allfunction.msg("Fill all mandatory fields", "Error !");
        }
    };
    $scope.openSignup = function () {
        //        $scope.closeLogin();
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
        $scope.userSignup = {};
        $scope.modalSignup.hide();
    };
    $scope.signup = function () {
        $scope.modalSignup.show();
        $scope.closeLogin();
    };
    $scope.doSignup = function () {
        $scope.allvalidation = [{
            field: $scope.userSignup.firstname,
            validation: ""
        }, {
            field: $scope.userSignup.lastname,
            validation: ""
        }, {
            field: $scope.userSignup.email,
            validation: ""
        }, {
            field: $scope.userSignup.password,
            validation: ""
        }, {
            field: $scope.userSignup.confirmpassword,
            validation: ""
        }];
        var check = formvalidation($scope.allvalidation);
        if (check) {
            if ($scope.userSignup.password === $scope.userSignup.confirmpassword) {
                console.log($scope.userSignup);
                allfunction.loading();
                MyServices.registerUser($scope.userSignup, function (data) {
                    if (data != "false") {
                        console.log(data);
                        $ionicLoading.hide();
                        MyServices.setuser(data);
                        $scope.closeSignup();
                        $location.path("/app/home");
                    } else {
                        console.log(data);
                        $ionicLoading.hide();
                        allfunction.msg("This Email Id is already registered with us or Error In Registration", 'Error!');
                    }
                });
            } else {
                allfunction.msg('Password did not match, Please re-enter password', 'Password Mis-match');
            }
        } else {
            allfunction.msg("Fill all mandatory fields", "Error !");
        }
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
    $scope.doFrgt = function (emailforgot) {
        $scope.forgot = emailforgot;
        $scope.allvalidation = [{
            field: $scope.forgot.email,
            validation: ""
        }];
        var check = formvalidation($scope.allvalidation);
        if (check) {
            allfunction.loading();
            MyServices.forgotPassword($scope.forgot, function (data) {
                console.log(data);
                if (data != "Not A Valid Email.") {
                    $ionicLoading.hide();
                    $scope.closeFrgt();
                    $location.path("/app/home");
                } else {
                    $ionicLoading.hide();
                    allfunction.msg("Email Id Not Found", 'Error!');
                }
            });
        } else {
            allfunction.msg("Fill all mandatory fields", "Error !");
        }
    };
    $scope.openFrgt = function () {
        $scope.frgt();
        $scope.closeLogin();
    };
    //    --------------------END- FORGOT PASSWORD
    //   ---------------------FILTERS
    $ionicModal.fromTemplateUrl('templates/filters.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modalFilter = modal;
    });
    $scope.closeFilter = function () {
        $scope.modalFilter.hide();
    };
    $scope.filter = function () {
        $scope.modalFilter.show();
    };
    $scope.doFilter = function () {
        console.log('Doing Signup', $scope.loginData);
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };
    $scope.openFilter = function () {
        //        $scope.closeLogin();
        $scope.filter();
    };
    //    --------------------END- FILTERS
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

.controller('NewArrivalsCtrl', function ($scope, $stateParams, MyServices, $ionicLoading) {

    allfunction.loading();
    $scope.pageno = 0;
    $scope.products = [];
    $scope.shownodata = false;
    $scope.keepscrolling = true;

    $scope.addMoreItems = function () {
        ++$scope.pageno;
        MyServices.getexclusiveandnewarrival($scope.pageno, 2, function (data, status) {
            if (data.queryresult.length == 0) {
                $scope.keepscrolling = false;
            }
            _.each(data.queryresult, function (n) {
                if (n.isfavid) {
                    n.fav = "fav";
                }
                $scope.products.push(n);
            });
            console.log($scope.products);
            if ($scope.products.length == 0) {
                $scope.shownodata = true;
            }
            $ionicLoading.hide();
        });
    }
    $scope.addMoreItems();
})

.controller('MyAccountCtrl', function ($scope, $stateParams) {})
    .controller('EditInfoCtrl', function ($scope, $ionicScrollDelegate, $stateParams) {
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
                $scope.disabled = true;
                $scope.saved = true;
                $ionicScrollDelegate.scrollTop();
            }
        }
    })

.controller('ContactUsCtrl', function ($scope, $stateParams) {})
    .controller('ProductCategoriesCtrl', function ($scope, $stateParams) {
        $scope.oneAtATime = true;
        $scope.category = [{
            title: "Cover & Cases",
            parent: 0,
            category: 0,
            submenu: [
                {
                    name: "Iphone Covers",
                    parent: 0,
                    category: 0
                },
                {
                    name: "Samsung Covers",
                    parent: 0,
                    category: 0
                },
                {
                    name: "Sony Covers",
                    parent: 0,
                    category: 0
                },
                {
                    name: "Yureka Covers",
                    parent: 0,
                    category: 0
                },
                {
                    name: "Micromax Covers",
                    parent: 0,
                    category: 0
                }
            ]
        }, {
            title: "Mobiles",
            parent: 0,
            category: 0,
            submenu: [

                {
                    name: "iPhone",
                    parent: 0,
                    category: 0
                },
                {
                    name: "Samsung",
                    parent: 0,
                    category: 0
                },
                {
                    name: "Sony",
                    parent: 0,
                    category: 0
                },
                {
                    name: "Yureka",
                    parent: 0,
                    category: 0
                },
                {
                    name: "Micromax",
                    parent: 0,
                    category: 0
                }
            ]
        }, {
            title: "Headphones",
            parent: 0,
            category: 0,
            submenu: [

                {
                    name: "Beats",
                    parent: 0,
                    category: 0
                },
                {
                    name: "Sony",
                    parent: 0,
                    category: 0
                },
                {
                    name: "JBL",
                    parent: 0,
                    category: 0
                }
            ]
        }, {
            title: "Accessories",
            parent: 0,
            category: 0,
            submenu: [

                {
                    name: "Tech Accesories",
                    parent: 0,
                    category: 0
                },
                {
                    name: "Bags",
                    parent: 0,
                    category: 0
                },
                {
                    name: "Belt",
                    parent: 0,
                    category: 0
                }
            ]
        }, {
            title: "Watches",
            parent: 0,
            category: 0,
            submenu: [

                {
                    name: "Analog",
                    parent: 0,
                    category: 0
                },
                {
                    name: "Chronograph",
                    parent: 0,
                    category: 0
                },
                {
                    name: "Digital",
                    parent: 0,
                    category: 0
                },
                {
                    name: "Watch Cases",
                    parent: 0,
                    category: 0
                }
            ]
        }, {
            title: "Laptops",
            parent: 0,
            category: 0,
            submenu: [

                {
                    name: "Lenevo",
                    parent: 0,
                    category: 0
                },
                {
                    name: "Dell",
                    parent: 0,
                    category: 0
                },
                {
                    name: "Samsung",
                    parent: 0,
                    category: 0
                },
                {
                    name: "Asus",
                    parent: 0,
                    category: 0
                },
                {
                    name: "Apple",
                    parent: 0,
                    category: 0
                }
            ]
        }];
    })
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
        $scope.openbilling = false;

        $scope.continue = function (ch) {
            if (ch === 'login') {
                $scope.openbilling = false;
                $scope.login();
            } else {
                $scope.openbilling = true;
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
    .controller('ProductCtrl', function ($scope, $stateParams, $timeout, $rootScope, MyServices) {
        $scope.addwishlist = false;
        $rootScope.transparent_header = false;
        $scope.params = $stateParams;

        $scope.addWishlist = function () {
            $scope.addwishlist = true;
            console.log($scope.addwishlist);
        };

        $scope.pageno = 0;
        $scope.keepscrolling = true;
        $scope.shownodata = false;
        $scope.brandid = $stateParams.brand;
        $scope.parent = $stateParams.parent;
        $scope.category = $stateParams.category;
        $scope.productsarr = [];
        var lastpage = 1;

        var getproductbybrandcallback = function (data, status) {
            console.log(data);
            if (data == 0) {
                $scope.keepscrolling = false;
            }
            _.each(data.queryresult, function (n) {
                if (n.isfavid) {
                    n.fav = "fav";
                }
                $scope.productsarr.push(n);
            });

            $scope.products = _.chunk($scope.productsarr, 2);
            console.log($scope.products);

            if ($scope.productsarr.length == 0) {
                $scope.shownodata = true;
            }
            lastpage = data.lastpage;
        }

        $scope.addMoreItems = function () {
            if (lastpage != $scope.pageno) {
                ++$scope.pageno;
                if ($stateParams.brand != 0) {
                    MyServices.getproductbybrand($stateParams.brand, $scope.pageno, getproductbybrandcallback);
                } else if ($scope.parent != 0 || $scope.category != 0) {
                    MyServices.getproductbycategory($scope.pageno, $scope.parent, $scope.category, getproductbybrandcallback);
                } else {
                    MyServices.getallproduct($scope.pageno, getproductbybrandcallback);
                }
            } else {
                $scope.keepscrolling = false;
            }
        }
        $scope.addMoreItems();
    })

.controller('ProductDetailCtrl', function ($scope, $stateParams, $rootScope, $ionicScrollDelegate, MyServices, $ionicLoading, $ionicSlideBoxDelegate, $ionicPopup, $timeout) {
    $rootScope.transparent_header = true;
    $scope.activate = true;
    $scope.tab = {
        left: true,
        right: false
    }
    var i = 0;
    $scope.pageScrolled = function () {
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

    MyServices.getproductdetails($stateParams.id, function (data, status, $filter) {
        console.log(data);
        $scope.product = data;
        if ($scope.product.product.user) {
            $scope.product.product.fav = "fav";
        }
        if (data.product.quantity >= 1) {
            $scope.availability = "In Stock";
        } else {
            $scope.availability = "Out of Stock";
        }
        $ionicSlideBoxDelegate.update();
        // $scope.product.product.quantity = 1;
    });

    var addtowishlistcallback = function (data, status) {
        console.log(data);
        if (data == "true") {
            $scope.product.product.fav = "fav";
            var xyz = $ionicPopup.show({
                title: 'Your product has been added to wishlist'
            });
            $timeout(function () {
                xyz.close();
            }, 3000)
        } else if (data == "0") {
            var xyz = $ionicPopup.show({
                title: 'Already added to wishlist !!'
            });
            $timeout(function () {
                xyz.close();
            }, 3000)
        } else {
            var xyz = $ionicPopup.show({
                title: 'Oops something went wrong !!'
            });
            $timeout(function () {
                xyz.close();
            }, 3000)
        }
    }

    $scope.addtowishlist = function (productid) {
        console.log(productid);
        if (MyServices.getuser()) {
            MyServices.addtowishlist(productid, addtowishlistcallback);
        } else {
            var xyz = $ionicPopup.show({
                title: 'Login for wishlist'
            });
            $timeout(function () {
                xyz.close();
            }, 3000)
        }
    }

    $scope.addtocart = function (product) {
        console.log(product);
        var selectedproduct = {};
        selectedproduct.product = product.id;
        selectedproduct.productname = product.name;
        selectedproduct.price = product.price;
        selectedproduct.quantity = product.quantity;
        MyServices.addtocart(selectedproduct, function (data) {
            console.log(data);
            var xyz = $ionicPopup.show({
                title: 'Added to cart'
            });
            $timeout(function () {
                xyz.close();
            }, 3000);
            // myfunction();
        });
    }

})

//dhaval start
.controller('BrandsCtrl', function ($scope, $stateParams, $rootScope, MyServices, $location, $ionicLoading) {
    $rootScope.nosearch = true;
    allfunction.loading();
    var lastpage = 1;
    $scope.pageno = 0;
    $scope.keepscrolling = true;
    $scope.shownodata = false;
    $scope.brandimages = [];

    $scope.addMoreItems = function () {
        console.log("load more brands");
        ++$scope.pageno;
        MyServices.getbrand($scope.pageno, function (data, status) {
            console.log(data);
            if (data.queryresult.length == 0) {
                $scope.keepscrolling = false;
            }
            _.each(data.queryresult, function (n) {
                $scope.brandimages.push(n);
            });
            if ($scope.brandimages.length == 0) {
                $scope.shownodata = true;
            }
            $scope.brands = _.chunk($scope.brandimages, 3);
            lastpage = data.lastpage;
            $ionicLoading.hide();
            $scope.$broadcast('scroll.infiniteScrollComplete');
            // $scope.$broadcast('scroll.refreshComplete');
        });
    }
    $scope.addMoreItems();

    $scope.getproductbybrand = function (id) {
        $location.url("app/product/" + 0 + "/" + 0 + "/" + id);
    }
})

//dhaval end

.controller('AboutCtrl', function ($scope, $ionicScrollDelegate, $stateParams) {
    $scope.activate = true;
    $scope.tab = {
        left: true,
        right: false
    }
    $scope.clickTab = function (side) {
        $ionicScrollDelegate.scrollTop(true);
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
        image: 'img/clientele/PoojaBhatt.jpeg',
        caption: 'assumenda ipsam minus '
    }, {
        image: 'img/clientele/YusufPathan.JPG',
        caption: 'sequi aliquam pariatur unde nihil '
    }];
});