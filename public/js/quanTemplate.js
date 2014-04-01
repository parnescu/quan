define([
	'utils/Global'
	,'views/NavList'
	,'views/Details'
	,'controller/Router'
], function(_g, List, Details, Router){
	q = function(initialData){
		// prepare basic elements
		_g.body = $('#main');
		_g.initialData = initialData;
		_g.router = new Router();
		

		// build & render views
		_g.list = new List()
		_g.details = new Details();
		_g.body.prepend(_g.list.render().el);
		_g.body.find('#content').append(_g.details.render().el);


		// parse data and signal application is ready
		if (_g.initialData){
			switch(true){
				case typeof(_g.initialData.link) === "string":
					// load the json data
					$.getJSON(_g.initialData.link,function(data, isLoaded){
						if (isLoaded === 'success'){
							_g.parseLoadedData(data);
						}else{
							// handle error
							_g.isReady = true;
						}
					})
					break;
				case typeof(_g.initialData.data) === "object":
					_g.parseLoadedData(_g.initialData.data);
					break;
			}
		}else{
			_g.parseLoadedData();
		}

		// T.B.D for privacy function this should return only the collection or {}
		return _g;
	}

	// also make our plugin available for global scope
	window.quanTemplate = q;
	return q;
})