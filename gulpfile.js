var gulp = require('gulp');
var ts = require("gulp-typescript");
var connect = require('gulp-connect');
var istanbul = require('gulp-istanbul');
var protractor = require("gulp-protractor").protractor;
var del = require('del');
var webpack = require('webpack');
var webpackStream = require('webpack-stream');
var coveralls = 'jFx7RIwcdnLdPZP27M31n2hK0RKeNvrQZ';
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

gulp.task('protractor', ['connect', 'instrument'], function() {
    return gulp.src('test/e2e/**/*.ts')
        .pipe(ts({
            noImplicitAny: false,
            typeRoots: ['./node_modules/@types'],
            types: [
                "core-js",
                "jasmine"
            ]
        }))
        .pipe(gulp.dest(function(file) { return file.base; }))
        .pipe(protractor({ configFile: "protractor.config.js" }))
        .pipe(istanbul.writeReports())
        .on('error', function() { connect.serverClose() })
        .on('end', connect.serverClose);
});

gulp.task('restore-ts', function() {
    return gulp.src("src/lib/*.ts")
        .pipe(gulp.dest('src/Unosquare.Tubular2.Web/node_modules/@tubular2/tubular2'));
});

gulp.task('build-wwwroot', ['restore-js', 'restore-ts'], function() {
    var tsProj = ts.createProject("src/Unosquare.Tubular2.Web/tsconfig.json");

    return gulp.src('src/Unosquare.Tubular2.Web/wwwroot/app/*.ts')
        .pipe(tsProj())
        .js
        .pipe(gulp.dest(function(file) { return file.base; }));
});

gulp.task('restore-js', ['default'], function() {
    return gulp.src("dist/*.js")
        .pipe(istanbul({ includeUntested: true }))
        .pipe(gulp.dest('src/Unosquare.Tubular2.Web/node_modules/@tubular2/tubular2'))
});

gulp.task('instrument', ['build-wwwroot'], function() {
    return gulp.src('src/Unosquare.Tubular2.Web/wwwroot/app/main.js')
        .pipe(webpackStream({
            devtool: 'source-map',
            output: { filename: '[name].js', },
            resolve: {
                extensions: ['', '.webpack.js', '.web.js', '.js']
            }
        }))
        .pipe(gulp.dest('src/Unosquare.Tubular2.Web/wwwroot/dist/'));
});

gulp.task('e2e', ['protractor']);

gulp.task('travis', ['e2e']);