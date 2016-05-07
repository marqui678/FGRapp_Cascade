/**
 * @author Nancy
 */
exports.definition = {
	config: {
		adapter: {
			type: 'rss',
			idAttribute: 'link'
		}
	},
	
    extendModel: function(Model) {
        _.extend(Model.prototype, {
        	
        	//Add "distanceToLocation" to model with given target location
            setDistanceToLoc: function(targetLoc) {
            	this.attributes.distanceToLocation = this.calculateDistanceToLoc(targetLoc);
            },
            
            // Calculate distance between model and targetLoc
            calculateDistanceToLoc: function(targetLoc) {
        		var lat1 = this.get('latitude');
				var lon1 = this.get('longitude');
				var lat2 = targetLoc.latitude;
				var lon2 = targetLoc.longitude;
				
				var R = 6371; // km
				var dLat = (lat2-lat1).toRad();
				var dLon = (lon2-lon1).toRad();
				var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
				Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
				Math.sin(dLon/2) * Math.sin(dLon/2);
				var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
				var d = R * c;
				return d;
            }
           
        });
 
        return Model;
    },
    
	extendCollection : function(Collection) {
        _.extend(Collection.prototype, {
            initialize: function () {
                //*** Default sort field.
                this.sortField = "distanceToLocation";
                //*** Default sort direction
                this.sortDirection = "ASC";
            },

             //*** Use setSortField to specify field and direction before calling sort method
            setSortField: function (field, direction) {
                this.sortField = field;
                this.sortDirection = direction;
            },

            comparator: function(collection) {
                return collection.get(this.sortField);
            },

             //*** Override sortBy to allow sort on any field, either direction 
            sortBy: function (iterator, context) {
                var obj = this.models;
                var direction = this.sortDirection;

                return _.pluck(_.map(obj, function (value, index, list) {
                    return {
                        value: value,
                        index: index,
                        criteria: iterator.call(context, value, index, list)
                    };
                }).sort(function (left, right) {
                    // swap a and b for reverse sort
                    var a = direction === "ASC" ? left.criteria : right.criteria;
                    var b = direction === "ASC" ? right.criteria : left.criteria;

                    if (a !== b) {
                        if (a > b || a === void 0) return 1;
                        if (a < b || b === void 0) return -1;
                    }
                    return left.index < right.index ? -1 : 1;
                }), 'value');
            }
       });

        return Collection;
    }
};