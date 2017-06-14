var gulp = require('gulp');
var ts = require('gulp-typescript');
var connect = require('gulp-connect');
var tslint = require('gulp-tslint');
var concat = require("gulp-concat");
var map = require("map-stream");
var merge = require("merge2");
var gulp = require('gulp');
var Server = require('karma').Server;

var tsProject = ts.createProject('tsconfig.json');

gulp.task('build-lib',
  () => {
    const tsResult = gulp.src(['lib/**/*.ts', '!lib/**/*.spec.ts'])
      .pipe(tsProject());
    return merge(
      [
        tsResult.dts.pipe(gulp.dest('dist/typings')),
        tsResult.js.pipe(gulp.dest('dist'))
      ]);
  });

gulp.task('build-spec',
  () => gulp.src('lib/**/*.ts')
  .pipe(tsProject())
  .js.pipe(gulp.dest(file => file.base)));

gulp.task('tubular2-module',
  () => gulp.src(['./package.json', './dist/**/*.ts', './dist/**/*.js'])
  .pipe(gulp.dest('./node_modules/@tubular2/tubular2')));

gulp.task('build-e2e', ['build-lib', 'tubular2-module'],
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
  () => connect.server({
    root: './sample',
    port: 7777
  }));



gulp.task('e2e-ci', ['build-e2e'],
  (done) => {
    new Server({
      configFile: __dirname + '/karma.e2e.js',
      singleRun: true
    }, done).start();
  });

gulp.task('e2e', ['build-e2e'],
  (done) => {
    new Server({
      configFile: __dirname + '/karma.e2e.js'
    }, done).start();
  });
