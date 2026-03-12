app.controller("forgotPasswordController", function ($scope, $location, authService) {
  $scope.form = {};
  $scope.errorMessage = "";
  $scope.successMessage = "";
  $scope.loading = false;

  $scope.resetPassword = function () {
    $scope.errorMessage = "";
    $scope.successMessage = "";

    if ($scope.form.newPassword !== $scope.form.confirmPassword) {
      $scope.errorMessage = "Passwords do not match.";
      return;
    }

    $scope.loading = true;

    authService
      .forgotPassword({
        email: $scope.form.email,
        newPassword: $scope.form.newPassword,
      })
      .then(function () {
        $scope.successMessage = "Password updated. Redirecting to login...";
        setTimeout(function () {
          $scope.$apply(function () {
            $location.path("/login");
          });
        }, 1200);
      })
      .catch(function (err) {
        $scope.errorMessage =
          typeof err.data === "string" ? err.data : "Unable to reset password.";
      })
      .finally(function () {
        $scope.loading = false;
      });
  };
});
