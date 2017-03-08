'use strict';
var map;
app.miKia3 = kendo.observable({
    onShow: function () {
        try {

            var ordenUsuario = sessionStorage.getItem("Orden");
            var Url = "http://190.110.193.131/ServiceERM.svc/EnviaMensaje/992886758/U";
            var params = {
                orden: ordenUsuario,
                output: "json"
            };
            $.ajax({
                url: Url,
                type: "GET",
                data: params,
                dataType: "json",
                success: function (data) {
                    try {
                        data = data.EnviaMensajeResult;
                        if ((data.indexOf("http://maps.google.com/?q=")) != -1) {
                            data = (data.substr(26));
                            data = data.split(",");
                            var PosVehi = { lat: parseFloat(data[0]), lng: parseFloat(data[1]) };

                            var map = new google.maps.Map(document.getElementById('map'), {
                                zoom: 16,
                                center: PosVehi
                            });

                            var marker = new google.maps.Marker({
                                position: PosVehi,
                                map: map
                            });
                        }
                    } catch (e) {
                        alert(e);
                    }
                },
                error: function (err) {
                    alert(JSON.stringify(err));
                }
            });
        } catch (s) {
            alert(s);
        }
    },
    afterShow: function () { }
});
app.localization.registerView('miKia3');

// START_CUSTOM_CODE_miKia3
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_miKia3