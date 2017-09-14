
app.cambioC = kendo.observable({
    onShow: function () {  document.getElementById("passwordAnt").value = "";},
    afterShow: function () { }
});
app.localization.registerView('cambioC');

function grabar(){
    if(document.getElementById("passwordAnt").value != ""){
        if(document.getElementById("passwordNew").value != ""){
            if(document.getElementById("RpasswordNew").value != ""){
                if(document.getElementById("RpasswordNew").value == document.getElementById("passwordNew").value){
                    alert("todo bien");
                }
            }
        }
    }
}