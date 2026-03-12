app.controller("carController",
function($scope,carService,bookingService){

$scope.cars=[];

carService.getCars()
.then(function(res){

$scope.cars = res.data;

});

$scope.book=function(car){

const booking={
car_id:car.id,
pickup_date:$scope.pickup,
return_date:$scope.return,
total_price:car.price_per_day
};

bookingService.bookCar(booking)

.then(function(){

alert("Booking created");

});

};

});