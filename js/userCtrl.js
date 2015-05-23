
dinnerPlannerApp.controller('userCtrl', function($scope, $route, $routeParams, $location,Dinner) {
  
  //connect to firebase
  var ref = new Firebase("https://dazzling-torch-7020.firebaseio.com");
		
		//login user
		$scope.submit = function(){
			ref.authWithPassword({
  			email    : $scope.email,
  			password : $scope.password
			}, function(error, authData) {
  			if (!error) {
   		    	window.location = 'http://iprog.clindstrom.se.preview.citynetwork.se/#/library';
  				
  			} else {
				//$("#state").html("Login Failed!", error);
				title = "Error"
				content = ""+error+"";
				Dinner.alerts(title,content);
    			
  			}
			
		});
		}
});

  