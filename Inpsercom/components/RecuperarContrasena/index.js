'use strict';

app.miKia5 = kendo.observable({
    onShow: function () { document.getElementById("recuperar_email").focus(); },
    afterShow: function () { }
});
app.localization.registerView('miKia5');

function enviarMail() {
    var _mail = document.getElementById("recuperar_email").value;

    if ((_mail) && (_mail != "")) {
        try {
            if (document.getElementById("recuperar_email").value != "") {
                var result = /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(document.getElementById("recuperar_email").value);

                if (result == false) {
                    document.getElementById("recuperar_email").focus();
                    document.getElementById("recuperar_email").style.borderColor = "red";
                } else {
                    document.getElementById("recuperar_email").style.borderColor = "";
                    var d = registrar();
                    document.getElementById("recuperar_email").value = "";
                    kendo.mobile.application.navigate("components/logIn/view.html");
                }
            }
        } catch (f) { mens("Error validacion mail", "error"); }
    }
}

function registrar() {
    try {
        var Url = urlService + "ClienteSet";
        var params = {
            "secuencia_mv01": 6,
            "identificacion_cliente": 0,
            "persona_nombre": "0",
            "persona_apellido": "0",
            "mail": document.getElementById("recuperar_email").value,
            "chasis": "0",
            "fecha_nacimiento": "0",
            "telefono_celular": "0",
            "password": "0",
            "persona_numero": "0"
        };
        var indicador = 0;
        /* $.each(params, function (k, v) {
             //display the key and value pair
             if (v == "") {
                 indicador = 1;
                 //alert(k + ' esta en blanco ' + v);
             }
         });
         if (indicador == 1) {
             alert("Verificar datos en blanco"); return;
         }*/
        $.ajax({
            url: Url,
            type: "POST",
            data: JSON.stringify(params),
            async: false,
            dataType: "json",
            //Content-Type: application/json
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            success: function (data) {
                if (data == "Success") {
                    try {
                        mens("Su contraseña fue enviada al su correo", "success");
                    } catch (s) { mens("Error servicio login", "error"); alert(s); } //alert (s); 
                }
                else { mens(data, "error"); }
            },
            error: function (err) { mens("Error en servicio cliente", "error"); alert(err); } //alert(err);
        });
    } catch (e) { mens("Error en el servicio clientess", "error"); alert(e); } //aler(e);
    return data;
}
