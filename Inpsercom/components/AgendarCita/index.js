'use strict';

app.mntAgendarCita = kendo.observable({
    onShow: function () {
        //$("#NumeroChasisCA").text(datos_Cliente.chasis);
        // RRP: alias - agendar cita
        $("#NumeroChasisCA").text(datos_Cliente.nombre_alias);
        var anch = screen.width;
        var height1 = (anch / 2) - 30;
        var url = ["http://www.kia.com/ec/showroom/picanto-r.html", "http://www.kia.com/ec/showroom/nuevo-rio-sedan.html",
            "http://www.kia.com/ec/showroom/nuevo-rio-hatchback/features.html", "http://www.kia.com/ec/showroom/nuevo-cerato.html", "http://www.kia.com/ec/showroom/cerato-forte.html",
            "http://www.kia.com/ec/showroom/cerato-koup.html"]; //, "http://www.kia.com/ec/showroom/kia-quoris.html"];
        var imagenes = ["picantoxline.png", "riosedanxline.png", "riohatchbackline.png", "ceratoline.png", "ceratoForte.png", "ceratoKoup.png", "kiaQuoris.png"];
        var container = document.getElementById("contenedor");
        var tama = height1 + "px;";
        for (var i = 0; i < url.length; i = i + 2) {
            var j = i + 1;
            var auto = "autokia" + i;
            var auto1 = "autokia" + j;
            if (j == url.length) {
                $(container).append('</br><div>&emsp;<a href="' + url[i] + '" target="_blank"> <img id="' + auto + '" src="' + urlImagen + imagenes[i] + '" style="border:3px solid white;" width="' + tama + '"> </a> &emsp;</div>');
            } else {
                $(container).append('</br><div>&emsp;<a href="' + url[i] + '" target="_blank"> <img id="' + auto + '" src="' + urlImagen + imagenes[i] + '" style="border:3px solid white;" width="' + tama + '"> </a>' +
                    '<a href="' + url[j] + '" target="_blank"> <img id="' + auto1 + '" src="' + urlImagen + imagenes[j] + '" style="border:3px solid white;" width="' + tama + '" > </a> &emsp;</div>');
            }
        }
    },
    afterShow: function () { },
    inicializa: function () {

    }
});
app.localization.registerView('mntAgendarCita');

