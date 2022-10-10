const gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass')(require('sass')),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace');

let settings = {
    baseDir: './app/',
    buildDir: './build/',
    styles: {
        output: 'build/css'
    },
    scripts: {
        output: 'build/js'
    },
};

function browser_sync() {
    browserSync.init({
        server: {
            baseDir: settings.buildDir,
            index: 'index.html'
        }
    });
}

function styles() {
    return gulp.src('app/scss/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/.temp/css'))
        .pipe(browserSync.reload({stream: true}));
}

function scripts() {
    return gulp.src('app/js/app.js')
        .pipe(gulp.dest('app/.temp/js'))
        .pipe(browserSync.reload({stream: true}));
}

function prepareHtml() {
    return gulp.src('app/*.html')
        .pipe(replace('.temp/css/app.css', 'css/app.min.css'))
        .pipe(replace('.temp/js/app.js', 'js/app.min.js'))
        .pipe(gulp.dest('build'));
}

function prepareCss() {
    return gulp.src('app/.temp/css/app.css')
        .pipe(cssnano())
        .pipe(autoprefixer([
            'last 9 versions',
            '> 1%',
            'ie 9'
        ], {cascade: true}))
        .pipe(replace('../../', '../'))
        .pipe(rename({'suffix': '.min'}))
        .pipe(gulp.dest(settings.styles.output));
}

function prepareJs() {
    return gulp.src('app/.temp/js/app.js')
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(settings.scripts.output));
}

function images() {
    return gulp.src('app/img/**/*')
        .pipe(gulp.dest('build/img'));
}

function watch(done) {
    gulp.watch('app/scss/**/*.scss', gulp.series(styles));
    gulp.watch('app/js/**/*.js', gulp.series(scripts));
    gulp.watch('app/**/*.html').on('change', browserSync.reload);

    done();
}

exports.scripts = scripts;
exports.prepareJs = prepareJs;

exports.dev = gulp.parallel(browser_sync, styles, watch);
exports.build = gulp.series(prepareHtml, prepareCss, prepareJs, images);