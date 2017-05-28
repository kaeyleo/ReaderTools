var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    connect = require('gulp-connect');

/**
 * Styles
 */
gulp.task('sass', function(){
    gulp.src('./src/sass/app.scss')
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(rename({ 
            basename: 'reader-tools',
            suffix: '.min' 
        }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(connect.reload());
});

/**
 * Scripts
 */
gulp.task('js', function(){
    gulp.src('./src/js/app.js')
        .pipe(uglify())
        .pipe(rename({ 
            basename: 'reader-tools',
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/js'))
        .pipe(connect.reload());
});

gulp.task('html', function(){
    gulp.src('./demo/*.html')
        .pipe(connect.reload());
});

/**
 * Build
 */
gulp.task('release', ['sass', 'js']);

/**
 * Server
 */
gulp.task('server', function(){
    connect.server({
        livereload: true
    });
});

/**
 * Watcher
 */
gulp.task('watch', ['server'], function (){
    gulp.watch('demo/*.html', ['html']);
    gulp.watch('src/sass/*', ['sass']);
    gulp.watch('src/js/*', ['js']);
});

gulp.task('default', ['release', 'watch', 'server']);