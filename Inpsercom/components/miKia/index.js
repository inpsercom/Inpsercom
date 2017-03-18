'use strict';

app.miKia = kendo.observable({
    onShow: function () {
        try {

            var ancho = screen.width / 4;
            ancho = ancho + "px";

            document.getElementById("btnAgendaCita").style = "width:" + ancho + "margin:0px";
            document.getElementById("btnAgendarVin").style = "width:" + ancho + "margin:0px";
            document.getElementById("btnHistoriaVin").style = "width:" + ancho + "margin:0px";
            document.getElementById("btnLocalizar").style = "width:" + ancho + "margin:0px";

            var Registro = sessionStorage.getItem("Registro");
            //var persona_Numero = Registro.persona_Numero;
            alert("persona" + inspeccionar(Registro));
        } catch (f) { alert(f); }
    },

    afterShow: function () {

    }
});
app.localization.registerView('miKia');
function ConfigurarSherlock(){
    kendo.mobile.application.navigate("components/OrdenInstalacion/view.html");
}


// START_CUSTOM_CODE_miKia
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_miKia