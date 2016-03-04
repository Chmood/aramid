////////////////////////////////////////
// GULPFILE.JS
////////////////////////////////////////

// TODO :
//
// * jspm (or webpack/browserify at least)
// * split gulpfile into multiple subtasks files
// 		* Require all tasks in the "gulp" folder.
//		* requireDir("./gulp", { recurse: false });
// *
// * gulp-tap (tools)
// * gulp-cache/remember?
// * gulp-useref
// * gulp-notify (system notifications)
// * autodoc (js, scss)?
// * psi (PageSpeed Insights)
// * unit tests!
//
// INSPIRATION :
//
// https://github.com/osscafe/gulp-cheatsheet
// https://github.com/google/web-starter-kit/blob/master/gulpfile.babel.js


////////////////////////////////////////
// CONFIGURATION

global.config = {
	path: {
		src:    "src/",
    dist:   "dist/",
		tmp:    ".tmp/",
    doc:    ".doc/",
		css:    "css/",
		scss:   "scss/",
    es:     "es6/",
		js:     "js/",
		img:    "img/",
		fonts:  "fonts/",
	},

	// Order-dependant javascript files static build

  filesJs: [
    "node_modules/jquery/dist/jquery.js",
    // "node_modules/bootstrap-sass/assets/javascripts/bootstrap/transition.js",
    // "node_modules/bootstrap-sass/assets/javascripts/bootstrap/collapse.js",
    // "node_modules/bootstrap-sass/assets/javascripts/bootstrap/affix.js",
    // "node_modules/bootstrap-sass/assets/javascripts/bootstrap/alert.js",
    // "node_modules/bootstrap-sass/assets/javascripts/bootstrap/button.js",
    // "node_modules/bootstrap-sass/assets/javascripts/bootstrap/carousel.js",
    // "node_modules/bootstrap-sass/assets/javascripts/bootstrap/dropdown.js",
    // "node_modules/bootstrap-sass/assets/javascripts/bootstrap/modal.js",
    // "node_modules/bootstrap-sass/assets/javascripts/bootstrap/tooltip.js",
    // "node_modules/bootstrap-sass/assets/javascripts/bootstrap/popover.js",
    // "node_modules/bootstrap-sass/assets/javascripts/bootstrap/scrollspy.js",
    // "node_modules/bootstrap-sass/assets/javascripts/bootstrap/tab.js",
    "src/es6/main.js"
  ],

  // filesEs: [  // TODO ? (separate es5 from es6 scripts)
  //   "src/es6/module.js",
  //   "src/es6/app.js",
  //   "src/es6/main.js"
  // ],

	// Server config

	serverport: 3000,
  openBrowser: false,
  openBrowsers: ["google chrome", "firefox"],
};

// COMPOSITE PATHS

// Misc paths
config.pathTmp =        config.path.src + config.path.tmp;
config.pathCssTmp =     config.pathTmp + config.path.css;
config.pathDoc =        config.path.src + config.path.doc;
config.pathStyleguide = config.pathDoc + "styleguide/";

// Source paths
config.pathEs =         [config.path.src + config.path.es + "**/*.js"];
config.pathScss =       [config.path.src + config.path.scss + "**/*.scss"];
config.pathSpritesSVG = [config.path.src + config.path.img + "sprites/*.svg"];
config.pathImages =     [config.path.src + config.path.img + "*.*", "!" + config.pathSpritesSVG];
config.pathHtml =       [config.path.src + "*.html", config.pathStyleguide + "*.html"];

// Destination
config.pathJsDest =     config.path.dist + config.path.js;
config.pathCssDest =    config.path.dist + config.path.css;
config.pathFontsDest =  config.path.dist + config.path.fonts;
config.pathImagesDest = config.path.dist + config.path.img;

// Clean
config.pathClean =      [
  config.path.dist,
  config.pathTmp + config.path.js,
  config.pathTmp + config.path.css
];


////////////////////////////////////////
// MODULES

var gulp =        	require("gulp"),
		// auto-load all gulp plugins
    plugins =     	require("gulp-load-plugins")(),
		// non-gulp tools
    browserSync = 	require("browser-sync"),
    reload =      	browserSync.reload,
		del =         	require("del"),
    fs =     	    	require("node-fs"),
    vinylPaths =  	require("vinyl-paths"),
    autoprefixer = 	require("autoprefixer"),
		styleguide = 		require("postcss-style-guide"),
    runSequence  = 	require("run-sequence"),
		colors  = 			require("colors"),
		beep = 					require("beepbeep");

require("gulp-stats")(gulp);


////////////////////////////////////////
// ERROR HANDLING

var onError = function (e) {
	beep();	// Ubuntu MATE needs love
	if (e) {
		console.log(e);
		// LibSass
		if (e.plugin) console.log("ERROR".bold.red + " - " + e.plugin.bold.yellow);
		if (e.file) console.log("Error in: " + e.file);
		if (e.line && e.column) console.log("Error at: line " + e.line + " - column " + e.column);
//		if (e.messageFormatted) console.log(e.messageFormatted.red);
		// Babel
		if (e.name) console.log((e.name + " " + e.message).bold.red);
		if (e.codeFrame) console.log(e.codeFrame);

		// ommit this and watch task will stop working!
		this.emit("end");
	}
};


////////////////////////////////////////
// INTERNAL TASKS

// UTILS

// Clean

