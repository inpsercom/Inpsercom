//'use strict';

app.envioPrefactura = kendo.observable({
    onShow: function () {
       // $("#NumeroChasisPR").text(datos_Cliente.chasis);

        // RRP: alias - envioprefactura
        $("#NumeroChasisPR").text(datos_Cliente.nombre_alias);
        
        document.getElementById("recuperar_emailPR").focus();
        document.getElementById("recuperar_emailPR").value = datos_Cliente.mail;
        //document.getElementById("cameraTakePicture").addEventListener("click", cameraTakePicture); 

    },
    afterShow: function () { }
});
app.localization.registerView('envioPrefactura');
/*function cameraGetPicture() {
   navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY
   });

   function onSuccess(imageURL) {
      var image = document.getElementById('myImage');
      image.src = imageURL;
   }

   function onFail(message) {
      alert('Failed because: ' + message);
   }

}*/


function enviarMailPR() {
    var documento;
    var _mail = document.getElementById("recuperar_emailPR").value;
    if ((_mail) && (_mail != "")) {
        try {
            if (document.getElementById("recuperar_emailPR").value != "") {
                var result = /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(document.getElementById("recuperar_emailPR").value);
                if (result == false) {
                    document.getElementById("recuperar_emailPR").focus();
                    document.getElementById("recuperar_emailPR").style.borderColor = "red";
                } else {
                    var diips = datos_Cliente.path.toString();
                    for(var i = 0; i < diips.length; i++){
                        diips = diips.replace(':','!');
                        diips = diips.replace('/','-');
                    }
                    documento = "7;" + datos_Cliente.mail + ";;" + diips + ";" + _mail;
                    var envio = EnvioMailPRE(documento);
                    if (envio.substring(0, 1) == "0") {
                        mensajePrm("timeAlert", 0, "<img id='autoInpse2'  width='60' height='26' src='resources/Kia-logo.png'>",
                         "ERROR", "<span align='justify'>" + envio.substring(2, envio.length - 2) + "</b></span>", true, true);
                    }
                    mens("Prefactura enviada al correo especificado", "mens");
                    kendo.mobile.application.navigate("components/AgregarVin/view.html");
                }
            }
        } catch (f) { mens("Error validacion mail", "mens");return; }
    }
}

function EnvioMailPRE(documento) {
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
                        borraCampos();return;
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
        mens("Error conexion servicio Vehiculo", "mens");return;
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
                        mens("Su clave fue enviada al su correo", "mens");
                    } catch (s) { mens("Error servicio login", "mens"); return; }  
                }
                else {
                    mensajePrm("timeAlert", 0, "<img id='autoInpse2'  width='60' height='26' src='resources/Kia-logo.png'>",
                     "Advertencia", "<span align='justify'>" + data + "</b></span>", true, true);
                }
            },
            error: function (err) { mens("Error en servicio cliente", "mens");  return;} 
        });
    } catch (e) { mens("Error en el servicio clientes", "mens"); return; } 
    return data;
}
