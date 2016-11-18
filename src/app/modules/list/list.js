'use strict'

angular.module('canhe.list', [])
    .controller('mylist', ['$rootScope','$scope', function ($rootScope,$scope) {
        $scope.nowItem=1;
        $scope.sortList=[
            {name:'分类一',id:1},{name:'分类一',id:2},{name:'分类一',id:3},{name:'分类一',id:4},{name:'分类一',id:5},{name:'分类一',id:6},{name:'分类一',id:7},{name:'分类一',id:8}
        ]

        $scope.changeSortItem=function(val){
            if($scope.nowItem==val.id){
                return;
            }
            $scope.nowItem=val.id;
        }

        $scope.addPro=function(){
            $rootScope.buyNum++;
        }

        $scope.reducePro=function(){
            $rootScope.buyNum--;
        }
    }])