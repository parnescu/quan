define(['backbone', 'utils/Global','views/NavListItem'], function(B, _g, ListItem){
	var v = Backbone.View.extend({
		tagName: "nav",
		id: "menu",
		initialize: function(){
			this.collection = _g.collection;
			this.collection.on('add', this.addListElement, this);
		},
		render: function(){
			_.each(this.collection.models, function(model){
				this.addListElement(model);
			}, this);
			return this;
		},
		addListElement: function(model){
			this.$el.append(new ListItem({model: model}).render().el);
		}
	});
	return v;
})