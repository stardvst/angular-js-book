'use strict';

/**
 * @ngdoc overview
 * @name 3DevelopingInAngularJsApp
 * @description
 * # 3DevelopingInAngularJsApp
 *
 * Main module of the application.
 */
angular
  .module('3DevelopingInAngularJsApp', ['ngAnimate', 'ngCookies', 'ngResource', 'ngRoute', 'ngSanitize', 'ngTouch'])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about',
      })
      .otherwise({
        redirectTo: '/',
      });
    $locationProvider.html5Mode(true);
  });
