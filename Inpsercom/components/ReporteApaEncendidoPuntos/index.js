//'use strict';
var registroAE1;
var registroAEaux;
app.detalleTR = kendo.observable({
    onShow: function () {
        try {
            $("#NoOrdenTR").text(datos_Vehiculo.numeroorden);
            registroAEaux = JSON.parse(localStorage.getItem("registro_AE"));
            for (var t = 0; t < registroAEaux.length; t++){
                registroAEaux[t].FechaInicial = registroAEaux[t].FechaInicial.substr(11, (registroAEaux[t].FechaInicial.length - 11));
                registroAEaux[t].FechaFinal = registroAEaux[t].FechaFinal.substr(11, (registroAEaux[t].FechaFinal.length - 11));
            }
            var descri = (screen.width * 50) / 100;
            var cant = (screen.width * 25) / 100;
            $("#detalleTR").kendoGrid({
                allowCopy: true,
                columns: [
                    { field: "FechaInicial", title: "Hora Inicio", width: cant },
                    { field: "FechaFinal", title: "Hora Fin", width: cant },
                    { field: "Recorrido", title: "Recorrido", width: cant },
                    { field: "TiempoEncendido", title: "Tiempo", width: cant }
                ],
                dataSource: registroAEaux,
                selectable: "row",
                change: function (e) {
                    var selectedRows = this.select();
                    var selectedDataItems = [];
                    for (var i = 0; i < selectedRows.length; i++) {
                        var dataItem = this.dataItem(selectedRows[i]);
                        selectedDataItems.push(dataItem);
                    }
                    registroAE1 = selectedDataItems[0];
                    //alert(inspeccionar(registroPA.lstAlarmas));
                    kendo.mobile.application.navigate("components/ReporteApaEncendido/view.html");
                }
            });
        } catch (e) {
            alert(e);
            mens("Error en servicio Progress", "error");
        }
    },
    afterShow: function () { },
    inicializa: function () { },
    datos: [],
    listViewAEClick: function (e) {
        try {
            //var servicioRA = JSON.stringify(e.dataItem);
            registroAE1 = JSON.stringify(e.dataItem);
            //sessionStorage.setItem("servicioRA", servicioRA);
            //window.location = "index.html#components/DetalleServicio/detalleservicio.html";
            kendo.mobile.application.navigate("components/ReporteApaEncendido/view.html");
        } catch (s) {
            mens("Error selección de registroAE");
        }
    }
});
app.localization.registerView('detalleOT');
