//'use strict';

app.miKia4 = kendo.observable({
    onShow: function() {$("#NoOrdenDB").text(datos_Vehiculo.numeroorden);},
    afterShow: function() {},
});
app.localization.registerView('miKia4');

function regresar(){
    if (datos_Vehiculo.tipoContratoSherloc == "GOLDEN") {
        kendo.mobile.application.navigate("components/OrdenInstalacion/view.html");
    } else { kendo.mobile.application.navigate("components/OrdenInstalacionBasico/view.html"); }
}

function aperturaRemota(){
    try {
        //NoOrden = 72353;
        if (NoOrden != "") {
            mens("AUTO ABIERTO LAS PUERTAS","warning");
            /*kendo.ui.progress($("#miKia2Screen"), true);
            //http://190.110.193.131/ClienteService.svc/ClientProfile/8LGJE5520CE010039/R/0992327685001/1234567890/0995545554?orden=72363
            //var Url = "http://190.110.193.131/ClienteService.svc/ClientProfile/" + datos_Cliente.chasis + "/R/" + datos_Cliente.identificacion_cliente + "/1234567890/" + datos_Cliente.telefono_celular;
            var Url = "http://190.110.193.131/ServiceERM.svc/EnviarMensaje/A?" + NoOrden; 
            var params = {
                orden: NoOrden,
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
                        //alert(inspeccionar(data));
                    } catch (e) {
                        alert(e);
                        kendo.ui.progress($("#miKia2Screen"), false);
                    }
                },
                error: function (err) {
                    alert(JSON.stringify(err));
                    kendo.ui.progress($("#miKia2Screen"), false);
                }
            });*/
        }
    } catch (e) {
        mens("Error de servicios Sherloc", "mens");return;
    }
}

function desbloqueAuto(){
    try {
        //NoOrden = 72353;
        if (NoOrden != "") {
            mens("AUTO DESBLOQUEADO");
            /*kendo.ui.progress($("#miKia2Screen"), true);
            //http://190.110.193.131/ClienteService.svc/ClientProfile/8LGJE5520CE010039/R/0992327685001/1234567890/0995545554?orden=72363
            //var Url = "http://190.110.193.131/ClienteService.svc/ClientProfile/" + datos_Cliente.chasis + "/R/" + datos_Cliente.identificacion_cliente + "/1234567890/" + datos_Cliente.telefono_celular;
            var Url = "http://190.110.193.131/ServiceERM.svc/EnviarMensaje/D?" + NoOrden; 
            var params = {
                orden: NoOrden,
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
                        //alert(inspeccionar(data));
                    } catch (e) {
                        alert(e);
                        kendo.ui.progress($("#miKia2Screen"), false);
                    }
                },
                error: function (err) {
                    alert(JSON.stringify(err));
                    kendo.ui.progress($("#miKia2Screen"), false);
                }
            });*/
        }
    } catch (e) {
        mens("Error de servicios Sherloc", "mens");return;
    }
}

function bloqueAuto() {
    try {
        //NoOrden = 72353;
        if (NoOrden != "") {
            mens("AUTO BLOQUEADO");
            /*kendo.ui.progress($("#miKia2Screen"), true);
            //http://190.110.193.131/ClienteService.svc/ClientProfile/8LGJE5520CE010039/R/0992327685001/1234567890/0995545554?orden=72363
            //var Url = "http://190.110.193.131/ClienteService.svc/ClientProfile/" + datos_Cliente.chasis + "/R/" + datos_Cliente.identificacion_cliente + "/1234567890/" + datos_Cliente.telefono_celular;
            var Url = "http://190.110.193.131/ServiceERM.svc/EnviarMensaje/B?" + NoOrden; 
            var params = {
                orden: NoOrden,
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
                        
                    } catch (e) {
                        alert(e);
                        kendo.ui.progress($("#miKia2Screen"), false);
                    }
                },
                error: function (err) {
                    alert(JSON.stringify(err));
                    kendo.ui.progress($("#miKia2Screen"), false);
                }
            });*/
        }
    } catch (e) {
        mens("Error de servicios Sherloc", "mens");return;
    }
}