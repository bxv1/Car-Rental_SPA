app.controller("loginController", function ($scope, $location, authService) {
  $scope.errorMessage = "";

  $scope.login = function () {
    $scope.errorMessage = "";

    authService
      .login($scope.user)
      .then(function (res) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.user.role);
        $location.path("/dashboard");
      })
      .catch(function () {
        $scope.errorMessage = "Invalid email or password.";
      });
  };
});
