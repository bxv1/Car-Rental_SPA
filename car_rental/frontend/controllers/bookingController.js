app.controller("bookingController", function ($scope, bookingService) {
  $scope.bookings = [];
  $scope.errorMessage = "";
  $scope.loading = true;

  bookingService
    .getMyBookings()
    .then(function (res) {
      $scope.bookings = res.data;
    })
    .catch(function (err) {
      $scope.errorMessage = typeof err.data === "string" ? err.data : "Unable to load bookings.";
    })
    .finally(function () {
      $scope.loading = false;
    });
});
