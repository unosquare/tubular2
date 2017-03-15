var gulp = require('gulp');
var ts = require('gulp-typescript');
var connect = require('gulp-connect');
var protractor = require('gulp-protractor').protractor;
var del = require('del');
var webpack = require('webpack');
var webpackStream = require('webpack-stream');
var tsProject = ts.createProject('tsconfig.json');
var tslint = require('gulp-tslint');
var concat = require("gulp-concat");
var map = require("map-stream");

gulp.task('default', 
    () => tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest('dist')));

gulp.task('tslint', 
    () => gulp.src('lib/**/*.ts')
        .pipe(tslint())
        .pipe(map(function(file, done) {
           // Add the tslint errors in prose format
           if (file.tslint.output) {
               var title = file.tslint.output.match(/^(.+?)(\[)/gm);
               title = title ? title[0].replace('[', '') : '';

               file.contents = new Buffer('<h2>' + title + '</h2>' +
                    file.tslint.output
                        .replace(/^(.+?(]:))/gm, '<b>$1</b>')
                        .replace(/(?:\r\n|\r|\n)/g, '<br />\r\n') +
                    '<hr />');
           } else {
               file.contents = new Buffer("");
           }

           done(null, file);
       }))
       // Concat and save the errors
       .pipe(concat("index.html"))
       .pipe(gulp.dest("report/tslint")));

gulp.task('connect', 
    () => connect.server({
        root: './sample',
        fallback: './sample/index.html' }));

gulp.task('protractor', ['instrument'], 
    () => gulp.src('test/e2e/**/*.js')
            .pipe(protractor({ configFile: 'protractor.config.js' }))
            .on('error', connect.serverClose)
            .on('end', connect.serverClose));

gulp.task('restore-ts', 
    () => gulp.src('lib/*.ts')
        .pipe(gulp.dest('sample/node_modules/@tubular2/tubular2')));

gulp.task('build-sample', ['restore-js', 'restore-ts'], 
    () => gulp.src('sample/app/*.ts')
        .pipe(ts.createProject('sample/tsconfig.json')())
        .js
        .pipe(gulp.dest(file => file.base)));

gulp.task('restore-js', ['default'], 
    () => gulp.src('dist/*.js')
        .pipe(gulp.dest('sample/node_modules/@tubular2/tubular2')));

gulp.task('instrument', ['build-sample'], () => {
    return gulp.src('sample/app/main.js')
        .pipe(webpackStream({
            devtool: 'source-map',
            output: { filename: '[name].js', },
            resolve: {
                extensions: ['', '.webpack.js', '.web.js', '.js']
            }
        }))
        .pipe(gulp.dest('sample/dist/'));
});

gulp.task('e2e', ['connect', 'protractor']);

gulp.task('travis', ['e2e']);
