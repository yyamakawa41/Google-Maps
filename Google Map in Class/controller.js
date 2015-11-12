
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
		console.log(city);
		console.log(index);
	}

	$scope.cities = cities;
	for (i = 0; i < cities.length; i++){
		createMarker(cities[i],i)
	}
});