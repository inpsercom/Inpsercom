'use strict';
app.logIn = kendo.observable({
    onShow: function () {document.getElementById("email").value = "s@s.com";
    document.getElementById("password").value = "a"; //document.getElementById("id").focus();
    },
    afterShow: function () { }
});
app.localization.registerView('logIn');

// START_CUSTOM_CODE_logIn
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_logIn
(function (parent) {
    var
        logInModel = kendo.observable({
            displayName: '',
            email: '',
            password: '',
            errorMessage: '',
            validateData: function (data) {
                var model = logInModel;
                alert(data.email + ":   :" + data.password);
                if (!data.email && !data.password) {
                    model.set('errorMessage', 'Missing credentials.');
                    return false;
                }

                if (!data.email) {
                    model.set('errorMessage', 'Missing username or email.');
                    return false;
                } else { ValidaMail(); }

                if (!data.password) {
                    model.set('errorMessage', 'Missing password.');
                    return false;
                }

                return true;
            },
            signin: function () {
                try {

                    var em = document.getElementById("email").value;
                    var pa = document.getElementById("password").value;
                    if (em == "" || !em ){alert("El Email no tiene datos");  document.getElementById("email").focus(); return;}
                    if (pa == "" || !pa){ alert("El Password no tiene datos"); document.getElementById("password").focus(); return;}
                    var resul = validaLogin(document.getElementById("email").value, document.getElementById("password").value);
                    if (resul == "false" || resul == "" || !resul) {
                        alert("El ID o password son incorrectos por favor verifique");
                        return;
                    }
                    var usu = validausuario(em); //resultado.Cliente[0].persona_nombre
                    var tipo ="";
                    if (usu.Cliente[0].identificacion_cliente.length == 10){tipo = "C";}
                    else{if(usu.Cliente[0].identificacion_cliente.length == 13){tipo = "R";}
                    else{tipo = "P";}}
                    var Usuario = {
                        chasis: usu.Cliente[0].chasis,//"8LGJE5520CE010039",
                        identificacion_cliente: usu.Cliente[0].identificacion_cliente,  //"0992327685001",
                        tipodocumento: tipo, //"R",
                        uid: "1234567890", // usu.Cliente[0].alta_movil_imei,
                        telefono_celular: usu.Cliente[0].telefono_celular, //"0995545554",
                        numeroorden: "72363"
                    };
                    localStorage.setItem("Inp_DatosUsuario", Usuario);
                    datos_Cliente = Usuario;
                    var veh = validavehiculo(em);
                    var Vehiculo = {
                        secuencia_mv01:  veh.Vehiculo[0].secuencia_mv01, //6,
                        mail: veh.Vehiculo[0].mail, //"nerycarmela@hotmail.com",
                        chasis: veh.Vehiculo[0].chasis, //"19JJDSXSMLSLXS",
                        contrato_tipo: veh.Vehiculo[0].contrato_tipo, //"",
                        contrato_estado: veh.Vehiculo[0].contrato_estado, //false,
                        contrato_fecha_desde: veh.Vehiculo[0].contrato_fecha_desde, //"1900-01-01",
                        contrato_fecha_hasta: veh.Vehiculo[0].contrato_fecha_hasta, //"1900-01-01",
                        estado_vh02: veh.Vehiculo[0].estado_vh02, //false,
                        alta_movil_imei: veh.Vehiculo[0].alta_movil_imei, // "",
                        alta_movil_ip: veh.Vehiculo[0].alta_movil_ip // ""

                    }
                    localStorage.setItem("Inp_DatosVehiculo", Vehiculo);
                    datos_Vehiculo = Vehiculo;
                    kendo.mobile.application.navigate("components/miKia/view.html");
                } catch (s) {
                    alert(s);
                }
            }
        });

    parent.set('logInModel', logInModel);
    parent.set('afterShow', function (e) {
        if (e && e.view && e.view.params && e.view.params.logout) {
            if (localStorage) {
                localStorage.setItem(rememberKey, null);
            } else {
                app[rememberKey] = null;
            }
            logInModel.set('logout', true);
        }
    });
})(app.logIn);
//190.108.66.10
function validaLogin(email, password) {
    var resultado = "";
    var _identificacion = email + ";" + password;
    if ((_identificacion != "") && (_identificacion)) {
        resultado = "";
        var Url = urlService + "/biss.sherloc/Services/SL/Sherloc/Sherloc.svc/Login/" + _identificacion;
        try {
            $.ajax({
                url: Url,
                type: "GET",
                dataType: "json",
                async: false,
                success: function (data) {
                    try {
                        resultado = data.LoginGetResult;
                    } catch (e) {
                        borraCampos();
                    }
                },
                error: function (err) {
                    alert(JSON.stringify(err));
                }
            });
        } catch (e) {
            alert(e);
        }
        return resultado;
    }
}

function validausuario(email) {
    if ((email != "") && (email)) {
        var resultado = "";
        var Url = urlService + "/biss.sherloc/Services/SL/Sherloc/Sherloc.svc/Usuario/" + email;
        try {
            $.ajax({
                url: Url,
                type: "GET",
                dataType: "json",
                async: false,
                success: function (data) {
                    try {
                        resultado = JSON.parse(data.UsuarioGetResult);
                    } catch (e) {
                        borraCampos();
                    }
                },
                error: function (err) {
                    alert(JSON.stringify(err));
                }
            });
        } catch (e) {
            alert(e);
        }
        return resultado;
    }
}

function validavehiculo(email) {
    if ((email != "") && (email)) {
        var resultado = "";
        var Url = urlService + "/biss.sherloc/Services/SL/Sherloc/Sherloc.svc/Vehiculo/" + email;
        try {
            $.ajax({
                url: Url,
                type: "GET",
                dataType: "json",
                async: false,
                success: function (data) {
                    try {
                        resultado = JSON.parse(data.VehiculoGetResult);
                    } catch (e) {
                        borraCampos();
                    }
                },
                error: function (err) {
                    alert(JSON.stringify(err));
                }
            });
        } catch (e) {
            alert(e);
        }
        return resultado;
    }
}

function borraCampos() {
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
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
// START_CUSTOM_CODE_logInModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_logInModel