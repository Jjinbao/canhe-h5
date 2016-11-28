'use strict'

angular.module('canher.mine', [])
    .controller('mine', ['$scope','$state','$ionicViewSwitcher', function ($scope,$state,$ionicViewSwitcher) {
        $scope.orders=function(){
            $state.go('orders',{});
            $ionicViewSwitcher.nextDirection('forward');
        }

        $scope.setAddress=function(){
            $state.go('address',{});
            $ionicViewSwitcher.nextDirection('forward');
        }
    }])