app.service("authService",function($http){

const API = "http://localhost:5000/api/auth";

this.signup = function(data){
return $http.post(API + "/signup",data);
};

this.login = function(data){
return $http.post(API + "/login",data);
};

this.saveToken = function(token){
localStorage.setItem("token",token);
};

this.getToken = function(){
return localStorage.getItem("token");
};

});