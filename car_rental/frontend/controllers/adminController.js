app.controller("adminController", function ($scope, carService) {
  $scope.cars = [];
  $scope.car = {};
  $scope.successMessage = "";
  $scope.errorMessage = "";
  $scope.loadingCars = true;
  $scope.savingCar = false;

  function loadCars() {
    $scope.loadingCars = true;
    carService
      .getCars()
      .then(function (res) {
        $scope.cars = res.data;
      })
      .catch(function (err) {
        $scope.errorMessage = typeof err.data === "string" ? err.data : "Failed to load cars.";
      })
      .finally(function () {
        $scope.loadingCars = false;
      });
  }

  $scope.addCar = function () {
    $scope.successMessage = "";
    $scope.errorMessage = "";
    $scope.savingCar = true;

    carService
      .addCar($scope.car)
      .then(function () {
        $scope.successMessage = "Car added successfully.";
        $scope.car = {};
        loadCars();
      })
      .catch(function (err) {
        $scope.errorMessage = typeof err.data === "string" ? err.data : "Failed to add car.";
      })
      .finally(function () {
        $scope.savingCar = false;
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
      .catch(function (err) {
        $scope.errorMessage = typeof err.data === "string" ? err.data : "Failed to delete car.";
      });
  };

  loadCars();
});
