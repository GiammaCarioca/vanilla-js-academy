// Require the npm modules we need
const gulp = require('gulp'),
	rename = require('gulp-rename'),
	cleanCSS = require('gulp-clean-css'),
	terser = require('gulp-terser')

// Looks for a file called styles.css inside the css directory
// Copies and renames the file to styles.min.css
// Minifies the CSS
// Saves the new file inside the css directory
function minifyCSS() {
	return gulp
		.src('./css/styles.css')
		.pipe(rename('styles.min.css'))
		.pipe(cleanCSS())
		.pipe(gulp.dest('./css'))
}

// Looks for a file called app.js inside the js directory
// Copies and renames the file to app.min.js
// Minifies the JS
// Saves the new file inside the js directory
function minifyJS() {
	return gulp
		.src('./js/app.js')
		.pipe(rename('app.min.js'))
		.pipe(terser())
		.pipe(gulp.dest('./js'))
}

// Makes both these functions available as a single default task
// The two functions will execute asynchronously (gulp.series() would be synchronous)
// The task will run when you use the gulp command in the terminal
exports.default = gulp.parallel(minifyCSS, minifyJS)
