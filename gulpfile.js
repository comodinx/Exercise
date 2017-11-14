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

// Code clean
// ----------------------------------------------------
gulp.task('lint:js', () => {
    return gulp
        .src([
            'src/**/*.js',
            '!node_modules/**',
            '!test/**/*.js'
        ])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

// Cleaning tasks
// ----------------------------------------------------
gulp.task('clean:js:client', () => {
    return del([
        './public/assets/js/bundle.js',
        './public/assets/js/bundle.js.map',
        './index.js.map'
    ]);
});

gulp.task('clean:js:server', () => {
    return del([
        './index.js',
        './index.js.map'
    ]);
});

gulp.task('clean:css', () => {
    return del([
        './public/assets/css/styles.css'
    ]);
});

// Building tasks
// ----------------------------------------------------
gulp.task('js:client', ['clean:js:client', 'lint:js'], () => {
    return gulp
        .src('src/client/**/*.js')
        .pipe(webpack({
            config: webpackConfig[0] // Client configuration
        }))
        .pipe(gulp.dest('public/assets/js'));
});

gulp.task('js:server', ['clean:js:server', 'lint:js'], () => {
    return gulp
        .src('src/server/**/*.js')
        .pipe(webpack({
            config: webpackConfig[1] // Server configuration
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('js', ['lint:js', 'js:client', 'js:server']);

gulp.task('css', ['clean:css'], () => {
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
});

gulp.task('compile', ['js', 'css']);

// Tasks of Running
// ----------------------------------------------------
gulp.task('watch', ['compile'], () => {
    gulp.watch('src/**/*.js', ['js']);
    gulp.watch('src/styles/**/*.scss', ['css']);
});

gulp.task('start', ['compile'], () => {
    nodemon({
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
        ]
    });
});

gulp.task('default', ['compile', 'watch', 'start']);
