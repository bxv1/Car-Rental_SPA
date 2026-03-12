var app = angular.module("carRentalApp",["ngRoute"]);

app.config(function($routeProvider){

$routeProvider

.when("/login",{
templateUrl:"views/login.html",
controller:"loginController"
})

.when("/signup",{
templateUrl:"views/signup.html",
controller:"signupController"
})

.when("/cars",{
templateUrl:"views/cars.html",
controller:"carController"
})

.when("/dashboard",{
templateUrl:"views/dashboard.html",
controller:"bookingController"
})

.when("/admin",{
templateUrl:"views/admin.html",
controller:"adminController"
})

.otherwise({
redirectTo:"/login"
});

});

app.run(function($rootScope,$location){

$rootScope.$on("$routeChangeStart",function(event,next){

const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

if(!token){
$location.path("/login");
return;
}

if(next.originalPath === "/admin" && role !== "admin"){
$location.path("/dashboard");
}

});

});