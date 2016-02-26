var gulp = require('gulp');
var react = require('gulp-react');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');

gulp.task('build', function () {
    return gulp.src('index.jsx')
        .pipe(react())
        .pipe(gulp.dest('./build'));
});

gulp.task('compress', function() {
    var b = browserify('./demo.js').transform('babelify', {presets: ['es2015', 'react']});

    return b.bundle()
        .pipe(source('./demo.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('build'));
});

gulp.task('watch', function() {
    gulp.watch('./demo.js', ['compress']);
});

gulp.task('default', ['build', 'compress', 'watch']);