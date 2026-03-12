app.factory("apiConfig", function ($window) {
  var host = $window.location.hostname || "localhost";
  var protocol = $window.location.protocol || "http:";
  var apiRoot = protocol + "//" + host + ":5000/api";

  return {
    root: apiRoot,
    auth: apiRoot + "/auth",
    cars: apiRoot + "/cars",
    bookings: apiRoot + "/bookings",
    users: apiRoot + "/users",
  };
});
