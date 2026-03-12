app.service("bookingService", function ($http) {
  var API = "http://localhost:5000/api/bookings";

  this.bookCar = function (data) {
    return $http.post(API + "/create", data);
  };

  this.getMyBookings = function () {
    return $http.get(API + "/my");
  };
});
