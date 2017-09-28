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

module.exports = function (){
    $.gulp.task('fonts', function () {
        return $.gulp.src([
            'src/resources/fonts/**/*.*',
            'src/resources/fonts/**/.*',
        ], {
            allowEmpty: true,
            base: 'src/resources/fonts',
            dot: true,
            since: $.gulp.lastRun('fonts'),
        })
            .pipe($.gp.if(argv.cache, $.gp.newer('build')))
            .pipe($.gp.if(argv.debug, $.gp.debug()))
            .pipe($.gulp.dest('build/fonts'));
    });
};