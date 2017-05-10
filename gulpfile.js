var gulp = require('gulp')
var plumber = require('gulp-plumber')
var gutil = require('gulp-util')
var stylus = require('gulp-stylus')
var browserSync = require('browser-sync').create()
var prefix = require('autoprefixer-stylus')
var replace = require('gulp-replace')
var bro = require('gulp-bro')
var babelify = require('babelify')

gulp.task('css', function () {
	return gulp.src('./src/assets/styles/app.styl')
		.pipe(plumber())
		.pipe(stylus({
			use: prefix(),
			include: 'node_modules'
		}))
		.pipe(replace('@@root_path', ''))
		.pipe(gulp.dest('./dist/assets'))
		.pipe(browserSync.reload({ stream: true }))
})

gulp.task('copy-html', function () {
	return gulp.src('./src/*.html')
		.pipe(replace('@@root_path', ''))
		.pipe(gulp.dest('./dist'))
		.pipe(browserSync.reload({ stream: true }))
})

gulp.task('copy-images', function () {
	return gulp.src('./src/assets/images/**/*')
		.pipe(gulp.dest('./dist/assets/images'))
		.pipe(browserSync.reload({ stream: true }))
})

gulp.task('js', function () {
	return gulp.src('./src/assets/js/app.js')
		.pipe(bro({
			transform: [
				babelify.configure({ presets: ['es2015'] })
			]
		}))
		.pipe(gulp.dest('./dist/assets'))
		.pipe(browserSync.reload({ stream: true }))
})

gulp.task('serve', function () {

	browserSync.init({
		server: {
			baseDir: "./dist/"
		},
		host: "localhost",
		open: false,
		notify: false
	})

	gulp.watch("./src/assets/styles/**/*.styl", ['css'])
	gulp.watch("./src/*.html", ['copy-html'])
	gulp.watch("./src/assets/images/**/*", ['copy-images'])
	gulp.watch("./src/assets/js/*", ['js'])
})

gulp.task('default', ['copy-images', 'copy-html', 'css', 'js', 'serve'])
gulp.task('build', ['copy-images', 'copy-html', 'css', 'js'])