//'use strict';

app.home = kendo.observable({
    onShow: function () {
        try {
            $("#versionHM").text("Kia Ecuador "+VersionHM);
            Device_identifier = device.uuid;
            try {
                var verific = validaLoginPrueba();
                if (verific == false) {
                    urlService = urlInterno;
                } else { urlService = urlExterno; }
                localStorage.setItem("urlService", urlService);
            } catch (e) { mens("No existe conexión con el servidor ","mens"); return;}

        } catch (e) { mens("Error lectura ip", "mens"); return;}
        try {
            if (localStorage.getItem("Inp_DatosUsuario")) {
                datos_Cliente = JSON.parse(localStorage.getItem("Inp_DatosUsuario"));
                datos_Vehiculo = JSON.parse(localStorage.getItem("Inp_DatosVehiculo"));
                //kendo.mobile.application.navigate("components/MenuKia/view.html");
            }
        } catch (f) { alert(f); mens("Error en conexión a la base", "mens"); return;}
    },
    init: function () {if (localStorage.getItem("Inp_DatosUsuario")) {
                datos_Cliente = JSON.parse(localStorage.getItem("Inp_DatosUsuario"));
                datos_Vehiculo = JSON.parse(localStorage.getItem("Inp_DatosVehiculo"));
                kendo.mobile.application.navigate("components/MenuKia/view.html");
            } },
    beforeShow: function () { }
});
app.localization.registerView('home');
function LoginVehiculo(){
    kendo.mobile.application.navigate("components/logIn/view.html");
}
function RegistroVehiculo(){
    kendo.mobile.application.navigate("components/Registro/view.html");
}
function regresaHME(){
    try{
    kendo.mobile.application.navigate("components/MenuKia/view.html");
    }catch(e){alert(e);}
}

//190.108.66.10
function validaLoginPrueba() {
    try{
    var Url = urlExterno + "Login/vinicio.ortega@inpsercom.com.com;a;3314"; 
    //"http://186.71.21.170:8089" + "/biss.sherloc/Services/SL/Sherloc/Sherloc.svc/Login/s@s.com;a;3314";
    $.ajax({
        url: Url,
        type: "GET",
        dataType: "json",
        async: false,
        success: function (data) {
            resultado = data.LoginGetResult;
        },
        error: function (err) {
            if (err.statusText.substr(0, 31) == "NetworkError: Failed to execute") {
                resultado = false;
                return resultado;
            }
        }
    });
    }catch(e){alert(e);}
    return resultado;
}