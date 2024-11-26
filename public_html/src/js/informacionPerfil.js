const initialCoordinates = { lat: 42.8392017, lng: -2.6771089 };
let map;
function initMap() {
    map = new google.maps.Map(document.getElementById("mapa"), {
        center: initialCoordinates,
        zoom: 15,
    });
    new google.maps.Marker({
        position: initialCoordinates,
        map: map,
        title: "Ubicación inicial",
    });
}
