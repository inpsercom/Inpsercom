//'use strict';
//document.getElementById('mymodal_cargar').style.display = "block";
app.mntRegistroVin = kendo.observable({
    onShow: function () {
        var dp = "";
        //kendo.ui.progress($("#btnPDF"), true);
        $("#NumeroChasisPF").text(datos_Cliente.chasis);
        var alto = screen.height-160;
        var ancho = screen.width - 10;
        var todo = document.getElementById("ifmPrefactura");
        document.getElementById("ifmPrefactura").style.width = ancho + "px";
        document.getElementById("ifmPrefactura").style.height = alto + "px";
        var diip = TraerDireccion();
        if (diip == null || diip == "") {
           document.getElementById("pdfPRE").setAttribute('style','display: none'); 
            mens("No existe prefactura", "warning")
            document.getElementById("ifmPrefactura").src = dp;
            return;
        }
        //var diip = "http://186.71.68.154:8090/prefactura_taller/DEBITOCONFIAMED2015.pdf";
        dp = "http://docs.google.com/gview?url=" + diip + "&embedded=true";
        //alert(dp);
        document.getElementById("ifmPrefactura").src = dp;
        document.getElementById("pdfPRE").setAttribute('style','display: block');
        //alert (inspeccionar(todo));
    },
    afterShow: function () {
        //kendo.ui.progress($("#btnPDF"), false); 
    },
    inicializa: function () { }
});
app.localization.registerView('mntRegistroVin');
function prefac(){
    alert("entro");
    kendo.mobile.application.navigate("components/RecuperarContrasena/view.html");
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
                    mens("No existe datos para esta cosnulta", "error");
                }
            },
            error: function (err) {
                mens("Error en consulta", "error");
            }
        });
        return infor[0].path_prefactura;
    } catch (e) { mens("Error en conexión con servicio", "error"); }
}
