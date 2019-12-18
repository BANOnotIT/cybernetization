var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleanCss = require('gulp-clean-css'),
    pug = require('gulp-pug'),
    browserSync = require('browser-sync').create(),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    terser = require('gulp-terser'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del');

function cleanup() {
    return del('public/*')
}

function style() {
    return gulp.src('src/**/*.scss', {ignore: '**/_*'})
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(concat('main.css'))
        .pipe(cleanCss())
        .pipe(sourcemaps.write('maps/'))
        .pipe(gulp.dest('public/'))
        .pipe(browserSync.stream())
}

function html() {
    return gulp.src('src/**/*.pug', {ignore: '**/viewports/**/*.*'})
        .pipe(sourcemaps.init())
        .pipe(pug({
            cache: false
        }))
        .pipe(sourcemaps.write('maps/'))
        .pipe(gulp.dest('public/'))
}

function watch() {
    gulp.watch('src/**/*.scss', style);
    gulp.watch('src/**/*.pug', html);
    gulp.watch('src/assets/**/*', img);
    gulp.watch('src/js/**/*', js);
    sync()
}

function img() {
    return gulp.src('src/assets/**/*.*')
        // .pipe(imageResize({width: 1080}))
        .pipe(imagemin([
            imagemin.jpegtran({progressive: true})
        ]))
        .pipe(gulp.dest('public/assets'))
}

function js() {
    return gulp.src('src/js/**/*.*')
        .pipe(sourcemaps.init())
        .pipe(terser({
            mangle: {
                toplevel: true,
                // debugger: false
            },
            compress: {
                passes: 2,
                toplevel: true,
            }
        }))
        .pipe(sourcemaps.write('../../maps/'))
        .pipe(gulp.dest('public/assets/js'))
}

function sync() {
    browserSync.init({
        server: 'public'
    });
    browserSync.watch('public/**/*.*').on('change', browserSync.reload)
}

exports.default = gulp.series(cleanup, gulp.parallel(html, style, img, js));
exports.watch = gulp.series(exports.default, watch);