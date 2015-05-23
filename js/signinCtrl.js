
dinnerPlannerApp.controller('signinCtrl', function ($scope,Dinner) {
  
		$scope.email = "";
		$scope.password = "";
		$scope.fname = "";
		$scope.lname = "";
		$scope.number = "";
		$scope.adr = "";
		
		//connect to database (firebase)
		var ref = new Firebase("https://dazzling-torch-7020.firebaseio.com");
		var refUser = new Firebase("https://dazzling-torch-7020.firebaseio.com/Users");
		
		//create account 
		$scope.create = function(){
			ref.createUser({
				email    : $scope.email,
				password : $scope.password
		 		}, function(error, userData) {
				if (error) {
			  		document.getElementById("state").innerHTML = ("Error creating user:"+ error);
				} else {
					var newUserRef = refUser.push();
  					newUserRef.set({user:$scope.email, fname:$scope.fname, lname:$scope.lname, adr:$scope.adr, number:$scope.number, id:newUserRef.key()});
    				
    				title = 'Yay!';
    				content = 'You have successfully creted an account!';

    				Dinner.alerts(title,content);
				}
			});
		}
	

});