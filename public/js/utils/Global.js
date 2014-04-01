define(['backbone', 'models/Company'], function(B, company){
	var c = Backbone.Collection.extend({ model: company });

	return {
		tableHeaders: ["Name", "Created", "Updated"]
		,collection: new c()
		,baseURL: (function(){
			return window.location.pathname
		})()
		
		,initialData: null
		,isReady: false
		,currentId: null


		,router: null
		,body: null
		,list: null
		,details: null

		,events:{
			NAV_CLICKED: 'showData',
			CHANGE_LINK: 'popstate'
		}

		// helper functions
		,parseDate: function(date){
			var m = date.getMonth().toString(),d = date.getDate().toString();
			return [this.fixDecimals(d), this.fixDecimals(m), date.getFullYear()].join('/')
		}
		,fixDecimals: function(unit){
			if (unit.length === 1){ return "0"+unit;}
			return unit;
		}
		,stripFinalSlash: function(location){
			if (typeof(location) != 'string') return "/";
			var k = location.split("");
			if (k[k.length-1] === "/"){
				k.pop()
				return k.join("");
			}else{
				k = null;
				return location;
			}
		}
		,stripLinkOrigin: function(link){
			return link.replace(window.location.origin,"");
		}
		,findChildData: function(model, childId){
			var res = null;
			model.get('children').forEach(function(child, i){ if (child.id === childId){res = child;} });
			return res;
		}

		// when all data is loaded, add it to the collection
		// signal app is ready and populate views with data
		// if any is available from the router
		,parseLoadedData: function(loadedData){
			for (var ii in loadedData){
				this.collection.add(loadedData[ii])
			}
			this.isReady = true;

			// check for link and load data accordingly
			if (this.linkToBeLoaded){
				Backbone.trigger(this.events.NAV_CLICKED, this.linkToBeLoaded, false)
				this.linkToBeLoaded = null;
				delete this.linkToBeLoaded;
			}
		}
	}
})