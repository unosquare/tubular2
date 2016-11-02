/// <binding Clean='clean' ProjectOpened='default' />
var gulp = require('gulp');
var del = require('del');
var webpack = require('webpack');
var webpackStream = require('webpack-stream');

var paths = {
    libs: {
        '@angular/core': 'node_modules/@angular/core/bundles/core.umd.js',
        '@angular/common': 'node_modules/@angular/common/bundles/common.umd.js',
        '@angular/compiler': 'node_modules/@angular/compiler/bundles/compiler.umd.js',
        '@angular/forms': 'node_modules/@angular/forms/bundles/forms.umd.js',
        '@angular/http': 'node_modules/@angular/http/bundles/http.umd.js',
        '@angular/platform-browser': 'node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
        '@angular/platform-browser-dynamic': 'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
        '@angular/router': 'node_modules/@angular/router/bundles/router.umd.js',
        'zone.js': 'node_modules/zone.js/**/*',
        'rxjs': 'node_modules/rxjs/**/*',
        'reflect': 'node_modules/reflect-metadata/*',
        'systemjs': 'node_modules/systemjs/**/*',
        'moment': 'node_modules/moment/*',
        'bootstrap': 'node_modules/bootstrap/dist/**/*',
        'filesaver': 'node_modules/filesaver.js/*.js',
        '@ng-bootstrap': 'node_modules/@ng-bootstrap/ng-bootstrap/**/*',
        '@tubular2': '../lib/**/*'
    }
};

gulp.task('tubular2-module', function() {
    return gulp.src(['../../package.json', '../lib/**/*.ts'])
        .pipe(gulp.dest('node_modules/@tubular2/tubular2'));
});

gulp.task('lib', ['tubular2-module'], function() {
    Object.keys(paths.libs).forEach(function(key) {
        gulp.src(paths.libs[key]).pipe(gulp.dest('wwwroot/scripts/lib/' + key));
    });
});

gulp.task('clean', function() {
    return del(['node_modules/@tubular2', 'wwwroot/scripts/**/*']);
});

var standardBuild = function(watch) {
    // TODO: Add task to build only tubular into a dist folder in root
    // TODO: Create a webpack config file
    gulp.src('wwwroot/app/main.ts')
        .pipe(webpackStream({
            devtool: 'source-map',
            output: {
                filename: '[name].js',
            },
            resolve: {
                extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
            },
            //plugins: [
            //  new webpack.optimize.UglifyJsPlugin()
            //],
            module: {
                loaders: [
                    { test: /\.ts$/, loader: 'ts-loader' }
                ]
            },
            watch: watch
        }))
        .pipe(gulp.dest('wwwroot/dist/'));
}

gulp.task('build', ['lib'], function() { return standardBuild(false); });

gulp.task('default', ['lib'], function() { standardBuild(true); });