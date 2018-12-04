var gulp = require('gulp');
var minCSS = require('gulp-clean-css');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('serve', ['sass', 'images'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch("app/scss/*.scss", ['sass']);
    gulp.watch('app/img/**/*', function() {
        gulp.run('images');
    });
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(minCSS())
        .pipe(gulp.dest("app/public/css"))
        .pipe(browserSync.stream());
});

gulp.task('images', function() {
    gulp.src('app/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('app/public/images'))
});

gulp.task('default', ['serve']);