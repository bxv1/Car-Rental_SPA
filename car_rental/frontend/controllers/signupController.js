app.controller("signupController", function ($scope, $location, authService) {
  $scope.errorMessage = "";
  $scope.successMessage = "";

  $scope.signup = function () {
    $scope.errorMessage = "";
    $scope.successMessage = "";

    authService
      .signup($scope.user)
      .then(function () {
        $scope.successMessage = "Account created. Redirecting to login...";
        setTimeout(function () {
          $scope.$apply(function () {
            $location.path("/login");
          });
        }, 1000);
      })
      .catch(function () {
        $scope.errorMessage = "Signup failed. Please verify your data.";
      });
  };
});
