var webpack = require("webpack");
// #docregion
module.exports = config => {
    var configuration = {
        basePath: '',
        frameworks: ['jasmine', 'source-map-support'],
        plugins: [
            require('karma-jasmine'),
            require('karma-firefox-launcher'),
            require('karma-webpack'),
            require('karma-source-map-support'),
            require('karma-sourcemap-loader'),
            require('karma-coverage'),
            //require('karma-mocha-reporter'),
            require('karma-htmlfile-reporter')
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
            './node_modules/es6-shim/es6-shim.min.js',
            'karma.entry.js'
        ],
       
        exclude: [],
        preprocessors: {
            'karma.entry.js': ['webpack']
        },
        // disabled HtmlReporter; suddenly crashing w/ strange socket error
        reporters: ['progress' ,'html', 'coverage'],
        htmlReporter: {
            outputFile: 'report/unit/index.html', // where to put the reports  
            focusOnFailures: true, // reports show failures on start 
            namedFiles: true, // name files instead of creating sub-directories 
            reportName: 'index',

            // experimental 
            preserveDescribeNesting: false, // folded suites stay folded  
            foldAll: false // reports start folded (only with preserveDescribeNesting) 
        },
       
        // optionally, configure the reporter
        coverageReporter: {
            type: 'lcov',
            dir: './report/coverage',
            subdir: '.'
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Firefox'],
        singleRun: false,
        failOnEmptyTestSuite: false,
        webpack: require('./webpack/webpack.test'),
        webpackMiddleware: {
            // webpack-dev-middleware configuration
            noInfo: true
        }
    };

    if (process.env.TRAVIS) configuration.browsers = ['Firefox'];
    if (process.env.APPVEYOR) config.browsers = ['IE'];

    config.set(configuration);
}