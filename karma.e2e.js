
// #docregion
module.exports = config => {
    var configuration = {
        basePath: '',
        frameworks: ['jasmine', 'karma-typescript', 'browserify'],
        plugins: [
            require('karma-jasmine'),
            require('karma-firefox-launcher'),
            require('karma-htmlfile-reporter'),
            require('karma-typescript'),
            require('karma-browserify')
        ],

        customLaunchers: {
            // From the CLI. Not used here but interesting
            // chrome setup for travis CI using chromium
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },
        files: [
          { pattern: "node_modules/reflect-metadata/Reflect.js", include: true },
            'dist/**/*.js',
            'test/**/*.spec.ts'
        ],
        preprocessors: {
            'test/**/*.spec.ts': ['karma-typescript'],
            'test/**/*.spec.js': ['browserify'],
            'dist/**/*.js': ['browserify']
        },

        exclude: [],

        // disabled HtmlReporter; suddenly crashing w/ strange socket error
        reporters: ['progress' ,'html'],
        htmlReporter: {
            outputFile: 'report/e2e/index.html', // where to put the reports
            focusOnFailures: true, // reports show failures on start
            namedFiles: true, // name files instead of creating sub-directories
            reportName: 'index',

            // experimental
            preserveDescribeNesting: false, // folded suites stay folded
            foldAll: false // reports start folded (only with preserveDescribeNesting)
        },


        port: 9876,
        colors: true,
        logLevel: config.LOG_DEBUG,
        autoWatch: true,
        browsers: ['Firefox'],
        singleRun: false,
        failOnEmptyTestSuite: false

    };

    if (process.env.TRAVIS) configuration.browsers = ['Firefox'];
    if (process.env.APPVEYOR) config.browsers = ['IE'];

    config.set(configuration);
}
