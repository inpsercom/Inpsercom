'use strict';
var NoOrden;
app.miKia2 = kendo.observable({
    onShow: function () {
        //document.getElementById("NoOrden").value = "72363";
        NoOrden = document.getElementById("NoOrden").value;
        if (NoOrden == "") {
            document.getElementById("ubicar").disabled = true;
            document.getElementById("control").disabled = true;
        }
    },
    afterShow: function () { },
    inicializa: function () {
        $("#btn_activar").kendoButton({
            click: function (e) {
                habilitarOpciones();
            }
        });
        $("#ubicar").kendoButton({
            click: function (e) {
                ubicarVehiculo();
            }
        });
        $("#control").kendoButton({
            click: function (e) {
                controlVehiculo();
            }
        });
    }
});
app.localization.registerView('miKia2');

function ubicarVehiculo() {
    try {
        //sessionStorage.setItem("Orden", NoOrden);
        kendo.mobile.application.navigate("components/Ubicacion/view.html");
    } catch (e) {
        alert(e);
    }
}
function controlVehiculo() {
    try {
        kendo.mobile.application.navigate("components/ControlVehiculo/view.html");
    } catch (e) {
        alert(e);
    }
}
function habilitarOpciones() {
    try {
        NoOrden = document.getElementById("NoOrden").value;
        if (NoOrden != "") {
            kendo.ui.progress($("#miKia2Screen"), true);
            //http://190.110.193.131/ClienteService.svc/ClientProfile/8LGJE5520CE010039/R/0992327685001/1234567890/0995545554?orden=72363
            var Url = "http://190.110.193.131/ClienteService.svc/ClientProfile/" + datos_Cliente.chasis + "/R/" + datos_Cliente.identificacion_cliente + "/1234567890/" + datos_Cliente.telefono_celular;
            //var Url = "http://190.110.193.131/ServiceERM.svc/EnviarMensaje/U"; 
            var params = {
                orden: NoOrden,
                output: "json"
            };

            $.ajax({
                url: Url,
                type: "GET",
                data: params,
                dataType: "json",
                success: function (data) {
                    try {
                        if (data.estadoServicio == "A") {
                            document.getElementById("ubicar").disabled = false;
                            document.getElementById("control").disabled = false;
                            kendo.ui.progress($("#miKia2Screen"), false);
                            //grabar esdtado en progress
                            datos_Vehiculo.estado_vh02 = true;
                            datos_Cliente.numeroorden = NoOrden;
                        } else {
                            alert("Cliente no esta activo");
                            document.getElementById("ubicar").disabled = true;
                            document.getElementById("control").disabled = true;
                            datos_Vehiculo.estado_vh02 = false;
                            kendo.ui.progress($("#miKia2Screen"), false);
                        }
                        document.getElementById("NoOrden").value = "";
                        localStorage.setItem("Inp_DatosVehiculo", JSON.stringify(datos_Vehiculo));
                        localStorage.setItem("Inp_DatosUsuario", JSON.stringify(datos_Cliente));
                        datos_Vehiculo = JSON.parse(localStorage.getItem("Inp_DatosVehiculo"));
                        datos_Cliente = JSON.parse(localStorage.getItem("Inp_DatosUsuario"));
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
    } catch (e) {
        alert(e);
    }
}
