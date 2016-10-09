// Declare all modules required
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var rename = require('gulp-rename')
var cssnano = require('gulp-cssnano');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync').create();

// Minify Javascript
gulp.task('minify-js', function() {
    return gulp.src('app/index.js')
        .pipe(gulpIf('*.js', uglify()))
        .pipe(rename('index.min.js'))
        .pipe(gulp.dest('dist/'))
});

// Minify CSS
gulp.task('minify-css', function() {
    return gulp.src('app/css/style.css')
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('dist/css/'))
});

// Minify HTML
gulp.task('minify-html', function() {
    return gulp.src('app/index.max.html')
        .pipe(gulpIf('*.html', htmlmin({collapseWhitespace: true})))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('dist/'))
});

// Sync with browser
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './dist'
        },
    })
})

// Run gulp tasks whenever a file is saved
gulp.task('watch', ['browserSync', 'minify-js', 'minify-css', 'minify-html'], function() {
    gulp.watch('app/index.js', ['minify-js', browserSync.reload]);
    gulp.watch('app/css/style.css', ['minify-css', browserSync.reload]);
    gulp.watch('app/index.max.html', ['minify-html', browserSync.reload]);
});