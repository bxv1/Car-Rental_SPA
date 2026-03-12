app.controller("dashboardController", function ($scope, bookingService, authService) {
  $scope.loading = true;
  $scope.errorMessage = "";
  $scope.recentBookings = [];
  $scope.stats = {
    total: 0,
    pending: 0,
    approved: 0,
    cancelled: 0,
  };
  $scope.userName = authService.getUserName();

  bookingService
    .getMyBookings()
    .then(function (res) {
      var bookings = res.data || [];
      $scope.recentBookings = bookings.slice(0, 5);
      $scope.stats.total = bookings.length;
      $scope.stats.pending = bookings.filter(function (b) {
        return b.status === "pending";
      }).length;
      $scope.stats.approved = bookings.filter(function (b) {
        return b.status === "approved";
      }).length;
      $scope.stats.cancelled = bookings.filter(function (b) {
        return b.status === "cancelled";
      }).length;
    })
    .catch(function (err) {
      $scope.errorMessage =
        typeof err.data === "string" ? err.data : "Unable to load dashboard data right now.";
    })
    .finally(function () {
      $scope.loading = false;
    });
});
