const app = angular.module('guthub', ['ngRoute', 'guthub.directives', 'guthub.services']);

app.config([
  '$routeProvider',
  '$locationProvider',
  function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        controller: 'ListCtrl',
        templateUrl: '/views/list.html',
        resolve: {
          recipes: function (MultiRecipeProvider) {
            return MultiRecipeProvider();
          },
        },
      })
      .when('/edit/:recipeId', {
        controller: 'EditCtrl',
        templateUrl: '/views/recipeForm.html',
        resolve: {
          recipes: function (RecipeLoader) {
            return RecipeLoader();
          },
        },
      })
      .when('/view/:recipeId', {
        controller: 'ViewCtrl',
        templateUrl: '/views/viewRecipe.html',
        resolve: {
          recipes: function (RecipeLoader) {
            return RecipeLoader();
          },
        },
      })
      .when('/new', {
        controller: 'NewCtrl',
        templateUrl: '/views/recipeForm.html',
      })
      .otherwise({
        redirectTo: '/',
      });
    $locationProvider.html5Mode(true);
  },
]);

app.controller('ListCtrl', [
  '$scope',
  'recipes',
  function ($scope, recipes) {
    $scope.recipes = recipes;
  },
]);

app.controller('ViewCtrl', [
  '$scope',
  '$location',
  'recipe',
  function ($scope, $location, recipe) {
    $scope.recipe = recipe;

    $scope.edit = function () {
      $location.path('/edit/' + recipe.id);
    };
  },
]);

app.controller('EditCtrl', [
  '$scope',
  '$location',
  'recipe',
  function ($scope, $location, recipe) {
    $scope.recipe = recipe;

    $scope.save = function () {
      $scope.recipe.$save(
        function (recipe) {
          $location.path('/view/' + recipe.id);
        },
        function (error) {
          console.log(`Failed to save recipe: ${error.statusText}`);
        }
      );
    };

    $scope.remove = function () {
      delete $scope.recipe;
      $location.path('/');
    };
  },
]);

app.controller('NewCtrl', [
  '$scope',
  '$location',
  'Recipe',
  function ($scope, $location, Recipe) {
    $scope.recipe = new Recipe({
      ingredients: [{}],
    });

    $scope.save = function() {
      $scope.recipe.$save(
        function (recipe) {
          $location.path('/view/' + recipe.id);
        },
        function (error) {
          console.log(`Failed to save recipe: ${error.statusText}`);
        }
      );
    };
  },
]);

app.controller('IngredientsCtrl', [
  '$scope',
  function ($scope) {
    $scope.addIngredient = function () {
      const ingredients = $scope.recipe.ingredients;
      ingredients[ingredients.length] = {};
    };

    $scope.removeIngredient = function (index) {
      $scope.recipe.ingredients.splice(index, 1);
    };
  },
]);
