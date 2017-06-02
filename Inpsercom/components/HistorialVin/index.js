//'use strict';

app.mntHistorialVin = kendo.observable({
    onShow: function () {
        $("#NumeroChasisOTC").text(datos_Cliente.chasis);
        // $("#historialOT" ).style("display", "block " ) ;
        //document.getElementById('historialOT').style.visibility = "visible";
        //$("#historialOT").style.display("block");
        //document.getElementById("historialOT").style.display = "block";
        //document.getElementById("historialOT1").style.display = 'none';
        document.getElementById("colorRE").style.background = "#d6eaf8";
        document.getElementById("colorTR").style.background = "#d6eaf8";
        document.getElementById("colorLA").style.background = "#d6eaf8";
        document.getElementById("colorCO").style.background = "#d6eaf8";
        document.getElementById("colorPRO").style.background = "#d6eaf8";
        document.getElementById("colorLVA").style.background = "#d6eaf8";
        document.getElementById("colorCCC").style.background = "#d6eaf8";
        ConsultarHV();
    },
    afterShow: function () { },
    inicializa: function () {

    }
});
app.localization.registerView('mntHistorialVin');

function ConsultarHV() {
    try {
        var usu = localStorage.getItem("Inp_DatosUsuario");
        //var Url = "http://200.31.10.92:8092/appk_aekia/Services/SL/Sherloc/Sherloc.svc/Ordenes/" + "4,2," + datos_Cliente.chasis;
        var Url = urlService + "Ordenes/" + "4,2," + datos_Cliente.chasis;
        var infor;
        var infor1 = [];
        var infor2 = [];
        $.ajax({
            url: Url,
            type: "GET",
            async: false,
            dataType: "json",
            success: function (data) {
                try {
                    if (data.OrdenesGetResult == null) {
                        mens("No existe datos", "warning");
                    } else {
                        infor = (JSON.parse(data.OrdenesGetResult)).CabeceraOT01;
                        infor1.push({
                            numero_ot: infor[0].numero_ot,
                            estado_interno: infor[0].estado_interno,
                            fecha_recepcion: infor[0].fecha_recepcion
                            //limiteVelocidadActual: infor[i].limiteVelocidadActual,
                            //lstAlarmas: infor[i].lstAlarmas
                        });
                        if (infor.length == 2) {
                            infor2.push({
                                numero_ot: infor[1].numero_ot,
                                estado_interno: infor[1].estado_interno,
                                fecha_recepcion: infor[1].fecha_recepcion
                                //limiteVelocidadActual: infor[i].limiteVelocidadActual,
                                //lstAlarmas: infor[i].lstAlarmas
                            });
                        }
                    }
                } catch (e) {
                    mens("No existe datos para esta cosnulta", "error");
                    return;
                }
            },
            error: function (err) {
                mens("Error en consulta", "error");
            }
        });
        //if (data.OrdenesGetResult == null) { mens("No existe datos", "warning"); return;}
        var fecha = (screen.width * 20) / 100;
        var ot = (screen.width * 25) / 100;
        var taller = (screen.width * 35) / 100;

        $("#listViewHV").kendoGrid({
            allowCopy: true,
            columns: [
                { field: "numero_ot", title: "No. OT", width: ot },
                { field: "estado_interno", title: "Estado", width: taller },
                { field: "fecha_recepcion", title: "Fecha", width: ot }
            ],
            dataSource: infor1,
            selectable: "row"
        });
        $("#listViewHVC").kendoGrid({
            allowCopy: true,
            columns: [
                { field: "numero_ot", title: "No. OT", width: ot },
                { field: "estado_interno", title: "Estado", width: taller },
                { field: "fecha_recepcion", title: "Fecha", width: ot }
            ],
            dataSource: infor2,
            selectable: "row"
        });

        if (infor1[0].estado_interno == "TRABAJANDO") { document.getElementById("colorTR").style.background = "#ffff00"; }
        if (infor1[0].estado_interno == "RECEPCIONADO") { document.getElementById("colorRE").style.background = "#FFFFFF"; }
        if (infor1[0].estado_interno == "LAVADO") { document.getElementById("colorLA").style.background = "#0000ff"; }
        if (infor1[0].estado_interno == "CONTROL_CALIDAD") { document.getElementById("colorCO").style.background = "#12a96a"; }
        if (infor2.length>0 ) {
            if (infor2[0].estado_interno == "PROFORMADO") { document.getElementById("colorPRO").style.background = "#808080"; }
            if (infor2[0].estado_interno == "LAVADO") { document.getElementById("colorLVA").style.background = "#0000ff"; }
            if (infor2[0].estado_interno == "CONTROL_CALIDAD") { document.getElementById("colorCCC").style.background = "#12a96a"; }
        }
        //var obj = document.getElementById("historialOT");
        //obj.style.display = (obj.style.display == 'none') ? 'block' : 'none';
        //var obj1 = document.getElementById("historialOT1");
        //obj1.style.display = (obj1.style.display == 'none') ? 'block' : 'none';
        //document.getElementById("historialOT").style.display = 'block';
        //document.getElementById("historialOT1").style.display = 'block';

    } catch (e) {
        //alert(e);
        mens("Error de conexión a la base");
    }
}
