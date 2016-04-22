// Load plugins
var gulp = require('gulp'),
  del = require('del'),
  mocha = require('gulp-mocha'),
  babel = require('gulp-babel'),
  istanbul = require('gulp-babel-istanbul'),
  isparta = require('isparta'),
  sourcemaps = require('gulp-sourcemaps'),
  path = require('path'),
  injectModules = require('gulp-inject-modules'),
  remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul'),
  istanbulReport = require('gulp-istanbul-report'),
  config = require('./gulpconfig'),
  merge2 = require('merge2'),
  eslint = require('gulp-eslint');


function onError(err) {
  console.log(err);
  this.emit('end');
}


gulp.task('lint', function () {
    return gulp.src([
      'examples/*.js',
      config.paths.source + config.paths.sourceFilePattern,
      '!node_modules/**',
      '!' + path.join(config.paths.source, config.paths.tests) + config.paths.testFilePattern])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('build-scripts', ['clean', 'lint'], function() {
  return gulp.src(config.paths.source + config.paths.sourceFilePattern)
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(babel({
      presets: config.babelPresets
    }))
    .on('error', onError)
    .pipe(sourcemaps.write('.', {
      sourceRoot: path.join(__dirname, config.paths.source)
    }))
    .pipe(gulp.dest(path.join(config.paths.dist)))
});

gulp.task('build-tests', ['clean'], function() {
  return gulp.src(path.join(config.paths.source, config.paths.tests) + config.paths.testFilePattern)
    .pipe(babel({
      presets: config.babelPresets
    }))
    .on('error', onError)
    .pipe(gulp.dest(path.join(config.paths.dist, config.paths.tests)));
});

gulp.task('cover', ['build-scripts', 'build-tests'], function() {

  return gulp.src([
      config.paths.dist + config.paths.sourceFilePattern,
      '!' + path.join(config.paths.dist, config.paths.tests) + config.paths.testFilePattern,
    ])
    .pipe(istanbul({
      instrumenter: isparta.Instrumenter
    }))
    .pipe(injectModules())
    .on('error', onError)
    .on('finish', function() {
      return gulp.src(path.join(config.paths.dist, config.paths.tests) + config.paths.testFilePattern)
        .pipe(babel())
        .pipe(injectModules())
        .pipe(mocha({
          reporter: config.mochaReporter
        }))
        .pipe(istanbul.writeReports({
          reporters: ['json']
        }))
        .on('error', onError)
        .on('end', function() {
          return gulp.src(config.paths.coverage + '/coverage-final.json')
            .pipe(remapIstanbul({
              reports: {
                'json': config.paths.coverage + '/coverage.json',
                'html': config.paths.coverage + '/html',
                'lcovonly' : config.paths.coverage + '/lcov.info'
              }
            }))
            .on('error', onError);
        });
    });
});

gulp.task('test', ['build-scripts', 'build-tests'], function() {
  return gulp.src([path.join(config.paths.dist, config.paths.tests) + config.paths.testFilePattern])
    .pipe(mocha({
      reporter: config.mochaReporter
    }))
    .on('error', onError);
});

// Cleanall generated files
gulp.task('clean', function() {
  return del([config.paths.dist, config.paths.coverage]);
});

// Default task
gulp.task('default', function() {
  gulp.start('watch');
});

// Watch
gulp.task('watch', ['test'], function() {
  // Watch source and test files files
  gulp.watch(config.paths.source + config.paths.sourceFilePattern, ['test']);
  gulp.watch(config.paths.tests + config.paths.testFilePattern, ['test']);
});
