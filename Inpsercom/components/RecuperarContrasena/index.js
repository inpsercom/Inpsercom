'use strict';

app.miKia5 = kendo.observable({
    onShow: function () { },
    afterShow: function () { }
});
app.localization.registerView('miKia5');

// START_CUSTOM_CODE_miKia5
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

function enviarMail() {
    var _mail = document.getElementById("recuperar_email").value;

    if ((_mail) && (_mail != "")) {
        alert("Su contraseña fue enviada al su correo");
    }
}


// END_CUSTOM_CODE_miKia5