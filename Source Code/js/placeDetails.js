/*global tau */

(function() {
    var id = getUrlVars()["id"];

    var title = document.getElementById("placeTitle");
    var image = document.getElementById("placeImage");
    var description = document.getElementById("placeDescription");
    var content = document.getElementById("content");
    var dataRef = firebase.database().ref().child(id);
    var location = document.getElementById("locBtn");
    
    dataRef.once('value',
        function(snapshot) {
            title.innerText = snapshot.child("title").val();
            image.setAttribute("src", snapshot.child("image").val());
            description.innerHTML = snapshot.child("description").val();
            var longitude = snapshot.child("location").child("longitude").val();
            var latitude = snapshot.child("location").child("latitude").val();
            var secs = document.getElementById("mainsection"),
                delSection = document.getElementById("deleteMe");
            secs.removeChild(delSection);
            content.style.display = "block";
            location.setAttribute("href", "locationMap.html?longitude=" + longitude + "&latitude=" + latitude);
            location.style.display = "block";
        });
    var SCROLL_STEP = 50, /* Distance of moving scroll for each rotary event */
    page = document.getElementById("page");
    page.addEventListener("pagebeforeshow", function pageScrollHandler(e) {
        var page = e.target,
        elScroller = page.querySelector(".ui-scroller");

        /* Rotary event handler */
         function rotaryHandler(e) {
            if (e.detail.direction === "CW")
            /* Right direction */
            {
                elScroller.scrollTop += SCROLL_STEP;
            } else if (e.detail.direction === "CCW")
            /* Left direction */
            {
                elScroller.scrollTop -= SCROLL_STEP;
            }
        }

        /* Register the rotary event */
        document.addEventListener("rotarydetent", rotaryHandler, false);

        /* Deregister the rotary event */
        page.addEventListener("pagebeforehide", function pageHideHandler() {
            page.removeEventListener("pagebeforehide", pageHideHandler, false);
            document.removeEventListener("rotarydetent", rotaryHandler, false);
        }, false);

    }, false);

}());

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}