function temperature() {
    var c = document.getElementById("celsius").value;
    if (c === '') {
        document.getElementById("celsius").value = 0
    }
    var f = (c * 9 / 5) + 32;
    document.getElementById("fahrenheit").value = f;
}

function weight() {
    var kg = document.getElementById("kilo").value;
    if (kg === '') {
        document.getElementById("kilo").value = 0
    }
    var lbs = kg * 2.2;
    document.getElementById("pounds").value = lbs;
}

function distance() {
    var km = document.getElementById("km").value;
    if (km === '') {
        document.getElementById("km").value = 0
    }
    var m = km * 0.62137;
    document.getElementById("miles").value = m;
}
