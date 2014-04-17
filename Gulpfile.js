var gulp = require("gulp")
var util = require("gulp-util")
var browserify = require("gulp-browserify")
var livereload = require("gulp-livereload")
var embedlr = require("gulp-embedlr")
var sass = require("gulp-sass")
var jade = require("gulp-jade")
var coffee = require("gulp-coffee")
var open = require("gulp-open")

gulp.task('scripts', function() {
  return gulp.src(['app/scripts/app.coffee'])
    .pipe(coffee().on('error', util.log))
    .pipe(browserify().on('error', util.log))
    .pipe(gulp.dest('./build'))
    .pipe(livereload())
})

gulp.task('stylesheets', function() {
  return gulp.src(['app/stylesheets/app.scss'])
    .pipe(sass().on('error', util.log))
    .pipe(gulp.dest('./build'))
    .pipe(livereload())
})

gulp.task('content', function() {
  return gulp.src(['app/**/*.jade'])
    .pipe(jade().on('error', util.log))
    .pipe(embedlr())
    .pipe(gulp.dest('./build/'))
    .pipe(livereload())
})

gulp.task('server', function(next) {
  var connect = require("connect")
  var server = connect()

  server.use(connect.static('./build'))
    .listen(4242, next)
})

gulp.task('open', ['dist', 'server'], function() {
  return gulp.src('build/index.html')
    .pipe(open('', {url: 'http://localhost:4242'}))
})

gulp.task('watch', function() {
  gulp.watch('app/stylesheets/**/*.scss', ['stylesheets'])
  gulp.watch('app/scripts/**/*.coffee', ['scripts'])
  gulp.watch('app/**/*.jade', ['content'])
})

gulp.task('dist', [
  "scripts",
  "stylesheets",
  "content"
])

gulp.task("default", [
  "open",
  "watch"
])
