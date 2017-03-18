'use strict';

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

                if (!data.email && !data.password) {
                    model.set('errorMessage', 'Missing credentials.');
                    return false;
                }

                if (!data.email) {
                    model.set('errorMessage', 'Missing username or email.');
                    return false;
                }

                if (!data.password) {
                    model.set('errorMessage', 'Missing password.');
                    return false;
                }

                return true;
            },
            signin: function () {
                try {
                    var Usuario = {
                        chasis:"8LGJE5520CE010039",
                        identificacion:"0992327685001",
                        tipodocumento:"R",
                        udid:"1234567890",
                        telefono_celular:"0995545554",
                        orden:"72363"
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

// START_CUSTOM_CODE_logInModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_logInModel