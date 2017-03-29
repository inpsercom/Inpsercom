'use strict';
var persona_numero ="0";
app.miKia6 = kendo.observable({
    onShow: function () {
        var fecha = new Date();
        var year = fecha.getFullYear() - 18;
        var mes = fecha.getMonth();
        var dia = fecha.getDate();
        $("#FechaNacimiento").kendoDatePicker({
            ARIATemplate: "Date: #=kendo.toString(data.current, 'G')#",
            min: new Date(1900, 0, 1),
            max: new Date(year, mes, dia)
        });
        document.getElementById("btnRegistrar").disabled = true;
        //document-getElementById("identificacion").focus();
    },
    afterShow: function () { }
});
app.localization.registerView('miKia6');

// START_CUSTOM_CODE_miKia6
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
function personaGet() {
    var _identificacion = document.getElementById("identificacion").value;
    if ((_identificacion != "") && (_identificacion)) {
        var Url = urlService +  "/biss.sherloc/Services/SL/Sherloc/Sherloc.svc/json/" + _identificacion;

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
        var identificacion = document.getElementById("identificacion").value;
        var Nombres = document.getElementById("Nombres").value;
        var Apellidos = document.getElementById("Apellidos").value;
        var email = document.getElementById("email").value;
        var chasis = document.getElementById("Chasis").value;
        var FechaNacimiento = document.getElementById("FechaNacimiento").value;
        var celular = document.getElementById("celular").value;
        var password = document.getElementById("password").value;
        var repassword = document.getElementById("repassword").value;
        var numorden = document.getElementById("numorden").value;
        var Url = urlService + "/biss.sherloc/Services/SL/Sherloc/Sherloc.svc/ClienteSet";
        var params = {
            "secuencia_mv01": 3,
            "identificacion_cliente": identificacion,
            "persona_nombre": Nombres,
            "persona_apellido": Apellidos,
            "mail": email,
            "chasis": chasis,
            "fecha_nacimiento": FechaNacimiento,
            "telefono_celular": celular,
            "numeroorden": numorden,
            "password": password,
            "persona_numero": persona_numero,
            "alta_movil_imei": Device_identifier
            //output: "json"
        };
        localStorage.setItem("Inp_DatosUsuario", params);
        
        
        //kendo.mobile.application.navigate("components/miKia/view.html");
        var indicador = 0;
        $.each(params, function (k, v) {
            //display the key and value pair
            if (v == "") {
                indicador = 1;
                alert(k + ' is ' + v);
            }

        });
        if (indicador == 1) {
            alert("Verificar datos en blanco"); return;
        }

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
                    if (data == "Success") {
                        try {
                            alert("Registro Exitoso");
                            sessionStorage.setItem("Registro", params);
                            kendo.mobile.application.navigate("components/home/view.html");
                            return;
                        } catch (s) {
                            alert(s);
                        }
                    }
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

function ValidaMail() {
    try {
        if (document.getElementById("email").value != "") {
            var result = /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(document.getElementById("email").value);

            if (result == false) {
                document.getElementById("email").focus();
                document.getElementById("email").style.borderColor = "red";
            } else {
                document.getElementById("email").style.borderColor = "";
            }
        }
    } catch (f) { alert(f); }
}
function ValidaCelular() {
    try {
        if (document.getElementById("celular").value != "") {
            var result = /[09][0-9]{9}$/.test(document.getElementById("celular").value);
            if (result == false) {
                document.getElementById("celular").focus();
                document.getElementById("celular").style.borderColor = "red";
            } else {
                document.getElementById("celular").style.borderColor = "";
            }
        }
    }
    catch (f) { alert(f); }
}
function ValidaPassword() {
    var pass = document.getElementById("password").value;
    var repass = document.getElementById("repassword").value;
    if (pass == repass) {
        document.getElementById("btnRegistrar").disabled = false;
        document.getElementById("repassword").style.borderColor = "";
    }
    else {
        document.getElementById("btnRegistrar").disabled = true;
        document.getElementById("repassword").style.borderColor = "red";
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