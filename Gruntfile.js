module.exports = function( grunt ) {

	"use strict";

	var distpaths = [
			"dist/jquery.js",
			"dist/jquery.min.map",
			"dist/jquery.min.js"
		],
		readOptionalJSON = function( filepath ) {
			var data = {};
			try {
				data = grunt.file.readJSON( filepath );
			} catch(e) {}
			return data;
		};

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		dst: readOptionalJSON("dist/.destination.json"),
		compare_size: {
			files: distpaths
		},
		selector: {
			destFile: "src/selector-sizzle.js",
			apiFile: "src/sizzle-jquery.js",
			srcFile: "src/sizzle/sizzle.js"
		},
		build: {
			all:{
				dest: "dist/jquery.js",
				src: [
					"src/intro.js",
					"src/core.js",
					"src/callbacks.js",
					"src/deferred.js",
					"src/support.js",
					"src/data.js",
					"src/queue.js",
					"src/attributes.js",
					"src/event.js",
					{ flag: "sizzle", src: "src/selector-sizzle.js", alt: "src/selector-native.js" },
					"src/traversing.js",
					"src/manipulation.js",
					{ flag: "css", src: "src/css.js" },
					"src/serialize.js",
					{ flag: "event-alias", src: "src/event-alias.js" },
					{ flag: "ajax", src: "src/ajax.js" },
					{ flag: "ajax/script", src: "src/ajax/script.js", needs: ["ajax"]  },
					{ flag: "ajax/jsonp", src: "src/ajax/jsonp.js", needs: [ "ajax", "ajax/script" ]  },
					{ flag: "ajax/xhr", src: "src/ajax/xhr.js", needs: ["ajax"]  },
					{ flag: "effects", src: "src/effects.js", needs: ["css"] },
					{ flag: "offset", src: "src/offset.js", needs: ["css"] },
					{ flag: "dimensions", src: "src/dimensions.js", needs: ["css"] },
					{ flag: "deprecated", src: "src/deprecated.js" },

					"src/exports.js",
					"src/outro.js"
				]
			}
		},

		jshint: {
			dist: {
				src: [ "dist/jquery.js" ],
				options: {
					jshintrc: "src/.jshintrc"
				}
			},
			"closure-compiler": {
				src: [ "dist/jquery.closure-compiler.js" ],
				options: {
					jshintrc: "src/.jshintrc"
				}
			},
			grunt: {
				src: [ "Gruntfile.js" ],
				options: {
					jshintrc: ".jshintrc"
				}
			},
			tests: {
				// TODO: Once .jshintignore is supported, use that instead.
				// issue located here: https://github.com/gruntjs/grunt-contrib-jshint/issues/1
				src: [ "test/data/{test,testinit,testrunner}.js", "test/unit/**/*.js" ],
				options: {
					jshintrc: "test/.jshintrc"
				}
			}
		},

		testswarm: {
			tests: "ajax attributes callbacks core css data deferred dimensions effects event manipulation offset queue selector serialize support traversing Sizzle".split(" ")
		},

		watch: {
			files: [ "<%= jshint.grunt.src %>", "<%= jshint.tests.src %>", "src/**/*.js" ],
			tasks: "dev"
		},

		uglify: {
			all: {
				files: {
					"dist/jquery.min.js": [ "dist/jquery.js" ]
				},
				options: {
					banner: "/*! jQuery v<%= pkg.version %> | (c) 2005, 2013 jQuery Foundation, Inc. | jquery.org/license */",
					sourceMap: "dist/jquery.min.map",
					beautify: {
						ascii_only: true
					}
				}
			}
		},
		"build-closure-compiler": {
			files: [
				"src/closure-compiler.js"
			],
			src: "dist/jquery.js",
			dest: "dist/jquery.closure-compiler.js"
		},
		"closure-compiler": {
			frontend: {
				js: "dist/jquery.closure-compiler.js",
				maxBuffer: 500,
				options: {
					flagfile: "build/closure-compiler/closure-compiler.flags"
				}
			}
		}
	});

	grunt.registerTask( "testswarm", function( commit, configFile ) {
		var jobName,
			testswarm = require( "testswarm" ),
			testUrls = [],
			pull = /PR-(\d+)/.exec( commit ),
			config = grunt.file.readJSON( configFile ).jquery,
			tests = grunt.config([ this.name, "tests" ]);

		if ( pull ) {
			jobName = "jQuery pull <a href='https://github.com/jquery/jquery/pull/" +
				pull[ 1 ] + "'>#" + pull[ 1 ] + "</a>";
		} else {
			jobName = "jQuery commit #<a href='https://github.com/jquery/jquery/commit/" +
				commit + "'>" + commit.substr( 0, 10 ) + "</a>";
		}

		tests.forEach(function( test ) {
			testUrls.push( config.testUrl + commit + "/test/index.html?module=" + test );
		});

		testswarm({
			url: config.swarmUrl,
			pollInterval: 10000,
			timeout: 1000 * 60 * 30,
			done: this.async()
		}, {
			authUsername: config.authUsername,
			authToken: config.authToken,
			jobName: jobName,
			runMax: config.runMax,
			"runNames[]": tests,
			"runUrls[]": testUrls,
			"browserSets[]": "popular-no-old-ie"
		});
	});

	grunt.registerTask( "selector", "Build Sizzle-based selector module", function() {

		var cfg = grunt.config("selector"),
			name = cfg.destFile,
			sizzle = {
				api: grunt.file.read( cfg.apiFile ),
				src: grunt.file.read( cfg.srcFile )
			},
			compiled, parts;

		/**

			sizzle-jquery.js -> sizzle between "EXPOSE" blocks,
			replace define & window.Sizzle assignment


			// EXPOSE
			if ( typeof define === "function" && define.amd ) {
				define(function() { return Sizzle; });
			} else {
				window.Sizzle = Sizzle;
			}
			// EXPOSE

			Becomes...

			Sizzle.attr = jQuery.attr;
			jQuery.find = Sizzle;
			jQuery.expr = Sizzle.selectors;
			jQuery.expr[":"] = jQuery.expr.pseudos;
			jQuery.unique = Sizzle.uniqueSort;
			jQuery.text = Sizzle.getText;
			jQuery.isXMLDoc = Sizzle.isXML;
			jQuery.contains = Sizzle.contains;

		 */

		// Break into 3 pieces
		parts = sizzle.src.split("// EXPOSE");
		// Replace the if/else block with api
		parts[1] = sizzle.api;
		// Rejoin the pieces
		compiled = parts.join("");

		grunt.verbose.writeln("Injected " + cfg.apiFile + " into " + cfg.srcFile);

		// Write concatenated source to file, and ensure newline-only termination
		grunt.file.write( name, compiled.replace( /\x0d\x0a/g, "\x0a" ) );

		// Fail task if errors were logged.
		if ( this.errorCount ) {
			return false;
		}

		// Otherwise, print a success message.
		grunt.log.writeln( "File '" + name + "' created." );
	});


	// Special "alias" task to make custom build creation less grawlix-y
	grunt.registerTask( "custom", function() {
		var done = this.async(),
				args = [].slice.call(arguments),
				modules = args.length ? args[0].replace(/,/g, ":") : "";


		// Translation example
		//
		//   grunt custom:+ajax,-dimensions,-effects,-offset
		//
		// Becomes:
		//
		//   grunt build:*:*:+ajax:-dimensions:-effects:-offset

		grunt.log.writeln( "Creating custom build...\n" );

		grunt.util.spawn({
			cmd: process.platform === "win32" ? "grunt.cmd" : "grunt",
			args: [ "build:*:*:" + modules, "uglify", "dist" ]
		}, function( err, result ) {
			if ( err ) {
				grunt.verbose.error();
				done( err );
				return;
			}

			grunt.log.writeln( result.stdout.replace("Done, without errors.", "") );

			done();
		});
	});

	// Special concat/build task to handle various jQuery build requirements
	//
	grunt.registerMultiTask(
		"build",
		"Concatenate source (include/exclude modules with +/- flags), embed date/version",
		function() {

			// Concat specified files.
			var compiled = "",
				modules = this.flags,
				optIn = !modules["*"],
				explicit = optIn || Object.keys(modules).length > 1,
				name = this.data.dest,
				src = this.data.src,
				deps = {},
				excluded = {},
				version = grunt.config( "pkg.version" ),
				excluder = function( flag, needsFlag ) {
					// optIn defaults implicit behavior to weak exclusion
					if ( optIn && !modules[ flag ] && !modules[ "+" + flag ] ) {
						excluded[ flag ] = false;
					}

					// explicit or inherited strong exclusion
					if ( excluded[ needsFlag ] || modules[ "-" + flag ] ) {
						excluded[ flag ] = true;

					// explicit inclusion overrides weak exclusion
					} else if ( excluded[ needsFlag ] === false &&
						( modules[ flag ] || modules[ "+" + flag ] ) ) {

						delete excluded[ needsFlag ];

						// ...all the way down
						if ( deps[ needsFlag ] ) {
							deps[ needsFlag ].forEach(function( subDep ) {
								modules[ needsFlag ] = true;
								excluder( needsFlag, subDep );
							});
						}
					}
				};

			// append commit id to version
			if ( process.env.COMMIT ) {
				version += " " + process.env.COMMIT;
			}

			// figure out which files to exclude based on these rules in this order:
			//  dependency explicit exclude
			//  > explicit exclude
			//  > explicit include
			//  > dependency implicit exclude
			//  > implicit exclude
			// examples:
			//  *                  none (implicit exclude)
			//  *:*                all (implicit include)
			//  *:*:-css           all except css and dependents (explicit > implicit)
			//  *:*:-css:+effects  same (excludes effects because explicit include is trumped by explicit exclude of dependency)
			//  *:+effects         none except effects and its dependencies (explicit include trumps implicit exclude of dependency)
			src.forEach(function( filepath ) {
				var flag = filepath.flag;

				if ( flag ) {

					excluder(flag);

					// check for dependencies
					if ( filepath.needs ) {
						deps[ flag ] = filepath.needs;
						filepath.needs.forEach(function( needsFlag ) {
							excluder( flag, needsFlag );
						});
					}
				}
			});

			// append excluded modules to version
			if ( Object.keys( excluded ).length ) {
				version += " -" + Object.keys( excluded ).join( ",-" );
				// set pkg.version to version with excludes, so minified file picks it up
				grunt.config.set( "pkg.version", version );
			}


			// conditionally concatenate source
			src.forEach(function( filepath ) {
				var flag = filepath.flag,
						specified = false,
						omit = false,
						messages = [];

				if ( flag ) {
					if ( excluded[ flag ] !== undefined ) {
						messages.push([
							( "Excluding " + flag ).red,
							( "(" + filepath.src + ")" ).grey
						]);
						specified = true;
						omit = !filepath.alt;
						if ( !omit ) {
							flag += " alternate";
							filepath.src = filepath.alt;
						}
					}
					if ( excluded[ flag ] === undefined ) {
						messages.push([
							( "Including " + flag ).green,
							( "(" + filepath.src + ")" ).grey
						]);

						// If this module was actually specified by the
						// builder, then set the flag to include it in the
						// output list
						if ( modules[ "+" + flag ] ) {
							specified = true;
						}
					}

					filepath = filepath.src;

					// Only display the inclusion/exclusion list when handling
					// an explicit list.
					//
					// Additionally, only display modules that have been specified
					// by the user
					if ( explicit && specified ) {
						messages.forEach(function( message ) {
							grunt.log.writetableln( [ 27, 30 ], message );
						});
					}
				}

				if ( !omit ) {
					compiled += grunt.file.read( filepath );
				}
			});

			// Embed Version
			// Embed Date
			compiled = compiled.replace( /@VERSION/g, version )
				.replace( "@DATE", function () {
					var date = new Date();

					// YYYY-MM-DD
					return [
						date.getFullYear(),
						date.getMonth() + 1,
						date.getDate()
					].join( "-" );
				});

			// Write concatenated source to file
			grunt.file.write( name, compiled );

			// Fail task if errors were logged.
			if ( this.errorCount ) {
				return false;
			}

			// Otherwise, print a success message.
			grunt.log.writeln( "File '" + name + "' created." );

			grunt.task.run( "build-closure-compiler" );
		});

	// Process files for distribution
	grunt.registerTask( "dist", function() {
		var flags, paths, stored;

		// Check for stored destination paths
		// ( set in dist/.destination.json )
		stored = Object.keys( grunt.config("dst") );

		// Allow command line input as well
		flags = Object.keys( this.flags );

		// Combine all output target paths
		paths = [].concat( stored, flags ).filter(function( path ) {
			return path !== "*";
		});

		// Ensure the dist files are pure ASCII
		var fs = require("fs"),
			nonascii = false;

		distpaths.forEach(function( filename ) {
			var i, c, map,
				text = fs.readFileSync( filename, "utf8" );

			// Ensure files use only \n for line endings, not \r\n
			if ( /\x0d\x0a/.test( text ) ) {
				grunt.log.writeln( filename + ": Incorrect line endings (\\r\\n)" );
				nonascii = true;
			}

			// Ensure only ASCII chars so script tags don't need a charset attribute
			if ( text.length !== Buffer.byteLength( text, "utf8" ) ) {
				grunt.log.writeln( filename + ": Non-ASCII characters detected:" );
				for ( i = 0; i < text.length; i++ ) {
					c = text.charCodeAt( i );
					if ( c > 127 ) {
						grunt.log.writeln( "- position " + i + ": " + c );
						grunt.log.writeln( "-- " + text.substring( i - 20, i + 20 ) );
						break;
					}
				}
				nonascii = true;
			}

			// Modify map/min so that it points to files in the same folder;
			// see https://github.com/mishoo/UglifyJS2/issues/47
			if ( /\.map$/.test( filename ) ) {
				text = text.replace( /"dist\//g, "\"" );
				fs.writeFileSync( filename, text, "utf-8" );
			} else if ( /\.min\.js$/.test( filename ) ) {
				// Wrap sourceMap directive in multiline comments (#13274)
				text = text.replace( /\n?(\/\/@\s*sourceMappingURL=)(.*)/,
					function( _, directive, path ) {
						map = "\n" + directive + path.replace( /^dist\//, "" );
						return "";
					});
				if ( map ) {
					text = text.replace( /(^\/\*[\w\W]*?)\s*\*\/|$/,
						function( _, comment ) {
							return ( comment || "\n/*" ) + map + "\n*/";
						});
				}
				fs.writeFileSync( filename, text, "utf-8" );
			}

			// Optionally copy dist files to other locations
			paths.forEach(function( path ) {
				var created;

				if ( !/\/$/.test( path ) ) {
					path += "/";
				}

				created = path + filename.replace( "dist/", "" );
				grunt.file.write( created, text );
				grunt.log.writeln( "File '" + created + "' created." );
			});
		});

		return !nonascii;
	});

	grunt.registerTask(
			"build-closure-compiler",
			"Add closure-compiler definitions to the distribution source",
			function() {
				// Concat specified files.
				
				var cfg = grunt.config("build-closure-compiler"),
					compiled = grunt.file.read( cfg.src ),
					startIndex = compiled.indexOf( "*/" ) + 2,
					endIndex = compiled.indexOf( "{", startIndex),
					intro = compiled.substr(0, startIndex);
		
				compiled = intro + compiled.substr(endIndex + 1);
				compiled = compiled.substr(0, compiled.lastIndexOf( "}" ));

				cfg.files.forEach( function(file) {
					compiled += grunt.file.read( file );
				});

				// Write concatenated source to file
				grunt.file.write( cfg.dest, compiled );
				
				grunt.log.writeln( "File '" + cfg.dest + "' created." );
				grunt.task.run( "jshint:closure-compiler" );
			});

	// Load grunt tasks from NPM packages
	grunt.loadNpmTasks("grunt-compare-size");
	grunt.loadNpmTasks("grunt-git-authors");
	grunt.loadNpmTasks("grunt-update-submodules");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-closure-compiler");

	// Default grunt
	grunt.registerTask( "default", [ "update_submodules", "selector", "build:*:*", "jshint", "uglify", "dist:*" ] );

	// Short list as a high frequency watch task
	grunt.registerTask( "dev", [ "selector", "build:*:*", "jshint" ] );
	
	grunt.registerTask( "tests-compiled", [ "selector", "build:*:*", "build-closure-compiler", "closure-compiler" ] );
};