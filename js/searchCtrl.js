// Search controller that we use whenever we have a search inputs
// and search results
dinnerPlannerApp.controller('searchCtrl', ['$scope', 'BookQueryService','$timeout', 'Dinner',
  function($scope, BookQueryService, $timeout, Dinner) {


    /* GET SEARCHED BOOKS */
    $scope.search = function(searchWord) {          
    if (searchWord !== undefined){
    	  BookQueryService.getBooks(searchWord).then(function(data) {
          $scope.books = data.data.items;
          console.log($scope.books)
          $scope.chunks = Dinner.chunk($scope.books, 1);
       	  return $scope.books;
        });
    }};

	  /* Split searched results into 1 books per row */
  
  	$scope.search();
  	
  	/* Selected book gets added to Firebase - Funktion som får in bokens ID och lägger till det i 
  	en ny lista i firebase med bok ID och UserEmail (unikt). */
  	  	
  	$scope.addBookToLibrary = function(bookISBN) {
  	  
  	  	for (i=0; i<bookISBN.length; i++){
  	  	  if (bookISBN[i].type === "ISBN_13"){
		        var sampleChatRef = new Firebase('https://dazzling-torch-7020.firebaseio.com/library');
      	    var user = Dinner.getUser();
			      var newSampleChatRef = sampleChatRef.push();
			      newSampleChatRef.set({ 'ISBN_13': bookISBN[i].identifier, 'user': user, 'id': newSampleChatRef.key()});
		      }
		    }
	  };
  	
  /*  Show message for added book */	
  $scope.alertMsg = {
    show: false,
    text:""
  };

  //alert that is shown when a book is added to the booshelf
  $scope.showAlert =function(title){
    alertTitle = "Yay";
    content = 'You have now added the book '+ title +' to your bookshelf!';
    Dinner.alerts(alertTitle,content);
  };
  	
  
  }]);