app.reporteApaEnce = kendo.observable({
    onShow: function () {
        $("#NoOrdenAE1").text(datos_Cliente.nombre_alias+": "+datos_Vehiculo.numeroorden);
        colorAE.push(["#c0392b"]);
        colorAE.push(["#1f618d"]);
        colorAE.push(["#f1c40f"]);
        colorAE.push(["#27ae60"]);
        colorAE.push(["#1c2833"]);
        colorAE.push(["#2e86c1"]);
        colorAE.push(["#a04000"]);
        colorAE.push(["#e74c3c"]);
        colorAE.push(["#99a3a4"]);
        colorAE.push(["#186a3b"]);
        //initMapAE();
        initMap();
    },
    afterShow: function () { },
    inicializa: function () { }
});
app.localization.registerView('reporteApaEnce');
function initMap() {
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;
    var height = (screen.height * 25.46875) / 100;
    var height1 = screen.height - height; //resto el valor en px que corresponde al % que sobra 
    document.getElementById("mapapen").style.height = height1 + "px";
    mapAE = new google.maps.Map(document.getElementById('mapapen'), {
        zoom: 14,
        center: { lat: parseFloat(registroAE1.LatitudInicial), lng: registroAE1.LongitudInicial },
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    directionsDisplay.setMap(mapAE);
    calculateAndDisplayRoute(directionsService, directionsDisplay);
    //document.getElementById('mode').addEventListener('change', function() {
    //calculateAndDisplayRoute(directionsService, directionsDisplay);
    //});
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    var selectedMode = "DRIVING"; //document.getElementById('mode').value;
    directionsService.route({
        origin: { lat: parseFloat(registroAE1.LatitudInicial), lng: parseFloat(registroAE1.LongitudInicial) },  // Haight.
        destination: { lat: parseFloat(registroAE1.LatitudFinal), lng: parseFloat(registroAE1.LongitudFinal) },  // Ocean Beach.
        // Note that Javascript allows us to access the constant
        // using square brackets and a string value as its
        // "property."
        travelMode: google.maps.TravelMode[selectedMode]
    }, function (response, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            mens('Directions request failed due to ' + status,"mens");return;
        }
    });
}










var infoWindow;
var mapAE;
var nombre = [];
var colorAE = [];
function initMapAE() {
    var height = (screen.height * 25.46875) / 100;
    var height1 = screen.height - height; //resto el valor en px que corresponde al % que sobra 
    document.getElementById("mapapen").style.height = height1 + "px";
    mapAE = new google.maps.Map(document.getElementById('mapapen'), {
        zoom: 12,
        center: { lat: -0.202408333333333, lng: -78.4929966666667 },
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    google.maps.event.addListener(mapAE, 'click', function () {
        closeInfoWindow();
    });
    setMarkersAE(mapAE);
    rutasFR(mapAE);
}

var beachesAE = [];
var beachesAEF = [];
function closeInfoWindow() {
    infoWindow.close();
}

function setMarkersAE(mapAE) {
    try {
        //contruccion marcas
        beachesAE = [];
        var tama = registroAE.lstRecorridos.length;
        if (tama > 15) { registroAE.lstRecorridos.length = 15; }
        for (var i = 0; i < registroAE.lstRecorridos.length; i++) {
            beachesAE.push([parseFloat(registroAE.lstRecorridos[i].LatitudInicial), parseFloat(registroAE.lstRecorridos[i].LongitudInicial),
            registroAE.lstRecorridos[i].KilometrajeInicial, registroAE.lstRecorridos[i].FechaInicial, registroAE.lstRecorridos[i].Recorrido]);

            beachesAEF.push([parseFloat(registroAE.lstRecorridos[i].LatitudFinal), parseFloat(registroAE.lstRecorridos[i].LongitudFinal),
            registroAE.lstRecorridos[i].KilometrajeFinal, registroAE.lstRecorridos[i].FechaFinal, registroAE.lstRecorridos[i].TiempoEncendido]);

        }
        var shape = {
            coords: [1, 1, 1, 20, 18, 20, 18, 1],

            type: 'poly'
        };
        for (var i = 0; i < beachesAE.length; i++) {
            var beachAE = beachesAE[i];
            var beachAEF = beachesAEF[i];
            var markerAE = new google.maps.Marker({
                position: { lat: beachAE[0], lng: beachAE[1] },
                map: mapAE,
                icon: 'resources/icy_road.png',
                shape: shape,
                nombre: "marcado" + i
            });
            var markerAEF = new google.maps.Marker({
                position: { lat: beachAEF[0], lng: beachAEF[1] },
                map: mapAE,
                icon: 'resources/icy_road.png',
                shape: shape,
                nombre: "marcado" + i
            });
            google.maps.event.addListener(markerAE, 'click', (function (markerAE, i) {
                return function () {
                    infowindow = new google.maps.InfoWindow({
                        content: '<div style="text-align:center;">' +
                        '<b>Fecha y Hora Inicial </b><br/>' +
                        beachesAE[i][3] +
                        '<p><b>Kilometraje Inicial</b></p>' +
                        '<p>' + beachesAE[i][2] + ' KM</p>' +
                        '<p><b>Recorrido</b></p>' +
                        '<p>' + beachesAE[i][4] + ' </p>' +
                        '</div>'
                    });
                    infowindow.open(mapAE, markerAE);
                }
            })(markerAE, i));
            google.maps.event.addListener(markerAEF, 'click', (function (markerAEF, i) {
                return function () {
                    infowindow = new google.maps.InfoWindow({
                        content: '<div style="text-align:center;">' +
                        '<b>Fecha y Hora Final </b><br/>' +
                        beachesAEF[i][3] +
                        '<p><b>Kilometraje Final</b></p>' +
                        '<p>' + beachesAEF[i][2] + ' KM</p>' +
                        '<p><b>Tiempo Encendido</b></p>' +
                        '<p>' + beachesAEF[i][4] + ' </p>' +
                        '</div>'
                    });
                    infowindow.open(mapAE, markerAEF);
                }
            })(markerAEF, i));
        }
    } catch (e) { mens("error al cargar marcas en el mapa","mens"); }
}

function rutasFR(mapAE) {
    for (var h = 0; h < registroAE.lstRecorridos.length; h++) {
        var ruta = [
            new google.maps.LatLng(registroAE.lstRecorridos[h].LatitudInicial, registroAE.lstRecorridos[h].LongitudInicial),
            new google.maps.LatLng(registroAE.lstRecorridos[h].LatitudFinal, registroAE.lstRecorridos[h].LongitudFinal)
        ];
        var lineas = new google.maps.Polyline({
            path: ruta,
            map: mapAE,
            strokeColor: colorAE[h],
            strokeWeight: 4,
            strokeOpacity: 0.6,
            clickable: false
        });
    }
}