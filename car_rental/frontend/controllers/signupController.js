app.controller("signupController",
function($scope,$location,authService){

$scope.signup=function(){

authService.signup($scope.user)

.then(function(){

alert("Account created");

$location.path("/login");

});

};

});