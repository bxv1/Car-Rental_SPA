app.service("userService", function ($http, apiConfig) {
  var API = apiConfig.users;

  this.getAllUsers = function () {
    return $http.get(API);
  };

  this.updateUser = function (id, payload) {
    return $http.put(API + "/" + id, payload);
  };

  this.deleteUser = function (id) {
    return $http.delete(API + "/" + id);
  };
});
