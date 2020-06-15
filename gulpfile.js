const fs = require('fs');
const gulp = require("gulp");
const ts = require("gulp-typescript");
const merge = require('merge2');
const typescript = require('typescript');
const tsProject = ts.createProject("./tsconfig.json", {typescript});

function src () {
    const stream = gulp.src("./src/**/*.ts")
        .pipe(tsProject());

    return merge([
        stream.dts.pipe(gulp.dest('./build')),
        stream.js.pipe(gulp.dest('./build'))
    ]);                          
}

function dts (cb) {
    const packageJson = JSON.parse( fs.readFileSync('./package.json').toString() );

    require('dts-bundle').bundle({
        name: packageJson.name,
        out: 'module.d.ts',
        main: './build/index.d.ts'
    });

    cb();
}

function watch() {
  gulp.watch(["./src/**/*.ts"], gulp.series(src, dts));
}

exports.src = src;
exports.dts = dts;
exports.watch = gulp.parallel(watch, gulp.series(src, dts));
exports.default = gulp.series(src, dts);
