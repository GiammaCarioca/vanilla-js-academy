let gulp = require('gulp')
let cleanCSS = require('gulp-clean-css')

gulp.task('minify-css', () => {
	return gulp
		.src('styles/*.css')
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(gulp.dest('dist'))
})

function defaultTask(cb) {
	// place code for your default task here
	cb()
}

exports.default = defaultTask
