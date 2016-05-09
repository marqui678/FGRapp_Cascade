var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        adapter: {
            type: "rss",
            idAttribute: "link"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {
            setDistanceToLoc: function(targetLoc) {
                this.attributes.distanceToLocation = this.calculateDistanceToLoc(targetLoc);
            },
            calculateDistanceToLoc: function(targetLoc) {
                var lat1 = this.get("latitude");
                var lon1 = this.get("longitude");
                var lat2 = targetLoc.latitude;
                var lon2 = targetLoc.longitude;
                var R = 6371;
                var dLat = (lat2 - lat1).toRad();
                var dLon = (lon2 - lon1).toRad();
                var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                var d = R * c;
                return d;
            }
        });
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
            initialize: function() {
                this.sortField = "distanceToLocation";
                this.sortDirection = "ASC";
            },
            setSortField: function(field, direction) {
                this.sortField = field;
                this.sortDirection = direction;
            },
            comparator: function(collection) {
                return collection.get(this.sortField);
            },
            sortBy: function(iterator, context) {
                var obj = this.models;
                var direction = this.sortDirection;
                return _.pluck(_.map(obj, function(value, index, list) {
                    return {
                        value: value,
                        index: index,
                        criteria: iterator.call(context, value, index, list)
                    };
                }).sort(function(left, right) {
                    var a = "ASC" === direction ? left.criteria : right.criteria;
                    var b = "ASC" === direction ? right.criteria : left.criteria;
                    if (a !== b) {
                        if (a > b || void 0 === a) return 1;
                        if (b > a || void 0 === b) return -1;
                    }
                    return left.index < right.index ? -1 : 1;
                }), "value");
            }
        });
        return Collection;
    }
};

model = Alloy.M("feed", exports.definition, []);

collection = Alloy.C("feed", exports.definition, model);

exports.Model = model;

exports.Collection = collection;