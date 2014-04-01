define([
	'backbone',
	'utils/Global'
], function(B, _g){
	var v = Backbone.View.extend({
		tagName: 'table',
		items: [],
		className: 'dataDisplay',
		attributes: { border: 1},
		events:{ "click a": "signalClick"},
		initialize: function(){
			// build table head
			var str = "<table><thead><tr>", i;
			for (i=0;i<_g.tableHeaders.length;i++){
				str += "<th>"+_g.tableHeaders[i]+"</th>";
			}
			str += "</tr></thead><tbody></tbody></table>"
			this.$el.html(str);
			this.body = this.$el.find('tbody');
			
			str = i = null;
		},
		render: function(prefix){
			prefix = prefix || [];
			if (this.model){
				this.prefix = prefix;
				_.each(this.model.get('children'), function(model){ this.addTableChild(model)}, this);
			}
			return this;
		},
		addTableChild: function(modelData){
			this.body.append(
				"<tr>"+
					"<td><a href='/"+this.prefix.concat(this.model.id,modelData.id).join('/')+"' title='"+modelData.name+"'><span class='icon account'>&nbsp;</span>"+modelData.name+"</a></td>"+
					"<td class='date'><span class='icon time'>&nbsp;</span>"+_g.parseDate(new Date(modelData.created))+"</td>"+
					"<td class='date'><span class='icon time'>&nbsp;</span>"+_g.parseDate(new Date(modelData.updated))+"</td>"+
				"</tr>"
			);

		},
		signalClick: function(e){
			Backbone.trigger(
				_g.events.NAV_CLICKED,
				_g.stripLinkOrigin(e.target.href),
				false,
				e.target.title
			);
			e.preventDefault();
		}
	});
	return v;
});