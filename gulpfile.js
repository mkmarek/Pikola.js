// Load plugins
var gulp = require('gulp'),
  del = require('del'),
  mocha = require('gulp-mocha'),
  babel = require('gulp-babel'),
  istanbul = require('gulp-babel-istanbul'),
  isparta = require('isparta'),
  sourcemaps = require('gulp-sourcemaps'),
  path = require('path'),
  remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul'),
  istanbulReport = require('gulp-istanbul-report'),
  config = require('./gulpconfig'),
  merge2 = require('merge2');

gulp.task('build-scripts', ['clean'], function() {
  return gulp.src(config.paths.source + config.paths.sourceFilePattern)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: config.babelPresets
    }))
    .pipe(sourcemaps.write('.', {
      sourceRoot: path.join(__dirname, config.paths.source)
    }))
    .pipe(gulp.dest(path.join(config.paths.dist)));
});

gulp.task('build-tests', ['clean'], function() {
  return gulp.src(path.join(config.paths.source, config.paths.tests) + config.paths.testFilePattern)
    .pipe(babel({
      presets: config.babelPreset
    }))
    .pipe(gulp.dest(path.join(config.paths.dist, config.paths.tests)));
});

gulp.task('cover', ['build-scripts', 'build-tests'], function(cb) {

  var coverFilesStream = gulp.src([
      config.paths.dist + config.paths.sourceFilePattern,
      '!' + path.join(config.paths.dist, config.paths.tests) + config.paths.testFilePattern,
    ])
    // Covering files
    .pipe(istanbul({
      instrumenter: isparta.Instrumenter,
      includeUntested: true
    }))
    // Force `require` to return covered files
    .pipe(istanbul.hookRequire());

  var reportStream = gulp.src([
      path.join(config.paths.dist, config.paths.tests) + config.paths.testFilePattern
    ])
    .pipe(mocha({
      reporter: config.mochaReporter
    }))
    // Creating the reports after tests ran
    .pipe(istanbul.writeReports({
      reporters: ['json']
    }))
    .on('end', function() {
      gulp.src(config.paths.coverage + '/coverage-final.json')
        .pipe(remapIstanbul())
        .pipe(istanbulReport({
          reporterOpts: {
            dir: config.paths.coverageHtmlReport
          },
          reporters: [{
            'name': 'html',
            file: 'report-html'
          }]
        }))
        .on('finish', cb);
    });

  return merge2(coverFilesStream, reportStream);
});

gulp.task('test', ['build-scripts', 'build-tests'], function() {
  return gulp.src([path.join(config.paths.dist, config.paths.tests) + config.paths.testFilePattern])
    .pipe(mocha({
      reporter: config.mochaReporter
    }));
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
