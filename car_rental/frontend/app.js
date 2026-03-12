var app = angular.module("carRentalApp", ["ngRoute"]);

app.config(function ($routeProvider) {
  $routeProvider
    .when("/login", {
      templateUrl: "views/login.html",
      controller: "loginController",
      authRequired: false,
    })
    .when("/signup", {
      templateUrl: "views/signup.html",
      controller: "signupController",
      authRequired: false,
    })
    .when("/cars", {
      templateUrl: "views/cars.html",
      controller: "carController",
      authRequired: true,
    })
    .when("/dashboard", {
      templateUrl: "views/bookings.html",
      controller: "bookingController",
      authRequired: true,
    })
    .when("/admin", {
      templateUrl: "views/admin.html",
      controller: "adminController",
      authRequired: true,
      role: "admin",
    })
    .otherwise({
      redirectTo: "/login",
    });
});

app.run(function ($rootScope, $location) {
  $rootScope.$on("$routeChangeStart", function (event, next) {
    if (!next || next.authRequired === false) {
      return;
    }

    var token = localStorage.getItem("token");
    var role = localStorage.getItem("role");

    if (!token) {
      event.preventDefault();
      $location.path("/login");
      return;
    }

    if (next.role === "admin" && role !== "admin") {
      event.preventDefault();
      $location.path("/dashboard");
    }
  });
});
