'use strict';

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

function borraCampos() {
    document.getElementById("Nombres").value = "";
    document.getElementById("Apellidos").value = "";
    document.getElementById("email").value = "";
    document.getElementById("FechaNacimiento").value = "";
    document.getElementById("celular").value = "";
}


// END_CUSTOM_CODE_miKia6