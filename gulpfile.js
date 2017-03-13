var gulp = require('gulp');
var ts = require("gulp-typescript");
var connect = require('gulp-connect');
var protractor = require("gulp-protractor").protractor;
var del = require('del');
var webpack = require('webpack');
var webpackStream = require('webpack-stream');
var tsProject = ts.createProject("tsconfig.json");

gulp.task('default', 
    () => tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist")));

gulp.task('connect', 
    () => connect.server({
        root: './sample',
        fallback: './sample/index.html' }));

gulp.task('protractor', ['connect', 'instrument'], () => {
    return gulp.src('test/e2e/**/*.ts')
        .pipe(ts({
            noImplicitAny: false,
            typeRoots: ['./node_modules/@types'],
            types: [
                "core-js",
                "jasmine"
            ]
        }))
        .pipe(gulp.dest(file => file.base))
        .pipe(protractor({ configFile: "protractor.config.js" }))
        .on('error', () => connect.serverClose() )
        .on('end', connect.serverClose);
});

gulp.task('restore-ts', 
    () => gulp.src("src/lib/*.ts")
        .pipe(gulp.dest('sample/node_modules/@tubular2/tubular2')));

gulp.task('build-sample', ['restore-js', 'restore-ts'], () => {
    return gulp.src('sample/app/*.ts')
        .pipe(ts.createProject("sample/tsconfig.json")())
        .js
        .pipe(gulp.dest(file => file.base));
});

gulp.task('restore-js', ['default'], 
    () => gulp.src("dist/*.js")
        .pipe(gulp.dest('src/Unosquare.Tubular2.Web/node_modules/@tubular2/tubular2')));

gulp.task('instrument', ['build-sample'], () => {
    return gulp.src('sample/app/main.js')
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