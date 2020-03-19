const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const tsify = require('tsify');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');
const rename = require('gulp-rename');
const watchify = require('watchify');
const prependify = require('prependify');
const sass = require('gulp-sass');


class ScriptInit {
  /**
   *
   * @param args
   * @param args.filename string
   * @param args.distFolder string
   * @param args.entries string[]
   * @param args.docsFolder string
   */
  constructor(args) {
    this.watchified = null;
    this.entries = args.entries;
    this.filename = args.filename;
    this.distFolder = args.distFolder;
    this.docsFolder = args.docsFolder;
    this.init();
  }

  init() {
    this.initWatchified();
    this.processFiles();
    this.subscribeToWatchify();
  }

  initWatchified() {
    this.watchified = watchify(browserify({
        basedir: '.',
        debug: true,
        entries: this.entries,
        cache: {},
        packageCache: {}
      })
        .plugin(tsify)
        .plugin(prependify,
`/**
 *  jQuery plugin for validation of text inputs and textarea.
 *
 *  Copyright (c) 2019 Aleksey Sirochenko
 *  https://github.com/ALEX-256/
 *
 *  Version 1.0.0
 *
 *  Repository url:
 *  https://github.com/ALEX-256/deRegexValidation
 *  @license
 *  MIT License https://opensource.org/licenses/MIT
 */`
        )
        .transform('babelify', {
          presets: ['es2015'],
          extensions: ['.ts']
        })
    );
  }

  processFiles() {
    return this.watchified
      .bundle()
      .pipe(source(this.filename))
      .pipe(buffer())
      .pipe(sourcemaps.init())
      .pipe(gulp.dest(this.distFolder))
      .pipe(gulp.dest(this.docsFolder))
      .pipe(uglify({
        output: {
          comments: 'some',
        }
      }))
      .pipe(rename({suffix: '.min'}))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(this.distFolder))
  }

  subscribeToWatchify() {
    this.watchified.on('update', this.processFiles.bind(this));
  }
}

function scriptsInit() {
  let args = {
    entries: ['ts/plugin.ts'],
    filename: 'deregexvalidation.js',
    distFolder: 'dist/js',
    docsFolder: 'docs',
  };
  new ScriptInit(args);
}

class StylesInit {
  /**
   *
   * @param args
   * @param args.filename string
   * @param args.distFolder string
   * @param args.entries string[]
   * @param args.docsFolder string
   */
  constructor(args) {
    this.entries = args.entries;
    this.filename = args.filename;
    this.distFolder = args.distFolder;
    this.docsFolder = args.docsFolder;

    this.init();
  }

  init() {
    this.processFiles();
    this.subscribeToWatch();
  }

  processFiles() {
    return gulp.src(this.entries)
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(gulp.dest(this.distFolder))
      .pipe(sass({outputStyle: 'compressed'}))
      .pipe(rename({suffix: '.min'}))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(this.distFolder));
  }

  subscribeToWatch() {
    gulp.watch('scss/**/*.scss', this.processFiles.bind(this));
  }
}

function stylesInit() {
  let args = {
    entries: ['scss/deregexvalidation.scss'],
    filename: 'deregexvalidation.js',
    distFolder: 'dist/css',
  };
  new StylesInit(args);
}


gulp.task('default', () => {
  scriptsInit();
  stylesInit();
});