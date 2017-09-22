'use strict';

app.miKia5 = kendo.observable({
    onShow: function () { document.getElementById("recuperar_email").focus(); },
    afterShow: function () { }
});
app.localization.registerView('miKia5');

function enviarMail() {
    var _mail = document.getElementById("recuperar_email").value;
    var data = "";
    if ((_mail) && (_mail != "")) {
        try {
            if (document.getElementById("recuperar_email").value != "") {
                var result = /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(document.getElementById("recuperar_email").value);

                if (result == false) {
                    document.getElementById("recuperar_email").focus();
                    document.getElementById("recuperar_email").style.borderColor = "red";
                } else {
                    document.getElementById("recuperar_email").style.borderColor = "";
                    var d = registrarMail();
                    document.getElementById("recuperar_email").value = "";
                    kendo.mobile.application.navigate("components/logIn/view.html");
                }
            }
        } catch (f) { mens("Error validacion mail", "mens"); return;}
    }
}

function registrarMail() {
    try {
        var data = "";
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
                        mens("Su clave fue enviada a su correo", "success");
                    } catch (s) { mens("Error servicio login", "mens");return;  } //alert (s); 
                }
                else {
                    
                    if(data.substring(0,1) == "0") {data = data.substring(2, data.length);}
                    mensajePrm("timeAlert", 0, "<img id='autoInpse2'  width='60' height='26' src='resources/Kia-logo.png'>",
                         "Advertencia", "<span align='justify'>" + data + "</b></span>", true, true); return;
                }
            },
            error: function (err) { mens("Error en servicio cliente", "mens"); return; } //alert(err);
        });
    } catch (e) { mens("Error en el servicio clientes", "mens"); return; } //aler(e);
    return data;
}
