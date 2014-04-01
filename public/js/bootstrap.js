requirejs.config({
	baseUrl: "/js"
	,paths:{
		jquery: "/jquery/jquery.min"
		,underscore: "/underscore/underscore-min"
		,backbone: "/backbone/backbone-min"
	}
	,shim: {
		backbone: {
			deps: ['underscore','jquery']
			,attach: "Backbone"
		}
	}
});

requirejs(['quanTemplate'], function(app){
	window.test = new quanTemplate({link: "/resources/testdata.json"});
})