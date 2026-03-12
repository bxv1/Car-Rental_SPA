app.controller("navController",
function($scope,$location){

$scope.isLoggedIn = function(){
return localStorage.getItem("token") !== null;
};

$scope.isAdmin = function(){
return localStorage.getItem("role") === "admin";
};

$scope.currentPath = function(){
return $location.path();
};

$scope.logout = function(){

localStorage.removeItem("token");
localStorage.removeItem("role");

$location.path("/login");
};

});