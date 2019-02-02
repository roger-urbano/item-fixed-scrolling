/* Config Gulp Task */
var gulp = require('gulp'),
	nib = require('nib'),
	swig = require('gulp-swig'),
	connect = require('gulp-connect'),
	concat = require('gulp-concat'),
	stylus = require('gulp-stylus'),
	plumber = require('gulp-plumber'),
	findPort = require('find-port'),
	jade = require('gulp-jade'),
	shell = require('gulp-shell');

// Funciones Globales
function makeid(){
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for( var i=0; i < 8; i++ )
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}

function StartsWith(s1, s2) {
  return (s1.length >= s2.length && s1.substr(0, s2.length) == s2);
}

//Variables de Templates
var server_port = 8080;
findPort(server_port, server_port+10, function(ports) {
		server_port = ports[0];
	});

//Directorios de sistema
var path = {
	jade: ['source/jade/**/*.jade'],
	jade_build: 'source/appjade/',
	html_build: 'source/app/',
	html_build_prod: 'source/build/',
	html_build_blocks: 'source/app/blocks/',
	html_swig_blocks: 'source/templates/blocks/*.html',
	html_swig: ['source/templates/*.html','source/templates/common/*.html'],
	html_swig_production: ['source/templates/*.html'],
	//html_swig_common: 'source/templates/common/*.html',
	master_styl: 'source/static/stylus/styles.styl',
	production_styl: 'source/static/stylus/production.styl',
	stylus_dirs: 'source/static/stylus/**/*.styl',
	stylus_blocks_dir: 'source/static/stylus/blocks/*.styl',
	css_builds: 'source/static/css/builds/*.css',
	css_builds_dir: 'source/static/css/builds/',
	css: 'source/static/css/',
	js: 'source/static/js/',
	jsmin: 'source/static/js-mim/',
},
CONST = {
	ROOT : 'source/'
};

//Livereload - Watch Taks HTML - CSS
gulp.task('connect', function(){
	connect.server({
		root: CONST.ROOT,
		port: server_port,
		livereload: true
	});
});

// Jinja2 Compiler
function get_range_funtion (input) {
	var data = [];
	var length = input; // user defined length
	for(var i = 0; i < length; i++) {
		data.push(makeid());
	}
	return data
}
function cycle_funtion (input,index_loop) {
	index_loop = parseInt(index_loop);
	var data_cycle = input.split(',');
	var index_cycle = index_loop % data_cycle.length;
	return data_cycle[index_cycle] // user defined length
}
gulp.task('builder', function() {
	console.log("[00:00:00] Compilando html's on /app/*.html");
	var templates_vars = {
		setup: function(swig) {
			swig.setFilter('get_range', get_range_funtion);
			swig.setFilter('cycle', cycle_funtion);
		},
		load_json: true,
		defaults: {
			cache: false
		},
		data: {
			STATIC_URL : '../static/',
			PROD_CSS:'',
			BUILD_ID : makeid()
		}
	}
	return gulp.src(path.html_swig)
	.pipe(plumber())
	.pipe(swig(templates_vars))
	.pipe(plumber.stop())
	.pipe(gulp.dest(path.html_build))});

gulp.task('builder_prod', function() {
	console.log("[00:00:00] Compilando html's para production on /builds/home.html");
	console.log("[00:00:00] no including _base*.html _header.html _footer.html nada dentro de source/common/ y blocks");
	console.log(">>>>>>>>>> Levantar Gulp y obtener el listado de html's en http://127.0.0.1:8080/build/");
	var templates_vars = {
		setup: function(swig) {
			swig.setFilter('get_range', get_range_funtion);
			swig.setFilter('cycle', cycle_funtion);
		},
		load_json: true,
		defaults: {
			cache: false
		},
		data: {
			STATIC_URL : '/static/',
			PROD_CSS : '<link rel="stylesheet" type="text/css" href="/static/css/production.css?v='+makeid()+'"/>',
			BUILD_ID : makeid()
		}
	}
	return gulp.src(path.html_swig_production)
	.pipe(swig(templates_vars))
	.pipe(gulp.dest(path.html_build_prod))});

gulp.task('builder_blocks', function() {
	console.log("[00:00:00] Compilando blocks's on /app/blocks/*.html");
	var templates_vars = {
		setup: function(swig) {
			swig.setFilter('get_range', get_range_funtion);
			swig.setFilter('cycle', cycle_funtion);
		},
		load_json: true,
		defaults: {
			cache: false
		},
		data: {
			STATIC_URL : '../../static/',
			BUILD_ID : makeid()
		}
	}
	return gulp.src(path.html_swig_blocks)
	.pipe(plumber())
	.pipe(swig(templates_vars))
	.pipe(plumber.stop())
	.pipe(gulp.dest(path.html_build_blocks))});

