var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('serve', function() {
    browserSync.init({
        server: "./www"
    });

    gulp.watch("www/css/**/*.css").on('change', browserSync.reload);
    gulp.watch("www/views/**/*.html").on('change', browserSync.reload);
    gulp.watch("www/js/**/*.js").on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
