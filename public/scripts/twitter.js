
$(document).ready(function() {
  console.log('twitter.js is connected')

  var socket = io('http://localhost:9000');
  var geocoderProvider = 'google';

  socket.on('connect', function() {
      console.log('twitter socket is connected');
  });

  socket.on('tweets', function(tweet) {
    console.log(tweet.place.name + ', ' + tweet.place.country);
  })
})