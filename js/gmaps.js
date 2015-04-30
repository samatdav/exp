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
                console.log(results[0].address_components);
                flag = true;
                var mwords = document.getElementById("map-words");
                mwords.innerHTML = '<div class="slimbox"> <h1>Мы работаем для тебя!</h1> <h2>Зарегистрируйся и получи бесплатную доставку на первый заказ!</h2> <form>  <div class="form-group"> <input required type="email" class="form-control" id="exampleInputEmail1" placeholder="Email"> </div> <div class="form-group"> <input required type="password" class="form-control" id="exampleInputPassword1" placeholder="Пароль"> </div> <button type="submit" class="btn-signin btn btn-primary btn-block">Зарегистрироваться</button> </form>  <p> Уже есть аккаунт? <a class="signup" href="signin.html">Войти</a> </p> </div> </div><style>#map-canvas { opacity: 0.5; } #map-words {height: 100%;}</style>';

            }
            else
            {
                console.log(false);
                flag = false;
                var mwords = document.getElementById("map-words");
                mwords.innerHTML = '<div class="slimbox"> <h1>Мы уже скоро будем тут!</h1> <h2>Оставь свой имейл и мы тебе сразу сообщим об открытии!</h2> <form>  <div class="form-group"> <input required type="email" class="form-control" id="exampleInputEmail1" placeholder="Email"> </div> <button type="submit" class="btn-signin btn btn-primary btn-block">Оставить Email</button> </form>  <p> Уже есть аккаунт? <a class="signup" href="signin.html">Войти</a> </p> </div> </div><style>#map-canvas { opacity: 0.5; } #map-words {height: 100%;}</style>';
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
