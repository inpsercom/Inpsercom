//'use strict';
app.detalleOT = kendo.observable({
    onShow: function () {
        try {
            $("#NumeroChasisDOT").text(datos_Cliente.chasis);
            var Url = urlService + "Detalle/" + registro.codigo_empresa + "," + registro.anio_ga35 + "," + registro.secuencia_orden;
            var infordet;
            $.ajax({
                url: Url,
                type: "GET",
                async: false,
                dataType: "json",
                success: function (data) {
                    try {
                        infordet = (JSON.parse(data.DetalleOTGetResult)).DetalleOT01;
                    } catch (e) {
                        mens("Error en lectura de detalle OT", "mens");return;
                    }
                },
                error: function (err) {
                    mens("Error en servicio Detalle OT", "mens"); return;//alert(JSON.stringify(err));
                }
            });

            /*
            codigo_empresa
            numero_ot
            nombre_taller
            estado_interno
            fecha_recepcion
            anio_ga35
            secuencia_orden
            kilometraje
            */
            var descri = (screen.width * 50) / 100;
            var cant = (screen.width * 25) / 100;
            $("#detalleOT").kendoGrid({
                allowCopy: true,
                columns: [
                    { field: "Descripcion", title: "Descripción", footerTemplate: "Total:", width: descri },
                    { field: "Cantidad", title: "Cantidad",   width: cant },
                    { field: "Total", format: "{0:c}", title: "Total", footerTemplate: "#= kendo.toString(sum, '0.00') #" , width: cant}

                ],
                dataSource: {
                    data: infordet,
                    aggregate: [
                        { field: "Descripcion", aggregate: "count" },
                        { field: "Cantidad", aggregate: "sum" },
                        { field: "Total", aggregate: "sum" }
                    ]
                },
                selectable: "row"
            });
        } catch (e) {
            mens("Error en servicio Progress", "mens");return;
        }
    },
    afterShow: function () { },
    inicializa: function () {

    }
});
app.localization.registerView('detalleOT');
