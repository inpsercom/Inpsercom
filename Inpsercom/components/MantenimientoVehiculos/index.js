//'use strict';

app.mntVehiculos = kendo.observable({
    onShow: function () {
        try {
            $("#NumeroChasisRV").text(datos_Cliente.chasis);
            var email = datos_Cliente.mail;
            if ((email != "") && (email)) {
                actualizaAsignar();
            }
        } catch (d) {
            mens("Error servicio cliente", "mens");return;
        }

    },
    afterShow: function () {
        validavehiculo(datos_Cliente.mail);
    },
    inicializa: function () {
        try {
            $("#nuevochasisview").kendoGrid({
                columns: [
                    { field: "mail", title: "Email" },
                    { field: "chasis", title: "Vehículo" }
                ],
                selectable: "row"
            });
            $("#nuevochasisview").data("kendoGrid").bind("change", grid_Change);

            $("#chasisview").kendoGrid({
                allowCopy: true,
                columns: [
                    { field: "mail", title: "Email" },
                    { field: "chasis", title: "Vehículo" },
                    { command: [{ name: "destroy", text: "Eliminar" }] }],
                editable: { confirmation: "Quieres borrar este registro?" }
            });
            grid = $("#chasisview").data("kendoGrid");
            grid.bind("remove", grid_remove);
        } catch (e) { mens("actualizar vehículo", "mens"); return;}
    }
});
app.localization.registerView('mntVehiculos');
function grid_Change(e) {
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
        //datos_Cliente = JSON.parse(localStorage.getItem("Inp_DatosUsuario"));
        datos_Vehiculo.chasis = registro.chasis;
        datos_Vehiculo.numeroorden = registro.numeroorden;
        localStorage.setItem("Inp_DatosVehiculo", JSON.stringify(datos_Vehiculo));
        //datos_Vehiculo = JSON.parse(localStorage.getItem("Inp_DatosVehiculo"));
        kendo.mobile.application.navigate("components/miKia/view.html");
    } catch (f) { mens("Error servicio actualizar vehículo", "mens");return; }
}

function actualizaAsignar() {
    try {
        var grid = $("#nuevochasisview").data("kendoGrid");
        var email = datos_Cliente.mail;
        var resultado = "";
        var Url = urlService + "Vehiculo/" + email;
        $.ajax({
            url: Url,
            type: "GET",
            dataType: "json",
            async: false,
            success: function (data) {
                try {
                    resultado = JSON.parse(data.VehiculoGetResult).Vehiculo;
                    var dataSource = new kendo.data.DataSource({
                        data: resultado
                    });
                    grid.setDataSource(dataSource);

                } catch (e) {
                    //alert(inspeccionar(e));
                    mens("Error servicio actualizar vehículo", "mens");return;
                }
            },
            error: function (err) {
                //alert(err);
                mens("Error conexión al servicio vehículo", "mens");return; //alert(JSON.stringify(err));
            }
        });
    } catch (d) {
        //alert(d);
        mens("Error servicio actualizar vehículo", "mens");return;
    }
}
function grabar() {
    try {
        if (document.getElementById("VIN").value == "" || document.getElementById("VIN").value == " ") { mens("esta vacio","mens"); return; }
        var Url = urlService + "ClienteSet";
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
                if (data == "Success") {
                    try {
                        mens("Registro Exitoso", "mens");
                        document.getElementById("VIN").value = "";
                        actualizaAsignar();
                        validavehiculo(params.mail);
                    } catch (s) { mens("Error serrvicio actualizar vehículo", "mens");return; }
                } else {
                    mens(data, "mens");return;
                }
            },
            error: function (err) {
                mens("Error conexión servicio vehículo", "mens");return;
            }
        });
    } catch (e) { mens("Error servicio grabar vehículo", "mens");return; }
}
var grid;
function validavehiculo(email) {
    try {
        if ((email != "") && (email)) {
            var resultado = "";
            var Url = urlService + "Vehiculo/" + email;
            var grid = $("#chasisview").data("kendoGrid");
            $.ajax({
                url: Url, type: "GET", dataType: "json", async: false,
                success: function (data) {
                    try {
                        resultado = JSON.parse(data.VehiculoGetResult).Vehiculo;
                        var dataSource = new kendo.data.DataSource({
                            data: resultado
                        });
                        grid.setDataSource(dataSource);
                    } catch (e) { mens("Error servicio vehículo", "mens"); return;}
                },
                error: function (err) {
                    mens("Error conexión servicio vehículo", "mens");return;
                }
            });
            return resultado;
        }
    } catch (e) { mens("Error servicio vehículo", "mens");return; }
}
function grid_remove(e) {
    try {
        actualiza("4;" + e.model.mail + ";" + e.model.chasis);
        if (e.model.chasis == datos_Cliente.chasis) {
            datos_Cliente.chasis = "";
            localStorage.setItem("Inp_DatosUsuario", JSON.stringify(datos_Cliente));
        }
    } catch (s) { mens("Error al eliminar vehículo", "mens"); return;}
}

function actualiza(chasisemail) {
    try {
        var Url = urlService + "EliminaV";
        var params = { "vin": chasisemail };
        $.ajax({
            url: Url, type: "POST", data: JSON.stringify(params), dataType: "json",//Content-Type: application/json
            headers: { 'Content-Type': 'application/json;charset=UTF-8' },
            success: function (data) {
                if (data == "Success") {
                    mens("Se elimino el registro", "mens");
                    actualizaAsignar();
                } else { mens(data, "mens"); return;}
            },
            error: function (err) { mens("Error servicio actualizar vehículo", "mens"); return;}
        });
    } catch (e) { mens("Error servicio eliminar vehículo", "mens");return; }
}