
$(document).ready(function() {
  // console.log('twitter.js is connected')

  var socket = io('http://localhost:3000');

  socket.on('connect', function() {
      // console.log('twitter socket is connected');
  });

  socket.on('tweets', function(toSend) {
    console.log(toSend.tweet)
    // console.log(tweet.place.name + ', ' + tweet.place.country);
    // console.log(toSend.tweet.id)
    // console.log(toSend.tweet.text)
    // console.log(toSend.tweet.id)
    // console.log(toSend.tweet.user.name)
    // console.log(toSend.coords)

    // var geocoderPlaceName = tweet.place.name + ', ' + tweet.place.country

    // geocoder.geocode(geocoderPlaceName, function(err, res) {
    //   console.log(res);
    // });
  })
})