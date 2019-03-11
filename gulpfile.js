'use strict';

const del = require('del');
const gulp = require('gulp');
const sass = require('gulp-sass');
const eslint = require('gulp-eslint');
const nodemon = require('gulp-nodemon');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config');

let clean;
let scripts;
let styles;
let build;

// Code review
// ----------------------------------------------------
function lint() {
    return gulp
        .src([
            'src/**/*.js',
            '!node_modules/**',
            '!test/**/*.js'
        ])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}

// Cleaning tasks
// ----------------------------------------------------
function cleanScriptsClient() {
    return del([
        './public/assets/js/bundle.js',
        './public/assets/js/bundle.js.map',
        './index.js.map'
    ]);
}

function cleanScriptsServer() {
    return del([
        './index.js',
        './index.js.map'
    ]);
}

function cleanScripts() {
    return gulp.parallel(cleanScriptsClient, cleanScriptsServer);
}

function cleanStyles() {
    return del([
        './public/assets/css/styles.css'
    ]);
}

clean = gulp.parallel(cleanScripts, cleanStyles);

// Building tasks
// ----------------------------------------------------

// Building scripts
function buildScriptsClient() {
    return gulp
        .src('src/client/**/*.js')
        .pipe(webpack({
            config: webpackConfig[0] // Client configuration
        }))
        .pipe(gulp.dest('public/assets/js'));
}

function buildScriptsServer() {
    return gulp
        .src('src/server/**/*.js')
        .pipe(webpack({
            config: webpackConfig[1] // Server configuration
        }))
        .pipe(gulp.dest('./'));
}

scripts = gulp.series(
    lint,
    gulp.parallel(
        gulp.series(cleanScriptsClient, buildScriptsClient),
        gulp.series(cleanScriptsServer, buildScriptsServer)
    )
);

// Building styles
function buildStyles() {
    return gulp
        .src('src/styles/styles.scss')
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                outputStyle: 'compressed'
            }).on('error', sass.logError)
        )
        .pipe(sourcemaps.write())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('public/assets/css'));
}

styles = gulp.series(cleanStyles, buildStyles);

// Building all
build = gulp.parallel(scripts, styles);

// Tasks of Running
// ----------------------------------------------------
function watch(done) {
    gulp.watch('src/**/*.js', scripts);
    gulp.watch('src/styles/**/*.scss', styles);
    done();
}

function start(done) {
    return nodemon({
        ext: 'js',
        script: 'index.js',
        env: {
            NODE_ENV: process.env.NODE_ENV || 'development'
        },
        watch: [
            'index.js'
        ],
        ignore: [
            'public/assets/js',
            'node_modules/'
        ],
        done
    });
}

module.exports.clean = clean;
module.exports.styles = styles;
module.exports.scripts = scripts;
module.exports.watch = watch;

gulp.task('build', build);

gulp.task('default', gulp.series(build, watch, start));
