/// <binding Clean='clean' ProjectOpened='default' />
var gulp = require('gulp');
var merge2 = require('merge2');
var del = require('del');
var connect = require('gulp-connect');
var webpack = require('webpack');
var webpackStream = require('webpack-stream');

var libs = {
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
    'systemjs': 'node_modules/systemjs/**/*', // TODO: Do we need this?
    'moment': 'node_modules/moment/moment.js',
    '@angular/animations': 'node_modules/@angular/animations/bundles/animations-browser.umd.js',
    '@angular/flex-layout': 'node_modules/@angular/flex-layout/bundles/flex-layout.umd.js',
    '@angular/material': 'node_modules/@angular/material/bundles/material.umd.js',
    'materialcss': 'node_modules/@angular/material/prebuilt-themes/purple-green.css',
    '@tubular2': 'node_modules/@tubular2/tubular2/**/*'
};

gulp.task('tubular2-module', 
    () => gulp.src(['../package.json', '../lib/**/*.ts', '!../lib/**/*.spec.ts'])
        .pipe(gulp.dest('node_modules/@tubular2/tubular2')));

gulp.task('lib', ['tubular2-module'], 
    () => merge2(Object.keys(libs)
            .map(key => gulp.src(libs[key]).pipe(gulp.dest('scripts/lib/' + key)))))

gulp.task('clean',
     () => del(['node_modules/@tubular2', 'scripts/lib/**/*', 'app/**/*.js']));

var standardBuild = watch => {
    gulp.src('app/main.ts')
        .pipe(webpackStream({
            //devtool: 'source-map',
            output: { filename: '[name].js', },
            resolve: {
                extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
            },
            module: {
                loaders: [
                    { test: /\.ts$/, loader: 'ts-loader' }
                ]
            },
            watch: watch
        }))
        .pipe(gulp.dest('dist/'));
}

gulp.task('connect', 
    () => connect.server({ root: './', port: 7777 }));

gulp.task('build', ['lib'], () => standardBuild(false));

gulp.task('default', ['lib', 'connect'], () => standardBuild(true));