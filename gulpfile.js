var gulp = require('gulp');
var react = require('gulp-react');
var watch = require('gulp-watch');
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
    var b = browserify({
        entries: './demo.js',
        debug: true,
        // defining transforms here will avoid crashing your stream
        transform: [babelify]
    });

    return b.bundle()
        .pipe(source('./bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./build'));
});

gulp.task('watch', function() {
    watch('./demo.js', function() {
        gulp.run(['compress']);
    });
});

gulp.task('default', ['build', 'compress', 'watch']);