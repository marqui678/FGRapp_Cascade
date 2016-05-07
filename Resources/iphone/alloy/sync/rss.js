"use strict";

function parseXML(xml) {
    var models = [];
    var elements = xml.documentElement.getElementsByTagName("item");
    for (var i = 0; i < elements.length; i++) {
        var element = elements.item(i);
        var model = {};
        var childNodes = element.childNodes;
        var child;
        for (var j = 0; j < childNodes.length; j++) {
            child = childNodes.item(j);
            child.nodeType === child.ELEMENT_NODE && 1 === child.childNodes.length && -1 !== [ child.TEXT_NODE, child.CDATA_SECTION_NODE ].indexOf(child.childNodes.item(0).nodeType) && (model[child.nodeName] = model[child.nodeName] ? (_.isArray(model[child.nodeName]) ? model[child.nodeName] : [ model[child.nodeName] ]).concat(child.textContent) : child.textContent);
        }
        for (var y = 0; y < model["title"].toString().length; y++) if (" " != model["title"].toString().substring(y, y + 1)) {
            model["title"] = model["title"].toString().substring(y, model["title"].length);
            break;
        }
        if (void 0 !== model["georss:point"]) {
            var pos = model["georss:point"];
            var location = pos.substring(pos.indexOf("(") + 1, pos.indexOf(")")).split(" ");
            model["longitude"] = parseFloat(location[0]);
            model["latitude"] = parseFloat(location[1]);
        }
        if (void 0 !== model["fgrrss:distance"]) {
            var distance = model["fgrrss:distance"].match(/\d+./g);
            null !== distance && distance.length >= 0 && (model["fgrrss:distance"] = Number(distance.join("")));
            model["distance1"] = model["fgrrss:distance"].toString().substring(0, 2);
            model["distance2"] = model["fgrrss:distance"].toFixed(2).toString().substring(2, 5) + "mi";
        }
        if (void 0 !== model["fgrrss:pace"]) {
            var paceNum = model["fgrrss:pace"].match(/\d+/g);
            model["lowestPace"] = null == paceNum ? paceNum : Number(paceNum[0]);
            model["largestPace"] = null == paceNum ? paceNum : Number(paceNum[paceNum.length - 1]);
            model["paceNumber"] = model["lowestPace"] != model["largestPace"] ? model["lowestPace"] + "-" + model["largestPace"] + " mph" : model["lowestPace"] + " mph";
            paceTemp = model["fgrrss:pace"].split(":");
            pace = [];
            pace[0] = paceTemp[0];
            if (paceTemp.length > 2) for (var x = 1; x < paceTemp.length - 1; x++) pace[x] = paceTemp[x].substring(13, paceTemp[x].length);
            model["pace"] = pace.join();
        }
        model["startDateTime"] = model["fgrrss:startDateTime"];
        -1 != model["startDateTime"].indexOf("to") && (model["startDateTime"] = model["startDateTime"].substring(0, 25));
        Alloy.Globals.test.push(model["startDateTime"]);
        var s = model["fgrrss:startDateTime"].substring(0, 19);
        model["fgrrss:startDateTime"] = new Date(s);
        var distance = false;
        if (0 == Alloy.Globals.distance.length) distance = true; else for (var x = 0; x < Alloy.Globals.distance.length; x++) if (Alloy.Globals.distance[x][0] <= model["fgrrss:distance"] && Alloy.Globals.distance[x][1] >= model["fgrrss:distance"]) {
            distance = true;
            break;
        }
        if (distance && (0 == Alloy.Globals.startDateTime.length || Alloy.Globals.startDateTime[0] <= model["fgrrss:startDateTime"] && Alloy.Globals.startDateTime[1] >= model["fgrrss:startDateTime"])) if (0 == Alloy.Globals.pace.length) models.push(model); else for (var k = 0; k < Alloy.Globals.pace.length; k++) if (-1 != model["fgrrss:pace"].indexOf(Alloy.Globals.pace[k])) {
            models.push(model);
            break;
        }
    }
    return models;
}

function loadUrl(url, callback) {
    var xml;
    if (0 !== url.indexOf("htt")) return setTimeout(function() {
        var file = Ti.Filesystem.getFile(url);
        if (!file.exists() || !file.isFile()) return callback("URL is not a file.");
        var text = file.read().text;
        try {
            xml = Ti.XML.parseString(text);
            return callback(null, xml);
        } catch (e) {
            return callback(e);
        }
    }, 0);
    var xhr = Ti.Network.createHTTPClient({
        onload: function() {
            var xml = this.responseXML;
            if (null === xml || null === xml.documentElement) return callback(String.format("Response did not contain XML: %s", url));
            callback(null, xml);
        },
        onerror: function(e) {
            callback(String.format("Request failed: " + e.error));
        }
    });
    xhr.open("GET", url);
    xhr.send();
}

module.exports.sync = function(method, model, opts) {
    var url;
    if ("read" !== method) throw "Unsupported operation.";
    url = opts.url || model.config.adapter.url;
    loadUrl(url, function(err, xml) {
        if (err) return opts.error && opts.error(err);
        try {
            var data = parseXML(xml);
            opts.success && opts.success(1 === data.length ? data[0] : data);
            model.trigger("fetch");
        } catch (e) {
            return opts.error && opts.error(e);
        }
    });
};

module.exports.afterModelCreate = function(Model) {
    Model = Model || {};
    Model.prototype.idAttribute = Model.prototype.config.adapter.idAttribute;
    return Model;
};