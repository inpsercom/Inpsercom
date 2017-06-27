//11:30 -12:15
//'use strict';
var NoOrden;
app.ordenBasico = kendo.observable({
    onShow: function () {
        try {
            //document.getElementById("NoOrdenn").value = "";
            $("#NoOrdenBA").text(datos_Vehiculo.numeroorden);
            NoOrden = datos_Vehiculo.numeroorden;
            if (NoOrden == "") {
                kendo.ui.progress($("#btnHabilita"), true);
            }
        } catch (f) { mens("Error número de orden","mens");return; }
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
    }
});
app.localization.registerView('ordenBasico');

function ubicarVehiculo() {
        kendo.mobile.application.navigate("components/Ubicacion/view.html");
        //kendo.mobile.application.navigate("components/ReporteExceso/view.html");
}

function controlVehiculo() {
    kendo.mobile.application.navigate("components/ControlVehiculo/view.html");
}

function habilitarOpciones() {
    try { 
        var NoOrden1 = datos_Vehiculo.numeroorden; //document.getElementById("NoOrdenn").value;
        if (NoOrden1 != "") {
            var Url = "http://190.110.193.131/ClienteService.svc/ClientProfile/" + datos_Cliente.chasis + "/R/" + datos_Cliente.identificacion_cliente + "/1234567890/" + datos_Cliente.telefono_celular;
            //var params = { orden: NoOrden1, output: "json" }; data: params,
            $.ajax({
                url: Url, type: "GET",  dataType: "json",async: false,
                success: function (data) {
                    try {
                        data1 = data.perfilClienteResult;
                        if (data1.estadoServicio == "A") {
                            var chasisemail = "3;" + datos_Cliente.mail + ";" + datos_Vehiculo.chasis + ";" + data1.orden;
                            var Url = urlService + "EliminaV";
                            var params = { "vin": chasisemail };
                            $.ajax({
                                url: Url, type: "POST", data: JSON.stringify(params), dataType: "json", //Content-Type: application/json
                                headers: { 'Content-Type': 'application/json;charset=UTF-8' },
                                success: function (data) {
                                    try {
                                        if (data == "Success") {
                                            try {
                                                kendo.ui.progress($("#btnHabilita"), false);
                                                kendo.ui.progress($("#miKia2Screen"), false);
                                                datos_Vehiculo.estado_vh02 = true;
                                                datos_Vehiculo.numeroorden = data.orden
                                                //document.getElementById("NoOrdenn").value = "";
                                                $("#NoOrden").text(datos_Vehiculo.numeroorden);
                                                mens("Orden Guardada", "success");
                                            } catch (s) { mens("Error consulta sherloc","mens"); return;}
                                        } else { mens(data,"mens"); return;}//kendo.ui.progress($("#miKia2Screen"), false);  }
                                    } catch (e) { mens("Error servicio sherloc","mens");return; }
                                },
                                error: function (err) {
                                    mens("Error conexión Sherloc","mens");return;
                                }
                            });
                        } else {
                            mens("Cliente no esta activo", "mens");
                            datos_Vehiculo.numeroorden = "";
                            datos_Vehiculo.estado_vh02 = false;
                            kendo.ui.progress($("#btnHabilita"), true);
                            //kendo.ui.progress($("#miKia2Screen"), false);
                            return;
                        }
                        document.getElementById("NoOrden").value = "";
                        localStorage.setItem("Inp_DatosVehiculo", JSON.stringify(datos_Vehiculo));
                        localStorage.setItem("Inp_DatosUsuario", JSON.stringify(datos_Cliente));
                        datos_Vehiculo = JSON.parse(localStorage.getItem("Inp_DatosVehiculo"));
                        datos_Cliente = JSON.parse(localStorage.getItem("Inp_DatosUsuario"));
                    } catch (e) {
                        mens("Error servicio Sherloc","mens");return;
                        //kendo.ui.progress($("#miKia2Screen"), false);
                    }
                },
                error: function (err) {
                    mens("Error servicio Sherloc","mens");return;
                    //kendo.ui.progress($("#miKia2Screen"), false);
                }
            });
        }
    } catch (e) {mens("Error servicio Sherloc","mens");return;}
}

function registra(chasisemail) {
    try {
        var Url = urlService + "EliminaV";
        var params = { "vin": chasisemail };
        $.ajax({
            url: Url, type: "POST", data: JSON.stringify(params), dataType: "json", //Content-Type: application/json
            headers: { 'Content-Type': 'application/json;charset=UTF-8' },
            success: function (data) {
                if (data == "Success") {
                        try {
                            mens("Orden Guardada", "success");
                            return data;
                        } catch (s) { mens("Error al grabar orden","mens"); return;}
                    } else { mens(data,"mens");return; }
            },
            error: function (err) {
                mens("Error servicio grabar orden","mens");return;
            }
        });
    } catch (f) { mens("Error servicio grabar orden","mens");return; }
}