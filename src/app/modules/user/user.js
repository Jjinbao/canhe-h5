'use strict';

(function() {
angular.module('swalk.user',['swalk.menu', 'swalk.head']).config(function($stateProvider) {
	$stateProvider.state('user', {
		url: "^/user/:menu/:submenu",
		templateUrl: "app/modules/user/user.tpl.html",
		controller: function($stateParams){
			this.menu = $stateParams.menu;
			this.submenu = $stateParams.submenu;
		},
		controllerAs: 'ctrl'
	})
})

})();