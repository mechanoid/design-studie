var gulp = require('gulp'),
    util = require('gulp-util'),
    watch = require('gulp-watch'),
    http = require('http'),
    livereload = require('gulp-livereload'),
    stylus = require('gulp-stylus'),
    nib = require('nib'),
    jeet = require('jeet'),
    rupture = require('rupture'),
    ecstatic = require('ecstatic');

var stylusRoot = __dirname + '/src/stylus';

gulp.task('app.stylus', function () {
  gulp.src(stylusRoot + '/app.styl')
    .pipe(stylus({use: [nib(), rupture(), jeet()]}))
    .pipe(gulp.dest('./build/css'));
});


gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(stylusRoot + '/**/*.styl', ['app.stylus'])
  .on('change', livereload.changed);
});


gulp.task('createServer', function() {
  http.createServer(
    ecstatic({ root: __dirname })
  ).listen(1234);
});


gulp.task('default', ['app.stylus'], function(){});

gulp.task('server', ['app.stylus', 'watch', 'createServer']);
