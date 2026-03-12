app.service("authService", function ($http, apiConfig) {
  var API = apiConfig.auth;

  this.signup = function (data) {
    return $http.post(API + "/signup", data);
  };

  this.login = function (data) {
    return $http.post(API + "/login", data);
  };

  this.forgotPassword = function (data) {
    return $http.post(API + "/forgot-password", data);
  };

  this.getMyProfile = function () {
    return $http.get(API + "/me");
  };

  this.updateMyProfile = function (data) {
    return $http.put(API + "/me", data);
  };

  this.setSession = function (payload) {
    var cleanToken = (payload.token || "").replace(/^Bearer\s+/i, "");
    localStorage.setItem("token", cleanToken);
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

  this.setUserName = function (name) {
    localStorage.setItem("user_name", name || "User");
  };

  this.isLoggedIn = function () {
    return !!localStorage.getItem("token");
  };

  this.isAdmin = function () {
    return localStorage.getItem("role") === "admin";
  };
});
