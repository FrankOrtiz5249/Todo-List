const gulp = require("gulp");
const sass = require("sass");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();

const sassOptions = {
    oputputStyle: "expanded"
};

// compile scss to css 

function style() {
    return gulp
      .src("./scss/**/*.scss")
      .pipe(sourcemaps.init())
      .pipe(sass(sassOptions).on("error", sass.logError))
      .pipe(sourcemaps.write())
      .pipe(autoprefixer())
      .pipe(gulp.dest("./css"))
      .pipe(browserSync.stream());
  }
  
  function watch() {
    browserSync.init({
      server: "."
    });
    gulp.watch("./scss/**/*.scss", style);
    gulp.watch("./*.html").on("change", browserSync.reload);
    gulp.watch("./js/**/*.js", browserSync.reload);
  }
  
  exports.style = style;
  exports.watch = watch;