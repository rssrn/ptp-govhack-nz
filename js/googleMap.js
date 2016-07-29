
	console.log("Loaded Google Map")
	var originLat=-36.8919547;
	var originLng=174.779233;
	var orginTitle="Logan Campbell Center"
	var directionsDisplay;
	var directionsService = new google.maps.DirectionsService();
	var latlng = new google.maps.LatLng(originLat,originLng);
	console.log(latlng);
	var mapProps={
		center: latlng,
		zoom:16,
		scrollwheel:false,
		mapTypeControl: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}

	var map = new google.maps.Map(document.getElementById("googleMap"),mapProps);  		
		new google.maps.Marker({
			position: latlng, 
	    map: map, 
	    title:orginTitle
	});   	  	
	console.log("Done google");
  	
  	function getDirections(){
  		console.log("Get google directions")
  		var travelMode = $('input[name="travelMode"]:checked').val();
  		var start = $("#routeStart").val() +",auckland";
  		var end = (originLat + "," + originLng);
  		var waypoints=[];
  		var request = {
    		origin: start,
    		destination: end,
    		waypoints: waypoints,
    		unitSystem: google.maps.UnitSystem.METRIC,
    		travelMode: google.maps.DirectionsTravelMode[travelMode]
  		};

  		var rendererOptions = { draggable: true };  		
		directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
		directionsDisplay.setMap(map);
  		directionsDisplay.setPanel(document.getElementById("directionsResults"));
	
  		directionsService.route(request, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
		      $('#directionsResults').empty();
		      directionsDisplay.setDirections(response);
		    }else{
		    	alert(status);
		    }
		});
	}