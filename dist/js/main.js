"use strict";
'use strict';

var apiKey = 'AIzaSyCKZLId0ArFq5mqIfFrlO8wk_apyDpIUXg';
var submitBtn = document.querySelector('button');

submitBtn.addEventListener('click', function () {
  var inputCity = document.getElementById('map_canvas').value;

  initialize();
  function initialize() {
    var addressInputed = document.getElementById('map_canvas');

    var address = inputCity;
    console.log(address);
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      'address': address
    }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var Lat = results[0].geometry.location.lat();
        var Lng = results[0].geometry.location.lng();
        console.log(Lat);
        console.log(Lng);
        var myOptions = {
          zoom: 11,
          center: new google.maps.LatLng(Lat, Lng)
        };
      } else {
        alert("Something got wrong " + status);
      }
      var request = new XMLHttpRequest();
      request.open('GET', 'http://api.mygasfeed.com/stations/radius/' + '(' + Lat + ')' + '/' + '(' + Lng + ')' + '/(25)/reg/(price)/conrfwfi17.json', true);

      request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
          // Success!
          var data = JSON.parse(request.responseText);
          console.log(data);
          for (var i = 0; i < data.stations.length; i++) {
            console.log(data.stations[i]);
            var gasStation = data.stations[i].station;
            var gasPrice = '$' + data.stations[i].reg_price;
            var gasAddress = data.stations[i].address;
            var gasCity = data.stations[i].city;

            var gasArray = [gasStation, gasPrice, gasAddress, gasCity];

            var ul = document.createElement('ul');
            var liStation = document.getElementById('stationLi');
            var wrap = document.getElementById('contentWrapper');

            for (var x = 0; x < 4; x++) {

              var li = document.createElement('li');
              li.id = 'stationLi';

              wrap.appendChild(ul);
              ul.appendChild(li);
              console.log(x);
              li.textContent = gasArray[x];
            }
          }
        } else {
          // We reached our target server, but it returned an error

        }
      };

      request.onerror = function () {
        // There was a connection error of some sort
      };

      request.send();
    });
  }
});

// google.maps.event.addDomListener(window, "load", initialize);
//# sourceMappingURL=sourcemaps/main.js.map
