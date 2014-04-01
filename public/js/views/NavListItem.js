define(['backbone','utils/Global'], function(B,_g){
	var v = Backbone.View.extend({
		tagName: 'a',
		events: {
			"click": "signalClick"
		},
		render: function(){
			if (this.model){
				this.$el
					.attr('href', "/"+this.model.get('id'))
					.attr('title', this.model.get('name'))
					.attr('id', this.model.get('id'))
					.html("<span class='icon'>&nbsp;</span>"+this.model.get('name'));
			}
			return this;
		},
		signalClick: function(e){
			Backbone.trigger(_g.events.NAV_CLICKED, "/"+this.model.get('id'), false, this.model.get('name'));
			e.preventDefault();
		}
	});
	return v;
})