
function initAutocomplete() {

	var map = new google.maps.Map(document.getElementById('googlemap'), {
    center: {lat: 51.5286416, lng: -0.1015987},
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: styledArray
  });

  // Event delegation for dynamically added elements (the popup tweet boxes): listen to parent object (#googlemap) for a click event on the selector, where '.test' is the selector, and then call the function
  $('#googlemap').on('click', '.test', function() {
    // console.log('testing button');
    // console.log($(this).prev().prev().text());
    var data = {screenName: $(this).prev().prev().text()}
    // console.log(data)
      $.ajax({
      // method: 'POST', 
      // url: /whatever
      data: data,
      dataType: 'json'
      }).done(function(response){
    console.log(response);
    })

  //  app.put('/whatever', function(req, res){
      //findorcreate mongoose
      // new Photo // check out heathrow
    // photo.create
  // })

  })

  var socket = io('http://localhost:3000');

  socket.on('connect', function() {
      // console.log('map socket is connected');
  })

  socket.on('tweets', function(toSend) {
    console.log(toSend.tweet.user.screen_name);
    // console.log(toSend.coords[0].latitude)
    // console.log(toSend.coords[0].longitude)
    var tweetLoc = {lat: toSend.coords[0].latitude, lng: toSend.coords[0].longitude}
    // console.log(tweetLoc);
    var iconPic = toSend.tweet.user.profile_image_url

    var contentString = '<div id="content">'+
    '<img src=' + toSend.tweet.user.profile_image_url + '>' +
    '<p>' + toSend.tweet.user.screen_name + '</p>' +
    '<p>' + toSend.tweet.user.name + '</p>' +
    '<p>' + toSend.tweet.text + '</p>' +
    '<button class="test">Test</button>' +
    '</div>';

    // $("#test").on("click", function(){
    //   console.log("Button clicked")
    // })

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    var marker = new google.maps.Marker({
      position: tweetLoc,
      animation: google.maps.Animation.DROP
    });
    marker.setMap(map);
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
  })

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers =[];

  function sendToGoogleMap(tweetLoc) {

    var marker = new google.maps.Marker({
      position: tweetLoc,
      icon: iconPic,
      map: map //,
      // title: 'Hello World!'
    });
      // Create a marker for each place.
    // console.log(marker)
    markers.push(marker);
  }

  // [START region_getplaces]
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
  	console.log(places)
  	// console.log(places)

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
			
		  marker = new google.maps.Marker({
		    map: map,
		    animation: google.maps.Animation.DROP,
		    // position: {lat: 59.327, lng: 18.067}
		  });

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

	lat1 = (latitude + 2).toFixed(2);
	lon1 = (longitude + 2).toFixed(2);
	lat2 = (latitude - 2).toFixed(2);
	lon2 = (longitude - 2).toFixed(2);
	// console.log(lat1, lon1);
	// console.log(lat2, lon2);

    var mapOutput = [lon1, lat1, lon2, lat2]
    
    var mapLocationTEST = mapOutput.map(String)
    
    // var mapLocation = [ '-122.75', '36.8', '-121.75', '37.8' ]

    var mapLocation = [ '-122.75', '36.8', '-121.75', '37.8' ]
    // console.log(mapLocation)
    // console.log(mapLocationTEST)

    var socket = io.connect('http://localhost:3000');

    socket.on('connect', function() {
        // console.log('client has connected');
    });

    socket.emit('mapLocation', mapLocation)
}

sendToTwitter();

// $("pac-input").on('submit', function(e) {
// 	e.preventDefault();
// 	$.get("")
// })

// $(document).ready(function() {
  // console.log('map.js is connected')


  // sendToGoogleMap(tweetLoc)
// })
