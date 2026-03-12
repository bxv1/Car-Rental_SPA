app.service("carService", function ($http) {
  var API = "http://localhost:5000/api/cars";

  this.getCars = function () {
    return $http.get(API);
  };

  this.addCar = function (car) {
    return $http.post(API + "/add", car);
  };

  this.deleteCar = function (id) {
    return $http.delete(API + "/" + id);
  };
});
