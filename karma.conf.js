﻿var webpack = require("webpack");
// #docregion
module.exports = function(config) {

    var appBase = 'test/e2e/'; // transpiled app JS and map files
    var appSrcBase = 'test/e2e/'; // app source TS files
    var appAssets = '/base/e2e/'; // component assets fetched by Angular's compiler

    var configuration = {
        basePath: '',
        frameworks: ['jasmine'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-webpack'),
            require('karma-sourcemap-loader')
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
        //files: [
           
        //    // Polyfills
        //    'node_modules/core-js/client/shim.js',
        //    'node_modules/reflect-metadata/Reflect.js',

        //    // zone.js
        //    'node_modules/zone.js/dist/zone.js',
        //    'node_modules/zone.js/dist/long-stack-trace-zone.js',
        //    'node_modules/zone.js/dist/proxy.js',
        //    'node_modules/zone.js/dist/sync-test.js',
        //    'node_modules/zone.js/dist/jasmine-patch.js',
        //    'node_modules/zone.js/dist/async-test.js',
        //    'node_modules/zone.js/dist/fake-async-test.js',

        //    // RxJs
        //    //{ pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false },
        //    //{ pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: false },

        //    // Paths loaded via module imports:
        //    // Angular itself
        //    { pattern: 'node_modules/@angular/**/*testing.umd.js', included: true, watched: false },
        //    { pattern: 'node_modules/@angular/**/*testing.umd.js.map', included: false, watched: false },

        //    //{ pattern: 'systemjs.config.js', included: false, watched: false },
        //    //{ pattern: 'systemjs.config.extras.js', included: false, watched: false },
        //    //'karma-test-shim.js',

        //    // transpiled application & spec code paths loaded via module imports
        //    { pattern: appBase + '**/*.js', included: true, watched: true },

        //    // Asset (HTML & CSS) paths loaded via Angular's component compiler
        //    // (these paths need to be rewritten, see proxies section)
        //    { pattern: appBase + '**/*.html', included: false, watched: true },
        //    { pattern: appBase + '**/*.css', included: false, watched: true },

        //    // Paths for debugging with source maps in dev tools
        //    { pattern: appSrcBase + '**/*.ts', included: true, watched: false },
        //    { pattern: appBase + '**/*.js.map', included: true, watched: false }
        //],

        // Proxied base paths for loading assets
        //proxies: {
        //    // required for component assets fetched by Angular's compiler
        //    "/test/e2e/": appAssets
        //},

        exclude: [],
        preprocessors: {
            'karma.entry.js': ['webpack']
        },
        // disabled HtmlReporter; suddenly crashing w/ strange socket error
        reporters: ['progress'], //'html'],

        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        failOnEmptyTestSuite: false,
        webpack: {
            module: {
                loaders: [
                  { test: /\.css$/, loader: "style!css" },
                  { test: /\.less$/, loader: "style!css!less" }
                ],
                postLoaders: [{
                    test: /\.js/,
                    exclude: /(test|node_modules|bower_components)/,
                    loader: 'istanbul-instrumenter' 
                    
                }]
            },
            resolve: {
                modulesDirectories: [
                  "",
                  "src/lib",
                  "node_modules"
                ]
            }
        },
        webpackMiddleware: {
            // webpack-dev-middleware configuration
            noInfo: true
        }
    };

    if (process.env.TRAVIS) configuration.browsers = ['Firefox'];
    if (process.env.APPVEYOR) config.browsers = ['IE'];

    config.set(configuration);
}