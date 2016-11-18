'use strict'

angular.module('canhe.list', [])
    .controller('mylist', ['$rootScope','$scope', function ($rootScope,$scope) {
        $scope.nowItem=1;
        $scope.secondItem=1;
        $scope.sortList=[
            {name:'分类一',id:1},{name:'分类一',id:2},{name:'分类一',id:3},{name:'分类一',id:4},{name:'分类一',id:5},{name:'分类一',id:6},{name:'分类一',id:7},{name:'分类一',id:8}
        ]

        $scope.secondList=[
            {name:'五格餐盒',id:1},{name:'四格餐盒',id:2},{name:'三格餐盒',id:3},{name:'二格餐盒',id:4},{name:'一格餐盒',id:5},{name:'分类一',id:6},{name:'分类一',id:7},{name:'分类一',id:9},{name:'分类一',id:8},{name:'分类一',id:10}
        ]

        $scope.proList=[
            {name:'圆形一次性餐盒1000ML塑料透明圆碗外卖',price:'190.00',id:263,type:1},
            {name:'圆形一次性餐盒1000ML塑料透明圆碗外卖',price:'120.00',id:263,type:1},
            {name:'圆形一次性餐盒1000ML塑料透明圆碗外卖',price:'130.00',id:263,type:1},
            {name:'圆形一次性餐盒1000ML塑料透明圆碗外卖',price:'98.00',id:263,type:1},
            {name:'圆形一次性餐盒1000ML塑料透明圆碗外卖',price:'100.00',id:263,type:1},
            {name:'圆形一次性餐盒1000ML塑料透明圆碗外卖',price:'35.00',id:263,type:1}
        ]

        $scope.changeSortItem=function(val){
            if($scope.nowItem==val.id){
                return;
            }
            $scope.nowItem=val.id;
        }

        $scope.changeSecondItem=function(val){
            if($scope.secondItem==val.id){
                return;
            }
            $scope.secondItem=val.id;
        }
    }])