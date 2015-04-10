ymaps.ready(init);
var myMap, circle;
var objectsInsideCircle;
var p, flag;


function init() {
    myMap = new ymaps.Map("map", {
            center: [55.43, 37.75],
            zoom: 8,
            controls: []

        });
        circle = new ymaps.Circle([[55.75, 37.55], 40000/3.5], null, { draggable: false });
        var searchControl = new ymaps.control.SearchControl({options: { position: { right: 630, top: 110 }, noPlacemark: true}, size: [800, 800]}); 

     mySearchResults = new ymaps.GeoObjectCollection(null, {
            hintContentLayout: ymaps.templateLayoutFactory.createClass('$[properties.name]')
        });
    myMap.controls.add(searchControl);
    myMap.geoObjects.add(mySearchResults);
    // При клике по найденному объекту метка становится красной.

    mySearchResults.events.add('click', function (e) {
        e.get('target').options.set('preset', 'islands#redIcon');
    });
    // Выбранный результат помещаем в коллекцию.
    searchControl.events.add('resultselect', function (e) {
        var index = e.get('index');

        searchControl.getResult(index).then(function (res) {
            objects = ymaps.geoQuery({type: 'Point',
                coordinates: [res.geometry._Lc[0], res.geometry._Lc[1]]
            })
            if( res.geometry._Lc[0] < 55.9 && res.geometry._Lc[0] > 55.6 && res.geometry._Lc[1] < 37.85 && res.geometry._Lc[1]> 37.3)
            {
                console.log(true)
                flag = true;
                var mwords = document.getElementById("map-words");
                mwords.innerHTML = "Мы уже работаем для тебя <br> <form action='main.html'> <input class='btn btn-primary continue' type='submit' value='Продолжить'></form>";

            }
            else
            {
                console.log(res);
                flag = false;
                var mwords = document.getElementById("map-words");
                mwords.innerHTML = "Уже скоро мы будем тут!";
            }
            
           mySearchResults.add(res);
        });
    })
    myMap.geoObjects.add(circle);





}