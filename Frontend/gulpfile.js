/**
 * Created by wrichtsfeld on 01/12/2017.
 */
var gulp = require('gulp'),
  gulpif = require('gulp-if'),
  cacheBuster = require('gulp-cache-bust'),
  // for html:
  nunjucksRender = require('gulp-nunjucks-render'),
  data = require('gulp-data'),
  download = require('gulp-download'),
  cleanhtml = require('gulp-cleanhtml'),
  // for css:
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  cleanCSS = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  merge = require('merge-stream'),
  // for javascript:
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  jsonlint = require('gulp-jsonlint'),
  // for cleaning out dist/ directory before build:
  del = require('del'),
  // angular-specific:
  ngAnnotate = require('gulp-ng-annotate'),
  htmlify = require('gulp-angular-htmlify'),
  // webserver for development:
  webserver = require('gulp-webserver'),
  sequence = require('gulp-sequence'),
  fileExists = require('file-exists')

var paths = {
  dev: {
    all: 'src/**',
    css: 'src/**/*.css',
    index: 'src/index.html',
    html: 'src/**/*.html',
    sass: 'src/**/*.scss',
    js: ['src/app/**/*.mod.js', 'src/app/**/*!(.mod).js'],
    images: 'src/img/**',
    icons: 'src/icons/**',
    samples: 'src/samples/**',
    favico: 'src/*.ico',
    manifest: 'src/manifest.json',
    jsDependencies: [
      'node_modules/jquery/dist/jquery.js',
      'node_modules/angular/angular.js',
      'node_modules/tether/dist/js/tether.js',
      'node_modules/ng-dialog/js/ngDialog.js',
      'node_modules/angular-ui-router/release/angular-ui-router.js',
      'node_modules/bootstrap/dist/js/bootstrap.js',
      'node_modules/angulargrid/angulargrid.js',
      'node_modules/firebase/firebase-app.js',
      'node_modules/angularfire/dist/angularfire.js',
      'node_modules/firebase/firebase-auth.js',
      'node_modules/angular-toastr/dist/angular-toastr.tpls.js',
      'node_modules/ng-file-upload/dist/ng-file-upload.min.js',
      'node_modules/ng-file-upload/dist/ng-file-upload-shim.min.js',
      'node_modules/sprintf-js/dist/sprintf.min.js',
      'node_modules/angular-sanitize/angular-sanitize.min.js'
    ],
    fileDependencies: [
      {
        files: ['images/**']
      }
    ],
    files: []
  },
  build: {
    all: 'dist/**',
    main: 'dist/',
    css: 'dist/css',
    js: 'dist/js',
    samples: 'dist/samples',
    images: 'dist/img',
    icons: 'dist/icons',
    index: 'dist/index.html'
  }
}

// Runs a development webserver with livereload. Use this task for developing
gulp.task('webserver', ['styles', 'js', 'html'], function () {
  gulp.src('dist')
    .pipe(webserver({
      /*directoryListing: {
          enable: true,
          path: 'src'
      },*/
      open: true,
      livereload: true,
      host: '0.0.0.0'
    }))
})

// stylish output for errors
gulp.task('lint', function () {
  var lintpaths = [].concat(paths.dev.js)
  lintpaths.push('!' + paths.dev.libJS)

  return gulp.src(lintpaths)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
    .pipe(jshint.reporter('default'))
})

// watch scss for changes and render into minified css with nice auto-prefixing
gulp.task('styles', function () {
  var sassStream,
    cssStream

  // compile sass
  sassStream = gulp.src(paths.dev.sass)
    .pipe(sass({style: 'compressed', errLogToConsole: true}))

  // select additional css files
  cssStream = gulp.src(paths.dev.css)

  return merge(sassStream, cssStream)
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(concat('style.css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cleanCSS({level: 2}))
    .pipe(gulp.dest(paths.build.css))
})

// watch images and add them to output dir
gulp.task('images', function () {
  var stream = []
  stream.push(gulp.src(paths.dev.images)
    .pipe(gulp.dest(paths.build.images)))
  return stream
})

gulp.task('icons', function () {
  return gulp.src(paths.dev.icons)
    .pipe(gulp.dest(paths.build.icons))
})

gulp.task('samples', function () {
  return gulp.src(paths.dev.samples)
    .pipe(gulp.dest(paths.build.samples))
})

gulp.task('favico', function () {
  return gulp.src(paths.dev.favico)
    .pipe(gulp.dest(paths.build.main))
})

gulp.task('manifest', function () {
  return gulp.src(paths.dev.manifest)
    .pipe(gulp.dest(paths.build.main))
})

// watch js files, minify and concatinate them into app.min.js
gulp.task('js', function () {
  var appStream = gulp.src([].concat(paths.dev.js), {base: 'app/'})
    .pipe(ngAnnotate())
    .pipe(concat('app.min.js'))
    // .pipe(uglify())
    .pipe(gulp.dest(paths.build.js))
  return merge([appStream])
})

gulp.task('jsDependencies', function (callback) {
  checkFilesExist(paths.dev.jsDependencies, callback)

  return gulp.src(paths.dev.jsDependencies)
    .pipe(ngAnnotate()) // needed for angularjs dependencies
    .pipe(concat('dependencies.min.js'))
    // .pipe(uglify())
    .pipe(gulp.dest(paths.build.js))
})

gulp.task('fileDependencies', function () {
  for (var i = 0; i < paths.dev.fileDependencies.length; i++) {
    var file = paths.dev.fileDependencies[i]
    for (var j = 0; j < file.files.length; j++) {
      gulp.src(file.baseDir + file.files[j], {base: file.baseDir})
        .pipe(gulp.dest(paths.build.main))
    }
  }
})

gulp.task('html', function () {
  return gulp.src([
    paths.dev.html
  ])
    .pipe(htmlify())
    .pipe(cleanhtml())
    .pipe(gulp.dest(paths.build.main))
})

// task to clear out dist/ folder before building out deployment version of app - runs before every other task in 'gulp build'
gulp.task('clean', function () {
  return del([paths.build.all])
})

gulp.task('watch', ['styles', 'js', 'html', 'samples'], function () {
  gulp.watch([paths.dev.sass, paths.dev.css], ['styles'])

  var jsWatchPaths = paths.dev.js
  gulp.watch(jsWatchPaths, ['js'])

  gulp.watch(paths.dev.css, ['scss'])
  gulp.watch(paths.dev.html, ['html'])
  gulp.watch(paths.dev.samples, ['samples'])
  gulp.watch(paths.dev.images, ['images'])
  gulp.watch(paths.dev.icons, ['icons'])
})

gulp.task('cacheBuster', function () {
  return gulp.src(paths.build.index)
    .pipe(cacheBuster())
    .pipe(gulp.dest(paths.build.main))
})

gulp.task('build', sequence('clean', ['jsDependencies', 'manifest', 'images', 'icons', 'favico', 'samples', 'styles', 'js', 'html', 'fileDependencies'], 'cacheBuster')) // 'lint',
gulp.task('run', sequence('build', 'webserver', 'watch'))
gulp.task('default', ['run'])

function checkFilesExist (fileList, callback) {
  var missingFiles = fileList.filter(function (f) {
    return !fileExists.sync(f)
  })
  if (missingFiles.length > 0) {
    callback(new Error('Missing vendor file(s): ' + missingFiles))
  }
}
