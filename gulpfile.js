"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); // runs a local dev server
var open = require('gulp-open'); // open a URL in a web browser

var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

var concat = require('gulp-concat');	// concat css files
var lint = require('gulp-eslint');	// lint js files incl. jsx
var minifyHTML = require('gulp-minify-html'); // html minification, post process

var babel = require('babelify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');

var config = {
	port: 9005,
	devBaseUrl: 'http://localhost',
	paths: {
		html: './src/*.html',
		js: './src/**/*.js',
		images: './src/images/*',
		css: [
			'node_modules/bootstrap/dist/css/bootstrap.min.css',
			'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
			'./src/css/*.css'
		],
		cssPath: './src/css/*.css',
		mainJs: './src/main.js',
		dist: './dist'
	}
}

// start a local dev server
gulp.task('connect', function () {
	connect.server({
		root: ['dist'],
		port: config.port,
		base: config.devBaseUrl,
		livereload: true
	});
});

gulp.task('open', ['connect'], function(){
	gulp.src('dist/index.html')
		.pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/' }));
});

gulp.task('html', function () {
	gulp.src(config.paths.html)
	 	.pipe(minifyHTML())
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
});

gulp.task('js', function () {
	browserify({
	        entries: [config.paths.mainJs], // Only need initial file, browserify finds the deps
	        transform: [babel, reactify], // We want to convert JSX to normal javascript
	        debug: true, // Gives us sourcemapping
	        cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
	    })
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload());
});

gulp.task('css', function () {
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('images', function () {
	gulp.src(config.paths.images)
		.pipe(gulp.dest(config.paths.dist + '/images'))
		.pipe(connect.reload());
});

gulp.task('lint', function() {
	return null;
	return gulp.src(config.paths.js)
		.pipe(lint({config: 'eslint.config.json'}))
		.pipe(lint.format());
});

gulp.task('watch', function () {
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.js, ['js', 'lint']);
	gulp.watch(config.paths.cssPath, ['html', 'css']);
});

gulp.task('default', ['html', 'js', 'css','images', 'lint', 'open', 'watch']);

