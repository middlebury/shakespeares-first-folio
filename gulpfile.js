var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var cmq = require('gulp-combine-mq');
var minifyCss = require('gulp-minify-css');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var cp = require('child_process');

// Custom error handler from
// https://github.com/mikaelbr/gulp-notify/issues/81#issuecomment-100422179
var reportError = function (error) {
    var lineNumber = (error.lineNumber) ? 'LINE ' + error.lineNumber + ' -- ' : '';

    notify({
        title: 'Task Failed [' + error.plugin + ']',
        message: lineNumber + 'See console.',
        sound: 'Sosumi' // See: https://github.com/mikaelbr/node-notifier#all-notification-options-with-their-defaults
    }).write(error);

    gutil.beep();

    var report = '';
    var chalk = gutil.colors.white.bgRed;

    report += chalk('TASK:') + ' [' + error.plugin + ']\n';
    report += chalk('PROB:') + ' ' + error.message + '\n';
    if (error.lineNumber) { report += chalk('LINE:') + ' ' + error.lineNumber + '\n'; }
    if (error.fileName)   { report += chalk('FILE:') + ' ' + error.fileName + '\n'; }
    console.error(report);

    this.emit('end');
}

gulp.task('browser-sync', ['img', 'html', 'sass'], function() {
    browserSync.init({
        open: false,
        ui: false,
        port: 8080,
        server: {
            baseDir: './dist'
        }
    });
});

gulp.task('html', function() {
    return gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('img', function() {
    return gulp.src(['./src/img/*.jpg', './src/img/*.png'])
        .pipe(gulp.dest('./dist/img'));
});

gulp.task('sass', function() {
    return gulp.src('./src/sass/main.scss')
        // .pipe(watch('_scss/**/*.scss'))
        .pipe(plumber({
            errorHandler: reportError
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gutil.env.production ? cmq() : gutil.noop())
        .pipe(gutil.env.production ? minifyCss() : gutil.noop())
        .pipe(!gutil.env.production ? sourcemaps.write('./') : gutil.noop())
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.reload({ stream: true }))
        .pipe(notify('Sass task complete'));
});

gulp.task('watch', function() {
    gulp.watch('./src/sass/**/*.scss', ['sass']);
    gulp.watch(['./src/img/*.jpg', './src/img/*.png'], ['img']);
    gulp.watch('./src/*.html', ['html']);
});

gulp.task('default', ['browser-sync', 'watch']);
