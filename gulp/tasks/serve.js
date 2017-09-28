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

function arg2array(arg, separator = ',') {
	return Array.isArray(arg) ? arg : (arg || '').split(separator);
}

module.exports = function () {
    var middleware = [];
    
    if (argv.spa) {
        middleware.push($.connectHistoryApiFallback($.routerConfig));
    }
    
    $.gulp.task('serve', function () {
        $.browserSync
            .create()
            .init({
                browser: arg2array(argv.browser),
                notify: false,
                open: argv.open,
                port: argv.port,
                files: [
                    './build/**/*',
                ],
                server: {
                    baseDir: './build',
                    middleware: middleware,
                    serveStaticOptions: {
                        extensions: argv.htmlExt ? [] : ['html'],
                    },
                },
            });
    });
};