'use strict';
var resultado = "";
app.logIn = kendo.observable({
    onShow: function () { },
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
            emailss: function () {
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
            },
            signin: function () {
                try {
                    var resultado2 = validaLogin(document.getElementById("email").value, document.getElementById("password").value);
                    if (resultado2 == "false" || resultado2 == "" || !resultado2) {
                        return;
                    }
                    resultado = "";
                    var Usuario = {
                        chasis: "8LGJE5520CE010039",
                        identificacion: "0992327685001",
                        tipodocumento: "R",
                        udid: "1234567890",
                        telefono_celular: "0995545554",
                        numeroorden: "72363"
                    };
                    localStorage.setItem("Inp_DatosUsuario", Usuario);

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
    var resultado1 = "";
    var _identificacion = email + ";" + password;
    if ((_identificacion != "") && (_identificacion)) {
        resultado = "";
        var Url = "http://IPS10:8089/biss.sherloc/Services/SL/Sherloc/Sherloc.svc/Login/" + _identificacion;
        try {
            $.ajax({
                url: Url,
                type: "GET",
                dataType: "json",
                async: false,
                success: function (data) {
                    try {
                        resultado1 = data.LoginGetResult;
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
        return resultado1;
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