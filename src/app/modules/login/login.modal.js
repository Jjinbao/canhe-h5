'use strict';

(function () {
    angular.module('swalk.login', []).config(function ($stateProvider) {
        $stateProvider.state('login', {
            url: "^/login",
            templateUrl: "app/modules/login/login.tpl.html",
            controller: function ($stateParams, $scope, $http, config, $state, $cookies, $rootScope) {
                $scope.error = false;
                $scope.name = '';
                $scope.password = '';
                $scope.url = '';
                $scope.login = function () {
                    var postData = {
                        merchId: $scope.name,
                        password: $scope.password
                    };
                    $http({
                        method: "POST",
                        url: config.urlBase + "/login/",
                        data: postData
                    }).then(function (respones) {
                        console.log("----------------------->" + respones.status);
                        if (respones.data.status == 500) {
                            $scope.error = true;
                            $scope.name = '';
                            $scope.password = '';
                            return;
                        } else {
                            var expireDate = new Date();
                            expireDate.setDate(expireDate.getDate() + 1);
                            console.log("token------------>", respones.data.data.token);
                            $cookies.put("token", respones.data.data.token, {'expires': expireDate});
                            $rootScope.loginName = respones.data.data.merchShort;
                            window.localStorage.merchId = respones.data.data.merchId;
                            $http.defaults.headers.common.token =  respones.data.data.token;
                            $state.go("user", {menu: 'house', submenu: 'list'});
                        }
                    }, function (respones) {
                        console.log("----------------------->error");
                        $state.go("login");
                    })
                }
            },
            controllerAs: 'ctrl'
        })
    })

})();