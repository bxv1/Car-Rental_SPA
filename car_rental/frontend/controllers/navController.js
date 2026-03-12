app.controller("navController", function ($scope, $location, authService) {
  $scope.navLinks = [
    { path: "/dashboard", label: "Dashboard", icon: "bi-speedometer2", adminOnly: false },
    { path: "/cars", label: "Cars", icon: "bi-car-front-fill", adminOnly: false },
    { path: "/bookings", label: "Bookings", icon: "bi-calendar-check", adminOnly: false },
    { path: "/profile", label: "Profile", icon: "bi-person-gear", adminOnly: false },
    { path: "/admin", label: "Admin", icon: "bi-shield-lock", adminOnly: true },
  ];

  $scope.isLoggedIn = function () {
    return authService.isLoggedIn();
  };

  $scope.isAdmin = function () {
    return authService.isAdmin();
  };

  $scope.currentPath = function () {
    return $location.path();
  };

  $scope.getUserName = function () {
    return authService.getUserName();
  };

  $scope.showNavItem = function (link) {
    if (link.adminOnly && !$scope.isAdmin()) {
      return false;
    }
    return $scope.currentPath() !== link.path;
  };

  $scope.logout = function () {
    authService.clearSession();
    $location.path("/login");
  };
});
