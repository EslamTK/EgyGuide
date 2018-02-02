/*global tau */
var activeSec = 0,
    sectionChanger, pageIndicator, TimeOut = 0;
(function() {
    setSectionChanger();
    var id = getUrlVars()["id"];

    var dataRef = firebase.database().ref().child(id);

    dataRef.once('value',
        function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var key = childSnapshot.key;
                var title = childSnapshot.child("title").val();
                var imgsrc = childSnapshot.child("image").val();
                addSection(id + "/" + key, title, imgsrc);
            });
            updateSections();
        });
}());

function addSection(id, title, imgsrc) {
    var sec = document.createElement("section");
    var href = document.createElement("a");
    href.setAttribute("href", "placeDetails.html?id=" + id);

    var div = document.createElement("div");

    var h1_title = document.createElement("h1");
    h1_title.setAttribute("class", "title");
    h1_title.innerText = title;

    var img = document.createElement("img");
    img.setAttribute("class", "thumbnail");
    img.setAttribute("src", imgsrc);

    div.appendChild(h1_title);
    div.appendChild(img);
    href.appendChild(div);
    sec.appendChild(href);

    document.getElementById("sections").appendChild(sec);
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function setSectionChanger() {
    var page = document.getElementById("sectionChangerPage"),
        changer = document.getElementById("hsectionchanger"),
        elPageIndicator = document.getElementById("pageIndicator"),
        pageIndicatorHandler;

    page.addEventListener("pagebeforeshow", function() {
        var sections = document.querySelectorAll("section");
        pageIndicator = new tau.widget.PageIndicator(elPageIndicator, {
            numberOfPages: sections.length
        });

        sectionChanger = new tau.widget.SectionChanger(changer, {
            circular: false,
            orientation: "horizontal",
            useBouncingEffect: true
        });

        sectionChanger.setActiveSection(activeSec);
        pageIndicator.setActive(activeSec);
        sectionChanger.refresh();
    });

    page.addEventListener("pagehide", function() {
        activeSec = sectionChanger.getActiveSectionIndex();
        pageIndicator.destroy();
        sectionChanger.destroy();
    });

    pageIndicatorHandler = function(e) {
        pageIndicator.setActive(e.detail.active);
    };
    document.addEventListener("sectionchange", pageIndicatorHandler);

    function rotaryEventHandler(event) {
        var direction = event.detail.direction,
            length = document.querySelectorAll("section").length,
            sectionIndex;

        if (length > 0 && document.URL.search("places.htm") >= 0 && TimeOut == 0) {
            sectionIndex = sectionChanger.getActiveSectionIndex();

            if (direction === "CW") {
                if (sectionIndex < (length - 1)) {
                    sectionIndex = sectionIndex + 1;
                }
            } else if (direction === "CCW") {
                if (sectionIndex > 0) {
                    sectionIndex = sectionIndex - 1;
                }
            }
            sectionChanger.setActiveSection(sectionIndex, 100);
            TimeOut = 1;
            setTimeout(function() {
                TimeOut = 0;
            }, 500);

        }
    };
    document.addEventListener('rotarydetent', rotaryEventHandler);
}

function updateSections() {
    var secs = document.getElementById("sections"),
        delSection = document.getElementById("deleteMe");
    if (delSection !== null) secs.removeChild(delSection);

    var sections = document.querySelectorAll("section"),
        changer = document.getElementById("hsectionchanger"),
        elPageIndicator = document.getElementById("pageIndicator");

    if (pageIndicator !== null) {
        pageIndicator.destroy();
    }

    if (sections.length > 1) {
        pageIndicator = new tau.widget.PageIndicator(elPageIndicator, {
            numberOfPages: sections.length
        });

        sectionChanger = new tau.widget.SectionChanger(changer, {
            circular: false,
            orientation: "horizontal",
            useBouncingEffect: true
        });

        sectionChanger.setActiveSection(activeSec);
        sectionChanger.refresh();
        pageIndicator.setActive(activeSec);
    }
}