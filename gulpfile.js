var gulp = require('gulp'),
    watch = require('gulp-watch'),
    http = require('http'),
    stylus = require('gulp-stylus'),
    nib = require('nib'),
    rupture = require('rupture'),
    ecstatic = require('ecstatic');

gulp.task('app.stylus', function () {
  gulp.src('./src/stylus/app.styl')
    .pipe(stylus({use: [nib(), rupture()]}))
    .pipe(gulp.dest('./build/css/app.css'));
});


gulp.task('watch', function() {
  gulp.watch('/stylus/**/*.js', ['jsDependencies']);
});


gulp.task('createServer', function() {
  http.createServer(
    ecstatic({ root: __dirname })
  ).listen(1234);
});


gulp.task('default', ['app.stylus'], function(){});

gulp.task('server', ['watch', 'createServer']);
