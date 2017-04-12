//'use strict';
var directionsDisplay;
var directionsService;
var map2, geocoder;
app.mntControlVehiculo = kendo.observable({
    onShow: function () {
        try {
            var fec1 = new Date();
            var fecha1 = fec1.getDate() + "-" + (fec1.getMonth() + 1) + "-" + fec1.getFullYear();
            var mensa = "De: " + fecha1 + " Hasta: " + fecha1;
            $("#recorrido").text(mensa);
            //Calculo el % a restar al alto total de la pantalla para que el mapa se ajuste correctamente al 100%
            var height = (screen.height * 25.46875) / 100;
            var height1 = screen.height - height; //resto el valor en px que corresponde al % que sobra 
            document.getElementById("mapA").style = "height:" + height1 + "px";

            var cords = traeCordenadas();
            var len = cords.length - 1;

            var latuno = parseFloat(cords[0].Latitud);
            var lnguno = parseFloat(cords[0].Longitud);
            var latfin = parseFloat(cords[len].Latitud);
            var lngfin = parseFloat(cords[len].Longitud);
            var latlng = [];

            var PosVehi = { lat: latuno, lng: lnguno };

            directionsDisplay = new google.maps.DirectionsRenderer;
            directionsService = new google.maps.DirectionsService;

            map2 = new google.maps.Map(document.getElementById('mapA'), {
                zoom: 16,
                center: PosVehi
            });

            directionsDisplay.setMap(map2);
            geocoder = new google.maps.Geocoder;
            if (len > 9) { len = 9; }
            var bandera = 1;
            for (var n = 1; n < len; n++) {
                latlng.push({
                    location: parseFloat(cords[n].Latitud) + "," + parseFloat(cords[n].Longitud),
                    stopover: true
                })
                /*if (bandera == 8) {
                    alert(bandera);
                    calculateAndDisplayRoute2(directionsService, directionsDisplay, latuno, lnguno, latlng, latfin, lngfin);
                    bandera = 1;
                } else { bandera = bandera + 1; }*/
            }
            calculateAndDisplayRoute2(directionsService, directionsDisplay, latuno, lnguno, latlng, latfin, lngfin);
        } catch (f) {
            alert(f);
        }
    },
    afterShow: function () { },
    inicializa: function () {

    }
});
app.localization.registerView('mntControlVehiculo');

function traeCordenadas() {
    try {
        var cords;
        var ordenUsuario = datos_Vehiculo.numeroorden; //sessionStorage.getItem("Orden");
        var fec = new Date();
        var fecha = fec.getDate() + "-" + (fec.getMonth() + 1) + "-" + fec.getFullYear();
        //var Url = "http://190.110.193.131/ServiceERM.svc/Historico/04-04-2017/05-04-2017?" + ordenUsuario; + fecha + "/" + fecha + "?"
        var Url = "http://190.110.193.131/ServiceERM.svc/Historico/06-04-2017/07-04-2017?"  + ordenUsuario;
        //alert(Url1 + " " + Url);
        var params = {
            orden: ordenUsuario,
            output: "json"
        };
        $.ajax({
            url: Url,
            type: "GET",
            data: params,
            dataType: "json",
            async: false,
            success: function (data) {
                try {
                    cords = data.HistoricoResult.lstHistorico;
                } catch (e) { alert(e); }
            },
            error: function (err) { alert(JSON.stringify(err)); }
        });
        return (cords);
    } catch (d) { alert(d); }
}


// START_CUSTOM_CODE_miKia2
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
function calculateAndDisplayRoute2(directionsService, directionsDisplay, lat1, long1, puntosInt, lat2, long2) {
    try {

        var selectedMode = "DRIVING";

        var request = {
            origin: { lat: lat1, lng: long1 },
            destination: { lat: lat2, lng: long2 },
            waypoints: puntosInt,
            travelMode: google.maps.TravelMode.DRIVING
        };
        directionsService.route(request, function (result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(result);
            } else {
                alert('Directions request failed due to ' + status);
            }
        });
    } catch (k) {
        alert("k " + k);
    }
}
// END_CUSTOM_CODE_miKia2