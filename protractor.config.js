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
    baseUrl: 'http://localhost:7777/',

    onPrepare: function() {
        jasmine.getEnv().addReporter(
          
        );
    },
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