/*------------------------------------------------------------------------------
  Gulpfile.js
------------------------------------------------------------------------------*/
// Name your theme
var theme        = 'your-theme-name';

// Set the paths you will be working with
var phpFiles     = [],
    htmlFiles    = [],
    cssFiles     = ['src/assets/css/*.css', '!src/assets/css/*.min.css'],
    sassFiles    = ['src/assets/scss/**/*.scss'],
    jsFiles      = ['src/assets/js/theme.js'],
    imageFiles   = ['src/assets/img/*.{jpg,png,gif}'],
    concatFiles  = [],
    copyFiles    = ['!src/assets/img/**/*', 'src/**/*'],
    url          = 'wp-dev:8888'; // See https://browsersync.io/docs/options/#option-proxy

// Include gulp
var gulp         = require('gulp');

// Include plugins
var jshint       = require('gulp-jshint'),
    sass         = require('gulp-sass'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify'),
    rename       = require('gulp-rename'),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    nano         = require('gulp-cssnano'),
    sourcemaps   = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync  = require('browser-sync'),
    plumber      = require('gulp-plumber'),
    stylish      = require('jshint-stylish');
    zip          = require('gulp-zip');

/*------------------------------------------------------------------------------
  Development Tasks
------------------------------------------------------------------------------*/
// Launch a development server
gulp.task( 'serve', function() {
  browserSync.init({
    proxy: url
      // port: 3000
  });
});

// Compile Sass
gulp.task('sass', function() {
  return gulp.src( sassFiles )
    .pipe(sourcemaps.init())
      .pipe(plumber())
      .pipe(sass())
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest( 'src/assets/css' ))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Lint JavaScript
gulp.task('lint', function() {
  return gulp.src( jsFiles )
    .pipe(sourcemaps.init())
      .pipe(plumber())
      .pipe(jshint())
      .pipe(jshint.reporter(stylish))
    .pipe(sourcemaps.write())
    .pipe(browserSync.reload({
      stream: true
    }));
});

/*------------------------------------------------------------------------------
  Production Tasks
------------------------------------------------------------------------------*/
// Minimize CSS
gulp.task('minify-css', ['sass'], function() {
	return gulp.src( cssFiles )
  	.pipe(rename({
      suffix: '.min'
    }))
    .pipe(nano({
      discardComments: {removeAll: true},
      autoprefixer: false
    }))
    .pipe(gulp.dest( 'src/assets/css' ))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Concatenate & Minify JavaScript
gulp.task('scripts', ['lint'], function() {
  return gulp.src( concatFiles )
    .pipe(concat( 'all.js' ))
    .pipe(gulp.dest('src/assets/js'))
    .pipe(rename('theme.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest( 'src/assets/js' ));
});

// Compress Images
gulp.task('images', function() {
  return gulp.src( imageFiles )
  .pipe(plumber())
  .pipe(imagemin({
    progressive: true,
    interlaced: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
  }))
  .pipe(gulp.dest( 'src/assets/img' ));
});

// Copy essential files to Dist
gulp.task('copy', function() {
	return gulp.src( copyFiles )
	.pipe(gulp.dest( theme ));
});

// Package a zip for theme upload
gulp.task('package', function() {
	return gulp.src( theme + '/**/*' )
		.pipe(zip( theme + '.zip' ))
		.pipe(gulp.dest( './' ));
});

// Styles Task - minify-css is the only task we call, because it is dependent upon sass running first.
gulp.task('styles', ['minify-css']);

/*------------------------------------------------------------------------------
  Default Tasks
------------------------------------------------------------------------------*/
// Default Task
gulp.task('default', ['sass', 'scripts', 'images', 'serve', 'watch']);

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch( sassFiles, ['sass']);
  gulp.watch( jsFiles, ['scripts']);
  gulp.watch( cssFiles, ['styles']);
  gulp.watch( imageFiles, ['images'], browserSync.reload );
  gulp.watch( phpFiles, browserSync.reload );
  gulp.watch( htmlFiles, browserSync.reload );
});

// When you are ready to ship
gulp.task('build', ['minify-css', 'scripts', 'images', 'copy', 'package']);
