var geocoder;
var map;
function initialize() {

  var markers = [];
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  // var defaultBounds = new google.maps.LatLngBounds(
  //     new google.maps.LatLng(55.668495, 37.280803),
  //     new google.maps.LatLng(55.668495, 37.280803));
  // map.fitBounds(defaultBounds);

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var searchBox = new google.maps.places.SearchBox(input);

  // Listen for the event fired when the user selects an item from the
  // pick list. Retrieve the matching places for that item.
  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var place = searchBox.getPlaces()[0];
   
    if (!place.geometry) return;

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }
  });

  // Bias the SearchBox results towards places that are within the bounds of the
  // current map's viewport.
  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });



  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(55.668495, 37.280803);
  var mapOptions = {
    zoom: 16,
    disableDefaultUI: true,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}



function codeAddress() {
  var address = document.getElementById('pac-input').value;
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
      console.log(results[0].geometry.location.lat());
      if( results[0].geometry.location.lat() < 55.670552 && results[0].geometry.location.lat() > 55.66246 && results[0].geometry.location.lng() < 37.296839 && results[0].geometry.location.lng() > 37.264609)
            {
                console.log(true)
                flag = true;
                var mwords = document.getElementById("map-words");
                mwords.innerHTML = "Мы уже работаем для тебя <br> <form action='main.html'> <input class='btn btn-primary continue' type='submit' value='Продолжить'></form>";

            }
            else
            {
                console.log(false);
                flag = false;
                var mwords = document.getElementById("map-words");
                mwords.innerHTML = "Уже скоро мы будем тут!";
            }
    } else {
      alert('Пожалуйста, введите свой адрес сверху страницы и нажмите Enter');
    }
  });
}

$("html").keypress(function(e) {
    if(e.which == 13) {
        // alert('You pressed enter!');
    // $("#go").click();
    codeAddress();
    }
});

google.maps.event.addDomListener(window, 'load', initialize);
