var gulp = require('gulp');
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

gulp.task('default', function(){ 
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist")); 
});

gulp.task('e2e', function(){ 
    return gulp.src('test/e2e/**/*.ts')
        .pipe(ts({
            noImplicitAny: false,
            typeRoots: [
                "./node_modules/@types"
            ],
            types : [
                "core-js",
                "jasmine"
            ]
        }))
        .pipe(gulp.dest(function(file) {
            return file.base;
        }));
});