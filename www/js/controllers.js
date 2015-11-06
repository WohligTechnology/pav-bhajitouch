var allfunction = {};
var myfunction = '';
angular.module('starter.controllers', ['ui.bootstrap'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $location, $ionicPopup, $rootScope, MyServices, $ionicLoading, $interval) {
    $rootScope.transparent_header = false;
    $scope.userSignup = {};
    $scope.loginData = {};
    $scope.forgot = {};
    $scope.searchbar = false;
    $scope.showlogin = true;

    if (MyServices.getuser()) {
        $scope.showlogin = false;
    }

    allfunction.msg = function(msg, title) {
        var myPopup = $ionicPopup.show({
            template: '<p class="text-center">' + msg + '!</p>',
            title: title,
            scope: $scope,
        });
        $timeout(function() {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 2500);
    };
    allfunction.loading = function() {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-positive"></ion-spinner>'
        });
        $timeout(function() {
            $ionicLoading.hide();
        }, 5000);
    };

    $scope.logout = function() {
        MyServices.logout(function(data) {
            console.log(data);
            if (data == 'true') {
                $.jStorage.flush();
                $scope.showlogin = true;
            }
        })
    }

    $scope.user = {
        cart: 1
    };
    myfunction = function() {
        MyServices.gettotalcart(function(data) {
            console.log("totalcart = " + data);
            $scope.user.cart = data;
        });
        MyServices.totalcart(function(data) {
            console.log("totalamount = " + data);
            $scope.amount = data;
        });
    }
    myfunction();

    $scope.search = function() {
        $scope.searchbar = $scope.searchbar === true ? false : true;
    };
    $scope.cartCheck = function() {
        console.log($scope.user.cart);
        if ($scope.user.cart == 0)
            $scope.showAlert();
        else
            $location.path('/app/cart');
    };
    $scope.showAlert = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Cart',
            template: 'There is nothing here. Keep shopping!'
        });
        alertPopup.then(function(res) {
            console.log('Thank you for not eating my delicious ice cream cone');
        });
    };
    //    -------------------LOGIN MODAL---------------------
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.closeLogin = function() {
        $scope.loginData = {};
        $scope.modal.hide();
    };
    $scope.login = function() {
        $scope.modal.show();
        $scope.closeSignup();
    };

    function authenticateUser() {
        MyServices.authenticate(function(data) {
            console.log(data);
            if (data != 'false') {
                $ionicLoading.hide();
                MyServices.setuser(data);
                $scope.closeLogin();
            }
        })
    }

    $scope.doLogin = function() {
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
            MyServices.login($scope.loginData, function(data) {
                console.log(data);
                if (data != "false") {
                    authenticateUser();
                } else {
                    $ionicLoading.hide();
                    allfunction.msg("Email & Password Did Not Match", 'Error!');
                }
            });
        } else {
            allfunction.msg("Fill all mandatory fields", "Error !");
        }
    };

    var checktwitter = function(data, status) {
        console.log(data);
        if (data != "false") {
            $interval.cancel(stopinterval);
            ref.close();
            authenticateUser();
        }
    };

    var callAtIntervaltwitter = function() {
        MyServices.authenticate(checktwitter);
    };

    $scope.facebooklogin = function() {
        ref = window.open(adminhauth + 'login/Facebook?returnurl=http://www.wohlig.com', '_blank', 'location=no');
        stopinterval = $interval(callAtIntervaltwitter, 2000);
        ref.addEventListener('exit', function(event) {
            authenticateUser();
            $interval.cancel(stopinterval);
        });
    }
    $scope.googlelogin = function() {
        ref = window.open(adminhauth + 'login/Google?returnurl=http://www.wohlig.com', '_blank', 'location=no');
        stopinterval = $interval(callAtIntervaltwitter, 2000);
        ref.addEventListener('exit', function(event) {
            authenticateUser();
            $interval.cancel(stopinterval);
        });
    }

    $scope.openSignup = function() {
        //        $scope.closeLogin();
        $scope.signup();
    };
    //    -------------------END- LOGIN MODAL----------------------

    //    --------------------SIGNUP MODAL-------------------------
    $ionicModal.fromTemplateUrl('templates/signup.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modalSignup = modal;
    });
    $scope.closeSignup = function() {
        $scope.userSignup = {};
        $scope.modalSignup.hide();
    };
    $scope.signup = function() {
        $scope.modalSignup.show();
        $scope.closeLogin();
    };
    $scope.doSignup = function() {
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
                MyServices.registerUser($scope.userSignup, function(data) {
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
    }).then(function(modal) {
        $scope.modalFrgt = modal;
    });
    $scope.closeFrgt = function() {
        $scope.modalFrgt.hide();
    };
    $scope.frgt = function() {
        $scope.modalFrgt.show();
    };
    $scope.doFrgt = function(emailforgot) {
        $scope.forgot = emailforgot;
        $scope.allvalidation = [{
            field: $scope.forgot.email,
            validation: ""
        }];
        var check = formvalidation($scope.allvalidation);
        if (check) {
            allfunction.loading();
            MyServices.forgotPassword($scope.forgot, function(data) {
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
    $scope.openFrgt = function() {
        $scope.frgt();
        $scope.closeLogin();
    };
    //    --------------------END- FORGOT PASSWORD
    //   ---------------------FILTERS
    $ionicModal.fromTemplateUrl('templates/filters.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modalFilter = modal;
    });
    $scope.closeFilter = function() {
        $scope.modalFilter.hide();
    };
    $scope.filter = function() {
        $scope.modalFilter.show();
    };
    $scope.doFilter = function() {
        console.log('Doing Signup', $scope.loginData);
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };
    $scope.openFilter = function() {
        //        $scope.closeLogin();
        $scope.filter();
    };
    //    --------------------END- FILTERS
})


.controller('HomeCtrl', function($scope) {
    $scope.slides = [{
        image: "img/slider/1.jpg",

    }, {
        image: "img/slider/2.jpg",

    }, {
        image: "img/slider/3.jpg",

    }];
})

.controller('DealsCtrl', function($scope, $stateParams, MyServices, $ionicLoading) {

    allfunction.loading();
    $scope.dealsimg = [];

    $scope.sliderclick = function(id) {
        MyServices.getofferproducts(id.id, function(data) {
            console.log(data);
            $scope.deals = [];
            $scope.deals[0] = data.offerdetails;
            $scope.deals[0].offerproducts = data.offerproducts;
            console.log($scope.deals);

        })
    }

    MyServices.getofferdetails(function(data, status) {
        console.log(data.offer[0]);
        $scope.deals = data.offer[0];

        $scope.slideoffer = [];
        _.each(data.offer[0], function(n) {
            _.each(n.offerproducts, function(m) {
                if (m.image1) {
                    $scope.slideoffer.push({
                        "id": n.id,
                        "img": m.image1
                    });
                }
            });

        });
        console.log($scope.slideoffer);

        $scope.pastdeals = data.pastoffer;
        $scope.pastdealproducts = data.pastofferproducts;
        $scope.upcomingoffer = data.upcomingoffer;
        $scope.upcomingofferproducts = data.upcomingofferproducts;
        console.log($scope.dealslide);
        _.each($scope.dealslide, function(n) {
            $scope.dealsimg.push(n.image);
        })
        $ionicLoading.hide();

    });

})

.controller('NewArrivalsCtrl', function($scope, $stateParams, MyServices, $ionicLoading) {

    allfunction.loading();
    $scope.pageno = 0;
    $scope.products = [];
    $scope.shownodata = false;
    $scope.keepscrolling = true;

    $scope.addMoreItems = function() {
        ++$scope.pageno;
        MyServices.getexclusiveandnewarrival($scope.pageno, 2, function(data, status) {
            if (data.queryresult.length == 0) {
                $scope.keepscrolling = false;
            }
            _.each(data.queryresult, function(n) {
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

.controller('MyAccountCtrl', function($scope, $stateParams) {})
    .controller('EditInfoCtrl', function($scope, $ionicScrollDelegate, $stateParams) {
        $scope.edit_save = "Edit information";
        $scope.disabled = true;
        $scope.saved = false;
        $scope.editSave = function() {
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

.controller('ContactUsCtrl', function($scope, $stateParams) {})

.controller('ProductCategoriesCtrl', function($scope, $stateParams, $location) {
    $scope.oneAtATime = true;
    $scope.category = [{
        title: "Cover & Cases",
        parent: 1,
        category: 0,
        submenu: [{
            name: "Apple",
            parent: 2,
            category: 0
        }]
    }, {
        title: "Earphones & Headphones",
        parent: 3,
        category: 0,
        submenu: [

            {
                name: "Wireless Headphones",
                parent: 4,
                category: 0
            }
        ]
    }, {
        title: "Speakers & Docks",
        parent: 5,
        category: 0,
        submenu: [

            {
                name: "Bluetooth",
                parent: 6,
                category: 0
            }
        ]
    }];

    $scope.getproductbycategory = function(parent, category) {
        $location.url("/app/product/" + parent + "/" + category + "/0");
    }

})

.controller('CartCtrl', function($scope, $stateParams, $location, $ionicHistory, MyServices) {
    $scope.goHome = function() {
        console.log($ionicHistory.viewHistory());
        $location.path('app/home');
    };

    $scope.gettotalcartfunction = function() {
        MyServices.totalcart(function(data) {
            $scope.totalcart = data;
        });
    }

    $scope.gettotalcartfunction();

    //check coupons
    $scope.discountamount = 0;

    function calcdiscountamount() {
        var data = MyServices.getcoupondetails();
        var subtotal = parseFloat($scope.totalcart);
        console.log(data);
        if (data.coupontype == '1') {
            if (data.discountpercent != '0') {
                console.log("ABC");
                $scope.ispercent = parseFloat(data.discountpercent);
                $scope.discountamount = (subtotal * $scope.ispercent / 100);
            } else {
                $scope.isamount = parseFloat(data.discountamount);
                console.log("ABCD");
                $scope.discountamount = $scope.isamount;
            }
        }
        if (data.coupontype == '2') {
            console.log($scope.cart);

            var totallength = 0;
            _.each($scope.cart, function(cart) {
                totallength += parseInt(cart.qty);
            });
            var xproducts = parseInt(data.xproducts);
            var yproducts = parseInt(data.yproducts);
            var itter = Math.floor(totallength / xproducts) * yproducts;
            console.log("ITTER " + itter);
            var newcart = _.sortBy($scope.cart, function(cart) {
                cart.price = parseFloat(cart.price);
                cart.qty2 = parseInt(cart.qty);
                return parseFloat(cart.price);
            });
            //newcart=_.each(newcart, function(cart){  cart.price=parseFloat(cart.price);cart.qty=parseFloat(cart.qty); });
            console.log(newcart);
            $scope.discountamount = 0;
            for (var i = 0; i < itter; i++) {
                if (newcart[i].qty2 != 0) {
                    newcart[i].qty2--;
                    $scope.discountamount += newcart[i].price;
                }

            }
        }
        if (data.coupontype == '4') {
            console.log("FREE DELIVERY APPLIED");
            $scope.isfreedelivery = "Free Delivery";
            $scope.discountamount = 0;
        }
        $.jStorage.set("discountamount", $scope.discountamount);
    };

    $scope.tocheckout = function() {
        $.jStorage.set("discountamount", $scope.discountamount);
        $location.url("/checkout");
    }

    var coupondetails = {};
    $scope.ispercent = 0;
    $scope.isamount = 0;
    $scope.isfreedelivery = 0;
    $scope.discountamount = 0;
    var couponsuccess = function(data, status) {
        if (data == 'false') {
            $scope.validcouponcode = 0;
        } else {
            console.log("Show it");
            $scope.validcouponcode = 1;

            MyServices.setcoupondetails(data);
            calcdiscountamount();

        }
    }

    $scope.checkcoupon = function(couponcode) {
        console.log(couponcode);
        MyServices.getdiscountcoupon(couponcode).success(couponsuccess);
    };

    //discrount coupons

    // add and subtract from cart
    var cartt = function(data, status) {
        console.log(data);
        $scope.gettotalcartfunction();
        $scope.getcartfunction();
        myfunction();
    };

    $scope.changeqty = function(mycart, option) {
        if (option == '+') {
            ++mycart.qty;
        } else {
            if (mycart.qty > 1)
                --mycart.qty;
        }
        var selectedproduct = {};
        selectedproduct.product = mycart.id;
        selectedproduct.productname = mycart.options.realname;
        selectedproduct.price = mycart.price;
        selectedproduct.quantity = mycart.qty;
        MyServices.addtocart(selectedproduct, cartt);
    };

    //add and subtract from cart

    $scope.getcartfunction = function() {
        MyServices.getcart(function(data) {
            console.log(data);
            $scope.cart = data;
            if (data == '') {
                $scope.nodatafound = true;
                $scope.nodata = "No Data found.";
            } else {
                $scope.nodatafound = false;
            }
        });
    }

    $scope.getcartfunction();

    //delete cart
    $scope.deletecart = function(cart) {
        console.log(cart);
        MyServices.deletecart(cart.id, function(data) {
            console.log(data);
            $scope.getcartfunction();
            $scope.gettotalcartfunction();
            myfunction();
        });
    }

})

.controller('CheckoutCtrl', function($scope, $stateParams) {
        $scope.different_address = false;
        $scope.address_select = "Ship to different address";
        $scope.toggleAddress = function() {
            if ($scope.different_address === false) {
                $scope.different_address = true;
                $scope.address_select = "Ship to same address";
            } else {
                $scope.different_address = false;
                $scope.address_select = "Ship to different address";
            }
        };
        $scope.openbilling = false;

        $scope.continue = function(ch) {
            if (ch === 'login') {
                $scope.openbilling = false;
                $scope.login();
            } else {
                $scope.openbilling = true;
            }
        };
    })
    .controller('MyOrdersCtrl', function($scope, $stateParams, $location, $ionicHistory) {

    })

.controller('MyWishlistCtrl', function($scope, $stateParams, $location, $ionicHistory, MyServices, $ionicLoading) {

    allfunction.loading();

    $scope.showLoginToContinue = false;
    $scope.shownodata = false;

    $scope.getproductdetails = function(productid) {
        console.log(productid);
        $location.url("/app/productdetail/" + productid);
    }

    var getwishlistproductcallback = function(data, status) {
        $scope.products = data.queryresult;
        if (data.queryresult.length == 0) {
            $scope.shownodata = true;
        }
        $ionicLoading.hide();
    }
    if (MyServices.getuser()) {
        MyServices.getwishlistproduct(getwishlistproductcallback);
    } else {
        $scope.showLoginToContinue = true;
        $ionicLoading.hide();
    }

    // DELETE PRODUCT FROM WISHLIST
    $scope.removefromwishlist = function(productid) {
        allfunction.loading();
        console.log(productid);
        MyServices.removefromwishlist(productid, function(data, status) {
            console.log(data);
            if (data == 1) {
                MyServices.getwishlistproduct(getwishlistproductcallback);
            }
        });
    }

})

.controller('DistributionCtrl', function($scope, $stateParams, MyServices, $ionicLoading, $location) {

    allfunction.loading();

    $scope.shownodata = false;

    MyServices.getbrand(1, function(data, status) {
        if (data.queryresult.length == 0) {
            $scope.shownodata = true;
        }
        $scope.distributer = data.queryresult;
        $scope.distributer = _.chunk($scope.distributer, 3);
        console.log($scope.distributer);
        $ionicLoading.hide();
    });

    $scope.getproductbybrand = function(id) {
        $location.url("app/product/" + 0 + "/" + 0 + "/" + id);
    }

})

.controller('ProductCtrl', function($scope, $stateParams, $timeout, $rootScope, MyServices, $ionicLoading) {
    $scope.addwishlist = false;
    $rootScope.transparent_header = false;
    $scope.params = $stateParams;
    allfunction.loading();

    $scope.addWishlist = function() {
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

    var getproductbybrandcallback = function(data, status) {
        console.log(data);
        if (data.queryresult.length == 0) {
            $scope.keepscrolling = false;
        }
        _.each(data.queryresult, function(n) {
            if (n.isfavid) {
                n.fav = "fav";
            }
            $scope.productsarr.push(n);
        });

        $scope.products = _.chunk(_.uniq($scope.productsarr), 2);
        console.log($scope.products);

        if (data.queryresult.length == 0 && $scope.productsarr.length == 0) {
            $scope.shownodata = true;
        }
        $ionicLoading.hide();
    }

    $scope.addMoreItems = function() {
        ++$scope.pageno;
        if ($stateParams.brand != 0) {
            MyServices.getproductbybrand($stateParams.brand, $scope.pageno, getproductbybrandcallback);
        } else if ($scope.parent != 0 || $scope.category != 0) {
            MyServices.getproductbycategory($scope.pageno, $scope.parent, $scope.category, getproductbybrandcallback);
        } else {
            MyServices.getallproduct($scope.pageno, getproductbybrandcallback);
        }
    }

    $scope.addMoreItems();

})

.controller('ProductDetailCtrl', function($scope, $stateParams, $rootScope, $ionicScrollDelegate, MyServices, $ionicLoading, $ionicSlideBoxDelegate, $ionicPopup, $timeout) {
    $rootScope.transparent_header = true;
    allfunction.loading();
    $scope.activate = true;
    $scope.tab = {
        left: true,
        right: false
    }
    var i = 0;
    $scope.pageScrolled = function() {
        if ($ionicScrollDelegate.getScrollPosition().top > 240) {
            $rootScope.transparent_header = false;
            $scope.$apply();
        } else {
            $rootScope.transparent_header = true;
            $scope.$apply();
        }
    };
    $scope.clickTab = function(side) {
        if (side === "left") {
            $scope.tab.left = true;
            $scope.tab.right = false;
        } else {
            $scope.tab.right = true;
            $scope.tab.left = false;
        }
    };

    MyServices.getproductdetails($stateParams.id, function(data, status, $filter) {
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
        $ionicLoading.hide();
        // $scope.product.product.quantity = 1;
    });

    var addtowishlistcallback = function(data, status) {
        console.log(data);
        if (data == "true") {
            $scope.product.product.fav = "fav";
            var xyz = $ionicPopup.show({
                title: 'Your product has been added to wishlist'
            });
            $timeout(function() {
                xyz.close();
            }, 3000)
        } else if (data == "0") {
            var xyz = $ionicPopup.show({
                title: 'Already added to wishlist !!'
            });
            $timeout(function() {
                xyz.close();
            }, 3000)
        } else {
            var xyz = $ionicPopup.show({
                title: 'Oops something went wrong !!'
            });
            $timeout(function() {
                xyz.close();
            }, 3000)
        }
        $ionicLoading.hide();
    }

    $scope.addtowishlist = function(productid) {
        console.log(productid);
        if (MyServices.getuser()) {
            allfunction.loading();
            MyServices.addtowishlist(productid, addtowishlistcallback);
        } else {
            var xyz = $ionicPopup.show({
                title: 'Login for wishlist'
            });
            $timeout(function() {
                xyz.close();
            }, 3000)
        }
    }

    $scope.addtocart = function(product) {
        allfunction.loading();
        console.log(product);
        var selectedproduct = {};
        selectedproduct.product = product.id;
        selectedproduct.productname = product.name;
        selectedproduct.price = product.price;
        selectedproduct.quantity = product.quantity;
        MyServices.addtocart(selectedproduct, function(data) {
            console.log(data);
            var xyz = $ionicPopup.show({
                title: 'Added to cart'
            });
            $timeout(function() {
                xyz.close();
            }, 3000);
            myfunction();
            $ionicLoading.hide();
        });
    }

})

//dhaval start
.controller('BrandsCtrl', function($scope, $stateParams, $rootScope, MyServices, $location, $ionicLoading) {
    $rootScope.nosearch = true;
    allfunction.loading();
    var lastpage = 1;
    $scope.pageno = 0;
    $scope.keepscrolling = true;
    $scope.shownodata = false;
    $scope.brandimages = [];

    $scope.addMoreItems = function() {
        console.log("load more brands");
        ++$scope.pageno;
        MyServices.getbrand($scope.pageno, function(data, status) {
            console.log(data);
            if (data.queryresult.length == 0) {
                $scope.keepscrolling = false;
            }
            _.each(data.queryresult, function(n) {
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

    $scope.getproductbybrand = function(id) {
        $location.url("app/product/" + 0 + "/" + 0 + "/" + id);
    }
})

//dhaval end

.controller('AboutCtrl', function($scope, $ionicScrollDelegate, $stateParams, MyServices, $ionicLoading) {
    $scope.activate = true;
    $scope.tab = {
        left: true,
        right: false
    }
    $scope.clickTab = function(side) {
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

    allfunction.loading();

    MyServices.getaboutus(function(data, status) {
        console.log(data);
        $scope.celebimages = data.queryresult;
        $ionicLoading.hide();
    });

})

.controller('SearchresultCtrl', function($scope, $ionicScrollDelegate, $stateParams, MyServices, $ionicLoading) {

    $scope.searchfor = '';
    $scope.showSearchForSomething = true;
    $scope.shownodata = false;

    $scope.getSearchResults = function() {
        if ($scope.searchfor != "") {
            allfunction.loading();
            MyServices.search($scope.searchfor, function(data) {
                console.log(data);
                if (data.length == 0) {
                    $scope.products = [];
                    $scope.shownodata = true;
                } else {
                    $scope.products = data;
                    $scope.products = _.chunk($scope.products, 2);
                    $scope.showSearchForSomething = false;
                }
                $ionicLoading.hide();
            });
        } else {
            $scope.products = [];
            $scope.showSearchForSomething = true;
            $scope.shownodata = false;
        }
    }

});
