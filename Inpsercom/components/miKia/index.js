'use strict';

app.miKia = kendo.observable({
    init: function () {
       /* try{
        $("#btnAgendaCita").kendoButton();
        $("#btnAgendarVin").kendoButton();
        $("#btnHistoriaVin").kendoButton();
        //$("#btnLocalizar").kendoButton();
        $("#btnCinfigurarSherlock").kendoButton();
        $("#btnOrdenTrabajo").kendoButton();
        //$("#btnControlar").kendoButton();
        $("#btnVehiculos").kendoButton();
        }catch(f){alert(f);}*/
    },
    onShow: function () {
        $("#NumeroChasis").text(datos_Cliente.chasis);
        var Registro = sessionStorage.getItem("Registro");
        /*try {
            $("#Chasis").text(datos_Cliente.chasis);
            var nombre = "Luis";
            mens("Bienvenido", "warning");
            mens(nombre,"error");
            mens("aprob","success");
            var Registro = sessionStorage.getItem("Registro");
            if (intervalo) {
                clearInterval(intervalo);
            }
            
            //var persona_Numero = Registro.persona_Numero;
            //alert("persona" + inspeccionar(Registro));
        } catch (f) { alert(f); }
        try{
        if (datos_Vehiculo.estado_vh02 == false) {
            //document.getElementById("btnLocalizar").disabled = true;
            //document.getElementById("btnControlar").disabled = true;
        } else {
            //document.getElementById("btnLocalizar").disabled = false;
            //document.getElementById("btnControlar").disabled = false;
        }
        }catch(f){alert(f);}*/
    },

    afterShow: function () {

    }
});
app.localization.registerView('miKia');
function logout() {
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

function AgregarVin() {
    kendo.mobile.application.navigate("components/AgregarVin/view.html");
}

function HistorialVin() {
    kendo.mobile.application.navigate("components/OrdenesTrabajo/view.html");
    //kendo.mobile.application.navigate("components/HistorialVin/view.html");
}

function AgendarCita() {
    kendo.mobile.application.navigate("components/AgendarCita/view.html");
}

function LocalizarKia() {
    kendo.mobile.application.navigate("components/Ubicacion/view.html");
    //kendo.mobile.application.navigate("components/LocalizarAuto/view.html");
}

function ControlarKia() {
    kendo.mobile.application.navigate("components/ControlarAuto/view.html");
}
// START_CUSTOM_CODE_miKia
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_miKia