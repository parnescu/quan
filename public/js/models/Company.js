define(["backbone"], function(B){
	var m = Backbone.Model.extend({
		defaults:{
			id: "",
			name: "",
			created: Date.now(),
			updated: null,
			children: []
		}
	});
	return m;
})