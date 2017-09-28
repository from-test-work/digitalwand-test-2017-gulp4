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
    $.gulp.task('scss:dev', function () {
        return $.gulp.src([
            'src/scss/*.scss',
            '!src/scss/_*.scss'
        ])
            .pipe($.gp.plumber({
                errorHandler: errorHandler
            }))
            .pipe($.gp.if(argv.debug, $.gp.debug()))
            .pipe($.gp.if(argv.sourcemaps, $.gp.sourcemaps.init()))
            .pipe($.gp.sass().on('error', $.gp.sass.logError))
            .pipe($.gp.autoprefixer({
                browsers: ['last 3 version']
            }))
            .pipe($.gp.csscomb())
            .pipe($.gp.if(argv.sourcemaps, $.gp.sourcemaps.write('.')))
            .pipe($.gulp.dest('build/css'));
    });

    $.gulp.task('scss:build', function () {
        return $.gulp.src([
            'src/scss/*.scss',
            '!src/scss/_*.scss'
        ])
            .pipe($.gp.plumber({
                errorHandler: errorHandler
            }))
            .pipe($.gp.if(argv.debug, $.gp.debug()))
            .pipe($.gp.if(argv.sourcemaps, $.gp.sourcemaps.init()))
            .pipe($.gp.sass().on('error', $.gp.sass.logError))
            .pipe($.gp.postcss([
                $.gp.cssnano({
                    autoprefixer: {
                        add: true,
                        browsers: ['> 0%'],
                    },
                    calc: true,
                    discardComments: {
                        removeAll: true,
                    },
                    zindex: false,
                }),
            ]))
            .pipe($.gp.if(argv.sourcemaps, $.gp.sourcemaps.write('.')))
            .pipe($.gulp.dest('build/css'));
    });
};