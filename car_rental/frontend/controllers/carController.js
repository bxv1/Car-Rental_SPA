app.controller("carController", function ($scope, carService, bookingService) {
  $scope.cars = [];
  $scope.bookingDates = {};
  $scope.errorMessage = "";
  $scope.successMessage = "";

  function getDayCount(pickupDate, returnDate) {
    var pickup = new Date(pickupDate);
    var dropoff = new Date(returnDate);
    var msPerDay = 24 * 60 * 60 * 1000;
    return Math.ceil((dropoff - pickup) / msPerDay) + 1;
  }

  function loadCars() {
    carService.getCars().then(function (res) {
      $scope.cars = res.data;
    });
  }

  $scope.book = function (car) {
    var selectedDates = $scope.bookingDates[car.id] || {};
    var pickup = selectedDates.pickup;
    var dropoff = selectedDates.return;

    $scope.errorMessage = "";
    $scope.successMessage = "";

    if (!pickup || !dropoff) {
      $scope.errorMessage = "Please choose both pickup and return dates.";
      return;
    }

    if (new Date(dropoff) < new Date(pickup)) {
      $scope.errorMessage = "Return date must be the same as or after pickup date.";
      return;
    }

    var days = getDayCount(pickup, dropoff);

    var booking = {
      car_id: car.id,
      pickup_date: pickup,
      return_date: dropoff,
      total_price: days * Number(car.price_per_day),
    };

    bookingService
      .bookCar(booking)
      .then(function () {
        $scope.successMessage = "Booking created successfully.";
        $scope.bookingDates[car.id] = {};
      })
      .catch(function () {
        $scope.errorMessage = "Could not create booking. Please try again.";
      });
  };

  loadCars();
});
