app.controller("loginController",
function($scope,$location,authService){

$scope.login=function(){

authService.login($scope.user)
.then(function(res){

localStorage.setItem("token",res.data.token);
localStorage.setItem("role",res.data.user.role);

$location.path("/dashboard");

})
.catch(function(){
alert("Invalid credentials");
});

};

});