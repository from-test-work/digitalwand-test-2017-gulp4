module.exports = function () {
    $.gulp.task('watch', function () {
        // template
        $.gulp.watch([
            'src/*.pug', 
            'src/pug/**/*.pug'
        ], {
            delay: 0,
        }, $.gulp.series('pug'));
        // style
        $.gulp.watch('src/scss/**/*.scss', $.gulp.series('scss:dev'));
        // js
        $.gulp.watch([
            'src/js/**/*.js',
            '!src/js/vendor.js',
        ], $.gulp.series('jsMain'));
        $.gulp.watch('src/js/vendor.js', $.gulp.series('jsVendor'));
        // images
        $.gulp.watch([
            'src/images/general/**/*.{png,jpg,gif}',
            'src/images/content/**/*.{png,jpg,gif}'], 
            $.gulp.series('images:dev'));
        $.gulp.watch('src/images/svg/*.svg', $.gulp.series('svg'));
    });
};