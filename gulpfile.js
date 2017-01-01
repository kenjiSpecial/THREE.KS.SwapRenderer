const argv = require('minimist')(process.argv.slice(2));
const gulp = require('gulp');
const babel = require('gulp-babel');
const budo = require('budo');
const babelify = require('babelify').configure({
  presets: ['es2015']
});

const entry = './src/js/index.js';

//the development task
gulp.task('test', function(cb) {
  //dev server
  budo('./test/index.js', {
    // serve: 'bundle.js',     // end point for our <script> tag
    stream: process.stdout, // pretty-print requests
    live: true,             // live reload & CSS injection
    // dir: 'app',             // directory to serve
    // open: argv.open,        // whether to open the browser
    // borserifyArgs : ['-t', '[ rollupify --config rollup.config.js ]'],
    browserify: {
      transform:[
        babelify   //browserify transforms
      ]
    }
  }).on('exit', cb);
});


gulp.task('compile', function() {
    return gulp.src('index.js')
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(gulp.dest('build'));
});