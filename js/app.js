var dinnerPlannerApp = angular.module('dinnerPlanner', ['firebase','ngRoute', 'ngMap', 'pubnub.angular.service']);

dinnerPlannerApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home.html'
      }).
      
      
      when('/login', {
				templateUrl: 'partials/loginView.html',
				controller: 'userCtrl',
			}).
      
      when('/signup', {
				templateUrl: 'partials/signup.html',
				controller: 'signinCtrl',
			}).
			
	  when('/search', {
				templateUrl: 'partials/search.html',
				controller: 'searchCtrl',
			}).
	  when('/logout', {
			templateUrl: 'partials/home.html',
			}).
	when('/user', {
			templateUrl: 'partials/contact.html',
			controller: 'contactCtrl'
				
			}).
	when('/trade', {
			templateUrl: 'partials/trade.html',
			controller: 'tradeCtrl'	
			}).
	when('/library', {
			templateUrl: 'partials/library.html',
			controller: 'libraryCtrl'			
			}).
	when('/chat', {
			templateUrl: 'partials/chat.html',
			controller: 'chatCtrl'			
			}).				
      otherwise({
        redirectTo: '/home'
      });
  }]);
  
         
  
