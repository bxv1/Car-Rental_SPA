app.controller("homeController", function ($scope) {
  $scope.highlights = [
    {
      title: "Best Value Pricing",
      text: "Transparent daily prices with no hidden fees. Choose plans that fit your trip and your budget.",
      icon: "bi-cash-coin",
    },
    {
      title: "Fast Booking Experience",
      text: "Reserve your car in minutes with an easy and mobile-friendly booking flow.",
      icon: "bi-lightning-charge",
    },
    {
      title: "Reliable Support",
      text: "Our team is ready to help with booking updates, account support, and trip guidance.",
      icon: "bi-headset",
    },
  ];
});
