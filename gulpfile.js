const gulp = require('gulp');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');

// Task to minify CSS
gulp.task('minify-css', () => {
  return gulp.src('assets/css/*.css')  // Source CSS files
    .pipe(cleanCSS())               // Minify CSS using clean-css
    .pipe(gulp.dest('assets/css'));   // Destination for minified CSS
});
// Minify JavaScript
gulp.task('minify-js', () => {
  return gulp.src('assets/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'));
});

// Default task to run both minify-css and minify-js
gulp.task('default', gulp.parallel('minify-css', 'minify-js'));
