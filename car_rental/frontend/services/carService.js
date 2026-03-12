app.service("carService",function($http){

const API = "http://localhost:5000/api/cars";

this.getCars = function(){

return $http.get(API);

};

this.addCar = function(car){

return $http.post(API+"/add",car,{
headers:{
Authorization:localStorage.getItem("token")
}
});

};

this.deleteCar = function(id){

return $http.delete(API+"/"+id,{
headers:{
Authorization:localStorage.getItem("token")
}
});

};

});