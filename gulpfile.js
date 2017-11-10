'use strict';

const del = require('del');
const gulp = require('gulp');
const sass = require('gulp-sass');
const eslint = require('gulp-eslint');
const nodemon = require('gulp-nodemon');
const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config');

// Code clean
// ----------------------------------------------------

gulp.task('lint:js', () => {
    return gulp
        .src([
            '*.js',
            'server/**/*.js',
            '!node_modules/**',
            '!test/**/*.js'
        ])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

// Cleaning tasks
// ----------------------------------------------------
gulp.task('clean:css', () => {
    return del([
        'public/assets/css/styles.css'
    ]);
});

gulp.task('clean:js', () => {
    return del([
        'public/assets/js/bundle.js'
    ]);
});

// Building tasks
// ----------------------------------------------------
gulp.task('js', ['lint:js', 'clean:js'], () => {
    return gulp
        .src('src/**/*.jsx')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('public/assets/js'));
});

gulp.task('css', ['clean:css'], () => {
    return gulp
        .src('src/styles/styles.scss')
        .pipe(
            sass({
                outputStyle: 'compressed'
            }).on('error', sass.logError)
        )
        .pipe(gulp.dest('public/assets/css'));
});

gulp.task('compile', ['js', 'css']);

// Tasks of Running
// ----------------------------------------------------
gulp.task('watch', ['compile'], () => {
    gulp.watch('src/**/*.jsx', ['js']);
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
            'index.js',
            'server/**/*.js'
        ],
        ignore: [
            'public/assets/js',
            'node_modules/'
        ]
    });
});

gulp.task('default', ['lint:js', 'compile', 'watch', 'start']);
