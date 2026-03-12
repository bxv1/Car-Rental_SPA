var app = angular.module("carRentalApp", ["ngRoute"]);

app.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when("/login", {
      templateUrl: "views/login.html",
      controller: "loginController",
      authRequired: false,
      title: "Welcome Back",
      subtitle: "Sign in to manage rentals and bookings.",
    })
    .when("/signup", {
      templateUrl: "views/signup.html",
      controller: "signupController",
      authRequired: false,
      title: "Create Account",
      subtitle: "Join DriveNow and start your journey.",
    })
    .when("/dashboard", {
      templateUrl: "views/dashboard.html",
      controller: "dashboardController",
      authRequired: true,
      title: "Dashboard",
      subtitle: "Overview of your recent bookings and quick actions.",
    })
    .when("/cars", {
      templateUrl: "views/cars.html",
      controller: "carController",
      authRequired: true,
      title: "Browse Cars",
      subtitle: "Choose from modern, reliable cars for every trip.",
    })
    .when("/bookings", {
      templateUrl: "views/bookings.html",
      controller: "bookingController",
      authRequired: true,
      title: "My Bookings",
      subtitle: "Track all your reservations in one place.",
    })
    .when("/admin", {
      templateUrl: "views/admin.html",
      controller: "adminController",
      authRequired: true,
      role: "admin",
      title: "Admin Control",
      subtitle: "Manage cars and keep inventory up to date.",
    })
    .otherwise({
      redirectTo: "/login",
    });

  $httpProvider.interceptors.push("authInterceptor");
});

app.factory("authInterceptor", function ($q, $location, authService) {
  return {
    request: function (config) {
      var token = authService.getToken();
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = token;
      }
      return config;
    },
    responseError: function (rejection) {
      if (rejection.status === 401 || rejection.status === 403) {
        authService.clearSession();
        $location.path("/login");
      }
      return $q.reject(rejection);
    },
  };
});

app.run(function ($rootScope, $location, authService) {
  $rootScope.$on("$routeChangeStart", function (event, next) {
    if (!next) {
      return;
    }

    var isLoggedIn = authService.isLoggedIn();

    if (next.authRequired === false && isLoggedIn) {
      event.preventDefault();
      $location.path("/dashboard");
      return;
    }

    if (next.authRequired && !isLoggedIn) {
      event.preventDefault();
      $location.path("/login");
      return;
    }

    if (next.role === "admin" && !authService.isAdmin()) {
      event.preventDefault();
      $location.path("/dashboard");
    }
  });

  $rootScope.$on("$routeChangeSuccess", function (event, current) {
    $rootScope.pageTitle = current && current.$$route ? current.$$route.title : "Car Rental";
    $rootScope.pageSubtitle = current && current.$$route ? current.$$route.subtitle : "";
  });
});
