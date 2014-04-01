module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		pkgData: grunt.file.read('public/resources/testdata.json'),
		requirejs:{
			compile: {
				options: {
					optimize: 'none'
					,baseUrl: "public/js"
					,name: "quanTemplate"
					,paths:{
						jquery: "../../bower_components/jquery/jquery.min"
						,underscore: "../../bower_components/underscore/underscore-min"
						,backbone: "../../bower_components/backbone/backbone-min"
					}
					,shim:{
						backbone: {
							deps: ['underscore','jquery']
							,attach: "Backbone"
						}
					}
					,out: "build/<%= pkg.appName %>.require.js"
					,findNestedDependencies: true
					,removeCombined: true
				}
			}
		},
		concat: {
			options:{ 
				separator: ";\n",
				// add given data and utility functions as banners
				banner: "var _quanDummyData = <%= pkgData %>,trace = function(_m){ console.log(_m);}"
			}
			,dist: {
				src: [
					"node_modules/grunt-contrib-requirejs/node_modules/requirejs/require.js",
					"build/<%= pkg.appName %>.require.js"
				],
				dest: 'build/<%= pkg.appName %>.final.js'
			}
		},
		uglify:{
			options: {
				banner: "/*\n\t<%= pkg.author %> - <%= pkg.name %>\n\t<%= new Date().toString() %>\n*/\n",
				mangle: true,
				compress: true
			},
			dist:{
				files:{
					'public/build/<%= pkg.appName %>.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},
		clean:{
			src: ['build']
		},
		
		copy:{
			main: {
				src: "<%= concat.dist.dest %>",
				dest: "public/build/<%= pkg.appName %>.js"
			}
		}
	});

	for (var ii in grunt.config.data.pkg.devDependencies){
		if (ii.indexOf('grunt-contrib') != -1){
			grunt.log.ok("load task: "+ ii);
			grunt.loadNpmTasks(ii)
		}
	}
	
	grunt.log.warn("\n\nCOMPILING PROJECT DATA:");

	grunt.registerTask('compile', ['requirejs','concat', 'copy', 'uglify', 'clean']);
}