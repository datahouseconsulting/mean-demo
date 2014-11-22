// angularjs initialization of the main module to be the app
var doeApp = angular.module('doeApp', ['ngResource', 'ngRoute', 'ngCookies', 'datatables']);

// setup route mapping used throughout the app
doeApp.config(function ($routeProvider) {

  // Here is where we setup which location uri will serve which page, and also which controllers to associate with which page
  $routeProvider.
    when('/login', {                                    controller: LoginController,         templateUrl: 'features/login/login.html' }).
    when('/home', {                                     controller: HomeController,          templateUrl: 'features/home/home.html' }).
    when('/application', {                              controller: ApplicationController,   templateUrl: 'features/application/application.html' }).
    // default location is home
    otherwise({ redirectTo: '/home' });

});



