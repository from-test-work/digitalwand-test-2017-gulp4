global.$ = {
    path: {
        task: require('./gulp/paths/tasks.js'),
    },
    yargs: require('yargs'),
    gulp: require('gulp'),
    del: require('del'),
    fs: require('fs'),
    browserSync: require('browser-sync'),
    gp: require('gulp-load-plugins')({
        overridePattern: false,
        pattern: [
            'browser-sync',
            'connect-history-api-fallback',
            'cssnano',
            'merge-stream',
            'postcss-reporter',
            'postcss-scss',
            'stylelint',
            'vinyl-buffer',
        ],
        scope: [
            'dependencies',
            'devDependencies',
            'optionalDependencies',
            'peerDependencies',
        ],
    }),
    routerConfig: require('./router-config'),
    emittySetup: require('emitty')
};

$.path.task.forEach(function (taskPath) {
    require(taskPath)();
});

$.gulp.task('dev', $.gulp.series(
    'clean',
    $.gulp.parallel('scss:dev', 'pug', 'jsMain', 'jsVendor', 'images:dev', 'svg', 'fonts')
));

$.gulp.task('build', $.gulp.series(
    'clean',
    $.gulp.parallel('scss:build', 'pug', 'jsMain', 'jsVendor', 'images:build', 'svg', 'fonts')
));

$.gulp.task('default', $.gulp.series(
    'dev',
    $.gulp.parallel(
        'watch',
        'serve'
    )
));