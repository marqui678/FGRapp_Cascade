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
        if (void 0 !== model["georss:point"]) {
            var pos = model["georss:point"];
            var location = pos.substring(pos.indexOf("(") + 1, pos.indexOf(")")).split(" ");
            model["longitude"] = parseFloat(location[0]);
            model["latitude"] = parseFloat(location[1]);
        }
        if (void 0 !== model["fgrrss:distance"]) {
            var distance = model["fgrrss:distance"].match(/\d+./g);
            null !== distance && distance.length >= 0 && (model["fgrrss:distance"] = Number(distance.join("")));
        }
        model["startDateTime"] = model["fgrrss:startDateTime"];
        var s = model["fgrrss:startDateTime"].substring(0, 19);
        model["fgrrss:startDateTime"] = new Date(s);
        if (Alloy.Globals.distance[0] <= model["fgrrss:distance"] && Alloy.Globals.distance[1] >= model["fgrrss:distance"] && Alloy.Globals.startDateTime <= model["fgrrss:startDateTime"] && Alloy.Globals.endDateTime >= model["fgrrss:startDateTime"]) if (0 == Alloy.Globals.pace.length) models.push(model); else for (var k = 0; k < Alloy.Globals.pace.length; k++) if (-1 != model["fgrrss:pace"].indexOf(Alloy.Globals.pace[k])) {
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