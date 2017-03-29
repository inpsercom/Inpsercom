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
                        alert(s);
                    }
                } else { alert("Error: " + data); }
            } catch (e) {
                alert(e);
            }
        },
        error: function (err) {
            alert(JSON.stringify(err));

        }
    });
}

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
                                { field: "chasis", title: "VIN" }
                            ],
                            dataSource: resultado,
                            selectable: "row"
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
}


// START_CUSTOM_CODE_miKia2
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_miKia2