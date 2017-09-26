//'use strict';

app.reactivacionG = kendo.observable({
    onShow: function () {
        //$("#NumeroChasisGA").text(datos_Cliente.chasis);
        // RRP: alias - reactivaciongarantia
        $("#NumeroChasisGA").text(datos_Cliente.nombre_alias);
        
        //document.getElementById("recuperar_email").focus();
        //document.getElementById("recuperar_email").value = datos_Cliente.mail;
    },
    afterShow: function () { }
});
app.localization.registerView('reactivacionG');

function enviarMailG() {
    var documento;
    var _mail = "garantias@kia.com.ec";
    if ((_mail) && (_mail != "")) {
        try {
            if ("garantias@kia.com.ec" != "") {
                var diips = ""; // datos_Cliente.path.toString();
                    for (var i = 0; i < diips.length; i++) {
                        diips = diips.replace(':', '!');
                        diips = diips.replace('/', '-');
                    }
                    documento = "10;" + datos_Cliente.mail + ";;" + diips + ";" + _mail;
                    
                    var envio = EnvioMailGA(documento);
                    if (envio.substring(0, 1) == "0") {
                        mensajePrm("timeAlert", 0, "<img id='autoInpse2'  width='60' height='26' src='resources/Kia-logo.png'>",
                         "ERROR", "<span align='justify'>" + envio.substring(2, envio.length - 2) + "</b></span>", true, true);
                    }
                    mensajePrm("timeAlert", 0, "<img id='autoInpse2'  width='60' height='26' src='resources/Kia-logo.png'>",
                    "AVISO", "<span align='justify'>Muchas gracias por contactarse con nosotros, una persona del Departamento de Servicio a Cliente se comunicará con ud. Para generar la renovación de su garantía.</b></span>" , true);

                    kendo.mobile.application.navigate("components/EstadoMantenimiento/view.html");
                }
            
        } catch (f) { mens("Error validacion mail", "mens"); return; }
    }
}

function EnvioMailGA(documento) {
    try {
        if ((documento !== "") && (documento)) {
            var resultado = "";
            var Url = urlService + "EnvioMail/" + documento;
            $.ajax({
                url: Url,
                type: "GET",
                dataType: "json",
                async: false,
                success: function (data) {
                    try {
                        resultado = data.EnvioMailGetResult;
                    } catch (e) {
                        mensajePrm("timeAlert", 0, "<img id='autoInpse2'  width='60' height='26' src='resources/Kia-logo.png'>",
                     "ERROR", "<span align='justify'>" + data + "</b></span>", true, true);
                        borraCampos(); return;
                    }
                },
                error: function (err) {
                    mens("Error conexion servicio Vehiculo", "mens");
                    return;
                }
            });
            return resultado;
        }
    } catch (f) {
        mens("Error conexion servicio Vehiculo", "mens"); return;
    }
}