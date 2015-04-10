var myMap;

// Дождёмся загрузки API и готовности DOM.
ymaps.ready(init);

function init () {
// Создание экземпляра карты и его привязка к контейнеру с
// заданным id ("map").
myMap = new ymaps.Map('map', {
// При инициализации карты обязательно нужно указать
// её центр и коэффициент масштабирования.
center: [55.76, 37.64], // Москва
zoom: 10,
controls: []
});
var searchControl = new ymaps.control.SearchControl({options: { position: { right: 630, top: 110 }}, size: [800, 800] }); 

myMap.controls.add(searchControl);
document.getElementById('destroyButton').onclick = function () {
// Для уничтожения используется метод destroy.
myMap.destroy();
};
}

