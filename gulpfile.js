var browserSync = require("browser-sync").create();
var gulp = require("gulp");
var sass = require("gulp-sass");


var paths = {
    styles: {
        // By using styles/**/*.sass we're telling gulp to check all folders for any sass file
        src: "src/styles/**/*.scss",
        // Compiled files will end up in whichever folder it's found in (partials are not compiled)
        dest: "src/styles"
    },
    reload: './'
};

function style() {
    return (
        gulp
            .src(paths.styles.src)
            .pipe(sass())
            .on("error", sass.logError)
            .pipe(gulp.dest(paths.styles.dest))
    );
}

exports.style = style;

function reload(done) {
    browserSync.reload();
    done()
}

function watch(done){
    browserSync.init({
        server: {
            baseDir: paths.reload
        }
    });

    // gulp.watch takes in the location of the files to watch for changes
    // and the name of the function we want to run on change
    gulp.watch(paths.styles.src, gulp.series(style))
    gulp.watch(["index.html", paths.styles.src], gulp.series(reload));
    done()
}

// Don't forget to expose the task!
exports.watch = watch