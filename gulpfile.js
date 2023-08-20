const gulp = require('gulp');
const sass = require('gulp-sass');
const less = require('gulp-less');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

gulp.task('styles', function () {
    return gulp.src('./src/scss/*.scss') 
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function () {
    return gulp.src('./src/js/*.js')
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('serve', function () {
    browserSync.init({
        server: './dist'
    });

    gulp.watch('./src/scss/**/*.scss', gulp.series('styles'));
    gulp.watch('./src/js/*.js', gulp.series('scripts'));
    gulp.watch('./dist/*.html').on('change', browserSync.reload);
});

gulp.task('build', gulp.parallel('styles', 'scripts'));

gulp.task('default', gulp.series('build', 'serve'));