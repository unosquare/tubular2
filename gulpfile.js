var gulp = require('gulp');
var ts = require("gulp-typescript");
var connect = require('gulp-connect');
var istanbul = require('gulp-istanbul'); // This is not working
var protractor = require("gulp-protractor").protractor;

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

gulp.task('e2e', ['connect', 'protractor']);