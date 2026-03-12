app.controller("adminController", function ($scope, carService) {
  $scope.cars = [];
  $scope.car = {};
  $scope.successMessage = "";
  $scope.errorMessage = "";

  function loadCars() {
    carService.getCars().then(function (res) {
      $scope.cars = res.data;
    });
  }

  $scope.addCar = function () {
    $scope.successMessage = "";
    $scope.errorMessage = "";

    carService
      .addCar($scope.car)
      .then(function () {
        $scope.successMessage = "Car added successfully.";
        $scope.car = {};
        loadCars();
      })
      .catch(function () {
        $scope.errorMessage = "Failed to add car. Check your input and try again.";
      });
  };

  $scope.deleteCar = function (id) {
    $scope.successMessage = "";
    $scope.errorMessage = "";

    carService
      .deleteCar(id)
      .then(function () {
        $scope.successMessage = "Car deleted successfully.";
        $scope.cars = $scope.cars.filter(function (car) {
          return car.id !== id;
        });
      })
      .catch(function () {
        $scope.errorMessage = "Failed to delete car.";
      });
  };

  loadCars();
});
