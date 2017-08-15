app.menuAlertas = kendo.observable({
    init: function () { },
    onShow: function () {
        $("#NoOrdenAL").text(datos_Cliente.nombre_alias+": "+datos_Vehiculo.numeroorden);
    },
    afterShow: function () { }
});

app.localization.registerView('menuAlertas');

function excesos() {
    kendo.mobile.application.navigate("components/ReporteAlertas/view.html");
}

/*function panico() {
    kendo.mobile.application.navigate("components/ReportePanicos/view.html");
}*/

function geocercas() {
    kendo.mobile.application.navigate("components/ReporteGeocercas/view.html");
}

function apaencendido() {
    kendo.mobile.application.navigate("components/ReporteApaEncendidos/view.html");
}

function paradas() {
    kendo.mobile.application.navigate("components/ReporteParadas/view.html");
}