// Fake horizontal scrolling with mouse wheel
var elem = document.getElementById('scroll-area'),
    width = parseInt(elem.offsetWidth, 10),
    cldWidth = parseInt(elem.children[0].offsetWidth, 10),
    distance = cldWidth - width,
    mean = 40, // Just for multiplier (go faster or slower)
    current = 0;

elem.children[0].style.left = current + "px"; // Set default `left` value as `0` for initiation

var doScroll = function (e) {

    // cross-browser wheel delta
    e = window.event || e;
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

    // (1 = scroll-up, -1 = scroll-down)
    // Always check the scroll distance, make sure that the scroll distance value will not
    // increased more than the container width and/or less than zero
    if ((delta == -1 && current * mean >= -distance) || (delta == 1 && current * mean < 0)) {
        current = current + delta;
    }

    // Move element to the left or right by updating the `left` value
    elem.children[0].style.left = (current * mean) + 'px';

    e.preventDefault();

};

if (elem.addEventListener) {
    elem.addEventListener("mousewheel", doScroll, false);
    elem.addEventListener("DOMMouseScroll", doScroll, false);
} else {
    elem.attachEvent("onmousewheel", doScroll);
}