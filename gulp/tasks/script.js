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

module.exports = function () {
    $.gulp.task('jsMain', function (){
        return $.gulp.src('src/js/main.js')
            .pipe($.gp.plumber())
            .pipe($.gp.if(argv.debug, $.gp.debug()))
            .pipe($.gp.fileInclude({
                prefix: '// @',
            }))
            .pipe($.gp.babel({
                presets: [
                    'es2015',
                ],
            }))
            .pipe($.gp.if(argv.production, $.gp.stripDebug()))
            .pipe($.gp.jsbeautifier({
                js: {
                    indent_with_tabs: true,
                    end_with_newline: true,
                    max_preserve_newlines: 2,
                },
            }))
            .pipe($.gp.if(argv.production, $.gp.uglify()))
            .pipe($.gulp.dest('build/js'));
    });

    $.gulp.task('jsVendor', function (){
        return $.gulp.src('src/js/vendor.js', {
            since: $.gulp.lastRun('jsVendor'),
        })
            .pipe($.gp.plumber())
            .pipe($.gp.if(argv.debug, $.gp.debug()))
            .pipe($.gp.if(argv.cache, $.gp.newer('build/js')))
            .pipe($.gp.fileInclude({
                prefix: '// @',
            }))
            .pipe($.gp.if(argv.production, $.gp.uglify()))
		    .pipe($.gulp.dest('build/js'));
    });
};
