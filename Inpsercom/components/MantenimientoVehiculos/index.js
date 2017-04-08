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
                                        { field: "chasis", title: "Vehículo" }
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
    afterShow: function () { 
        validavehiculo(datos_Cliente.mail);},
    inicializa: function () {

    }
});
app.localization.registerView('mntVehiculos');
function grabar() {
    if (document.getElementById("VIN").value == "" || document.getElementById("VIN").value == " ") { alert("esta vacio"); return; }
    var Url = urlService + "/biss.sherloc/Services/SL/Sherloc/Sherloc.svc/ClienteSet";
    var params = {
        "secuencia_mv01": 5,
        "identificacion_cliente": "",
        "persona_nombre": "",
        "persona_apellido": "",
        "mail": datos_Cliente.mail,
        "chasis": document.getElementById("VIN").value,
        "fecha_nacimiento": "",
        "telefono_celular": "",
        "numeroorden": "",
        "password": "",
        "persona_numero": "",
        "alta_movil_imei": ""
        //output: "json"
    };

    $.ajax({
        url: Url, type: "POST", data: JSON.stringify(params), dataType: "json", //Content-Type: application/json
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        success: function (data) {
            try {
                if (data == "Success") {
                    try {
                        mens("Registro Exitoso", "success");
                        document.getElementById("VIN").value = "";
                        validavehiculo(params.mail);
                        return;
                    } catch (s) { alert(s); }
                } else { alert("Error: " + data); }
            } catch (e) { alert(e); }
        },
        error: function (err) { alert(JSON.stringify(err)); }
    });
}
var grid;
function validavehiculo(email) {
    if ((email != "") && (email)) {
        var resultado = "";
        var Url = urlService + "/biss.sherloc/Services/SL/Sherloc/Sherloc.svc/Vehiculo/" + email;
        try {
            $.ajax({
                url: Url, type: "GET", dataType: "json", async: false,
                success: function (data) {
                    try {
                        resultado = JSON.parse(data.VehiculoGetResult).Vehiculo;
                        $("#chasisview").kendoGrid({
                            allowCopy: true,
                            columns: [
                                { field: "mail", title: "Email" },
                                { field: "chasis", title: "Vehículo" },
                                { command: [{ name: "destroy", text: "Eliminar" }] }],
                            dataSource: resultado,
                            editable: { confirmation: "Quieres borrar este registro?" }
                        });
                        grid = $("#chasisview").data("kendoGrid");
                        grid.bind("remove", grid_remove);
                    } catch (e) { alert(e); }
                },
                error: function (err) { alert(JSON.stringify(err)); }
            });
        } catch (e) { alert(e); }
        return resultado;
    }
}
function grid_remove(e) {
    try {
        actualiza("4;" + e.model.mail + ";" + e.model.chasis);
    } catch (s) { alert(s); }
}

function actualiza(chasisemail) {
    var Url = urlService + "/biss.sherloc/Services/SL/Sherloc/Sherloc.svc/EliminaV";
    var params = { "vin": chasisemail };
    $.ajax({
        url: Url, type: "POST", data: JSON.stringify(params), dataType: "json",//Content-Type: application/json
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        success: function (data) {
            try {
                if (data == "Success") {
                    try {
                        mens("Se elimino el registro", "success");
                        return data;
                    } catch (s) { alert(s); }
                } else { alert("Error: " + data); }
            } catch (e) { alert(e); }
        },
        error: function (err) {
            alert(JSON.stringify(err));
        }
    });
}
// START_CUSTOM_CODE_miKia2
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_miKia2