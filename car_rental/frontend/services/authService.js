app.service("authService", function ($http) {
  var API = "http://localhost:5000/api/auth";

  this.signup = function (data) {
    return $http.post(API + "/signup", data);
  };

  this.login = function (data) {
    return $http.post(API + "/login", data);
  };

  this.forgotPassword = function (data) {
    return $http.post(API + "/forgot-password", data);
  };

  this.setSession = function (payload) {
    localStorage.setItem("token", payload.token);
    localStorage.setItem("role", payload.user.role);
    localStorage.setItem("user_name", payload.user.name || "Guest");
  };

  this.clearSession = function () {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user_name");
  };

  this.getToken = function () {
    return localStorage.getItem("token");
  };

  this.getUserName = function () {
    return localStorage.getItem("user_name") || "User";
  };

  this.isLoggedIn = function () {
    return !!localStorage.getItem("token");
  };

  this.isAdmin = function () {
    return localStorage.getItem("role") === "admin";
  };
});
