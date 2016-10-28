var fs = require('fs');
var path = require('canonical-path');
var _ = require('lodash');

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
    // resultJsonOutputFile: "foo.json",

    onPrepare: function() {
        // Allow changing bootstrap mode to NG1 for upgrade tests
        global.setProtractorToNg1Mode = function() {
            browser.useAllAngular2AppRoots = false;
            browser.rootEl = 'body';
        };
    },

    jasmineNodeOpts: {
        // defaultTimeoutInterval: 60000,
        defaultTimeoutInterval: 10000,
        showTiming: true,
        print: function() {}
    }
};

if (process.env.TRAVIS) {
    exports.config.capabilities = {
        'browserName': 'firefox'
    };
}

if (process.env.APPVEYOR) {
    exports.config.capabilities = {
        'browserName': 'internet explorer'
    };
    exports.config.directConnect = false;
}