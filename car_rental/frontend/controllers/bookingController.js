app.controller("bookingController",
function($scope,bookingService){

$scope.bookings=[];

bookingService.getMyBookings()

.then(function(res){

$scope.bookings = res.data;

});

});