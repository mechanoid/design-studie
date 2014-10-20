var gulp = require('gulp'),
    watch = require('gulp-watch'),
    http = require('http'),
    stylus = require('gulp-stylus'),
    nib = require('nib'),
    rupture = require('rupture'),
    ecstatic = require('ecstatic');

var stylusRoot = './src/stylus';

gulp.task('app.stylus', function () {
  gulp.src(stylusRoot + '/app.styl')
    .pipe(stylus({use: [nib(), rupture()]}))
    .pipe(gulp.dest('./build/css'));
});


gulp.task('watch', function() {
  gulp.watch(stylusRoot + '/**/*.styl');
});


gulp.task('createServer', function() {
  http.createServer(
    ecstatic({ root: __dirname })
  ).listen(1234);
});


gulp.task('default', ['app.stylus'], function(){});

gulp.task('server', ['app.stylus', 'watch', 'createServer']);
