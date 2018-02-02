
(function() {
    var id = getUrlVars()["id"];
    var title = document.getElementById("pagetitle");
    title.innerText = id;
}());

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}