const {src, dest, watch, parallel, series} = require("gulp");
const sass = require("gulp-sass");
const rename = require("gulp-rename")
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
const del = require("del");
const concat = require("gulp-concat")

const jsFiles = ["src/assets/javascript/config.js", "src/assets/javascript/components/*.js", "src/assets/javascript/lib/*.js", "src/assets/javascript/modules/*.js"]

// clean task
function clean(){
    return del(["dist"]);
}

// js task
function js(){
    return src(jsFiles)
    .pipe(concat("index.js"))
    .pipe(dest("dist/assets/javascript"))
    .pipe(browserSync.stream());
}

// font awesome task
function copyFontAwesome() {
    return src("src/assets/fontawesome-5-pro/**/*")
    .pipe(dest("dist/assets/fontawesome"))
}

// style task
function style(){
    return src('src/assets/styles/main.scss')
    .pipe(sass())
    .pipe(rename("main.css"))
    .pipe(dest("dist/assets/styles"))
    .pipe(browserSync.stream());
}

// copy tasks
function copyImages(){
    return src("src/assets/images/**/*")
    .pipe(dest("dist/assets/images"))
}

function copyUploads(){
    return src("src/assets/uploads/**/*")
    .pipe(dest("dist/assets/uploads"))
}

function copyHtml(){
    return src("src/*.html")
    .pipe(dest("dist"))
}

// watch task
function watchForChanges(){
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    watch("src/assets/styles/**/*.scss", style)
    watch("src/assets/javascript/**/*.js").on("change", series(js, browserSync.reload))
    watch("src/*.html").on("change", series(copyHtml, browserSync.reload))
    watch("src/assets/images/*", copyImages)
}

// js task

exports.watch = series(watchForChanges)
exports.default = series(clean, parallel(copyFontAwesome, copyHtml, js, copyImages, copyUploads, style))