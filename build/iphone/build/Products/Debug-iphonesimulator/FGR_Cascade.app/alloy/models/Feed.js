var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        adapter: {
            type: "rss",
            idAttribute: "link"
        }
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
            initialize: function() {
                this.sortField = "fgrrss:startDateTime";
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