var istanbul = require('istanbul');
var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
var collector = new istanbul.Collector();

exports.config = {
    directConnect: true,

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome'
    },


    // Framework to use. Jasmine is recommended.
    framework: 'jasmine',

    // Spec patterns are relative to this config file
    specs: ['test/e2e/**/*e2e-spec.js'],

    // For angular tests
    useAllAngular2AppRoots: true,

    // Base URL for application server
    baseUrl: 'http://localhost:8080/',

    // doesn't seem to work.
   

    onPrepare: function() {
        jasmine.getEnv().addReporter(
          new Jasmine2HtmlReporter({
              savePath: './report/e2e',
              cleanDestination: false,
              consolidate: true,
              consolidateAll: true,
              showPassed: false,
              takeScreenshotsOnlyOnFailures: true,
              fileName: 'index.html'
          })
        );
    },
    //onPrepare: function() {
    //    // Allow changing bootstrap mode to NG1 for upgrade tests
    //    //global.setProtractorToNg1Mode = function() {
    //    //    browser.useAllAngular2AppRoots = false;
    //    //    browser.rootEl = 'body';
    //    //};

    //    var jasmineEnv = jasmine.getEnv();

    //    jasmineEnv.addReporter(new function() {
    //        this.specDone = function(spec) {
    //            //if (spec.status !== 'failed') {
    //            //browser.driver.executeScript('return __coverage__;').then(function(coverageResults) {
    //            //                    collector.add(coverageResults);
    //            //});
    //            //}
    //        };
    //    });
    //},
    //  onComplete: function() {
    //          istanbul.Report.create('lcov', { dir: 'results/' })
    //              .writeReport(collector, true);
    //      },
    jasmineNodeOpts: {
        defaultTimeoutInterval: 10000,
        showTiming: true,
        showColors: true
    }
};

if (process.env.TRAVIS) {
    exports.config.capabilities = {
        'browserName': 'chrome'
    };
}

if (process.env.APPVEYOR) {
    exports.config.capabilities = {
        'browserName': 'internet explorer'
    };
    exports.config.directConnect = false;
}