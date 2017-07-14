//'use strict';
//document.getElementById('mymodal_cargar').style.display = "block";
var diip;
app.mntRegistroVin = kendo.observable({
    onShow: function () {
        var dp = "";
        diip = "";
        //kendo.ui.progress($("#btnPDF"), true);
      //  $("#NumeroChasisPF").text(datos_Cliente.chasis);
        // RRP: alias - agregarvin
        $("#NumeroChasisPF").text(datos_Cliente.nombre_alias);

        document.getElementById("logoPR").style.display = "none";
        var alto = screen.height - 160;
        var ancho = screen.width - 10;
        var todo = document.getElementById("ifmPrefactura");
        document.getElementById("ifmPrefactura").style.width = ancho + "px";
        document.getElementById("ifmPrefactura").style.height = alto + "px";
        var diip = TraerDireccion();
        datos_Cliente.path = diip;
        if (diip == null || diip == "") {
            document.getElementById("pdfPRE").setAttribute('style', 'display: none');
            mens("No existe prefactura", "mens")
            document.getElementById("ifmPrefactura").src = dp;
            document.getElementById("logoPR").setAttribute('style', 'display: block');
            return;
        }
        //var diip = "http://186.71.68.154:8090/prefactura_taller/DEBITOCONFIAMED2015.pdf";
        dp = "http://docs.google.com/gview?url=" + diip + "&embedded=true";
        //alert(dp);
        document.getElementById("ifmPrefactura").src =  dp;
        document.getElementById("pdfPRE").setAttribute('style', 'display: block');
        //alert (inspeccionar(todo));
    },
    afterShow: function () {
        //kendo.ui.progress($("#btnPDF"), false); 
    },
    inicializa: function () { }
});
app.localization.registerView('mntRegistroVin');
function prefacEn() {
    //var diips = datos_Cliente.path.toString();
    //for (var i = 0; i < diips.length; i++) {
    //    diips = diips.replace(':', '!');
    //    diips = diips.replace('/', '-');
    //}
    //documento = "7;" + datos_Cliente.mail + ";;" + diips + ";" + _mail;
    //var envio = AceptaMailPRE(documento);
    //alert(envio);  
    //if (envio.substring(0, 1) == "0") { mens(envio.substring(2, envio.length - 2)); return; }
    mens("La Prefactura fue aceptada con exito", "mens");return;
}
function AceptaMailPRE(documento) {
    try {
        if ((documento !== "") && (documento)) {
            var resultado = "";
            var Url = urlService + "EnvioMail/" + documento;
            //alert(Url);
            $.ajax({
                url: Url,
                type: "GET",
                dataType: "json",
                async: false,
                success: function (data) {
                    try {
                        //alert(inspeccionar(data));
                        resultado = data.EnvioMailGetResult;
                        //alert(inspeccionar(resultado));
                    } catch (e) {
                        //alert(inspeccionar(e));
                        mens(data, "mens");
                        borraCampos();return;
                    }
                },
                error: function (err) {
                    //alert(inspeccionar(err));
                    mens("Error conexión servicio Vehículo", "mens");return;

                }
            });
            return resultado;
        }
    } catch (f) {
        //alert(inspeccionar(f));
        mens("Error conexión servicio Vehículo", "mens");return;
    }
}

function prefac() {
    kendo.mobile.application.navigate("components/EnvioPrefactura/view.html");
}
function TraerDireccion() {
    try {
        var usu = localStorage.getItem("Inp_DatosUsuario");
        var Url = urlService + "Ordenes/" + "5,2," + datos_Cliente.chasis;
        var infor;
        $.ajax({
            url: Url,
            type: "GET",
            async: false,
            dataType: "json",
            success: function (data) {
                try {
                    infor = (JSON.parse(data.OrdenesGetResult)).CabeceraOT01;
                } catch (e) {
                    mens("No existe datos para esta cosnulta", "mens");return;
                }
            },
            error: function (err) {
                mens("Error en consulta", "mens");return;
            }
        });
        return infor[0].path_prefactura;
    } catch (e) { mens("Error en conexión con servicio", "mens");return; }
}
