var gulp = require("gulp")
var browserify = require('gulp-browserify')
var connect = require("gulp-connect")
var sass = require("gulp-sass")
var open = require("gulp-open")

gulp.task('scripts', function() {
  gulp.src(['app/scripts/*.js'])
    .pipe(browserify())
    .pipe(gulp.dest('./build'))
})

gulp.task('stylesheets', function() {
  gulp.src(['app/stylesheets/app.scss'])
    .pipe(sass())
    .pipe(gulp.dest('./build'))
})

gulp.task('content', function() {
  gulp.src(['app/**/*.html'])
    .pipe(gulp.dest('./build/'))
})

gulp.task('server', function() {
   connect.server({
    root : './build',
    port : 4242,
    livereload : { port: 4243 }
  })

  gulp.src('./build/index.html')
    .pipe(open('', {url: 'http://localhost:4242'}))
})

gulp.task('reload', function() {
  connect.reload()
})

gulp.task('watch', function() {
  gulp.watch('app/stylesheets/**/*.scss', ['stylesheets'])
  gulp.watch('app/scripts/**/*.js', ['scripts'])
  gulp.watch('app/**/*.html', ['content', 'reload'])
})

gulp.task('dist', [
  "scripts",
  "stylesheets",
  "content"
])

gulp.task("default", [
  "dist",
  "server",
  "watch"
])
