'use strict';

app.mntOTs = kendo.observable({
    onShow: function () {
        var fecha = new Date();
        var year = fecha.getFullYear() - 18;
        var mes = fecha.getMonth();
        var dia = fecha.getDate();
        $("#FechaInicio").kendoDatePicker({
            ARIATemplate: "Date: #=kendo.toString(data.current, 'G')#",
            min: new Date(1900, 0, 1)
            //max: new Date(year, mes, dia)
        });
        $("#FechaFin").kendoDatePicker({
            ARIATemplate: "Date: #=kendo.toString(data.current, 'G')#",
            min: new Date(1900, 0, 1)
            //max: new Date(year, mes, dia)
        });
    },
    afterShow: function () { },
    inicializa: function () {

    },
    datos: [],
    listViewClick: function (e) {
        try {
            var servicioOT = JSON.stringify(e.dataItem);
            sessionStorage.setItem("servicio", servicioOT);
            //window.location = "index.html#components/DetalleServicio/detalleservicio.html";
            kendo.mobile.application.navigate("components/DetalleOT/view.html");
        } catch (s) {
            alert("s1 " + s);
        }
    }
});
app.localization.registerView('mntOTs');

function Consultar() {
    /* var dataSource = new kendo.data.DataSource({
         data: [{ Fecha: "2017-03-23", NUmerOT: "590" }, {Fecha: "2017-03-24", NUmerOT: "670" }]
     });
     $("#listView").kendoListView({
         dataSource: dataSource,
         template: "<div>#:Fecha# #:NUmerOT#</div>" ,
         autoBind: false
     });
     dataSource.read(); // "read()" will fire the "change" event of the dataSource and the widget will be bound*/
     if(document.getElementById("FechaInicio").value == "" || !document.getElementById("FechaInicio").value){alert("Fecha inicio no ha sido seleccionada"); return;}
     if(document.getElementById("FechaFin").value == "" || !document.getElementById("FechaFin").value ){alert("Fecha fin no ha sido seleccionada"); return;}
     
    $("#listView").kendoGrid({
        allowCopy: true,
        columns: [
            { field: "Fecha" },
            { field: "NumeroOT" }
        ],
        dataSource: [
            { Fecha: "2017-03-22", NumeroOT: "560" },
            { Fecha: "2017-03-23", NumeroOT: "670" },
            { Fecha: "2017-03-24", NumeroOT: "800" }
        ],
        selectable: "row",
        change: function (e) {
            var selectedRows = this.select();
            var selectedDataItems = [];
            for (var i = 0; i < selectedRows.length; i++) {
                var dataItem = this.dataItem(selectedRows[i]);
                selectedDataItems.push(dataItem);
            }
            var fecha = selectedDataItems[0].Fecha;
            var OT = selectedDataItems[0].NumeroOT;

            alert("Fecha: " + fecha + ", NumeroOT: " + OT);
            kendo.mobile.application.navigate("components/DetalleOT/view.html");
        }
    });
}


// START_CUSTOM_CODE_miKia2
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_miKia2