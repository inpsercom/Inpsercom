'use strict';

app.home = kendo.observable({
    onShow1: function () {
        Device_identifier = device.uuid;
        var confIp = localStorage.getItem("urlService");
        var switchInstance = $("#switch").data("kendoMobileSwitch");
        if (confIp == urlInterno)
        {
            switchInstance.check(true);
        }
        else
        {
            switchInstance.check(false);
        }
        try{
        configIps();
        //alert(inspeccionar(device));
        if (localStorage.getItem("Inp_DatosUsuario")) {
            //datos_Cliente = localStorage.getItem("Inp_DatosUsuario");
            datos_Cliente = JSON.parse(localStorage.getItem("Inp_DatosUsuario"));
            //datos_Vehiculo = localStorage.getItem("Inp_DatosVehiculo");
            datos_Vehiculo = JSON.parse(localStorage.getItem("Inp_DatosVehiculo"));
            kendo.mobile.application.navigate("components/miKia/view.html");
            //alert(inspeccionar(datos_Vehiculo));
            //alert(inspeccionar(datos_Cliente));
        }
        }catch(f){alert(f);}
    },
    afterShow: function () { }
});
app.localization.registerView('home');

// START_CUSTOM_CODE_home
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_home
(function (parent) {
    var
        /// start global model properties

        processImage = function (img) {

            if (!img) {
                var empty1x1png = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAMAASDVlMcAAAAASUVORK5CYII=';
                img = 'data:image/png;base64,' + empty1x1png;
            }

            return img;
        },
        /// end global model properties

        homeModel = kendo.observable({
            /// start add model functions
            ingresar: function () {
                try {
                    configIps();
                    kendo.mobile.application.navigate("components/logIn/view.html");
                } catch (s) {

                    alert(s);
                }
            },
            registro: function () {
                try {
                    configIps();
                    kendo.mobile.application.navigate("components/Registro/view.html");
                } catch (s) {
                    alert(s);
                }
            }
            /// end add model functions
        });

    /// start form functions
    /// end form functions

    parent.set('onShow', function _onShow() {
        var that = parent;
        that.set('addFormData', {
            /// start add form data init
            /// end add form data init
        });
        /// start add form show
        /// end add form show
    });
    parent.set('homeModel', homeModel);
})(app.home);

// START_CUSTOM_CODE_homeModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
function configIps() {
    // get a reference to the switch widget
    var switchInstance = $("#switch").data("kendoMobileSwitch");
    if (switchInstance.check()) {
        urlService = urlInterno;
    }
    else {
        urlService = urlExterno;
    }
    localStorage.setItem("urlService", urlService);

}

// END_CUSTOM_CODE_homeModel