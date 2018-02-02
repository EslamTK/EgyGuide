/*global tau */

(function() {
    var id = getUrlVars()["id"];

    var title = document.getElementById("placeTitle1");
    var image = document.getElementById("placeImage1");
    var description = document.getElementById("placeDescription1");
    var content = document.getElementById("mainContent");
    var dataRef = firebase.database().ref().child(id);
    var location = document.getElementById("locBtn1");
    
    dataRef.once('value',
        function(snapshot) {
            title.innerText = snapshot.child("title").val();
            image.setAttribute("src", snapshot.child("image").val());
            description.innerHTML = snapshot.child("description").val();
            var longitude = snapshot.child("location").child("longitude").val();
            var latitude = snapshot.child("location").child("latitude").val();
            var secs = document.getElementById("mainsec"),
                delSection = document.getElementById("deleteMe1");
            secs.removeChild(delSection);
            content.style.display = "block";
            location.setAttribute("href", "locationMap.html?longitude=" + longitude + "&latitude=" + latitude);
            location.style.display = "block";
        });
    var SCROLL_STEP = 50, /* Distance of moving scroll for each rotary event */
    page = document.getElementById("pageInside");
    page.addEventListener("pagebeforeshow", function pageScrollHandler(e) {
        var page = e.target,
        elScroller = page.querySelector(".ui-scroller");

        /* Rotary event handler */
         function rotaryEventHandler1(e) {
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
        document.addEventListener("rotarydetent", rotaryEventHandler1, false);

        /* Deregister the rotary event */
        page.addEventListener("pagebeforehide", function pageHide() {
            page.removeEventListener("pagebeforehide", pageHide, false);
            document.removeEventListener("rotarydetent", rotaryEventHandler1, false);
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