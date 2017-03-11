'use strict';
var persona_numero;
app.miKia6 = kendo.observable({
    onShow: function () { },
    afterShow: function () { }
});
app.localization.registerView('miKia6');

// START_CUSTOM_CODE_miKia6
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
function personaGet() {
    var _identificacion = document.getElementById("Identificacion").value;
    if ((_identificacion != "") && (_identificacion)) {
        var Url = "http://190.108.66.10:8089/biss.sherloc/Services/SL/Sherloc/Sherloc.svc/json/" + _identificacion;

        try {
            $.ajax({
                url: Url,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    try {
                        data = JSON.parse(data.PersonaGetResult);

                        if (data.persona_nombre) {
                            document.getElementById("Nombres").value = data.persona_nombre;
                            document.getElementById("Apellidos").value = data.persona_apellido;
                            document.getElementById("email").value = data.mail;
                            document.getElementById("FechaNacimiento").value = data.fecha_nacimiento;
                            document.getElementById("celular").value = data.telefono_celular;
                            persona_numero = data.persona_numero;
                        } else {
                            borraCampos();
                        }
                    } catch (e) {
                        borraCampos();
                    }
                },
                error: function (err) {
                    //alert(JSON.stringify(err));
                }
            });
        } catch (e) {
            alert(e);
        }
    }
}

function registrar() {
    try {
        var identificacion = document.getElementById("Identificacion").value;
        var Nombres = document.getElementById("Nombres").value;
        var Apellidos = document.getElementById("Apellidos").value;
        var email = document.getElementById("email").value;
        var chasis = document.getElementById("Chasis").value;
        var FechaNacimiento = document.getElementById("FechaNacimiento").value;
        var celular = document.getElementById("celular").value;
        var password = document.getElementById("password").value;
        var repassword = document.getElementById("repassword").value;
        var Url = "http://190.108.66.10:8089/biss.sherloc/Services/SL/Sherloc/Sherloc.svc/ClienteSet";
        var params = {
            "secuencia_mv01": 3,
            //identificacion,
            "persona_nombre": Nombres,
            "persona_apellido": Apellidos,
            "mail": email,
            //"chasis": chasis,    
            "fecha_nacimiento": FechaNacimiento,
            "telefono_celular": celular,
            "password": password,
            "persona_numero": persona_numero
            //output: "json"
        };
        var indicador = 0;
        $.each(params, function (k, v) {
            //display the key and value pair
            if ((v == "") || !(v)) { indicador = 1; }
            //alert(k + ' is ' + v);
        });
        if (indicador == 1) { alert("Verificar datos en blanco"); return; }
        alert("valida campos");
        $.ajax({
            url: Url,
            type: "POST",
            data: JSON.stringify(params),
            dataType: "json",
            //Content-Type: application/json
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            success: function (data) {
                try {
                    //debugger;
                    alert(JSON.stringify(data));
                } catch (e) {
                    //debugger;
                    alert(e);
                }
            },
            error: function (err) {
                //debugger;
                alert(JSON.stringify(err));

            }
        });
    }
    catch (e) {
        alert(e);
    }
}

function borraCampos() {
    document.getElementById("Nombres").value = "";
    document.getElementById("Apellidos").value = "";
    document.getElementById("email").value = "";
    document.getElementById("FechaNacimiento").value = "";
    document.getElementById("celular").value = "";
}


// END_CUSTOM_CODE_miKia6