app.service("bookingService", function ($http, apiConfig) {
  var API = apiConfig.bookings;

  this.bookCar = function (data) {
    return $http.post(API + "/create", data);
  };

  this.getMyBookings = function () {
    return $http.get(API + "/my");
  };

  this.getAllBookings = function () {
    return $http.get(API);
  };

  this.updateStatus = function (id, status) {
    return $http.put(API + "/" + id + "/status", { status: status });
  };
});
