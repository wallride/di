let gulp = require('gulp');
let ts = require('gulp-typescript');
let tsProject = ts.createProject('tsconfig.json');

function src () {
    return tsProject.src()
        .pipe(tsProject())
        .pipe(gulp.dest('./build'));
}

function watch() {
  gulp.watch(["./src/**/*.ts"], src);
}

exports.src = src;
exports.watch = gulp.parallel(watch, src);
exports.default = src;
