// build chain dependencies
const gulp = require('gulp');
const typedoc = require("gulp-typedoc");
const del = require('del');
var run = require('gulp-run');

gulp.task('clean', function () {
    return del([
        './tmp',
        './dist',
        './dist_test',
        './coverage',
        './coverage-report'
    ]);
});

gulp.task("typedoc", function () {
    return gulp
        .src(["src/*.ts", "!src/SN.ts",'!./src/SN.d.ts'])
        .pipe(typedoc({
                module: "commonjs",
                target: "es2015",
                includeDeclarations: false,
                out: "./documentation",
                name: "sn-client-js",
                theme: "default",
                ignoreCompilerErrors: true,
                version: true,
                readme: "sn-client-js/README.md",
                excludeExternals: true,
                excludePrivate: true,
                includes: "docs"
            }));
});