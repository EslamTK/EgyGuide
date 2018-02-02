var zoom;
var imgElm;
(function() {
    zoom = 15;
    imgElm = document.getElementById("imgMap");
    var longitude = getUrlVars()["longitude"];
    var latitude = getUrlVars()["latitude"];
    showMapImage(latitude, longitude);
    
    function rotaryZoom(ev) {
        var direction = ev.detail.direction;
        if (direction === 'CW') {
            zoom = Math.max(zoom - 1, 8);
        } else {
            zoom = Math.min(zoom + 1, 20);
        }
        if (latitude !== null && longitude !== null) {
            showMapImage(latitude, longitude);
        }
    }
    document.addEventListener('rotarydetent',rotaryZoom);

}());

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function showMapImage(latitude, longitude) {
    var URL = "http://maps.googleapis.com/maps/api/staticmap?";
    URL += "zoom=" + zoom;
    URL += "&size=" + "360x360";
    URL += "&format=" + "png";
    URL += "&markers=color:red%7Clabel:Speed%7C";
    URL += latitude + "," + longitude;
    var xhr = new XMLHttpRequest();
    var url = URL;
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function(data) {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            url = "data:image/png;base64," + arrayToBase64(xhr.response);
            imgElm.src = url;
            var secs = document.getElementById("mainSection");
            var delSection = document.getElementById("deleteMe");
            if(delSection!==null)
            {
            secs.removeChild(delSection);
            imgElm.style.display = "block";
            }
        }
    };
    xhr.responseType = 'arraybuffer';
    xhr.send();
}

function arrayToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}