gulp.task("clean", function () {
	return gulp.src(config.pathClean)
    .pipe(vinylPaths(del))
});

// Copy

gulp.task("copy", ["copy-fonts"]);

gulp.task("copy-fonts", function () {
	return gulp.src([
		  "node_modules/font-awesome/fonts/*"
		])
		.pipe(gulp.dest(config.pathFontsDest))
});


// IMAGES

gulp.task("images", function() {
	return gulp.src(config.pathImages)
  .pipe(plugins.newer(config.pathImagesDest))

  // prod
  .pipe(plugins.imagemin({
    progressive: true,  // jpeg
    interlaced: true,   // gif
    multipass: true,    // svg
    // svgoPlugins: [{removeViewBox: false}],
    // use: [pngquant()]
  }))
  .pipe(gulp.dest(config.pathImagesDest))
  .pipe(reload({stream: true}));
});

// SVG sprites

gulp.task("sprites", function() {
  return gulp.src(config.pathSpritesSVG)

    // prod
    .pipe(plugins.svgSprite({
        log: null,
        mode: {inline: true, symbol: true}
    }))
    .pipe(gulp.dest(config.path.src + config.path.img))
    .pipe(gulp.dest(config.pathImagesDest))
    .pipe(reload({stream: true}))
});

gulp.task("sprites-reload", ["sprites"], reload);


// MARKUP

gulp.task("markup", function() {
	return gulp.src(config.pathHtml)

		// prod
		.pipe(plugins.processhtml())
		.pipe(plugins.minifyHtml())
		.pipe(gulp.dest(config.path.dist))
    .pipe(reload({stream: true}))
});


// STYLES

gulp.task("styles", function(){

  return gulp.src([config.path.src + config.path.scss + "main.scss"])
		.pipe(plugins.plumber(onError))
    .pipe(plugins.scssLint({"config": "scsslint.yml"}))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass({outputStyle: "expanded"}))
    .pipe(plugins.postcss([
	    autoprefixer({
	      browsers: ["last 2 version"]
	    })
	  ]))
    .pipe(plugins.sourcemaps.write({sourceRoot: "."}))
		.pipe(gulp.dest(config.pathTmp + config.path.css))
    .pipe(reload({stream: true}))

		// prod
		.pipe(plugins.minifyCss({
			keepSpecialComments: false,
			removeEmpty: true
		}))
		.pipe(plugins.rename({suffix: ".min"}))
		.pipe(gulp.dest(config.pathCssDest))
    .pipe(reload({stream: true}))
});

gulp.task("styleguide", function(){

//	return gulp.src([config.path.src + config.path.scss + "_foo.scss"])
  return gulp.src([config.pathCssTmp + "main.css"])
    .pipe(plugins.postcss([
			styleguide({
	      name: "Project name",
				dir: config.pathStyleguide,
				file: "index.html",
				// showCode: true,
	      processedCSS: fs.readFileSync(config.pathCssTmp + "main.css", "utf-8"),
				// theme: "sassline"	// TODO BUG : themes not working
	    })
	  ]))
    .pipe(reload({stream: true}))
});


// SCRIPTS

gulp.task("scripts", function() {
	return gulp.src(config.filesJs)
		.pipe(plugins.plumber(onError))
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format())
//    .pipe(plugins.eslint.failAfterError())
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.babel({
          presets: ["es2015"],
          compact: false
        }))
    .pipe(plugins.concat("main.js"))
    .pipe(plugins.sourcemaps.write({sourceRoot: "."}))
    .pipe(gulp.dest(config.pathTmp + config.path.js))

    // prod
    .pipe(plugins.rename({suffix: ".min"}))
		.pipe(plugins.uglify({outSourceMaps: false}))
		.pipe(gulp.dest(config.pathJsDest))
    .pipe(reload({stream: true}))
//		.on("error", plugins.util.log);	// gulp-plumber deprecates this?
});


// SERVER

gulp.task("serve", function() {
  browserSync({
    server: {
      baseDir: ["./"],
      routes: {
				"/dev": "./" + config.path.src,
				"/styleguide": "./" + config.pathStyleguide,
        "/prod": "./" + config.path.dist,
      },
      port: config.serverport
    },
    open: config.openBrowser,
    browser: config.openBrowsers,
    // notify: false,
    // Open the first browser window at URL + "/info.php"
    // startPath: "/info.php"
  });
});

// WATCH

gulp.task("watch", function () {
	var watchers = {
		"": []
	};
	gulp.watch(config.pathEs, ["scripts"]);
	gulp.watch(config.pathScss, ["styles"]);
	gulp.watch(config.pathCssTmp + "main.css", ["styleguide"]);
  gulp.watch(config.pathHtml, ["markup"]);
  gulp.watch(config.pathImages, ["images"]);
	gulp.watch(config.pathSpritesSVG, ["sprites-reload"]);
});


////////////////////////////////////////
// USER TASKS

gulp.task("style-n-guide", function() { runSequence("styles","styleguide"); });
gulp.task("compile", ["scripts", "style-n-guide", "markup"]);
gulp.task("graphics", ["images", "sprites"]);
gulp.task("swatch", ["serve", "watch"]);

gulp.task("build", function() { runSequence( "clean", ["compile", "graphics"] ); });
gulp.task("bwatch", function() { runSequence( "build", "swatch" ); });

gulp.task("default", ["swatch"]);
