'use strict';
var NoOrden;
app.miKia2 = kendo.observable({

    onShow: function () {
        try {
            $("#NoOrden").text(datos_Vehiculo.numeroorden);
            NoOrden = datos_Vehiculo.numeroorden;
            if (NoOrden == "") {
                kendo.ui.progress($("#btnHabilita"), true);
                /*document.getElementById("ubicar").disabled = true;
                document.getElementById("recorrer").disabled = true;
                document.getElementById("control").disabled = true;*/
            }
        } catch (f) { alert(f); }
    },
    afterShow: function () { },
    inicializa: function () {
        $("#btn_activar").kendoButton({
            click: function (e) { habilitarOpciones(); }
        });
        $("#ubicar").kendoButton({
            click: function (e) { ubicarVehiculo(); }
        });
        $("#control").kendoButton({
            click: function (e) { controlVehiculo(); }
        });
        $("#recorrer").kendoButton({
            click: function (e) { recorrerAuto(); }
        });
    }
});
app.localization.registerView('miKia2');

function ubicarVehiculo() {
    try {
        //sessionStorage.setItem("Orden", NoOrden);
        kendo.mobile.application.navigate("components/Ubicacion/view.html");
    } catch (e) { alert(e); }
}

function recorrerAuto() {
    kendo.mobile.application.navigate("components/ControlarAuto/view.html");
}

function controlVehiculo() {
    try {
        kendo.mobile.application.navigate("components/ControlVehiculo/view.html");
    } catch (e) { alert(e); }
}

function habilitarOpciones() {
    try { 
        var NoOrden1 = document.getElementById("NoOrdenn").value;
        if (NoOrden1 != "") {
            kendo.ui.progress($("#miKia2Screen"), true);
            //http://190.110.193.131/ClienteService.svc/ClientProfile/8LGJE5520CE010039/R/0992327685001/1234567890/0995545554?orden=72363
            var Url = "http://190.110.193.131/ClienteService.svc/ClientProfile/" + datos_Cliente.chasis + "/R/" + datos_Cliente.identificacion_cliente + "/1234567890/" + datos_Cliente.telefono_celular;
            //var Url = "http://190.110.193.131/ServiceERM.svc/EnviarMensaje/U";
            //alert(Url);
            var params = { orden: NoOrden1, output: "json" };
            $.ajax({
                url: Url, type: "GET", data: params, dataType: "json",async: false,
                success: function (data) {
                    try {
                        if (data.estadoServicio == "A") {
                            var chasisemail = "3;" + datos_Cliente.mail + ";" + datos_Vehiculo.chasis + ";" + NoOrden1;
                            var Url = urlService + "/biss.sherloc/Services/SL/Sherloc/Sherloc.svc/EliminaV";
                            var params = { "vin": chasisemail };
                            $.ajax({
                                url: Url, type: "POST", data: JSON.stringify(params), dataType: "json", //Content-Type: application/json
                                headers: { 'Content-Type': 'application/json;charset=UTF-8' },
                                success: function (data) {
                                    try {
                                        if (data == "Success") {
                                            try {
                                                kendo.ui.progress($("#btnHabilita"), false);
                                                /*document.getElementById("ubicar").disabled = false;
                                                document.getElementById("recorrer").disabled = false;
                                                document.getElementById("control").disabled = false;*/
                                                kendo.ui.progress($("#miKia2Screen"), false);
                                                datos_Vehiculo.estado_vh02 = true;
                                                datos_Vehiculo.numeroorden = NoOrden1;
                                                document.getElementById("NoOrdenn").value = "";
                                                $("#NoOrden").text(datos_Vehiculo.numeroorden);
                                                mens("Orden Guardada", "success");
                                            } catch (s) { alert(s); }
                                        } else { kendo.ui.progress($("#miKia2Screen"), false); alert("Error: " + data); }
                                    } catch (e) { alert(e); }
                                },
                                error: function (err) {
                                    alert(JSON.stringify(err));
                                }
                            });
                        } else {
                            mens("Cliente no esta activo", "error");
                            kendo.ui.progress($("#btnHabilita"), true);
                            /*document.getElementById("ubicar").disabled = true;
                            document.getElementById("control").disabled = true;*/
                            datos_Vehiculo.estado_vh02 = false;
                            datos_Vehiculo.numeroorden = "";
                            kendo.ui.progress($("#miKia2Screen"), false);
                        }
                        document.getElementById("NoOrden").value = "";
                        localStorage.setItem("Inp_DatosVehiculo", JSON.stringify(datos_Vehiculo));
                        localStorage.setItem("Inp_DatosUsuario", JSON.stringify(datos_Cliente));
                        datos_Vehiculo = JSON.parse(localStorage.getItem("Inp_DatosVehiculo"));
                        datos_Cliente = JSON.parse(localStorage.getItem("Inp_DatosUsuario"));
                        //alert(inspeccionar(datos_Vehiculo));
                        //alert(inspeccionar(datos_Cliente));
                    } catch (e) {
                        alert(e);
                        kendo.ui.progress($("#miKia2Screen"), false);
                    }
                },
                error: function (err) {
                    alert(JSON.stringify(err));
                    kendo.ui.progress($("#miKia2Screen"), false);
                }
            });
        }
    } catch (e) {alert(e);}
}

function registra(chasisemail) {
    try {
        var Url = urlService + "/biss.sherloc/Services/SL/Sherloc/Sherloc.svc/EliminaV";
        var params = { "vin": chasisemail };
        $.ajax({
            url: Url, type: "POST", data: JSON.stringify(params), dataType: "json", //Content-Type: application/json
            headers: { 'Content-Type': 'application/json;charset=UTF-8' },
            success: function (data) {
                try {
                    if (data == "Success") {
                        try {
                            mens("Orden Guardada", "success");
                            return data;
                        } catch (s) { alert(s); }
                    } else { alert("Error: " + data); }
                } catch (e) { alert(e); }
            },
            error: function (err) {
                alert(JSON.stringify(err));
            }
        });
    } catch (f) { alert(f); }
}
