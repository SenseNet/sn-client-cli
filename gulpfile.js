// build chain dependencies
const gulp = require('gulp');
const typedoc = require("gulp-typedoc");
const del = require('del');
var run = require('gulp-run');

gulp.task('clean', function () {
    return del([
        './tmp',
        './dist',
        './dist_tests',
        './coverage',
        './coverage-report'
    ]);
});

gulp.task("typedoc", function () {
    return gulp
        .src(["src/**/*.ts",
            // "!src/**/index.ts"
        ])
        .pipe(typedoc({
            module: "commonjs",
            target: "es2015",
            mode: "file",
            includeDeclarations: false,
            experimentalDecorators: true,
            out: "./documentation",
            name: "sn-client-cli",
            theme: "default",
            ignoreCompilerErrors: true,
            version: true,
            readme: "./README.md",
            excludeExternals: true,
            excludePrivate: true,
            includes: "docs"
        }));
});