var argv = $.yargs.default({
	base: '.',
	browser: null,
	cache: true,
	compress: true,
	debug: true,
	exclude: [],
	fix: false,
	htmlExt: true,
	include: [],
	notify: true,
	only: [],
	name: null,
	open: true,
	port: 3000,
	production: false,
	spa: false,
	sourcemaps: true,
	throwErrors: false,
	time: true,
}).argv;

module.exports = function() {
    $.gulp.task('images:dev', function () {
        return $.gulp.src('src/images/**/*.{png,jpg,gif}', {
            sins: $.gulp.lastRun('images:dev'),
        })  
            .pipe($.gp.plumber())
            .pipe($.gp.if(argv.cache, $.gp.newer('build/images')))
            .pipe($.gp.if(argv.debug, $.gp.debug()))
            .pipe($.gp.imagemin([
                $.gp.imagemin.gifsicle({interlaced: true}),
                $.gp.imagemin.jpegtran({progressive: true}),
                $.gp.imagemin.optipng({optimizationLevel: 5}),
                $.gp.imagemin.svgo({plugins: [{removeViewBox: true}]})
            ]))
            .pipe($.gulp.dest('build/images/'));
    });

    $.gulp.task('images:build', function () {
        return $.gulp.src('src/images/**/*.{png,jpg,gif}')
            .pipe($.gp.tinypng('8N0BYkt1a0vHo31ORta6pkVduJFQiSyK'))
            .pipe($.gulp.dest('build/images/'));
    });
};
