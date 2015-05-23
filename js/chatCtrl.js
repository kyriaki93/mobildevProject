
dinnerPlannerApp.controller('chatCtrl', function($scope, $routeParams, $location, Dinner, PubNub,$rootScope) {


		   // Grab the elements
		  var input = $("#input");
		  var buttonSend = $("#buttonSend");
		  var buttonHistory = $("#buttonHistory");
		  output = $("#output");
		  status = $("#status");
		  channelname = "stockholm";
		  	  	$scope.messages = [];

				
		//Creates a unique id for a loged in user
		  custom_uuid = Dinner.getUser();

		  PubNub.init({
		  publish_key:"pub-c-5efb1753-8288-496b-8944-a055d243c211",
		  subscribe_key:"sub-c-868aa71c-ea82-11e4-85e6-02ee2ddab7fe",
		  uuid:custom_uuid
		  });		 

		  // The users send messages via the chat by pressing the send-button
		  buttonSend.on('click', function() {
			
			  PubNub.ngPublish({
				channel : channelname,
				message : {'usermessage':input.val(), 'uuid': custom_uuid},
			  });
			
		  });
		  
		  
		  // Loads history when page is loaded
			function readyFn( jQuery ) {
			output.html("");
			PubNub.ngHistory({
			  count : 10,
			  channel : channelname,
			  
			});
		  };
		  $( document ).ready( readyFn );
		  
		  //payload.message is how we get username and message via the chat
		  $rootScope.$on(PubNub.ngMsgEv(channelname), 
			function(event, payload) 
			{  
				$scope.$apply(function() {
					if(custom_uuid == payload.message.uuid){
						output.html(output.html() + '<div class="row"><div class="list" style="margin:0 0 2% 0"><a class="list-group-item" style="width:100%;height:45px;"><p style="float:right"> ' + payload.message.uuid +": " +  payload.message.usermessage+"</p></a></div></div>");
					}
					else{
						output.html(output.html() + '<div class="row"><div class="list" style="margin:0 0 2% 0"><a class="list-group-item" style="width:100%;height:45px"><p style="float:left"> ' + payload.message.uuid +": " +  payload.message.usermessage+"</p></a></div></div>");
					}
				  })
			});
	
	  

		// receive messages
		PubNub.ngSubscribe(
		{
			channel   : channelname,
			message : function( message, env, channel ){
		 
			},
			connect: function(){console.log("Connected")},
			disconnect: function(){console.log("Disconnected")},
			reconnect: function(){console.log("Reconnected")},
			error: function(){console.log("Network Error")}, 
		
		});
			//Users online at the same time
		PubNub.ngHereNow
		{
			channel: channelname
		
		};	

		  $scope.$on(PubNub.ngPrsEv(channelname), function(event, payload) {
			// payload contains message, channel, env...
			console.log('got a presence event:', payload);
			console.log('got a presence event:', event);

			//See active users 
			$scope.online = (PubNub.ngListPresence(channelname));
			console.log(PubNub.ngPresenceData(channelname));
			$scope.$apply;

		});
		


		$( window ).unload(function() {
		
		});

			$(window).on("beforeunload", function() { 
				console.log("unloaded");
				PubNub.ngUnsubscribe({
				  channel: channelname
			});
			})
	   // Use anything defined in the loaded script...
	
});


  