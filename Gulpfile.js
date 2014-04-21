var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var less = require('gulp-less');
var path = require('path');

var paths = {
  scripts: ['js/**/*.js'],
  images: 'img/**/*',
  styles: 'less/**/*.less'
};

gulp.task('less', function () {
  gulp.src('./less/main.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less') ]
    }))
    .pipe(gulp.dest('./build/css/'));
});

gulp.task('scripts', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  return gulp.src(paths.scripts)
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('build/js'));
});

// Copy all static images
gulp.task('images', function() {
 return gulp.src(paths.images)
    // Pass in options to the task
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('build/img'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
  gulp.watch(paths.styles, ['less']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['less', 'scripts', 'images', 'watch']);