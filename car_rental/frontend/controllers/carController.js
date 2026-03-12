app.controller("carController", function ($scope, carService, bookingService) {
  $scope.cars = [];
  $scope.filteredCars = [];
  $scope.bookingDates = {};
  $scope.errorMessage = "";
  $scope.successMessage = "";
  $scope.loading = true;

  $scope.filters = {
    query: "",
    minPrice: null,
    maxPrice: null,
    onlyAvailable: false,
    sortBy: "recommended",
  };

  function getDayCount(pickupDate, returnDate) {
    var pickup = new Date(pickupDate);
    var dropoff = new Date(returnDate);
    var msPerDay = 24 * 60 * 60 * 1000;
    return Math.ceil((dropoff - pickup) / msPerDay) + 1;
  }

  function matchesQuery(car, query) {
    if (!query) {
      return true;
    }

    var normalized = query.toLowerCase();
    var haystack = [car.brand, car.model, car.description, car.year]
      .join(" ")
      .toLowerCase();

    return haystack.indexOf(normalized) !== -1;
  }

  function sortCars(list, sortBy) {
    var cars = list.slice();

    if (sortBy === "price-low") {
      return cars.sort(function (a, b) {
        return Number(a.price_per_day) - Number(b.price_per_day);
      });
    }

    if (sortBy === "price-high") {
      return cars.sort(function (a, b) {
        return Number(b.price_per_day) - Number(a.price_per_day);
      });
    }

    if (sortBy === "year-new") {
      return cars.sort(function (a, b) {
        return Number(b.year) - Number(a.year);
      });
    }

    return cars;
  }

  $scope.applyFilters = function () {
    var query = ($scope.filters.query || "").trim();
    var min = Number($scope.filters.minPrice || 0);
    var max = Number($scope.filters.maxPrice || 0);

    var list = $scope.cars.filter(function (car) {
      var price = Number(car.price_per_day);
      var status = (car.status || "").toLowerCase();

      if (!matchesQuery(car, query)) {
        return false;
      }

      if ($scope.filters.onlyAvailable && status && status !== "available") {
        return false;
      }

      if ($scope.filters.minPrice !== null && $scope.filters.minPrice !== "" && price < min) {
        return false;
      }

      if ($scope.filters.maxPrice !== null && $scope.filters.maxPrice !== "" && price > max) {
        return false;
      }

      return true;
    });

    $scope.filteredCars = sortCars(list, $scope.filters.sortBy);
  };

  $scope.clearFilters = function () {
    $scope.filters = {
      query: "",
      minPrice: null,
      maxPrice: null,
      onlyAvailable: false,
      sortBy: "recommended",
    };

    $scope.applyFilters();
  };

  function loadCars() {
    $scope.loading = true;
    carService
      .getCars()
      .then(function (res) {
        $scope.cars = res.data;
        $scope.cars.forEach(function (car) {
          if (!$scope.bookingDates[car.id]) {
            $scope.bookingDates[car.id] = { pickup: "", return: "" };
          }
        });
        $scope.applyFilters();
      })
      .catch(function (err) {
        $scope.errorMessage =
          typeof err.data === "string" ? err.data : "Unable to load cars right now.";
      })
      .finally(function () {
        $scope.loading = false;
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
        $scope.bookingDates[car.id] = { pickup: "", return: "" };
      })
      .catch(function (err) {
        $scope.errorMessage = typeof err.data === "string" ? err.data : "Could not create booking.";
      });
  };

  loadCars();
});
