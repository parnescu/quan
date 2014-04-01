define([
	'backbone',
	"models/Company",
	"views/TableView",
	"utils/Global"
], function(B, Company, Table, _g){
	var v = Backbone.View.extend({
		tagName: 'article',
		table: null,
		className: 'detailView',
		innerDetails: null,
		initialize: function(){
			// build table head and prepare it for data 
			// insertion when view is rendered
			var str ="<table><tbody>", i;
			for (i=0;i<_g.tableHeaders.length;i++){
				str += "<tr><td class='head'>"+_g.tableHeaders[i]+"</td><td class='"+_g.tableHeaders[i].toLowerCase()+"'></td></tr>";
			}
			str += "<tr class='body'><td class='head' valign='top'>Children</td><td class='childHolder'valign='top'></td></tr></tbody></table>";
			this.el.innerHTML = str;

			this.header = this.$el.find('table');
			this.body = this.$el.find('.body td:eq(1)');

			this.header.hide()
			str = i = null;
		},
		cleanup: function(){
			if(this.table){ 
				this.table.remove();
				this.table = null;
			}
			if (this.innerDetails){
				this.innerDetails.remove();
				this.innerDetails = null;
			}
		},
		render: function(itemsArray, prefix){
			if (this.model){
				//console.log("DETAILS:: => "+this.model.get('name'))
				this.$el.show();
				prefix = prefix || [];
				
				// render normal table details
				// taking into account header depth
				// if model has children => is branch node 
				// therefore we make anchor to go back to previous;
				var h = "h"+(prefix.length+2), nameString
					a = prefix.concat(this.model.get('id')).join('/');
					a = this.model.get('children').length === 0 ? null : a;
				nameString = [
					'<'+h+'>'
				 	,(a ? '<a href="/'+a+'" title="'+this.model.get('name')+'"><span class="icon">&nbsp;</span>'+this.model.get('name')+'</a>' : this.model.get('name'))
					,'</'+h+'>'
				].join("");


				this.header.find('.name').html(nameString);
				this.header.find('.created').html(_g.parseDate(new Date(this.model.get('created')))+'<span class="icon time">&nbsp;</span>');
				this.header.find('.updated').html(_g.parseDate(new Date(this.model.get('updated')))+'<span class="icon time">&nbsp;</span>');
				this.header.show();
				if (a){
					this.header.find('a').click(this.signalClick);
				}
				
				// T.B.D. 
				// this could be optimized a bit by NOT drawing and clearing the table everytime
				this.cleanup();

				// build table view for children
				if(this.model.get('children').length > 0){
					this.table = new Table({ model: this.model});
					this.$el.append(this.table.render(prefix).el);
					//this.body.html(this.table.render(prefix).el)
				}else{
					this.body.parent().hide();
				}
				

				// if child is selected build a new display view
				if (itemsArray && itemsArray.length > 0){
					this.cleanup();

					this.innerDetails = new v({ model: new Company(_g.findChildData(this.model, itemsArray[0])) });
					itemsArray.splice(0,1);
					prefix.push(this.model.get('id'))
					this.body.append(this.innerDetails.render(itemsArray, prefix).el);
				}

				a = h = null;
			}
			return this;
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
})