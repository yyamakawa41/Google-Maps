
var mapctl = angular.module('myApp', []).controller('mapCtrl', function($scope){

	var mapOptions = {
		zoom: 4,
		center: new google.maps.LatLng(40.0000, -98.0000),
		// mapTypeId: google.maps.mapTypeId.TERRAIN
	}

	$scope.map= new google.maps.Map(document.getElementById('map'), mapOptions);
	$scope.markers = [];

	var infoWindow = new google.maps.InfoWindow();

	var createMarker = function(city, index){
		// console.log(city);
		// console.log(index);

		var latLon = city.latLon.split(',');
		var lat = latLon[0];
		var lon = latLon[1];

		var marker = new google.maps.Marker({
			map: $scope.map,
			position: new google.maps.LatLng(lat, lon),
			title: city.city,
			icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2%7CFE7569'
		});

		markerContentHTML = '<div class="infoWindowContent">';
	       markerContentHTML += '<div class="total-pop">Total Population: ' + city.yearEstimate + '</div>';
	       markerContentHTML += '<div class="pop-dens-last-year">2010 Census: ' + city.lastCensus + '</div>';
	       markerContentHTML += '<div class="pop-change">Population Change %: ' + city.change + '</div>';
	       markerContentHTML += '<div class="pop-dens">Population Density: ' + city.lastPopDensity + '</div>';
	       markerContentHTML += '<div class="state">State: ' + city.state + '</div>';
	       markerContentHTML += '<div class="land-area">Land Area: ' + city.landArea + '</div>';
	       markerContentHTML += '<a href="#" onclick="getDirections('+lat+','+lon+')">Get directions</a>';
	    markerContentHTML += '</div>';

	    marker.content = markerContentHTML;

	    google.maps.event.addListener(marker, 'click', function(){
	    	infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
	    	infoWindow.open($scope.map, marker);
	    });

	    $scope.markers.push(marker);

	}

	$scope.triggerClick = function(i){
		google.maps.event.trigger($scope.markers[i-1], "click");
	}

	$scope.updateMarkers = function(){
		for(i=0; i< $scope.markers.length; i++){
			$scope.markers[i].setMap(null);
		}
		for(i=0; i<$scope.filteredCities.length; i++){
			createMarker($scope.filteredCities[i],i);
		}
	}

	getDirections = function(lat, lon){
		var directionsService = new google.maps.DirectionsService();
   		var directionsDisplay = new google.maps.DirectionsRenderer();
   		var map = new google.maps.Map(document.getElementById('map'),{
   			zoom: 7,
   			mapTypeId: google.maps.MapTypeId.ROADMAP
   		});

   		directionsDisplay.setMap(map);
   		directionsDisplay.setPanel(document.getElementById('map-panel'));

   		var request = {
           //Origin hardcoded to Atlanta. Require geocode current loc,
           //or give user input
          origin: 'Atlanta, GA', 
          destination:new google.maps.LatLng(lat,lon), 
          travelMode: google.maps.DirectionsTravelMode.DRIVING
        };

        directionsService.route(request, function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
          }
        });
	}

	$scope.cities = cities;
	for (i = 0; i < cities.length; i++){
		createMarker(cities[i],i);
	}
});