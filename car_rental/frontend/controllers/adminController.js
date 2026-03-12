app.controller("adminController", function ($scope, carService, bookingService, userService) {
  $scope.cars = [];
  $scope.bookings = [];
  $scope.users = [];

  $scope.car = {};
  $scope.editingCarId = null;

  $scope.editingUserId = null;

  $scope.successMessage = "";
  $scope.errorMessage = "";

  $scope.loadingCars = true;
  $scope.loadingBookings = true;
  $scope.loadingUsers = true;
  $scope.savingCar = false;

  function notifySuccess(message) {
    $scope.errorMessage = "";
    $scope.successMessage = message;
  }

  function notifyError(err, fallback) {
    $scope.successMessage = "";
    $scope.errorMessage = typeof err.data === "string" ? err.data : fallback;
  }

  function loadCars() {
    $scope.loadingCars = true;
    carService
      .getCars()
      .then(function (res) {
        $scope.cars = res.data;
      })
      .catch(function (err) {
        notifyError(err, "Failed to load cars.");
      })
      .finally(function () {
        $scope.loadingCars = false;
      });
  }

  function loadBookings() {
    $scope.loadingBookings = true;
    bookingService
      .getAllBookings()
      .then(function (res) {
        $scope.bookings = res.data;
      })
      .catch(function (err) {
        notifyError(err, "Failed to load bookings.");
      })
      .finally(function () {
        $scope.loadingBookings = false;
      });
  }

  function loadUsers() {
    $scope.loadingUsers = true;
    userService
      .getAllUsers()
      .then(function (res) {
        $scope.users = res.data;
      })
      .catch(function (err) {
        notifyError(err, "Failed to load users.");
      })
      .finally(function () {
        $scope.loadingUsers = false;
      });
  }

  $scope.addCar = function () {
    $scope.savingCar = true;
    carService
      .addCar($scope.car)
      .then(function () {
        notifySuccess("Car added successfully.");
        $scope.car = {};
        loadCars();
      })
      .catch(function (err) {
        notifyError(err, "Failed to add car.");
      })
      .finally(function () {
        $scope.savingCar = false;
      });
  };

  $scope.startEditCar = function (car) {
    $scope.editingCarId = car.id;
    car.editDraft = {
      brand: car.brand,
      model: car.model,
      year: car.year,
      price: car.price_per_day,
      image: car.image,
      description: car.description,
      status: car.status,
    };
  };

  $scope.cancelEditCar = function () {
    $scope.editingCarId = null;
  };

  $scope.saveCar = function (car) {
    carService
      .updateCar(car.id, car.editDraft)
      .then(function () {
        notifySuccess("Car updated successfully.");
        $scope.editingCarId = null;
        loadCars();
      })
      .catch(function (err) {
        notifyError(err, "Failed to update car.");
      });
  };

  $scope.deleteCar = function (id) {
    carService
      .deleteCar(id)
      .then(function () {
        notifySuccess("Car deleted successfully.");
        $scope.cars = $scope.cars.filter(function (car) {
          return car.id !== id;
        });
      })
      .catch(function (err) {
        notifyError(err, "Failed to delete car.");
      });
  };

  $scope.changeBookingStatus = function (booking) {
    bookingService
      .updateStatus(booking.id, booking.status)
      .then(function () {
        notifySuccess("Booking status updated.");
      })
      .catch(function (err) {
        notifyError(err, "Failed to update booking status.");
      });
  };

  $scope.startEditUser = function (user) {
    $scope.editingUserId = user.id;
    user.editDraft = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      newPassword: "",
    };
  };

  $scope.cancelEditUser = function () {
    $scope.editingUserId = null;
  };

  $scope.saveUser = function (user) {
    userService
      .updateUser(user.id, user.editDraft)
      .then(function () {
        notifySuccess("User account updated.");
        $scope.editingUserId = null;
        loadUsers();
      })
      .catch(function (err) {
        notifyError(err, "Failed to update user.");
      });
  };

  $scope.deleteUser = function (id) {
    userService
      .deleteUser(id)
      .then(function () {
        notifySuccess("User deleted.");
        $scope.users = $scope.users.filter(function (user) {
          return user.id !== id;
        });
      })
      .catch(function (err) {
        notifyError(err, "Failed to delete user.");
      });
  };

  loadCars();
  loadBookings();
  loadUsers();
});
