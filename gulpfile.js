var gulp = require('gulp');
var ts = require("gulp-typescript");
var connect = require('gulp-connect');
var istanbul = require('gulp-istanbul');
var protractor = require("gulp-protractor").protractor;
var del = require('del');
var webpack = require('webpack');
var webpackStream = require('webpack-stream');

var tsProject = ts.createProject("tsconfig.json");

gulp.task('default', function() {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});

gulp.task('connect', function() {
    connect.server({
        root: './src/Unosquare.Tubular2.Web/wwwroot',
        fallback: "./src/Unosquare.Tubular2.Web/wwwroot/index.html"
    });
});

gulp.task('protractor', function() {
    return gulp.src('test/e2e/**/*.ts')
        .pipe(ts({
            noImplicitAny: false,
            typeRoots: [
                "./node_modules/@types"
            ],
            types: [
                "core-js",
                "jasmine"
            ]
        }))
        .pipe(gulp.dest(function(file) { return file.base; }))
        .pipe(protractor({ configFile: "protractor.config.js" }))
        .on('error', function() { connect.serverClose() })
        .on('end', connect.serverClose);
});

gulp.task('instrument', ['default'], function() {
    // clean TS
    del('src/Unosquare.Tubular2.Web/node_modules/@tubular2/tubular2/*.ts');
    // move files
    gulp.src("dist/*.js")
        .pipe(istanbul())
        .pipe(gulp.dest('src/Unosquare.Tubular2.Web/node_modules/@tubular2/tubular2'));
/*
    return gulp.src('src/Unosquare.Tubular2.Web/wwwroot/app/main.ts')
        .pipe(webpackStream({
            devtool: 'source-map',
            output: { filename: '[name].js', },
            resolve: {
                extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
            },
            module: {
                loaders: [
                    { test: /\.ts$/, loader: 'ts-loader' }
                ]
            }
        }))
        .pipe(gulp.dest('src/Unosquare.Tubular2.Web/wwwroot/dist/'))*/
});

gulp.task('e2e', ['connect', 'instrument', 'protractor']);