'use strict';

app.detalleOT = kendo.observable({
    onShow: function () {
        $("#detalleOT").kendoGrid({
            selectable: "row",
            allowCopy: true,
            columns: [
                {
                    field: "Parte",
                    footerTemplate: "Total:"
                },
                {
                    field: "Tiempo",
                    footerTemplate: " #: sum #  Horas"
                },
                {
                    field: "Precio",
                    footerTemplate: "$ #: sum # "
                }
            ],

            dataSource: {
                data: [
                    { Parte: "Cambio de aceite", Tiempo: 0.70, Precio: 35.10 },
                    { Parte: "Cambio de llantas", Tiempo: 0.70, Precio: 35.10 },
                    { Parte: "Cambio de banda", Tiempo: 0.70, Precio: 35.10 },
                    { Parte: "Cambio de liquidos", Tiempo: 0.70, Precio: 35.10 }
                ],
                aggregate: [
                    { field: "Parte", aggregate: "count" },
                    { field: "Tiempo", aggregate: "sum" },
                    { field: "Precio", aggregate: "sum" }
                ]
            }
        });
    },
    afterShow: function () { },
    inicializa: function () {

    }
});
app.localization.registerView('detalleOT');




// START_CUSTOM_CODE_miKia2
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_miKia2