var originLat=-43.53;
var originLng=172.63;
var orginTitle="Chirstchurch"
var map;
var directionsService;
var directionsDisplay;

// main layers
var toilets;
var dogEx;
var picTable;
var walkTrack;

// icons for layers
var toiletIcons = new Array();
var dogIcons = new Array();
var walkIcons = new Array();

function initMaps() {
	var latlng = new google.maps.LatLng(originLat,originLng);
	var mapProps={
		center: latlng,
		zoom:16,
		scrollwheel:false,
		mapTypeControl: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	directionsService = new google.maps.DirectionsService();
	map = new google.maps.Map(document.getElementById("googleMap"),mapProps);  	
	
	picTable = new google.maps.Data();	
	

	var rendererOptions = { draggable: true };  		
	directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);

	/*new google.maps.Marker({
		position: latlng, 
	    map: map, 
	    title:orginTitle
	});*/
	

	//loadLayers();
}
	
function loadLayers(layerId,show){	
	if(layerId==='toilets' && show){
		if(typeof(toilets) == 'undefined'){
			toilets = new google.maps.Data();
			toilets.loadGeoJson(
				'./data/toilet.geojson', null, function (feature) {
					toilets.forEach(function(feature) {
						addIcon(map,feature,'./images/toilet.png',toiletIcons);
					});
				});
			toilets.setStyle({	  
				strokeWeight:0,	
				fillColor: 'transparent',
			});
		}
		toilets.setMap(map);
 		for (var icon in toiletIcons) {
 			toiletIcons[icon].setVisible(true);
 		}
	}else if(layerId==='toilets' && !show){
		toilets.setMap(null);

		console.log('length: ' + toiletIcons.length);
 		for (var icon in toiletIcons) {
 			toiletIcons[icon].setVisible(false);
 		}

	}
	if(layerId==='dogEx' && show){
		if(typeof(dogEx) == 'undefined'){
			dogEx = new google.maps.Data();
			dogEx.loadGeoJson('./data/dogexerciseareaequipment.geojson');
			dogEx.loadGeoJson(
				'./data/dogexerciseareaequipment.geojson', null, function (feature) {
					dogEx.forEach(function(feature) {
						addIcon(map,feature,'./images/dog.png',dogIcons);
					});
				});
			dogEx.setStyle({
				strokeWeight:0,
				fillColor: 'black'
			});
		}			
		dogEx.setMap(map);
		for (var icon in dogIcons) {
 			dogIcons[icon].setVisible(true);
 		}
	}else if(layerId==='dogEx' && !show){
		dogEx.setMap(null);	
		for (var icon in dogIcons) {
 			dogIcons[icon].setVisible(false);
 		}
	}
	
	if(layerId==='walkTrack' && show){
		if(typeof(walkTrack) == 'undefined'){
			walkTrack = new google.maps.Data();
			walkTrack.loadGeoJson('./data/walkingtrack.geojson'); 
			walkTrack.loadGeoJson(
					'./data/dogexerciseareaequipment.geojson', null, function (feature) {
						walkTrack.forEach(function(feature) {
							addIcon(map,feature,'./images/walking.png',walkIcons);
						});
					}); 
			walkTrack.setStyle({	  
			  strokeWeight:3,
			  strokeColor:'DarkGreen',	
			  fillColor: 'DarkGreen'
			});			
		}	
		walkTrack.setMap(map);
		for (var icon in walkIcons) {
 			walkIcons[icon].setVisible(true);
 		}
	}else if(layerId==='walkTrack' && !show){
		walkTrack.setMap(null);	
		for (var icon in walkIcons) {
 			walkIcons[icon].setVisible(false);
 		}
	}	

	if(layerId==='picTable' && show){
		picTable.loadGeoJson('./data/picnictable.geojson');  
		picTable.setStyle({	  
		  strokeWeight:0,	
		  fillColor: 'transparent',
		  icon: './images/picnic.png'
		});			

		picTable.setMap(map);
	}else if(layerId==='picTable' && !show){
		picTable.setMap(null);	
	}
}

function addIcon(map, feature, icon, iconArray) {
	console.log('here');
	if (feature.getGeometry().getType()==='Polygon') {

		// get overall bounds so we can estimate the centre
        var bounds=new google.maps.LatLngBounds();
        feature.getGeometry().getArray().forEach(function(path){
            path.getArray().forEach(function(latLng){
				bounds.extend(latLng);
            });
        });

		mkr = new google.maps.Marker(
			{
				position: bounds.getCenter(),
				map: map,
				icon: icon
			}
		);

		iconArray.push(mkr);
    }
}

function getDirections(){
	var travelMode = $('input[name="travelMode"]:checked').val();
	var start = $("#routeStart").val();
	var end = $("#routeEnd").val();
	var waypoints=[];
	var request = {
	origin: start,
	destination: end,
	waypoints: waypoints,
	unitSystem: google.maps.UnitSystem.METRIC,
	travelMode: google.maps.DirectionsTravelMode[travelMode]
	};

	
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
    loadLayers();
});
}
