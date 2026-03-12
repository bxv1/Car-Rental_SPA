app.controller("loginController", function ($scope, $location, authService) {
  $scope.user = {};
  $scope.errorMessage = "";
  $scope.loading = false;

  $scope.login = function () {
    $scope.errorMessage = "";
    $scope.loading = true;

    authService
      .login($scope.user)
      .then(function (res) {
        authService.setSession(res.data);
        $location.path("/dashboard");
      })
      .catch(function (err) {
        $scope.errorMessage =
          typeof err.data === "string" ? err.data : "Unable to login. Please try again.";
      })
      .finally(function () {
        $scope.loading = false;
      });
  };
});
