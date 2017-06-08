Error.stackTraceLimit = Infinity;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 2000;

require('core-js/es6');
require('reflect-metadata');
require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');
require('zone.js/dist/sync-test');
require('zone.js/dist/proxy');
require('zone.js/dist/jasmine-patch');

const browserTesting = require('@angular/platform-browser-dynamic/testing');
const coreTesting = require('@angular/core/testing');
const context = require.context('./lib/', true, /\.spec\.ts$/);

coreTesting.getTestBed().resetTestEnvironment();
coreTesting.getTestBed().initTestEnvironment(
    browserTesting.BrowserDynamicTestingModule,
    browserTesting.platformBrowserDynamicTesting()
);

context.keys().forEach(context);
