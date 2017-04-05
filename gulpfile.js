var gulp = require('gulp');
var ts = require('gulp-typescript');
var connect = require('gulp-connect');
var protractor = require('gulp-protractor').protractor;
var tslint = require('gulp-tslint');
var concat = require("gulp-concat");
var map = require("map-stream");

var tsProject = ts.createProject('tsconfig.json');

gulp.task('build-lib', 
    () => gulp.src(['lib/**/*.ts', '!lib/**/*.spec.ts'])
        .pipe(tsProject())
        .js.pipe(gulp.dest('dist')));
        
gulp.task('build-spec',
    () => gulp.src('lib/**/*.ts')
        .pipe(tsProject())
        .js.pipe(gulp.dest(file => file.base)));

gulp.task('build-e2e', ['build-lib'],
    () => gulp.src('test/e2e/**/*.ts')
        .pipe(tsProject())
        .js.pipe(gulp.dest(file => file.base)));

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
    () => connect.server({ root: './sample' }));

gulp.task('e2e', ['connect', 'build-e2e'],
    () => gulp.src('test/e2e/**/*.js')
            .pipe(protractor({ configFile: 'protractor.config.js' }))
            .on('error', connect.serverClose)
            .on('end', connect.serverClose));