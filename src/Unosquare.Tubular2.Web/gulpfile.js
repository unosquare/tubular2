/// <binding AfterBuild='default' Clean='clean' />
/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var del = require('del');
var webpack = require('webpack-stream');

var paths = {
    scripts: ['scripts/**/*.js', 'scripts/**/*.ts', 'scripts/**/*.map'],
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
        'momentjs': 'node_modules/momentjs/build/*',
        'bootstrap': 'node_modules/bootstrap/dist/**/*',
        '@ng-bootstrap': 'node_modules/@ng-bootstrap/ng-bootstrap/**/*'
    }
};

gulp.task('lib', function () {
    Object.keys(paths.libs).forEach(function (key) {
        gulp.src(paths.libs[key]).pipe(gulp.dest('wwwroot/scripts/lib/' + key));
    });
});

gulp.task('clean', function () {
    return del(['wwwroot/scripts/**/*']);
});

gulp.task('default', ['lib'], function () {
    gulp.src('wwwroot/app/main.js')
        .pipe(webpack({
            devtool: 'source-map'
        }))
        .pipe(gulp.dest('wwwroot/dist/'));
});