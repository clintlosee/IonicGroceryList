// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'firebase'])

    .factory('Items', ['$firebaseArray', function($firebaseArray) {
        var itemsRef = new Firebase('https://flickering-torch-730.firebaseio.com/items');
        return $firebaseArray(itemsRef);
    }])

    .controller('ListCtrl', function($scope, $ionicListDelegate, $ionicPopup, Items) {
        $scope.items = Items;

        $scope.addItem = function() {
            $ionicPopup.prompt({
                title: 'What do you need to buy?',
                inputType: 'text'
            }).then(function(res) {
                $scope.items.$add({
                    'name': res
                });
            });
        };

        $scope.purchaseItem = function(item) {
            var itemRef = new Firebase('https://flickering-torch-730.firebaseio.com/items/' + item.$id);
            itemRef.child('status').set('purchased');
            $ionicListDelegate.closeOptionButtons();
        };

        $scope.deleteItem = function(item) {
            $scope.items.$remove(item);
            $ionicListDelegate.closeOptionButtons();
        }
});
