'use strict';

app.miKia = kendo.observable({
    init: function () {
        $("#btnAgendaCita").kendoButton();
        $("#btnAgendarVin").kendoButton();
        $("#btnHistoriaVin").kendoButton();
        $("#btnLocalizar").kendoButton();
        $("#btnCinfigurarSherlock").kendoButton();
        $("#btnOrdenTrabajo").kendoButton();
        $("#btnControlar").kendoButton();
        $("#btnVehiculos").kendoButton();
        
    },
    onShow: function () {
        try {
            var Registro = sessionStorage.getItem("Registro");
            //var persona_Numero = Registro.persona_Numero;
            //alert("persona" + inspeccionar(Registro));
        } catch (f) { alert(f); }
    },

    afterShow: function () {

    }
});
app.localization.registerView('miKia');
function logout(){
    navigator.app.exitApp();
   //kendo.mobile.application.navigate("components/home/view.html"); 
   
}
function ConfigurarSherlock() {
    kendo.mobile.application.navigate("components/OrdenInstalacion/view.html");
}

function AdmVehiculos() {
    kendo.mobile.application.navigate("components/MantenimientoVehiculos/view.html");
}

function OrdenTrabajo() {
    kendo.mobile.application.navigate("components/OrdenesTrabajo/view.html");
}

// START_CUSTOM_CODE_miKia
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_miKia