var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    sass = require('gulp-sass'),
    cleanCss = require('gulp-clean-css'),
    pug = require('gulp-pug'),
    browserSync = require('browser-sync').create(),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    del = require('del');

function cleanup() {
    return del('public/*')
}

function style() {
    return gulp.src('src/**/*.scss', {ignore: '**/_*'})
        .pipe(sass())
        .pipe(concat('main.css'))
        .pipe(cleanCss())
        .pipe(gulp.dest('public/'))
        .pipe(livereload())
}


function html() {
    return gulp.src('src/**/*.pug', {ignore: '**/viewports/**/*.*'})
        .pipe(pug())
        .pipe(gulp.dest('public/'))
        .pipe(livereload())
}

function watch() {
    gulp.watch('src/**/*.scss', (style));
    gulp.watch('src/**/*.pug', (html));
    gulp.watch('src/assets/**/*', img);
    sync()
}

function img() {
    return gulp.src('src/assets/**/*.*')
        // .pipe(imageResize({width: 1080}))
        .pipe(imagemin({
            verbose: true
        }))
        .pipe(gulp.dest('public/assets'))
}

function sync() {
    browserSync.init({
        server: 'public'
    });
    browserSync.watch('public/**/*.*').on('change', browserSync.reload)
}

exports.default = gulp.series(cleanup, gulp.parallel(html, style, img));
exports.watch = gulp.series(exports.default, watch);