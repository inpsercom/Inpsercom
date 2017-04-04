'use strict';
var map, marker, color, icon;
app.miKia3 = kendo.observable({
    onShow: function () {
        try {
            var cords = traeCordenadas();
            var PosVehi = { lat: parseFloat(cords.Latitud), lng: parseFloat(cords.Longitud) };

            //Calculo el % a restar al alto total de la pantalla para que el mapa se ajuste correctamente al 100%
            var height = (screen.height * 25.46875) / 100;
            var height1 = screen.height - height; //resto el valor en px que corresponde al % que sobra 
            document.getElementById("map").style = "height:" + height1 + "px";

            color = "red";

            if (cords.ApagadoEncendido == 0) {
                color = "black";
            }
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 16,
                center: PosVehi
            });
            icon = {
                path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                strokeColor: color,
                strokeWeight: 3,
                scale: 6,
                rotation: parseFloat(cords.Sentido)
            };
            marker = new google.maps.Marker({
                position: PosVehi,
                map: map,
                icon: icon,
                label: "Velocidad: " + cords.Velocidad + " KMpH"
            });
        } catch (s) {
            alert(s);
        }
    },
    afterShow: function () { }
});
app.localization.registerView('miKia3');
var intervalo;
function reload() {
    try {
        intervalo = window.setInterval(function () {
            reload2()
        }, 1000);

    } catch (f) {
        alert(f);
    }
}
function reload2() {
    try {
        var cords = traeCordenadas();

        var PosVehi = new google.maps.LatLng(
            cords.Latitud,
            cords.Longitud
        );
        color = "red";

        if (cords.ApagadoEncendido == 0) {
            color = "black";
        }
        icon = {
            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            strokeColor: color,
            strokeWeight: 3,
            scale: 6,
            rotation: parseFloat(cords.Sentido)
        };
        marker.setIcon(icon);
        marker.setLabel("Velocidad: " + cords.Velocidad + " KMpH");
        marker.setPosition(PosVehi);

        map.panTo(PosVehi);
        if (color == "black") {
            if (intervalo) {
                clearInterval(intervalo);
            }
        }
    } catch (f) {
        alert(f);
    }
}
// START_CUSTOM_CODE_miKia3
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_miKia3


function traeCordenadas() {
    try {
        var cords;
        var ordenUsuario = datos_Vehiculo.numeroorden; //sessionStorage.getItem("Orden");
        var Url = "http://190.110.193.131/ServiceERM.svc/EnviarMensaje/U?" + ordenUsuario;

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
                    cords = data.EnviarMensajeResult;
                } catch (e) {
                    alert(e);
                }
            },
            error: function (err) {
                alert(JSON.stringify(err));
            }
        });
        return (cords);
    } catch (d) {
        alert(d);
    }
}