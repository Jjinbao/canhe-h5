'use strict';

(function() {

	var app = angular.module('swalk.head');

	app.directive('swalkHead', function() {
		return {
			restrict : 'E',
			scope : {},
			replace : true,
			controller : function controller($scope, $http, config, $cookies, $state, $rootScope, $interval) {
				$scope.travelNotice = false;
				$scope.hotelNotice = false;
				$scope.showOrHide = false;
				var getNotice = function () {
					$scope.noticeText = 0;//初始化消息条数
					$http({
						method: "GET",
						url: config.urlBase + "/user/ordertravel/list",
						params: {
							offset:0,
							limit: 1,
							status: -1
						}
					}).success(function(result){
						if(result.list != null){
							$scope.travelNotice = true;
							$scope.noticeText += result.count;
							$scope.noticeText = $scope.noticeText >= 10 ? "N" : $scope.noticeText;
						}
						$http({
							method: "GET",
							url: config.urlBase + '/user/order/list',
							params: {
								offset: 0,
								limit: 1,
								status: -1
							}
						}).success(function(result){
							if(result.list != null){
								$scope.noticeText += result.count;
								$scope.noticeText = $scope.noticeText >= 10 ? "N" : $scope.noticeText;
								$scope.hotelNotice = true;
								if($scope.noticeText >= 0 || $scope.noticeText == 'N'){
									document.getElementById("music").play();
								}
							}
						});
					});

				};
				getNotice();
				$scope.showNotice = function (){
					if($scope.showOrHide){
						$scope.showOrHide = false;
					}else{
						$scope.showOrHide = true;
					}
				};
				$interval.cancel($rootScope.timer);
				$rootScope.timer = $interval(getNotice,1000*60*10);
				if ($rootScope.login == null) {
					$http({
						method: "POST",
						url: config.urlBase + "/user/merch/getMerchByToken",
						data:  $cookies.get("token")
					}).then(function (data) {
						$rootScope.login = data.data;
						$scope.name = $rootScope.login.merchShort;
					}, function(data) {

					});
				} else {
					$scope.name = $rootScope.login.merchShort;
				}
				$scope.cancel = function() {
					$http({
						method: "POST",
						url: config.urlBase + "/cancel",
						data:  $cookies.get("token")
					}).success(function (data) {
						$cookies.remove("token");
						window.localStorage.merchId ="";
						$rootScope.login = null;
						$state.go('login');
					});
				};
				$scope.goHouseOrder = function () {
					window.localStorage.newHouseOrder = '1';
					if($state.is("user",{menu: 'order',submenu: 'list'})){
						$state.reload();
					}else{
						$state.go('user',{menu: 'order',submenu: 'list'});
					}
				};
				$scope.goTravelOrder = function () {
					window.localStorage.newTravelOrder = '1';
					if($state.is("user",{menu: 'orderTravel',submenu: 'list'})){
						$state.reload();
					}else{
						$state.go('user',{menu: 'orderTravel',submenu: 'list'});
					}
				}
			},
			templateUrl : 'app/modules/head/head.tpl.html',
			controllerAs : 'ctrl',
			bindToController : true
		};
	});

})();
