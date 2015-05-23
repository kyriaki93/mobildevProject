
dinnerPlannerApp.factory('Dinner',['$firebaseArray',
  function($firebaseArray) {

	this.user = "";
	this.tradingList = [];
	
	//get email from user logged in 
	this.getUser = function(){
		var ref = new Firebase("https://dazzling-torch-7020.firebaseio.com");
		var authData = ref.getAuth();
		if (authData) {
  			return authData.password.email;
		} 
		else{
  			return 'no user';
		}
	}
	
	//alert function
	this.alerts = function(title, content){
		$.alert({
			title: title,
			content: content,
			animation: 'opacity',
			confirmButtonClass: 'btn-warning'
		});

	}

	//shows books and how many on each row
	this.chunk = function(arr, size) {
  		var newArr = [];
  		for (var i=0; i<arr.length; i+=size) {
    	newArr.push(arr.slice(i, i+size));
  		}
  		return newArr;
	}

	//Add books to tradelist
	this.tradeList = function(book, user){
	
		var title = book.title;
		var user = this.getUser();
	

		var ref = new Firebase("https://dazzling-torch-7020.firebaseio.com/Users");
	    ref.on("child_added", function(snapshot) {
  		var newPost = snapshot.val();
		if (newPost.user === user){
		var tradingRef = new Firebase('https://dazzling-torch-7020.firebaseio.com/TradingList');
		
		var newTradingRef = tradingRef.push();
		newTradingRef.set({ 'Title': title, 'User': user, 'Address': newPost.adr, id: newTradingRef.key() });
		//tradingList.push({ 'Title': title, 'User': user, 'Address': newPost.adr, id: newTradingRef.key() });
		}});
		alertTitle = 'Yay!';
		content = 'You have successfully addad the book '+ title +' up for trade!';
		this.alerts(alertTitle,content);
		//for (a=0; a<tradingList.length; a++){
		//console.log("Nytt:" +tradingList[a]);}

  	};	
  	
  	//remove book
	this.removeTradeList = function(title){
	
		
		var user = this.getUser();
		
		var tradingDeleteRef = new Firebase('https://dazzling-torch-7020.firebaseio.com/TradingList');
		
		tradingDeleteRef.on("child_added", function(snapshot) {
  		var newPost = snapshot.val();
  		
  		if(newPost.User == user && newPost.Title == title){
  				var DeleteBookref = new Firebase("https://dazzling-torch-7020.firebaseio.com/TradingList/" + newPost.id)
  				DeleteBookref.remove();
		
		}});		
	}

	
  return this;

}]);




dinnerPlannerApp.service('BookQueryService', ['$http',
  function($http) {
    
    var service={};
    
    service.getBooks = function(searchWord) {
      return $http.get("https://www.googleapis.com/books/v1/volumes?q=" + searchWord + "&key=AIzaSyDgsLy0_408ln-F6N4tt36E-vB7LSZo_kY&maxResults=40&country=SE");
    };

    service.getBookByID = function(bookISBN) {
      return $http.get("https://www.googleapis.com/books/v1/volumes?q=isbn:"+bookISBN+"&key=AIzaSyDgsLy0_408ln-F6N4tt36E-vB7LSZo_kY&country=SE");
    };
 return service;

  }
]);