// Reload Server Function
gulp.task('reload_server', function () {
	// Se retrasa a 0.2 segundos el LiveReload
	setTimeout(function () {
		return gulp.src(path.html_build).pipe(connect.reload()).on('end', function(){
				console.log('>>>>>>>>>> Navegador refrescado...');
			});
	}, 768);
});

// Concat Css
gulp.task('concat_css', function () {
	setTimeout(function () {
		return gulp.src(path.css_builds)
		.pipe(plumber())
		.pipe(concat('blocks_styl.css'))
		.pipe(plumber.stop())
		.pipe(gulp.dest(path.css)).on('end', function(){
				console.log('>>>>>>>>>> Css Concatenados perfectamente...');
			})
	}, 256);
});

// Stylus Compiler
gulp.task('stylus', function () {
	return gulp.src(path.master_styl)
	.pipe(plumber())
	.pipe(stylus({ use: nib(),  import: ['nib'], compress:true}))
	.pipe(plumber.stop())
	.pipe(gulp.dest(path.css))});



// Stylus Compiler
gulp.task('stylus_prod', function () {
	return gulp.src(path.production_styl)
	//.pipe(plumber())
	.pipe(stylus({ use: nib(),  import: ['nib'], compress:true}))
	//.pipe(plumber.stop())
	.pipe(gulp.dest(path.css))});


// Stylus Compiler
gulp.task('stylus_blocks', function () {
	return gulp.src(path.stylus_blocks_dir)
	.pipe(plumber())
	.pipe(stylus({ use: nib(),  import: ['nib','../config/identity'], compress:true}))
	.pipe(plumber.stop())
	.pipe(gulp.dest(path.css_builds_dir)).on('end', function(){
		setTimeout(function () {
			return gulp.src(path.css_builds)
			.pipe(plumber())
			.pipe(concat('blocks_styl.css'))
			.pipe(plumber.stop())
			.pipe(gulp.dest(path.css)).on('end', function(){
				console.log('>>>>>>>>>> Css Concatenados perfectamente...');
			})
		}, 1);
	})});

// Jade Compiler Function
gulp.task('jade', function() {
	var build_vars = {
		STATIC_URL:'/static/'
	}
	return gulp.src(path.jade)
	.pipe(jade({
		pretty: true,
		locals: build_vars
	}))
	.pipe(gulp.dest(path.jade_build))});

function styl_com_con(file){
	if (StartsWith(file.path,"/")){
		file_name = file.path.split('/')[file.path.split('/').length - 1];
	}else{
		file_name = file.path.split('\\')[file.path.split('\\').length - 1];
	}
	console.log('>>>>>>>>>> Compiling '+file_name+' : running tasks...');
	gulp.src(file.path)
	.pipe(plumber())
	.pipe(stylus({ use: nib(),  import: ['nib','../config/identity']}))
	.pipe(plumber.stop())
	.pipe(gulp.dest(path.css_builds_dir))
	console.log('>>>>>>>>>> Compiled! '+file_name);
}

// watchers filePaths #withReload
gulp.task('watch', function () {
	gulp.watch(path.stylus_blocks_dir, ['concat_css']).on('change', function(file) {return styl_com_con(file);});
	gulp.watch(path.stylus_dirs, ['stylus','reload_server']);
	gulp.watch(path.jade, ['jade','reload_server']);
	gulp.watch(path.html_swig, ['builder','reload_server']);
	gulp.watch(path.html_swig_blocks, ['builder_blocks','reload_server']);
});
// watchers filePaths #withoutReload
gulp.task('watch_nr', function () {
	gulp.watch(path.stylus_blocks_dir, ['concat_css']).on('change', function(file) {return styl_com_con(file);});
	gulp.watch(path.stylus_dirs, ['stylus']);
	gulp.watch(path.jade, ['jade']);
	gulp.watch(path.html_swig, ['builder']);
	gulp.watch(path.html_swig_blocks, ['builder_blocks']);
});

// // StartServer and CompilerStylus
gulp.task('default', ['stylus_blocks','builder','builder_blocks','stylus','watch','connect']);
gulp.task('sr', ['builder','stylus','watch_nr','connect']);
gulp.task('prod', ['stylus_prod','builder_prod']);
