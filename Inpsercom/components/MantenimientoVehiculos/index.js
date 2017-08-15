//'use strict';
var acepta;
var ind = 0;
app.mntVehiculos = kendo.observable({
    onShow: function () {
        try {
            acepta = "no"; // RRP: confirmar

            //   $("#NumeroChasisRV").text(datos_Cliente.chasis);
            // RRP: alias
            kendo.ui.progress($("#miKiaScreen"), true);
            $("#NumeroChasisRV").text(datos_Cliente.nombre_alias);

            var email = datos_Cliente.mail;
            if ((email != "") && (email)) {
                actualizaAsignar();
            }
        } catch (d) {
            mens("Error servicio cliente", "mens"); return;
        }

    },
    afterShow: function () {
        validavehiculo(datos_Cliente.mail);
    },
    inicializa: function () {
        try {
            var obs = (screen.width * 15) / 100;
            var alias = (screen.width * 30) / 100;
            var vin = (screen.width * 50) / 100;
            $("#nuevochasisview").kendoGrid({
                columns: [
                    { field: "nombre_alias", title: "Alias", width: alias },
                    { field: "chasis", title: "Vehículo", width: vin }
                ],
                selectable: "row"
            });
            $("#nuevochasisview").data("kendoGrid").bind("change", grid_Change);

            $("#chasisview").kendoGrid({
                allowCopy: true,
                columns: [
                    { field: "nombre_alias", title: "Alias", width: alias },
                    { field: "chasis", title: "Vehículo", width: vin },
                    {
                        width: obs,
                        command: [{ name: "destroy",template: "<div><span><i onclick='grid_remove(this)' class='fa fa-trash' style='width: 100%;color:red;'></i></span></div>",
                    width: obs}] 
                        //text: ".", className: "btnRojoDelete" }]
                    }],
                editable: {
                    confirmation: function (e) {
                        if (ind = 1) {
                            grid_remove(e);
                            //mensajePrmOpc("timeAlert", 0, "<img id='autoInpse2'  width='60' height='26' src='resources/Kia-logo.png'>",
                            //    "AVISO", "Quieres borrar el registro<br><br>" , true);  fa fa-trash
                        }
                        e.preventDefault();
                    }
                }
            });
            grid = $("#chasisview").data("kendoGrid");
            grid.bind("remove", grid_remove);
            /*{ command: { name: "destroy", template: "<div><span><i onclick='grid_remove(this)' class='fa fa-trash' style='width: 25%;color:red;'></i></span></div>",
                    width: obs}
                }]
            });*/
            ind = 1;
        } catch (e) { mens("actualizar vehículo", "mens"); return; }
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

        datos_Cliente.nombre_alias = registro.nombre_alias; //RRP
        localStorage.setItem("Inp_DatosUsuario", JSON.stringify(datos_Cliente));
        datos_Vehiculo.chasis = registro.chasis;
        datos_Vehiculo.nombre_alias = registro.nombre_alias;
        datos_Vehiculo.numeroorden = registro.numeroorden;
        localStorage.setItem("Inp_DatosVehiculo", JSON.stringify(datos_Vehiculo));
        $("#NumeroChasisRV").text(datos_Cliente.nombre_alias);
        //datos_Vehiculo = JSON.parse(localStorage.getItem("Inp_DatosVehiculo"));
        //kendo.mobile.application.navigate("components/miKia/view.html");
    } catch (f) { mens("Error servicio actualizar vehículo", "mens"); return; }
}

function actualizaAsignar() {
    try {
        var grid = $("#nuevochasisview").data("kendoGrid");
        var grid1 = $("#chasisview").data("kendoGrid");
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
                    var dataSource = new kendo.data.DataSource({ data: resultado });
                    grid.setDataSource(dataSource);
                    grid1.setDataSource(dataSource);
                } catch (e) {
                    mens("Error servicio actualizar vehículo", "mens"); return;
                }
            },
            error: function (err) {
                mens("Error conexión al servicio vehículo", "mens"); return; //alert(JSON.stringify(err));
            }
        });
    } catch (d) {
        mens("Error servicio actualizar vehículo", "mens"); return;
    }
}
function grabar() {
    try {
        if (document.getElementById("VIN").value == "" || document.getElementById("VIN").value == " ") { mens("Vehículo esta vacio", "mens"); return; }
        var Url = urlService + "ClienteSet";
        var params = {
            "secuencia_mv01": 5,
            "identificacion_cliente": "",
            "persona_nombre": "",
            "persona_apellido": "",
            "mail": datos_Cliente.mail,
            "chasis": document.getElementById("VIN").value,
            "nombre_alias": document.getElementById("Alias").value,
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
                        document.getElementById("Alias").value = "";
                        actualizaAsignar();
                        validavehiculo(params.mail);
                    } catch (s) { mens("Error serrvicio actualizar vehículo", "mens"); return; }
                } else {
                    mens(data, "mens"); return;
                }
            },
            error: function (err) {
                mens("Error conexión servicio vehículo", "mens"); return;
            }
        });
    } catch (e) { mens("Error servicio grabar vehículo", "mens"); return; }
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
                    } catch (e) { mens("Error servicio vehículo", "mens"); return; }
                },
                error: function (err) {
                    mens("Error conexión servicio vehículo", "mens"); return;
                }
            });
            return resultado;
        }
    } catch (e) { mens("Error servicio vehículo", "mens"); return; }
}
function grid_remove(e) {
    try {
        acepta = e;
        mensajePrmOpc("timeAlert", 0, "<img id='autoInpse2'  width='60' height='26' src='resources/Kia-logo.png'>",
           "AVISO", "Esta seguro de borrar el registro<br><br>", true);
        /*var sino = confirm("Quieres borrar este registro?");
        
        if (sino == true) {
            var grid = $(e).closest('.k-grid').data('kendoGrid'); //get the grid
            var dataItem = grid.dataItem($(e).closest('tr'));
            actualiza("4;" + dataItem.mail + ";" + dataItem.chasis);
            if (dataItem.chasis == datos_Cliente.chasis) {
                datos_Cliente.chasis = "";
                datos_Cliente.alias = "";
                localStorage.setItem("Inp_DatosUsuario", JSON.stringify(datos_Cliente));
            }
        }*/
    } catch (s) { mens("Error al eliminar vehículo", "mens"); return; }
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
                } else { mens(data, "mens"); return; }
            },
            error: function (err) { mens("Error servicio actualizar vehículo", "mens"); return; }
        });
    } catch (e) { mens("Error servicio eliminar vehículo", "mens"); return; }
}
function onSI(e) {
    try {
        var grid = $(acepta).closest('.k-grid').data('kendoGrid'); //get the grid
        var dataItem = grid.dataItem($(acepta).closest('tr'));
        //alert(inspeccionar(dataItem));
        actualiza("4;" + dataItem.mail + ";" + dataItem.chasis);
        if (dataItem.chasis == datos_Cliente.chasis) {
            datos_Cliente.chasis = "";
            datos_Cliente.alias = "";
            localStorage.setItem("Inp_DatosUsuario", JSON.stringify(datos_Cliente));
        }
    }catch(e1){ mens("error al borrar registro","mens");}
}

function onNO(e) {
    sino="NO";
    return;
}