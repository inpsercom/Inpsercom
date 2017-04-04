'use strict';

app.mntVehiculos = kendo.observable({
    onShow: function () {
        try {
            var email = datos_Cliente.mail;
            if ((email != "") && (email)) {
                var resultado = "";
                var Url = urlService + "/biss.sherloc/Services/SL/Sherloc/Sherloc.svc/Vehiculo/" + email;
                try {
                    $.ajax({
                        url: Url,
                        type: "GET",
                        dataType: "json",
                        async: false,
                        success: function (data) {
                            try {
                                resultado = JSON.parse(data.VehiculoGetResult).Vehiculo;
                                $("#nuevochasisview").kendoGrid({
                                    columns: [
                                        { field: "mail", title: "Email" },
                                        { field: "chasis", title: "VIN" }
                                    ],
                                    dataSource: resultado,
                                    selectable: "row",
                                    change: function (e) {
                                        try {
                                            var selectedRows = this.select();
                                            var selectedDataItems = [];
                                            for (var i = 0; i < selectedRows.length; i++) {
                                                var dataItem = this.dataItem(selectedRows[i]);
                                                selectedDataItems.push(dataItem);
                                            }
        
                                            registro = selectedDataItems[0];
                                            datos_Cliente.chasis = registro.chasis;
                                            localStorage.setItem("Inp_DatosUsuario", JSON.stringify(datos_Cliente));
                                            datos_Cliente = JSON.parse(localStorage.getItem("Inp_DatosUsuario"));
                                            datos_Vehiculo.chasis = registro.chasis;
                                            datos_Vehiculo.numeroorden = registro.numeroorden;
                                            localStorage.setItem("Inp_DatosVehiculo", JSON.stringify(datos_Vehiculo));
                                            datos_Vehiculo = JSON.parse(localStorage.getItem("Inp_DatosVehiculo"));
                                            kendo.mobile.application.navigate("components/miKia/view.html");
                                        } catch (f) { alert(f); }
                                    }
                                });
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
                return resultado;
            }
        } catch (d) {
            alert(d);
        }
    },
    afterShow: function () { },
    inicializa: function () {

    }
});
app.localization.registerView('mntVehiculos');

// START_CUSTOM_CODE_miKia2
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_miKia2