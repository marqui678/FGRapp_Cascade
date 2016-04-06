// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

function report(evt) {
    Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);
}
