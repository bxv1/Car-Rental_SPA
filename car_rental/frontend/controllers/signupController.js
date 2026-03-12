app.controller("signupController", function ($scope, $location, authService) {
  $scope.user = {};
  $scope.errorMessage = "";
  $scope.successMessage = "";
  $scope.loading = false;

  $scope.signup = function () {
    $scope.errorMessage = "";
    $scope.successMessage = "";
    $scope.loading = true;

    authService
      .signup($scope.user)
      .then(function () {
        $scope.successMessage = "Account created successfully. Redirecting to login...";
        setTimeout(function () {
          $scope.$apply(function () {
            $location.path("/login");
          });
        }, 1200);
      })
      .catch(function (err) {
        $scope.errorMessage =
          typeof err.data === "string" ? err.data : "Signup failed. Please check your details.";
      })
      .finally(function () {
        $scope.loading = false;
      });
  };
});
