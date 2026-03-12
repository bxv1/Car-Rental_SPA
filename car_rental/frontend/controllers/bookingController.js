app.controller("bookingController", function ($scope, bookingService) {
  $scope.bookings = [];
  $scope.errorMessage = "";

  bookingService
    .getMyBookings()
    .then(function (res) {
      $scope.bookings = res.data;
    })
    .catch(function () {
      $scope.errorMessage = "Unable to load bookings right now.";
    });
});
