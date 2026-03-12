app.controller("adminController",
function($scope,carService){

$scope.cars=[];

carService.getCars()

.then(function(res){

$scope.cars = res.data;

});

$scope.addCar=function(){

carService.addCar($scope.car)

.then(function(){

alert("Car added");

});

};

$scope.deleteCar=function(id){

carService.deleteCar(id)

.then(function(){

location.reload();

});

};

});