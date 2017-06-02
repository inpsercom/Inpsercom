var registroPN;
app.reportePanicos = kendo.observable({
    onShow: function () {
        try { 
            $("#NoOrdenPN").text(datos_Vehiculo.numeroorden);  
            registroPN = "";
            var wd = (screen.width / 2) - 30;
            var wx = wd - 15;
            document.getElementById("FechaInicioPN").style.width = wd + "px";
            document.getElementById("FechaFinPN").style.width = wd + "px";
            var fecha = new Date();
            var year = fecha.getFullYear();
            var mes = fecha.getMonth();
            var dia = fecha.getDate();

            $("#FechaInicioPN").kendoDatePicker({
                ARIATemplate: "Date: #=kendo.toString(data.current, 'G')#",
                min: new Date(1900, 0, 1),
                value: new Date(),
                format: "dd-MM-yyyy",
                max: new Date(year, mes, dia)
            });
            $("#FechaFinPN").kendoDatePicker({
                ARIATemplate: "Date: #=kendo.toString(data.current, 'G')#",
                min: new Date(1900, 0, 1),
                max: new Date(year, mes, dia),
                value: new Date(),
                format: "dd-MM-yyyy"
            });
            //document.getElementById("FechaInicio").value = "01-01-1910";
            //ConsultarOT();
            //document.getElementById("FechaInicio").value = document.getElementById("FechaFin").value;*/
        } catch (e) { mens("Error en fechas", "error"); }
    },
    afterShow: function () { },
    inicializa: function () {
    },
    datos: [],
    listViewPNClick: function (e) {
        try {
            //var servicioRA = JSON.stringify(e.dataItem);
            registroPN = JSON.stringify(e.dataItem);
            //sessionStorage.setItem("servicioRA", servicioRA);
            //window.location = "index.html#components/DetalleServicio/detalleservicio.html";
            kendo.mobile.application.navigate("components/ReportePanico/view.html");
        } catch (s) {
            mens("Error selección de registroPN");
        }
    }
});
app.localization.registerView('reportePanicos');
function regresaPN(){
    registroPN = "";
    $("#listViewPN").kendoGrid().dataSource = "";
    kendo.mobile.application.navigate("components/MenuAlertas/view.html");
}

function traeCordenadasUbicaPN() {
    try {
        var cords = [];
        var FechaRecEX = document.getElementById("FechaInicioPN").value;
        var FechaRecEX1 = document.getElementById("FechaFinPN").value;;
        var ordenUsuario = datos_Vehiculo.numeroorden; //sessionStorage.getItem("Orden");
        var Url = "http://190.110.193.131/ReportService.svc/ReporteEventoPanico/" + FechaRecEX + "/" + FechaRecEX1;
        var params = {
            orden: ordenUsuario,
            output: "json"
        };
        $.ajax({
            url: Url,
            type: "GET",
            data: params,
            dataType: "json",
            async: false,
            success: function (data) {
                try {
                    if (tipoReporte == "E") { data = data.ReporteExVelocidadResult.lstReporteAlarmas; }
                    if (tipoReporte == "P") { data = data.ReporteEventoPanicoResult.lstReporteAlarmas; }
                    if (tipoReporte == "G") { data = data.ReporteEventoPanicoResult.lstReporteAlarmas; }
                    if (tipoReporte == "S") { data = data.ReporteParadasResult.lstReporteAlarmas; }
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].totalRegistros != "0") {
                            cords.push({
                                Fecha: data[i].Fecha,
                                totalRegistros: data[i].totalRegistros,
                                valorMaximoRegistrado: data[i].valorMaximoRegistrado,
                                limiteVelocidadActual: data[i].limiteVelocidadActual,
                                lstAlarmas: data[i].lstAlarmas
                            });
                        }
                    }
                } catch (e) {
                    mens("Error coordenadas servicio sherloc", "error");
                }
            },
            error: function (err) {
                mens("Error servicio sherloc", "error");
            }
        });
        var fechaU = (screen.width * 22) / 100;
        var Lati = (screen.width * 28) / 100;
        var Kilo = (screen.width * 26) / 100;
        $("#listViewPN").kendoGrid({
            allowCopy: true,
            columns: [
                { field: "Fecha", title: "Fecha", width: Lati },
                { field: "totalRegistros", title: "Excesos", width: Kilo },
                { field: "valorMaximoRegistrado", title: "Velocidad", width: Kilo },
                { field: "limiteVelocidadActual", title: "Lim Veloc.", width: fechaU }
            ],
            dataSource: cords,
            selectable: "row",
            change: function (e) {
                var selectedRows = this.select();
                var selectedDataItems = [];
                for (var i = 0; i < selectedRows.length; i++) {
                    var dataItem = this.dataItem(selectedRows[i]);
                    selectedDataItems.push(dataItem);
                }
                registroPN = selectedDataItems[0];
                //alert(inspeccionar(registroPA.lstAlarmas));
                kendo.mobile.application.navigate("components/ReportePanico/view.html");
            }
        });
    } catch (d) {
        mens("Error en servicio sherloc", "error");
    }
}