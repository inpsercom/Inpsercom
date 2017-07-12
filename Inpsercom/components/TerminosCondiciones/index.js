
app.terminoscon = kendo.observable({
    onShow: function () {$("#NumeroChasisTC").text(datos_Cliente.chasis);},
    afterShow: function () { },
    inicializa: function () { },
});
app.localization.registerView('terminoscon');