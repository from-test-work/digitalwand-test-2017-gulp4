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

var errorHandler;

(argv.throwErrors) ? errorHandler = false : errorHandler = argv.notify ? $.gp.notify.onError('<%= error.message %>') : null;

module.exports = function () {
    $.gulp.task('pug', function () {
		return $.gulp.src('src/*.pug')
			.pipe($.gp.plumber({
				errorHandler,
			}))
			.pipe($.gp.if(argv.debug, $.gp.debug()))
			.pipe($.gp.pug({
                locals : {
                    headerForm: JSON.parse($.fs.readFileSync('./data/header/formBio.json', 'utf8')),
                    nav: JSON.parse($.fs.readFileSync('./data/navigation.json', 'utf8')),
                },
				pretty: true,
            }))
            .on('error', $.gp.notify.onError(function(error) {
                return {
                    title: 'Pug',
                    message: error.message
                };
            }))
			.pipe($.gulp.dest('build'));
	});

	// $.gulp.task('lintPug', function () {
	// 	return $.gulp.src([
	// 		'src/*.pug',
	// 		'src/pug/**/*.pug',
	// 	])
	// 		.pipe($.gp.plumber({
	// 			errorHandler,
	// 		}))
	// 		.pipe($.gp.pugLinter())
	// 		.pipe($.gp.pugLinter.reporter(argv.throwErrors ? 'fail' : null));

	// });
};
