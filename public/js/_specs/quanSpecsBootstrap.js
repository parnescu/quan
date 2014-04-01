require.config({
    urlArgs: 'cb=' + Math.random(),
    baseUrl: '../js',
    paths: {
        jquery: "/jquery/jquery.min"
		,underscore: "/underscore/underscore-min"
		,backbone: "/backbone/backbone-min"
        
        ,jasmine: '/jasmine/lib/jasmine-core/jasmine'
        ,jasmineHTML: '/jasmine/lib/jasmine-core/jasmine-html'
    }
    ,shim: {
        jasmine: {
            exports: 'jasmine'
        },
        jasmineHTML: {
            deps: ['jasmine'],
            exports: 'jasmine'
        },
        backbone:{
            deps: ['jquery','underscore'],
            exports: "Backbone"
        }
    }
});


require(['jquery', 'jasmineHTML', 'quanTemplate'], function ($, jasmine) {
    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function (spec) {
        return htmlReporter.specFilter(spec);
    };



    var specs = [];
    specs.push('js/_specs/quanSpecs.js');

    $(function () {
        require(specs, function (spec) {
            jasmineEnv.execute();
        });
    });

});