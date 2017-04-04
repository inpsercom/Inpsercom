'use strict';

app.mntRegistroVin = kendo.observable({
    onShow: function () {
        validavehiculo(datos_Cliente.mail);
    },
    afterShow: function () { },
    inicializa: function () {

    }
});
app.localization.registerView('mntRegistroVin');

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
        url: Url,
        type: "POST",
        data: JSON.stringify(params),
        dataType: "json",
        //Content-Type: application/json
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        success: function (data) {
            try {
                if (data == "Success") {
                    try {
                        alert("Registro Exitoso");
                        document.getElementById("VIN").value = "";
                        validavehiculo(params.mail);
                        return;
                    } catch (s) {
                        alert("1" + s);
                    }
                } else { alert("Error: " + data); }
            } catch (e) {
                alert("2" + e);
            }
        },
        error: function (err) {
            alert(JSON.stringify(err));

        }
    });
}
var grid;
function validavehiculo(email) {
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
                        $("#chasisview").kendoGrid({
                            allowCopy: true,
                            columns: [
                                { field: "mail", title: "Email" },
                                { field: "chasis", title: "VIN" },
                                { command: [{ name: "destroy", text: "Eliminar" }] }],
                            dataSource: resultado,
                            editable: {
                                confirmation: "Quieres borrar este registro?"
                            }
                        });
                        grid = $("#chasisview").data("kendoGrid");
                        grid.bind("remove", grid_remove);
                    } catch (e) {
                        //orraCampos();
                    }
                },
                error: function (err) {
                    alert("4" + JSON.stringify(err));
                }
            });
        } catch (e) {
            alert("5" + e);
        }
        return resultado;
    }
}
function grid_remove(e) {
    try {
        actualiza("4;" + e.model.mail + ";" + e.model.chasis);
    } catch (s) {
        alert(s);
    }
}

function actualiza(chasisemail) {
    var Url = urlService + "/biss.sherloc/Services/SL/Sherloc/Sherloc.svc/EliminaV";
    var params = {
        "vin": chasisemail
        //output: "json"
    };
    $.ajax({
        url: Url,
        type: "POST",
        data: JSON.stringify(params),
        dataType: "json",
        //Content-Type: application/json
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        success: function (data) {
            try {
                if (data == "Success") {
                    try {
                        alert("Se elimino el registro");
                        return data;
                    } catch (s) {
                        alert("6" + s);
                    }
                } else { alert("Error: " + data); }
            } catch (e) {
                alert("7" + e);
            }
        },
        error: function (err) {
            alert("8" + JSON.stringify(err));

        }
    });
}
// START_CUSTOM_CODE_miKia2
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_miKia2