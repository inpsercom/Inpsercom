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
    //var _mail = document.getElementById("recuperar_email").value;

    //if ((_mail) && (_mail != "")) {
    try {
        /*if (document.getElementById("recuperar_email").value != "") {
            var result = /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(document.getElementById("recuperar_email").value);
            if (result == false) {
                document.getElementById("recuperar_email").focus();
                document.getElementById("recuperar_email").style.borderColor = "red";
            } else {*/
        //mens2("<spam style='align:justify;background-color:white;'><i class='fa fa-file-text' aria-hidden='true'></i>&nbsp;&nbsp;<b> Muchas gracias por contactarse con nosotros, una persona del departamento de Servicio se contactará con ud. Para generar la renovación de su garantía.</span></b>");
        mensajePrm("timeAlert", 0, "<img id='autoInpse2'  width='60' height='26' src='resources/Kia-logo.png'>",
            "AVISO", "<span align='justify'>Muchas gracias por contactarse con nosotros, una persona del Departamento de Servicio se contactará con ud. Para generar la renovación de su garantía.</b></span>" , true);

        /*mens("Muchas gracias por contactarse con nosotros,"," ");
        mens("una persona del departamento de Servicio se "," "); 
        mens("contactará con ud. para generar la renovación"," ");
        mens("de su garantía."," ");*/
        kendo.mobile.application.navigate("components/EstadoMantenimiento/view.html");
        //}
        //}
    } catch (f) { mens("Error validacion mail", "mens");return; }
    //}
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
                    } catch (s) { mens("Error servicio login", "mens"); return; } //alert (s); 
                }
                else { mens(data, "mens");return; }
            },
            error: function (err) { mens("Error en servicio cliente", "mens"); return; } //alert(err);
        });
    } catch (e) { mens("Error en el servicio clientess", "mens"); return; } //aler(e);
    return data;
}
