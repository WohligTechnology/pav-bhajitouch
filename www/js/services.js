//var adminbase = "http://wohlig.co.in/accessbackend/";
var adminbase = "http://localhost/accessback/";
var adminurl = adminbase + "index.php/json/";
var adminhauth = adminbase + "index.php/hauth/";
var adminimage = adminbase + "uploads/";
var adminimage = "http://wohlig.co.in/accessbackend/uploads/";
//var adminimage = "http://localhost/accessback/uploads/";

angular.module('starter.services', [])

.factory('MyServices', function($http) {

    var coupondetails = $.jStorage.get("coupon");

    return {
        makeactive: function(menuname) {
            for (var i = 0; i < navigation.length; i++) {
                if (navigation[i].name == menuname) {
                    navigation[i].classis = "active";
                } else {
                    navigation[i].classis = "";
                }
            }
            return menuname;
        },
        registerUser: function(signup, callback) {
            return $http({
                url: adminurl + 'registeruser',
                method: "POST",
                data: signup
            }).success(callback);
        },
        login: function(login, callback) {
            return $http({
                url: adminurl + 'loginuser',
                method: "POST",
                data: login
            }).success(callback);
        },
        authenticate: function(callback) {
            return $http.get(adminurl + 'authenticate').success(callback);
        },
        logout: function(callback) {
            return $http.post(adminurl + 'logout', {
                withCredentials: true
            }).success(callback);
        },
        //dhaval start
        getbrand: function(pageno, callback) {
            return $http.get(adminurl + 'getbrand?maxrow=12&pageno=' + pageno, {}, {
                withCredentials: true
            }).success(callback);
        },
        getproductbybrand: function(id, pageno, callback) {
            return $http.get(adminurl + 'getproductbybrand?maxrow=10&pageno=' + pageno + '&brandid=' + id, {}, {
                withCredentials: true
            }).success(callback);
        },
        getproductbycategory: function(pageno, parent, category, callback) {
            console.log(category);
            return $http.get(adminurl + 'getproductbycategory?parent=' + parent + '&category=' + category + '&pageno=' + pageno, {}, {
                withCredentials: true
            }).success(callback);

        },
        getallproduct: function(pageno, callback) {
            return $http.get(adminurl + 'getallproducts?pageno=' + pageno, {}, {
                withCredentials: true
            }).success(callback);
        },
        getexclusiveandnewarrival: function(pageno, id, callback) {
            return $http.get(adminurl + 'getexclusiveandnewarrival?id=' + id + '&pageno=' + pageno, {}, {
                withCredentials: true
            }).success(callback);
        },
        getproductdetails: function(id, callback) {
            return $http.get(adminurl + 'getproductdetails?id=' + id, {}, {
                withCredentials: true
            }).success(callback);
        },
        addtowishlist: function(productid, callback) {
            return $http({
                url: adminurl + "addtowishlist",
                method: "POST",
                withCredentials: true,
                data: {
                    "user": $.jStorage.get("user").id,
                    "product": productid
                }
            }).success(callback);
        },
        addtocart: function(product, callback) {
            return $http.get(adminurl + 'addtocart?product=' + product.product + '&productname=' + product.productname + '&price=' + product.price + '&quantity=' + product.quantity, {}, {
                withCredentials: true
            }).success(callback);
        },
        gettotalcart: function(callback) {
            return $http.post(adminurl + 'totalitemcart', {}, {
                withCredentials: true
            }).success(callback);
        },
        totalcart: function(callback) {
            return $http.post(adminurl + 'totalcart', {}, {
                withCredentials: true
            }).success(callback);
        },
        getcoupondetails: function() {
            return coupondetails;
        },
        setcoupondetails: function(coupon) {
            $.jStorage.set("coupon", coupon);
            coupondetails = coupon;
        },
        getdiscountcoupon: function(couponcode) {
            return $http.post(adminurl + 'getdiscountcoupon?couponcode=' + couponcode, {}, {
                withCredentials: true
            });
        },
        getcart: function(callback) {
            return $http({
                url: adminurl + "showcart",
                method: "POST",
                withCredentials: true,
                data: {}
            }).success(callback);
        },
        deletecart: function(id, callback) {
            return $http.get(adminurl + 'deletecart?id=' + id, {}, {
                withCredentials: true
            }).success(callback);
        },
        getwishlistproduct: function(callback) {
            return $http({
                url: adminurl + "getwishlistproduct",
                method: "POST",
                withCredentials: true,
                data: {
                    "user": $.jStorage.get("user").id
                }
            }).success(callback);
        },
        removefromwishlist: function(productid, callback) {
            return $http({
                url: adminurl + "removefromwishlist",
                method: "POST",
                withCredentials: true,
                data: {
                    "user": $.jStorage.get("user").id,
                    "product": productid
                }
            }).success(callback);
        },
        getaboutus: function(callback) {
            return $http({
                url: adminurl + 'getaboutus',
                method: "POST"
            }).success(callback);
        },
        getofferdetails: function(callback) {
            return $http({
                url: adminurl + 'getofferdetails',
                method: "POST"
            }).success(callback);
        },
        search: function(search, callback) {
            return $http.get(adminurl + 'searchbyname?search=' + search, {}, {
                withCredentials: true
            }).success(callback);
        },
        //dhaval end
        forgotPassword: function(forgot, callback) {
            return $http({
                url: adminurl + 'forgotpassword',
                method: "POST",
                data: forgot
            }).success(callback);
        },
        setNotify: function(data) {
            $.jStorage.set("notify", data);
        },
        getNotify: function() {
            return $.jStorage.get("notify");
        },
        setuser: function(data) {
            $.jStorage.set("user", data);
        },
        getuser: function() {
            return $.jStorage.get("user");
        }
    };
});
