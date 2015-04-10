
var jsontext = '{"couriers":[[1, [55.745508, 37.435225]],[2, [55.547962,37.766972]]],"shops":[[55.731272, 37.447198]],"customer":[55.711272, 37.447198]}';
var contact = JSON.parse(jsontext);


var times = [];


var flag = 0;

// Дождёмся загрузки API и готовности DOM.
ymaps.ready(init);

var min = [1000000,-1,-1];

var p;
console.log(times);
function init() {
    var myMap = new ymaps.Map('map', {
            center: [55.745508, 37.435225],
            zoom: 13,
            controls: []
        });

    var promises = [];
    var promise = new ymaps.vow.defer();

    for (var i = 0; i<contact.couriers.length; i++)
    {
        for(var j = 0; j<contact.shops.length; j++)
        {
            var item = [ [parseFloat(contact.couriers[i][1][0]), parseFloat(contact.couriers[i][1][1]) ],
            {point: [parseFloat(contact.shops[j][0]), parseFloat(contact.shops[j][1]) ], type: 'viaPoint'},
            contact.customer];
            promises.push(add(i,j,item));

        }
    }
    p = promises;
    console.log(promises);
    (ymaps.vow.all(promises)).done(print(flag, myMap));
}




function add(i,j,item)
{
    return (ymaps.route(item).then(
    function(route)
    {

        var firstPath = route.getPaths().get(0); // Первый путь
        var firstPathLength = firstPath.getLength(); // Длина первого пути
        var firtstPathTime = firstPath.getTime(); // Время без учета пробок
        time =  firtstPathTime;
        if(time<min[0])
        {
            min = [time,i,j,times.length];
        }
        times.push([i,times.length,time, route]);
        if(times.length == contact.couriers.length*contact.shops.length)
        {
            flag = true;
        }               
    })
        );

}


var ID_COUR = 0;
function print(flag, myMap)
{
    if(!flag)
    {
        setTimeout(function() {
    ID_COUR = (contact.couriers[min[1]][0]);
    route = times[min[2]][3];
     var firstPath = route.getPaths().get(0);
         myMap.geoObjects.add(firstPath);

        var index_courier = min[1];
         var index_shop = min[2];

          var cour = new ymaps.GeoObject({
            // Описание геометрии.
            geometry: {
                type: "Point",
                coordinates: contact.couriers[index_courier][1]
            },
            // Свойства.
            properties: {
                // Контент метки.
                iconContent: 'Курьер'
            }
        }, {
            // Опции.
            // Иконка метки будет растягиваться под размер ее содержимого.
            preset: 'islands#blueStretchyIcon',
            // Метку можно перемещать.
            draggable: false,
        });

          var shop = new ymaps.GeoObject({
            // Описание геометрии.
            geometry: {
                type: "Point",
                coordinates: contact.shops[index_shop]
            },
            // Свойства.
            properties: {
                // Контент метки.
                iconContent: 'Магазин',
                iconColor: '#0095b6'
            }
        }, {
            // Опции.
            // Иконка метки будет растягиваться под размер ее содержимого.
            preset: 'islands#greenStretchyIcon',
            // Метку можно перемещать.
            draggable: false
        });
         

         var cust = new ymaps.GeoObject({
            // Описание геометрии.
            geometry: {
                type: "Point",
                coordinates: contact.customer
            },
            // Свойства.
            properties: {
                // Контент метки.
                iconContent: 'Заказчик'
            }
        }, {
            // Опции.
            // Иконка метки будет растягиваться под размер ее содержимого.
            preset: 'islands#redStretchyIcon',
            // Метку можно перемещать.
            draggable: false
        });
         
         myMap.geoObjects
        .add(cour)
        .add(shop)
        .add(cust);


  }, 500)

    }
}
function getID()
{
    console.log(ID_COUR);
    return ID_COUR;
}





// function startTimer(duration, display) {
//     var timer = duration, minutes, seconds;
//     setInterval(function () {
//         minutes = parseInt(timer / 60, 10);
//         seconds = parseInt(timer % 60, 10);

//         minutes = minutes < 10 ? "0" + minutes : minutes;
//         seconds = seconds < 10 ? "0" + seconds : seconds;

//         display.textContent = minutes + ":" + seconds;

//         if (--timer < 0) {
//             timer = duration;
//         }
//     }, 1000);
// }

// window.onload = function () {
//     var fiveMinutes = min[0],
//         display = document.querySelector('#time');
//     startTimer(fiveMinutes, display);
// };