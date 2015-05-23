
dinnerPlannerApp.controller('libraryCtrl',function($scope, $routeParams, $location, Dinner, BookQueryService) {
 
 
 
	var user = Dinner.getUser();
	$scope.BooksISBN = [];		

	$scope.userBooks = function() {
	
	/* GET BOOK FROM DATABASE */
	var ref = new Firebase("https://dazzling-torch-7020.firebaseio.com/library");
	ref.on("child_added", function(snapshot) {
  		var newPost = snapshot.val();
  		
  		if(newPost.user == user){
  			//userBooks is all the books that the logged in user has added to library
  			ISBN = newPost.ISBN_13;	  			
  			if (ISBN !== undefined){
  			BookQueryService.getBookByID(ISBN).then(function(data) {
  			if (data.data.items !== undefined){
       		$scope.BooksISBN.push(data.data.items[0]);       		
       		$scope.chunks = Dinner.chunk($scope.BooksISBN, 1);
  }    		});
      		}}
  			return $scope.BooksISBN;
    }); 
    }
 
 
 $scope.userBooks();	
 
  //Remove book function
 	$scope.removeBook = function(Book, title) {
	var BookISBN = Book.industryIdentifiers;
	
	var ISBN = "";
	for ( var s=0; s<BookISBN.length ; s++){
		if (BookISBN[s].type === "ISBN_13"){
		ISBN = BookISBN[s].identifier;
		console.log(ISBN)
	}}
	
	var ref = new Firebase("https://dazzling-torch-7020.firebaseio.com/library");
	ref.on("child_added", function(snapshot) {
  		var newPost = snapshot.val();
  		
  		if(newPost.user == user && newPost.ISBN_13 == ISBN){
  			//userBooks is all the books that the logged in user has added to library
  			var ref = new Firebase("https://dazzling-torch-7020.firebaseio.com/library/" + newPost.id)
  			Dinner.removeTradeList(Book.title);
  			ref.remove();
  			
  		
  			}});
	window.location.reload();
  	};
  	
 

 $scope.tradeBooks = function(book) {
    Dinner.tradeList(book);
 };


});