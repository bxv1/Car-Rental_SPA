app.service("bookingService",function($http){

const API = "http://localhost:5000/api/bookings";

this.bookCar = function(data){

return $http.post(API+"/create",data,{
headers:{
Authorization:localStorage.getItem("token")
}
});

};

this.getMyBookings = function(){

return $http.get(API+"/my",{
headers:{
Authorization:localStorage.getItem("token")
}
});

};

});