app.controller("profileController", function ($scope, authService) {
  $scope.form = {};
  $scope.errorMessage = "";
  $scope.successMessage = "";
  $scope.loading = true;
  $scope.saving = false;

  function loadProfile() {
    $scope.loading = true;
    authService
      .getMyProfile()
      .then(function (res) {
        $scope.form.name = res.data.name;
        $scope.form.email = res.data.email;
        $scope.form.phone = res.data.phone;
      })
      .catch(function (err) {
        $scope.errorMessage = typeof err.data === "string" ? err.data : "Unable to load profile.";
      })
      .finally(function () {
        $scope.loading = false;
      });
  }

  $scope.saveProfile = function () {
    $scope.errorMessage = "";
    $scope.successMessage = "";

    if ($scope.form.newPassword && $scope.form.newPassword !== $scope.form.confirmPassword) {
      $scope.errorMessage = "New password and confirmation do not match.";
      return;
    }

    $scope.saving = true;

    authService
      .updateMyProfile({
        name: $scope.form.name,
        phone: $scope.form.phone,
        newPassword: $scope.form.newPassword,
      })
      .then(function () {
        authService.setUserName($scope.form.name);
        $scope.form.newPassword = "";
        $scope.form.confirmPassword = "";
        $scope.successMessage = "Profile updated successfully.";
      })
      .catch(function (err) {
        $scope.errorMessage = typeof err.data === "string" ? err.data : "Failed to update profile.";
      })
      .finally(function () {
        $scope.saving = false;
      });
  };

  loadProfile();
});
