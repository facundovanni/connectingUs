var gulpNgConfig = require('gulp-ng-config'),
    replace = require('gulp-replace');

gulp.task('build:config-dev', function () {
  gulp.src('constants.json')
  .pipe(gulpNgConfig('app', {
    environment: 'dev',
    createModule: false,
    pretty: true
  }))
  .pipe(replace('{version}',options.buildNumber))
  .pipe(gulp.dest('app/'))
});

gulp.task('build:config-release', function () {
  gulp.src('constants.json')
  .pipe(gulpNgConfig('app', {
    environment: 'release',
    createModule: false,
    pretty: true
  }))
  .pipe(replace('{version}',options.buildNumber))
  .pipe(gulp.dest('app/'))
});