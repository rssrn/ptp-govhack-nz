var originLat=-43.53;
var originLng=172.63;
var orginTitle="Logan Campbell Center"
var directionsDisplay;
var map;
var directionsService = new google.maps.DirectionsService();
function initMaps() {
	var latlng = new google.maps.LatLng(originLat,originLng);
	var mapProps={
		center: latlng,
		zoom:16,
		scrollwheel:false,
		mapTypeControl: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}

	map = new google.maps.Map(document.getElementById("googleMap"),mapProps);  		
	/*new google.maps.Marker({
		position: latlng, 
	    map: map, 
	    title:orginTitle
	});*/ 
	
	var toilets = new google.maps.Data();
	var dogEx = new google.maps.Data();

	toilets.loadGeoJson('toilet.json');  	
	toilets.setStyle({	  
	  strokeWeight:0,	
	  fillColor: 'red'
	});

	dogEx.loadGeoJson('dog_exercise_area.geojson');  
	dogEx.setStyle({	  
	  strokeWeight:0,	
	  fillColor: 'black'
	});

	toilets.setMap(map);
	dogEx.setMap(map);

}
function getDirections(){
	var travelMode = $('input[name="travelMode"]:checked').val();
	var start = $("#routeStart").val();
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
    	if (status == 'ZERO_RESULTS') {
    		alert('No route could be found between the origin and destination.');
    	} else if (status == 'UNKNOWN_ERROR') {
	        alert('A directions request could not be processed due to a server error. The request may succeed if you try again.');
	    } else if (status == 'REQUEST_DENIED') {
	        alert('This webpage is not allowed to use the directions service.');
	    } else if (status == 'OVER_QUERY_LIMIT') {
	        alert('The webpage has gone over the requests limit in too short a period of time.');
	    } else if (status == 'NOT_FOUND') {
	        alert('At least one of the origin, destination, or waypoints could not be geocoded.');
	    } else if (status == 'INVALID_REQUEST') {
	        alert('The DirectionsRequest provided was invalid.');         
	    } else {
	        alert("There was an unknown error in your request. Requeststatus: nn"+status);
	    }
    }
});
}