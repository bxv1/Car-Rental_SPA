app.service("carService", function ($http, apiConfig) {
  var API = apiConfig.cars;

  this.getCars = function () {
    return $http.get(API);
  };

  this.addCar = function (car) {
    return $http.post(API + "/add", car);
  };

  this.updateCar = function (id, car) {
    return $http.put(API + "/" + id, car);
  };

  this.deleteCar = function (id) {
    return $http.delete(API + "/" + id);
  };
});
