
dinnerPlannerApp.controller('contactCtrl', function($scope, $routeParams, $location, Dinner) {
  	
  //if the user has pushed on the contact button then show that users contact info, else shows the users personal info.
	if($routeParams.email != undefined)
	{
		var user = $routeParams.email;
	}
  else{
    var user = Dinner.getUser();
  }

  //connect to Firebase (User table)
	var ref = new Firebase("https://dazzling-torch-7020.firebaseio.com/Users");
	ref.on("child_added", function(snapshot) {
		//get all the users
  		var newPost = snapshot.val();
  		if(newPost.user == user){
  			//gets all the information from the user that is logged in
  			$scope.email = newPost.user;
  			$scope.number = newPost.number;
  			$scope.fname = newPost.fname;
  			$scope.lname = newPost.lname;
        $scope.adr = newPost.adr;
  			$scope.id = newPost.id;
  			$scope.$apply();
  	
  		}
  		else{
  			//if no user is logged in or does not exist in the database, then no one is found
  			$scope.email = 'no user found';
  		}
  			
	});

	//when the edit button is pressed it will update following
  $scope.edit = function(){
    window.location.reload();
		ref.child(""+ $scope.id +"").set({ fname: $scope.fname, lname: $scope.lname, number: $scope.number, user: user, id: $scope.id, adr: $scope.adr});
	}

});

  