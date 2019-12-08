// Initialize modules
const { src, dest, series, watch, parallel } = require('gulp');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const replace = require('gulp-replace');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const terser = require('gulp-terser');

// File path variables
const files = {
  scssPath: './assets/styles/sass/**/*.scss',
  jsPath: './assets/js/**/*.js'
}

// Sass taks
function scssTask(){
  return src(files.scssPath)
     .pipe(sourcemaps.init())
     .pipe(sass())
     .pipe(postcss([ autoprefixer(), cssnano() ]))
     .pipe(sourcemaps.write('.'))
     .pipe(dest('dist/css'));
}

// JS taks
function jsTask(){
  return src(files.jsPath)
      .pipe(concat('main.js'))
      .pipe(terser())
      .pipe(dest('dist/js'));
}

// Cachebusting taks
const cbString = new Date().getTime();
function cacheBustTask(){
  return src(['index.html'])
      .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
      .pipe(dest('.'));
}


const watchTask = function() {
    watch("./assets/styles/sass/**/*.scss", {usePolling : true}, series(scssTask));
    watch("./assets/js/**/*.js", {usePolling : true}, series(jsTask));
};
// Default task
exports.default = series(
  parallel(scssTask, jsTask),
  cacheBustTask,
  watchTask
);
exports.watch = watchTask;
