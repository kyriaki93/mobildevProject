
dinnerPlannerApp.controller('headerCtrl', function($scope, $routeParams, $location, Dinner) {
  
  	//get inlogged username
	$scope.user = Dinner.getUser();
	
});

  