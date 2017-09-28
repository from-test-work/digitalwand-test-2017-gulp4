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
    name: 'test',
}).argv;


function arg2array(arg, separator = ',') {
    return Array.isArray(arg) ? arg : (arg || '').split(separator);
}

module.exports = function () {
    $.gulp.task('zip', function () {
        console.log('./package.json'.name);
        let name = argv.name ? argv.name : require('./package.json').name;

        if (argv.time) {
            let now = new Date();
            let year = now.getFullYear();
            let month = now.getMonth() + 1;
            let day = now.getDate();
            let hours = now.getHours();
            let minutes = now.getMinutes();

            month = month < 10 ? `0${month}` : month;
            day = day < 10 ? `0${day}` : day;
            hours = hours < 10 ? `0${hours}` : hours;
            minutes = minutes < 10 ? `0${minutes}` : minutes;

            name += `_${year}-${month}-${day}_${hours}-${minutes}`;
        }

        let files = [
            'build/**',
            'src/**',
            '.babelrc',
            '.gitignore',
            '.npmrc',
            '*.js',
            '*.json',
            '*.md',
            '*.yml',
            '!zip/**',
        ];

        let includeFiles = arg2array(argv.include);
        let excludeFiles = arg2array(argv.exclude);
        let onlyFiles = arg2array(argv.only);

        if (argv.include.length) {
            files = files.concat(includeFiles);
        }

        if (argv.exclude.length) {
            excludeFiles = excludeFiles.map((excludedFile) => {
                if (files.includes(excludedFile)) {
                    files = files.filter((file) => file !== excludedFile);
                }

                return `!${excludedFile}`;
            });

            files = files.concat(excludeFiles);
        }

        if (argv.only.length) {
            files = onlyFiles;
        }

        return $.gulp.src(files, {
                allowEmpty: true,
                base: argv.base,
                dot: true,
            })
            .pipe($.gp.zip(`${name}.zip`, {
                compress: argv.compress,
            }))
            .pipe($.gulp.dest('zip'));
    });
};