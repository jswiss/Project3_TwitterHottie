// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.



function initAutocomplete() {

	var map = new google.maps.Map(document.getElementById('googlemap'), {
    center: {lat: 51.5286416, lng: -0.1015987},
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: styledArray
  });

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // [START region_getplaces]
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
  	console.log(places)

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };
 			
 			var location = place.geometry.location;

			var lat = location.lat();
			var lng = location.lng();
      
      sendToTwitter(lat, lng);
			
	

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });

    map.fitBounds(bounds);
		var listener = google.maps.event.addListener(map, "idle", function() { 
  		if (map.getZoom() > 14) map.setZoom(14); 
  		else if (map.getZoom() < 12) map.setZoom(12);
  		google.maps.event.removeListener(listener); 
		});
  });
}

var styledArray =  [
	{
	    "featureType": "poi",
	    "elementType": "all",
	    "stylers": [
	        {
	            "hue": "#000000"
	        },
	        {
	            "saturation": -100
	        },
	        {
	            "lightness": -100
	        },
	        {
	            "visibility": "off"
	        }
	    ]
	},
	{
    "featureType": "poi",
    "elementType": "all",
    "stylers": [
	        {
            "hue": "#000000"
	        },
	        {
            "saturation": -100
	        },
	        {
            "lightness": -100
	        },
	        {
            "visibility": "off"
	        }
	    ]
	},
{
    "featureType": "administrative",
    "elementType": "all",
    "stylers": [
	        {
            "hue": "#000000"
	        },
	        {
            "saturation": 0
	        },
	        {
            "lightness": -100
	        },
	        {
            "visibility": "off"
	        }
	    ]
	},
	{
	    "featureType": "road",
	    "elementType": "labels",
	    "stylers": [
	        {
	            "hue": "#ffffff"
	        },
	        {
	            "saturation": -100
	        },
	        {
	            "lightness": 100
	        },
	        {
	            "visibility": "off"
	        }
	    ]
	},
	{
	    "featureType": "water",
	    "elementType": "labels",
	    "stylers": [
	        {
	            "hue": "#000000"
	        },
	        {
	            "saturation": -100
	        },
	        {
	            "lightness": -100
	        },
	        {
	            "visibility": "off"
	        }
	    ]
	},
	{
	    "featureType": "road.local",
	    "elementType": "all",
	    "stylers": [
	        {
	            "hue": "#ffffff"
	        },
	        {
	            "saturation": -100
	        },
	        {
	            "lightness": 100
	        },
	        {
	            "visibility": "on"
	        }
	    ]
	},
	{
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
        {
            "hue": "#ffffff"
        },
        {
            "saturation": -100
        },
        {
            "lightness": 100
        },
        {
            "visibility": "on"
        }
    ]
},
{
    "featureType": "transit",
    "elementType": "labels",
    "stylers": [
        {
            "hue": "#000000"
        },
        {
            "saturation": 0
        },
        {
            "lightness": -100
        },
        {
            "visibility": "off"
        }
    ]
},
{
    "featureType": "landscape",
    "elementType": "labels",
    "stylers": [
        {
            "hue": "#000000"
        },
        {
            "saturation": -100
        },
        {
            "lightness": -100
        },
        {
            "visibility": "off"
        }
    ]
},
{
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
        {
            "hue": "#bbbbbb"
        },
        {
            "saturation": -100
        },
        {
            "lightness": 26
        },
        {
            "visibility": "on"
        }
    ]
},
{
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [
        {
            "hue": "#dddddd"
        },
        {
            "saturation": -100
        },
        {
            "lightness": -3
        },
        {
            "visibility": "on"
        }
    ]
}
];

function sendToTwitter(latitude, longitude) {
	console.log(latitude, longitude)
}

$("pac-input").on('submit', function(e) {
	e.preventDefault();
	$.get("")
})