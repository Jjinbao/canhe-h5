'use strict'

angular.module('canhe.services', [])
    .service('userService', ['$http', '$q', '$location', function ($http, $q, $location) {


        //请求需要用户信息的数据
        function reqData(postdata, lastUrl) {
            var deferred = $q.defer();
            $http({
                method: "POST",
                url: urlStr + lastUrl,
                data: postdata,
                headers: {
                    'token': result.userMess.token,
                    'userId': result.userMess.userId
                }
            }).success(function (data) {
                return deferred.resolve({list: data});
            });
            return deferred.promise;
        }

        function getRsb(url){
            var deferred = $q.defer();
            $http({
                method: "GET",
                url: urlStr + url,
                headers: {
                    'token': result.userMess.token,
                    'userId': result.userMess.userId
                }
            }).success(function (data) {
                return deferred.resolve({list: data});
            });
            return deferred.promise;
        }

        //获取openId
        function getOpenId(data, lastUrl) {
            var deferred = $q.defer();
            $http({
                method: "GET",
                url: urlStr + lastUrl,
                headers: {
                    'token': result.userMess.token,
                    'userId': result.userMess.userId
                },
                params: data
            }).success(function (data) {
                return deferred.resolve({list: data});
            });
            return deferred.promise;
        }

        //请求不需要用户信息的数据
        function requestData(postdata, lastUrl) {
            var deferred = $q.defer();
            $http({
                method: "POST",
                url: urlStr + lastUrl,
                data: postdata
            }).success(function (data) {
                return deferred.resolve({list: data});
            });
            return deferred.promise;
        }

        //调用结算中心的函数
        function jsApi(postData, url) {

            var deferred = $q.defer();
            $http({
                method: "POST",
                url: url,
                data: postData
            }).success(function (data) {
                return deferred.resolve({list: data});
            });
            return deferred.promise;
        }

        function getData(params, url) {
            var deferred = $q.defer();
            $http({
                method: "POST",
                url: urlStr + url,
                data: params
            }).success(function (data) {
                return deferred.resolve({list: data});
            });
            return deferred.promise;
        }

        return result;
    }])
    .filter('phoneHash', [function () {
        return function (value) {
            var input = value + '';
            input = input.replace(/(\s+)/g, "");
            var out = '';
            for(var i = 0; i < input.length; i++){
                if(i == 2){
                    out = out + input[i] + ' ';
                }else if(i>2 && i<=6){
                    out = out + '*';
                    if(i == 6){
                        out = out + ' '
                    }
                }else {
                    out = out + input[i]
                }
            }
            return out
        }
    }])
    .filter('dateFormate', [function () {
        return function (value) {
            if(!value){
                return;
            }
            var out;
            if(value.substring(value.length-2)==='.0'){
                out=value.substring(0,value.length-2);
            }else{
                out=value;
            }
            return out;
        }
    }])