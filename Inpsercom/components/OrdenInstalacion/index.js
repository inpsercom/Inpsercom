'use strict';
var NoOrden;
app.miKia2 = kendo.observable({
    onShow: function () {
        document.getElementById("NoOrden").value = "72363";
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
        sessionStorage.setItem("Orden", NoOrden);
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
                        } else {
                            alert(inspeccionar(data));
                            kendo.ui.progress($("#miKia2Screen"), false);
                        }
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

// START_CUSTOM_CODE_miKia2
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_miKia2