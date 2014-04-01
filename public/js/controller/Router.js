define([
	'backbone',
	'utils/Global'
], function(B, _g){
	var h = window.history, location, deepLink,
	
	r = function(){
		// remove event listeners to prevent events stack-ing up
		var _delete = function(){
			Backbone.off(_g.events.NAV_CLICKED, _handleClick);
			window.removeEventListener(_g.events.CHANGE_LINK, _handlePop);
		}

		// add event listeners for popstate and handle first run
		var _init = function(){
			_delete();
			Backbone.on(_g.events.NAV_CLICKED, _handleClick);
			window.addEventListener(_g.events.CHANGE_LINK, _handlePop);

			if (document.location.pathname != "/"){
				_handlePop(document.location.pathname);
			}
		}
		
		// handles pushState event
		var _handlePop = function(e){
			if (e.state){
				// triggered by the back / forward button
				if (e.state){
					Backbone.trigger(_g.events.NAV_CLICKED, e.state.prevLink, true);
				}
			}else{
				// triggered by the initial load
				if (e != "/"){ 
					_g.linkToBeLoaded = _g.stripFinalSlash(e);
				}
				// or

				// user pressed back up to the initial link
				// if initial link is root hide details / otherwise load without pushing state
				if (PopStateEvent && e instanceof(PopStateEvent)){
					if (window.location.pathname === "/"){
						_g.details.$el.hide();
					}else{
						Backbone.trigger(_g.events.NAV_CLICKED, window.location.pathname, true);
					}
				}
			}
		}

		// handles backbone triggered event
		var _handleClick = function(model, skipPushState, title){
			deepLink = [];
			title = title || "";
			model = model || "";

			// personal note: 
			// if shomething fails... this is the place it fails from :)		
			location = model;
			deepLink = model.substr(1,model.length).split('/');
			model = _g.collection._byId[deepLink[0]];
			deepLink.splice(0,1);

			if (model instanceof Backbone.Model && _g.currentId != model.get('id')){
				_g.currentId = model.get('id');
				_g.list.$el.find('a').removeClass('selected');
				_g.list.$el.find('#'+_g.currentId).addClass('selected');
			}

			_g.details.model = model;
			_g.details.render(deepLink);

			if (skipPushState != true){
				h.pushState({prevLink: location, title: title}, title, location);	
			}
			location = deepLink = null;
		}

		// start things up
		_init();

		return {
			linkTo: _handleClick,
			remove: _delete
		}
	}
	return r;
});